<template>
  <q-card class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section
        class="col-5 flex flex-center"
        @click="ProductDetail(product)"
      >
        <div class="img-holder">
          <img
            class="rounded-borders fit"
            :src="imageBaseURL + product.gallery[0].path"
          />
        </div>
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
            v-if="payload.status == 1"
            size="sm"
            color="primary"
            label="Activate"
            @click="small = true"
          />
          <q-btn
            v-if="payload.status == 0"
            size="sm"
            color="primary"
            label="Deactivate"
            @click="small = true"
          />
          <q-btn
            v-if="payload.status == 2"
            size="sm"
            color="primary"
            label="Sold out"
            @click="small = true"
          />
          <q-btn
            v-if="payload.status == 3"
            size="sm"
            color="primary"
            label="Sold Out/Deactivate"
            @click="small = true"
          />
        </div>

        <div class="flex justify-between column">
          <div class="text-caption text-grey ellipsis">
            {{ product.city || getAddress(product.neighborhood) }}
          </div>
          <div class="text-caption text-grey ellipsis">
            {{ product.created_at.substr(0, 10) }}
          </div>
        </div>
      </q-card-section>
      <div
        style="position: absolute; top: 3%; right: 3%"
        class="inline rounded-borders"
      >
        <div class="inline cursor-pointer">
          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
        </div>
        <q-menu touch-position>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section @click="editProduct">Edit</q-item-section>
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
        <q-btn
          flat
          label="Yes"
          color="primary"
          @click="deleteProduct(product.id)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Modal Order Active & Deactive -->
  <q-dialog v-model="small">
    <q-card style="width: 230px">
      <div class="q-gutter-sm flex column q-pa-md">
        <q-radio
          v-model="payload.status"
          @click="changeStatus(1)"
          :val="1"
          label="Activate"
          v-close-popup
        />
        <q-radio
          @click="changeStatus(0)"
          v-model="payload.status"
          :val="0"
          label="Deactivate"
          v-close-popup
        />
        <q-radio
          @click="changeStatus(2)"
          v-model="payload.status"
          :val="2"
          label="Sold Out"
          v-close-popup
        />
        <q-radio
          @click="changeStatus(3)"
          v-model="payload.status"
          :val="3"
          label="Sold Out/Deactivate"
          v-close-popup
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { defineProps, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "src/stores/products.store";
const router = useRouter();
const imageBaseURL = process.env.imagesBaseURL;
const productStore = useProductStore();
const props = defineProps({
  product: Object,
});
const { product } = toRefs(props);
const payload = ref({
  id: product.value.id,
  status: product.value.status,
});

const ProductDetail = (product) => {
  router.push(`/product_details/${product.slug}`);
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

const editProduct = () => {
  productStore.selectedProductForEdit = product.value;
  router.push(`/edit_product/${product.value.id}`);
};

const deleteProduct = (id) => {
  productStore.deleteAProduct(id);
};

const changeStatus = (status) => {
  payload.value.status = status;
  productStore.productStatus(payload.value);
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
}

.img-holder {
  height: 110px;
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
