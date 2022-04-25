<template>
  <div class="container">
    <div class="relative-position">
      <div
        class="q-pa-md row items-start q-gutter-md justify-center"
        v-if="store.myProducts.length"
      >
        <sellProductCard
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
    <!-- Modal Alert -->
    <q-dialog v-model="alert">
      <q-card style="width: 230px">
        <div class="q-gutter-sm flex column q-pa-md">
          <q-radio v-model="shape" val="line" label="Edit" />
          <q-radio v-model="shape" val="a" label="Delete" />
        </div>
      </q-card>
    </q-dialog>

    <!-- Modal Order Active & Deactive -->
    <q-dialog v-model="small">
      <q-card style="width: 230px">
        <div class="q-gutter-sm flex column q-pa-md">
          <q-radio v-model="shape" val="line" label="Activate" />
          <q-radio v-model="shape" val="rectangle" label="Deactivate" />
          <q-radio v-model="shape" val="ellipse" label="Sold Out" />
          <q-radio v-model="shape" val="polygon" label="Sold Out/Deactivate" />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import sellProductCard from "../components/Layouts/ProductCardTile.vue";
import { onMounted, ref } from "vue";
import { useProductStore } from "../stores/products.store";
export default {
  components: {
    sellProductCard,
  },
  setup() {
    const store = useProductStore();
    onMounted(() => store.loadMyProducts());

    return {
      store,
      alert: ref(false),
      shape: ref("line"),
      small: ref(false),
      medium: ref(false),
      fullWidth: ref(false),
      fullHeight: ref(false),
    };
  },
};
</script>

<style  lang="scss" scoped>
.add-button {
  position: absolute;
  position: fixed;
  right: 20px;
  bottom: 10%;
}
</style>



