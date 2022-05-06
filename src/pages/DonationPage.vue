<template>
  <div class="container">
    <div class="column q-pb-xl">
      <div class="row justify-between items-center q-mt-lg">
        <div class="col-md-3 col-6">
          <q-icon
            name="grid_view"
            color="primary"
            size="sm"
            class="cursor-pointer mb-10-mobile"
          />
        </div>
        <div class="col-md-6 col-12">
          <q-select
            filled
            v-model="search"
            use-input
            hide-selected
            fill-input
            input-debounce="400"
            dense
            @update:model-value="searchProducts"
            label="Search Here"
            @filter="getSearchSuggestions"
            :options="searchSuggestions"
            @filter-abort="searchProducts"
            style="max-width: 100%"
            dropdown-icon="false"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results</q-item-section>
              </q-item>
            </template>

            <template v-slot:after>
              <q-btn @click="searchProducts" icon="search" size="16px" outline>
              </q-btn>
            </template>
          </q-select>
          <h6 v-show="search" class="text-center text-grey q-my-md">
            Results for "<span class="text-bold">{{ search }}</span
            >"
          </h6>
        </div>

        <div class="col-md-2 col-12">
          <q-select
            dense
            outlined
            v-model="model"
            :options="searchSuggestions"
            label="Sort By"
            class="bg-white"
          />
        </div>
      </div>

      <h5 class="text-center q-pb-md">Donate Products</h5>

      <div
        class="flex q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg justify-center items-center"
      >
        <ProductCard
          :product="product"
          v-for="product in store.donateProducts"
          :key="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../stores/products.store";
import { useWishlistStore } from "../stores/wishlist.store";
import ProductCard from "src/components/Layouts/ProductCard.vue";
import useSearch from "../composables/useSearch";

const {
  searchSuggestions,
  getSearchSuggestions,
  searchProducts,
  search,
  searchResults,
} = useSearch();

const model = ref(null);
const imageBaseURL = process.env.imagesBaseURL;
const wishlistStore = useWishlistStore();
const store = useProductStore();
onMounted(() => {
  store.loadDonateProducts();
});
const addToWishlist = (id) => {
  wishlistStore.addWishlist(id);
};
const donateProducts = computed(() => store.donateProducts);
</script>

<style lang="scss" scoped>
.img-holder {
  height: 160px;
  width: 100%;
}

.donation-baadge {
  position: absolute;
  bottom: 60%;
  right: 0;
}
.my-card {
  width: 210px;
}

@media (max-width: 1290px) {
  .my-card {
    width: 168px;
  }
}

@media (max-width: $breakpoint-sm-max) {
  .my-card {
    width: 150px;
    max-width: 170px;
    font-size: 11px;
  }
  .mobile-font {
    font-size: 10px;
  }
  .img-holder {
    height: 120px;
  }
}

@media (max-width: 336px) {
  .my-card {
    width: 120px;
  }
}
</style>
