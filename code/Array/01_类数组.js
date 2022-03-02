// Array.from es6

var obj = {
  0: 1,
  1: 2,
  2: 3,
  // length: 4
  push: [].push
};

// length 决定了 Array.from 最终返回的新数组长度，需要剪裁掉或补齐

// var newArr = Array.from(obj);
// console.log(newArr);

obj.push(4);
console.log(obj);