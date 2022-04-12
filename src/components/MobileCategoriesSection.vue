<template>
  <q-scroll-area :visible="false" style="height: 130px; max-width: 100%">
    <div class="row no-wrap q-my-lg q-px-md">
      <div v-for="(category, index) in categories" :key="index">
        <div
          class="column justify-center"
          :class="{ 'q-mr-lg': index != categories.length - 1 }"
        >
          <q-btn outline round color="primary" icon="card_giftcard" />
          <span class="q-mt-sm">{{ category.title }}</span>
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>

<script setup>
const categories = [
  {
    title: "Cloth",
    thumbnail: "",
    subcategories: [],
  },
  {
    title: "Jewellery",
    thumbnail: "",
    subcategories: [],
  },
  {
    title: "Shoes",
    thumbnail: "",
    subcategories: [],
  },
  {
    title: "Watches",
    thumbnail: "",
    subcategories: [],
  },
  {
    title: "Fashion",
    thumbnail: "",
    subcategories: [],
  },
  {
    title: "Others",
    thumbnail: "",
    subcategories: [],
  },
];
</script>
