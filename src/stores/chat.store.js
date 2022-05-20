import { defineStore } from "pinia";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  setDoc,
  updateDoc,
  startAfter,
  getDocs,
  limitToLast,
} from "firebase/firestore";
import { useAuthStore } from "./auth.store";

export const useChatStore = defineStore("chat", {
  state: () => ({
    conversations: [],
    selectedConversation: null,
    isConversationNew: true,
    conversationLoadingStatus: false,
    chatLoadingStatus: false,
    selectedChatListenerRef: null,
    messages: [],
    hasMoreMessages: true,
    areConversationsLoaded: false,
    leftDrawerOpen: true,
    newConversationUser: null,
    showScrollButton: false,
    paramsSellerId: null,
    reffererProduct: null,
    messageInput: {},
    productMessageModel: null,
  }),
  actions: {
    updateConversationInState(updatedConversation) {
      const conversations = this.conversations;
      const index = conversations.findIndex(
        (conv) => conv.id == updatedConversation.id
      );
      conversations.splice(index, 1);
      conversations.unshift(updatedConversation);
      this.conversations = conversations;
    },

    async lookForConversationChanges() {
      this.selectedConversation = null;
      this.messages = [];

      if (!this.areConversationsLoaded) {
        this.conversationLoadingStatus = true;

        const db = getFirestore();
        const user = this.$cookies.get("AUTH_USER");
        if (!user) {
          return;
        }
        const conversationRef = collection(db, "Conversations");
        const q = query(
          conversationRef,
          where("members", "array-contains", "" + user.id),
          orderBy("createdAt", "desc")
        );

        /*const unsubscribe = */
        onSnapshot(q, (snapshot) => {
          this.conversationLoadingStatus = false;
          snapshot.docChanges().forEach((change) => {
            const id = change.doc.id;
            const conversation = {
              id,
              ...change.doc.data(),
            };
            if (change.type === "added") {
              //console.log("added Conversation: ", conversation);
              this.conversations.push(conversation);

              // auto open conversation if already have a chat with user id of seller in params
              this.autoOpenChatIfExist(conversation);
            }
            if (change.type === "modified") {
              console.log("Modified Conversation: ", conversation);
              this.updateConversationInState(conversation);
            }
            if (change.type === "removed") {
              console.log("Removed Conversation: ", conversation);
            }
          });
        });
      } else {
        this.conversations.forEach((conversation) => {
          this.autoOpenChatIfExist(conversation);
        });
      }
      this.areConversationsLoaded = true;
    },

    openSelectedConversation(conversation) {
      this.chatLoadingStatus = true;
      this.newConversationUser = null;
      this.paramsSellerId = null;

      const selectedConversation = this.conversations.find(
        (conv) => conv.id == conversation.id
      );

      this.selectedConversation = selectedConversation || conversation;
      this.messages = [];
      this.hasMoreMessages = true;

      //unsubscribe old chat listener
      if (this.selectedChatListenerRef) {
        this.selectedChatListenerRef();
      }

      const db = getFirestore();

      const chatRef = collection(
        db,
        `Conversations/${selectedConversation.id}/Messages`
      );
      const limitRecords = 15;
      const q = query(chatRef, orderBy("sentAt"), limitToLast(limitRecords));
      this.selectedChatListenerRef = onSnapshot(q, (snapshot) => {
        this.hasMoreMessages =
          snapshot.docs.length == limitRecords ? true : false;

        snapshot.docChanges().forEach((change) => {
          const id = change.doc.id;
          const message = {
            id,
            ...change.doc.data(),
          };
          if (change.type === "added") {
            this.messages.push(message);
            this.scrollToBottom();
          }
          if (change.type === "modified") {
            console.log("Modified Message: ", message);
          }
          if (change.type === "removed") {
            console.log("Removed Message: ", message);
          }
        });
        this.chatLoadingStatus = false;
      });
    },

    async sendMessage(payload) {
      if (!this.selectedConversation && !this.newConversationUser) {
        return;
      } else if (this.newConversationUser && !this.selectedConversation) {
        this.createNewConversation(payload);
        return;
      }
      const authStore = useAuthStore();

      const db = getFirestore();
      const newDocId = new Date().getTime().toString() + "id";

      if (!this.selectedConversation) {
        return;
      }

      const chatRef = doc(
        collection(
          db,
          `Conversations/${this.selectedConversation.id}/Messages`
        ),
        newDocId
      );

      const newMessage = {
        message: payload.message,
        attachmentType: payload.attachmentType,
        sentAt: new Date(new Date().toISOString()).getTime(),
        senderID: "" + authStore.authUser.id,
        productMessageModel: this.productMessageModel,
        id: newDocId,
      };

      console.log("New Message", newMessage);
      setDoc(chatRef, newMessage);

      this.updateConversation(newMessage);
      this.productMessageModel = null;
    },

    updateConversation(message) {
      const authStore = useAuthStore();
      const conversation = this.selectedConversation;
      const db = getFirestore();
      const user = authStore.authUser;
      const conversationRef = doc(db, "Conversations", conversation.id);

      conversation.membersInfo.forEach((member) => {
        if (member.id == user.id) {
          member.name = user.name;
          member.photo = authStore.profilePhoto;
          member.hasReadLastMessage = true;
          member.type = "available";
        }
      });

      updateDoc(conversationRef, {
        sentAt: new Date(new Date().toISOString()).getTime(),
        senderName: user.name,
        senderID: user.id,
        lastMessage:
          message.attachmentType == 0 ? message.message : "Sent an image",
        membersInfo: conversation.membersInfo,
      });
    },

    async createNewConversation(messagePayload) {
      const authStore = useAuthStore();
      const db = getFirestore();
      const authUser = authStore.authUser;
      const newConvId = new Date().getTime().toString() + "convId";
      const conversationRef = doc(db, "Conversations", newConvId);
      const user = this.newConversationUser;

      const membersInfo = [
        {
          id: "" + user.id,
          name: user.name,
          photo: user.photo,
          type: "available",
          hasReadLastMessage: false,
        },
        {
          id: "" + authUser.id,
          name: authUser.name,
          photo: authStore.profilePhoto,
          type: "available",
          hasReadLastMessage: true,
        },
      ];
      const members = ["" + user.id, "" + authUser.id];

      const newConv = {
        id: newConvId,
        senderName: authUser.name,
        senderID: authUser.id,
        lastMessage: "",
        members,
        membersInfo,
        sentAt: new Date(new Date().toISOString()).getTime(),
        createdAt: new Date(new Date().toISOString()).getTime(),
      };
      await setDoc(conversationRef, newConv);
      this.selectedConversation = newConv;
      this.openSelectedConversation(newConv);
      this.sendMessage(messagePayload);
    },

    scrollToBottom() {
      setTimeout(() => {
        const messagesDiv = document.getElementById("messages-main-div");
        if (messagesDiv) {
          messagesDiv.scrollTop = parseInt(messagesDiv.scrollHeight);
          //console.log(messagesDiv.scrollHeight, messagesDiv.scrollTop)
        }
      }, 300);
    },
    autoOpenChatIfExist(conversation) {
      // auto open conversation if already have a chat with user id of seller in params
      if (
        this.paramsSellerId &&
        conversation.membersInfo.find(
          (member) => member.id == this.paramsSellerId
        )
      ) {
        this.selectedConversation = conversation;
        this.newConversationUser = null;
        this.openSelectedConversation(conversation);
      }
    },
  },
});
