<template>
  <div class="container" :class="{ 'relative-position': $q.screen.gt.sm }">
    <ProductsHeader
      :viewType="viewType"
      @toggleViewType="viewType = viewType == 'grid' ? 'tile' : 'grid'"
    />

    <ProductsList
      :products="store.subCategoryProduct"
      :viewType="viewType"
      :loader="store.loadingStatus"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useProductStore } from "src/stores/products.store";
import ProductsHeader from "src/components/ProductsHeader.vue";
import ProductsList from "src/components/ProductsList.vue";
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
<style lang="scss" scoped>
.container {
  min-height: 60vh;

  @media screen and (max-width: 768px) {
    min-height: 88vh;
  }
}
</style>
