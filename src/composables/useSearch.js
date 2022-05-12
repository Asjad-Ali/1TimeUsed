import API from "src/services/API";
import {
  onMounted,
  ref
} from "vue";
import {
  useProductStore
} from 'src/stores/products.store'
const store = useProductStore();

export default function useSearch() {

  let hasMorePages = false;
  let currentPage = 1;
  let lastApiCallTime = Date.now();
  const search = ref("");
  const searchSuggestions = ref();
  const scrollObserver = ref('')
  let searchVal = '';

  const getLocalSearchHistory = () => {
    const localHistory = localStorage.getItem('local_search_history');
    return localHistory ? JSON.parse(localHistory) : [];
  }

  const addToLocalSearchHistory = (query) => {
    if (!query || query.length < 3) {
      return;
    }
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
      } else {
        searchSuggestions.value = getLocalSearchHistory();
      }
    });
  }

  const searchProducts = async () => {
    if (currentPage == 1) {
      store.searchResults = [];
    }
    store.loadingStatus = true;
    const query = search.value || searchVal;
    const response = await API.get(`search?q=${query}&page=${currentPage}`);
    store.loadingStatus = false;
    store.searchResults = [...store.searchResults, ...response.data];
    console.log(response)
    hasMorePages = response.links.next ? true : false;
    currentPage = response.meta.current_page;
    if (response.data) {
      addToLocalSearchHistory(query)
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', () => {
      if ((Date.now() - lastApiCallTime) < 1200) {
        return false;
      }
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        console.log('scrolled to bottom')
        console.log(hasMorePages)
        if (hasMorePages) {
          currentPage++;
          searchProducts();
          lastApiCallTime = Date.now();
        }
      }
    })
  });

  return {
    searchSuggestions,
    getSearchSuggestions,
    searchProducts,
    search
  };
}
