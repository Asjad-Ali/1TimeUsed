<template>
  <div class="write-message q-px-lg">
    <q-input outlined v-model="messageValue" filled label="Write Message" />
  </div>
</template>

<script setup>
import { ref } from "vue";
const messageValue = ref("");
</script>

<style lang="scss" scoped>
.write-message {
  position: absolute;
  bottom: 0px;
  width: 100%;
  z-index: 1;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #fff;
}
</style>
