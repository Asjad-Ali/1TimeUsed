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
        <q-card-section class="col-7">
          <div
            @click="ProductDetail(product)"
            class="text-h6 ellipsis"
            style="font-size: 12px"
          >
            {{ product.title.substr(0, 20) }}
            {{ product.title.length > 20 ? "..." : "" }}
          </div>
          <div class="flex justify-between">
            <p v-if="product.price" class="text-caption text-grey ellipsis">
              RS:{{ product.price }}
            </p>
            <p v-else class="prise text-center">FREE</p>
            <div class="text-caption text-primary ellipsis">
              in Stock:<span class="dark">{{ product.current_stock }}</span>
            </div>
          </div>

          <div class="flex justify-between">
            <q-btn
              size="8px"
              color="primary"
              label="Activate"
              class="q-mb-xs"
            />
            <div class="text-caption text-grey">
              <q-icon name="visibility" color="primary" size="12px" />
              {{ product.views }}
            </div>
          </div>

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

      <!-- Edit Delete -->
      <div class="inline cursor-pointer menu-icon shadow-sm">
        <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
      </div>
      <q-menu touch-position>
        <q-list style="min-width: 100px" dense>
          <q-item clickable v-close-popup>
            <q-item-section>Edit</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>Delete</q-item-section>
          </q-item>
        </q-list>
      </q-menu>

      <!--Featured Badge  -->
      <!-- <q-badge v-if="product.price" color="warning" class="badge shadow-sm">
        Featured
      </q-badge> -->
      <!-- New badge -->
      <!-- <q-badge v-if="product.price" color="primary" class="new-baadge shadow-sm"
        >New
      </q-badge> -->
      <!-- Donation badge -->
      <!-- <q-badge v-if="!product.price" color="positive" class="badge shadow-sm"
        >Donation
      </q-badge> -->
    </q-card>
  </div>
</template>

<script setup>
import { useWishlistStore } from "../stores/wishlist.store";
import { useProductStore } from "../stores/products.store";
import { toRefs } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
const imageBaseURL = process.env.imagesBaseURL;
const wishlistStore = useWishlistStore();
const productStore = useProductStore();
const router = useRouter();
const $q = useQuasar();
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
  productStore.loadedProduct = $q.screen.gt.sm ? null : product;
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

.menu-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 255, 255, 0.911);
  padding: 0px 8px;
  border-radius: 3px !important;
}

p {
  margin: 0 0 3px;
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
