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
        :name="banner.id"
        v-for="banner in banners"
        :key="banner.id"
        :img-src="imageBaseURL + banner.image"
      />
    </q-carousel>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { persistData, getPersistentData } from "src/helpers/persistentHelper";
import API from "src/services/API";
const slide = ref();
const banners = ref([]);

onMounted(async () => {
  const dataKey = "banners";
  const storedBanners = getPersistentData(dataKey, 5);
  if (storedBanners) {
    banners.value = storedBanners;
    slide.value = banners.value.length ? banners.value[0].id : 0;
    return;
  }

  const response = await API.get("banners");
  if (response.status == 200) {
    banners.value = response.data;
  }
  slide.value = banners.value.length ? banners.value[0].id : 0;
  persistData(dataKey, response.data);
});
const imageBaseURL = process.env.imagesBaseURL;
</script>
<style lang="scss" scoped>
.slider-main {
  height: 200px;
  width: 100%;

  @media screen and (min-width: $breakpoint-sm-min) {
    height: 340px;
  }

  @media screen and (min-width: $breakpoint-md-min) {
    height: 540px;
  }
}
</style>
