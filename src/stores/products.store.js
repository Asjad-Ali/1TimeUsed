import {
  defineStore
} from 'pinia'

import {
  Cookies
} from 'quasar'

import API from 'src/services/API';

export const useProductsStore = defineStore('authStore', {

  state: () => ({
    recentProducts: [],
  }),

  getters: {
  },

  actions: {
    async loadRecentProducts() {
      const res = await API.get('products/recentlyviewed');
      if (res == 200) {
        console.log(res.data)
        this.recentProducts = res.data;
      }
      else {
        console.log(res)
      }
    },
  },
})
