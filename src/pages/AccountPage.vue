<template>
  <div class="container q-py-lg">
    <h1 class="text-h5 text-center vw99">Account</h1>
    <!-- Avatar -->
    <div class="profile-avatar column items-center vw99">
      <q-avatar size="100px">
        <img
          :src="
            profile
              ? imageBaseURL + profile.photo
              : `https://www.w3schools.com/w3images/avatar2.png`
          "
          alt="img"
          style="object-fit: cover"
        />
      </q-avatar>
      <div v-if="profile" class="text-h6 text-center q-pt-sm">
        {{ profile.name }}
      </div>
      <div v-if="profile" class="email text-grey">{{ profile.email }}</div>
    </div>
    <div class="flex justify-center items-center vw99">
      <div class="q-pa-md account-tab">
        <q-list bordered class="bg-white rounded">
          <div v-for="(menu, index) in menus" :key="index">
            <q-item
              @click="
                menu.to.includes('http')
                  ? openWindow(menu.to)
                  : $router.push(menu.to)
              "
              clickable
            >
              <q-item-section avatar>
                <q-icon color="primary" :name="menu.icon" />
              </q-item-section>

              <q-item-section>{{ menu.title }}</q-item-section>
            </q-item>
            <q-separator />
          </div>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth.store";
import { onMounted } from "vue";
import { useWishlistStore } from "../stores/wishlist.store";
const store = useWishlistStore();
const imageBaseURL = process.env.imagesBaseURL;
const authStore = useAuthStore();
const profile = authStore.authUser;
onMounted(() => store.loadWishlistProducts());
const menus = [
  {
    title: "Wishlist",
    icon: "favorite_border",
    to: "/wishlist",
  },
  {
    title: "Sell",
    icon: "add_circle",
    to: "/sell",
  },
  {
    title: "Account Setting",
    icon: "settings",
    to: "/account_setting",
  },
  {
    title: "Suggestions",
    icon: "feedback",
    to: "/suggestion",
  },
  {
    title: "Terms",
    icon: "notifications_none",
    to: "https://1timeused.com/terms-conditions",
  },
  {
    title: "Privacy Policy",
    icon: "perm_contact_calendar",
    to: "https://1timeused.com/privacy-policy",
  },
  {
    title: "Rate the App",
    icon: "star",
    to: "https://play.google.com/store/apps/details?id=com.horizam.onetimeused",
  },
  {
    title: "About Us",
    icon: "man",
    to: "/about_us",
  },
  {
    title: "Sign Out",
    icon: "logout",
    to: "/login",
  },
];

const openWindow = (url) => {
  window.open(url, "_blank");
};
</script>

<style lang="scss" scoped>
.account-tab {
  width: 50%;
}

@media (max-width: $breakpoint-sm-max) {
  .account-tab {
    width: 100%;
  }
}
</style>
