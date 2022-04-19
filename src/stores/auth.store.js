import {
  defineStore
} from 'pinia'

import {
  Cookies
} from 'quasar'

import API from 'src/services/API';

function getAuthUser(ssrContext) {
  const cookies = process.env.SERVER ?
    Cookies.parseSSR(ssrContext) :
    Cookies // otherwise we're on client

  cookies.get('AUTH_USER') || null
}

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    authUser: null,
    loginError: null
  }),
  getters: {
    authUser(state) {
      return state.authUser
    },
  },
  actions: {
    async login(creds) {
      const response = await API.post('login', creds);
      console.log(response);

      if (response.status == 200) {
        this.authUser = response.data;
        Cookies.set('AUTH_USER', JSON.stringify(this.authUser));
        Cookies.set('1TIMEUSED_TOKEN', response.token);

      } else {
        this.loginError = response.message;
        alert(response.message)
      }
      return response;
    },

    async test(message) {
      const response = await API.get('profile');
      console.log("hello", response)
    },
  },
})
