import {defineStore} from "pinia"

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      count: 100,
      arr: [1, 2, 3]
    }
  },

  getters: {
    add10 ():number {
      console.log('add10 调用了');
      return this.count + 10
    }
  },

  actions: {
    
  }
})