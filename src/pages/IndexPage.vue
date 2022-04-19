<template>
  <q-page>
    <CarouselSection />
    <div class="container">
      <RecentProducts />
      <FeaturedProductsSection />
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, onMounted } from "vue";
import CarouselSection from "components/Home/CarouselSection.vue";
import FeaturedProductsSection from "src/components/Home/FeaturedProductsSection.vue";
import RecentProducts from "src/components/Home/Mobile/RecentProducts.vue";
import { useProductsStore } from "../stores/products.store.js";

const store = useProductsStore();

onMounted(() => {
  store.loadRecentProducts();
  store.loadFeaturedProducts();
});

// onMounted(() => )

// import { useMeta } from "quasar";

// const metaData = {
//   // sets document title
//   title: "Home",
//   titleTemplate: (title) => `${title} - 1timeused`,

//   // meta tags
//   meta: {
//     description: { name: "description", content: "Home Page" },
//     keywords: {
//       name: "keywords",
//       content: "1timeuses, sell old items , pakistan",
//     },
//     ogTitle: {
//       property: "og:title",
//       // optional; similar to titleTemplate, but allows templating with other meta properties
//       template(ogTitle) {
//         return `${ogTitle} - My Website`;
//       },
//     },
//   },
// };
// useMeta(metaData);
</script>
