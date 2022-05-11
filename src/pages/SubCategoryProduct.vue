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
        v-if="store.loadingStatus"
        class="absolute-center"
        color="primary"
        size="3em"
      />
      <div
        v-else
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
    </div>
    <!-- Sort by Modal -->
    <q-dialog v-model="sortModal">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-center">Sort By</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="flex items-center justify-between">
            <p>Newest First</p>
            <q-radio v-model="shape" val="line1" />
          </div>
          <div class="flex items-center justify-between">
            <p>Oldest First</p>
            <q-radio v-model="shape" val="line2" />
          </div>
          <div class="flex items-center justify-between">
            <p>Price Low to High</p>
            <q-radio v-model="shape" val="line3" />
          </div>
          <div class="flex items-center justify-between">
            <p>Price High to Low</p>
            <q-radio v-model="shape" val="line4" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
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

const store = useProductStore();
const route = useRoute();
const sortModal = ref(false);
const viewType = ref("grid");
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
