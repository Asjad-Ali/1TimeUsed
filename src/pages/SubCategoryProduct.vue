<template>
  <div class="container">
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
        <ProductCard
          v-if="viewType == 'grid'"
          :product="product"
          mainDIv="recent-products"
        />
        <TileProduct v-else :product="product" mainDIv="recent-products" />
      </div>
      <div
        v-if="!store.subCategoryProduct.length && !store.loadingStatus"
        class="justify-center items-center"
      >
        <div style="height: 60vh; width: 97vw" class="relative-position">
          <span class="absolute-center text-h6 text-center"
            >No Product Available</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import ProductCard from "src/components/ProductCard.vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/products.store";
import TileProduct from "../components/TileProduct.vue";
import ProductsHeader from "src/components/ProductsHeader.vue";
let lastApiCallTime = Date.now();
const store = useProductStore();
const route = useRoute();
const viewType = ref("grid");

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
</script>
