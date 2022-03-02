// 构造函数
function Foo() {
  // 全局变量赋值
  // 若Foo没有执行，下面的赋值不会进行（覆盖）
  getName = function () {
    console.log(1);
  }
  // 直接执行Foo，this -> window
  // new Foo， this -> Foo object
  console.log(this);
  return this // window
}

// 函数Foo的静态方法 -> 函数对象上的方法/属性
Foo.getName = function () {
  console.log(2);
  console.log(this); // 指向实例化的新对象 或 谁调用该方法，就指向谁
}

// 扩展函数原型上的方法
// 调用：var foo = new Foo(); -> foo.getName
// 或 new Foo.getName
Foo.prototype.getName = function () {
  console.log(3);
}

// 给全局变量赋值为一个匿名函数
// GO {}
/**
 * 全局预编译
 * GO {
 *   getName: undefined -> 
 *   function getName () {} ->
 *   function () { console.log(4); } 
 * }
 */
var getName = function () {
  console.log(4);
}

// 函数声明
function getName() {
  console.log(5);
}

Foo.getName() // 2
getName() // 5 -> 4   this => window

// Foo() -> this -> window -> window.getName() 重新赋值成 1
Foo().getName(); // 5 -> 1

getName(); // 1 被重新赋值了: window.getName() = 1 => getName() = 1

// Foo.getName() -> 2 ; this -> {}
new Foo.getName(); // 2

new Foo().getName() // 3
new new Foo().getName() // 3

new new Foo()