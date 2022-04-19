<template>
  <q-page-container>
    <div class="conatiner flex justify-center items-center">
      <div class="column">
        <h5 class="q-py-lg text-center">Feature Products</h5>
        <div
          class="
            flex
            q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg
            justify-center
            items-center
          "
        >
          <ProductCard
            :product="product"
            v-for="product in store.featuredProducts"
            :key="product"
          />
        </div>
      </div>
    </div>
  </q-page-container>
</template>

<script setup>
import ProductCard from "src/components/Layouts/ProductCard.vue";
import { useProductStore } from "../../stores/products.store.js";

const store = useProductStore();
</script>


<style lang="scss" scoped>
h5 {
  margin: 0;
}
</style>
