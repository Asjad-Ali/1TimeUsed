<template>
  <div class="container">
    <!-- Stepper -->
    <div class="w-100 justify-center">
      <div class="q-my-md">
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
                url="http://localhost:4444/upload"
                label="Individual upload"
                multiple
                style="max-width: 300px"
              />
            </div>

            <!-- Purpose Tabs -->
            <div class="col-12 q-my-lg">
              <div class="purpose">
                <div class="label-font">Purpose:</div>
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
              <div class="label-font">Title:</div>
              <q-input dense outlined label="Enter Title" class="q-mb-md" />
            </div>

            <!-- Cataegories -->
            <div class="row">
              <div class="col-md-6 col-6 q-pr-md">
                <div class="label-font">Cataegories:</div>
                <q-input dense outlined label="Category" class="q-mb-md" />
              </div>

              <div class="col-md-6 col-6 float-right q-pl-md">
                <div class="label-font">SubCataegories:</div>
                <q-input dense outlined label="SubCategory" class="q-mb-md" />
              </div>
            </div>
            <div class="row">
              <!-- Price -->
              <div class="col-12 col-md-6 q-pr-md">
                <div class="label-font">Price:</div>
                <q-input
                  dense
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
                  outlined
                  label="Enter Total Items"
                  class="q-mb-md"
                />
              </div>
            </div>

            <!-- Conditions -->
            <div class="col-12 q-py-md">
              <div class="label-font">Conditions:</div>
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
              <div class="label-font">Neighbourhood:</div>
              <q-input
                dense
                outlined
                label="Enter Neighbourhood"
                class="q-mb-md"
              />
            </div>

            <!-- Description -->
            <div class="col-md-12">
              <div class="label-font">Description:</div>

              <q-input
                dense
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
              <q-input dense outlined label="Enter Brand" class="q-mb-md" />
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
            <!-- <q-table
              title="Review"
              :rows="rows"
              :columns="columns"
              row-key="name"
            /> -->
            <div class="row">
              <!-- Single Item -->
              <div class="col-12 col-md-12">
                <div class="label-font">Title:</div>
                <div class="info-text text-grey q-pb-md">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatum totam enimLorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Voluptatum totam enim
                </div>
              </div>
              <!-- Single Item -->
              <div class="col-12 col-md-12">
                <div class="label-font">Description:</div>
                <div class="info-text text-grey q-pb-md">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatum totam enimLorem ipsum dolor sit amet, consectetur
                  adipisicing elit. Voluptatum totam enim Lorem ipsum dolor sit
                  amet, consectetur adipisicing elit. Voluptatum totam enimLorem
                  ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum
                  totam enim
                </div>
              </div>
            </div>
            <div class="row">
              <!-- Single Item -->
              <div class="col-4 col-md-4">
                <div class="label-font">Price:</div>
                <div class="info-text text-grey q-pb-md">RS:25.000</div>
              </div>
              <!--  Single Item s -->
              <div class="col-4 col-md-4">
                <div class="label-font">Cataegory</div>
                <div class="info-text text-grey q-pb-md">Lorem ipsum</div>
              </div>
              <!--  Single Item s -->
              <div class="col-4 col-md-4">
                <div class="label-font">SubCataegory</div>
                <div class="info-text text-grey q-pb-md">Lorem ipsum</div>
              </div>
            </div>
            <div class="row">
              <!-- Single Item -->
              <div class="col-4 col-md-4">
                <div class="label-font">Purpose:</div>
                <div class="info-text text-grey q-pb-md">Slae</div>
              </div>
              <!--  Single Item s -->
              <div class="col-4 col-md-4">
                <div class="label-font">Condition</div>
                <div class="info-text text-grey q-pb-md">Used</div>
              </div>
              <!--  Single Item s -->
              <div class="col-4 col-md-4">
                <div class="label-font">Color</div>
                <div class="info-text text-grey q-pb-md">Red</div>
              </div>
            </div>
            <div class="row">
              <!-- Single Item -->
              <div class="col-4 col-md-4">
                <div class="label-font">Size:</div>
                <div class="info-text text-grey q-pb-md">Large</div>
              </div>
              <!--  Single Item s -->
              <div class="col-4 col-md-4">
                <div class="label-font">Total Items</div>
                <div class="info-text text-grey q-pb-md">200</div>
              </div>
              <!--  Single Item s -->
              <div class="col-4 col-md-4">
                <div class="label-font">Brand Name</div>
                <div class="info-text text-grey q-pb-md">Gul Ahmed</div>
              </div>
            </div>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                @click="$refs.stepper.next()"
                color="primary"
                :label="step === 3 ? 'Submit' : 'Next'"
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
      step: ref(3),
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
// .q-stepper {
//   background: none;
// }
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
