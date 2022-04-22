
<template>
  <q-card
    class="product-card cursor-pointer my-card"
    :class="{ 'recent-product': mainDiv == 'recent-products' }"
  >
    <div
      class="img-holder"
      @click="$router.push(`/product_details/${product.id}`)"
    >
      <q-img :src="imageBaseURL + product.gallery[0].path" class="fit" />
    </div>

    <q-card-section>
      <q-btn
        round
        outline
        flat
        @click="addToWishlist(product.id)"
        size="sm"
        color="primary"
        icon="favorite_border"
        class="absolute bg-white shadow-sm"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />
      <q-btn
        round
        outline
        flat
        @click="addToWishlist(product.id)"
        size="sm"
        color="primary"
        icon="favorite_border"
        class="absolute bg-white shadow-sm"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />

      <p class="ellipsis text-subtitle2 mobile-font">{{ product.title }}</p>
      <p class="prise text-center">RS:{{ product.price }}</p>

      <div class="flex justify-between">
        <small class="q-mr-sm">
          {{ product.city || getAddress(product.neighborhood) }}
        </small>
        <small> 12 april </small>
      </div>
    </q-card-section>
    <!-- Feature badge -->
    <q-badge color="amber" class="featured-baadge">Featured </q-badge>
    <!-- New badge -->
    <q-badge color="primary" class="new-baadge">New </q-badge>
  </q-card>
</template>

<script setup>
import { useWishlistStore } from "../../stores/wishlist.store";
import { defineProps, toRefs } from "vue";
const imageBaseURL = process.env.imagesBaseURL;
const store = useWishlistStore();

const props = defineProps({
  product: Object,
  mainDiv: {
    type: String,
    default: "featured-products",
  },
});

const { product, mainDiv } = toRefs(props);

const addToWishlist = (id) => {
  store.addWishlist(id);
};

const getAddress = (address) => {
  if (address) {
    address = address.replace(", Pakistan", "");
    //address = address.replace("Pakistan", "");
  }

  if (address && address.length > 15) {
    const addressArray = address.split(",");
    return addressArray
      .slice(Math.max(addressArray.length - 5, 1))
      .join(",")
      .substring(1, 15);
  }
  return address;
};
</script>


<style lang="scss" scoped>
.img-holder {
  height: 160px;
  width: 100%;
}
.featured-baadge {
  position: absolute;
  top: 40px;
  right: 0;
}
.new-baadge {
  position: absolute;
  top: 18px;
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

.recent-product {
  background: red;
}
</style>
