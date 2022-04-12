<template>
  <q-carousel
    animated
    height="80vh"
    v-model="slide"
    navigation
    infinite
    :autoplay="autoplay"
    arrows
    transition-prev="slide-right"
    transition-next="slide-left"
    @mouseenter="autoplay = false"
    @mouseleave="autoplay = true"
  >
    <q-carousel-slide
      :name="1"
      img-src="https://preview.colorlib.com/theme/shoppers/images/xhero_1.jpg.pagespeed.ic.6alHHFzIKu.webp"
    />
    <q-carousel-slide
      :name="2"
      img-src="https://cdn.shopify.com/s/files/1/1825/4753/files/slideshow.jpg?v=1637326488"
    />
    <q-carousel-slide
      :name="3"
      img-src="https://cdn.shopify.com/s/files/1/1825/4753/files/banner-milance.gif?v=1639539418"
    />
    <q-carousel-slide
      :name="4"
      img-src="https://cdn.shopify.com/s/files/1/1825/4753/files/banner-jewelry_1920x.gif?v=1639539459"
    />
  </q-carousel>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      slide: ref(1),
      autoplay: ref(true),
    };
  },
};
</script>
