<template>
  <div class="container">
    <div class="row q-mb-lg">
      <div
        class="col-6 col-md-2"
        v-for="(category, index) in categories"
        :key="index"
      >
        <q-card
          @click="subcategoryPage(category.title)"
          class="q-ma-sm cursor-pointer"
        >
          <div class="w-100 flex justify-center q-py-lg">
            <!-- <q-icon :name="category.thumbnail" color="primary" size="4.4em" /> -->
            <img :src="`${imageBaseURL}${category.thumbnail}`" alt="product" />
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
import { computed, onMounted } from "@vue/runtime-core";
import { useCategoryStore } from "src/stores/categories.store";
import { useRouter } from "vue-router";

const router = useRouter();

const imageBaseURL = process.env.imagesBaseURL;
const store = useCategoryStore();

onMounted(() => {
  store.loadCategories();
});

const subcategoryPage = (title) => {
  router.push({ path: `/subcategory/${title}` });
  store.loadSubCategory(title);
};

const categories = computed(() => store.categories);
</script>
