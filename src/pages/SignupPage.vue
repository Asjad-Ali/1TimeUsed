<template>
  <div class="login-bg-img">
    <div class="container q-py-lg">
      <div class="column items-center w-100">
        <div>
          <img src="../../public/images/img_splash_logo.png" width="200" />
        </div>

        <q-form
          @submit="onSubmit"
          class="flex justify-center items-center w-100"
        >
          <div class="row q-pa-md account-tab">
            <div class="col-12">
              <q-input
                v-model="user.name"
                :dense="dense"
                label="Name"
                class="q-mb-md"
                :rules="[
                  (val) =>
                    val.length >= 3 || 'Password must be atleast 3 characters',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>

            <div class="col-12">
              <q-input
                v-model="user.email"
                :dense="dense"
                label="Enter Your Email"
                class="q-mb-md"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>

            <div class="col-4">
              <q-select
                v-model="countryCode"
                :options="options"
                :options-html="optionsHtml"
              >
                <template v-slot:prepend>
                  <img
                    class="q-mr-1"
                    src="https://flagicons.lipis.dev/flags/4x3/pk.svg"
                    width="20"
                  />
                </template>
              </q-select>
            </div>
            <div class="col-1"></div>
            <div class="col-7">
              <q-input
                v-model="user.phone"
                :dense="dense"
                :label="!user.phone ? `301-12345678` : ''"
                class="q-mb-md"
                maxlength="10"
                @keyup="validatePhone"
                type="text"
                :rules="[
                  (val) =>
                    val.substring(0, 1) == 3 || 'Phone must start from 3',
                  (val) => val.length == 10 || 'Phone must be 10 characters',
                ]"
              >
                <!-- <template v-slot:prepend>
                  <q-icon name="phone" />
                </template> -->
              </q-input>
            </div>

            <div class="col-12">
              <q-input
                v-model="user.password"
                :dense="dense"
                label="Enter Your Password"
                type="password"
                :rules="[
                  (val) =>
                    val.length >= 6 || 'Password must be atleast 6 characters',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </div>
            <div class="col-12">
              <q-input
                v-model="user.password_confirmation"
                :dense="dense"
                label="Confirm Your Password"
                type="password"
                :rules="[
                  (val) =>
                    val.length >= 6 || 'Password must be atleast 6 characters',
                  (val) => val == user.password || 'Password do not match',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </div>
            <div class="w-100 q-my-lg">
              <div class="text-center q-mb-lg">
                <q-btn
                  color="primary"
                  type="submit"
                  label="Signup"
                  class="w-100"
                />
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
        </q-form>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
const accept = ref(false);
const countryCode = ref("+92");
const optionsHtml = ref("+92");

const user = ref({
  name: "",
  email: "",
  login: "",
  phone: "3",
  password: "",
  password_confirmation: "",
});

const validatePhone = () => {
  if (user.value.phone.length <= 1 && user.value.phone.substring(0, 1) != 3) {
    user.value.phone = "3";
  } else {
    user.value.phone = user.value.phone.replace(/[^0-9]/g, "");
  }
};

const onSubmit = (e) => {
  console.log(e);
};

const options = [
  // {
  //   label:
  //     '<span class="text-primary text-bold "><img class="q-mr-1" src="https://flagicons.lipis.dev/flags/4x3/pk.svg" width="15"> &nbsp; +92</span>',
  //   value: "Google",
  //   html: true,
  // },
];
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
