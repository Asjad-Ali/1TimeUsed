<template>
  <div class="container q-mb-lg">
    <div class="row flex justify-center">
      <div class="col-md-6">
        <!-- Seller Profile -->
        <q-card class="my-card q-pa-md q-my-lg" flat bordered>
          <div class="title-date">
            <div class="row flex items-center justify-center">
              <div class="col-1">
                <q-btn round>
                  <q-avatar size="42px">
                    <img
                      src="https://www.w3schools.com/w3images/avatar2.png"
                      alt=""
                    />
                  </q-avatar>
                </q-btn>
              </div>
              <div class="col-11">
                <div class="seller-info q-pl-lg">
                  <div class="text-subtitle1 text-uppercase">
                    Kiran Hussain Unique Store
                  </div>
                  <small class="text-grey"> 10 April 2022</small>
                  <div class="seller-rating">
                    <small class="text-grey"> 100% Postive Seller Rating</small>
                    <div class="followers">
                      <small class="text-grey">
                        <i class="fa fa-user"></i>
                        1.5k</small
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <q-btn
            color="primary"
            size="sm"
            label="Follow"
            class="w-100 q-my-md"
          />
        </q-card>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div
          class="
            flex
            q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg
            justify-center
            items-center
          "
        >
          <ProductCard
            :product="product"
            v-for="product in store.featuredProducts"
            :key="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import ProductCard from "src/components/ProductCard.vue";
import { useProductStore } from "../stores/products.store.js";

const store = useProductStore();

onMounted(() => {
  store.loadFeaturedProducts();
});
</script>

<style>
</style>
