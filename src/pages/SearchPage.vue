<template>
  <div class="container bg-white">
    <div class="row justify-center">
      <div class="col-md-6 q-my-xl">
        <q-select
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
    </div>
    <div class="conatiner flex justify-center items-center">
      <div class="column">
        <h6 class="q-pb-md text-center">
          Results for "<span class="text-bold">a</span>"
        </h6>
        <div
          class="
            flex
            q-gutter-y-md q-gutter-x-sm q-mx-auto q-mb-lg
            justify-center
            items-center
          "
        >
          <ProductCard v-for="i in 12" :key="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "src/components/Layouts/ProductCard.vue";
export default { components: { ProductCard } };
</script>

<style lang="scss" scoped>
</style>
