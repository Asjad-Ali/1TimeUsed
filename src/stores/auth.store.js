import {
  defineStore
} from 'pinia'

import {
  Cookies
} from 'quasar'

import { Notify } from 'quasar'
import API from 'src/services/API';
import { useRouter } from "vue-router";

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

      if (response.status == 200) {
        this.authUser = response.data;
        Cookies.set('AUTH_USER', JSON.stringify(this.authUser));
        Cookies.set('1TIMEUSED_TOKEN', response.token);
        const router = useRouter();
        router.back();
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
  },
})
