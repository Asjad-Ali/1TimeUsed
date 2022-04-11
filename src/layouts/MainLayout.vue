<template>
  <q-layout view="hHh lpR fFf">
    <HeaderSection />

    <q-page-container>
      <CategoriesSection v-if="$q.screen.gt.sm && $route.path == '/'" />
      <router-view />
    </q-page-container>
    <FooterMain v-if="$q.screen.gt.sm" />
    <BottomNav v-else />
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import HeaderSection from "src/components/Layouts/HeaderSection.vue";
import BottomNav from "../components/Layouts/BottomNav.vue";
import FooterMain from "../components/Layouts/FooterMain.vue";
import CategoriesSection from "src/components/CategoriesSection.vue";

export default defineComponent({
  name: "MainLayout",
  components: { HeaderSection, BottomNav, FooterMain, CategoriesSection },
  setup() {
    return {};
  },
});
</script>
