<template>
  <div class="row items-start">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="col-5 flex flex-center">
          <div class="img-holder">
            <img
              class="rounded-borders fit"
              :src="imageBaseURL + product.gallery[0].path"
            />
          </div>
        </q-card-section>
        <q-card-section>
          <div
            @click="ProductDetail(product)"
            class="text-h6 ellipsis"
            style="font-size: 12px"
          >
            {{ product.title.substr(0, 20) }}
            {{ product.title.length > 20 ? "..." : "" }}
          </div>
          <p v-if="product.price" class="text-caption text-grey ellipsis">
            RS:{{ product.price }}
          </p>
          <p v-else class="prise text-center">FREE</p>
          <div class="flex justify-between">
            <div class="text-caption text-grey ellipsis">
              {{ product.city || getAddress(product.neighborhood) }}
            </div>
            <div class="text-caption text-grey ellipsis">
              {{ formatDate(product.created_at) }}
            </div>
          </div>
        </q-card-section>
      </q-card-section>

      <q-btn
        :disable="wishlistStore.wishlistLoader == product.id"
        round
        outline
        flat
        @click="addToWishlist(product)"
        size="sm"
        color="primary"
        class="absolute shadow-sm"
        style="top: 5px; right: 10px"
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
      <!--Featured Badge  -->
      <q-badge v-if="product.price" color="warning" class="badge shadow-sm">
        Featured
      </q-badge>
      <!-- New badge -->
      <q-badge v-if="product.price" color="primary" class="new-baadge shadow-sm"
        >New
      </q-badge>
      <!-- Donation badge -->
      <q-badge v-if="!product.price" color="positive" class="badge shadow-sm"
        >Donation
      </q-badge>
    </q-card>
  </div>
</template>

<script setup>
import { useWishlistStore } from "../stores/wishlist.store";
import { useProductStore } from "../stores/products.store";
import { toRefs } from "vue";
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

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const formatDate = (date) => {
  date = new Date(date);
  return `${date.getDate()} ${months[date.getMonth()]}`;
};
</script>

<style lang="scss" scoped>
.my-card {
  height: 130px;
  width: 350px;
  position: relative;
  @media (max-width: $breakpoint-xs-max) {
    width: 97vw;
  }
}
.badge {
  position: absolute;
  top: 50%;
  right: 2px;
}
.new-baadge {
  position: absolute;
  top: 35%;
  right: 2px;
}

.img-holder {
  height: 100px;
  width: 100%;
}
.img-holder > img {
  object-fit: cover;
}
</style>
