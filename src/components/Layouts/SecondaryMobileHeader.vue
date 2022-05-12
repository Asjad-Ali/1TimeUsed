<template>
  <div class="bg-white">
    <div
      class="container bg-primary row border-bottom items-center"
      style="height: 60px; width: 100%"
    >
      <q-icon
        @click="
          $route.path == '/chat' &&
          chatStore.viewType == 'chat' &&
          $q.screen.lt.md
            ? (chatStore.viewType = 'conversations')
            : $router.back()
        "
        name="keyboard_backspace"
        size="md"
        color="white"
      />

      <div
        class="q-ml-lg"
        v-if="
          $route.path == '/chat' &&
          chatStore.viewType == 'chat' &&
          $q.screen.lt.md
        "
      >
        <q-avatar class="q-mr-sm">
          <img :src="chatMember.photo" />
        </q-avatar>
        <span class="text-white text-h6">{{ chatMember.name }}</span>
      </div>

      <span
        v-else
        class="text-weight-medium text-h6 text-white q-mx-auto"
        style="text-transform: capitalize"
        >{{
          $route.path.includes("/subcategory/")
            ? $route.params.name || $route.params.id
            : $route.path.split("/")[1]
        }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from "src/stores/chat.store";
import { useAuthStore } from "src/stores/auth.store";
import { computed } from "@vue/runtime-core";

const chatStore = useChatStore();
const authStore = useAuthStore();

const chatMember = computed(() => {
  const user = chatStore.selectedConversation.membersInfo.find(
    (user) => user.id != authStore.authUser.id
  );

  user.photo = !user.photo
    ? authStore.defaultAvatar
    : (!user.photo.includes("http") ? process.env.imagesBaseURL : "") +
      user.photo;
  return user;
});
</script>

<style lang="scss" scoped></style>
