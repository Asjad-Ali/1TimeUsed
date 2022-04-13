<template>
  <div class="container">
    <div class="row border-bottom items-center">
      <div class="col col-md-4 text-center">
        <q-input
          class="q-my-auto"
          dense
          outlined
          v-model="search"
          label="Search Here"
          v-if="$q.screen.gt.sm"
          style="max-width: 100%"
        >
          <template v-slot:after>
            <q-btn icon="search" size="16px" outline> </q-btn>
          </template>
        </q-input>
      </div>
      <div class="col-2 col-md-4 text-center">
        <router-link to="/">
          <img
            src="https://1timeused.com/assets/img/logo/logo.png"
            alt=""
            class="brand-logo"
          />
        </router-link>
      </div>
      <div class="col-10 col-md-4 text-center text-right">
        <div>
          <q-btn
            :size="$q.screen.lt.md ? 'sm' : `md`"
            class="q-mr-md"
            round
            color="primary"
            glossy
            icon="mail"
          >
            <q-badge color="red" floating>2</q-badge>
          </q-btn>
          <q-btn
            :size="$q.screen.lt.md ? 'sm' : `md`"
            class="q-mr-md"
            round
            color="primary"
            glossy
            icon="notifications"
          >
            <q-badge color="red" floating>100+</q-badge>
          </q-btn>
          <q-btn
            :size="$q.screen.lt.md ? 'sm' : `md`"
            class="q-mr-md"
            round
            color="primary"
            glossy
            icon="local_grocery_store"
          >
            <q-badge color="red" floating>34</q-badge>
          </q-btn>

          <q-avatar class="cursor-pointer">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
            <q-menu
              transition-show="scale"
              transition-hide="scale"
              class="gt-md"
            >
              <q-list style="min-width: 200px">
                <q-item clickable>
                  <q-item-section
                    class="flex"
                    @click="$router.push('/account')"
                  >
                    Account</q-item-section
                  >
                </q-item>
                <q-item clickable>
                  <q-item-section>Account Settings</q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section>Account Settings</q-item-section>
                </q-item>

                <q-separator />
                <q-item clickable>
                  <q-item-section>Sign Out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-avatar>
        </div>
      </div>
    </div>
  </div>

  <!-- <q-header elevated>
    <div class="glossy toolbar flex q-py-lg">
      <div class="q-mr-xl">
        <router-link to="/">
          <img
            src="https://1timeused.com/assets/img/logo/logo.png"
            style="width: 120px; padding: 5px"
        /></router-link>
      </div>

      <q-input
        input-style="width:300px"
        class="q-my-auto"
        dark
        label-color="white"
        dense
        color="white"
        outlined
        v-model="search"
        label="Search Here"
        v-if="$q.screen.gt.sm"
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
            <q-list style="min-width: 200px">
              <q-item clickable>
                <q-item-section class="flex" @click="$router.push('/account')">
                  Account</q-item-section
                >
              </q-item>
              <q-item clickable>
                <q-item-section>Account Settings</q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section>Account Settings</q-item-section>
              </q-item>

              <q-separator />
              <q-item clickable>
                <q-item-section>Sign Out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-avatar>
      </div>
    </div>
  </q-header> -->
</template>

<script setup>
import { ref } from "vue";

const serch = ref("");
</script>

<style lang="scss" scoped>
.brand-logo {
  width: 180px;
}

.q-btn {
  font-size: 1.715em;
  color: #8f8c86;
}
@media (min-width: $breakpoint-md-max) {
  .toolbar {
    padding: 0 4rem;
  }
}
@media (max-width: $breakpoint-md-max) {
  .brand-logo {
    width: 140px;
  }
}
</style>
