## new一个构造函数过程中发生了什么

> 红宝书：
>
> 要创建 Person 的实例，应使用 new 操作符。以这种方式调用 [构造函数](https://github.com/yesmore/pre-interview/blob/main/src/04_%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0.md) 会执行如下操作：
>
> (1) 在内存中创建一个新对象
>
> (2) 这个新对象内部的 [ [Prototype] ] 特性被赋值为构造函数的 prototype属性。
>
> (3) 构造函数内部的 **this** 被赋值为这个新对象（即 this 指向新对象）
>
> (4) 执行构造函数内部的代码（给新对象添加属性）。
>
> (5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

### 在创建一个实例对象的时候 new关键字都起到了哪些作用呢？

在没有学习原型之前 我们可以这么给出定义——

- 创建一个 类（或者模拟类 比如说**构造函数**）的实例对象

之前学Java面向对象的时候 并没有在这里想太多 就是知道 new一个对象嘛~创建出来的实例对象继承了父类的所有属性与方法 就这些🤔

那么在JavaScript中 情况有些不同，尤其是学过原型之后 我们知道 JS中的new关键字还背负着一些使命。

这里涉及了原型、this指向、作用域、函数return的知识。

举个例子来把内容串起来：

```js
 function Person(name, age){
   this.name = name;
   this.age = age;
 }
 Person.prototype.getName = function(){
   console.log(this);//
   return this.name;// 通过this调用新创建的对象实例中的属性
 };
 
 var person = new Person("bill",21);
 console.log(person.name,person.age);// bill 21
 person.getName();//"bill"

```

用伪代码模拟下上述过程的执行过程：

```js
var person = new Person("bill",21);
```

```js
new Person('bill',21) = {
  // 01 新建空对象实例
  var person = {};
  // 02 将构造函数的原型绑定到新创的对象实例上
  person.__proto__ = Person.prototype;
  // 03 调用构造函数并获得返回值res
  var res = Person.call(person, 'bill', 21);
  // 04 判断构造函数的返回值类型，如果res为对象类型，new Person的最终结果为res 而非我们想要的那个实例对象person！
  let isObject = typeof res === 'object' && res !== null;//判断res是否为对象
  // 额外注意 typeof null = object 
  let isFunction = typeof res === 'function';
  // 05 如果构造函数的返回值为对象类型
  //（比如{text: 'fake~'}），则调用new Person('bill', 21)会返回{text: 'fake~'}.
  // 如果返回值不是对象类型就返回之前新建的实例对象person
  return isObject || isFunction ? res : person;
 }

```

> 关于步骤04，详见 [构造函数的返回值](https://github.com/yesmore/pre-interview/blob/main/src/04_%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0.md#%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0%E7%9A%84%E8%BF%94%E5%9B%9E%E5%80%BC)

来拆分开看看

1）创建了一个新的空对象 `{}`

```js
var person = {};
```

2）将新对象的 `__proto__` 指向构造函数的 `prototype` 属性

- 也就是设置这个对象原型指向构造函数

```js
person.__proto__ = Person.prototype;
```

这里还可以像下面一样写，效果相同的。

```js
person.__proto__ = Object.create(Person.prototype);
Object.setPrototypeOf(person, Person.prototype);
```

3）将构造函数的作用域赋值给新对象（this指向新创建的对象实例person）

> 这里注意`Person.call(person, args)`会为这个新对象person添加属性(同时this会指向新创建的对象)
>
> 另外返回值res为构造函数的返回值（因为这个过程相当于调用构造函数~）

```js
var res = Person.call(person, 'bill', 21);
```

4）返回新对象（这里注意 如果构造函数中return一个对象 那么会返回return的内容 而不是创建的这个对象）

```js
return res;
```

截至此处 new关键字的工作就完成了



> 关于 new 的必需的前置知识：[原型链]()

