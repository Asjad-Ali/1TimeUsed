import {
  defineStore
} from 'pinia'

import {
  persistData,
  getPersistentData
} from 'src/helpers/persistentHelper'
import API from 'src/services/API';
import {
  ref
} from 'vue';

export const useSellerStore = defineStore('sellerStore ', {

  state: () => ({
    sellerProducts: {},
    seller: {}
  }),

  getters: {},
  actions: {
    async loadSellerProducts(id) {
      const response = await API.get(`sellerProfile/${id}`)
      if (response.status == 200) {
        console.log("Seller", response.data)
        this.sellerProducts = response.data
        this.seller = response.data[0].seller
      }
    }
  }
})
