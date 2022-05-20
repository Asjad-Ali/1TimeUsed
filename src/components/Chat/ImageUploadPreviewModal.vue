<template>
  <!-- Modal -->
  <q-dialog v-model="open">
    <q-card class="modal-card">
      <q-card-section class="q-pa-xs">
        <div class="img-holder">
          <img :src="imagePath" alt="" />
        </div>
      </q-card-section>

      <q-card-section class="q-pa-xs" v-if="progress > 0">
        <q-linear-progress size="25px" :value="progress / 100" color="accent">
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="accent"
              :label="`${progress}%`"
            />
          </div>
        </q-linear-progress>
      </q-card-section>

      <q-card-actions align="center" class="q-gutter-md q-mb-sm">
        <q-btn
          size="sm"
          color="red"
          label="Cancel"
          icon="close"
          @click="$emit('cancelImageUpload', true)"
        />

        <q-btn
          size="sm"
          @click="$emit('sendImage', true)"
          color="positive"
          label="Send"
          icon-right="send"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  imagePath: String,
  open: Boolean,
  progress: {
    type: Number,
    default: 0,
  },
});

const { imagePath, open } = toRefs(props);
</script>

<style lang="scss" scoped>
.img-holder {
  max-width: 310px;
  max-height: 310px;
}

.img-holder > img {
  height: 100%;
  width: 100%;
}
</style>
