<template>
  <div class="search-bg">
    <div class="container">
      <div class="search-bg blue-1-bg">
        <div class="row justify-center q-pt-xl">
          <div class="col-md-6">
            <q-select
              filled
              v-model="search"
              use-input
              hide-selected
              fill-input
              input-debounce="500"
              dense
              label="Search Here"
              class="q-pb-md"
              :options="options"
              @filter="filterFn"
              @filter-abort="abortFilterFn"
              style="max-width: 100%"
              dropdown-icon="false"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> No results</q-item-section>
                </q-item>
              </template>

              <template v-slot:after>
                <q-btn icon="search" size="16px" outline> </q-btn>
              </template>
            </q-select>
            <h6 v-show="search" class="q-pb-md text-center">
              Results for "<span class="text-bold">{{ search }}</span
              >"
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <!-- Sort By  -->
    <div class="row justify-center">
      <div class="col-md-11 col-12 q-px-lg">
        <div class="row justify-between items-center">
          <div class="col-md-6 col-6">
            <h6 class="app-page-title">
              <q-icon
                name="grid_view"
                color="primary"
                size="sm"
                class="cursor-pointer"
              />
            </h6>
          </div>
          <div class="col-md-2 col-6">
            <q-select
              dense
              outlined
              v-model="model"
              :options="options"
              label="Sort By"
              class="bg-white"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Sort By End -->
    <div class="conatiner flex justify-center items-center">
      <div class="column">
        <div
          class="
            flex
            q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg
            justify-center
            items-center
          "
        >
          <ProductCard v-for="product in store.searchProduct" :key="product" />
        </div>
      </div>
    </div>
  </div>
</template>

 <script setup>
import { ref } from "vue";
import ProductCard from "src/components/Layouts/ProductCard.vue";
import { useProductStore } from "../stores/products.store";

const store = useProductStore();
const persistent = ref(false);
const search = ref("");
const stringOptions = ref(["cloth", "rings"]);
const shape = ref("line");
const model = ref(null);
const options = [
  "Newest First",
  "Oldest First",
  "Price Low to High",
  "Price Hight to Low",
  "All",
];

const filterFn = (val, update, abort) => {
  store.loadSearchProduct(search.value);
  console.log(search.value);
  setTimeout(() => {
    update(() => {
      if (val === "") {
        options.value = stringOptions;
      } else {
        const needle = val.toLowerCase();
        options.value = stringOptions.value.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      }
    });
  }, 500);
};

const abortFilterFn = () => {
  console.log("delayed filter aborted");
};
</script>
<style lang="scss" scoped>
.search-bg {
  background: #fff;
}
</style>
