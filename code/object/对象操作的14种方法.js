var obj = { a: 1, b: 2 };

// var proto = Object.getPrototypeOf(obj);
// console.log(proto);
// console.log(obj.__proto__);
// console.log(Object.prototype);

// Object.setPrototypeOf(obj, { c: 3 });
// console.log(obj);

// var ext = Object.isExtensible(obj);
// console.log(ext); // true

// Object.freeze(obj); // 冻结对象
// var ext2 = Object.isExtensible(obj);
// console.log(ext2); // false

// Object.seal(obj); // 封闭对象, 不可增加, 不可删除, 可修改
// obj.c = 3
// console.log(obj);

// delete obj.a;
// console.log(obj);

// obj.b = 3
// console.log(obj);

// Object.setPrototypeOf(obj, { c: 3 });
// console.log(Object.getOwnPropertyNames(obj));

// Object.preventExtensions(obj); // 阻止对象扩展
// obj.c = 3; // 不可增加
// console.log(obj);

// delete obj.a // 可删除
// console.log(obj);

// console.log('a' in obj);
// console.log(obj.a);

for (var key in obj) {
  console.log(key);
}

Object.keys(obj)