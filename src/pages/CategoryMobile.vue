<template>
  <div class="container">
    <div class="desktop-only">
      <h1>Categories</h1>
    </div>
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
<style lang="scss" scoped>
h1 {
  font-size: 3rem;
  font-weight: 400;
  line-height: 6rem;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: row;
}

h1:before,
h1:after {
  content: "";
  flex: 1 1;
  border-bottom: 1px solid;
  margin: auto;
}
h1:before {
  margin-right: 10px;
}
h1:after {
  margin-left: 10px;
}
</style>
