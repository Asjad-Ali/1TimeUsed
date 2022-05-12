<template>
  <q-card
    class="product-card cursor-pointer my-card"
    :class="{ 'recent-product': mainDiv == 'recent-products' }"
  >
    <div class="img-holder" @click="ProductDetail(product)">
      <q-img
        :src="
          product.gallery.length ? imageBaseURL + product.gallery[0].path : ''
        "
        class="fit"
      />
    </div>

    <q-card-section>
      <q-btn
        :disable="wishlistStore.wishlistLoader == product.id"
        round
        outline
        flat
        @click="addToWishlist(product)"
        size="sm"
        color="primary"
        class="absolute bg-white shadow-sm"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      >
        <i
          v-if="wishlistStore.wishlistLoader == product.id"
          class="fa fa-repeat fa-2x"
          aria-hidden="true"
        ></i>
        <i
          v-else
          class="fa-2x"
          :class="{
            'fa fa-heart-o': product.favorite != 1,
            'fa fa-heart': product.favorite == 1,
          }"
          aria-hidden="true"
        ></i>
      </q-btn>
      <div @click="ProductDetail(product)">
        <p class="ellipsis text-subtitle2 mobile-font">{{ product.title }}</p>
        <p v-if="product.price" class="prise text-center">
          RS:{{ product.price }}
        </p>
        <p v-else class="prise text-center">FREE</p>
      </div>

      <div @click="ProductDetail(product)" class="flex justify-between">
        <small class="q-mr-sm">
          {{ product.city || getAddress(product.neighborhood) }}
        </small>
        <small> 12 april </small>
      </div>
    </q-card-section>
    <!-- Feature badge -->
    <q-badge v-if="product.price" color="amber" class="featured-baadge"
      >Featured
    </q-badge>
    <!-- New badge -->
    <q-badge v-if="product.price" color="primary" class="new-baadge"
      >New
    </q-badge>
    <!-- Donation badge -->
    <q-badge v-if="!product.price" color="positive" class="donation-baadge"
      >Donation
    </q-badge>
  </q-card>
</template>

<script setup>
import { useWishlistStore } from "../stores/wishlist.store";
import { useProductStore } from "../stores/products.store";
import { defineProps, toRefs } from "vue";
import { useRouter } from "vue-router";
const imageBaseURL = process.env.imagesBaseURL;
const wishlistStore = useWishlistStore();
const productStore = useProductStore();
const router = useRouter();
const props = defineProps({
  product: Object,
  mainDiv: {
    type: String,
    default: "featured-products",
  },
});
const { product, mainDiv } = toRefs(props);

const addToWishlist = (product) => {
  wishlistStore.addWishlist(product);
};

const ProductDetail = (product) => {
  router.push(`/product_details/${product.slug}`);
  const index = productStore.recentProducts.findIndex(
    (object) => object.id === product.id
  );
  if (index === -1) {
    productStore.recentProducts.unshift(product);
  } else {
    productStore.recentProducts = productStore.recentProducts.filter(
      (pro) => pro.id != product.id
    );
    productStore.recentProducts.unshift(product);
  }
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
.donation-baadge {
  position: absolute;
  top: 125px;
  left: 0;
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
