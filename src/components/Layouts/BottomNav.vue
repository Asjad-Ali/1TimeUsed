<template>
  <q-footer reveal bordered elevated>
    <q-tabs
      v-model="footerTab"
      indicator-color="orange-9"
      dense
      active-color="orange-9"
      no-caps
      class="bg-grey-2 text-black font-creepster"
    >
      <q-tab
        v-for="link in footerLinks"
        :key="link.title"
        :name="link.title"
        @click="$router.push(link.to)"
        :icon="link.icon"
        :label="link.title"
      />
    </q-tabs>
  </q-footer>
</template>

<script  >
import { defineComponent, ref } from "vue";

const footerLinks = [
  {
    title: "Home",
    icon: "home",
    to: "/",
  },
  {
    title: "Explore",
    icon: "search",
    to: "/",
  },
  {
    title: "Crew",
    icon: "group",
    to: "/",
  },
  {
    title: "Tournaments",
    icon: "emoji_events",
    to: "/",
  },
  {
    title: "Profile",
    icon: "person",
    to: "/",
  },
];

export default defineComponent({
  setup() {
    const footerTab = ref("mails");

    return {
      footerTab,
      footerLinks,
    };
  },
});
</script>
