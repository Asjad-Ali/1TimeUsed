<template>
  <div class="scroll-div">
    <div
      class="
        user
        q-pa-sm
        flex
        cursor-pointer
        items-center
        border-bottom
        bg-grey-3
      "
      v-for="conversation in conversations"
      :key="conversation.id"
    >
      <q-avatar class="q-mr-md">
        <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>
      <div class="text-h6 ellipsis">Asif Ali</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs } from "vue";
const imageBaseURL = process.env.imagesBaseURL;
const props = defineProps({
  conversations: Array,
});
const { conversations } = toRefs(props);
</script>


<style lang="scss" scoped>
.scroll-div {
  height: 80vh;
  overflow: auto;
}
.scroll-div::-webkit-scrollbar {
  width: 5px;
}

.scroll-div::-webkit-scrollbar-thumb {
  background: #bbb;
  border-radius: 10px;
}
.text-h6 {
  font-size: 14px;
}
.users {
  &:hover {
    background: #eeeeee !important;
  }
}
</style>

