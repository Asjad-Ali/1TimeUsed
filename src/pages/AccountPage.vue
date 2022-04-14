<template>
  <div class="container q-py-lg">
    <h1 class="text-h5 text-center vw99">Account</h1>
    <!-- Avatar -->
    <div class="profile-avatar column items-center vw99">
      <q-avatar size="100px">
        <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>

      <div class="text-h6 text-center q-pt-sm">Talha Tahir</div>
      <div class="email text-grey">Asif.ali142280@gmail.com</div>
    </div>
    <div class="flex justify-center items-center vw99">
      <div class="q-pa-md account-tab">
        <q-list bordered>
          <div v-for="(menu, index) in menus" :key="index">
            <q-item @click="$router.push(menu.to)" clickable>
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

const router = useRouter();
const menus = [
  {
    title: "Wishlist",
    icon: "favorite_border",
    to: "/wishlist",
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
    to: "/terms",
  },
  {
    title: "Privacy Policy",
    icon: "perm_contact_calendar",
    to: "/privacy_policy",
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
    to: "/",
  },
];
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
