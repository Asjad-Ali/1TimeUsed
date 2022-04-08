<template>
  <q-header elevated>
    <div class="glossy toolbar flex">
      <div class="q-mr-xl">
        <img
          src="https://1timeused.com/assets/img/logo/logo-white.png"
          style="width: 120px; padding: 5px"
        />
      </div>

      <q-input
        input-style="width:200px"
        class="q-my-auto"
        dark
        label-color="white"
        dense
        color="white"
        outlined
        v-model="search"
        label="Rounded outlined"
      >
        <template v-slot:after>
          <q-btn icon="search" size="16px" outline> </q-btn>
        </template>
      </q-input>

      <q-space />

      <div>
        <q-btn flat round dense size="md" icon="chat_bubble" class="q-mr-sm" />
        <q-btn
          flat
          round
          dense
          size="md"
          icon="notifications"
          class="q-mr-sm"
        />

        <q-btn flat round dense size="md" icon="search" class="q-mr-sm" />

        <q-avatar class="cursor-pointer">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
          <q-menu transition-show="scale" transition-hide="scale" class="gt-md">
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section>Having fun</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Crazy for transitions</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Mind blown</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </div>
    </div>
  </q-header>
</template>

<script setup>
import { ref } from "vue";

const serch = ref("");
</script>

<style lang="scss" scoped>
@media (min-width: $breakpoint-md-max) {
  .toolbar {
    padding: 0 4rem;
  }
}
</style>
