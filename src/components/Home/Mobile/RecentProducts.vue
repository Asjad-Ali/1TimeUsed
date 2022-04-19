<template>
  <q-page-container class="column section-main-div">
    <div class="row">
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
              />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </q-page-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import ProductCard from "src/components/Layouts/ProductCard.vue";
import { useProductStore } from "../../../stores/products.store";

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

.section-main-div {
  padding-bottom: 0 !important;
}
.section-main-div {
  @media screen and (max-width: $breakpoint-sm) {
    overflow-x: hidden;
  }
}
</style>

