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

      <h5 class="text-center">Donate Products</h5>
      <div
        class="flex q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg justify-center items-center"
      >
        <div
          class="q-card product-card cursor-pointer my-card"
          v-for="donateProduct in donateProducts"
          :key="donateProduct"
        >
          <div class="img-holder">
            <div class="q-img q-img--menu fit" role="img">
              <div style="padding-bottom: 133.612%"></div>
              <div class="q-img__container absolute-full">
                <q-img
                  :src="imageBaseURL + donateProduct.gallery[0].path"
                  class="fit"
                />
              </div>
              <div class="q-img__content absolute-full q-anchor--skip"></div>
            </div>
          </div>
          <div class="q-card__section q-card__section--vert">
            <span class="q-focus-helper"></span
            ><q-btn
              :disable="wishlistStore.wishlistLoader == donateProduct.id"
              round
              outline
              flat
              @click="addToWishlist(donateProduct.id)"
              size="sm"
              color="primary"
              class="absolute bg-white shadow-sm"
              style="top: 0; right: 12px; transform: translateY(-50%)"
            >
              <i
                v-if="wishlistStore.wishlistLoader == donateProduct.id"
                class="fa fa-repeat fa-2x"
                aria-hidden="true"
              ></i>
              <i
                v-else
                class="fa-2x"
                :class="{
                  'fa fa-heart-o': donateProduct.favorite != 1,
                  'fa fa-heart': donateProduct.favorite == 1,
                }"
                aria-hidden="true"
              ></i>
            </q-btn>
            <div>
              <p class="ellipsis text-subtitle2 mobile-font">
                {{ donateProduct.title }}
              </p>
              <p class="prise text-center">FREE</p>
            </div>
            <div class="flex justify-between">
              <small class="q-mr-sm">{{
                donateProduct.neighborhood.substr(0, 15)
              }}</small
              ><small>
                <!-- 12 April -->
                {{ donateProduct.created_at.substr(0, 10) }}
              </small>
            </div>
          </div>

          <!-- donation badge -->
          <div
            class="q-badge flex inline items-center no-wrap q-badge--single-line bg-positive donation-baadge"
            role="alert"
          >
            {{ donateProduct.purpose }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../stores/products.store";
import { useWishlistStore } from "../stores/wishlist.store";
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
