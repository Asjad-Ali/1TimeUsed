import { defineStore } from 'pinia'
import { store } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { persistData, getPersistentData } from 'src/helpers/persistentHelper'
import API from 'src/services/API'
import { useProductStore } from '../stores/products.store'

export const useWishlistStore = defineStore("wishlistStore", {

  state: () => ({
    wishlistProduct: []
  }),

  getters: {
  },

  actions: {

    async addWishlist(product_id) {
      const store = useProductStore()
      const response = await API.post("wishlist", { product_id })
      if (response.state == 200) {
        Notify.create({
          message: response.message,
          icon: 'done',
          position: 'bottom',
          color: 'success',
        })
        store.recentProducts = store.recentProducts.map(pro => pro.id == product_id ? { ...pro, favorite: !favorite } : { ...pro })
        store.featuredProducts = store.featuredProducts.map(pro => pro.id == product_id ? { ...pro, favorite: !favorite } : { ...pro })
      }
    },

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
