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
              :error="step < 1"
              :done="step > 1"
            >
              <!-- Images upload -->
              <div class="col-12 q-my-lg">
                <div class="label-font">Images:</div>
                <q-uploader
                  label="images upload"
                  multiple
                  @added="setFiles"
                  @removed="setFiles"
                  accept=".jpg,.png,.jpeg,.JPEG,.JPG"
                  style="max-width: 300px"
                />
              </div>
              <div>
                <span class="text-primary">{{ imageError }}</span>
              </div>
              <div class="row">
                <div class="col-3 q-my-lg">
                  <!-- <div
                    class="img-holder position-relative"
                    v-for="image in product.gallery"
                    :key="image"
                  >
                    <q-img :src="imageBaseURL + image.path" class="fit" />
                    <i
                      style="color: red"
                      class="fa fa-window-close position-absolute"
                      aria-hidden="true"
                    ></i>
                  </div> -->
                  <div v-for="(image, index) in product.gallery" :key="index">
                    <div
                      class="cursor-pointer position-relative"
                      style="
                        height: 90px;
                        width: 90px;
                        border: 1px solid grey;
                        margin: 10px;
                        background-size: cover;
                      "
                      :style="`background-image: url(${`${imageBaseURL}/${image.path}`};`"
                    >
                      <i
                        @click="removeOldImage(index, image.id)"
                        class="fa fa-window-close position-absolute"
                        style="top: 1%; right: 1%; font-size: 16px; color: red"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Purpose Tabs -->
              <div class="col-12 q-my-lg">
                <div class="purpose">
                  <div class="label-font">Purpose:</div>
                  <q-tabs v-model="product.purpose" class="text-teal">
                    <q-tab
                      class="text-primary"
                      :class="
                        product.purpose == 'Rental'
                          ? 'bg-primary text-white shadow-2'
                          : 'text-primary'
                      "
                      value="Rental"
                      name="Rental"
                      label="Rental"
                    />
                    <q-tab
                      class="text-primary"
                      :class="
                        product.purpose == 'Sale'
                          ? 'bg-primary text-white shadow-2'
                          : 'text-primary'
                      "
                      value="Sale"
                      name="Sale"
                      label="Sale"
                    />
                    <q-tab
                      class="text-primary"
                      :class="
                        product.purpose == 'Both'
                          ? 'bg-primary text-white shadow-2'
                          : 'text-primary'
                      "
                      value="Both"
                      name="Both"
                      label="Both"
                    />
                    <q-tab
                      class="text-primary"
                      :class="
                        product.purpose == 'Donate'
                          ? 'bg-primary text-white shadow-2'
                          : 'text-primary'
                      "
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
                    label="Select Category"
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
                    label="Select Sub Category"
                    class="q-mb-md"
                  />
                </div>
              </div>
              <div class="row">
                <!-- Price -->
                <div
                  v-show="product.purpose != 'Donate'"
                  class="col-12 col-md-6 q-pr-md"
                >
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
                <div
                  class="col-12 col-md-6"
                  :class="product.purpose != 'Donate' ? 'q-pl-md' : 'q-pr-md'"
                >
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
              <div class="col-12 q-self-start q-my-lg">
                <div class="conditions">
                  <div class="label-font">Conditions:</div>
                  <q-tabs v-model="product.condition" class="text-teal">
                    <q-tab
                      class="text-primary"
                      :class="
                        product.condition == 'new'
                          ? 'bg-primary text-white shadow-2'
                          : 'text-primary'
                      "
                      value="new"
                      name="new"
                      label="New"
                    />
                    <q-tab
                      class="text-primary q-mr-lg-md"
                      :class="
                        product.condition == 'used'
                          ? 'bg-primary text-white shadow-2'
                          : 'text-primary'
                      "
                      value="used"
                      name="used"
                      label="used"
                    />
                  </q-tabs>
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

            <q-step
              :name="2"
              title="Additional Info"
              icon="add_comment"
              :done="step > 2"
            >
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
                <q-btn
                  v-else
                  :disable="productStore.btnStatus == 1"
                  type="submit"
                  color="primary"
                  :label="
                    productStore.btnStatus == 1
                      ? 'Loading...'
                      : actionType == 'edit'
                      ? 'Update'
                      : 'Submit'
                  "
                />

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
import { ref } from "vue";
import useValidationRules from "src/composables/useValidationRules";
import useProductForm from "src/composables/useProductForm";
import ReviewProductDetails from "src/components/addProduct/ReviewProductDetail.vue";
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const { rules } = useValidationRules();
const imageBaseURL = process.env.imagesBaseURL;

const step = ref(1);

const {
  product,
  imageError,
  productForm,
  goToNextStep,
  loadSubCategory,
  submitForm,
  setFiles,
  stepper,
  formValidated,
  removeOldImage,
  actionType,
} = useProductForm();
</script>

<style lang="scss" scoped>
.label-font {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}
.img-holder {
  height: 160px;
  width: 200px;
}

@media screen and (max-width: $breakpoint-sm-max) {
  .label-font,
  .info-text {
    font-size: 12px;
  }
  .img-holder {
    height: 120px;
  }
}
</style>
