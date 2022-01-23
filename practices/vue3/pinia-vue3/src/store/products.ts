import { defineStore } from "pinia"
import { getProducts, IProduct } from "../api/shop";

export const useProductsStore = defineStore('products', {
  state: () => {
    return {
      all: [] as IProduct[] // 所有商品
    }
  },

  getters: {
    
  },

  actions: {
    // 调用接口
    async loadAllProducts () {
      const res = await getProducts();
      this.all = res
    },
    // 减库存
    decrementProduct(product: IProduct): void {
      const res = this.all.find(item => item.id === product.id)
      if (res) {
        res.inventory--
      }
    }
  }
})