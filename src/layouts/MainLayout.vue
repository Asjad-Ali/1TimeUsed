<template>
  <q-layout view="hHh lpR fFf">
    <HeaderSection />

    <q-page-container>
      <div v-if="$route.path == '/'">
        <CategoriesSection v-if="$q.screen.gt.sm" />
        <MobileCategoriesSection v-else />
      </div>

      <router-view />
    </q-page-container>
    <FooterMain v-if="$q.screen.gt.sm" />
    <BottomNav v-else />
    <!-- <q-btn
      round
      color="secondary"
      icon="add"
      size="12"
      class="absolute-bottom-right fixed-center"
    /> -->
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import HeaderSection from "src/components/Layouts/HeaderSection.vue";
import BottomNav from "../components/Layouts/BottomNav.vue";
import FooterMain from "../components/Layouts/FooterMain.vue";
import CategoriesSection from "src/components/CategoriesSection.vue";
import MobileCategoriesSection from "src/components/MobileCategoriesSection.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    HeaderSection,
    BottomNav,
    FooterMain,
    CategoriesSection,
    MobileCategoriesSection,
  },
  setup() {
    return {};
  },
});
</script>
