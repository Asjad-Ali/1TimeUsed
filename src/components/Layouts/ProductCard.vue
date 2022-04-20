
<template>
  <q-card
    class="product-card cursor-pointer my-card"
    @click="$router.push(`/product_details/${product.id}`)"
  >
    <div class="img-holder">
      <q-img :src="imageBaseURL + product.gallery[0].path" class="fit" />
    </div>

    <q-card-section>
      <q-btn
        round
        size="sm"
        color="primary"
        icon="favorite_border"
        class="absolute"
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
  </q-card>
</template>

<script setup>
import { defineProps, toRefs } from "vue";
const imageBaseURL = process.env.imagesBaseURL;
const props = defineProps({
  product: Object,
});

const { product } = toRefs(props);

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

.my-card {
  width: 210px;
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
