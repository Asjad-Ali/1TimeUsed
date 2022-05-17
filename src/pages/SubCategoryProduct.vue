<template>
  <div class="container" :class="{ 'relative-position': $q.screen.gt.sm }">
    <ProductsHeader
      :viewType="viewType"
      @toggleViewType="viewType = viewType == 'grid' ? 'tile' : 'grid'"
    />

    <div class="item row justify-center items-center wrap">
      <q-spinner
        style="height: 50vh"
        v-if="store.loadingStatus"
        color="primary"
        size="3em"
      />
      <div
        v-for="product in store.subCategoryProduct"
        :key="product"
        class="q-ma-sm"
      >
        <ProductCard v-if="viewType == 'grid'" :product="product" />
        <TileProduct v-else :product="product" mainDIv="recent-products" />
      </div>
      <div
        v-if="!store.subCategoryProduct.length && !store.loadingStatus"
        class="text-center absolute-center w-100"
      >
        <div>
          <span class="text-subtitle1">No Product Available</span>
        </div>
      </div>
    </div>
    <!-- Sort by Modal -->
    <q-dialog v-model="sortModal">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-center">Sort By</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-gutter-sm flex column q-pa-md">
            <q-radio
              v-model="sort_products"
              @click="sortProducts(`desc`)"
              :val="`desc`"
              label="Newest First"
              v-close-popup
            />
            <q-radio
              v-model="sort_products"
              @click="sortProducts(`asc`)"
              :val="`asc`"
              label="Oldest First"
              v-close-popup
            />
            <q-radio
              v-model="sort_products"
              @click="sortProducts(`price<`)"
              :val="`price<`"
              label="Price Low to High"
              v-close-popup
            />
            <q-radio
              v-model="sort_products"
              @click="sortProducts(`price>`)"
              :val="`price>`"
              label="Price High to Low"
              v-close-popup
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Sort by Modal End -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import ProductCard from "src/components/ProductCard.vue";
import { useRoute } from "vue-router";
import { useProductStore } from "src/stores/products.store";
import TileProduct from "../components/TileProduct.vue";
import ProductsHeader from "src/components/ProductsHeader.vue";
let lastApiCallTime = Date.now();
const store = useProductStore();
const route = useRoute();
const viewType = ref("grid");
const sort_products = ref("");

onMounted(() => {
  store.loadSubCategoryProduct(route.params.id);
  window.addEventListener("scroll", () => {
    if (Date.now() - lastApiCallTime < 1200) {
      return false;
    }
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      console.log("scrolled to bottom");
      console.log(store.hasMorePages);
      if (store.hasMorePages) {
        store.currentPage++;
        loadSubCategoryProduct(route.params.id, true);
        lastApiCallTime = Date.now();
      }
    }
  });
});

const sortProducts = (sort) => {
  store.loadSearchProduct(sort);
};
</script>
<style lang="scss" scoped>
.container {
  min-height: 60vh;

  @media screen and (max-width: 768px) {
    min-height: 88vh;
  }
}
</style>
