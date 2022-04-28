<template>
  <div class="container">
    <div class="column q-pb-xl">
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
import { computed, onMounted } from "vue";
import { useProductStore } from "../stores/products.store";
import { useWishlistStore } from "../stores/wishlist.store";

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
