<template>
  <div class="container">
    <div class="row q-mb-lg">
      <div
        class="col-6 col-md-2"
        v-for="(category, index) in categories"
        :key="index"
      >
        <q-card
          @click="$router.push('/subcategory')"
          class="q-ma-sm cursor-pointer"
        >
          <div class="w-100 flex justify-center q-py-lg">
            <q-icon :name="category.thumbnail" color="primary" size="4.4em" />
          </div>

          <q-card-section style="padding: 0px">
            <q-btn
              color="primary"
              :label="category.title"
              class="w-100"
              size="sm"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
const categories = [
  {
    title: "Cloth",
    thumbnail: "checkroom",
    subcategories: [],
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


