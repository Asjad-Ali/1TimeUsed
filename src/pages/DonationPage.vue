<template>
  <div class="container">
    <div class="column q-pb-xl">
      <h5 class="text-center">Donation Products</h5>
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
                <img
                  class="q-img__image q-img__image--with-transition q-img__image--loaded"
                  loading="lazy"
                  fetchpriority="auto"
                  aria-hidden="true"
                  draggable="false"
                  src="https://1timeused.com/uploads/products/213916504407571.jpg"
                  style="object-fit: cover; object-position: 50% 50%"
                />
              </div>
              <div class="q-img__content absolute-full q-anchor--skip"></div>
            </div>
          </div>
          <div class="q-card__section q-card__section--vert">
            <button
              class="q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--round text-primary q-btn--actionable q-focusable q-hoverable absolute bg-white shadow-sm"
              tabindex="0"
              type="button"
              style="
                font-size: 10px;
                top: 0px;
                right: 12px;
                transform: translateY(-50%);
              "
            >
              <span class="q-focus-helper"></span
              ><span
                class="q-btn__content text-center col items-center q-anchor--skip justify-center row"
                ><i class="fa-2x fa fa-heart-o" aria-hidden="true"></i
              ></span>
            </button>
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
              ><small> {{ donateProduct.created_at.substr(0, 10) }} </small>
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

const store = useProductStore();
onMounted(() => {
  store.loadDonateProducts();
});
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
