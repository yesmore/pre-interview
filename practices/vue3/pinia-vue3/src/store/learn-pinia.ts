import {defineStore} from "pinia"

/**
 * 1.定义容器
 * 参数
 *  - 1) 容器ID，必须唯一（将来pinia会把所有的容器挂载到根容器）
 *  - 2) 选项对象
 * 返回值：一个函数，调用得到容器实例
 */
export const useMainStore = defineStore('main', {
  /**
   * state:
   * 类似组件的 data，存储全局状态
   *  - 1) 必须是函数：为了在服务端渲染的时候避免交叉请求导致的数据状态污染
   *  - 2) 必须是箭头函数：为了更好的 TS 类型推导
   */
  state: () => {
    return {
      count: 100,
      arr: [1, 2, 3]
    }
  },
  // 类似组件的 computed，用来封装计算属性，有缓存的功能
  getters: {
    // 可选参数：state状态对象
    // add10 (state) {
    //   console.log('add10 调用了');
    //   return state.count + 10
    // }

    // 注意：如果getters中使用了this，则必须手动指定返回值类型，否则类型推导不出来
    add10 ():number {
      console.log('add10 调用了');
      return this.count + 10
    }

    // 但是传入state参数也可以不用指定返回类型（你是来找茬的是吧）
    // add10 (state) {
    //   console.log('add10 调用了');
    //   return this.count + 10
    // }
  },

  // 类似组件的 methods，封装业务逻辑，修改 state
  actions: {
    // 注意：不能使用箭头函数定义action（this指向改变）
    increment() {
      this.count++
      this.arr.push(5)

      // this.$patch({})
      // this.$patch(state => {...})
    },
    incrementNum(num: number) {
      this.count += num
    }
  }
})

// 2.使用容器中的state

// 3.修改state

// 4.使用action