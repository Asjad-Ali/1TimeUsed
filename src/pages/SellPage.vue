<template>
  <div class="relative-position">
    <div class="container">
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
                <q-btn size="sm" color="primary" label="Activate" />
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
            color="primary"
            icon="favorite_border"
            class="absolute"
            style="top: 5px; right: 10px"
          />
        </q-card>
      </div>
    </div>
    <div class="add-button">
      <q-btn round color="primary" glossy icon="add" />
    </div>
  </div>
</template>
<style  lang="scss" scoped>
.add-button {
  position: absolute;
  position: fixed;
  right: 50px;
  bottom: 40px;
}
</style>



