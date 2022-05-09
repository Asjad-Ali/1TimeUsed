<template>
  <div class="chat-container">
    <div class="container">
      <div class="chat-hight">
        <div class="row q-my-xl">
          <div class="col-md-3 col-12 bg-white rounded-10">
            <ConversationsSection :conversations="chatStore.conversations" />
          </div>
          <div class="col-md-1"></div>
          <div class="col-md-8 col-12 bg-white rounded-10 chat-box">
            <div class="scroll-div">
              <div class="q-pa-md row justify-center">
                <div style="width: 100%">
                  <q-chat-message label="Sunday, 19th" />

                  <q-chat-message
                    name="me"
                    avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                    :text="['hey, how are you?']"
                    sent
                    stamp="7 minutes ago"
                  />
                  <q-chat-message
                    name="Jane"
                    avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                    :text="['doing fine, how r you?']"
                    stamp="4 minutes ago"
                  />
                </div>
              </div>
            </div>
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useChatStore } from "src/stores/chat.store";
import { useAuthStore } from "src/stores/auth.store";
import useFirebaseAuth from "src/composables/useFirebaseAuth";
import ConversationsSection from "src/components/Chat/ConversationsSection.vue";
import ChatInput from "src/components/Chat/ChatInput.vue";
import { useRouter } from "vue-router";
const chatStore = useChatStore();
const authStore = useAuthStore();
const { loginAnonymously } = useFirebaseAuth();
const router = useRouter();
onMounted(() => {
  if (!authStore.authUser) {
    router.push("/login");
  }
  if (!authStore.isUserAuthenticatedOnFirebase) {
    loginAnonymously();
  }
  chatStore.lookForConversationChanges();
});
</script>
<style lang="scss" scoped>
.chat-box {
  position: relative;
}

.chat-box {
  @media screen and (max-width: $breakpoint-sm-max) {
    height: 80vh;
    margin-top: 20px;
  }
}
</style>
