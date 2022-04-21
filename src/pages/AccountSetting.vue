<template>
  <div class="container q-py-lg">
    <h1 class="text-h5 text-center w-100">Account Settings</h1>
    <!-- Avatar -->
    <div class="profile-avatar column items-center w-100">
      <q-avatar size="100px">
        <img src="https://www.w3schools.com/w3images/avatar2.png" />
        <div class="absolute-bottom text-right" style="right: 6px; bottom: 5px">
          <q-btn round color="black" size="8px" icon="photo_camera" />
        </div>
      </q-avatar>

      <div class="text-h6 text-center q-pt-sm">{{ profile.name }}</div>
      <div class="email text-grey">{{ profile.email || profile.phone }}</div>

      <div class="flex justify-center items-center w-100">
        <div class="q-pa-md account-tab">
          <q-input
            outlined
            v-model="profile.name"
            label="Enter Full Name"
            class="q-mb-md bg-white"
          />
          <q-input
            outlined
            v-model="profile.city"
            label="Enter City"
            class="q-mb-md bg-white"
          />
          <q-input
            outlined
            v-model="profile.email"
            label="TalhaTahir@gmail.com"
            class="q-mb-md bg-white"
          />
          <q-input
            outlined
            v-model="profile.phone"
            label="Enter Phone "
            class="q-mb-md bg-white"
          />
          <q-input
            outlined
            v-model="profile.neighbourhood"
            label="Enter Neighborhood "
            class="q-mb-md bg-white"
          />
          <q-toggle v-model="accept" label="Show my phone number in ads" />
        </div>
      </div>

      <q-btn color="primary" glossy label="Update Setting" />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth.store";
import { ref } from "vue";
const authStore = useAuthStore();
const profile = authStore.authUser;
const accept = ref(false);
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
