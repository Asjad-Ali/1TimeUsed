import { defineStore } from 'pinia'
import { store } from 'quasar/wrappers'
import { Notify } from 'quasar'
import { persistData, getPersistentData } from 'src/helpers/persistentHelper'
import API from 'src/services/API'
import { useProductStore } from '../stores/products.store'
import { ref } from 'vue'


const toggleFavorite = (productID, products) => {
  const index = products.findIndex(product => product.id == productID);
  if (index == -1) {
    return products;
  }

  products[index].favorite = products[index].favorite == 1 ? 0 : 1;
  return products;
}

export const useWishlistStore = defineStore("wishlistStore", {

  state: () => ({
    wishlistProduct: {},
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
          color: 'positive',
        })
        store.recentProducts = toggleFavorite(product_id, store.recentProducts)
        store.featuredProducts = toggleFavorite(product_id, store.featuredProducts)
        this.wishlistProduct = this.wishlistProduct.filter(pro => pro.id != product_id)

        persistData('wishlist_products', this.wishlistProduct);
        persistData('viewed_products', store.recentProducts);
        persistData('featured_products', store.featuredProducts);
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
