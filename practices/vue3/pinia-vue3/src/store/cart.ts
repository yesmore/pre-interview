import { defineStore } from "pinia"
import { buyProducts, IProduct } from "../api/shop";
import { useProductsStore } from "./products"

// 合并一个购物车新接口，添加一个quantity属性，并去除inventory属性
type CartProduct = {
  quantity: number
} & Omit<IProduct, 'inventory'>

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      cartProducts: [] as CartProduct[], // 购物车商品
      checkoutStatus: null as null | string
    }
  },

  getters: {
    totalPrice(state) {
      return state.cartProducts.reduce((total, item) => {
        return total + item.price * item.quantity
      }, 0)
    }
  },

  actions: {
    addProductToCart (product: IProduct) {
      // 1.检查库存
      if (product.inventory < 1) {
        return;
      }
      // 2.检查购物车是否含有当前待添加商品
      const cartItem = this.cartProducts.find(item => item.id === product.id)
      if(cartItem) {
        // 3.有则库存加一
        cartItem.quantity++
      } else {
        // 4.没有则新添
        this.cartProducts.push({
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1
        })
      }
      // 5.更新商品库存(原始数据)
      // 不要这样做（不要相信函数的参数）
      // product.inventory--
      // 正确做法：
      const productStore = useProductsStore()
      productStore.decrementProduct(product)
    },

    async checkout () {
      const res = await buyProducts()
      this.checkoutStatus = res ? '成功' : '失败'
    }
  }
})