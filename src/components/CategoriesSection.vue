<template>
  <section class="flex justify-center items-center categories">
    <ul class="flex justify-center" style="width: 100%">
      <li
        v-for="(category, index) in categories"
        :key="index"
        class="q-mr-xl q-mb-md"
      >
        <a href="#"
          >{{ category.title }}
          <q-icon name="expand_more" />

          <q-menu transition-show="scale" transition-hide="scale">
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section>Having fun</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Crazy for transitions</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Mind blown</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </a>
      </li>
    </ul>
  </section>
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
<style scoped lang="scss">
.categories {
  background: #fff;
  ul {
    li {
      a {
        text-decoration: none;
        font-size: 17px;
        border: 1px solid #b03254;
        padding: 5px 15px;
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
