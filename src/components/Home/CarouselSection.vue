<template>
  <div class="slider-main">
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      class="fit"
    >
      <q-carousel-slide
        :name="product.title"
        v-for="product in store.featuredProducts"
        :key="product"
        :img-src="imageBaseURL + product.gallery[0].path"
      />
    </q-carousel>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProductsStore } from "../../stores/products.store";

const imageBaseURL = process.env.imagesBaseURL;

const store = useProductsStore();

slide: ref(1);
</script>
<style lang="scss" scoped>
.slider-main {
  height: 140px;
  width: 100%;

  @media screen and (min-width: $breakpoint-sm-min) {
    height: 340px;
  }

  @media screen and (min-width: $breakpoint-md-min) {
    height: 540px;
  }
}
</style>
