<template>
  <div class="cart">
    <h2>购物车</h2>
    <p v-if="cartStore.cartProducts.length < 1">
      <i>请添加商品到购物车</i>
    </p>
    <ul>
      <li v-for="item in cartStore.cartProducts">
        {{item.title}} - {{item.price}} x [{{item.quantity}}]
      </li>
    </ul>

    <p>总价：{{ cartStore.totalPrice }}</p>
    <p>
      <button @click="cartStore.checkout">结算</button>
    </p>
    <p v-show="cartStore.checkoutStatus">
      结算{{ cartStore.checkoutStatus }}
    </p>
  </div>
</template>

<script setup lang='ts'>
import { useCartStore } from '../store/cart'

const cartStore = useCartStore()
</script>