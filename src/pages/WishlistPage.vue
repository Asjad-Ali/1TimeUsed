<template>
  <div class="container q-py-lg">
    <div>
      <h1 class="text-h5 text-center">
        <span style="border-bottom: 2px solid #ddd">Wishlist</span>
      </h1>
    </div>

    <div class="q-pa-md row items-start q-gutter-md justify-center">
      <ProductCard v-for="product in store.wishlist" :key="product" />
    </div>
  </div>
</template>

<script setup>
import ProductCard from "src/components/Layouts/ProductCard.vue";
import { useWishlistStore } from "../stores/wishlist.store";

const store = useWishlistStore();
</script>

<style>
</style>
