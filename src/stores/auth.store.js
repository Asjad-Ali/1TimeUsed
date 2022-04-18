import {
  defineStore
} from 'pinia'

import {
  Cookies
} from 'quasar'

import API from 'src/services/API';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    authUser: Cookies.get('AUTH_USER') || null,
  }),
  getters: {
    authUser(state) {
      return state.authUser
    },
  },
  actions: {
    async login(creds) {
      const response = await API.post('login', creds);
      this.authUser = response.data;
      console.log(response);
      Cookies.set('AUTH_USER', JSON.stringify(this.authUser));
      Cookies.set('1TIMEUSED_TOKEN', response.token);
    },

    async test(message) {
      const response = await API.get('profile');
      console.log("hello", response)
    },
  },
})
