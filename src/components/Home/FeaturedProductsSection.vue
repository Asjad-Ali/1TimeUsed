<template>
  <q-page-container
    class="column items-center justify-center q-ml-auto section-main-div"
  >
    <div class="conatiner">
      <h5 class="self-start">Products</h5>
      <div class="q-pa-md row items-start q-gutter-md justify-center">
        <ProductCard v-for="i in 10" :key="i" />
      </div>
    </div>
  </q-page-container>
</template>

<script>
import ProductCard from "src/components/Layouts/ProductCard.vue";
export default {
  components: {
    ProductCard,
  },
  setup() {},
};
</script>


<style lang="scss" scoped>
h5 {
  margin: 0;
  padding-left: 10%;
}
.section-main-div {
  @media (min-width: $breakpoint-md-max) {
    max-width: 100%;
  }
}
</style>
