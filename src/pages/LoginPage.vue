<template>
  <div class="login-bg-img flex justify-center items-center">
    <div class="container q-py-lg">
      <div class="column items-center w-100">
        <div>
          <img src="../../public/images/img_splash_logo.png" width="200" />
        </div>
        <q-form
          ref="loginForm"
          @submit.prevent="onSubmit"
          class="flex justify-center items-center w-100"
          greedy
        >
          <div class="q-pa-md account-tab">
            <q-input
              v-model="credentials.email"
              label="Enter Your Email"
              class="q-mb-md"
              :rules="[rules.required, rules.email]"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input
              v-model="credentials.password"
              label="Enter Your Password"
              type="password"
              :rules="[rules.required, rules.password]"
              clearable
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
            </q-input>

            <q-toggle
              v-model="accept"
              label="Show Password"
              :type="
                passwordInputType == 'password'
                  ? 'visibility'
                  : 'visibility_off'
              "
              @click="
                passwordInputType =
                  passwordInputType == 'password' ? 'text' : 'password'
              "
            />
            <div class="w-100 q-my-lg">
              <div class="flex justify-between items-center">
                <q-btn type="submit" color="primary" glossy label="Login" />

                <q-btn
                  flat
                  color="primary"
                  label="Forgot Password ?"
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
                <q-btn label="login with Google ">
                  <img
                    src="../../public/icons/google-color.svg"
                    alt="google "
                    width="20"
                  />
                </q-btn>
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

<script setup>
import { ref } from "vue";
import useValidationRules from "src/composables/useValidationRules";
import { useAuthStore } from "src/stores/auth.store";

const { rules } = useValidationRules();
const store = useAuthStore();
const accept = ref(false);
const passwordInputType = ref("password");
const credentials = ref({
  email: "",
  password: null,
});

const onSubmit = () => {
  store.login(credentials.value);
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
