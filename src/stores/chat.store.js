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
  }),
  actions: {
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
              //update conversation in state
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
  }
})
