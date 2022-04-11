<template>
  <div class="container q-py-lg">
    <h1 class="text-h5 text-center vw99">Account Settings</h1>
    <!-- Avatar -->
    <div class="profile-avatar column items-center vw99">
      <q-avatar size="100px">
        <img src="https://www.w3schools.com/w3images/avatar2.png" />
        <div class="absolute-bottom text-right" style="right: 6px; bottom: 5px">
          <q-btn round color="black" size="8px" icon="photo_camera" />
        </div>
      </q-avatar>

      <div class="text-h6 text-center q-pt-sm">Talha Tahir</div>
      <div class="email text-grey">Asif.ali142280@gmail.com</div>

      <div class="flex justify-center items-center vw99">
        <div class="q-pa-md account-tab">
          <q-input
            outlined
            v-model="user.name"
            label="Enter Full Name"
            class="q-mb-md"
          />
          <q-input
            outlined
            v-model="user.city"
            label="Enter City"
            class="q-mb-md"
          />
          <q-input
            outlined
            v-model="user.email"
            label="TalhaTahir@gmail.com"
            class="q-mb-md"
          />
          <q-input
            outlined
            v-model="user.phone"
            label="Enter Phone "
            class="q-mb-md"
          />
          <q-input
            outlined
            v-model="user.neighbourhood"
            label="Enter Neighborhood "
            class="q-mb-md"
          />
          <q-toggle v-model="accept" label="Show my phone number in ads" />
        </div>
      </div>

      <q-btn color="primary" glossy label="Update Setting" />
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
const accept = ref(false);

const user = ref({
  name: "Asif Ali",
  email: "anyemail@gmail.com",
  city: "Lahore",
  neighbourhood: "Johar Town",
  phone: "+9230012345678",
});
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
