<template>
  <div class="container">
    <div class="column q-pb-xl">
      <div class="row justify-center items-center q-mt-lg">
        <div class="col-md-6 col-12">
          <q-input
            @update:model-value="searchDonatedProduct"
            class="q-my-auto"
            dense
            filled
            outlined
            debounce="400"
            v-model="search"
            label="Search Here"
            style="max-width: 100%"
          >
            <template v-slot:after>
              <q-btn icon="search" size="16px" outline> </q-btn>
            </template>
          </q-input>
          <h6 v-show="search" class="text-center text-grey q-my-md">
            Results for "<span class="text-bold">{{ search }}</span
            >"
          </h6>
        </div>
      </div>

      <h5 class="text-center q-pb-md">Donate Products</h5>

      <div
        class="flex q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg justify-center items-center"
      >
        <q-spinner v-if="store.loadingStatus" color="primary" size="3em" />
        <ProductCard
          v-else
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
import ProductCard from "src/components/ProductCard.vue";
import useSearch from "../composables/useSearch";

const search = ref("");

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

const searchDonatedProduct = (value) => {
  store.loadDonateProducts(value);
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
