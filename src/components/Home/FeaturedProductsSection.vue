<template>
  <q-page-container>
    <div class="conatiner flex justify-center items-center">
      <div class="column q-pb-xl q-mt-md">
        <h5 class="text-center q-pb-lg">Feature Products</h5>

        <div
          v-if="store.featuredProductsLoader"
          class="row q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg justify-center items-center"
        >
          <CardSkeleton v-for="i in 10" :key="i" />
        </div>

        <div
          v-else
          class="flex q-gutter-y-md q-gutter-x-sm q-mb-lg justify-center items-center"
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
import ProductCard from "src/components/ProductCard.vue";
import CardSkeleton from "src/components/CardSkeleton";
import { useProductStore } from "src/stores/products.store.js";

const store = useProductStore();
</script>

<style lang="scss" scoped>
h5 {
  margin: 0;
}
</style>
