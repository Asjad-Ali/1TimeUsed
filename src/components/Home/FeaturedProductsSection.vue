<template>
  <q-page-container>
    <div class="conatiner flex justify-center items-center">
      <div class="column q-pb-xl">
        <h5 class="q-pb-xl text-center">Products</h5>
        <div
          class="
            flex
            q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg
            justify-center
            items-center
          "
        >
          <ProductCard v-for="i in 12" :key="i" />
        </div>
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
}
</style>
