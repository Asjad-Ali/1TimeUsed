<template>
  <div class="container q-py-lg">
    <div>
      <h1 class="text-h5 text-center">
        <span style="border-bottom: 2px solid #ddd">Wishlist</span>
      </h1>
    </div>

    <div class="q-pa-md row items-start q-gutter-md justify-center">
      <ProductCard v-for="i in 4" :key="i" />
    </div>
  </div>
</template>

<script>
import ProductCard from "src/components/Layouts/ProductCard.vue";
export default { components: { ProductCard } };
</script>

<style>
</style>
