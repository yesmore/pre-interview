// var obj = new Proxy(target, handler);

var target = {
  a: 1,
  b: 2,
}

let proxy = new Proxy(target, {
  get(target, key) {
    return `This is property value ${target[key]}`
  },
  set(target, key, value) {
    target[key] = value
  }
})

// console.log(proxy.a);
// console.log(target.a);

// proxy.b = 3
// console.log(target);

let arr = [
  { name: 'hhh', age: 18 },
  { name: '小何', age: 28 },
  { name: '小红', age: 13 },
  { name: '小白', age: 17 },
  { name: '校长', age: 19 },
]

let persons = new Proxy(arr, {
  get(target, key) {
    return target[key]
  },
  set(target, key, value) {
    return target[key] = value
  }
})

// console.log(persons[0]);
// persons[1] = { name: '小张', age: 18 }
// console.log(persons, arr);

let fn = function () {
  console.log('this is a fn.');
}

fn.a = 123;

let newFn = new Proxy(fn, {
  get(target, key) {
    return target[key] + ' [Proxy]'
  }
})

console.log(newFn.a);