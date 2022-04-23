import { defineStore } from 'pinia'
import { store } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { persistData, getPersistentData } from 'src/helpers/persistentHelper'
import API from 'src/services/API'
import { useProductStore } from '../stores/products.store'
import { ref } from 'vue'

export const useWishlistStore = defineStore("wishlistStore", {

  state: () => ({
    wishlistProduct: [],
    wishlistLoader: 0
  }),

  getters: {
    getWishlistLoader: (state => state.wishlistLoader)
  },

  actions: {

    async addWishlist(product_id) {
      this.wishlistLoader = product_id
      const store = useProductStore()
      const response = await API.post("wishlist", { product_id })
      if (response.status == 200) {
        this.wishlistLoader = 0
        Notify.create({
          message: response.message,
          icon: 'done',
          position: 'bottom',
          color: 'success',
        })
        store.recentProducts = ref(store.recentProducts.map(pro => pro.id == product_id ? { ...pro(pro.favorite == 1 ? pro.favorite = 0 : pro.favorite = 1) } : { ...pro }))
        store.featuredProducts = ref(store.featuredProducts.map(pro => pro.id == product_id ? { ...pro(pro.favorite == 1 ? pro.favorite = 0 : pro.favorite = 1) } : { ...pro }))
        store.wishlistProduct = ref(store.wishlistProduct.filter(pro => pro.id != product_id))
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
