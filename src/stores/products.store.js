import {
  defineStore
} from 'pinia'

import {
  Cookies
} from 'quasar'

import API from 'src/services/API';

export const useProductsStore = defineStore('productsStore ', {

  state: () => ({
    recentProducts: [],
    featuredProducts: [],
  }),

  getters: {
  },

  actions: {
    async loadRecentProducts() {
      if (this.recentProducts.length) {
        return;
      }

      const res = await API.get('products/recentlyviewed');
      if (res == 200) {
        console.log(res.data)
        this.recentProducts = res.data;
      }
      else {
        console.log(res)
      }

    },
    async loadFeaturedProducts() {
      if (!this.featuredProducts.length) {
        const res = await API.get('products/featured');
        if (res == 200) {
          console.log(res.data)
          this.featuredProducts = res.data;
        }
        else {
          console.log(res)
        }
      }
    },
  },
})
