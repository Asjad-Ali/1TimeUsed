import { defineStore } from 'pinia'

import { persistData, getPersistentData } from 'src/helpers/persistentHelper'

import API from 'src/services/API'

export const useWishlistStore = defineStore("wishlistStore", {

  state: () => ({
    wishlistProduct: []
  }),

  getters: {
  },

  actions: {

    async loadWishlistProducts() {
      if (this.wishlistProduct.length) {
        return;
      }

      const wishlistProduct = getPersistentData('wishlist_products', 2);
      if (wishlistProduct) {
        this.wishlistProduct = wishlistProduct;
        return;
      }

      const response = await API.get('wishlist');
      if (response.status == 200) {
        this.wishlistProduct = response.data;
        persistData('wishlist_products', response.data);
      }
      else {
        console.log("wishlist_products", response)
      }
    },
  }
})
