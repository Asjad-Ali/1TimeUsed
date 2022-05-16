<template>
  <div v-if="store.loadingStatus" class="container">
    <div class="flex items-center justify-center" style="height: 40vh">
      <q-spinner color="primary" size="5em" />
    </div>
  </div>
  <div v-else class="container">
    <div class="relative-position">
      <div
        v-if="store.myProducts.length"
        :style="store.myProducts.length < 4 ? 'height: 60vh' : 'height: 10vh'"
        class="q-pa-md row items-start q-gutter-md justify-center"
      >
        <ProductCardTile
          v-for="product in store.myProducts"
          :key="product"
          :product="product"
        />
      </div>
      <q-responsive v-else style="height: 50vh">
        <div
          v-if="!store.myProducts.length"
          class="rounded-borders flex flex-center q-mt-sm"
        >
          <h6>Product you add will show up here</h6>
        </div>
      </q-responsive>
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
</style>
