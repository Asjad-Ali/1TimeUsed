import {
  defineStore
} from 'pinia'

import API from 'src/services/API';
import {
  persistData,
  getPersistentData
} from 'src/helpers/persistentHelper'

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: [],
    subCategories: [],
    subCategoryTitle: ''
  }),
  getters: {

  },
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
      }
    },
<<<<<<< HEAD
    loadSubCategory(slug) {
      const category = this.categories.find(category => category.slug == slug || category.id == slug)
=======
    loadSubCategory(title) {
      const category = this.categories.find(category => category.slug == title || category.id == title)
>>>>>>> 94dbe179fc98d7f5c99d69ed70f339a57cbd191d
      this.subCategories = category.subcategories
    }
  },



})
