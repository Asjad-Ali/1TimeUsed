<template>
  <div class="login-bg-img">
    <div class="container q-py-lg">
      <div class="column items-center w-100">
        <div>
          <img src="../../public/images/img_splash_logo.png" width="160" />
        </div>

        <div class="flex justify-center items-center w-100">
          <div class="q-pa-md account-tab">
            <q-input
              v-model="text"
              :dense="dense"
              label="Enter Your Email"
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input
              v-model="text"
              :dense="dense"
              label="Enter Your Password"
              type="password"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>

            <q-toggle v-model="accept" label="Show Password" />
            <div class="w-100 q-my-lg">
              <div class="flex justify-between items-center">
                <q-btn color="primary" glossy label="Login" />

                <q-btn flat color="primary" label="Forgot Password" />
              </div>
              <p class="text-center q-py-md text-grey">Or Login With</p>
              <div class="text-center">
                <q-btn unelevated color="primary" label="login with facebbok" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
const accept = ref(false);

const user = ref({
  name: "Asif Ali",
  email: "anyemail@gmail.com",
  login: "",
  neighbourhood: "",
  phone: "+9230012345678",
});
</script>




<style lang="scss" scoped>
.account-tab {
  width: 50%;
}
.login-bg-img {
  background-image: url(../../public/images/img_login.jpg);
  height: 65vh;
}
@media (max-width: $breakpoint-sm-max) {
  .account-tab {
    width: 100%;
  }
}
</style>
