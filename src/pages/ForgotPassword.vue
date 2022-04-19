<template>
  <div class="login-bg-img flex justify-center items-center">
    <div class="container">
      <q-form @submit="onSubmit" class="flex justify-center items-center">
        <div class="row q-pa-md">
          <div class="col-12 text-center">
            <h6>Reset Your Password</h6>
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
          <p
            class="text-primary cursor-pointer"
            @click="$router.push('/login')"
          >
            <q-icon name="keyboard_backspace" size="sm" /> Back to login
          </p>
          <div class="w-100 q-my-lg">
            <div class="text-center q-mb-lg">
              <q-btn
                color="primary"
                type="submit"
                label="Reset Password"
                class="w-100"
              />
            </div>
          </div>
        </div>
      </q-form>
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
  height: 100vh;
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
