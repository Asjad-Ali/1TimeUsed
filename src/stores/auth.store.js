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
  }),
  getters: {
    authUser(state) {
      return state.authUser
    },
  },
  actions: {
    async login(creds) {
      const response = await API.post('login', creds);
      if (response == 200) {
        this.authUser = response.data;
      }
      console.log(response)
      //localStorage.setItem('1timeused_user', JSON.stringify(this.authUser))
    },

    async test(message) {
      const response = await API.get('profile');
      console.log("hello", response)
    },
  },
})
