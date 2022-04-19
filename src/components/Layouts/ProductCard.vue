
<template>
  <q-card
    class="product-card cursor-pointer"
    @click="$router.push('/product_details')"
  >
    <q-img :src="imageBaseURL + product.gallery[0].path" />

    <q-card-section>
      <q-btn
        round
        size="sm"
        color="primary"
        icon="favorite_border"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />

      <p class="ellipsis text-subtitle2">{{ product.title }}</p>
      <p class="prise text-center">RS:{{ product.price }}</p>

      <div class="flex justify-between">
        <small class="q-mr-sm"> {{ product.city }} </small>
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
</script>

