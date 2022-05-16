<template>
  <div class="column">
    <div
      v-for="i in 7"
      :key="i"
      class="flex items-center"
      :style="i % 2 == 0 && 'align-self:end'"
    >
      <q-skeleton class="q-mr-sm" v-show="i % 2 != 0" bordered type="circle" />
      <q-skeleton width="200px" height="80px" />
      <q-skeleton class="q-ml-sm" v-show="i % 2 == 0" bordered type="circle" />
    </div>
  </div>
</template>
