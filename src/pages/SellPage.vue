<template>
  <div v-if="store.loadingStatus" class="container">
    <div class="text-center q-m-lg q-p-lg" style="height: 40vh">
      <q-spinner color="primary" size="5em" />
    </div>
  </div>
  <div v-else class="container">
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
      <q-responsive v-else v-show="!store.myProducts.length" :ratio="4 / 2">
        <div class="rounded-borders flex flex-center">
          <h4>Product you add will show up here</h4>
        </div>
      </q-responsive>

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
import ProductCardTile from "../components/ProductCardTile.vue";
import { onMounted, ref } from "vue";
import { useProductStore } from "../stores/products.store";
const store = useProductStore();
onMounted(() => store.loadMyProducts());
</script>

<style lang="scss" scoped>
.add-button {
  position: absolute;
  position: fixed;
  right: 20px;
  bottom: 10%;
}
</style>
