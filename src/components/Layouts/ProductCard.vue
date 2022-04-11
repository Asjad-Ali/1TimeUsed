<template>
  <q-card class="my-card">
    <q-img
      src="https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
    />

    <q-card-section>
      <q-btn
        fab
        color="primary"
        icon="favorite_border"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />

      <div class="row no-wrap items-center">
        <div class="col text-h6 ellipsis">Realme c21y</div>
        <div
          class="
            col-auto
            text-grey text-caption
            q-pt-md
            row
            no-wrap
            items-center
          "
        >
          <q-icon name="place" />
          Sanda Road
        </div>
      </div>

      <q-rating v-model="stars" :max="5" size="32px" />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-subtitle1">RS. 20,000</div>
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn flat round icon="event" />
      <q-btn flat color="primary"> 8 April</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      stars: ref(4),
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
