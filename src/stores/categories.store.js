import {
  defineStore
} from 'pinia'

import API from 'src/services/API';

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: [],
  }),
  getters: {
    getCategories(state) {
      return state.categories
    },
  },
  actions: {
    async loadCategories() {
      const lastLoadedTime = localStorage.getItem('categories_loaded_time');
      const storedCategories = localStorage.getItem('categories');
      const validLoadedTime = 3 * 60 * 1000;

      // do not hit api if categories were loaded under last 3 minutes

      if (storedCategories && lastLoadedTime && (Date.now() - lastLoadedTime) < validLoadedTime) {
        this.categories = JSON.parse(storedCategories);
        return;
      }

      const response = await API.get('categories');

      if (response.status == 200) {
        this.categories = response.data;
        console.log(response.data);
        localStorage.setItem('categories', JSON.stringify(response.data));
        localStorage.setItem('categories_loaded_time', Date.now());
      } else {
        console.log(response.message);
      }
    }
  },

})
