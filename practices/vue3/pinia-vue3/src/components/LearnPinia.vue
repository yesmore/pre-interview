<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '../store'

const mainStore = useMainStore()

const handleChangeState = () => {
  // 修改数据方式一
  // mainStore.count++

  // 修改数据方式二：批量修改
  // mainStore.$patch({
  //   count: mainStore.count + 1,
  //   // arr: mainStore.arr.push()
  //   arr: [...mainStore.arr, 4] // new state
  // })

  // 修改数据方式三：批量更新
  // mainStore.$patch(state => {
  //   state.count++
  //   state.arr.push(4)
  // })

  // 方式四：封装到 action 处理
  // mainStore.increment()
  // mainStore.incrementNum(100)
}

// 关于解构问题
// const { count } = mainStore
// 注意：这样解构写法是有问题的，因为这样拿到的数据不是响应式的，是一次性的
//       Pinia 把state数据都做了 reactive 处理

// 正确写法：
const { count, arr } = storeToRefs(mainStore)
console.log(count.value);
</script>

<template>
 <p>{{ mainStore.count }}</p>
 <p>{{ count }}</p>
 <p>{{ arr }}</p>
 <button @click="handleChangeState">修改数据</button>

 <!-- gitter -->
 <!-- 调用两次，只执行了一次 -->
 <p>{{ mainStore.add10 }}</p>
 <p>{{ mainStore.add10 }}</p>

</template>

<style scoped>

</style>
