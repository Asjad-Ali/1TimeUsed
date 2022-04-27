<template>
  <div class="container">
    <!-- Stepper -->
    <div class="w-100 justify-center">
      <div class="q-my-md">
        <q-form
          action="#"
          method="post"
          @submit.prevent="submitForm"
          ref="productForm"
        >
          <q-stepper
            v-model="step"
            ref="stepper"
            color="primary"
            header-nav
            animated
          >
            <q-step
              :name="1"
              title="Product Info"
              icon="settings"
              :error="step < 3"
              :done="step > 1"
            >
              <!-- Images upload -->
              <div class="col-12 q-my-lg">
                <div class="label-font">Images:</div>

                <q-uploader
                  label="Individual upload"
                  multiple
                  @added="setFiles"
                  @removed="setFiles"
                  accept=".jpg,.png,.jpeg,.JPEG,.JPG"
                  style="max-width: 300px"
                />
              </div>

              <!-- Purpose Tabs -->
              <div class="col-12 q-my-lg">
                <div class="purpose">
                  <div class="label-font">Purpose:</div>
                  <q-tabs v-model="product.purpose" class="text-teal">
                    <q-tab
                      class="text-primary"
                      value="Rental"
                      name="Rental"
                      label="Rental"
                    />
                    <q-tab
                      class="text-primary"
                      value="Sale"
                      name="Sale"
                      label="Sale"
                    />
                    <q-tab
                      class="text-primary"
                      value="Both"
                      name="Both"
                      label="Both"
                    />
                    <q-tab
                      class="text-primary"
                      value="Donate"
                      name="Donate"
                      label="Donate"
                    />
                  </q-tabs>
                </div>
              </div>
              <!-- Title -->
              <div class="col-md-12">
                <div class="label-font">Title:</div>
                <q-input
                  :rules="[rules.required, rules.min5]"
                  dense
                  outlined
                  v-model="product.title"
                  label="Enter Title"
                  class="q-mb-md"
                />
              </div>

              <!-- Cataegories -->
              <div class="row">
                <div class="col-md-6 col-6 q-pr-md">
                  <div class="label-font">Categories:</div>
                  <q-select
                    dense
                    outlined
                    emit-value
                    map-options
                    option-value="id"
                    option-label="title"
                    v-model="product.category_id"
                    :rules="[rules.required]"
                    :options="categoryStore.categories"
                    @update:model-value="loadSubCategory()"
                    label="Category"
                    class="q-mb-md"
                  />
                </div>

                <div class="col-md-6 col-6 float-right q-pl-md">
                  <div class="label-font">Sub Categories:</div>
                  <q-select
                    dense
                    outlined
                    emit-value
                    map-options
                    :rules="[rules.required]"
                    option-value="id"
                    option-label="title"
                    v-model="product.sub_category_id"
                    :options="categoryStore.subCategories"
                    label="Category"
                    class="q-mb-md"
                  />
                </div>
              </div>
              <div class="row">
                <!-- Price -->
                <div class="col-12 col-md-6 q-pr-md">
                  <div class="label-font">Price:</div>
                  <q-input
                    dense
                    v-model="product.price"
                    :rules="[rules.required]"
                    type="number"
                    outlined
                    label="Enter Price"
                    class="q-mb-md"
                  />
                </div>
                <!-- Total Items -->
                <div class="col-12 col-md-6 q-pl-md">
                  <div class="label-font">Total Items:</div>
                  <q-input
                    dense
                    v-model="product.current_stock"
                    :rules="[rules.required]"
                    outlined
                    label="Enter Total Items"
                    class="q-mb-md"
                  />
                </div>
              </div>

              <!-- Conditions -->
              <div class="col-12 q-py-md">
                <div class="label-font">Conditions:</div>
                <div class="justify-sm-between flex">
                  <q-btn
                    :color="product.condition == 'new' ? 'primary' : 'white'"
                    class="q-mr-lg"
                    @click="product.condition = 'new'"
                    label="New"
                    :text-color="product.condition == 'new' ? 'white' : 'black'"
                    style="min-width: 150px"
                    :icon-right="product.condition == 'new' ? 'check' : ''"
                  />

                  <q-btn
                    :color="product.condition == 'used' ? 'primary' : 'white'"
                    @click="product.condition = 'used'"
                    :text-color="
                      product.condition == 'used' ? 'white' : 'black'
                    "
                    label="Used"
                    :icon-right="product.condition == 'used' ? 'check' : ''"
                    style="min-width: 150px"
                  />
                </div>
              </div>
              <!-- Neighbourhood -->
              <div class="col-md-12">
                <div class="label-font">Neighborhood:</div>
                <q-input
                  dense
                  :rules="[rules.required]"
                  readonly
                  v-model="product.neighborhood"
                  outlined
                  class="q-mb-md"
                />
              </div>

              <!-- Description -->
              <div class="col-md-12">
                <div class="label-font">Description:</div>

                <q-input
                  dense
                  :rules="[rules.required, rules.min5]"
                  v-model="product.description"
                  type="textarea"
                  outlined
                  label="Enter Detail Description"
                  class="q-mb-md"
                />
              </div>
            </q-step>

            <q-step :name="2" title="Additional Info" icon="add_comment">
              <!-- Brand  -->
              <div class="col-md-12">
                <div class="label-font">Brand (optional)</div>
                <q-input
                  dense
                  outlined
                  v-model="product.brand"
                  label="Enter Brand"
                  class="q-mb-md"
                />
              </div>
              <!-- Color  -->
              <div class="col-md-12">
                <div class="label-font">Color (optional)</div>
                <q-input
                  dense
                  outlined
                  label="Enter Color e.g (red, blue)"
                  class="q-mb-md"
                />
              </div>
              <!-- Size  -->
              <div class="col-md-12">
                <div class="label-font">Size (optional)</div>
                <q-input
                  dense
                  v-model="product.size"
                  outlined
                  label="Enter Size e.g (small, medium)"
                  class="q-mb-md"
                />
              </div>
              <!-- Size  -->
              <div class="col-md-12">
                <div class="label-font">Search Keyword (optional)</div>
                <q-input
                  dense
                  outlined
                  label="Enter search keywords e.g (shoes, dress)"
                  class="q-mb-md"
                />
              </div>
            </q-step>
            <q-step :name="3" title="Review & Submit" icon="send">
              <ReviewProductDetails :product="product" />
            </q-step>

            <template v-slot:navigation>
              <q-stepper-navigation>
                <q-btn
                  v-if="step != 3"
                  @click="goToNextStep"
                  color="primary"
                  label="Next"
                />
                <q-btn v-else type="submit" color="primary" label="Submit" />

                <q-btn
                  v-if="step > 1"
                  flat
                  color="primary"
                  @click="$refs.stepper.previous()"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </template>
          </q-stepper>
        </q-form>
      </div>
    </div>
    <!-- Stepper End -->
  </div>
</template>

<script setup>
import { useProductStore } from "src/stores/products.store";
import { useCategoryStore } from "../stores/categories.store";
import { onMounted, reactive, ref } from "vue";
import compressImage from "../composables/useImageCompression";
import useValidationRules from "src/composables/useValidationRules";
import ReviewProductDetails from "../components/addProduct/reviewProductDetails.vue";
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const { rules } = useValidationRules();
const productForm = ref(null);
const stepper = ref(null);
const step = ref(1);

const product = reactive({
  title: "Cloths",
  category_id: "",
  neighborhood: "Johar Town, Lahore, Punjab, Pakistan",
  sub_category_id: "",
  price: "5000",
  color: "All",
  purchase_price: 0,
  discount: 0,
  current_stock: 1,
  description: "This is a A+ Quality Product and up to 50% off on Every Item",
  images: [],
  condition: "",
  latitude: "31.4697",
  longitude: "74.2728",
  discountTil: "",
  brand: "Gul Ahmad",
  size: "6 Meters",
  purpose: "",
});

onMounted(() => {
  categoryStore.loadCategories();
});

const goToNextStep = () => {
  productForm.value.validate().then((success) => {
    if (success) {
      stepper.value.next();
    }
  });
};

const loadSubCategory = () => {
  categoryStore.loadSubCategory(product.category_id);
};

const submitForm = () => {
  console.log(product);
  productForm.value.validate().then((success) => {
    if (success) {
      productStore.addMyProduct(product);
    } else {
      console.log("there are errors in form");
    }
  });
};

const setFiles = async (files) => {
  const compressedImages = [];

  for (let i = 0; i < files.length && i < 10; i++) {
    compressedImages[i] = await compressImage(files[i]);
  }
  product.images = compressedImages;
};
</script>

<style lang="scss" scoped>
.label-font {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

@media screen and (max-width: $breakpoint-sm-max) {
  .label-font,
  .info-text {
    font-size: 12px;
  }
}
</style>
