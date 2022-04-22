<template>
  <div class="container">
    <div class="relative-position">
      <div class="q-pa-md row items-start q-gutter-md justify-center">
        <q-card
          class="my-card"
          flat
          bordered
          style="width: 100%; max-width: 410px"
          v-for="i in 9"
          :key="i"
        >
          <q-card-section horizontal>
            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="https://cdn.quasar.dev/img/parallax2.jpg"
              />
            </q-card-section>
            <q-card-section>
              <div class="text-h6 q-mt-md ellipsis" style="font-size: 12px">
                Real me Model cy21caaa
              </div>
              <div class="text-caption text-grey ellipsis">Rs:18000</div>
              <div class="q-my-sm text-right">
                <q-btn
                  size="sm"
                  color="primary"
                  label="Activate"
                  @click="small = true"
                />
              </div>

              <div class="flex justify-between">
                <div class="text-caption text-grey ellipsis">Sanda Road</div>
                <div class="text-caption text-grey ellipsis">7 April</div>
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
      </div>
    </div>
    <!-- Add Button -->
    <div class="add-button">
      <q-btn
        round
        color="primary"
        glossy
        icon="add"
        @click="$router.push('/add_product')"
      />
    </div>
  </div>
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
<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      alert: ref(false),
      shape: ref("line"),
      small: ref(false),
      medium: ref(false),
      fullWidth: ref(false),
      fullHeight: ref(false),
    };
  },
};
</script>

<style  lang="scss" scoped>
.add-button {
  position: absolute;
  position: fixed;
  right: 20px;
  bottom: 10%;
}
</style>



