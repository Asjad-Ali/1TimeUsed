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

      <div class="text-h6 text-center q-pt-sm">{{ userName }}</div>
      <div class="email text-grey">{{ userEmail || userPhone }}</div>

      <div class="flex justify-center items-center w-100">
        <div class="q-pa-md account-tab">
          <q-input
            outlined
            v-model="profile.name"
            label="Enter Full Name"
            class="q-mb-md bg-white"
            :rules="[
              (val) => val.length >= 3 || 'Name must be atleast 3 characters',
            ]"
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
            label="example@mail.com"
            class="q-mb-md bg-white"
            :rules="[rules.required, rules.email]"
          />
          <q-input
            outlined
            v-model="profile.phone"
            label="Enter Phone "
            class="q-mb-md bg-white"
            maxlength="13"
            type="text"
            @keyup="validatePhone"
            :rules="[
              rules.required,
              (val) => val.length == 13 || 'Number must be 13 characters',
            ]"
          />
          <q-input
            outlined
            v-model="profile.neighborhood"
            label="Enter Neighborhood "
            class="q-mb-md bg-white"
          />
          <q-toggle v-model="accept" label="Show my phone number in ads" />
        </div>
      </div>

      <q-btn
        color="primary"
        glossy
        label="Update Setting"
        @click="update_profile()"
      />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth.store";
import { ref } from "vue";
import useValidationRules from "src/composables/useValidationRules";

const { rules } = useValidationRules();
const authStore = useAuthStore();
const profile = authStore.authUser;

const userName = ref(profile.name);
const userEmail = ref(profile.email);
const userPhone = ref(profile.phone);
const accept = ref(false);

const update_profile = async () => {
  const response = await authStore.updateProfile(profile);
  if (response.status == 200) {
    userName.value = profile.name;
    userEmail.value = profile.email;
    userPhone.value = profile.phone;
  }
};

const validatePhone = () => {
  if (profile.phone.length <= 4 && profile.phone.substring(0, 4) != "+923") {
    profile.phone = "+923";
  } else {
    profile.phone = "+" + profile.phone.replace(/[^0-9]/g, "");
  }
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
