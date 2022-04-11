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
      img-src="https://preview.colorlib.com/theme/fashi/img/hero-2.jpg.webp"
    />
    <q-carousel-slide
      :name="3"
      img-src="https://preview.colorlib.com/theme/fashi/img/hero-1.jpg.webp"
    />
    <q-carousel-slide
      :name="4"
      img-src="https://minimog.thememove.com/wp-content/uploads/2021/12/h3_slide_01.jpg"
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
