const test1 = {
  a: 1,
  b: 2
}

const test2 = {
  b: 3,
  c: 4
}

const test3 = {
  c: 5,
  d: 6
}

const test4 = Object.assign(test1, test2, test3)

console.log(test1)
console.log(test2)
console.log(test3)
console.log(test4)

test4.d = 100
console.log(test1, test4)