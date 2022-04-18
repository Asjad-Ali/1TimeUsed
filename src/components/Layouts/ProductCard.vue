
<template>
  <q-card
    class="product-card cursor-pointer"
    @click="$router.push('/product_details')"
  >
    <q-img
      src="https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
    />

    <q-card-section>
      <q-btn
        round
        size="sm"
        color="primary"
        icon="favorite_border"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%)"
      />

      <p class="ellipsis text-subtitle2">Realme 2 city</p>
      <p class="prise text-center">RS:22000</p>

      <div class="flex justify-between">
        <small class="q-mr-sm"> lahore pakistan </small>
        <small> 12 april </small>
      </div>
    </q-card-section>
  </q-card>
</template>

