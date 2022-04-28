<template>
  <div class="bg-white">
    <div class="container bg-primary row border-bottom items-center" style="height:60px; width:100%">

      <q-icon @click="$router.back()" name="keyboard_backspace" size="2rem" color="white" />

      <span class="text-weight-medium text-h6 text-white q-mx-auto" style="text-transform: capitalize;">{{
        $route.path.includes('/subcategory/') ?
          $route.params.name : $route.path.split('/')[1]
      }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
