<template>
  <div v-if="store.loadingStatus" class="container">
    <div class="flex items-center justify-center" style="height: 40vh">
      <q-spinner color="primary" size="5em" />
    </div>
  </div>
  <div v-else class="container">
    <div v-if="store.myProducts.length" class="relative-position">
      <div
        class="q-pa-md row items-start q-gutter-md justify-center empty_space"
      >
        <ProductCardTile
          v-for="product in store.myProducts"
          :key="product"
          :product="product"
        />
      </div>
    </div>
    <q-responsive
      v-else
      v-show="!store.myProducts.length"
      style="margin-bottom: 70vh"
    >
      <div class="rounded-borders flex flex-center q-mt-sm">
        <h6>Product you add will show up here</h6>
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
      >
        <q-tooltip class="grey-10">Add Your Products</q-tooltip>
      </q-btn>
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
.q-responsive {
  position: unset;
  max-width: 100%;
  max-height: 100%;
}
.empty_space {
  min-height: 65vh;
}
</style>
