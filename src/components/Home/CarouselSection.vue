<template>
  <q-carousel
    animated
    height="60vh"
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
      img-src="https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    />
    <q-carousel-slide
      :name="2"
      img-src="https://images.pexels.com/photos/279906/pexels-photo-279906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    />
    <q-carousel-slide
      :name="3"
      img-src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    />
    <q-carousel-slide
      :name="4"
      img-src="https://images.pexels.com/photos/1474234/pexels-photo-1474234.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
