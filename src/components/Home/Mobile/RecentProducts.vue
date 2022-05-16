<template>
  <div class="q-pa-lg">
    <h5 class="text-center q-pb-xl q-mt-sm">Recent Products</h5>
    <div
      class="slider"
      id="slider"
      :style="{ height: `${sliderHeight + 50}px` }"
    >
      <div class="slide" id="slide">
        <div
          v-for="(i, index) in totalItems"
          :key="index"
          :style="{ 'margin-right': `${itemMarginRight}px` }"
          class="item row fit justify-center items-center q-gutter-md q-col-gutter no-wrap"
        >
          <CardSkeleton
            style="height: 300px"
            v-if="store.recentProductsLoader"
          />
          <ProductCard
            v-for="product in store.recentProducts"
            :key="product"
            :product="product"
            mainDIv="recent-products"
          />
        </div>
      </div>
      <!-- <button
        @click="translateX('backward')"
        v-show="slide > 0"
        class="ctrl-btn pro-prev desktop-only"
      >
        Prev
      </button> -->
      <q-btn
        class="pro-prev desktop-only"
        round
        color="secondary"
        icon="chevron_left"
        @click="translateX('backward')"
        v-show="slide > 0"
      />
      <!-- <button
        v-show="slide == 0 || slide < hiddenItems"
        @click="translateX"
        class="ctrl-btn pro-next desktop-only"
      >
        Next
      </button> -->
      <q-btn
        class="pro-next desktop-only"
        round
        color="secondary"
        icon="chevron_right"
        v-show="slide == 0 || slide < hiddenItems"
        @click="translateX"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import ProductCard from "src/components/ProductCard.vue";
import CardSkeleton from "src/components/CardSkeleton.vue";
import { useProductStore } from "../../../stores/products.store";
import CardPage from "src/pages/CardPage.vue";
const $q = useQuasar();
const store = useProductStore();
const slide = ref(0);
const sliderHeight = $q.screen.lt.sm ? 240 : 300;
const itemMarginRight = 10;
const totalItems = 10;
const hiddenItems = ref(0);

const translateX = (type = "forward") => {
  if (!hiddenItems.value) {
    hiddenItems.value = countOfHiddenItems();
  }

  if (
    (type == "backward" && slide.value < 1) ||
    (type != "backward" && slide.value >= hiddenItems.value)
  ) {
    return;
  }

  if (type == "backward") {
    slide.value -= 1;
  } else {
    slide.value += 1;
  }

  const slideElement = document.querySelector("#slide");
  slideElement.style.left =
    slide.value * -(sliderHeight + itemMarginRight) + "px";
};

const countOfHiddenItems = () => {
  const slider = document.getElementById("slider");
  const visibleItems = slider.offsetWidth / (sliderHeight + itemMarginRight);
  return totalItems - Math.ceil(visibleItems);
};
</script>

<style lang="scss" scoped>
h5 {
  margin-bottom: 0;
}

.section-main-div {
  padding-bottom: 0 !important;
}

.slider {
  width: 100%;
  position: relative;
  margin: auto;
  overflow-x: scroll;
  overflow-y: hidden;
}

.slider::-webkit-scrollbar {
  display: none;
}

.slider .slide {
  display: flex;
  position: absolute;
  left: 0;
  transition: 0.3s left ease-in-out;
}

.slider .item:last-child {
  margin-right: 0;
}

.ctrl {
  text-align: center;
  margin-top: 5px;
}

// .ctrl-btn {
//   top: 50%;
//   margin-top: -27.5px;
// }

.pro-prev {
  left: 0;
  position: absolute;
  top: 50%;
  margin-top: -27.5px;
}

.pro-next {
  right: 0;
  position: absolute;
  top: 50%;
  margin-top: -27.5px;
}
</style>
