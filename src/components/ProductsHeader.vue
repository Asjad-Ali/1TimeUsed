<template>
  <div class="border-bottom">
    <div class="row flex justify-between items-center">
      <div class="col text-center border-right">
        <q-icon
          name="format_list_bulleted"
          @click="$emit('toggleViewType', 'tile')"
          :size="$q.screen.lt.md ? 'sm' : `md`"
          :color="viewType != 'grid' ? 'primary' : 'black'"
          class="icons"
        />
      </div>
      <div class="col text-center border-right">
        <q-icon
          :color="viewType == 'grid' ? 'primary' : 'black'"
          @click="$emit('toggleViewType', 'grid')"
          name="grid_view"
          :size="$q.screen.lt.md ? 'sm' : `md`"
          class="icons"
        />
      </div>
      <div
        @click="sortModal = true"
        class="col text-center border-right cursor-pointer"
      >
        <q-icon
          name="filter_list"
          :size="$q.screen.lt.md ? 'sm' : `md`"
          class="icons"
        />
        <span>Sort By</span>
      </div>
      <div class="col text-center">
        <q-icon
          name="filter_alt"
          :size="$q.screen.lt.md ? 'sm' : `md`"
          class="icons"
        />
        <span>Filter</span>
      </div>
    </div>
  </div>

  <!-- Sort by Modal -->
  <q-dialog v-model="sortModal">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6 text-center">Sort By</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="flex items-center justify-between">
          <p>Newest First</p>
          <q-radio v-model="sort" val="newest" />
        </div>
        <div class="flex items-center justify-between">
          <p>Oldest First</p>
          <q-radio v-model="sort" val="oldest" />
        </div>
        <div class="flex items-center justify-between">
          <p>Price Low to High</p>
          <q-radio v-model="sort" val="price<" />
        </div>
        <div class="flex items-center justify-between">
          <p>Price High to Low</p>
          <q-radio v-model="sort" val="price>" />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- Sort by Modal End -->
</template>
<script setup>
import { ref, toRefs } from "@vue/reactivity";

const props = defineProps({
  viewType: {
    type: String,
    default: "grid",
  },
});
const { viewType } = toRefs(props);
const sortModal = ref(false);
const sort = ref("newest");
</script>

<style lang="scss" scoped>
.icons {
  cursor: pointer;
  padding: 5px 0px;
}
span {
  color: rgb(78, 78, 78);
}

.border-right {
  border-right: 1px solid #dcdcdc;
}
.border-bottom {
  border-bottom: 1px solid #dcdcdc;
}
</style>
