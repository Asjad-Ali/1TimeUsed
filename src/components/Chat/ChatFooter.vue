<template>
  <q-footer
    v-if="chatStore.selectedConversation || chatStore.newConversationUser"
  >
    <q-toolbar class="bg-grey-3 text-black row">
      <q-btn round flat icon="collections" class="q-mr-sm" />
      <q-input
        rounded
        outlined
        dense
        class="WAL__field col-grow q-mr-sm"
        bg-color="white"
        v-model="message"
        placeholder="Type a message"
      />
      <!-- <q-btn round flat icon="mic" /> -->
      <q-btn @click="sendMessage" round flat icon="send" />
    </q-toolbar>
  </q-footer>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth.store";
import { useChatStore } from "src/stores/chat.store";
import { ref } from "vue";
const message = ref("");

const chatStore = useChatStore();
const authStore = useAuthStore();

const sendMessage = async () => {
  if (!message.value?.trim()) {
    return;
  }

  await chatStore.sendMessage({
    message: message.value,
    attachmentType: 0,
    senderID: authStore.authUser.id,
    productMessageModel: null,
  });

  message.value = "";
};
</script>
