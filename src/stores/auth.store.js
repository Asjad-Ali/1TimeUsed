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
<<<<<<< HEAD
    loginError: null
=======
>>>>>>> ce3ac68a445873693c9a7848e1fe582ebdf0824a
  }),
  getters: {
    authUser(state) {
      return state.authUser
    },
  },
  actions: {
    async login(creds) {
      const response = await API.post('login', creds);
<<<<<<< HEAD
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
=======
      if (response == 200) {
        this.authUser = response.data;
      }
      console.log(response)
      //localStorage.setItem('1timeused_user', JSON.stringify(this.authUser))
>>>>>>> ce3ac68a445873693c9a7848e1fe582ebdf0824a
    },

    async test(message) {
      const response = await API.get('profile');
      console.log("hello", response)
    },
  },
})
