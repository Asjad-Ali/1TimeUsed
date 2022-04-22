<template>
  <div class="container">
    <!-- Stepper -->
    <div class="w-100 justify-center">
      <div class="q-pa-md">
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
              <span>Images:</span>

              <q-file
                v-model="files"
                label="Add Images"
                filled
                counter
                :counter-label="counterLabelFn"
                max-files="3"
                multiple
              >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" />
                </template>
              </q-file>
            </div>

            <!-- Purpose Tabs -->
            <div class="col-12 q-my-lg">
              <div class="purpose">
                <span>Purpose:</span>
                <q-tabs v-model="tab" class="text-teal">
                  <q-tab class="text-primary" name="mails" label="Rental" />
                  <q-tab class="text-primary" name="alarms" label="Sale" />
                  <q-tab class="text-primary" name="movies" label="Both" />
                  <q-tab class="text-primary" name="donate" label="Donate" />
                </q-tabs>
              </div>
            </div>
            <!-- Title -->
            <div class="col-md-12">
              <span>Title:</span>
              <q-input outlined label="Enter Title" class="q-mb-md bg-white" />
            </div>

            <!-- Cataegories -->
            <div class="row">
              <div class="col-md-6 col-6 q-pr-md">
                <span>Cataegories:</span>
                <q-input outlined label="Category" class="q-mb-md bg-white" />
              </div>

              <div class="col-md-6 col-6 float-right q-pl-md">
                <span>SubCataegories:</span>
                <q-input
                  outlined
                  label="SubCategory"
                  class="q-mb-md bg-white"
                />
              </div>
            </div>
            <!-- Price -->
            <div class="col-md-12">
              <span>Price:</span>
              <q-input
                type="number"
                outlined
                label="Enter Price"
                class="q-mb-md bg-white"
              />
            </div>
            <!-- Conditions -->
            <div class="col-12 q-py-md">
              <span>Conditions:</span>
              <div class="justify-between flex">
                <q-btn
                  color="primary"
                  icon-right="check"
                  label="New"
                  style="min-width: 150px"
                />
                <q-btn
                  color="white"
                  text-color="black"
                  label="Used"
                  style="min-width: 150px"
                />
              </div>
            </div>
            <!-- Neighbourhood -->
            <div class="col-md-12">
              <span>Neighbourhood:</span>
              <q-input
                outlined
                label="Enter Neighbourhood"
                class="q-mb-md bg-white"
              />
            </div>
            <!-- Total Items -->
            <div class="col-md-12">
              <span>Total Items:</span>
              <q-input
                outlined
                label="Enter Neighbourhood"
                class="q-mb-md bg-white"
              />
            </div>

            <!-- Description -->
            <div class="col-md-12">
              <span>Description:</span>
              <q-input
                type="textarea"
                outlined
                label="Enter Detail Description"
                class="q-mb-md bg-white"
              />
            </div>
          </q-step>

          <q-step :name="2" title="Additional Info" icon="add_comment">
            <!-- Brand  -->
            <div class="col-md-12">
              <span>Brand (optional)</span>
              <q-input outlined label="Enter Brand" class="q-mb-md bg-white" />
            </div>
            <!-- Color  -->
            <div class="col-md-12">
              <span>Color (optional)</span>
              <q-input
                outlined
                label="Enter Color e.g (red, blue)"
                class="q-mb-md bg-white"
              />
            </div>
            <!-- Size  -->
            <div class="col-md-12">
              <span>Size (optional)</span>
              <q-input
                outlined
                label="Enter Size e.g (small, medium)"
                class="q-mb-md bg-white"
              />
            </div>
            <!-- Size  -->
            <div class="col-md-12">
              <span>Search Keyword (optional)</span>
              <q-input
                outlined
                label="Enter search keywords e.g (shoes, dress)"
                class="q-mb-md bg-white"
              />
            </div>
          </q-step>
          <q-step :name="3" title="Review & Submit" icon="add_comment">
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                @click="$refs.stepper.next()"
                color="primary"
                :label="step === 4 ? 'Finish' : 'Next'"
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
      </div>
    </div>
    <!-- Stepper End -->
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      shape: ref("line"),
      step: ref(1),
      tab: ref("mails"),
      files: ref(null),
      counterLabelFn({ totalSize, filesNumber, maxFiles }) {
        return `${filesNumber} files of ${maxFiles} | ${totalSize}`;
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
