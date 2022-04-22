import API from "src/services/API";
import { ref } from "vue";

export default function useSearch() {


  const search = ref("");
  const searchSuggestions = ref();
  const searchResults = ref([])
  let searchVal = '';

  const getLocalSearchHistory = () => {
    const localHistory = localStorage.getItem('local_search_history');
    return localHistory ? JSON.parse(localHistory) : [];
  }

  const addToLocalSearchHistory = (query) => {
    let localHistory = getLocalSearchHistory();
    const index = localHistory.findIndex(val => val == query);
    if (index > -1) {
      localHistory.splice(index, 1);
    }
    localHistory.unshift(query);
    localHistory = localHistory.slice(0, 10);
    localStorage.setItem('local_search_history', JSON.stringify(localHistory))
  }


  const getSearchSuggestions = async (val, update, abort) => {
    searchVal = val;

    update(async () => {
      if (val) {
        const response = await API.get(`searchSuggestions?q=${val}`)
        searchSuggestions.value = response.data.map(search => search.keyword);
      }
      else {
        searchSuggestions.value = getLocalSearchHistory();
      }
    });
  }


  const searchProducts = async () => {
    const query = search.value || searchVal;
    const response = await API.get(`search?q=${query}`);
    searchResults.value = response.data;
    if (response.data) {
      addToLocalSearchHistory(query)
    }
  }

  const handleScroll = () => {
    console.log("Scrolling")
  }

  return {
    searchSuggestions,
    getSearchSuggestions,
    searchProducts,
    search,
    searchResults
  };
}
