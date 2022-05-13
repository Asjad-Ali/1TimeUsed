<template>
  <div class="container">
    <div class="WAL position-relative">
      <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container>
        <!-- Top Header -->
        <q-header elevated>
          <q-toolbar class="bg-grey-3 text-black">
            <q-btn
              round
              flat
              icon="keyboard_arrow_left"
              class="WAL__drawer-open q-mr-sm"
              @click="toggleLeftDrawer"
            />

            <q-btn round flat>
              <q-avatar>
                <img :src="currentConversation.avatar" />
              </q-avatar>
            </q-btn>

            <span class="q-subtitle-1 q-pl-md">
              {{ currentConversation.person }}
            </span>

            <q-space />

            <q-btn round flat icon="search" />

            <q-btn round flat icon="more_vert">
              <q-menu auto-close :offset="[110, 0]">
                <q-list style="min-width: 150px">
                  <q-item clickable>
                    <q-item-section>Contact data</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Block</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Select messages</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Silence</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Clear messages</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Erase messages</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-toolbar>
        </q-header>
        <!-- Side Bar -->
        <q-drawer
          v-model="leftDrawerOpen"
          show-if-above
          bordered
          :breakpoint="690"
        >
          <q-toolbar class="bg-grey-3">
            <q-avatar class="cursor-pointer">
              <img
                src="https://1timeused.com/uploads/profiles/813516520823832."
              />
            </q-avatar>

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
              @click="toggleLeftDrawer"
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
                v-for="(conversation, index) in conversations"
                :key="conversation.id"
                clickable
                v-ripple
                @click="setCurrentConversation(index)"
              >
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="conversation.avatar" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">
                    {{ conversation.person }}
                  </q-item-label>
                  <q-item-label class="conversation__summary" caption>
                    <q-icon name="check" v-if="conversation.sent" />
                    <q-icon name="not_interested" v-if="conversation.deleted" />
                    {{ conversation.caption }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-item-label caption>
                    {{ conversation.time }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </q-drawer>
        <!-- Conversation -->
        <q-page-container>
          <div class="q-pa-md row justify-center">
            <div style="width: 100%; max-width: 100%">
              <q-chat-message label="Sunday, 19th" />

              <q-chat-message
                name="me"
                avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                :text="['hey, how are you?']"
                sent
                stamp="7 minutes ago"
                v-for="i in 12"
                :key="i"
              />
              <q-chat-message
                name="Jane"
                avatar="https://cdn.quasar.dev/img/avatar3.jpg"
                :text="['doing fine, how r you?']"
                stamp="4 minutes ago"
                v-for="i in 12"
                :key="i"
              />
            </div>
          </div>
        </q-page-container>
        <!-- Write Message -->
        <q-footer>
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
            <q-btn round flat icon="send" />
          </q-toolbar>
        </q-footer>
      </q-layout>
    </div>
  </div>
</template>

<script >
import { useQuasar } from "quasar";
import { ref, computed } from "vue";
const conversations = [
  {
    id: 1,
    person: "Razvan Stoenescu",
    avatar: "https://cdn.quasar.dev/team/razvan_stoenescu.jpeg",
    caption: "I'm working on Quasar!",
    time: "15:00",
    sent: true,
  },
  {
    id: 2,
    person: "Dan Popescu",
    avatar: "https://cdn.quasar.dev/team/dan_popescu.jpg",
    caption: "I'm working on Quasar!",
    time: "16:00",
    sent: true,
  },
  {
    id: 3,
    person: "Jeff Galbraith",
    avatar: "https://cdn.quasar.dev/team/jeff_galbraith.jpg",
    caption: "I'm working on Quasar!",
    time: "18:00",
    sent: true,
  },
  {
    id: 4,
    person: "Allan Gaunt",
    avatar: "https://cdn.quasar.dev/team/allan_gaunt.png",
    caption: "I'm working on Quasar!",
    time: "17:00",
    sent: true,
  },
  {
    id: 5,
    person: "Allan Gaunt",
    avatar: "https://cdn.quasar.dev/team/allan_gaunt.png",
    caption: "I'm working on Quasar!",
    time: "17:00",
    sent: true,
  },
  {
    id: 6,
    person: "Allan Gaunt",
    avatar: "https://cdn.quasar.dev/team/allan_gaunt.png",
    caption: "I'm working on Quasar!",
    time: "17:00",
    sent: true,
  },
  {
    id: 7,
    person: "Allan Gaunt",
    avatar: "https://cdn.quasar.dev/team/allan_gaunt.png",
    caption: "I'm working on Quasar!",
    time: "17:00",
    sent: true,
  },
  {
    id: 8,
    person: "Allan Gaunt",
    avatar: "https://cdn.quasar.dev/team/allan_gaunt.png",
    caption: "I'm working on Quasar!",
    time: "17:00",
    sent: true,
  },
];
export default {
  name: "WhatsappLayout",
  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    const search = ref("");
    const message = ref("");
    const currentConversationIndex = ref(0);
    const currentConversation = computed(() => {
      return conversations[currentConversationIndex.value];
    });
    const style = computed(() => ({
      height: $q.screen.height + "px",
    }));
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    function setCurrentConversation(index) {
      currentConversationIndex.value = index;
    }
    return {
      leftDrawerOpen,
      search,
      message,
      currentConversationIndex,
      conversations,
      currentConversation,
      setCurrentConversation,
      style,
      toggleLeftDrawer,
    };
  },
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
  background: #f5f5f5 !important;
}

@media (max-width: 768px) {
  .WAL {
    height: calc(100vh - 120px);
    padding-bottom: 0;
  }
}
</style>
