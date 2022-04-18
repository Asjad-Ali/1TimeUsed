<template>
  <div class="container">
    <div class="row justify-between items-center">
      <div class="col-md-10 col-6">
        <h1 class="app-page-title">Notifications</h1>
      </div>
      <div class="col-md-2 col-6">
        <q-select
          dense
          outlined
          v-model="model"
          :options="options"
          label="This Week"
        />
      </div>
    </div>
    <!-- Notifications Card  -->
    <div
      class="q-pa-lg bg-white border-bottom osahan-post-header q-mb-md"
      v-for="i in 12"
      :key="i"
    >
      <div class="row flex items-center">
        <div class="col cursor-pointer">
          <div class="dropdown-list-image">
            <img
              class="rounded-circle"
              src="https://api.dex.proelean.com/uploads/user_snaps/448516476083905.png"
              alt=""
            />
          </div>
        </div>
        <div class="col-md-9 col-5 cursor-pointer">
          <div class="text-weight-bold">Asjad Ali Watto</div>
        </div>
        <div class="col ml-auto flex items-center">
          <small class="text-grey q-mr-lg">5 days ago</small>
          <div>
            <q-icon
              name="delete"
              color="primary"
              size="sm"
              class="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div class="row cursor-pointer">
        <div class="col-10 q-pa-md">
          <div class="text-grey" style="word-break: break-word">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            repudiandae, distinctio esse nobis consequatur officiis consequuntur
            officia totam hic ad alias, obcaecati harum perspiciatis nulla eos
            atque sed doloribus minus!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      model: ref(null),
      options: ["Last Week", "Last Month", "Last 6 Months", "Last Year", "All"],
    };
  },
};
</script>

<style lang="scss" scoped>
.app-page-title {
  font-size: 1.5rem;
}
.dropdown-list-image img {
  height: 2.5rem;
  width: 2.5rem;
}
.rounded-circle {
  border-radius: 50% !important;
}
</style>
