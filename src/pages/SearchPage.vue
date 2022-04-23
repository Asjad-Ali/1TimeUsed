<template>
  <div class="container">
    <div class="row justify-between q-pt-xl">
      <div class="col-md-3 col-6">
        <q-icon
          name="grid_view"
          color="primary"
          size="sm"
          class="cursor-pointer"
        />
      </div>
      <div class="col-md-6 col-12">
        <q-select
          filled
          v-model="search"
          use-input
          hide-selected
          fill-input
          input-debounce="400"
          dense
          @update:model-value="searchProducts"
          label="Search Here"
          class="q-pb-md"
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
      <div class="col-md-2 col-6">
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
      <div class="column">
        <div
          class="
            flex
            q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg
            justify-center
            items-center
          "
        >
          <ProductCard
            v-for="product in searchResults"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

 <script setup>
import { ref } from "vue";
import ProductCard from "src/components/Layouts/ProductCard.vue";
import useSearch from "../composables/useSearch";

const {
  searchSuggestions,
  getSearchSuggestions,
  searchProducts,
  search,
  searchResults,
} = useSearch();

const model = ref(null);
</script>
<style lang="scss" scoped>
.search-bg {
  background: #fff;
}
.text-bold {
  font-weight: 500;
  color: black;
}
</style>
