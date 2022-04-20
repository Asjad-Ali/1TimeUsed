import {
  defineStore
} from 'pinia'

import {
  Cookies
} from 'quasar'

import {
  Notify
} from 'quasar'
import API from 'src/services/API';
import redirect from 'src/helpers/redirect';

function getAuthUser(ssrContext) {
  const cookies = process.env.SERVER ?
    Cookies.parseSSR(ssrContext) :
    Cookies // otherwise we're on client

  cookies.get('AUTH_USER') || null
}


export const useAuthStore = defineStore('authStore', {
  state: () => ({
    authUser: null,
    registerUser: null
  }),
  getters: {
    getAuthUser(state) {
      return state.authUser
    },
  },
  actions: {
    async login(creds) {

      const response = await API.post('login', creds);

      if (response.status == 200) {
        this.authUser = response.data.user;
        Cookies.set('AUTH_USER', response.data.user);
        Cookies.set('1TIMEUSED_TOKEN', response.data.token);

        Notify.create({
          message: response.message,
          icon: 'done',
          position: 'bottom',
          color: 'success',
        })
        redirect('');

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


    async register(creds) {

      const response = await API.post('register', creds);

      if (response.status == 200) {
        this.registerUser = response.data;
        Cookies.set('REGISTER_NEW_USER', response.data);

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


    //async profile(cred)
  },
})
