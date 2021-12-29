var obj = {}
obj.a = 1;

var newObj = new Object(obj);
console.log(newObj === obj);

var arr = []
arr.a = 1;
console.log(arr);

var arr1 = [1, 2, 3, 4]
var newArr1 = new Object(arr1)
console.log(arr1 === newArr1);

var arr2 = [1, 2, 3, 4]
var newArr2 = new Array(arr2)
console.log(arr2 === newArr2);

var arr3 = [1, 2, 3, 4]
var newArr3 = new Array(arr3)
console.log(newArr3);

var a = 1;
a.b = 2;
console.log(a.b);

var str = '123'
str.length = 1
str.a = 'hhhh'
console.log(str.length, str.a);

var b = 1;
var newNum = new Number(b)
console.log(newNum === b);
newNum.a = 123
console.log(newNum);