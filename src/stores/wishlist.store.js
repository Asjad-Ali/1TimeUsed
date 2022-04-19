import { defineStore } from 'pinia'

import API from 'src/services/API'

export const useWishlistStore = defineStore("wishlistStore", {

  state: () => ({
    wishlist: []
  }),

  getters: () => ({
  }),

  action: () => ({
    async loadRecentProducts() {
      if (this.wishlist.length) {
        return;
      }
      const res = await API.get('wishlist');
      if (res.status == 200) {
        console.log("Wishlist Product", res)
        this.recentProducts = res.data;
      }
      else {
        console.log("Error in Recently viewed", res)
      }

    },
  })
})
