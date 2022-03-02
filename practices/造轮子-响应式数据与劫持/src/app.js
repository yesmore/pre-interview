import { useReactive } from "../reactivity/reactive";
import { useDOM } from "../reactivity/render";

function App() {
  const state = useReactive({
    count: 0,
    name: 'yesmore'
  })

  const add = (num) => {
    state.count += num
  }

  const minus = (num) => {
    state.count -= num
  }

  const changeName = (name) => {
    state.name = name
  }

  return {
    template: `<h1>{{ count }}</h1>
      <h1>{{ name }}</h1>
      <button onClick="add(2)">+</button>
      <button onClick="minus(1)">-</button>
      <button onClick="changeName('马老师')">点击召唤神龙</button>
    `,
    state,
    methods: {
      add,
      minus,
      changeName
    }
  }
}

useDOM(App(), document.getElementById('app'))