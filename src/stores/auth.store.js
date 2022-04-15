import {
  defineStore
} from 'pinia'

import API from 'src/services/API';

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
      this.authUser = response.data;
      console.log(response)
      //localStorage.setItem('1timeused_user', JSON.stringify(this.authUser))
    },

    async test(message) {
      const response = await API.get('profile');
      console.log("hello", response)
    },
  },
})
