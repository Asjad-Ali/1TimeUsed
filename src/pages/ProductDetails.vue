<template>
  <div class="slider-main">
    <q-carousel
      animated
      v-model="slide"
      navigation
      dark
      infinite
      arrows
      swipeable
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      v-model:fullscreen="fullscreen"
      class="fit details-carousel"
    >
      <q-carousel-slide
        v-for="(image, index) in product.gallery"
        :key="image.id"
        :name="index"
        :img-src="imageBaseURL + image.path"
      />
      <template v-slot:control>
        <q-carousel-control position="bottom-right" :offset="[18, 18]">
          <q-btn
            push
            round
            dense
            color="white"
            text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
    </q-carousel>
  </div>

  <div class="container q-mb-lg">
    <div class="row">
      <div class="col-12 col-md-6 q-pa-sm">
        <q-card class="top-card q-px-md q-mb-md" flat bordered>
          <div class="title-date flex justify-between items-center">
            <div class="text-h6 ellipsis common-size">{{ product.title }}</div>
            <div class="text-grey common-size">
              {{ product.created_at.substring(0, 10) }}
            </div>
          </div>
          <div class="title-date flex justify-between items-center">
            <div class="ellipsis text-subtitle1 text-grey common-size">
              RS:{{ product.price }}
            </div>
            <div class="text-subtitle1 common-size text-grey">
              <q-icon name="visibility" color="primary" />
              {{ product.views }}
            </div>
          </div>
          <div class="title-date flex justify-between items-center">
            <div class="text-subtitle1 text-grey ellipsis common-size">
              {{ product.neighborhood }}
            </div>
            <div class="text-subtitle1 common-size">
              <span class="text-primary">in Stock:</span>
              <span class="dark">{{ product.current_stock }}</span>
            </div>
          </div>
        </q-card>

        <!-- Product-Details Card -->
        <q-card class="my-card q-px-md" flat bordered>
          <div class="title">
            <div class="text-h6 ellipsis common-size">Product Details</div>
          </div>

          <div class="title-date flex justify-between items-center">
            <div class="ellipsis text-subtitle1 text-grey common-size">
              Type
            </div>
            <div class="text-subtitle1 common-size text-grey">
              {{ product.category.title }}
            </div>
          </div>
          <q-separator />
          <div class="title-date flex justify-between items-center">
            <div class="ellipsis text-subtitle1 text-grey common-size">
              Condition
            </div>
            <div class="text-subtitle1 common-size text-grey">
              {{ product.condition }}
            </div>
          </div>
          <q-separator />
          <div class="title-date flex justify-between items-center">
            <div class="ellipsis text-subtitle1 text-grey common-size">
              Size
            </div>
            <div class="text-subtitle1 common-size text-grey">
              {{ product.size }}
            </div>
          </div>
          <q-separator />
          <div class="title-date flex justify-between items-center">
            <div class="ellipsis text-subtitle1 text-grey common-size">
              Colors
            </div>
            <div class="text-subtitle1 common-size text-grey">
              {{ product.color }}
            </div>
          </div>
          <q-separator />
          <div class="title-date flex justify-between items-center">
            <div class="ellipsis text-subtitle1 text-grey common-size">
              Purpose
            </div>
            <div class="text-subtitle1 common-size text-grey">
              {{ product.purpose }}
            </div>
          </div>
          <q-separator />
          <div class="title-date flex justify-between items-center">
            <div class="ellipsis text-subtitle1 text-grey common-size">
              Brand
            </div>
            <div class="text-subtitle1 common-size text-grey">
              {{ product.brand }}
            </div>
          </div>
          <q-separator />
          <div class="title q-pt-sm">
            <div class="text-h6 ellipsis common-size">Product Details</div>
            <p class="text-grey common-size">
              {{ product.description }}
            </p>
          </div>
          <div class="title">
            <div class="text-h6 ellipsis common-size">More</div>
          </div>
        </q-card>

        <!-- Seller Contact -->
        <q-card class="my-card q-pa-md q-my-sm" flat bordered>
          <div class="title-date">
            <div class="text-h6 ellipsis common-size">Contact Seller</div>
          </div>
          <div class="title-date">
            <div class="row flex items-center justify-center">
              <div class="col-1">
                <q-btn round>
                  <q-avatar size="42px">
                    <img :src="imageBaseURL + product.seller.photo" />
                  </q-avatar>
                </q-btn>
              </div>
              <div class="col-11">
                <div class="seller-info">
                  <div class="text-subtitle1">{{ product.seller.name }}</div>
                  <small class="text-grey">
                    Member since
                    {{ product.seller.created_at.substring(0, 10) }}
                  </small>
                </div>
              </div>
            </div>
          </div>

          <q-btn
            color="primary"
            size="sm"
            label="Chat With Seller"
            class="w-100 q-my-md"
          />

          <div class="show-number text-center">
            <q-icon name="call" color="primary" />
            *********
            <a href="#" class="underline-none text-grey">Show Number</a>
          </div>
        </q-card>
      </div>
      <div class="col-12 col-md-6 q-pa-sm">
        <q-card class="top-card q-px-md q-mb-md" flat bordered>
          <div class="text-h6 q-my-md">Related Products</div>

          <div class="row">
            <div
              class="
                flex
                q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg
                justify-center
                items-center
              "
            >
              <!-- <ProductCard class="q-my-md" v-for="i in 6" :key="i" /> -->
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "src/stores/products.store";
export default {
  async preFetch({ store, currentRoute }) {
    const productStore = useProductStore(store);
    const response = await productStore.loadProductDetails(
      currentRoute.params.slug
    );
    console.log(response);
  },
};
</script>

<script setup>
import { ref, computed } from "vue";
import { useMeta } from "quasar";
import ProductCard from "src/components/Layouts/ProductCard.vue";

// const imageBaseURL = "https://1timeused.com/";
const imageBaseURL = process.env.imagesBaseURL;
const productStore = useProductStore();
const product = computed(() => productStore.loadedProduct);
const slide = ref(0);
const fullscreen = ref(false);

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

<style>
.details-carousel .q-panel.scroll {
  background: rgb(22, 19, 19);
}
</style>
<style lang="scss" scoped>
.q-carousel__slide {
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.slider-main {
  height: 140px;
  width: 100%;
  @media screen and (min-width: $breakpoint-sm-min) {
    height: 340px;
  }

  @media screen and (min-width: $breakpoint-md-min) {
    height: 540px;
  }
}

.top-card {
  margin-top: 20px;
}

.common-size {
  @media screen and (max-width: $breakpoint-sm-max) {
    font-size: 12px;
  }
}
</style>
