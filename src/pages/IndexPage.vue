<template>
  <q-page>
    <CarouselSection />
    <FeaturedProductsSection />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import CarouselSection from "components/Home/CarouselSection.vue";
import FeaturedProductsSection from "src/components/Home/FeaturedProductsSection.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    CarouselSection,
    FeaturedProductsSection,
  },
});
</script>
