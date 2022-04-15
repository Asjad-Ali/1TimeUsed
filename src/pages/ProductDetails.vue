<template>
  <div class="slider-main">
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
      class="fit"
    >
      <q-carousel-slide
        :name="1"
        img-src="https://cdn.shopify.com/s/files/1/0256/4594/0810/files/bg-breadcrumb_1920x.jpg?v=1615187740"
      />
      <q-carousel-slide
        :name="2"
        img-src="https://cdn.shopify.com/s/files/1/0256/4594/0810/files/s-9-1_2048x.jpg?v=1619166921"
      />
      <q-carousel-slide
        :name="3"
        img-src="https://cdn.shopify.com/s/files/1/0256/4594/0810/files/slideshow_1_2048x.jpg?v=1618200140"
      />
      <q-carousel-slide
        :name="4"
        img-src="https://cdn.shopify.com/s/files/1/1825/4753/files/banner-jewelry_1920x.gif?v=1639539459"
      />
    </q-carousel>
  </div>

  <div class="container q-mb-lg">
    <div class="row">
      <div class="col-12 col-md-6 q-pa-sm">
        <q-card class="top-card q-px-md q-mb-md" flat bordered>
          <div class="title-date flex justify-between items-center">
            <div class="text-h6 ellipsis common-size">Beautiful Frok</div>
            <div class="text-grey common-size">25 March 2022</div>
          </div>
          <div class="title-date flex justify-between items-center">
            <div class="ellipsis text-subtitle1 text-grey common-size">
              RS:500
            </div>
            <div class="text-subtitle1 common-size text-grey">
              <q-icon name="visibility" color="primary" />
              59
            </div>
          </div>
          <div class="title-date flex justify-between items-center">
            <div class="text-subtitle1 text-grey ellipsis common-size">
              Sanda kalan Lahore
            </div>
            <div class="text-subtitle1 common-size">
              <span class="text-primary">in Stock:</span>
              <span class="dark">1</span>
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
            <div class="text-subtitle1 common-size text-grey">Cloth</div>
          </div>
          <q-separator />
          <div class="title-date flex justify-between items-center">
            <div class="ellipsis text-subtitle1 text-grey common-size">
              Condition
            </div>
            <div class="text-subtitle1 common-size text-grey">Used</div>
          </div>
          <q-separator />
          <div class="title-date flex justify-between items-center">
            <div class="ellipsis text-subtitle1 text-grey common-size">
              Size
            </div>
            <div class="text-subtitle1 common-size text-grey">Small</div>
          </div>
          <q-separator />
          <div class="title-date flex justify-between items-center">
            <div class="ellipsis text-subtitle1 text-grey common-size">
              Purpose
            </div>
            <div class="text-subtitle1 common-size text-grey">Sale</div>
          </div>
          <q-separator />
          <div class="title-date flex justify-between items-center">
            <div class="ellipsis text-subtitle1 text-grey common-size">
              Brand
            </div>
            <div class="text-subtitle1 common-size text-grey">Saba Safinaz</div>
          </div>
          <q-separator />
          <div class="title q-pt-sm">
            <div class="text-h6 ellipsis common-size">Product Details</div>
            <p class="text-grey common-size">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad
              assumenda hic consequuntur. Excepturi quas laudantium nobis
              assumenda iure deleniti tempore?
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
              <div class="col-3">
                <q-btn round>
                  <q-avatar size="42px">
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                  </q-avatar>
                </q-btn>
              </div>
              <div class="col-9">
                <div class="seller-info">
                  <div class="text-subtitle1">Hafiz Sajjad Motor</div>
                  <small class="text-grey">member since jan 2021</small>
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
            **** <a href="#" class="underline-none text-grey">Show Number</a>
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
              <ProductCard class="q-my-md" v-for="i in 6" :key="i" />
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ProductCard from "src/components/Layouts/ProductCard.vue";

export default {
  setup() {
    return {
      slide: ref(1),
    };
  },
  components: { ProductCard },
};

const productdetails = [
  {
    product_detail_left: "Type",
    product_detail_right: "Cloth",
  },
  {
    product_detail_left: "Condition",
    product_detail_right: "Used",
  },
  {
    product_detail_left: "Size",
    product_detail_right: "Small",
  },
  {
    product_detail_left: "Purpose",
    product_detail_right: "Sale",
  },
  {
    product_detail_left: "Brand",
    product_detail_right: "Saba Safinaz",
  },
];
1;
</script>
<style lang="scss" scoped>
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

// .top-card {
//   margin-top: -20px;
// }

.common-size {
  @media screen and (max-width: $breakpoint-sm-max) {
    font-size: 12px;
  }
}
</style>
