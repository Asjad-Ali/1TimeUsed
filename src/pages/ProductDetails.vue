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
        :name="1"
        img-src="https://cdn.shopify.com/s/files/1/0256/4594/0810/files/bg-breadcrumb_1920x.jpg?v=1615187740"
      />
      <q-carousel-slide
        :name="2"
        img-src="https://cdn.shopify.com/s/files/1/0256/4594/0810/files/s-9-1_2048x.jpg?v=1619166921"
      />
      <q-carousel-slide
        :name="3"
        img-src="https://cdn.shopify.com/s/files/1/0256/4594/0810/files/slideshow_1_2048x.jpg?v=1618200140"
      />
      <q-carousel-slide
        :name="4"
        img-src="https://cdn.shopify.com/s/files/1/1825/4753/files/banner-jewelry_1920x.gif?v=1639539459"
      />
    </q-carousel>
  </div>

  <div class="container">
    <q-card class="my-card q-pa-sm" flat bordered>
      <div class="title-date flex justify-between items-center">
        <div class="text-h6 q-mt-sm q-mb-xs">Beautiful Frok</div>
        <div class="text-grey">25 March 2022</div>
      </div>
      <div class="title-date flex justify-between items-center">
        <div class="q-mt-sm q-mb-xs">RS:500</div>
        <div class="text-grey">59</div>
      </div>
      <div class="title-date flex justify-between items-center">
        <div class="text-h6 q-mt-sm q-mb-xs">Sanda kalan Lahore</div>
        <div class="text-grey">in Stock</div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      slide: ref(1),
    };
  },
};
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
