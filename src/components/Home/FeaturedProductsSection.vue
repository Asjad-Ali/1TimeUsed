<template>
  <div>
    <div class="conatiner flex justify-center items-center">
      <div class="column q-mt-md">
        <h5 class="text-center q-pb-lg">Feature Products</h5>
        <ProductsList
          :products="store.featuredProducts"
          :loader="store.featuredProductsLoader"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from "src/stores/products.store.js";
import ProductsList from "../ProductsList.vue";

const store = useProductStore();
</script>

<style lang="scss" scoped>
h5 {
  margin: 0;
}
</style>
