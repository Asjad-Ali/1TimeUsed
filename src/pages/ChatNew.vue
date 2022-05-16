<template>
  <div class="container">
    <div class="WAL position-relative">
      <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
        <ChatHeader v-if="$q.screen.gt.xs" />
        <ConversationsList />

        <q-page-container class="bg-grey-2">
          <div class="q-pa-md row justify-center items-center">
            <div style="width: 100%">
              <!-- <q-chat-message label="Sunday, 19th" /> -->

              <ChatLoadingSkeleton v-if="chatStore.chatLoadingStatus" />

              <div v-else id="messages-main-div" style="overflow-y: scroll">
                <q-chat-message
                  v-for="message in chatStore.messages"
                  :key="message.id"
                  :name="
                    authStore.authUser.id == message.senderID
                      ? 'Me'
                      : getMember(message.senderID).name
                  "
                  :avatar="
                    authStore.authUser.id == message.senderID
                      ? authStore.profilePhoto
                      : getMember(message.senderID).photo
                  "
                  :text="[
                    message.attachmentType == 0
                      ? message.message
                      : `<div> <img src='${message.message}' style='max-width:200px' /> </div>`,
                  ]"
                  :text-html="message.attachmentType != 0 ? true : false"
                  :sent="authStore.authUser.id == message.senderID"
                  :stamp="timeDiff(message.sentAt)"
                />

                <q-btn
                  v-if="chatStore.showScrollButton"
                  @click="scrollToBottom"
                  class="fixed-bottom q-mx-auto"
                  fab
                  style="max-width: 40px; bottom: 55px; z-index: 9999"
                  icon="arrow_downward"
                  color="accent"
                />
                <!-- <ImagePreview /> -->
              </div>
            </div>
          </div>
          <div
            class="desktop-only flex justify-center items-center column"
            v-if="
              !chatStore.selectedConversation && !chatStore.newConversationUser
            "
          >
            <img src="../../public/images/chat.svg" alt="chat" width="30%" />

            <div class="text-h6 q-py-md text-grey column">
              Choose a conversation from the left
            </div>
          </div>
        </q-page-container>

        <ChatFooter
          v-if="chatStore.selectedConversation || chatStore.newConversationUser"
        />
      </q-layout>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ConversationsList from "src/components/Chat/ConversationsList.vue";
import ChatLoadingSkeleton from "src/components/Chat/ChatLoadingSkeleton.vue";
import ImagePreview from "src/components/Chat/ImagePreview.vue";
import ChatHeader from "src/components/Chat/ChatHeader.vue";
import ChatFooter from "src/components/Chat/ChatFooter.vue";
import { useChatStore } from "src/stores/chat.store";
import { useAuthStore } from "src/stores/auth.store";
import useFirebaseAuth from "src/composables/useFirebaseAuth";
import { useRoute, useRouter } from "vue-router";
import useChat from "src/composables/useChat";

const chatStore = useChatStore();
const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();
const { timeDiff } = useChat();

const { loginAnonymously } = useFirebaseAuth();

const message = ref("");

onMounted(() => {
  if (!authStore.authUser) {
    router.push("/login");
  }
  if (!authStore.isUserAuthenticatedOnFirebase) {
    loginAnonymously();
  }
  chatStore.lookForConversationChanges();
  chatStore.paramsSellerId = route.params.id ? parseInt(route.params.id) : null;
});

const getMember = (id) => {
  const user = chatStore.selectedConversation.membersInfo.find(
    (member) => member.id == id
  );
  if (!user) return user;

  user.photo = !user.photo
    ? authStore.defaultAvatar
    : (!user.photo.includes("http") ? process.env.imagesBaseURL : "") +
      user.photo;
  return user;
};

const scrollToBottom = () => {
  console.log("tes");
  chatStore.scrollToBottom();
};
</script>

<style scoped>
.WAL {
  height: calc(100vh - 100px);
  padding-bottom: 10px;
  background: #f5f5f5 !important;
}
.desktop-only {
  height: calc(100vh - 150px);
}
.text-h6 {
  font-size: 16px;
}

@media (max-width: 768px) {
  .WAL {
    height: calc(100vh - 120px);
    padding-bottom: 0;
  }
}
</style>
