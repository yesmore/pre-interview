const arr = [1, , , 2, 3, , , 4, , , , , , , 5, 6, 7, , , 8]

arr.find(item => {
  console.log('find: ' + item);
})

arr.forEach(item => {
  console.log('forEach: ' + item);
})

const item = arr.find((item, index) => {
  return index === 1
})
console.log(item);

var obj3 = {
  a: 0,
  b: 1,
  C: 2
}

var newArr1 = Array.from(obj3)
console.log(newArr1);