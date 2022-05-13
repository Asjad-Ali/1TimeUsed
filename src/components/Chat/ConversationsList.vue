<template>
  <q-drawer
    v-model="chatStore.leftDrawerOpen"
    show-if-above
    bordered
    :breakpoint="690"
  >
    <q-toolbar class="bg-grey-3">
      <q-avatar class="cursor-pointer">
        <img :src="authStore.profilePhoto" />
      </q-avatar>

      <span class="q-ml-md">Conversations</span>

      <q-space />

      <q-btn round flat icon="more_vert">
        <q-menu auto-close :offset="[110, 8]">
          <q-list style="min-width: 150px">
            <q-item clickable>
              <q-item-section>Profile</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Archived</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Favorites</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn
        round
        flat
        icon="close"
        class="WAL__drawer-close"
        @click="chatStore.leftDrawerOpen = !chatStore.leftDrawerOpen"
      />
    </q-toolbar>

    <q-toolbar class="bg-grey-2">
      <q-input
        rounded
        outlined
        dense
        class="WAL__field full-width"
        bg-color="white"
        v-model="search"
        placeholder="Search or start a new conversation"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-toolbar>

    <q-scroll-area style="height: calc(100% - 100px)">
      <q-list>
        <q-item
          v-for="(conversation, index) in chatStore.conversations"
          :key="conversation.id"
          clickable
          @click="openConversation(conversation)"
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="otherMember(conversation).photo" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              {{ otherMember(conversation).name }}
            </q-item-label>
            <q-item-label class="conversation__summary" caption>
              <q-icon name="check" v-if="index % 2 == 0" />
              <q-icon name="not_interested" v-else />
              {{
                conversation.senderID == authStore.authUser.id
                  ? "Me"
                  : otherMember(conversation).name.split(" ")[0]
              }}
              : {{ conversation.lastMessage.substring(0, 25) }}
              {{ conversation.lastMessage.length > 25 ? "..." : "" }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label caption>
              {{ timeDiff(conversation.sentAt) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
import { useChatStore } from "src/stores/chat.store";
import { useAuthStore } from "src/stores/auth.store";
import useChat from "src/composables/useChat";

const chatStore = useChatStore();
const authStore = useAuthStore();
const { timeDiff } = useChat();
const search = ref("");

const $q = useQuasar();

const style = computed(() => ({
  height: $q.screen.height + "px",
}));

const otherMember = (conversation) => {
  const user = conversation.membersInfo.find(
    (member) => authStore.authUser.id != member.id
  );
  user.photo = !user.photo
    ? authStore.defaultAvatar
    : (!user.photo.includes("http") ? process.env.imagesBaseURL : "") +
      user.photo;
  return user;
};

const openConversation = (conversation) => {
  console.log(conversation);
  if ($q.screen.lt.md) {
    chatStore.leftDrawerOpen = false;
  }
  chatStore.openSelectedConversation(conversation);
};
</script>
