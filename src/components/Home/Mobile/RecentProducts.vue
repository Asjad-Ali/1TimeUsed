<template>
  <q-page-container
    class="column items-center justify-center q-ml-auto section-main-div"
  >
    <div class="row">
      <h5 class="self-start">Recent Products</h5>
      <div class="col-12">
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
            v-for="i in 10"
            :key="i"
            :name="i"
            class="column no-wrap"
            style="overflow-x: hidden"
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
              <ProductCard v-for="j in 5" :key="j" />
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </q-page-container>
</template>

<script>
import { ref } from "vue";
import ProductCard from "src/components/Layouts/ProductCard.vue";

export default {
  setup() {
    return {
      slide: ref(1),
    };
  },
  components: { ProductCard },
};
</script>

<style lang="scss" scoped>
h5 {
  padding-left: 5%;
}
.section-main-div {
  @media (min-width: $breakpoint-md-max) {
    max-width: 100vw;
  }
}
</style>

