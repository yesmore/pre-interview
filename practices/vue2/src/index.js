import Vue from '../vue'

let vm = new Vue({
  el: '#vue',
  data() {
    return {
      title: '学生列表',
      classNum: 1,
      teacher: ['张三', '李四'],
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