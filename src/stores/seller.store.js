import {
  defineStore
} from 'pinia'

import API from 'src/services/API';


export const useSellerStore = defineStore('sellerStore ', {

  state: () => ({
    sellerProducts: {},
    seller: {},
    loadingStatus: '',
    currentPage: 1,
    hasMorePages: false,
  }),

  getters: {},
  actions: {
    async loadSellerProducts(id, paginated = false) {
      if (this.currentPage == 1 || !paginated) {
        this.sellerProducts = [];
      }
      this.loadingStatus = true
      // const response = await API.get(`sellerProfile/${id}`)
      const response = await API.get(`sellerProfile/${id}?page=${this.currentPage}`)
      this.loadingStatus = false
      if (response.status == 200) {
        console.log("Seller", response.data)
        this.sellerProducts = [...this.sellerProducts, ...response.data]
        this.currentPage = response.meta.current_page;
        this.hasMorePages = response.links.next ? true : false;
        this.seller = response.data[0].seller
      }
    }
  }
})

