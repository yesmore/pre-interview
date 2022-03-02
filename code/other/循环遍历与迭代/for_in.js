var arr = [1, 2, 3, 4, 5];

for (var i = 0; i < arr.length; i++) {
  // console.log(i, arr[i]); // 重复执行
}


// for in

arr.forEach(function (item, index, arr) {
  // console.log(index, item, arr);
})

var obj = {
  a: 1,
  b: 2,
  c: 3,
}
for (var key in obj) {
  // console.log(key, obj[key]);
}


for (var key in arr) {
  // console.log(key, arr[key]);
}

var m = new Map([
  [{
    a: 1
  }, 1],
  [{
    b: 2
  }, 2],
  [{
    c: 3
  }, 3]
]);
for (let key in m) {
  console.log(key);
}

var s = new Set([1, 2, 3]);
for (let key in s) {
  console.log(key);
}