<template>
  <ul>
    <li v-for="item in productsStore.all">
      {{item.title}} - {{item.price}}
      <br>
      <button 
        :disabled="!item.inventory"
        @click="cartStore.addProductToCart(item)"
      >
        加入购物车
      </button>
    </li>
  </ul>
</template>

<script setup lang='ts'>
import { useProductsStore } from '../store/products';
import { useCartStore } from '../store/cart'

const productsStore = useProductsStore()
const cartStore = useCartStore()

// 加载所有数据
productsStore.loadAllProducts()
</script>
