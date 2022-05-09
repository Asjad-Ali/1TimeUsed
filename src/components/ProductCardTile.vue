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
        <div
          class="text-h6 q-mt-md ellipsis mobile-font"
          style="font-size: 12px"
        >
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
      <div class="inline rounded-borders cursor-pointer">
        <div class="inline q-ps-lg q-ma-md">
          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
        </div>
        <q-menu touch-position>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-item @click="confirm = true" clickable v-close-popup>
              <q-item-section>Delete</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </q-card-section>
  </q-card>

  <!-- Delete Confirmation Modal -->
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm"
          >Are You sure you want to delete this Product</span
        >
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Yes" color="primary" v-close-popup />
      </q-card-actions>
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

const confirm = ref(false);
const shape = ref("line");
const small = ref(false);
</script>
<style lang="scss" scoped>
.my-card {
  width: 350px;
  max-width: 350px;
}
// Small devices (landscape phones, less than 768px)
@media (max-width: 1262px) {
  .my-card {
    max-width: 340px;
  }
}
// Small devices (landscape phones, less than 768px)
@media (max-width: 768px) {
  .my-card {
    max-width: 317px;
    overflow: hidden;
  }
}
@media (max-width: $breakpoint-sm-max) {
  .mobile-font {
    font-size: 10px;
  }
}
</style>
