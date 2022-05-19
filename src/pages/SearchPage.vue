<template>
  <div class="container q-mb-md" @scroll="handleScroll">
    <ProductsHeader
      :viewType="viewType"
      @toggleViewType="viewType = viewType == 'grid' ? 'tile' : 'grid'"
    />

    <div class="row justify-center items-center q-mt-lg">
      <div class="col-md-6 col-12">
        <q-select
          ref="searchInput"
          filled
          @keydown.enter="searchProducts"
          v-model="search"
          use-input
          hide-selected
          fill-input
          dense
          @update:model-value="searchProducts"
          debounce="400"
          label="Search Here"
          @filter="getSearchSuggestions"
          :options="searchSuggestions"
          @filter-abort="searchProducts"
          style="max-width: 100%"
          dropdown-icon="false"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results</q-item-section>
            </q-item>
          </template>

          <template v-slot:after>
            <q-btn @click="searchProducts" icon="search" size="16px" outline>
            </q-btn>
          </template>
        </q-select>
        <div
          v-show="search"
          class="text-center text-grey q-my-md text-subtitle1"
        >
          Results for "<span class="text-bold">{{ search }}</span
          >"
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <ProductsList
      id="productsDiv"
      :products="store.searchProducts"
      :viewType="viewType"
      :loader="store.searchLoader"
    />

    <div
      v-if="!store.searchProducts.length && !store.searchLoader"
      class="empty_space"
    >
      <div class="rounded-borders flex flex-center">
        <div class="text-subtitle1">No result found</div>
      </div>
    </div>
  </div>
  <div class="container">
    <div
      style="height: 40vh"
      v-show="!store.searchProducts || !store.searchProducts.length"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useSearch from "../composables/useSearch";
import { useProductStore } from "src/stores/products.store";
import ProductsHeader from "src/components/ProductsHeader.vue";
import ProductsList from "src/components/ProductsList.vue";
import useMetaTags from "src/composables/useMetaTags";

useMetaTags({
  title: "Search",
});
const store = useProductStore();

const viewType = ref("grid");

const {
  searchInput,
  searchSuggestions,
  getSearchSuggestions,
  searchProducts,
  search,
} = useSearch();

onMounted(() => {
  searchInput.value.focus();
});
</script>

<style lang="scss" scoped>
.search-bg {
  background: #fff;
}
.text-bold {
  font-weight: 500;
  color: black;
}
.empty_space {
  height: calc(50vh - 371px);
}

@media (max-width: 1024px) {
  .mb-10-mobile {
    margin-bottom: 10px;
  }
}
</style>
