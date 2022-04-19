<template>
  <div
    class="container"
    :class="{ 'bg-primary': $q.screen.lt.md, 'bg-white': $q.screen.gt.sm }"
  >
    <div class="row border-bottom items-center">
      <div class="col col-md-4 text-center">
        <!-- <q-input
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
        </q-input> -->

        <q-select
          v-if="$q.screen.gt.sm"
          filled
          v-model="search"
          use-input
          hide-selected
          fill-input
          input-debounce="500"
          dense
          label="Search Here"
          :options="options"
          @filter="filterFn"
          @filter-abort="abortFilterFn"
          style="max-width: 100%"
          dropdown-icon="false"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>

          <template v-slot:after>
            <q-btn icon="search" size="16px" outline> </q-btn>
          </template>
        </q-select>
      </div>
      <div class="col-2 col-md-4 text-center">
        <router-link to="/">
          <img
            :src="`https://1timeused.com/assets/img/logo/${
              $q.screen.lt.md ? `logo-white` : 'logo'
            }.png`"
            alt=""
            class="brand-logo q-py-sm"
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
            @click="$router.push('/chat')"
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
            @click="$router.push('/notifications')"
          >
            <q-badge color="red" floating>100+</q-badge>
          </q-btn>
          <q-btn
            :size="$q.screen.lt.md ? 'sm' : `md`"
            class="q-mr-md"
            round
            color="primary"
            glossy
            icon="search"
            @click="$router.push('/search')"
          />

          <q-avatar class="cursor-pointer desktop-only">
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
                  <q-item-section @click="$router.push('/login')"
                    >Sign Out</q-item-section
                  >
                </q-item>
              </q-list>
            </q-menu>
          </q-avatar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const serch = ref("");

const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
const options = ref(stringOptions);

const filterFn = (val, update, abort) => {
  // call abort() at any time if you can't retrieve data somehow

  setTimeout(() => {
    update(() => {
      if (val === "") {
        options.value = stringOptions;
      } else {
        const needle = val.toLowerCase();
        options.value = stringOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      }
    });
  }, 500);

  const abortFilterFn = () => {
    // console.log('delayed filter aborted')
  };
};
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
