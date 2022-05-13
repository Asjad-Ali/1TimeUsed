<template>
  <div class="container">
    <div class="WAL position-relative">
      <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
        <ChatHeader v-if="$q.screen.gt.sm" />
        <ConversationsList />

        <q-page-container class="bg-grey-2">
          <div class="q-pa-md row justify-center">
            <div
              style="width: 100%; max-width: 100%; height: calc(100vh - 132px)"
            >
              <!-- <q-chat-message label="Sunday, 19th" /> -->

              <q-spinner
                v-if="chatStore.chatLoadingStatus"
                color="primary"
                size="3em"
                class="absolute-center"
              />

              <div v-else>
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
                      : `<img src='${message.message}' style='max-width:200px' />`,
                  ]"
                  :text-html="message.attachmentType != 0 ? true : false"
                  :sent="authStore.authUser.id == message.senderID"
                  :stamp="timeDiff(message.sentAt)"
                />
              </div>
            </div>
          </div>
        </q-page-container>

        <ChatFooter />
      </q-layout>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ConversationsList from "src/components/Chat/ConversationsList.vue";
import ChatHeader from "src/components/Chat/ChatHeader.vue";
import ChatFooter from "src/components/Chat/ChatFooter.vue";
import { useChatStore } from "src/stores/chat.store";
import { useAuthStore } from "src/stores/auth.store";
import useFirebaseAuth from "src/composables/useFirebaseAuth";
import { useRouter } from "vue-router";
import useChat from "src/composables/useChat";

const chatStore = useChatStore();
const authStore = useAuthStore();

const router = useRouter();
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
</script>

<!-- <style  lang="sass">
.WAL
    width: 100%
    height: 100%
    padding-top: 20px
    padding-bottom: 20px
&:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    background-color: #009688
&__layout
    margin: 0 auto
    z-index: 4000
    height: 100%
    width: 90%
    max-width: 950px
    border-radius: 5px
&__field.q-field--outlined .q-field__control:before
    border: none
.q-drawer--standard
    .WAL__drawer-close
        display: none
@media (max-width: 850px)
.WAL
    padding: 0
    &__layout
        width: 100%
        border-radius: 0
@media (min-width: 691px)
.WAL
    &__drawer-open
        display: none
.conversation__summary
    margin-top: 4px
.conversation__more
    margin-top: 0!important
    font-size: 1.4rem
</style> -->
<style scoped>
.WAL {
  height: calc(100vh - 100px);
  padding-bottom: 10px;
}
@media (max-width: 768px) {
  .WAL {
    height: calc(100vh - 120px);
    padding-bottom: 0;
  }
}
</style>
