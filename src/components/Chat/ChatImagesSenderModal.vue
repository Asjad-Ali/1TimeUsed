<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Close Icon" color="primary" @click="icon = true" />

    <!-- Modal -->
    <q-dialog v-model="icon">
      <q-card>
        <q-card-section class="row items-center q-pa-xs">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-xs">
          <div class="img-holder">
            <img src="https://www.w3schools.com/w3images/avatar2.png" alt="" />
          </div>
        </q-card-section>
        <q-card-actions align="center" class="q-gutter-md">
          <q-btn size="sm" color="red" label="Cancel" />
          <q-btn size="sm" color="green" label="Send" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      icon: ref(false),
    };
  },
};
</script>
