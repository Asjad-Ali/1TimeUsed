<template>
  <section class="flex justify-center items-center categories">
    <ul class="flex justify-center q-my-xs" style="width: 100%">
      <li v-for="category in categories" :key="category">
        <a href="#" :id="`catMenu_${category.id}`"
          >{{ category.title }}
          <q-icon name="expand_more" />

          <q-menu transition-show="scale" transition-hide="scale">
            <q-list style="min-width: 100px">
              <q-item
                clickable
                v-for="subcategory in category.subcategories"
                :key="subcategory.id"
              >
                <q-item-section @click="subCategoryProduct(subcategory.id)">{{
                  subcategory.title
                }}</q-item-section>
              </q-item>

              <q-separator />
            </q-list>
          </q-menu>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed, onMounted } from "@vue/runtime-core";
import { useCategoryStore } from "src/stores/categories.store.js";
import { useProductStore } from "src/stores/products.store";
import { useRouter } from "vue-router";

const store = useCategoryStore();
const productStore = useProductStore();
const router = useRouter();
onMounted(() => {
  store.loadCategories();
});

const toggleMenu = (categoryID) => {
  const menu = document.querySelector(`#catMenu_${categoryID}`);
  menu.click();
};
const categories = computed(() => store.categories);
const subCategoryProduct = (id) => {
  router.push(`/subcategory-product/${id}`);
};
</script>
<style scoped lang="scss">
.categories {
  background: #fff;

  ul {
    li {
      a {
        padding: 5px 10px;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #25262a;
        font-size: 15px;
        text-decoration: none !important;
      }
      a {
        &:hover {
          background: #b03254;
          color: #fff;
          transition: all 0.5s;
        }
      }
      list-style: none;
    }
  }
}
</style>
