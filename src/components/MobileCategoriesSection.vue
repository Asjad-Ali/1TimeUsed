<template>
  <q-scroll-area :visible="false" style="height: 110px; max-width: 100%">
    <div class="row no-wrap q-my-lg q-px-md flex justify-center">
      <div v-for="(category, index) in categories" :key="index">
        <div
          class="text-center"
          :class="{ 'q-mr-lg': index != categories.length - 1 }"
        >
          <q-btn
            size="15px"
            outline
            round
            color="primary"
            :icon="category.thumbnail"
          />
          <span class="q-mt-sm"> {{ category.title }}</span>
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>

<script setup>
const categories = [
  {
    title: "Cloth",
    thumbnail: "checkroom",

    subcategories: [
      {
        thumbnail: "jewellery",
        title: "abc",
      },
      {
        thumbnail: "jewellery",
        title: "abc",
      },
      {
        thumbnail: "jewellery",
        title: "abc",
      },
    ],
  },
  {
    title: "jewellery",
    thumbnail: "diamond",
    subcategories: [],
  },
  {
    title: "Shoes",
    thumbnail: "loyalty",
    subcategories: [],
  },
  {
    title: "Watches",
    thumbnail: "watch_later",
    subcategories: [],
  },
  {
    title: "Fashion",
    thumbnail: "face",
    subcategories: [],
  },
  {
    title: "Others",
    thumbnail: "view_list",
    subcategories: [],
  },
];
</script>
