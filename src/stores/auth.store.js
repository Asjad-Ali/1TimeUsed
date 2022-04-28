import {
  defineStore
} from 'pinia'

import {
  Notify
} from 'quasar'
import API from 'src/services/API';
import redirect from 'src/helpers/redirect';

const getDeviceId = () => {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (var i = 0; i < 19; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result + Date.now();
}

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    authUser: null,
    authToken: null,
    deviceId: null,
    forgotEmail: null
  }),
  // getters: {
  //   getAuthUser(state) {
  //     return state.authUser
  //   },
  // },
  actions: {
    async login(creds) {

      const response = await API.post('login', creds);

      if (response.status == 200) {
        this.authUser = response.data.user;
        this.$cookies.set('AUTH_USER', response.data.user);
        this.$cookies.set('1TIMEUSED_TOKEN', response.data.token);

        Notify.create({
          message: response.message,
          icon: 'done',
          position: 'bottom',
          color: 'positive',
        })
        // redirect(''); redirect in vue file through router.push

      } else {
        console.log(response.message);
        Notify.create({
          message: response.message,
          icon: 'warning',
          position: 'bottom',
          color: 'negative',
        })
      }
      return response;
    },


    async register(creds) {

      const response = await API.post('register', creds);

      if (response.status === 200) {
        this.authUser = response.data;

        Notify.create({
          message: response.message,
          icon: 'done',
          position: 'bottom',
          color: 'positive',
        });

        redirect('login');

      } else {
        Notify.create({
          message: response.message,
          icon: 'warning',
          position: 'bottom',
          color: 'negative',
        })
      }
      return response;
    },

    loadAuthUser() {
      const deviceIdKey = '1TIMUSED_DEVICE_ID';
      if (!this.$cookies.get(deviceIdKey)) {
        this.$cookies.set(deviceIdKey, getDeviceId(32))
      }

      this.deviceId = this.$cookies.get(deviceIdKey);
      this.authToken = this.$cookies.get('1TIMEUSED_TOKEN');
      this.authUser = this.$cookies.get('AUTH_USER')
    },

    async updateProfile(creds) {
      creds._method = "PUT";
      const response = await API.formData('profile', creds);

      console.log("in store>> profile: ", response.data);
      if (response.status == 200) {
        this.authUser = response.data;
        this.$cookies.set('AUTH_USER', response.data);

        Notify.create({
          message: response.message,
          icon: 'done',
          position: 'bottom',
          color: 'positive',
        })
        redirect('/account_setting');

      } else {
        Notify.create({
          message: response.message,
          icon: 'warning',
          position: 'bottom',
          color: 'negative',
        })
      }
      return response;
    },

    async loginWithFacebook(fb_token) {

      const response = await API.post('login/facebook', {
        fb_token
      });

      console.log("after facebook login in auth store>>", response.data.user);

      if (response.status == 200) {
        Notify.create({
          message: response.message,
          icon: 'done',
          position: 'bottom',
          color: 'positive',
        });
        this.authUser = response.data.user;
        this.$cookies.set('AUTH_USER', response.data.user);
        this.$cookies.set('1TIMEUSED_TOKEN', response.data.token);
        redirect('/');
      } else {
        console.log(response.message);
        Notify.create({
          message: response.message,
          icon: 'warning',
          position: 'bottom',
          color: 'negative',
        })

        setTimeout(() => {
          redirect('/login')
        }, 1000)
      }
    },

    async loginWithGoogle(token) {

      const response = await API.post('login/Google', {
        token
      });

      console.log("after google login in auth store>>", response.data.user);

      if (response.status == 200) {
        Notify.create({
          message: response.message,
          icon: 'done',
          position: 'bottom',
          color: 'positive',
        });
        this.authUser = response.data.user;
        this.$cookies.set('AUTH_USER', response.data.user);
        this.$cookies.set('1TIMEUSED_TOKEN', response.data.token);
        redirect('/');
      } else {
        console.log(response.message);
        Notify.create({
          message: response.message,
          icon: 'warning',
          position: 'bottom',
          color: 'negative',
        })

        setTimeout(() => {
          redirect('/login')
        }, 1000)
      }
    },

    async forgot(payload) {

      const response = await API.post('forgot-password', payload);

      if (response.status == 200) {
        this.forgotEmail = payload.email;
        Notify.create({
          message: response.message,
          icon: 'done',
          position: 'bottom',
          color: 'positive',
        });

      } else {
        Notify.create({
          message: response.message,
          icon: 'warning',
          position: 'bottom',
          color: 'negative',
        })
      }
      return response;
    },

    async resetPassword(payload) {

      payload.email = this.forgotEmail;
      const response = await API.post('reset-password', payload);

      if (response.status == 200) {
        Notify.create({
          message: response.message,
          icon: 'done',
          position: 'bottom',
          color: 'positive',
        });
        redirect('login');

      } else {
        Notify.create({
          message: response.message,
          icon: 'warning',
          position: 'bottom',
          color: 'negative',
        })
      }
    },

    async logout() {
      this.$cookies.remove('AUTH_USER');
      this.$cookies.remove('1TIMEUSED_TOKEN');
      redirect('/login');
    },
  }
})
