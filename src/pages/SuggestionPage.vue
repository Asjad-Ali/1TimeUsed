<template>
  <div class="container q-py-lg">
    <h1 class="text-h5 text-center w-100">Suggestion</h1>
    <!-- Avatar -->
    <div class="profile-avatar column items-center w-100">
      <!-- <q-avatar size="100px">
        <img src="https://www.w3schools.com/w3images/avatar2.png" />
        <div class="absolute-bottom text-right" style="right: 6px; bottom: 5px">
          <q-btn round color="black" size="8px" icon="photo_camera" />
        </div>
      </q-avatar>

      <div class="text-h6 text-center q-pt-sm">Talha Tahir</div>
      <div class="email text-grey">Asif.ali142280@gmail.com</div> -->

      <div class="flex justify-center items-center w-100">
        <div class="q-pa-md account-tab">
          <q-input
            outlined
            v-model="user.name"
            label="Subject"
            class="q-mb-md"
          />
          <q-input
            outlined
            type="textarea"
            v-model="user.name"
            label="Description"
            class="q-mb-md"
          />
        </div>
      </div>

      <q-btn color="primary" glossy label="Add Suggestion" />
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
const accept = ref(false);

const user = ref({
  name: "",
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
