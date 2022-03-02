<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/LearnPinia.vue'
import ProductList from './components/ProductList.vue'
import ShoppingCart from './components/ShoppingCart.vue'
</script>

<template>
  <h1>Pinia购物车示例</h1>
  <h2>商品列表</h2>
  <ProductList />
  <hr>
  <ShoppingCart/>
</template>
