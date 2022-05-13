<template>
  <q-footer
    v-if="chatStore.selectedConversation || chatStore.newConversationUser"
  >
    <q-toolbar class="bg-grey-3 text-black row">
      <input
        type="file"
        ref="mediaInput"
        style="display: none"
        @change="selectMedia"
        accept=".png,.jpg,.Jpg,jpeg"
      />
      <q-btn
        round
        @click="$refs.mediaInput.click()"
        flat
        icon="collections"
        class="q-mr-sm"
      />
      <q-input
        rounded
        outlined
        dense
        class="WAL__field col-grow q-mr-sm"
        bg-color="white"
        v-model="message"
        placeholder="Type a message"
        @keyup.enter="sendMessage"
      />
      <!-- <q-btn round flat icon="mic" /> -->
      <q-btn @click="sendMessage" round flat icon="send" />
    </q-toolbar>
  </q-footer>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth.store";
import { useChatStore } from "src/stores/chat.store";
import compressImage from "src/composables/useImageCompression";
import { ref } from "vue";
const message = ref("");
const chatFile = ref(null);

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

async function selectMedia(e) {
  const file = e.target.files[0];
  chatFile.value = await compressImage(file);
}
</script>
