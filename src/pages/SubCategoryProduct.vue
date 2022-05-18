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
      class="q-mt-sm"
    />
  </div>
  <div
    v-show="store.subCategoryProduct"
    class="text-center absolute-center w-100"
  >
    <div class="text-subtitle1">Product not Available</div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useProductStore } from "src/stores/products.store";
import ProductsHeader from "src/components/ProductsHeader.vue";
import ProductsList from "src/components/ProductsList.vue";
let lastApiCallTime = Date.now();
const store = useProductStore();
const route = useRoute();
const viewType = ref("grid");

const handlePagination = () => {
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
};

onMounted(() => {
  store.loadSubCategoryProduct(route.params.id);
  window.addEventListener("scroll", handlePagination);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handlePagination);
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
