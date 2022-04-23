<template>
  <div class="container">
    <div class="row q-my-lg q-gutter-md justify-center">
      <div
        class="col-5 col-md-2"
        v-for="(subCategory, index) in store.subCategories"
        :key="index"
      >
        <q-card class="my-card cursor-pointer" @click="ProductDetail(product)">
          <div class="img-holder">
            <img :src="imageBaseURL + subCategory.thumbnail" alt="product" />
          </div>

          <q-card-section style="padding: 0px">
            <q-btn
              color="primary"
              :label="subCategory.title"
              class="w-100"
              size="sm"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useCategoryStore } from "../stores/categories.store";
const store = useCategoryStore();
const router = useRouter();
const route = useRoute();
const imageBaseURL = process.env.imagesBaseURL;

onMounted(() => {
  store.loadCategories();
  store.loadSubCategory(route.params.name);
});

const ProductDetail = (product) => {
  router.push(`/product_details/${product.id}`);
  const index = productStore.recentProducts.findIndex(
    (object) => object.id === product.id
  );
  if (index === -1) {
    productStore.recentProducts.unshift(product);
  } else {
    productStore.recentProducts = productStore.recentProducts.filter(
      (pro) => pro.id != product.id
    );
    productStore.recentProducts.unshift(product);
  }
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}

.img-holder {
  height: 250px;
  width: 100%;
}

.img-holder img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
