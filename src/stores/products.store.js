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
    featuredProducts: []
  }),

  getters: {
  },

  actions: {
    async loadRecentProducts() {
      if (this.recentProducts.length) {
        return;
      }

      const res = await API.get('products/recentlyviewed');
      if (res.status == 200) {
        console.log("Recent Product", res)
        this.recentProducts = res.data;
      }
      else {
        console.log("Error in Recently viewed", res)
      }

    },
    async loadFeaturedProducts() {
      if (!this.featuredProducts.length) {
        const res = await API.get('products/featured');
        if (res.status == 200) {
          console.log("Featured Product", res)
          this.featuredProducts = res.data;
        }
        else {
          console.log("Error in Featured", res)
        }
      }
    },
  },
})
