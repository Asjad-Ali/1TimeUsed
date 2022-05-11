<template>
  <div class="container" @scroll="handleScroll">
    <div class="row justify-between items-center q-mt-lg">
      <div class="col-md-3 col-6">
        <q-icon
          name="grid_view"
          color="primary"
          size="sm"
          class="cursor-pointer mb-10-mobile"
        />
      </div>
      <div class="col-md-6 col-12">
        <q-select
          ref="searchInput"
          filled
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
        <h6 v-show="search" class="text-center text-grey q-my-md">
          Results for "<span class="text-bold">{{ search }}</span
          >"
        </h6>
      </div>

      <div class="col-md-2 col-12">
        <q-select
          dense
          outlined
          v-model="model"
          :options="searchSuggestions"
          label="Sort By"
          class="bg-white"
        />
      </div>
    </div>
  </div>
  <div class="container">
    <div class="container flex justify-center items-center">
      <div class="column q-mt-md">
        <div
          id="productsDiv"
          class="
            flex
            q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg
            justify-center
            items-center
          "
        >
          <q-spinner
            v-if="store.loadingStatus"
            color="primary"
            class="q-mt-xl"
            size="3em"
          />
          <ProductCard
            v-else
            v-for="product in store.searchResults"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div
      style="height: 40vh"
      v-show="!store.searchResults || !store.searchResults.length"
    ></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ProductCard from "src/components/ProductCard.vue";
import useSearch from "../composables/useSearch";
import { useProductStore } from "../stores/products.store";

const store = useProductStore();
const model = ref(null);
const searchInput = ref();

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
@media (max-width: 1024px) {
  .mb-10-mobile {
    margin-bottom: 10px;
  }
}
</style>
