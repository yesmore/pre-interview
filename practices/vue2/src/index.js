import Vue from '../vue'

let vm = new Vue({
  el: '#vue',
  data() {
    return {
      title: '学生列表',
      classNum: 1,
      teacher: ['张三', '李四'],
      info: {
        a: {
          b: 1
        }
      },
      students: [{
          id: 1,
          name: '小红'
        },
        {
          id: 2,
          name: '小明'
        }
      ],
    }
  }
})

// console.log(vm.title, vm._data.title);
console.log(vm.info.a);
// console.log(vm);