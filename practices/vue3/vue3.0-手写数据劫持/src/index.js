// import { reactive } from "@vue/reactivity";
import { reactive } from "./vue3/reactivity";

const state = reactive({
  name: 'yesmore',
  age: 18,
  info: {
    job: 'web',
    students: [{
      id: 1,
      name: 'yesmore'
    }, {
      id: 2,
      name: '校长'
    }]
  },
  hobby: ['eat', 'sleep', 'code']
})

state.name = '红红火火恍恍惚惚'
state.info.job = 'Ai'
state.info.students[0].name = 'yesmore'
state.info.students.push({
  id: 3,
  name: '张三'
})
console.log(state);