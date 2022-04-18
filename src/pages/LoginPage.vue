<template>
  <div class="login-bg-img flex justify-center items-center">
    <div class="container q-py-lg">
      <div class="column items-center w-100">
        <div>
          <img src="../../public/images/img_splash_logo.png" width="200" />
        </div>
        <q-form
          @submit="onSubmit"
          class="flex justify-center items-center w-100"
        >
          <div class="q-pa-md account-tab">
            <q-input
              v-model="user.email"
              label="Enter Your Email"
              class="q-mb-md"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input
              v-model="user.password"
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
                <q-btn
                  color="primary"
                  glossy
                  label="Login"
                  @click="handleLogin"
                />

                <q-btn
                  flat
                  color="primary"
                  label="Forgot Password"
                  @click="$router.push('/forgot')"
                />
              </div>
              <p class="text-center q-py-md text-grey">Or Login With</p>
              <div class="text-center q-mb-lg">
                <q-btn
                  color="blue"
                  icon="facebook"
                  label="login with facebbok"
                />
              </div>
              <div class="text-center q-mb-lg">
                <q-btn
                  color="orange-10"
                  icon="facebook"
                  label="login with Google"
                ></q-btn>
              </div>

              <div class="register text-center">
                <q-btn
                  flat
                  color="primary"
                  label="Register With Email"
                  @click="$router.push('/signup')"
                />
              </div>

              <div class="copyrights text-center">
                <p class="text-grey">
                  All rights reserved by
                  <a href="#" class="underline-none">1timeused</a><br />
                  powered by <a href="#" class="underline-none">HORIZAM</a>
                </p>
              </div>
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
// import { useAuthStore } from "src/stores/auth.store";

// export default {
//   // ...
//   preFetch({ store }) {
//     const authStore = useAuthStore(store)
//     authStore.test("Hello");
//   }
// }
</script>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "src/stores/auth.store.js";
import { useRouter } from "vue-router";

const store = useAuthStore();
const route = useRouter();
const accept = ref(false);
const user = ref({
  email: "",
  password: null,
});

const handleLogin = () => {
  store.login(user.value);
  route.push({ path: "/" });
};
</script>

<style lang="scss" scoped>
.account-tab {
  width: 50%;
}

.login-bg-img {
  background-image: url(../../public/images/img_login.jpg);
  height: 100vh;
}

.underline-none {
  text-decoration: none;
}

@media (max-width: $breakpoint-sm-max) {
  .account-tab {
    width: 100%;
  }
}
</style>
