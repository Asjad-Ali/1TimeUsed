<template>
  <q-page>
    <CarouselSection />
    <div class="container">
      <div v-if="productStore.loadingStatus">
        <ProductCardSkeleton v-for="card in 5" :key="card" />
      </div>
      <RecentProducts v-else />
      <FeaturedProductsSection v-if="productStore.featuredProducts.length" />
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, onMounted } from "vue";
import CarouselSection from "components/Home/CarouselSection.vue";
import FeaturedProductsSection from "src/components/Home/FeaturedProductsSection.vue";
import ProductCardSkeleton from "src/components/ProductCardSkeleton.vue";
import RecentProducts from "src/components/Home/Mobile/RecentProducts.vue";
import { useAuthStore } from "../stores/auth.store";
import { useProductStore } from "../stores/products.store";
import { useRoute } from "vue-router";

const productStore = useProductStore();
const authStore = useAuthStore();
const route = useRoute();

onMounted(() => {
  productStore.loadRecentProducts();
  productStore.loadFeaturedProducts();
  if (route.query.code) {
    authStore.loginWithFacebook(
      location.href.split("?").pop().replace("code=", "")
    );
  }
});
</script>
