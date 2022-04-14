<template>
  <div class="login-bg-img">
    <div class="container q-py-lg">
      <div class="column items-center w-100">
        <div>
          <img src="../../public/images/img_splash_logo.png" width="200" />
        </div>

        <div class="flex justify-center items-center w-100">
          <div class="q-pa-md account-tab">
            <q-input v-model="text" :dense="dense" label="Name" class="q-mb-md">
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

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
              label="0301-12345678"
              class="q-mb-md"
              type="phone"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
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

            <q-input
              v-model="text"
              :dense="dense"
              label="Confirm Your Password"
              type="password"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>

            <div class="w-100 q-my-lg">
              <div class="text-center q-mb-lg">
                <q-btn color="primary" label="Signup" class="w-100" />
              </div>

              <div class="register text-center">
                <p class="text-primary">Already have an account?</p>
                <q-btn
                  flat
                  color="primary"
                  label="Sign in Now"
                  class="text-underline"
                  @click="$router.push('/login')"
                />
              </div>

              <!-- <div class="copyrights text-center">
                <p class="text-grey">
                  All rights reserved by
                  <a href="#" class="underline-none">1timeused</a><br />
                  powered by <a href="#" class="underline-none">HORIZAM</a>
                </p>
              </div> -->
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
  height: auto;
}

.underline-none {
  text-decoration: none;
}
.text-underline {
  text-decoration: underline;
}

@media (max-width: $breakpoint-sm-max) {
  .account-tab {
    width: 100%;
  }
}
</style>
