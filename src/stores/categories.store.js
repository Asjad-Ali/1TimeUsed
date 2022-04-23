import {
  defineStore
} from 'pinia'

import API from 'src/services/API';
import { persistData, getPersistentData } from 'src/helpers/persistentHelper'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: [],
    subCategory: {}
  }),
  // getters: {
  //   getCategories(state) {
  //     return state.categories
  //   },
  // },
  actions: {
    async loadCategories() {
      if (this.categories.length) {
        return;
      }
      const dataKey = "categories";
      const categories = getPersistentData(dataKey, 4);
      if (categories) {
        this.categories = categories;
        return;
      }

      const response = await API.get('categories');

      if (response.status == 200) {
        this.categories = response.data;
        persistData(dataKey, response.data);
      } else {
        console.log(response.message);
      }
    },
    loadSubCategory(title) {
      console.log("in store", title)
    }
  },



})
