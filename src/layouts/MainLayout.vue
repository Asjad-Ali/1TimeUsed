<template>
  <q-layout view="hHh lpR fFf">
    <HeaderSection v-if="$q.screen.gt.sm || $route.path == '/'" />
    <SecondaryMobileHeader v-else />

    <q-page-container>
      <div v-if="$route.path == '/'">
        <CategoriesSection v-if="$q.screen.gt.sm" />
        <MobileCategoriesSection v-else />
      </div>

      <router-view />
    </q-page-container>
    <FooterMain v-if="$q.screen.gt.sm" />
    <BottomNav v-else />
  </q-layout>
</template>

<script>
import { useAuthStore } from "src/stores/auth.store";
export default {
  async preFetch({ store, currentRoute }) {
    const authStore = useAuthStore(store);
    authStore.loadAuthUser();
  },
};
</script>

<script setup>
import { onMounted } from "vue";
import HeaderSection from "src/components/Layouts/HeaderSection.vue";
import SecondaryMobileHeader from "src/components/Layouts/SecondaryMobileHeader.vue";
import BottomNav from "../components/Layouts/BottomNav.vue";
import FooterMain from "../components/Layouts/FooterMain.vue";
import CategoriesSection from "src/components/CategoriesSection.vue";
import MobileCategoriesSection from "src/components/MobileCategoriesSection.vue";
const authStore = useAuthStore();
onMounted(() => {
  authStore.loadFirebaseAuth();
});
</script>
