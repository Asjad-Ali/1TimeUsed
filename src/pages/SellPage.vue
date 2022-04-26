<template>
  <div class="container">
    <div class="relative-position">
      <div
        class="q-pa-md row items-start q-gutter-md justify-center"
        v-if="store.myProducts.length"
      >
        <ProductCardTile
          v-for="product in store.myProducts"
          :key="product"
          :product="product"
        />
      </div>
      <div v-else>
        <div class="m-5 text-center">
          <h2>No Products Available</h2>
        </div>
      </div>

      <!-- Add Button -->
      <div class="add-button">
        <q-btn
          round
          color="primary"
          glossy
          icon="add"
          @click="$router.push('/add_product')"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import ProductCardTile from "../components/Layouts/ProductCardTile.vue";
import { onMounted, ref } from "vue";
import { useProductStore } from "../stores/products.store";

const store = useProductStore();
onMounted(() => store.loadMyProducts());
</script>

<style  lang="scss" scoped>
.add-button {
  position: absolute;
  position: fixed;
  right: 20px;
  bottom: 10%;
}
</style>



