<template>
  <q-card class="my-card" flat bordered style="width: 100%; max-width: 410px">
    <q-card-section horizontal>
      <q-card-section
        class="col-5 flex flex-center"
        @click="ProductDetail(product)"
      >
        <q-img
          class="rounded-borders"
          :src="imageBaseURL + product.gallery[0].path"
        />
      </q-card-section>
      <q-card-section>
        <div class="text-h6 q-mt-md ellipsis" style="font-size: 12px">
          {{ product.title }}
        </div>
        <div class="text-caption text-grey ellipsis">
          RS:{{ product.price }}
        </div>
        <div class="q-my-sm text-right">
          <q-btn
            size="sm"
            color="primary"
            label="Activate"
            @click="small = true"
          />
        </div>

        <div class="flex justify-between" @click="ProductDetail(product)">
          <div class="text-caption text-grey ellipsis">
            {{ product.city || getAddress(product.neighborhood) }}
          </div>
          <div class="text-caption text-grey ellipsis">
            {{ new Date(product.created_at).getDate() }}
          </div>
        </div>
      </q-card-section>
    </q-card-section>
    <q-btn
      round
      size="sm"
      icon="more_horiz"
      class="absolute"
      style="top: 5px; right: 10px"
      @click="alert = true"
    />
  </q-card>
</template>

<script setup>
import { defineProps, toRefs } from "vue";
const imageBaseURL = process.env.imagesBaseURL;
const props = defineProps({
  product: Object,
});
const { product } = toRefs(props);

const ProductDetail = (product) => {
  router.push(`/product_details/${product.id}`);
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

<style>
</style>
