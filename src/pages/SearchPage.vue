<template>
  <div class="container" @scroll="handleScroll">
    <ProductsHeader
      :viewType="viewType"
      @toggleViewType="viewType = viewType == 'grid' ? 'tile' : 'grid'"
    />

    <div class="row justify-center items-center q-mt-lg">
      <div class="col-md-6 col-12">
        <q-select
          ref="searchInput"
          filled
          @keydown.enter.prevent="searchProducts"
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

      <div class="col-md-0 col-12">
        <!-- <q-select
          dense
          outlined
          v-model="model"
          :options="searchSuggestions"
          label="Sort By"
          class="bg-white"
          @click="sortModal = true"
        /> -->
      </div>
    </div>
  </div>

  <div class="container">
    <div class="container flex justify-center items-center">
      <div class="column q-mt-md">
        <div
          id="productsDiv"
          class="flex q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg justify-center items-center"
        >
          <div v-for="product in store.searchProducts" :key="product.id">
            <ProductCard v-if="viewType == 'grid'" :product="product" />
            <TileProduct v-else :product="product" mainDIv="recent" />
          </div>
        </div>
        <div
          v-if="!store.searchProducts.length && !store.loadingStatus"
          class="empty_space"
        >
          <div class="rounded-borders flex flex-center">
            <div class="text-subtitle1">No result found</div>
          </div>
        </div>
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
import ProductCard from "src/components/ProductCard.vue";
import useSearch from "../composables/useSearch";
import { useProductStore } from "src/stores/products.store";
import ProductsHeader from "src/components/ProductsHeader.vue";
import TileProduct from "src/components/TileProduct.vue";

const store = useProductStore();
const model = ref(null);
const searchInput = ref();
const viewType = ref("grid");

const { searchSuggestions, getSearchSuggestions, searchProducts, search } =
  useSearch();

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
