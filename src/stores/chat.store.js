import {
  defineStore
} from 'pinia'
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

export const useChatStore = defineStore('chat', {
  state: () => ({
    conversations: [],
    selectedConversation: null,
    isConversationNew: true,
    referrerMsg: false,
    conversationLoadingStatus: null,
    chatLoadingStatus: null,
    selectedChatListenerRef: null,
    messages: [],
    hasMoreMessages: true,
    areConversationsLoaded: false,
    viewType: 'conversations',
  }),
  actions: {

    updateConversationInState(updatedConversation) {
      const conversations = this.conversations;
      const index = conversations.findIndex((conv) => conv.id == updatedConversation.id);
      conversations.splice(index, 1);
      conversations.unshift(updatedConversation);
      this.conversations = conversations;
    },

    async lookForConversationChanges() {
      this.conversationLoadingStatus = "LOADING";
      if (!this.areConversationsLoaded) {

        const db = getFirestore();
        const user = this.$cookies.get('AUTH_USER');
        const conversationRef = collection(db, "Conversations");
        const q = query(
          conversationRef,
          where("members", "array-contains", "" + user.id),
          orderBy("createdAt", "desc")
        );

        /*const unsubscribe = */
        onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const id = change.doc.id;
            const conversation = {
              id,
              ...change.doc.data()
            };
            if (change.type === "added") {
              console.log("added Conversation: ", conversation);
              this.conversations.push(conversation);
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
      }
      this.conversationLoadingStatus = "COMPLETED";
      this.setConversationsAreLoaded = true;
    },


    openSelectedConversation(conversation) {

      this.chatLoadingStatus = true;

      const selectedConversation = this.conversations.find(
        (conv) => conv.id == conversation.id
      );
      this.selectedConversation = selectedConversation;
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
      const limitRecords = 8;
      const q = query(chatRef, orderBy("sentAt"), limitToLast(limitRecords));
      this.selectedChatListenerRef = onSnapshot(q, (snapshot) => {

        this.hasMoreMessages = snapshot.docs.length == limitRecords ? true : false;

        snapshot.docChanges().forEach((change) => {
          const id = change.doc.id;
          const message = {
            id,
            ...change.doc.data()
          };
          if (change.type === "added") {
            this.messages.push(message);
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
  }
})
