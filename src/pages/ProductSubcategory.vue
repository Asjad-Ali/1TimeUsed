<template>
  <div class="container">
    <div class="row q-my-lg q-gutter-md justify-center">
      <div
        class="col-5 col-md-2"
        v-for="(category, index) in categories"
        :key="index"
      >
        <q-card
          class="my-card cursor-pointer"
          @click="$router.push('/product_details')"
        >
          <div class="img-holder">
            <img :src="category.thumbnail" alt="product" />
          </div>

          <q-card-section style="padding: 0px">
            <q-btn
              color="primary"
              :label="category.title"
              class="w-100"
              size="sm"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
const categories = [
  {
    title: "Cloth",
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0256/4594/0810/products/2_e64bc63a-735c-4c2c-9542-81681cff4891_360x.jpg?v=1614070027",
    subcategories: [],
  },
  {
    title: "jewellery",
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0256/4594/0810/products/2_b71f02c8-1b6d-4f14-9686-cbd05ae3ab5c_360x.jpg?v=1615019404",
    subcategories: [],
  },
  {
    title: "Shoes",
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0256/4594/0810/products/7_3c5add6f-e961-4fc2-be0e-15fd9d1c349f_360x.jpg?v=1614070940",
    subcategories: [],
  },
  {
    title: "Watches",
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0256/4594/0810/products/2_cee0c1fa-ae0b-45b1-b6eb-60e62213af27_360x.jpg?v=1615532041",
    subcategories: [],
  },
  {
    title: "Fashion",
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0256/4594/0810/products/2_fa31bdcb-129f-4c46-9c5c-566971712942_360x.jpg?v=1615530706",
    subcategories: [],
  },
  {
    title: "Others",
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0256/4594/0810/files/lb-2_1e482937-4f64-4d3d-9e9f-feb36a836c0c_540x.png?v=1617705770",
    subcategories: [],
  },
];
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}

.img-holder {
  height: 250px;
  width: 100%;
}

.img-holder img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
