<template>
  <div class="container">
    <div class="row justify-center">
      <div class="col-md-6">
        <div class="q-pa-md">
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
              <q-input outlined label="SubCategory" class="q-mb-md bg-white" />
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
          <div class="col-12">
            <span>Conditions:</span>
            <div class="justify-between flex">
              <q-btn color="primary" icon-right="check" label="New" />
              <q-btn color="white" text-color="black" label="Used" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
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
