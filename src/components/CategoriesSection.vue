<template>
  <section class="flex justify-center items-center categories">
    <ul class="flex justify-center q-my-xs" style="width: 100%">
      <li v-for="category in categories" :key="category">
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
        padding: 10px 10px;
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
