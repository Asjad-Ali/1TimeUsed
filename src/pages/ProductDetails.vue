<template>
  <SliderMain :product="product" />
  <div class="container q-mb-lg">
    <div class="row">
      <ProductDetailCard :product="product" />
      <div class="col-12 col-md-6 q-pa-sm desktop-only">
        <q-card
          class="top-card q-px-md q-mb-md related-product-card"
          flat
          bordered
        >
          <div class="text-h6 q-my-md">Related Products</div>

          <div class="row">
            <ProductsList :products="product.related_products" />
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Screen } from "quasar";
import { useMeta } from "quasar";
export default {
  async preFetch({ store, currentRoute }) {
    let screen = "desktop";
    if (!process.env.SERVER) {
      if (Screen.lt.md) {
        screen = "application";
      }
    }

    const productStore = useProductStore(store);
    if (!productStore.loadedProduct) {
      const response = await productStore.loadProductDetails(
        currentRoute.params.slug,
        screen
      );
    }
  },
};
</script>

<script setup>
import { computed } from "vue";

import ProductCard from "src/components/ProductCard.vue";
import { useProductStore } from "src/stores/products.store";
import { useWishlistStore } from "src/stores/wishlist.store";
import ProductDetailCard from "../components/productDetail/ProductDetailCard.vue";
import SliderMain from "../components/productDetail/SliderMain.vue";
import ProductsList from "src/components/ProductsList.vue";
const { toRefs } = require("@vue/reactivity");
const wishlistStore = useWishlistStore();
const imageBaseURL = process.env.imagesBaseURL;
const productStore = useProductStore();
const product = computed(() => productStore.loadedProduct);
const addToWishlist = (product) => {
  wishlistStore.addWishlist(product);
};

useMeta({
  title: `${product.value.title} - 1timeused`,

  // meta tags
  meta: {
    description: { name: "description", content: product.value.description },
    keywords: { name: "keywords", content: "1timeused" },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${product.value.title} - 1timeused`;
      },
    },
    ogDescription: {
      property: "og:description",
      template(ogDescription) {
        return product.value.description;
      },
    },
    ogImage: {
      property: "og:image",
      template(ogImage) {
        return imageBaseURL + product.value.gallery[0].path;
      },
    },
  },
});
</script>

<style scoped>
.top-card {
  margin-top: 20px;
}
</style>

<style lang="scss">
.q-card.related-product-card {
  @media screen and (max-width: $breakpoint-sm-max) {
    text-align: center;
    padding: 0;
  }
}
</style>
