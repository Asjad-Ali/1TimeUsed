<template>
  <q-page>
    <CarouselSection />
    <RecentProducts />
    <FeaturedProductsSection />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import CarouselSection from "components/Home/CarouselSection.vue";
import FeaturedProductsSection from "src/components/Home/FeaturedProductsSection.vue";
import RecentProducts from "src/components/Home/Mobile/RecentProducts.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    CarouselSection,
    FeaturedProductsSection,
    RecentProducts,
  },
});
</script>
