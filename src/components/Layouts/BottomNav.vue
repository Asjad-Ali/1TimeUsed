<template>
  <q-footer bordered elevated>
    <q-tabs
      v-model="footerTab"
      indicator-color="primary"
      dense
      active-color="primary"
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
    title: "Category",
    icon: "category",
    to: "/category",
  },
  {
    title: "Sell",
    icon: "group",
    to: "/",
  },
  {
    title: "Donate",
    icon: "emoji_events",
    to: "/",
  },
  {
    title: "Profile",
    icon: "person",
    to: "/account",
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
