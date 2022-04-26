<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section
        class="col-5 flex flex-center"
        @click="ProductDetail(product)"
      >
        <q-img
          class="rounded-borders fit img-holder"
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

        <div class="flex justify-between">
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

  <!-- Modal Alert -->
  <q-dialog v-model="alert">
    <q-card style="width: 230px">
      <div class="q-gutter-sm flex column q-pa-md">
        <q-radio v-model="shape" val="line" label="Edit" />
        <q-radio v-model="shape" val="a" label="Delete" />
      </div>
    </q-card>
  </q-dialog>

  <!-- Modal Order Active & Deactive -->
  <q-dialog v-model="small">
    <q-card style="width: 230px">
      <div class="q-gutter-sm flex column q-pa-md">
        <q-radio v-model="shape" val="line" label="Activate" />
        <q-radio v-model="shape" val="rectangle" label="Deactivate" />
        <q-radio v-model="shape" val="ellipse" label="Sold Out" />
        <q-radio v-model="shape" val="polygon" label="Sold Out/Deactivate" />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineProps, ref, toRefs } from "vue";
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

const alert = ref(false);
const shape = ref("line");
const small = ref(false);
const medium = ref(false);
const fullWidth = ref(false);
const fullHeight = ref(false);
</script>
<style lang="scss" scoped>
.my-card {
  width: 350px;
  max-width: 350px;
}
// Small devices (landscape phones, less than 768px)
@media (max-width: 1262px) {
  .my-card {
    max-width: auto;
  }
  .p-mobile-0 {
    padding: 0;
  }
}
</style>
