<template>
  <div class="container">
    <div class="row q-my-lg q-gutter-md justify-center">
      <div
        class="item row fit justify-center items-center q-gutter-md q-col-gutter wrap"
      >
        <ProductCard
          v-for="product in store.subCategoryProduct"
          :key="product"
          :product="product"
          mainDIv="recent-products"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import ProductCard from "src/components/Layouts/ProductCard.vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/products.store";

const store = useProductStore();
const route = useRoute();
onMounted(() => store.loadSubCategoryProduct(route.params.id));
</script>
