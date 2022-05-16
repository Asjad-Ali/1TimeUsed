<template>
  <div v-if="store.loadingStatus" class="container">
    <div class="text-center q-my-lg q-py-lg" style="height: 60vh">
      <q-spinner color="primary" size="5em" />
    </div>
  </div>
  <div
    v-else
    class="container q-mb-lg"
    :style="store.sellerProducts.length > 3 ? 'height: 60vh' : 'height: 10vh'"
    @scroll="handleScroll"
  >
    <div v-if="store.sellerProducts" class="row flex justify-center q-my-lg">
      <div class="col-md-4 col-12">
        <!-- Seller Profile -->
        <q-card class="my-card q-pa-md" flat bordered>
          <div class="title-date">
            <div class="row flex items-center justify-center">
              <div class="col-1">
                <q-btn round>
                  <q-avatar size="42px">
                    <img
                      src="https://www.w3schools.com/w3images/avatar2.png"
                      alt=""
                    />
                  </q-avatar>
                </q-btn>
              </div>
              <div class="col-11">
                <div class="seller-info q-pl-lg">
                  <div class="text-subtitle1 text-uppercase">
                    {{ store.seller.name }}
                  </div>
                  <small class="text-grey">
                    {{ store.seller.created_at }}</small
                  >
                  <!-- <div class="seller-rating"><small class="text-grey"> 100% Postive Seller Rating</small></div> -->
                  <div class="followers">
                    <!-- <small class="text-grey"
                      ><i class="fa fa-user"></i> 1.5k</small> -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <q-btn
            color="primary"
            size="sm"
            label="Follow"
            class="w-100 q-my-md"
          /> -->
        </q-card>
      </div>

      <div class="col-md-8 col-12">
        <div class="text-h4 text-center q-pt-md">All Products</div>
        <hr class="hr-4" />
        <div
          class="
            flex
            q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg
            justify-center
            items-center
          "
        >
          <ProductCard
            :product="product"
            v-for="product in store.sellerProducts"
            :key="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import ProductCard from "src/components/ProductCard.vue";
import { useRoute } from "vue-router";
import { useSellerStore } from "../stores/seller.store";
const route = useRoute();
const store = useSellerStore();
let lastApiCallTime = Date.now();

onMounted(() => {
  store.loadSellerProducts(route.params.id);
  window.addEventListener("scroll", () => {
    if (Date.now() - lastApiCallTime < 1200) {
      return false;
    }
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      console.log("scrolled to bottom");
      console.log(store.hasMorePages);
      if (store.hasMorePages) {
        store.currentPage++;
        loadSellerProducts(route.params.id, true);
        lastApiCallTime = Date.now();
      }
    }
  });
});
</script>

<style scoped>
hr {
  background-color: #fff;
  padding: 0;
  margin: 40px 80px 40px 80px;
}
hr.hr-4 {
  padding: 0;
  border: none;
  border-top: medium double #8c8c8c;
  color: #8c8c8c;
  text-align: center;
}
hr.hr-4:after {
  content: "§";
  display: inline-block;
  position: relative;
  top: -0.7em;
  font-size: 1.5em;
  padding: 0 0.25em;
  background: #fff;
}
</style>
