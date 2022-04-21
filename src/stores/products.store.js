import {
  defineStore
} from 'pinia'

// import {
//   Cookies
// } from 'quasar'

import { persistData, getPersistentData } from 'src/helpers/persistentHelper'
import API from 'src/services/API';

export const useProductStore = defineStore('productsStore ', {

  state: () => ({
    recentProducts: [],
    featuredProducts: [],
    loadedProduct: null,
    searchProduct: ''
  }),

  getters: {
  },

  actions: {
    async loadRecentProducts() {
      if (this.recentProducts.length) {
        return;
      }

      const dataKey = "viewed_products";
      const viewedProducts = getPersistentData(dataKey, 1);
      if (viewedProducts) {
        this.recentProducts = viewedProducts;
        return;
      }

      const response = await API.get('products/recentlyviewed');
      if (response.status == 200) {
        this.recentProducts = response.data;
        persistData(dataKey, response.data);
      }
      else {
        console.log("Error in Recently viewed", response)
      }

    },
    async loadFeaturedProducts() {
      if (this.featuredProducts.length) {
        return;
      }

      const featuredProducts = getPersistentData('featured_products', 2);
      if (featuredProducts) {
        this.featuredProducts = featuredProducts;
        return;
      }

      const response = await API.get('products/featured');
      if (response.status == 200) {
        this.featuredProducts = response.data;
        persistData('featured_products', response.data);
      }
      else {
        console.log("Error in Featured", response)
      }
    },
    async loadProductDetails(slug) {
      const response = await API.get(`products/${slug}`);
      if (response.status == 200) {
        this.loadedProduct = response.data
      }
      return response;
    },
    async loadSearchProduct(product) {
      const response = await API.get(`search?sort=&q=${product}`);
      if (response.status == 200) {
        this.searchProduct = response.data
      }
      return response;
    }
  },
})
