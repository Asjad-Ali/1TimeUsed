<template>
  <div
    class="container q-py-lg"
    :class="{ 'relative-position': $q.screen.gt.sm }"
  >
    <div>
      <div class="ttext-subtitle1 text-center">
        <span style="border-bottom: 2px solid #ddd">Wishlist Products</span>
      </div>
    </div>

    <div
      v-if="store.wishlistProducts.length"
      class="q-pa-md row items-start q-gutter-md justify-center"
    >
      <ProductCard
        v-for="product in store.wishlistProducts"
        :key="product"
        :product="product"
      />
    </div>
    <div class="m-5 text-center absolute-center w-100" v-else>
      <div class="m-5 text-subtitle1">No Wishlist Product</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import ProductCard from "src/components/ProductCard.vue";
import { useWishlistStore } from "../stores/wishlist.store";

const store = useWishlistStore();
onMounted(() => {
  store.loadwishlistProducts();
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
>
