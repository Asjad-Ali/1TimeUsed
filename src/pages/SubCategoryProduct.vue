<template>
  <div class="container">
    <div class="border-bottom">
      <div class="row flex justify-between items-center">
        <div class="col text-center border-right">
          <q-icon
            name="format_list_bulleted"
            @click="viewType = 'tile'"
            :size="$q.screen.lt.md ? 'sm' : `md`"
            :color="viewType != 'grid' ? 'primary' : 'black'"
            class="icons"
          />
        </div>
        <div class="col text-center border-right">
          <q-icon
            :color="viewType == 'grid' ? 'primary' : 'black'"
            @click="viewType = 'grid'"
            name="grid_view"
            :size="$q.screen.lt.md ? 'sm' : `md`"
            class="icons"
          />
        </div>
        <div
          @click="sortModal = true"
          class="col text-center border-right cursor-pointer"
        >
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

    <div class="item row justify-center items-center wrap">
      <q-spinner
        style="height: 50vh"
        v-if="store.loadingStatus"
        color="primary"
        size="3em"
      />
      <div
        v-for="product in store.subCategoryProduct"
        :key="product"
        class="q-ma-sm"
      >
        <ProductCard
          v-if="viewType == 'grid'"
          :product="product"
          mainDIv="recent-products"
        />
        <TileProduct v-else :product="product" mainDIv="recent-products" />
      </div>
      <div
        v-if="!store.subCategoryProduct.length && !store.loadingStatus"
        class="justify-center items-center"
      >
        <div style="height: 60vh; width: 97vw" class="relative-position">
          <span class="absolute-center text-h6 text-center"
            >No Product Available</span
          >
        </div>
      </div>
    </div>
    <!-- Sort by Modal -->
    <q-dialog v-model="sortModal">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-center">Sort By</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="q-gutter-sm flex column q-pa-md">
            <q-radio
              v-model="sort_products"
              @click="sortProducts(`desc`)"
              :val="`desc`"
              label="Newest First"
              v-close-popup
            />
            <q-radio
              v-model="sort_products"
              @click="sortProducts(`asc`)"
              :val="`asc`"
              label="Oldest First"
              v-close-popup
            />
            <q-radio
              v-model="sort_products"
              @click="sortProducts(`price<`)"
              :val="`price<`"
              label="Price Low to High"
              v-close-popup
            />
            <q-radio
              v-model="sort_products"
              @click="sortProducts(`price>`)"
              :val="`price>`"
              label="Price High to Low"
              v-close-popup
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Sort by Modal End -->
  </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import ProductCard from "src/components/ProductCard.vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/products.store";
import TileProduct from "../components/TileProduct.vue";
let lastApiCallTime = Date.now();
const store = useProductStore();
const route = useRoute();
const sortModal = ref(false);
const viewType = ref("grid");
const sort_products = ref("");

onMounted(() => {
  store.loadSubCategoryProduct(route.params.id);
  window.addEventListener("scroll", () => {
    if (Date.now() - lastApiCallTime < 1200) {
      return false;
    }
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      console.log("scrolled to bottom");
      console.log(store.hasMorePages);
      if (store.hasMorePages) {
        store.currentPage++;
        loadSubCategoryProduct(route.params.id, true);
        lastApiCallTime = Date.now();
      }
    }
  });
});

const sortProducts = (sort) => {
  store.loadSearchProduct(sort);
};
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
