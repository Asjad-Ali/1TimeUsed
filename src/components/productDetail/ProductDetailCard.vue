<template>
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
        <div class="ellipsis text-subtitle1 text-grey common-size">Type</div>
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
        <div class="ellipsis text-subtitle1 text-grey common-size">Size</div>
        <div class="text-subtitle1 common-size text-grey">
          {{ product.size }}
        </div>
      </div>
      <q-separator />
      <div class="title-date flex justify-between items-center">
        <div class="ellipsis text-subtitle1 text-grey common-size">Colors</div>
        <div class="text-subtitle1 common-size text-grey">
          {{ product.color }}
        </div>
      </div>
      <q-separator />
      <div class="title-date flex justify-between items-center">
        <div class="ellipsis text-subtitle1 text-grey common-size">Purpose</div>
        <div class="text-subtitle1 common-size text-grey">
          {{ product.purpose }}
        </div>
      </div>
      <q-separator />
      <div class="title-date flex justify-between items-center">
        <div class="ellipsis text-subtitle1 text-grey common-size">Brand</div>
        <div class="text-subtitle1 common-size text-grey">
          {{ product.brand }}
        </div>
      </div>
      <q-separator />
      <div class="title q-pt-sm">
        <div class="text-h6 ellipsis common-size">Description</div>
        <p class="text-grey common-size">
          {{ product.description.substr(0, 28) }}
        </p>
      </div>
      <div class="title q-pb-sm">
        <span v-show="toggleText"
          >{{ product.description.substr(28) }} <br />
          <a
            @click="toggleText = !toggleText"
            class="text-h6 ellipsis common-size cursor-pointer"
          >
            <u>Less</u><q-icon name="expand_less" />
          </a>
        </span>
        <a
          @click="toggleText = !toggleText"
          v-show="!toggleText"
          class="text-h6 ellipsis common-size cursor-pointer"
          ><u>More</u><q-icon name="expand_more" />
        </a>
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
            <div class="seller-info q-pl-lg">
              <div
                class="text-subtitle1 cursor-pointer"
                @click="$router.push(`/seller_profile/${product.seller.id}`)"
              >
                {{ product.seller.name }}
              </div>
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

      <div v-show="product.seller.phone" class="show-number text-center">
        <q-icon name="call" color="primary" />
        <span
          @click="togglePhone = !togglePhone"
          v-show="togglePhone"
          class="cursor-pointer"
          >{{ product.seller.phone }}</span
        >
        <a
          @click="togglePhone = !togglePhone"
          v-show="!togglePhone"
          class="underline-none text-grey cursor-pointer"
          >********* Show Number</a
        >
      </div>
    </q-card>
  </div>
</template>

<script setup>
const { toRefs, ref } = require("@vue/reactivity");
const imageBaseURL = process.env.imagesBaseURL;
const toggleText = ref(false);
const togglePhone = ref(false);

const props = defineProps({
  product: Object,
});

const { product } = toRefs(props);
</script>

<style>
</style>

<style scoped lang="scss">
.top-card {
  margin-top: 20px;
}

.common-size {
  @media screen and (max-width: $breakpoint-sm-max) {
    font-size: 12px;
  }
}
</style>
