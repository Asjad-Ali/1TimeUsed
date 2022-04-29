<template>
  <div class="container">
    <div class="border-bottom">
      <div class="row flex justify-between items-center">
        <div class="col text-center border-right">
          <q-icon
            name="format_list_bulleted"
            :size="$q.screen.lt.md ? 'sm' : `md`"
            class="icons"
          />
        </div>
        <div class="col text-center border-right">
          <q-icon
            name="grid_view"
            :size="$q.screen.lt.md ? 'sm' : `md`"
            class="icons"
          />
        </div>
        <div class="col text-center border-right">
          <q-icon
            name="filter_list"
            :size="$q.screen.lt.md ? 'sm' : `md`"
            class="icons"
          />
          <span>Sort By</span>
        </div>
        <div class="col text-center">
          <q-icon
            name="filter_alt"
            :size="$q.screen.lt.md ? 'sm' : `md`"
            class="icons"
          />
          <span>Filter</span>
        </div>
      </div>
    </div>
    <div class="row q-my-lg q-gutter-md justify-center">
      <div
        class="
          item
          row
          fit
          justify-center
          items-center
          q-gutter-md q-col-gutter
          wrap
        "
      >
        <ProductCard
          v-for="product in store.subCategoryProduct"
          :key="product"
          :product="product"
          mainDIv="recent-products"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import ProductCard from "src/components/Layouts/ProductCard.vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/products.store";

const store = useProductStore();
const route = useRoute();
onMounted(() => store.loadSubCategoryProduct(route.params.id));
</script>

<style lang="scss" scoped>
.icons {
  cursor: pointer;
  padding: 5px 0px;
}
span {
  color: rgb(78, 78, 78);
}

.border-right {
  border-right: 1px solid #dcdcdc;
}
.border-bottom {
  border-bottom: 1px solid #dcdcdc;
}
</style>
