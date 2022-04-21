<template>
  <div class="container">
    <!-- <div class="column section-main-div">
      <div class="row text-center">
        <div class="col-12">
          <h5 class="text-center">Recent Products</h5>

          <q-carousel
            v-model="slide"
            transition-prev="slide-right"
            transition-next="slide-left"
            swipeable
            animated
            control-color="primary"
            navigation="false"
            padding
            arrows
          >
            <q-carousel-slide
              v-for="i in 8"
              :key="i"
              :name="i"
              class="column no-wrap"
            >
              <div
                class="
                  row
                  fit
                  justify-center
                  items-center
                  q-gutter-md q-col-gutter
                  no-wrap
                "
              >
                <ProductCard
                  v-for="product in store.recentProducts"
                  :key="product"
                  :product="product"
                  mainDIv="recent-products"
                />

              </div>
            </q-carousel-slide>
          </q-carousel>
        </div>
      </div>
    </div> -->

    <div class="slider" id="slider">
      <div class="slide" id="slide">
        <img
          class="item"
          src="http://via.placeholder.com/200x200?text=Product1"
        />
        <img
          class="item"
          src="http://via.placeholder.com/200x200?text=Product1"
        />
        <img
          class="item"
          src="http://via.placeholder.com/200x200?text=Product1"
        />
        <img
          class="item"
          src="http://via.placeholder.com/200x200?text=Product1"
        />
        <img
          class="item"
          src="http://via.placeholder.com/200x200?text=Product2"
        />
        <img
          class="item"
          src="http://via.placeholder.com/200x200?text=Product2"
        />
        <img
          class="item"
          src="http://via.placeholder.com/200x200?text=Product2"
        />
        <img
          class="item"
          src="http://via.placeholder.com/200x200?text=Product2"
        />
        <img
          class="item"
          src="http://via.placeholder.com/200x200?text=Product3"
        />
        <img
          class="item"
          src="http://via.placeholder.com/200x200?text=Product3"
        />
        <img
          class="item"
          src="http://via.placeholder.com/200x200?text=Product3"
        />
        <img
          class="item"
          src="http://via.placeholder.com/200x200?text=Product3"
        />
      </div>
      <button class="ctrl-btn pro-prev">Prev</button>
      <button class="ctrl-btn pro-next">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import ProductCard from "src/components/Layouts/ProductCard.vue";
import { useProductStore } from "../../../stores/products.store";
import CardPage from "src/pages/CardPage.vue";

const store = useProductStore();
const slide = ref(1);
const $q = useQuasar();
const itemsPerPage = computed(() => {
  if ($q.screen.xs) {
    return 2;
  } else if ($q.screen.sm) {
    return 4;
  } else if ($q.screen.md) {
    return 6;
  } else if ($q.screen.lg) {
    return 8;
  } else {
    return 10;
  }
});
</script>

<style lang="scss" scoped>
h5 {
  margin-bottom: 0;
}
// .section-main-div {
//   overflow-x: hidden;
// }
.section-main-div {
  padding-bottom: 0 !important;
}
// .section-main-div {
//   @media screen and (max-width: $breakpoint-sm) {
//     overflow-x: hidden;
//   }
// }

.slider {
  width: 100%;
  height: 200px;
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

.slider .item {
  margin-right: 10px;
}

.slider .item:last-child {
  margin-right: 0;
}

.ctrl {
  text-align: center;
  margin-top: 5px;
}

.ctrl-btn {
  padding: 20px 20px;
  min-width: 50px;
  background: #fff;
  border: none;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  outline: none;

  position: absolute;
  top: 50%;
  margin-top: -27.5px;
}

.ctrl-btn.pro-prev {
  left: 0;
}

.ctrl-btn.pro-next {
  right: 0;
}
</style>

