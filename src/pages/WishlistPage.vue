<template>
  <div class="container q-py-lg">
    <div>
      <h1 class="text-h5 text-center">
        <span style="border-bottom: 2px solid #ddd">Wishlist</span>
      </h1>
    </div>

    <div
      v-if="store.wishlistProduct"
      class="q-pa-md row items-start q-gutter-md justify-center"
    >
      <ProductCard
        v-for="product in store.wishlistProduct"
        :key="product"
        :product="product"
      />
    </div>
    <div class="text-center m-5" v-else>
      <h3 class="m-5">No Wishlist Product</h3>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import ProductCard from "src/components/Layouts/ProductCard.vue";
import { useWishlistStore } from "../stores/wishlist.store";

const store = useWishlistStore();

onMounted(() => store.loadWishlistProducts());
</script>

<style>
</style>
