# （零）面试题

## 如何理解生命周



## 如何进行非父子组件通信



## Vue响应式原理

- 数据改变，界面同时更新

![Vue响应式原理](C:\Users\86136\Desktop\repository\notes\13-Vue\images\Vue响应式原理.jpg)

#### 问题1：app.message修改数据，Vue内部是如何监听message数据的改变

- Object.defineProperty：监听对象改变

#### 问题2：当数据改变，Vue是如何知道要通知哪些人，界面发送刷新

- 发布订阅者模式











----

# （一）ES6补充

## 1.1块级作用域

​	ES6之前没有块级作用域，ES5的var没有块级作用域的概念，只有function有作用域的概念，**ES6的let、const引入了块级作用域**。

​	ES5之前if和for都没有作用域，所以很多时候需要使用function的作用域，比如闭包。

### 1.1.1	什么是变量作用域

​	变量在什么范围内可用，类似Java的全局变量和局部变量的概念，全局变量，全局都可用，局部变量只在范围内可用。ES5之前的var是没有块级作用域的概念，使用var声明的变量就是全局的。

```js
{
	var name = 'zzz';
	console.log(name);
}
console.log(name);
```

​	上述代码中{}外的`console.log(name)`**可以**获取到name值并打印出来，用var声明赋值的变量是全局变量，没有块级作用域。

### 1.1.2	没有块级作用域造成的问题

#### 	if块级

```javascript
var func;
if(true){
	var name = 'zzz';
	func = function (){
		console.log(name);
	}
	func();
}
name = 'ttt';
func();
console.log(name);
```

​	代码输出结果为`'zzz','ttt','ttt'`，第一次调用func()，此时name=‘zzz’，在if块外将name置成‘ttt’，此时生效了，if没有块级作用域。

#### for块级

​	定义五个按钮，增加事件，点击哪个按钮打印“第哪个按钮被点击了”。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>块级作用域</title>
</head>
<body>
  <button>按钮1</button>
  <button>按钮2</button>
  <button>按钮3</button>
  <button>按钮4</button>
  <button>按钮5</button>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js">    </script>
    <script>
      // 3.没有块级作用域引起的问题:for块级
      var btns = document.getElementsByTagName("button");
      for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click',function (param) {
        console.log("第"+i+"个按钮被点击了");
        });
      }
    </script>
</body>
</html>
```

​	for块级中使用`var`声明变量i时，是全局变量，点击任意按钮结果都是“第五个按钮被点击了”。

​	**即每一次看似在for块级里面声明的 i ，其实都是全局作用域的 i ，循环到最后一次，前面的i被覆盖，于是全局作用域 i=5 ，不管点击任何按钮都是最后一个。**

​	说明在执行`btns[i].addEventListener('click',function())`时，for块级循环已经走完，此时`i=5`，所有添加的事件的i都是5。

​	改造上述代码，将for循环改造，由于**函数有作用域**，使用闭包能解决上述问题。

```javascript
      // 使用闭包,函数有作用域
      for (var i = 0; i < btns.length; i++) {
        (function (i) {
          btns[i].addEventListener('click',function (param) {
            console.log("第"+i+"个按钮被点击了");
          })
        })(i);
      }
```

​	结果如图所示，借用函数的作用域解决块级作用域的问题，因为有块级作用域，每次添加的i都是当前i。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\1.1.2-1.png)

​	在ES6中使用let/const解决块级作用域问题，let和const有块级作用域，const定义常量，在for块级中**使用let解决块级作用域问题**。

```javascript
      // ES6使用let/const
      const btns = document.getElementsByTagName("button");
      for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click',function (param) {
          console.log("第"+i+"个按钮被点击了");
        })
      }
```

​	结果和使用闭包解决一致。

## 1.2	const的使用

- const用来定义常量，赋值后不能再赋值，再次赋值会报错。

```javascript
    <script>
        //1.定义常量，赋值后不能再赋值，在赋值报错
        const count = 1
        // count = 2
    </script>
```

- const不能只声明不赋值，会报错。

```javascript
    <script>
        //2.只声明不赋值，必须赋值
        // const count;
    </script>
```

- const常量含义是你不能改变其指向的对象，例如user，但是你**可以改变user（对象内部的）属性。**

```javascript
    <script>
        //3.常量的含义是你不能改变其指向的对象user，但是你可以改变user属性
        const user = {
            name:"zzz",
            age:24,
            height:175
        }
        console.log(user)
        user.name = "ttt"
        user.age = 22
        user.height = 188
        console.log(user)
    </script>
```

- **const内存地址详解**

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\1.2-1.png)

​	对象count一开始只想0x10的地址，直接将count（给count重新赋值，指向一个新的对象）指向地址改为0x20会报错，const是常量，无法更改对象地址。

​	对象user一开始指向0x10地址，user有`Name`、`Age`、`Height`三个属性，此时修改属性`Name='ttt'`，user对象的地址未改变，不会报错。

## 1.3	ES6的增强写法

### 1.3.1	ES6的对象属性增强型写法

- ES6以前定义一个对象

```javascript
const name = "zzz";
const age = 18;
const user = {
  name:name,
  age:age
}
console.log(user);
```

- ES6写法

```javascript
const name = "zzz";
const age = 18;
const user = {
	name,age
}
console.log(user);
```

### 1.3.2	ES6对象的函数增强型写法

- ES6之前对象内定义函数

```javascript
const obj = {
  run:function(){
     console.log("奔跑");
  }
}
```

- ES6写法

```javascript
const obj = {
  run(){
     console.log("奔跑");
  }
}
```



## 1.4	箭头函数

### 认识箭头函数

> 传统定义函数的方式

```javascript
  const aaa = function (param) {
      
  }
```

> 对象字面量中定义函数

```javascript
const obj = {
    bbb (param) {  },
}
```

> ES6中的箭头函数

```javascript
//const ccc = (参数列表) => {}
  const ccc = () => {}
```



### 箭头函数的参数和返回值

#### 参数问题

> 1.放入两个参数

```javascript
const sum = (num1,num2) => {
    return num1 + num2 
}
```

> 2.放入一个参数,()可以省略

```javascript
const power = num => {
  return num * num
}
```

#### 函数内部

> 1.函数中代码块中有多行代码

```javascript
const test = () =>{
  console.log("hello zzz")
  console.log("hello vue")
}
```

> 2.函数代码块中只有一行代码，可以省略return

```javascript
// const mul = (num1,num2) => {
//   return num1 * num2
// }
const mul = (num1,num2) => num1* num2
// const log = () => {
//   console.log("log")
// }
const log = () => console.log("log")
```





### 箭头函数的this使用

> 什么时候使用箭头函数
>
> - 当把一个函数作为参数传入另外一个函数时使用

```javascript
setTimeout(function () {
	console.log(this)
} , 1000);
setTimeout(() => {
	console.log(this) // 这里this找的是window的this
}, 1000);
```

> 结论：箭头函数没有this，这里this引用的是**最近作用域**（aaa函数里的this）的this。

```javascript
    const obj = {
      aaa(){
        setTimeout(function () {
          console.log(this) // window
         });
          
         setTimeout(() => {
          console.log(this) // obj
        });
      }
    }
    obj.aaa()
```

> ​	上述中第一个是window对象的this，第二个箭头函数的this是obj的。

```javascript
    const obj = {
      aaa() {
        setTimeout(function () {
          setTimeout(function () {
            console.log(this) //window
          })
          setTimeout(() => {
            console.log(this) //window
          })
        })
        setTimeout(() => {
          setTimeout(function () {
            console.log(this) //window
          })
          setTimeout(() => {
            console.log(this) //obj
          })
        })
      }
    }
    obj.aaa()
```

## 高阶函数

### 1.5.1	filter过滤函数

- 只能用来过滤，不能处理元素。

- 返回值：true/false，返回原数组里的元素

```javascript
const nums = [2,3,5,1,77,55,100,200]
//要求获取nums中大于50的数
//回调函数会遍历nums中每一个数，传入回调函数，在回调函数中写判断逻辑，返回true则会被数组接收，false会被拒绝
let newNums = nums.filter(function ( num ) {
  if(num > 50){
    return true;
  }
  return false;
 })
 //可以使用箭头函数简写
//  let newNums = nums.filter(num => num >50)
```

### 1.5.2	map高阶函数

- 可以对元素进行处理

- 返回值：回调的return

```javascript
// 要求将已经过滤的新数组每项乘以2
//map函数同样会遍历数组每一项，传入回调函数为参数，num是map遍历的每一项，回调函数function返回值会被添加到新数组中
let newNums2 = newNums.map(function (num) {
  return num * 2
 })
 //简写
//  let newNums2 = newNums.map(num => num * 2)
console.log(newNums2);
```

### 1.5.3	reduce高阶函数

- 对数组元素汇总
- 参数
  - 回调函数
    - preValue：初始值，0
    - item：遍历数组元素值
  - 0

```javascript
// 3.reduce高阶函数
//要求将newNums2的数组所有数累加
//reduce函数同样会遍历数组每一项，传入回调函数和‘0’为参数，0表示回调函数中preValue初始值为0，回调函数中参数preValue是每一次回调函数function返回的值，currentValue是当前值
//例如数组为[154, 110, 200, 400],则回调函数第一次返回值为0+154=154，第二次preValue为154，返回值为154+110=264，以此类推直到遍历完成
let newNum = newNums2.reduce(function (preValue,currentValue) {
  return preValue + currentValue
 },0)
//简写
// let newNum = newNums2.reduce((preValue,currentValue) => preValue + currentValue)
console.log(newNum);
```

### 1.5.4综合使用

```javascript
//三个需求综合
let n = nums.filter(num => num > 50).map(num => num * 2).reduce((preValue,currentValue) => preValue + currentValue)
console.log(n);
```



------------------------



# （二）HelloVue

## 2.1	HelloVuejs

### 2.1.0 安装

- cdn

  ​	`<script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>`

- 下载	

- npm

  ​	`	npm i -S vue`

### 2.1.1 命令式编程

vue是声明式编程，区别于jquery的命令式编程。

​	原生js做法（命令式编程）

1. 创建div元素，设置id属性
2. 定义一个变量叫message
3. 将message变量放在div元素中显示
4. 修改message数据
5. 将修改的元素替换到div

### 2.1.2 声明式编程

​	vue写法（声明式）

1. 创建一个div元素，设置id属性
2. 定义一个vue对象，将div挂载在vue对象上
3. 在vue对象内定义变量message，并绑定数据
4. 将message变量放在div元素上显示
5. 修改vue对象中的变量message，div元素数据自动改变

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <title>HelloVuejs</title>
</head>
<body>
  <div id="app">
      <h2>{{message}}</h2>
      <p>{{name}}</p>
  </div>
  <script>
    //let变量/const常量
    //编程范式：声明式编程
    const app = new Vue({
      el:"#app",//用于挂载要管理的元素
      data:{//定义数据
        message:"HelloVuejs",
        name:"zzz"
      }
    })
  </script>
</body>
</html>
```

​	在谷歌浏览器中按F12，在开发者模式中console控制台，改变vue对象的message值，页面显示也随之改变。

​	`{{message}}`表示将变量message输出到标签h2中，所有的vue语法都必须在vue对象挂载的div元素中，如果在div元素外使用是不生效的。`el:"#app"`表示将id为app的div挂载在vue对象上，data表示变量对象。

## 2.2	vue列表的展示（v-for）

​	开发中常用的数组有许多数据，需要全部展示或者部分展示，在原生JS中需要使用for循环遍历依次替换div元素，在vue中，使用`v-for`可以简单遍历生成元素节点。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <title>vue列表展示</title>
</head>
<body>
  <div id="app">
      <h2>{{message}}</h2>
      <ul>
        <li v-for="(item, index) in movies" :key="index">{{item}}</li>
      </ul>
  </div>
  <script>
    const app = new Vue({
      el:"#app",//用于挂载要管理的元素
      data:{//定义数据
        message:"你好啊",
        movies:["星际穿越","海王","大话西游","复仇者联盟"]//定义一个数组
      }
    })
  </script>
</body>
</html>
```

显示结果如图所示：

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\2.2.1-1.png)

​	`<li v-for="(item, index) in movies" :key="index">{{item}}</li>`item表示当前遍历的元素，index表示元素索引， 为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` 属性。建议尽可能在使用 `v-for` 时提供 `key` attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

因为它是 Vue 识别节点的一个通用机制，`key` 并不仅与 `v-for` 特别关联。

>  不要使用对象或数组之类的非基本类型值作为 `v-for` 的 `key`。请用字符串或数值类型的值。 



## 2.3	vue案例-计数器

​	使用vue实现一个小计数器，点击`+`按钮，计数器+1，使用`-`按钮计数器-1。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <title>vue计数器</title>
</head>
<body>
  <div id="app">
      <h2>当前计数：{{count}}</h2>
      <!-- <button v-on:click="count--">-</button>
      <button v-on:click="count++">+</button> -->
      <button v-on:click="sub()">-</button>
      <button @click="add()">+</button>
  </div>
  <script>
    const app = new Vue({
      el:"#app",//用于挂载要管理的元素
      data:{//定义数据
        count:0
      },
      methods: {
        add:function(){
          console.log("add")
          this.count++
        },
        sub:function(){
          console.log("sub")
          this.count--
        }
      },
    })
  </script>
</body>
</html>
```

1. 定义vue对象并初始化一个变量count=0

2. 定义两个方法`add`和`sub`，用于对count++或者count--

3. 定义两个button对象，给button添加上点击事件

   在vue对象中使用methods表示方法集合，使用`v-on:click`的关键字给元素绑定监听点击事件，给按钮分别绑定上点击事件，并绑定触发事件后回调函数`add`和`sub`。也可以在回调方法中直接使用表达式。例如：`count++`和`count--`。

## 2.4 Vue中的MVVM

- MVVM：https://zh.wikipedia.org/wiki/MVVM

- | View | ViewModel                       | Model            |
  | ---- | ------------------------------- | ---------------- |
  | DOM  | DOM Listeners  &  Data Bindings | Plain Js Objects |
  |      | new Vue()                       |                  |

## 2.5 创建Vue时, options可以放哪些东西

* el:   string / HTMLElement

* data:   Object / Function

  - 注：在组件中，data必须是函数（Function）

* methods:   { [ key: string ]: Function }

* **生命周期函数**

----------------------





# （三）插值操作

## 3.1	Mustache语法

#### 3.1.1 

**{{}}：mustache（胡须）**

因为`{{}}`像胡须，又叫大括号语法。

#### 3.1.2 

在vue对象挂载的dom元素中，`{{}}`不仅可以直接写变量，还可以写简单表达式。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Mustache的语法</title>
</head>
<body>
  <div id="app">
    <h2>{{message}}</h2>
    <h2>{{message}},啧啧啧</h2>

    <!-- Mustache的语法不仅可以直接写变量，还可以写简单表达式 -->
    <h2>{{firstName + lastName}}</h2>
    <h2>{{firstName + " " + lastName}}</h2>
    <h2>{{firstName}}{{lastName}}</h2>
    <h2>{{count * 2}}</h2>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"你好啊",
        firstName:"skt t1",
        lastName:"faker",
        count:100
      }
    })

  </script>
</body>
</html>
```

## 3.2	v-once

​	v-once表示该dom元素**只渲染一次**，之后数据改变，**不会再次渲染**。

```html
  <div id="app">
    <h2>{{message}}</h2>
    <!-- 只会渲染一次，数据改变不会再次渲染 -->
    <h2 v-once>{{message}}</h2>

  </div>
```

​	上述`{{message}}`的message修改后，第一个h2标签数据会自动改变，第二个h2不会。

## 3.3	v-html

​	在某些时候我们不希望直接输出`<a href='http://www.baidu.com'>百度一下</a>`这样的字符串，而**输出被html自己转化的超链接**。此时可以使用v-html渲染成页面

区别：<u>{{ url }} 与  v-html='url'</u> 作用

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>v-html指令的使用</title>
</head>
<body>
  <div id="app">
    <h2>不使用v-html</h2>
    <h2>{{url}}</h2>
    <h2>使用v-html，直接插入html</h2>
    <h2 v-html="url"></h2>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"你好啊",
        url:"<a href='http://www.baidu.com'>百度一下</a>"
      }
    })
  </script>
</body>
</html>
```

输出结果如下：

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\3.3-1.png)

## 3.4	v-text

​	v-text会覆盖dom元素中的数据，相当于js的 **innerHTML** 方法。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>v-text指令的使用</title>
</head>
<body>
  <div id="app">
    <h2>不使用v-text</h2>
    <h2>{{message}}，啧啧啧</h2>
    <h2>使用v-text，以文本形式显示,会覆盖</h2>
    <h2 v-text="message">，啧啧啧</h2>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"你好啊"
      }
    })
  </script>
</body>
</html>
```

​	如图所示，使用`{{message}}`是拼接变量和字符串，而是用v-text是直接覆盖字符串内容。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\3.4-1.png)

## 3.5	v-pre

​	有时候我们期望**直接输出`{{ message }}`**这样的字符串，而不是被`{{   }}`语法转化的message的变量值，此时我们可以使用`v-pre`标签。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>v-pre指令的使用</title>
</head>
<body>
  <div id="app">
    <h2>不使用v-pre</h2>
    <h2>{{message}}</h2>
    <h2>使用v-pre,不会解析</h2>
    <h2 v-pre>{{message}}</h2>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"你好啊"
      }
    })
  </script>
</body>
</html>
```

​	结果如图，使用v-pre修饰的dom会直接输出字符串。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\3.5-1.png)

## 3.6	v-cloak

​	有时候因为加载延时问题，例如卡掉了，数据没有及时刷新，就造成了页面显示从`{{ message }}`到message变量“你好啊”的变化，这样**闪动的变化**，会造成用户体验不好。此时需要使用到`v-cloak`的这个标签。在vue解析之前，div属性中有`v-cloak`这个标签，**在vue解析完成之后，v-cloak标签被移除**。

​	解析前：`display:none;`

​	加载解析后：`display:block`，元素显示出来。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>v-cloak指令的使用</title>
  <style>
    [v-cloak]{
      display: none;
    }
  </style>
</head>

<body>
  <div id="app" v-cloak>
    <h2>{{message}}</h2>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    //在vue解析前，div中有一个属性cloak
    //在vue解析之后，div中没有一个属性v-cloak
    setTimeout(() => {
      const app = new Vue({
        el: "#app",
        data: {
          message: "你好啊"
        }
      })
    }, 1000);
  </script>
</body>

</html>
```

​	这里通过延时1秒模拟加载卡住的状态，结果一开始不显示message的值，div元素中有v-cloak的属性，1秒后显示message变量的值，div中的v-cloak元素被移除。

![](./images/3.6-1.gif)



---

# （四）动态绑定属性

## 4.1	v-bind的基本使用

​	某些时候我们并不想将变量放在标签内容中，像这样`<h2>{{message}}</h2>`是将变量h2标签括起来，类似js的innerHTML。

​	但是我们期望将变量`imgURL`写在如下位置，想这样`<img src="imgURL" alt="">`导入图片是希望动态获取图片的链接，此时的imgURL并非变量而是字符串imgURL，如果要将其生效为变量，需要使用到一个标签`v-bind:`， 

​	像这样`<img v-bind:src="imgURL" alt="">`，而且这里也不能使用Mustache语法，类似`<img v-bind:src="{{imgURL}}" alt="">`，这也是错误的。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>v-bind的基本使用</title>
</head>
<body>
  <div id="app">
    <!-- 错误的做法这里不能使用Mustache语法 -->
    <!-- <img v-bind:src="{{imgURL}}" alt=""> -->
    <!-- 正确的做法使用v-bind指令 -->
    <img v-bind:src="imgURL" alt="">
    <a v-bind:href="aHerf"></a>
    <!-- 语法糖写法 -->
    <img :src="imgURL" alt="">
    <a :href="aHerf"></a>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"你好啊",
        imgURL:"https://cn.bing.com/th?id=OIP.NaSKiHPRcquisK2EehUI3gHaE8&pid=Api&rs=1",
        aHerf:"http://www.baidu.com"
      }
    })
  </script>
</body>
</html>
```

​	此时vue对象中定义的`imgURL`变量和`aHerf`变量可以动态的绑定到img标签的src属性和a标签的href属性。`v-bind:`由于用的很多，vue对他有一个语法糖的优化写法也就是**`:`**，此时修改imgURL变量图片叶重新加载。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\4.1-1.gif)



## 4.2	v-bind动态绑定class(对象语法)

​	有时候我们期望对Dom元素的节点的class进行动态绑定，选择此Dom是否有指定class属性。例如，给h2标签加上`class="active"`，当Dom元素有次class时候，变红`<style>.active{color:red;}</style>`，在写一个按钮绑定事件，点击变黑色，再次点击变红色。

#### 动态绑定class对象语法：

`<h2 v-bind:class="{类名1: true, 类名2: boolean}">{{message}}</h2>`

​	当布尔值为 **true** 时，“类1生效”；

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>v-bind动态绑定class(对象语法)</title>
  <style>
    .active{
      color:red;
    }
  </style>
</head>
<body>
  <div id="app">
    <!-- <h2 class="active">{{message}}</h2>
    <h2 :class="active">{{message}}</h2> -->

    <!-- 动态绑定class对象用法  -->
    <!-- <h2 :class="{key1:value1,key2:value2}">{{message}}</h2>
    <h2 :class="{类名1:true,类名2:boolean}">{{message}}</h2> -->
    <h2 class="title" :class="{active:isActive}">{{message}}</h2>
    <h2 class="title" :class="getClasses()">{{message}}</h2>
    <button @click="change">点击变色</button>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"你好啊",
        active:"active",
        isActive:true
      },
      methods: {
        change(){
          this.isActive = !this.isActive
        },
        getClasses(){
          return {active:this.isActive}
        }
      },
    })
  </script>
</body>
</html>
```

​	定义两个变量`active`和`isActive`，在Dom元素中使用`:class={active:isActive}`，此时绑定的`class='active'`，isActive为true，active显示，定义方法change()绑定在按钮上，点击按钮`this.isActive = !this.isActive`，控制Dom元素是否有`class='active'`的属性。

## 4.3	v-bind动态绑定class(数组用法)

​	class属性中可以放数组，会依次解析成对应的class。

#### 语法

<h2 class="title" :class="[active, line]">{{message}}</h2>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>v-bind动态绑定class(数组用法)</title>
  <style>
  </style>
</head>
<body>
  <div id="app">
    <!-- 加上单引号当成字符串 -->
    <h2 class="title" :class="['active','line']">{{message}}</h2>
    <!-- 不加会被当成变量 -->
    <h2 class="title" :class="[active,line]">{{message}}</h2>
    <h2 class="title" :class="getClasses()">{{message}}</h2>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"你好啊",
        active:"aaaa",
        line:'bbbb'
      },
      methods: {

        getClasses(){
          return [this.active,this.line]
        }
      },
    })
  </script>
</body>
</html>
```

1. ​	加上单引号的表示字符串

2. ​    不加的会当成变量

3. ​    可以直接使用方法返回数组对象

   ![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\4.3-2.png)



## 4.4	v-for和v-bind结合

​	使用v-for和v-bind实现一个小demo，将电影列表展示，并点击某一个电影列表时候，将此电影列表变成红色。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>作业(v-for和v-bind的结合)</title>
  <style>
    .active{
      color:red;
    }
  </style>
</head>
<body>
  <div id="app">

    <ul>
      <li v-for="(item, index) in movies" :key="index" :class="{active:index===currentIndex}" @click="changeColor(index)" >{{index+"---"+item}}</li>
    </ul>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        currentIndex:0,
        movies:["海王","海贼王","火影忍者","复仇者联盟"]
      },
      methods: {
        changeColor(index){
          this.currentIndex = index
        }
      },
    })
  </script>
</body>
</html>
```

​	v-for时候的index索引，给每行绑定事件点击事件，点击当行是获取此行索引index并赋值给`currentIndex`，使用`v-bind:`绑定class，当`index===currentIndex`Dom元素有active的class，颜色变红。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\4.4-1.gif)



## 4.5	v-bind动态绑定style

### 4.5.1	v-bind动态绑定style(对象语法)

```html
    <!-- <h2 :style="{key(属性名):value(属性值)}">{{message}}</h2> -->

    <!-- 加单引号，当成字符串解析 -->
    <h2 :style="{fontSize:'50px'}">{{message}}</h2>
	'50px'必须加上单引号, 否则是当做一个变量去解析

    <!-- 不加单引号，变量解析 -->
    <h2 :style="{fontSize:fontSize}">{{message}}</h2>
    <h2 :style="getStyle()">{{message}}</h2>
```

### 4.5.2 	v-bind动态绑定style(数组语法)

```html
  <div id="app">
    <h2 :style="[baseStyle]">{{message}}</h2>
    <h2 :style="getStyle()">{{message}}</h2>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"你好啊",
        baseStyle:{backgroundColor:'red'}
      },
      methods: {
        getStyle(){
          return [this.baseStyle]
        }
      },
    })
  </script>
```

​	类似绑定class，绑定style也是一样的。





# （五）计算属性

## 5.1	计算属性的基本使用

​	现在有变量姓氏和名字，要得到完整的名字。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>计算属性的基本使用</title>
</head>
<body>
  <div id="app">
    <!-- Mastache语法 -->
    <h2>{{firstName+ " " + lastName}}</h2>
    <!-- 方法 -->
    <h2>{{getFullName()}}</h2>
    <!-- 计算属性 -->
    <h2>{{fullName}}</h2>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        firstName:"skt t1",
        lastName:"faker"
      },
      computed: {
        fullName:function(){
          return this.firstName + " " + this.lastName
        }
      },
      methods: {
        getFullName(){
          return this.firstName + " " + this.lastName
        }
      },
    })
  </script>
</body>
</html>
```

1. 使用Mastache语法拼接`<h2>{{firstName+ " " + lastName}}</h2>`
2. 使用方法methods`<h2>{{getFullName()}}</h2>`
3. 使用计算属性**computed** `<h2>{{fullName}}</h2>`

> ​	例子中计算属性computed看起来和方法似乎一样，只是方法调用需要使用()，而计算属性不用，方法取名字一般是**动词**见名知义，而计算属性是属性是**名词**，但这只是基本使用。

## 5.2	计算属性的复杂使用

​	现在有一个数组数据books，里面包含许多book对象，数据结构如下：

```javascript
books:[
          {id:110,name:"JavaScript从入门到入土",price:119}, 
          {id:111,name:"Java从入门到放弃",price:80},
          {id:112,name:"编码艺术",price:99},
          {id:113,name:"代码大全",price:150},
        ]
```

​	要求计算出所有book的总价格`totalPrice`。

​	

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>计算属性的复杂使用</title>
</head>
<body>
  <div id="app">


    <h2>总价格：{{totalPrice}}</h2>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        books:[
          {id:110,name:"JavaScript从入门到入土",price:119},
          {id:111,name:"Java从入门到放弃",price:80},
          {id:112,name:"编码艺术",price:99},
          {id:113,name:"代码大全",price:150},
        ]
      },
      computed: {
        totalPrice(){
          let result= 0;
          for (let i = 0; i < this.books.length; i++) {
            result += this.books[i].price;
          }
          return result
        }
      }
    })
  </script>
</body>
</html>
```

​	获取每一个book对象的price累加，当其中一个book的价格发生改变时候，总价会随之变化。

## 5.3	计算属性的setter和getter

​	在计算属性中其实是由这样两个方法setter和getter。

```javascript
      computed: {
        fullName:{
          //计算属性一般没有set方法，只读属性
          set:function(newValue){
            console.log("-----")
            const names = newValue.split(" ")
            this.firstName = names[0]
            this.lastName = names[1]
          },
          get:function(){
            return this.firstName + " " + this.lastName
          }
        }
      }
```

​	**但是计算属性一般没有set方法，只读属性**，只有get方法，但是上述中newValue就是新的值，也可以使用set方法设置值，但是一般不用。

***computed的getter/setter***

> 请看如下代码：

```html
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Vue计算属性的getter和setter</title>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            <h1>计算属性：computed的getter/setter</h1>
            <h2>fullName</h2>
            {{fullName}}
            <h2>firstName</h2>
            {{firstName}}
            <h2>lastName</h2>
            {{lastName}}
        </div>
        <script>
            var app = new Vue({
                el:"#app",
                data:{
                firstName:"zhang",
                lastName:"san",
                },
                computed: {
                    fullName:{
                        get:function(){
                            return this.firstName+" "+this.lastName
                        },
                        set:function(value){
                            var list = value.split(' ');
                            this.firstName=list[0]
                            this.lastName=list[1]
                        }
                    }
                },
            });
        </script>
    </body>
    </html>
```

> *初始化*



![6](C:\Users\86136\Desktop\repository\notes\13-Vue\images\6.png)

> 修改fullName*



![7](C:\Users\86136\Desktop\repository\notes\13-Vue\images\7.png)



> *结论*



\- 通过这种方式，我们可以在改变计算属性值的同时也改变和计算属性相关联的属性值。

## 5.4	计算属性和methods的对比

​	直接看代码，分别使用计算属性和方法获得fullName的值。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>计算属性和methods的对比</title>
</head>
<body>
  <div id="app">
    <!-- methods，即使firstName和lastName没有改变，也需要再次执行 -->
    <h2>{{getFullName}}</h2>
    <h2>{{getFullName}}</h2>
    <h2>{{getFullName}}</h2>
    <h2>{{getFullName}}</h2>
    <!-- 计算属性有缓存，只有关联属性改变才会再次计算 -->
    <h2>{{fullName}}</h2>
    <h2>{{fullName}}</h2>
    <h2>{{fullName}}</h2>
    <h2>{{fullName}}</h2>


  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        firstName:"skt t1",
        lastName:"faker"
      },
      computed: {
        fullName(){
          console.log("调用了计算属性fullName");

          return this.firstName + " " + this.lastName
        }
      },
      methods: {
        getFullName(){
          console.log("调用了getFullName");

          return this.firstName + " " + this.lastName
        }
      },
    })
  </script>
</body>
</html>
```

​	分别使用方法和计算属性获取四次fullName，结果如图。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\5.4-1.png)

​	由此可见计算属性有缓存，在`this.firstName + " " + this.lastName`的属性不变的情况下，methods调用了四次，而计算属性才**调用了一次**，性能上计算属性明显比methods好。而且在改动firstName的情况下，计算属性只调用一次，methods依然要调用4次。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\5.4-2.png)

## 5.5	Vue计算属性与侦听器总结

> **照例看一段代码：**

```html
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Vue计算属性/侦听器/方法比较</title>
        <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            <h1>计算属性：computed</h1>
            {{fullName}}
            <h1>方法：methods</h1>
            {{fullName2()}}
            <h1>侦听器：watch</h1>
            {{watchFullName}}
            <h1>年龄</h1>
            {{age}}
        </div>
        <script>
            var other = 'This is other';
            var app = new Vue({
                el:"#app",
                data:{
                firstName:"zhang",
                lastName:"san",
                watchFullName:"zhangsan",
                age:18,
                },
                watch: {
                    firstName:function(newFirstName, oldFirstName){
                        console.log("firstName触发了watch,newFirstName="+newFirstName+",oldFirstName="+oldFirstName)
                        this.watchFullName = this.firstName+this.lastName+","+other
                    },
                    lastName:function(newLastName, oldLastName){
                        console.log("lastName触发了watch,newLastName="+newLastName+",oldLastName="+oldLastName)
                        this.watchFullName = this.firstName+this.lastName+","+other
                    }  
                },
                computed: {
                    fullName:function(){
                    console.log("调用了fullName,计算了一次属性")
                    return this.firstName+this.lastName+","+other;
                    }
                },
                methods: {
                    fullName2:function(){
                        console.log("调用了fullName,执行了一次方法")
                        fullName2 = this.firstName+this.lastName+","+other;
                        return fullName2;
                    }
                }
            });
        </script>
    </body>
    </html>
```

> 初始化：

![1](C:\Users\86136\Desktop\repository\notes\13-Vue\images\1.png)

> 修改firstName/lastName/两者都修改

![2](C:\Users\86136\Desktop\repository\notes\13-Vue\images\2.png)

> 修改computed中没计算的age

![3](C:\Users\86136\Desktop\repository\notes\13-Vue\images\3.png)

> 修改Vue实例外的对象

![4](C:\Users\86136\Desktop\repository\notes\13-Vue\images\4.png)

> 修改Vue实例外对象后在修改Vue实例内的对象

![5](C:\Users\86136\Desktop\repository\notes\13-Vue\images\5.png)

> 测试结论：

1. 使用computed计算了fullName属性，值为firstName+lastName。计算属性具有`缓存功能`，当firstName和lastName都不改变的时候，fullName不会重新计算，比如我们改变age的值，fullName的值是不需要重新计算的。
2. methods并没有缓存特性，比如我们改变age的值，fullName2()方法会被执行一遍。
3. 当一个功能可以用上面三个方法来实现的时候，明显使用computed更合适，代码简单也有缓存特性。
4. 计算属性范围在vue实例内，修改vue实例外部对象，不会重新计算渲染，但是如果先修改了vue实例外对象，在修改vue计算属性的对象，那么外部对象的值也会重新渲染。

> *计算属性：computed*

计算属性范围在Vue实例的fullName内所管理的firstName和lastName,通常监听多个变量



> *侦听器：watch*

监听数据变化，一般只监听一个变量或数组



> 使用场景

watch(`异步场景`)，computed(`数据联动`)







# （六）事件监听

## 6.1	v-on的基本使用

> 语法糖：
>
> - v-on：→   @
>
> - 方法名可以不加括号。

​	在前面的计数器案例中使用了`v-on:click`监听单击事件。这里在回顾一下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <title>Document</title>
</head>
<body>
  <div id="app">
      <h2>{{count}}</h2>
      <!-- <button v-on:click="count++">加</button>
      <button v-on:click="count--">减</button> -->
      <button @click="increment">加</button>
      <button @click="decrement()">减</button>
  </div>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        count:0
      },
      methods: {
        increment(){
          this.count++
        },
        decrement(){
          this.count--
        }
      }
    })

  </script>
</body>
</html>
```

​	使用`v-on:click`给button绑定监听事件以及回调函数，@是`v-on:`的语法糖，也就是简写也可以使用**`@click`**。方法一般是需要写方法名加上()，在`@click`中可以省掉，如上述的`<button @click="increment">加</button>`。

## 6.2	v-on的参数传递

​	了解了v-on的基本使用，现在需要了解参数传递。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <!-- 事件没传参 -->
    <button @click="btnClick">按钮1</button>
    <button @click="btnClick()">按钮2</button>
      
    <!-- 事件调用方法传参，写函数时候省略小括号，但是函数本身需要传递一个参数 -->
    <button @click="btnClick2(123)">按钮3</button>
    <button @click="btnClick2()">按钮4</button>
    <button @click="btnClick2">按钮5</button>
      
    <!-- 事件调用时候需要传入event还需要传入其他参数 -->
    <button @click="btnClick3($event,123)">按钮6</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      methods:{
        btnClick(){
          console.log("点击XXX");
        },
        btnClick2(value){
          console.log(value+"----------");
        },
        btnClick3(event,value){
          console.log(event+"----------"+value);
        }
      }
    })
  </script>
</body>
</html>	
```

- 事件没传参，可以省略()

- 事件调用方法传参了，写函数时候省略了小括号，但是函数本身是需要传递一个参数的，这个参数就是原生事件（如click）**event参数**传递进去

- 如果同时需要传入某个参数，同时需要event是，可以通过`$event`传入事件。
  - 按钮4调用`btnClick2(value){}`，此时`undefined`。按钮5调用时省略了()，会自动传入原生event事件，如果我们需要event对象还需要传入其他参数，可以使用`$event`对象。

## 6.3	v-on的修饰词

#### .stop

​	btn的click事件不会传播，不会冒泡到上层，调用`event.stopPropagation()`。

#### .prevent

​	调用`event.preeventDefault`阻止默认行为。（return false）

#### .enter

​	只监听 ’ 回车 ‘ 键盘事件。

#### .once

​	只触发一次回调。

#### .native

​	监听组件根元素的原生事件

> 组件上绑定的事件必须加上.native才能监听到



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>v-on的修饰符</title>
</head>
<body>
  <div id="app">
    <!--1. .stop的使用，btn的click事件不会传播，不会冒泡到上层，调用event.stopPropagation() -->
    <div @click="divClick">
        <button @click.stop="btnClick">按钮1</button>
    </div>
    <!-- 2. .prevent 调用event.preeventDefault阻止默认行为  -->
    <form action="www.baidu.com">
      <button type="submit" @click.prevent="submitClick">提交</button>
    </form>
    <!--3. 监听键盘的事件 -->
    <input type="text" @click.enter="keyup">

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      methods:{
        btnClick(){
          console.log("点击button");
        },
        divClick(){
          console.log("点击div");
        },
        submitClcik(){
          console.log("提交被阻止了")
        },
        keyup(){
          console.log("keyup点击")
        }
      }
    })
  </script>
</body>
</html>
```





# （七）条件判断



## 7.1	v-if、v-eles、v-else-if

- v-if用于条件判断，判断Dom元素是否显示。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <h2 v-if="isFlag">isFlag为true显示这个</h2>
    <h2 v-show="isShow">isShow为true是显示这个</h2>
    <div v-if="age<18">小于18岁未成年</div>
    <div v-else-if="age<60">大于18岁小于60岁正值壮年</div>
    <div v-else="">大于60岁,暮年</div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        isFlag:true,
        isShow:false,
        age:66
      }
    })
  </script>
</body>
</html>
```

- 单独使用v-if，变量为布尔值，为true才渲染Dom

- **v-show**的变量也是布尔值，为true才显示内容，类似css的display

- v-if、v-else、v-else-if联合使用相当于if、elseif、else，但是在条件比较多的时候建议使用计算属性。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\7.1-1.png)



## 7.2	v-if的demo

- 在登录网站是经常可以选择使用账户名或者邮箱登录的切换按钮。要求点击按钮切换登录方式。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <span v-if="isUser">
      <label for="username">用户账号</label>
      <input type="text" id="username" placeholder="请输入用户名" >
    </span>
    <span v-else="isUser">
        <label for="email">用户邮箱</label>
        <input type="text" id="email" placeholder="请输入用户邮箱" >
    </span>
    <button @click="isUser=!isUser">切换类型</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        isUser:true
      }
    })
  </script>
</body>
</html>
```

​	使用`v-if`和`v-else`选择渲染指定的Dom，点击按钮对`isUser`变量取反。

> 这里有个小问题，如果已经输入了账号了，此时想切换到邮箱输入，输入框未自己清空。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\7.2-1.gif)

​	这里需要了解一下vue底层操作，此时**input输入框值被复用了**。

- vue在进行DOM渲染时，出于性能考虑，会复用已经存在的元素，而不是每次都创建新的DOM元素。

- 在上面demo中，Vue内部发现原来的input元素不再使用，所以直接将其映射对应虚拟DOM，用来复用。

#### key的使用

- 如果不希望出现类似复用问题，可以给对应的dom元素加上`key`值，并保证`key`不同。

```html
<input type="text" id="username" placeholder="请输入用户名" key="username">
<input type="text" id="email" placeholder="请输入用户邮箱" key="email">
```



## 7.3	v-show

​	v-if 看似和 v-show 实现一样的效果，但是内部 v-show 只是用css将操作的元素隐藏显示，而v-if是新增和删除元素。v-show只是操作元素的style属性display，都没会被创建。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <h2 v-show="isFlag">v-show只是操作元素的style属性display，都没会被创建</h2>
    <h2 v-if="isFlag">v-if是新增和删除dom元素</h2>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        isFlag:true
      }
    })
  </script>
</body>
</html>
```

- v-if: 当条件为false时, 包含v-if指令的元素, 根本就不会存在dom中
- v-show: 当条件为 false 时, v-show只是给我们的元素添加一个行内样式: **display: none**





# （八）遍历循环

## 8.1	v-for遍历数组

#### 语法

- `<li v-for="(item,index) in names"  >{{index+":"+item}}</li>`
  - index表示索引，item表示当前遍历的元素

#### 案例

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <!-- 1.遍历过程没有使用索引（下标值） -->
    <ul>
      <li v-for="item in names" >{{item}}</li>
    </ul>
      
    <!-- 2.遍历过程有使用索引（下标值） -->
    <ul>
        <li v-for="(item,index) in names"  >{{index+":"+item}}</li>
    </ul>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        names:["zzz","ttt","yyy"]
      }
    })
  </script>
</body>
</html>
```

​	一般需要使用索引值。

## 8.2	v-for遍历对象

#### 参数

- *在遍历对象的过程中, 如果只是获取一个值, 那么获取到的是value*
- *获取key和value 格式: (value, key)*
- *获取key和value和index 格式: (value, key, index)*

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <!-- 1.遍历过程没有使用index索引-->
    <!-- 格式为：key-value -->
    <ul>
      <li v-for="(value,key) in user" >{{key+"-"+value}}</li>
    </ul>
    <!-- 格式为：key-value-index -->
    <ul>
      <li v-for="(value,key,index) in user" >{{key+"-"+value+"-"+index}}</li>
    </ul>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        user:{
          name:"zzz",
          height:188,
          age:24
        }
      }
    })
  </script>
</body>
</html>
```

1. 遍历过程没有使用index索引，`<li v-for="(value,key) in user" >{{key+"-"+value}}</li>`，value表示当前元素是属性值，key表示user对象属性名。
2. 遍历过程使用index索引，index表示索引从0开始。
3. ![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\8.2-1.png)



## 8.3	v-for使用key

- 使用 **key** 可以提高效率，加 key 如果要插入 f 使用 diff 算法高效,如果使用index 做 key 一直变，所以 item 如果**唯一**可以使用 item。
- 将 li 与 item 绑定

- 不加 key 如果要插入 f 依次替换。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>v-for使用key</title>
</head>
<body>
  <div id="app">
    <!-- 不加key如果要插入f依次改变 -->
    <ul>
      <li v-for="item in letters">{{item}}</li>
    </ul>
    <button @click="add1">没有key</button>
    <!-- 加key如果要插入f使用diff算法高效,如果使用index做key一直变，所以item如果唯一可以使用item-->
    <ul>
        <li v-for="item in letters" :key="item">{{item}}</li>
    </ul>
    <button @click="add2">有key</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        letters:['a','b','c','d','e']
      },
      methods: {
        add1(){
          this.letters.splice(2,0,'f')
        },
        add2(){
          this.letters.splice(2,0,'f')
        }
      }
    })
  </script>
</body>
</html>
```



**v-for加key与不加**

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\8.3-1.png)

> ​	不加key渲染时候会依次替换渲染，加了key会直接将其放在指定位置，加key提升效率。

## 8.4	数组的响应方式

> 响应式：通过函数方法把数组内容改变后，页面内容也会刷新。

> 我们改变DOM绑定的数据时，DOM会动态的改变值。数组也是一样的。但是对于动态变化数据，有要求，不是任何情况改变数据都会变化。

#### push()

- *this.letters.push('aaa')*
- *this.letters.push('aaaa', 'bbbb', 'cccc')*

#### pop()

- *删除数组中的最后一个元素*
- *this.letters.pop();*

#### shift()

- *删除数组中的第一个元素*
- *this.letters.shift();*

#### unshift()

- *在数组最前面添加元素*
- *this.letters.unshift()*
- *this.letters.unshift('aaa', 'bbb', 'ccc')*

#### splice()

- *删除 / 插入 / 替换*
- *删除元素*
  - **第二个参数**传入你要删除几个元素(如果没有传,就删除后面所有的元素)
- *替换元素*
  - **第二个参数**, 表示我们要替换几个元素, 后面是用于替换前面的元素
  - *this*.letters.splice(1, 3, 'm', 'n', 'l', 'x')
- *插入元素*
  - **第二个参数**, 传入0, 并且后面跟上要插入的元素
  - *this.letters.splice(1, 0, 'x', 'y', 'z')*

#### sort()

- *this.letters.sort()*

#### reverse()

- 反转数组元素

- *this.letters.reverse()*

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>数组的响应式方法 </title>
</head>
<body>
  <div id="app">
    <!-- 数组的响应式方法 -->
    <ul>
      <li v-for="item in letters">{{item}}</li>
    </ul>
    <button @click="btn1">push</button><br>
    <button @click="btn2">通过索引值修改数组</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        letters:['a','b','c','d','e']
      },
      methods: {
        btn1(){
          //1.push
          this.letters.push('f')
            
          //2.pop()删除最后一个元素
          //this.letters.pop()
            
          //3.shift()删除第一个
          //this.letters.shift()
            
          //4.unshift()添加在最前面,可以添加多个
          //this.letters.unshift('aaa','bbb','ccc')
            
          //5.splice():删除元素/插入元素/替换元素
          //splice(1,1)再索引为1的地方删除一个元素,第二个元素不传，直接删除后面所有元素
          //splice(index,0,'aaa')在索引index后面删除0个元素，加上'aaa',
          //splice(1,1,'aaa')替换索引为1的后一个元素为'aaa'
          // this.letters.splice(2,0,'aaa')
            
          //6.sort()排序可以传入一个函数
          //this.letters.sort()
          //7.reverse()反转
          // this.letters.reverse()

        },
        btn2(){
          this.letters[0]='f'
        }
      }
    })
  </script>
</body>
</html>
```

1. btn2按钮是通过**索引值修改数组的值**，这种情况，数组letters变化，DOM不会变化。

2. 而数组的方法，例如`push()`、`pop()`、`shift()`、`unshift()`、`splice()`、`sort()`、`reverse()`等方法修改数组的数据，DOM元素会随之修改。

3. > splic()：删除元素、插入元素、替换元素
   >
   > splice(1,1)再索引为1的地方删除一个元素,第二个元素不传，直接删除后面所有元素
   >
   > splice(index,0,'aaa')再索引index后面删除0个元素，加上'aaa'
   >
   > splice(1,1,'aaa')替换索引为1的后一个元素为'aaa'

4. *注意: 通过索引值修改数组中的元素*

   ​     this.letters[0] = 'bbbbbb';

   ​     this.letters.splice(0, 1, 'bbbbbb')

   

   ​    *set(要修改的对象, 索引值, 修改后的值)*

   ​     Vue.set(this.letters, 0, 'bbbbbb')



## 8.5	综合练习

​	现在要求将数组内的电影展示到页面上，并选中某个电影，电影背景变红，为选中状态。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>综合练习</title>
  <style>
    .active {
      background-color: red;
    }
  </style>
</head>

<body>
  <div id="app">
    <!-- 数组的响应式方法 -->
    <ul>
      <li v-for="(item,index) in movies"  @click="liClick(index)" :class="{active:index===curIndex}">{{index+"---"+item}}</li>
    </ul>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data: {
        movies: ['复仇者联盟', '蝙蝠侠', '海贼王', '星际穿越'],
        curIndex:0
      },
      methods: {
        liClick(index){
          this.curIndex = index
        }
      }
    })
  </script>
</body>

</html>
```

1. 先使用`v-for`将电影列表展示到页面上，并获取index索引定位当前的`<li>`标签。
2. 给每个`<li>`标签加上,单击事件，并将index传入单击事件的回调函数methods的`liClick()`。
3. 定义一个变量`curIndex`表示当前索引，初始值为0，用于表示选中状态的电影列。
4. 定义个class样式active，在active为激活状态是，` background-color: red;`为红色。使用表达式`index=curIndex`判断当前选中状态的列。
5. ![](./images/8.5-1.gif)





# （九）综合练习

## 	9.1	综合练习

​	综合前面的知识，需要通过一个小demo来串联起知识。

​	如图所示，

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\9-1.png)

​	点击“+”按钮，总价增加，点击“-”按钮总价减少，点击移除，移除当列。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>图书购物车小案例</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="app">
    <table>
      <thead>
        <th>&nbsp;</th>
        <th>书籍名称</th>
        <th>出版日期</th>
        <th>价格</th>
        <th>购买数量</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" :key="index">
          <td>{{index}}</td>
          <td>{{book.name}}</td>
          <td>{{book.beginDate}}</td>
          <td>{{book.price | showPrice}}</td>
          <td>
            <button @click="decrement(index)" :disabled="book.count<=1" >-</button>
            {{book.count}}
            <button @click="increment(index)">+</button>
          </td>
          <td><button @click="remove">移除</button></td>
        </tr>
      </tbody>
    </table>
    <h3>总价：{{totalPrice | showPrice}}</h3>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script src="main.js"></script>

</body>

</html>
```

​	使用计算属性记录总价，使用`v-for`循环遍历数组变量，使用table输出到html页面上。

> js代码

```javascript
const app = new Vue({
  el: "#app",
  data: {
    books: [{
        name: "《算法导论》",
        beginDate: "2006-9",
        price: 85.00,
        count: 1
      },
      {
        name: "《UNIX编程艺术》",
        beginDate: "2006-2",
        price: 59.00,
        count: 1
      },
      {
        name: "《编程大全》",
        beginDate: "2008-10",
        price: 39.00,
        count: 1
      },
      {
        name: "《代码大全》",
        beginDate: "2006-3",
        price: 128.00,
        count: 1
      },
    ]
  },
  computed: {
    totalPrice () {
        let total = 0;
        //1.普通for循环
        // for (let i = 0; i < this.books.length; i++) {
        //   total = total + this.books[i].price * this.books[i].count
        // }
        
        // 2.增强for循环
        // for (let i in this.books) {
        //   total = total + this.books[i].price * this.books[i].count
        // }
        
        // 3.for of
        // for (const book of this.books) {
        //   total = total + book.price * book.count
        // }
        // return total
        
        // 4.使用高阶函数
        // return this.books.map(function (book) {
        //   return book.price * book.count
        //  }).reduce(function (preValue,currentValue) {
        //     return preValue + currentValue
        //   })
        
        // 5.高阶函数简写（箭头函数）
        return this.books.length === 0 ? 0 : this.books.map(book => book.price * book.count).reduce((preValue,currentVlue) => preValue + currentVlue)
      }
  },
  methods: {
    increment(index){
      this.books[index].count++
    },
    decrement(index){
      this.books[index].count--
    },
    remove(index){
      this.books.splice(index,1)
    }
  },
  filters:{//过滤器
    showPrice(price){
      return "￥" + price.toFixed(2)
    }
  }
})

// 1.filter过滤函数
const nums = [2,3,5,1,77,55,100,200]
//要求获取nums中大于50的数
//回调函数会遍历nums中每一个数，传入回调函数，在回调函数中写判断逻辑，返回true则会被数组接收，false会被拒绝
let newNums = nums.filter(function (num) {
  if(num > 50){
    return true;
  }
  return false;
 })
 //可以使用箭头函数简写
//  let newNums = nums.filter(num => num >50)
 console.log(newNums);
// 2.map高阶函数
// 要求将已经过滤的新数组每项乘以2
//map函数同样会遍历数组每一项，传入回调函数为参数，num是map遍历的每一项，回调函数function返回值会被添加到新数组中
let newNums2 = newNums.map(function (num) {
  return num * 2
 })
 //简写
//  let newNums2 = newNums.map(num => num * 2)
console.log(newNums2);
// 3.reduce高阶函数
//要求将newNums2的数组所有数累加
//reduce函数同样会遍历数组每一项，传入回调函数和‘0’为参数，0表示回调函数中preValue初始值为0，回调函数中参数preValue是每一次回调函数function返回的值，currentValue是当前值
//例如数组为[154, 110, 200, 400],则回调函数第一次返回值为0+154=154，第二次preValue为154，返回值为154+110=264，以此类推直到遍历完成
let newNum = newNums2.reduce(function (preValue,currentValue) {
  return preValue + currentValue
 },0)
//简写
// let newNum = newNums2.reduce((preValue,currentValue) => preValue + currentValue)
console.log(newNum);

//三个需求综合
let n = nums.filter(num => num > 50).map(num => num * 2).reduce((preValue,currentValue) => preValue + currentValue)
console.log(n);

```

​	使用books数组对象记录book数据，使用totalPrice计算属性计算总价。

1. 使用普通for循环
2. 使用增强for循环数组索引
3. 使用for of，直接循环数组内的对象
4. 使用高阶函数map对象计算每个book对象的总价，在使用reduce累加总价。

> css

```css
table{
  border: 1px;
  border-collapse: collapse;
  border-spacing: 0;
}
th,td{
  padding: 8px 16px;
  border: ipx solid #e9e9e9;
  text-align: left;
}
th{
  background-color: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
}
```



# （十）v-model

## 10.1	v-model的基本使用

```html
  <div id="app">
    <!-- 输入框内容修改，message也修改，修改message，input内容也修改，双向绑定 -->
    <input type="text" v-model="message">{{message}}
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"zzz"
      }
    })
  </script>
```

​	v-model双向绑定，既输入框的value改变，对应的message对象值也会改变，修改message的值，input的value也会随之改变。无论改变那个值，另外一个值都会变化。

## 10.2	v-model的原理

> <input type="text" v-model="message">
>
> <input type="text" v-bind:value="message" v-on:input="message = $event.target.value">

​	先来一个demo实现不使用v-model实现双向绑定。

```html
  <div id="app">
    <!-- v-model = v-bind + v-on -->
    <!-- 输入框内容修改，message也修改，修改message，input内容也修改，双向绑定 -->
      
    <!-- <input type="text" v-model="message"> -->
    <!-- 实现双向绑定 @input监听输入框事件  -->
      
    <!-- <input type="text" :value="message" @input="valueChange" > -->
    <!-- $event获取事件对象，$event.target.value获取input值 -->
    <input type="text" :value="message" @input="valueChange($event.target.value)">

    {{message}}
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"zzz"
      },
      methods:{
        // valueChange(event){
        //   console.log("input值改变了");
        //   this.message = event.target.value
        // },
        valueChange(value){
          console.log("input值改变了");
          this.message = value
        }
      }
    })
  </script>
```

`v-model = v-bind + v-on`

实现双向绑定需要是用v-bind和v-on，使用v-bind给input的value绑定message对象，此时message对象改变，input的值也会改变。但是改变input的value并不会改变message的值，此时需要一个v-on绑定一个方法，监听事件，当input的值改变的时候，将最新的值赋值给message对象。`$event`获取事件对象，target获取监听的对象dom，value获取最新的值。

## 10.3	v-model结合radio类型使用

​	radio单选框的`name`属性是互斥的，如果使用v-model，可以不使用`name`就可以互斥。

```html
  <div id="app">
    <!-- name属性radio互斥 使用v-model可以不用name就可以互斥 -->
    <label for="male">
      <input type="radio" id="male" name="sex" value="男" v-model="sex">男
    </label>
    <label for="female">
        <input type="radio" id="female" name="sex" value="女" v-model="sex">女
    </label>
    <div>你选择的性别是：{{sex}}</div>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"zzz",
        sex:"男"
      },

    })
  </script>
```

 	v-model绑定`sex`属性，初始值为“男”，选择女后`sex`属性变成“女”，因为此时是双向绑定。

## 10.4	v-model结合checkbox类型

​	checkbox可以结合v-model做单选框，也可以多选框。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>v-model结合checkbox类型</title>
</head>
<body>
  <div id="app">
    <!-- checkbox单选框 -->
    <h2>单选框</h2>
    <label for="agree">
      <input type="checkbox" id="agree" v-model="isAgree">同意协议
    </label>

    <div>你选择的结果是：{{isAgree}}</div>

    <button :disabled="!isAgree">下一步</button>
    <!-- checkbox多选框 -->
    <h2>多选框</h2>

      <label :for="item" v-for="(item, index) in oriHobbies" :key="index">
        <input type="checkbox" name="hobby" :value="item" :id="item" v-model="hobbies">{{item}}
      </label>
      <!-- <input type="checkbox" name="hobby" value="篮球" v-model="hobbies">篮球
      <input type="checkbox" name="hobby" value="足球" v-model="hobbies">足球
      <input type="checkbox" name="hobby" value="羽毛球"  v-model="hobbies">羽毛球
      <input type="checkbox" name="hobby" value="乒乓球"  v-model="hobbies">乒乓球 -->

    <div>你的爱好是：{{hobbies}}</div>

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"zzz",
        isAgree:false,
        hobbies:[],
        oriHobbies:["篮球","足球","羽毛球","乒乓球"]
      },

    })
  </script>
</body>
</html>
```

1. checkbox结合v-model实现单选框，定义变量`isAgree`初始化为`false`，点击checkbox的值为`true`，`isAgree`也是`true`。
2. checkbox结合v-model实现多选框，定义数组对象`hobbies`，用于存放爱好，将`hobbies`与checkbox对象双向绑定，此时选中，一个多选框，就多一个true，`hobbies`就添加一个对象。



## 10.5	v-model结合select类型

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>v-model结合select类型</title>
</head>
<body>
  <div id="app">
    <!-- select单选 -->
    <select name="fruit" v-model="fruit">
      <option value="苹果">苹果</option>
      <option value="香蕉">香蕉</option>
      <option value="西瓜">西瓜</option>
    </select>
    <h2>你选择的水果是：{{fruit}}</h2>

    <!-- select多选 -->
    <select name="fruits" v-model="fruits" multiple>
      <option value="苹果">苹果</option>
      <option value="香蕉">香蕉</option>
      <option value="西瓜">西瓜</option>
    </select>
    <h2>你选择的水果是：{{fruits}}</h2>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        fruit:"苹果",
        fruits:[]
      },

    })
  </script>
</body>
```

​	v-model结合select可以单选也可以多选。

## 10.6	v-model的修饰符的使用

### 	10.6.1	lazy

- `lazy`默认情况下是实时更新数据，加上`lazy`，从输入框失去焦点，按下enter都会更新数据。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>v-model修饰符</title>
</head>
<body>
  <div id="app">
    <h2>v-model修饰符</h2>
    <h3>lazy,默认情况是实时更新数据，加上lazy，从输入框失去焦点，按下enter都会更新数据</h3>
    <input type="text" v-model.lazy="message">
    <div>{{message}}</div>
    <h3>修饰符number,默认是string类型，使用number赋值为number类型</h3>
    <input type="number" v-model.number="age">
    <div>{{age}}--{{typeof age}}</div>
    <h3>修饰符trim:去空格</h3>
    <input type="text" v-model.trim="name">

  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el:"#app",
      data:{
        message:"zzz",
        age:18,
        name:"ttt"
      },

    })
  </script>
</body>
</html>
```



![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\10.6-1.png)

### 10.6.2 number

- v-model 默认绑定成字符串。

- 使用`number`复制为number类型。

### 10.6.3 trim

- `trim`用于 自动过滤用户输入的首尾空白字符 



# （十一）组件化开发

## 11.1	组件化的基本使用

- 三步骤
  - 创建**组件构造器**
    - Vue.extend()
      - 必须有root元素
  - 注册组件
    - Vue.component()
  - 使用组件
    - 在Vue实例作用范围内使用组件

> 注意
>
> - Vue.extend()和Vue.component()必须在new Vue之前，且新标签必须使用在有定义的new Vue div中。
> - 注册组件名不能使用驼峰命名法。
> - script标签里，先创建组件，注册组件，后 new Vue 对象监听id

- 简单的组件示例

```html
  <div id="app">
    <!-- 3.使用组件 -->
    <my-cpn></my-cpn>
    <my-cpn></my-cpn>
    <my-cpn></my-cpn>
    <cpnc></cpnc>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    // 1.创建组件构造器对象
    const cpnc = Vue.extend({
      template:`
        <div>
          <h2>标题</h2>
          <p>内容1...<p>
          <p>内容2...<p>
        </div>`
    })
    // 2.注册组件
    Vue.component('my-cpn', cpnc)
    const app = new Vue({
      el:"#app",
      data:{
      },
      components:{//局部组件创建
        cpnc:cpnc
      }
    })
  </script>
```

​	 组件是可复用的 Vue 实例，且带有一个名字：在这个例子中是 `my-cpn`。我们可以在一个通过 `new Vue` 创建的 Vue 根实例中，把这个组件作为自定义元素来使用： `<my-cpn></my-cpn>`。

### 创建组件构造器对象

​	`template`中是组件的DOM元素内容。

### 注册组件

1. 全局注册，通过 `Vue.component `。
2. 局部注册，通过 `components:{cpnc:cpnc}`。



### 使用组件

​		像使用html标签一样使用。

```html
  <div id="app">
    <!-- 3.使用组件 -->
    <my-cpn></my-cpn>
    <my-cpn></my-cpn>
    <my-cpn></my-cpn>
    <cpnc></cpnc>
  </div>
```

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\11.1-1.png)

## 11.2	全局组件和局部组件

​	组件的注册方式有两种，一种是全局组件一种是局部组件。

```html
  <div id="app">
    <h2>全局组件</h2>
    <my-cpn></my-cpn>
    <h2>局部组件</h2>
    <cpnc></cpnc>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    // 1.创建组件构造器对象
    const cpnc = Vue.extend({
      template:`
        <div>
          <h2>标题</h2>
          <p>内容1</p>
          <p>内容2</p>
        </div>`
    })
    // 2.注册组件（全局组件，可以在多个vue实例中使用）
    Vue.component('my-cpn', cpnc)

    const app = new Vue({
      el:"#app",
      components:{//局部组件创建
        cpnc:cpnc
      }
    })
  </script>
```

### 全局组件

​	全局组件，可以在多个vue实例中使用，类似于全局变量。

​	使用`Vue.component('my-cpn', cpnc)`方式注册，直接使用`<my-cpn></my-cpn>`调用。`my-cpn`是全局组件的名字，`cpnc`是定义的组件对象。

### 局部组件

​	局部组件，只能在当前vue实例挂载的对象中使用，类似于局部变量，有块级作用域。

> ​	注册方式

```javascript
    const app = new Vue({
      el:"#app",
      components:{//局部组件创建
        cpnc:cpnc
      }
    })
```

​	使用方式与全局变量一样，直接使用`<cpnc></cpnc>`调用。`cpnc:cpnc`第一个cpnc是给组件命名的名字，第二个是定义的组件对象。如果俩个同名也可以直接使用es6语法：

```javascript
components:{//局部组件创建
        cpnc
}
```

## 11.3	区别父组件与子组件

> 组件1(子组件) → 组件2(父组件) → vue实例
>
> - 在哪里注册哪里就是父组件，
>
> - vue实例也可以看成最顶层的组件 （**root**）
>
> - “**附庸的附庸不是我的附庸**”

```html
  <div id="app">
    <cpn2></cpn2>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    // 1.创建组件构造器对象
    const cpn1 = Vue.extend({
      template:`
        <div>
          <h2>标题1</h2>
          <p>组件1</p>
        </div>`
    })
    // 组件2中使用组件1
    const cpn2 = Vue.extend({
      template:`
        <div>
          <h2>标题2</h2>
          <p>组件2</p>
          <cpn1></cpn1>
        </div>`,
      components:{
        cpn1:cpn1
      }
    })

    const app = new Vue({
      el:"#app",
      components:{//局部组件创建
        cpn2:cpn2
      }
    })
  </script>
```

​	上述代码中定义了两个组件对象`cpn1`和`cpn2`，在组件`cpn2`中使用局部组件注册了`cpn1`，并在`template`中使用了注册的`cpn1`，然后在vue实例中使用注册了局部组件`cpn2`，在vue实例挂载的div中调用了`cpn2`，`cpn2`与`cpn1`形成父子组件关系。



> 注意：组件就是一个vue实例，vue实例的属性，组件也可以有，例如data、methods、computed等。

## 11.4	注册组件语法糖

- 直接在注册的时候实例化

- `{}`就是一个组件对象。

- > *const* cpnC1 = Vue.extend({ template: ``})
  >
  > Vue.component('cpn1',Cpn)
  >
  > -----------------------------------------------------------------
  >
  > Vue.component('cpn1', {template: ``})   //全局注册
  >
  > components : { 'cpn2': { template: ``}   //局部注册

```html
  <div id="app">
    <cpn1></cpn1>
    <cpn2></cpn2>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    // 1.注册全局组件语法糖
    Vue.component('cpn1', {
      template:`
        <div>
          <h2>全局组件语法糖</h2>
          <p>全局组件语法糖</p>
        </div>`
    })

    const app = new Vue({
      el:"#app",
      components:{//局部组件创建
        cpn2:{
          template:`
        <div>
          <h2>局部组件语法糖</h2>
          <p>局部组件语法糖</p>
        </div>`
        }
      }
    })
  </script>
```

注册组件时候可以不实例化组件对象，直接在注册的时候实例化。`{}`就是一个组件对象。

## 11.5	组件模板的分离

> 使 html 代码与 js 代码分离

### script标签

- 使用`script`标签定义组件的模板，`script`标签注意类型是`text/x-template`。

```html
  <!-- 1.script标签注意类型是text/x-template -->
  <script type="text/x-template" id="cpn1">
    <div>
        <h2>组件模板的分离写法</h2>
        <p>script标签注意类型是text/x-template</p>
      </div>
  </script>
```

### template标签

- 使用`template`标签，将内容写在标签内。

```html
  <!-- 2.template标签 -->
  <template id="cpn2">
    <div>
      <h2>组件模板的分离写法</h2>
      <p>template标签</p>
    </div>
  </template>
```

### 调用

- 调用分离的模板，使用`template:'#cpn1'`

```html
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>

    const app = new Vue({
      el: "#app",
      components: { //局部组件创建
        cpn1:{
          template:'#cpn1'
        },
        cpn2: {
          template: '#cpn2'
        }
      }
    })
  </script>
```



## 11.6	组件的数据

### 存放问题

- 前面说过vue组件就是一个vue实例，相应的vue组件也有`data`属性来存放数据。

```html
  <div id="app">
    <cpn1></cpn1>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>

    const app = new Vue({
      el: "#app",
      components: { //局部组件创建
        cpn1:{
          template:'<div>{{msg}}</div>',
          data(){
            return {
              msg:"组件的数据存放必须要是一个函数"
            }
          }
        }
      }
    })
  </script>
```

在`template`中使用组件内部的数据`msg`。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\11.6-1.png)

### 组件的data为什么必须要是函数

- 这是js语言本身特性带来的问题
- 组件的思想是复用，定义组件当然是把通用的公共的东西抽出来复用。

```html
<div id="app">
    <h2>data不使用函数</h2>
    <cpn1></cpn1>
    <cpn1></cpn1>
    <hr>
    <h2>data使用函数</h2>
    <cpn2></cpn2>
    <cpn2></cpn2>
    <hr>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <template id="cpn1">
    <div>
      <button @click="count--">-</button>
      当前计数：{{count}}
      <button @click="count++">+</button>
    </div>
  </template>
  <template id="cpn2">
    <div>
      <button @click="count--">-</button>
      当前计数：{{count}}
      <button @click="count++">+</button>
    </div>
  </template>
  <script>
    const obj = {
      count:0
    };
    const app = new Vue({
      el: "#app",
      components: { //局部组件创建
        cpn1: {
          template: '#cpn1',
          data() {
            // 每次new的实例指向同一个对象：obj，所以实例的count都是同一个变量，相互关联
            return obj;
          }
        },
        cpn2: {
          template: '#cpn2',
          data() {
            return {
              // 每次new的实例都是一个新的内存地址，所以count变量也是不同变量
              count: 0
            }
          }
        }
      }
    })
  </script>
```

上述代码中定义了两个组件`cpn1`和`cpn2`，都是定义了两个计数器，`con1`的data虽然使用了函数，但是为了模拟`data:{count:0}`，使用了常量`obj`来返回count。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\11.6-2.gif)

图中可以看到，不使用`data`的好像共用一个`count`属性，而使用函数的`data`的count是各自用各自的，**像局部变量一样有块级作用域**，这个块级就是vue组件的作用域。

> 我们在复用组件的时候肯定希望，各自组件用各自的变量，如果确实需要都用一样的，可以全局组件注册，也可以是用vuex来进行状态管理。

> 补充
>
> - 引用数据类型
>
> - Object是引用数据类型，如果不用function返回，每个组件的data都是内存的同一个地址，一个数据改变了其他也改变了；
>
> - JavaScript只有函数构成作用域 (注意理解作用域，**只有函数{}构成作用域**,对象的 {} 以及 if(){} 都不构成作用域), data是一个函数时，每个组件实例都有自己的作用域，每个实例相互独立，不会相互影响。
>
> - 如果两个实例同事引用一个对象，那么当你修改其中一个属性的时候，另外一个实例也会跟着该；
>
> 

## 11.7	组件的通信

>  方法：通过proos向子组件传递消息、通过事件向父组件发送消息（$emit events）

- **思想：顶层数据传向下层**

### 父传子

#### `props`属性：父传子

> 1.使用子组件的`props`属性

```javascript
const cpn = {
  template: "#cpn",
  props: { 
          cmessage: {
              type: String,
              default: 'zzzzz',
              required: true //在使用组件必传值
          }
  }
}
```

> 2.向cmessage对象传值

```html
<div id="app">
    <cpn :cMessage="message"></cpn>
</div>
<script>    
const app = new Vue({
      el: "#app",
      data: {
        message: "你好",
        movies: ["复仇者联盟", "钢铁侠", "星际穿越", "哪吒传奇"]
      },
      components: {
        cpn
      }
    })
  </script>
```

#### props属性使用

##### 	数组写法

```javascript
props: ['cmovies', 'cmessage']
```

##### 	对象写法

```javascript
  props: { 
          cmessage: {
          type: String,
          default: 'zzzzz',
          required: true //在使用组件必传值
          }
  }
```

##### 	props属性的类型限制

```javascript
//1.类型限制(多个类使用数组)

cmovies:Array,//限制为数组类型
cmessage:String,//限制为Strin类型
cmessage:['String','Number']//限制为String或Number类型
```

##### 	props属性的默认值

```javascript
// 2.提供一些默认值，以及必传值
        cmessage: {
          type: String,
          default: 'zzzzz',//默认值
        }
```

##### 	props属性的必传值

```javascript
cmessage: {
          type: String,
          default: 'zzzzz',
          required: true //在使用组件必传值
        }
```

##### 	类型是Object/Array，默认值必须是一个函数

```javascript
//类型是Object/Array，默认值必须是一个函数
cmovies: {
	type: Array,
	default () {
		return [1, 2, 3, 4]
	}
},
```

##### 	自定义验证函数

```javascript
vaildator: function (value) {
	//这个传递的值必须匹配下列字符串中的一个
	return ['zzzzz', 'ttttt', 'yyy'].indexOf(value) !== -1
}
```

##### 	自定义类型

```javascript
    function Person(firstName,lastName) {
      this.firstName = firstName
      this.lastName = lastName
    }
	cmessage:Person//限定了cmeessage必须是Person类型
    //类型的标识符都以大写字母开头
```

##### 	综合使用

```html
  <div id="app">
    <cpn :cMovies="movies" :cMessage="message"></cpn>
  </div>
  <template id="cpn">
    <div>
      <ul>
        <li v-for="(item, index) in cmovies" :key="index">{{item}}</li>
      </ul>
      <h2>{{cmessage}}</h2>
    </div>
  </template>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    function Person(firstName,lastName) {
      this.firstName = firstName
      this.lastName = lastName
    }
    // 父传子：props
    const cpn = {
      template: "#cpn",
      // props: ['cmovies', 'cmessage'],//数组写法
      props: { //对象写法
        // 1.类型限制(多个类使用数组)
        // cmovies:Array,
        // cmessage:String,
        // cmessage:['String','Number'],
        // 2.提供一些默认值，以及必传值
        cmessage: {
          type: String,
          default: 'zzzzz',
          required: true //在使用组件必传值
        },
        //类型是Object/Array，默认值必须是一个函数
        cmovies: {
          type: Array,
          default () {
            return [1, 2, 3, 4]
          }
        },
        // 3.自定义验证函数
        // vaildator: function (value) {
        //   //这个传递的值必须匹配下列字符串中的一个
        //   return ['zzzzz', 'ttttt', 'yyy'].indexOf(value) !== -1
        // }
        // 4.自定义类型
        // cmessage:Person,
      },
      data() {
        return {
        }
      },
      methods: {

      },
    };
    const app = new Vue({
      el: "#app",
      data: {
        message: "你好",
        movies: ["复仇者联盟", "钢铁侠", "星际穿越", "哪吒传奇"]
      },
      components: {
        cpn
      }
    })
  </script>
```



#### props的驼峰标识

-  v-bind是 不支持使用驼峰标识的
-  `cUser`即`c-User`（绑定时）。

```html
  <div id="app">
    <!-- v-bind不支持驼峰 :cUser改成 :c-User-->
    <!-- <cpn :cUser="user"></cpn> -->
    <cpn :c-User="user"></cpn>
    <cpn :cuser="user" ></cpn>
  </div>
  <template id="cpn">
    <div>
      <!-- 使用驼峰 -->
      <h2>{{cUser}}</h2>
      <!-- 不使用 -->
      <h2>{{cuser}}</h2>
    </div>
  </template>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    // 父传子：props
    const cpn = {
      template: "#cpn",
      props: { //对象写法
        //驼峰
        cUser:Object,
        //未使用驼峰
        cuser:Object
      },
      data() {return {}},
      methods: {},
    };
    const app = new Vue({
      el: "#app",
      data: {
        user:{
          name:'zzz',
          age:18,
          height:175
        }
      },
      components: {
        cpn
      }
    })
  </script>
```

### 子传父`$emit`

- 子组件向父组件传值，使用自定义事件`$emit`。

- 核心

  - 子组件$emit() 触发事件

  - 父组件：v-on监听

#### 案例

```html
  <!-- 父组件 -->
  <div id="app">
    <!-- 不写参数默认传递btnClick的item -->
    <cpn @itemclick="cpnClcik"></cpn>

  </div>

  <!-- 子组件 -->
  <template id="cpn">

    <div>
      <button v-for="(item, index) in categoties" :key="index" @click="btnClick(item)">{{item.name}}</button>
    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    // 父传子：props
    const cpn = {
      template: "#cpn",
      data() {
        return {
          categoties: [{
              id: 'aaa',
              name: '热门推荐'
            },
            {
              id: 'bbb',
              name: '手机数码'
            },
            {
              id: 'ccc',
              name: '家用家电'
            },
            {
              id: 'ddd',
              name: '电脑办公'
            },
          ]
        }
      },
      methods: {
        btnClick(item) {
          this.$emit('itemclick', item)
        }
      },
    };
    const app = new Vue({
      el: "#app",
      data() {
        return {

        }
      },
      methods: {
        cpnClcik(item) {
          console.log('cpnClick'+item.name);
        }
      },
      components: {
        cpn
      },
    })
  </script>
```

#### 步骤

##### 1.在子组件中定义一个方法`btnClick(item)`，使用`$emit`，'itemclick'是事件名，`item`是传过去的值。

```javascript
methods: {
    btnClick(item) {
        this.$emit('itemclick', item)
    }
},
```

##### 2.在子组件中监听点击事件并回调此方法

```html
<div>
      <button v-for="(item, index) in categoties" :key="index" @click="btnClick(item)">{{item.name}}</button>
</div>
```

##### 3.在父组件中定义一个方法cpnClcik(item) 

```javascript
methods: {
	cpnClcik(item) {
		console.log('cpnClick'+item.name);
	}
},
```

##### 4.并在父组件（vue实例）中调用`<cpn @itemclick="cpnClcik"></cpn>`（*不写参数默认传递btnClick的item* ），父组件监听事件名为`itemclick`的子组件传过来的事件。

```html
<cpn @itemclick="cpnClcik"></cpn>
```

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\11.8-1.gif)

### 父子组件通信案例

- 实现父子组件的值双向绑定。

- 问题
  - 不推荐子组件直接修改父组件数据

#### 方案一

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>组件通信-父子通信案例</title>
</head>

<body>
  <!-- 父组件 -->
  <div id="app">

    <cpn :number1='num1' :number2='num2' @num1change="num1Change" @num2change="num2Change"></cpn>

    <h2>父组件{{num1}}</h2>
    <input type="text" v-model="num1" >
    <h2>父组件{{num2}}</h2>
    <input type="text" v-model="num2">

  </div>

  <!-- 子组件 -->
  <template id="cpn">

    <div>
      <h2>{{number1}}</h2>
      <h2>{{dnumber1}}</h2>
      <input type="text" :value="dnumber1" @input="num1input">
      <h2>{{number2}}</h2>
      <input type="text" :value="dnumber2" @input="num2input">
    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    // 父传子：props
    const cpn = {
      template: "#cpn",
      data() {
        return {
          dnumber1:this.number1,
          dnumber2:this.number2
        }
      },
      props:{
        number1:[Number,String],
        number2:[Number,String],
      },
      methods: {
        num1input(event){
          this.dnumber1 = event.target.value
          this.$emit('num1change',this.dnumber1)
        },
        num2input(event){
          this.dnumber2 = event.target.value
          this.$emit('num2change',this.dnumber2)
        }
      },
    };
    const app = new Vue({
      el: "#app",
      data() {
        return {
          num1:1,
          num2:2,
        }
      },
      methods: {
        num1Change(value){
          this.num1=value
        },
        num2Change(value){
          this.num1=value
        }
      },
      components: {
        cpn
      },
    })
  </script>
</body>

</html>
```

#### 方案二 使用watch实现

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>组件通信-父子通信案例(watch实现)</title>
</head>

<body>
  <!-- 父组件 -->
  <div id="app">

    <cpn :number1='num1' :number2='num2' @num1change="num1Change" @num2change="num2Change"></cpn>

    <h2>父组件{{num1}}</h2>
    <input type="text" v-model="num1" >
    <h2>父组件{{num2}}</h2>
    <input type="text" v-model="num2">

  </div>

  <!-- 子组件 -->
  <template id="cpn">

    <div>
      <h2>{{number1}}</h2>
      <input type="text" v-model="dnumber1">
      <h2>{{number2}}</h2>
      <input type="text" v-model="dnumber2">
    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    // 父传子：props
    const cpn = {
      template: "#cpn",
      data() {
        return {
          dnumber1:this.number1,
          dnumber2:this.number2
        }
      },
      props:{
        number1:[Number,String],
        number2:[Number,String],
      },
      watch: {
        dnumber1(newValue){
          this.dnumber1 = newValue * 100
          this.$emit('num1change',newValue)
        },
        dnumber2(newValue){
          this.dnumber1 = newValue * 100
          this.$emit('num2change',newValue)
        }
      },
    };
    const app = new Vue({
      el: "#app",
      data() {
        return {
          num1:1,
          num2:2,
        }
      },
      methods: {
        num1Change(value){
          this.num1=value
        },
        num2Change(value){
          this.num1=value
        }
      },
      components: {
        cpn
      },
    })
  </script>
</body>

</html>
```



## 11.8	父子组件的访问方式

### 父访问子 children-ref

- 父组件访问子组件，有时候我么你需要直接操作子组件的方法，或是属性，此时需要用到`$children`和`$ref`。

#### $children方式

- 不常用，一般获取所有子组件时使用。

```javascript
// 1.children
console.log(this.$children[0].showMessage)
for (let cpn of this.$children) {
    console.log(cpn.showMessage)
}

```

使用`this.$children`直接获取**当前实例的直接子组件，需要注意 `$children` 并不保证顺序，也不是响应式的。**如果你发现自己正在尝试使用 `$children` 来进行数据绑定，考虑使用一个数组配合 `v-for` 来生成子组件，并且使用 Array 作为真正的来源。 

#### $refs方式

- reference（引用）
- *$refs*对象类型, 默认是一个空的对象

**1.先定义子组件**

```html
<cpn ref="aaa"></cpn>
```

**2.直接调用**

#### 案例

```html
  <!-- 父组件 -->
  <div id="app">
    <cpn></cpn>
    <cpn></cpn>
    <cpn ref="aaa"></cpn>
    <button @click="btnClick" >按钮</button>
  </div>
  <!-- 子组件 -->
  <template id="cpn">
    <div>
      我是子组件
    </div>
  </template>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
  <script>
    // 父传子：props
    const cpn = {
      template: "#cpn",
      data() {
        return {
          name:"我是子组件的name"
        }
      },
      methods: {
        showMessage(){
          console.log("showMessage");
        }
      },
    };
    const app = new Vue({
      el: "#app",
      data() {
        return {
          message:"hello"
        }
      },
      methods: {
        btnClick(){
          // 1.children
          // console.log(this.$children[0].showMessage)
          // for (let cpn of this.$children) {
          //   console.log(cpn.showMessage)
          // }
          // 2.$ref
          console.log(this.$refs.aaa.name)
        }
      },
      components: {
        cpn
      },
    })
  </script>
```



### 子访问父 parent-root

#### $parent方式

```javascript
methods: {
    btnClick() {
    // 1.访问父组件$parent
	console.log(this.$parent);
	console.log(this.$parent.name);
	}
```



#### $root方式

```javascript
methods: {
    btnClick() {
	console.log(this.$root);
	console.log(this.$root.name);
	}
```









# （十二）组件化高级

## 12.1	slot-插槽的基本使用

>  概念:
>
>  - 组件的插槽是为了让我们封装的组件更具有扩展性
>  - 让**使用者**可以决定组件内部的一些内容到底展示什么
>
>  思想：
>
>  - **抽取共性，保留不同**



- 我们在使用组件的时候有时候希望，在组件内部定制化内容，例如京东这样。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\12.1-1.png)

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\12.1-2.png)

- 这两个都是导航栏，组件的思想是可以复用的，把这个导航栏看做一个组件。

- 这个组件都可以分成三个部分，左边/中间/右边，如果可以分割组件，就可以定制化组件内容了。

```html
  <!-- 父组件 -->
  <div id="app">

    <cpn></cpn>
    <cpn>
      <span style="color:red;">这是插槽内容222</span>
    </cpn>
    <cpn>
      <i style="color:red;">这是插槽内容333</i>
    </cpn>
    <cpn></cpn>

  </div>

  <!-- 插槽的基本使用使用<slot></slot> -->
  <!-- 子组件 -->
  <template id="cpn">

    <div>
      <div>
        {{message}}
      </div>
      <!-- 插槽默认值 -->
      <slot><button>button</button></slot>
    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    const cpn = {
      template: "#cpn",
      data() {
        return {
          message: "我是子组件"
        }
      },
    }
    const app = new Vue({
      el: "#app",
      data() {
        return {
          message: "我是父组件消息"
        }
      },
      components: {
        cpn
      },
    })
  </script>
```

> 简单使用插槽，定义template时候使用`slot`

```html
  <!-- 子组件 -->
  <template id="cpn">
    <div>
      <div>
        {{message}}
      </div>
      <!-- 插槽默认值：<button>button</button> -->
      <slot><button>button</button></slot>
    </div>
  </template>
```

> 插槽可以使用默认值，`<button>button</button>`就是插槽的默认值。

```html
<cpn></cpn>
<cpn><span style="color:red;">这是插槽内容222</span></cpn>
```

> 使用插槽，`<span style="color:red;">这是插槽内容222</span>`将**替换**插槽的默认值

上述代码结果如图所示

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\12.1-3.png)

> 替换了两次插槽，两次未替换显示默认的button。
>
> 如果想实现组件分成三部分就可以使用三个`<slot></slot>`来填充插槽了。



## 12.2	slot-具名插槽的使用

- 具名插槽，就是可以让插槽按指定的顺序填充，而没有具名的插槽是按照你填充的顺序排列的，而具名插槽可以自定义排列。

```html
<!-- 父组件 -->
  <div id="app">

    <cpn>
      <span>没具名</span>
      <span slot="left">这是左边具名插槽</span>
      <!-- 新语法 -->
      <template v-slot:center>这是中间具名插槽</template>
      <!-- 新语法缩写 -->
      <template #right>这是右边具名插槽</template>


    </cpn>


  </div>

  <!-- 插槽的基本使用使用<slot></slot> -->
  <!-- 子组件 -->
  <template id="cpn">

    <div>

      <slot name="left">左边</slot>
      <slot name="center">中间</slot>
      <slot name="right">右边</slot>
      <slot>没有具名的插槽</slot>
    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    const cpn = {
      template: "#cpn",
      data() {
        return {
          message: "我是子组件"
        }
      },
    }
    const app = new Vue({
      el: "#app",
      data() {
        return {
          message: "我是父组件消息"
        }
      },
      components: {
        cpn
      },
    })
  </script>
```

> 如图所示

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\12.2-1.png)

> 没有具名的插槽排在最后，因为在定义组件的时候，排在了最后，如果有多个按顺序排列。具名插槽按照自定义的顺序排列。

> 定义具名插槽，使用`name`属性，给插槽定义一个名字。

```html
  <!-- 插槽的基本使用使用<slot></slot> -->
  <!-- 子组件模板 -->
  <template id="cpn">
    <div>
      <slot name="left">左边</slot>
      <slot name="center">中间</slot>
      <slot name="right">右边</slot>
      <slot>没有具名的插槽</slot>
    </div>
  </template>
```

> 使用具名插槽，在自定义组件标签内使用`slot="left"`，插入指定插槽

```html
  <!-- 父组件 -->
  <div id="app">
    <cpn>
      <span>没具名</span>
      <span slot="left">这是左边具名插槽</span>
      <!-- 新语法 -->
      <template v-slot:center>这是中间具名插槽</template>
      <!-- 新语法缩写 -->
      <template #right>这是右边具名插槽</template>
    </cpn>
  </div>
```

> 注意：此处有是三种写法，获取指定插槽。



## 12.3	编译的作用域

- 前面说过组件都有自己的作用域，自己组件的作用在自己组件内。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>编译的作用域</title>
</head>
<body>
  <!-- 父组件 -->
  <div id="app">
    <!-- 使用的vue实例作用域的isShow -->
    <cpn v-show="isShow"></cpn>
  </div>
<!-- 插槽的基本使用使用<slot></slot> -->
  <!-- 子组件 -->
  <template id="cpn">
    <div>
      <h2>我是子组件</h2>
      <p>哈哈哈</p>
      <!-- 组件作用域，使用的子组件的作用域 -->
      <button v-show="isShow"></button>
    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    const cpn = {
      template: "#cpn",
      data() {
        return {
          isShwo:false
        }
      },
    }
    const app = new Vue({
      el: "#app",
      data() {
        return {
          message: "我是父组件消息",
          isShow:true
        }
      },
      components: {
        cpn
      },
    })
  </script>
</body>

</html>
```

结果如下

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\12.3-1.png)

> 子组件使用的是子组件的isShow，子组件为false，所以button没显示，被隐藏。

## 12.4	作用域插槽案例

- 目的：父组件替换插槽的标签，但是内容是由子组件来提供。
- **同一组数据，不同展示方式**

- 当组件需要在多个父组件多个界面展示的时候，将内容放在子组件插槽中，父组件只需要告诉子组件使用什么方式展示界面。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>作用域插槽案例</title>
</head>

<body>


  <!-- 父组件 -->
  <div id="app">
    <cpn></cpn>
    <!-- 目的是获取子组件数据 -->
    <cpn>
      <!-- 2.5以下必须使用template -->
      <template slot-scope="slot">
        <!-- <span v-for="(item, index) in slot.data" :key="index">{{item}}-</span> -->
        <span>{{slot.data.join(' - ')}}</span>
      </template>
    </cpn>
    <cpn>
        <!-- 2.5以下必须使用template -->
        <template slot-scope="slot">
          <!-- <span v-for="(item, index) in slot.data" :key="index">{{item}}*</span> -->
          <span>{{slot.data.join(' * ')}}</span>
        </template>
      </cpn>
  </div>

<!-- 插槽的基本使用使用<slot></slot> -->
  <!-- 子组件 -->
  <template id="cpn">

    <div>
      <slot :data="pLanguage">
          <ul>
              <li v-for="(item, index) in pLanguage" :key="index">{{item}}</li>
            </ul>
      </slot>

    </div>
  </template>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>

  <script>
    const cpn = {
      template: "#cpn",
      data() {
        return {
          isShwo:false,
          pLanguage:['JavaScript','Java','C++','C']
        }
      },
    }
    const app = new Vue({
      el: "#app",
      data() {
        return {
          isShow:true
        }
      },
      components: {
        cpn
      },
    })
  </script>
</body>

</html>
```

> 组件中使用`slot-scope="slot"`**（2.6.0已经废弃）**给插槽属性命名，在通过`slot`调用绑定在插槽上的属性。也可以使用`v-slot="slot"`。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\12.4-1.png)







# （十三）Vue实例的生命周期

## 13.1	 <span id="top">生命周期图</span>

Vue实例的生命周期中有多个状态。

![lifecycle1](C:\Users\86136\Desktop\repository\DailyCode\source_BASIS\Stage10.0-Vue\VueLearnNotes-master\VueLearnNotes-master\13-Vue实例的生命周期\images\lifecycle1.png)



> 测试代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Vue实例的生命周期</title>

    <!-- 引入vue.js -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
</head>
<body>
    <div id="app">
        <h1>测试生命周期</h1>
        <div>{{msg}}</div>
        <hr>
        <h3>测试beforeUpdate和update两个钩子函数</h3>
        <button @click="handlerUpdate">更新数据</button>
    </div>
    <script>
        var app = new Vue({
            el:"#app",
            data:{
                msg:"12345"
            },
            methods: {
                handlerUpdate:function(){
                    this.msg=this.msg.split("").reverse().join("");
                },
            },//按照示意图依次调用
            beforeCreate:function(){
                console.log("调用了beforeCreate钩子函数");
            },
            created:function () {
                console.log("调用了created钩子函数");
            },
            beforeMount: function () {
                console.log('调用了beforeMount钩子函数')
            },
            mounted: function () {
                console.log('调用了mounted钩子函数')
            },
            beforeUpdate: function () {
                console.log("调用了beforeUpdate钩子函数")
            },
            updated: function () {
                console.log("调用了updated钩子函数");
            },
            beforeDestroy: function () {
                console.log("调用了beforeDestroy钩子函数")
            },
            destroyed: function () {
                console.log("调用了destroyed钩子函数");
            },
        });
    </script>
</body>
</html>
```

如图所示：

![reslut](C:\Users\86136\Desktop\repository\notes\13-Vue\images\1.png)

初始化页面依次调用了：

> 1. 调用了beforeCreate钩子函数
> 2. 调用了created钩子函数
> 3. 调用了beforeMount钩子函数
> 4. 调用了mounted钩子函数

点击更新数据后：

`12345`变成了`54321`，此时调用了：

> 1. 调用了beforeUpdate钩子函数
> 2. 调用了updated钩子函数

打开F12控制台
直接输入`app.$destroy()`主动销毁Vue实例调用：

>1. 调用了beforeDestroy钩子函数
>2. 调用了destroyed钩子函数

## 13.2	再探究

### 13.2.1	beforeCreate之前

初始化钩子函数和生命周期

### 13.2.2	beforeCreate和created钩子函数间的生命周期

在beforeCreate和created之间，进行数据观测(data observer) ，也就是在这个时候开始监控data中的数据变化了，同时初始化事件。
<span style="float:right;">[生命周期展示图](#1)</span>

### 13.2.3	created钩子函数和beforeMount间的生命周期

对于created钩子函数和beforeMount有判断：
![2](C:\Users\86136\Desktop\repository\notes\13-Vue\images\2.png)

#### 13.2.3.1el选项对生命周期影响

>1. 有el选项

    new Vue({
        el: '#app',
        beforeCreate: function () {
            console.log('调用了beforeCreat钩子函数')
        },
        created: function () {
            console.log('调用了created钩子函数')
        },
        beforeMount: function () {
            console.log('调用了beforeMount钩子函数')
        },
        mounted: function () {
            console.log('调用了mounted钩子函数')
        }
    })

结果:
![有el](C:\Users\86136\Desktop\repository\notes\13-Vue\images\3.png)

>2. 无el选项

    new Vue({
        beforeCreate: function () {
            console.log('调用了beforeCreat钩子函数')
        },
        created: function () {
            console.log('调用了created钩子函数')
        },
        beforeMount: function () {
            console.log('调用了beforeMount钩子函数')
        },
        mounted: function () {
            console.log('调用了mounted钩子函数')
        }
    })

结果：
![无el](C:\Users\86136\Desktop\repository\notes\13-Vue\images\4.png)

>证明没有el选项，则停止编译，也意味着暂时停止了生命周期。生命周期到created钩子函数就结束了。而当我们不加el选项，但是手动执行vm.$mount(el)方法的话，也能够使暂停的生命周期进行下去，例如：

    var app = new Vue({
        beforeCreate: function () {
            console.log('调用了beforeCreat钩子函数')
        },
        created: function () {
            console.log('调用了created钩子函数')
        },
        beforeMount: function () {
            console.log('调用了beforeMount钩子函数')
        },
        mounted: function () {
            console.log('调用了mounted钩子函数')
        }
    })
    app.$mount('#app')

结果：
![有el](C:\Users\86136\Desktop\repository\notes\13-Vue\images\3.png)

#### 13.2.3.2	template

![template](C:\Users\86136\Desktop\repository\notes\13-Vue\images\5.png)

>同时使用`template`和`HTML`，查看优先级：

        <h1>测试template和HTML的优先级</h1>
        <div id="app">
            <p>HTML优先</p>
        </div>
        <script>
            var app = new Vue({
                el:"#app",
                data:{
                    msg:"template优先"
                },
                template:"<p>{{msg}}</p>",
            });
        </script>

结果：
![template](C:\Users\86136\Desktop\repository\notes\13-Vue\images\6.png)

>结论

1. 如果Vue实例对象中有template参数选项，则将其作为模板编译成render函数
2. 如果没有template参数选项，则将外部的HTML作为模板编译（template），也就是说，template参数选项的优先级要比外部的HTML高
3. 如果1,2条件都不具备，则报错

>注意

1. Vue需要通过el去找对应的template，Vue实例通过el的参数，首先找自己有没有template，如果没有再去找外部的html，找到后将其编译成render函数。
2. 也可以直接调用[render](https://cn.vuejs.org/v2/api/#render)选项，优先级：`render函数选项  > template参数  > 外部HTML`。

<hr>



    new Vue({
        el: '#app',
        render (createElement) {
            return (....)
        }
    })

### 13.2.4	beforeMount和mounted钩子函数间的生命周期

![7](C:\Users\86136\Desktop\repository\notes\13-Vue\images\7.png)

>beforeMount

载入前（完成了data和el数据初始化），但是页面中的内容还是vue中的占位符，data中的message信息没有被挂在到Dom节点中，在这里可以在渲染前最后一次更改数据的机会，不会触发其他的钩子函数，一般可以在这里做初始数据的获取。

>Mount

载入后html已经渲染(ajax请求可以放在这个函数中)，把vue实例中的data里的message挂载到DOM节点中去

>这里两个钩子函数间是载入数据。

### 13.2.5	beforeUpdate钩子函数和updated钩子函数间的生命周期

![8](C:\Users\86136\Desktop\repository\notes\13-Vue\images\8.png)
在Vue中，修改数据会导致重新渲染，依次调用beforeUpdate钩子函数和updated钩子函数

如果待修改的数据没有载入模板中，不会调用这里两个钩子函数

    var app = new Vue({
        el: '#app',
        data: {
            msg: 1
        },
        template: '<div id="app"><p></p></div>',
        beforeUpdate: function () {
            console.log('调用了beforeUpdate钩子函数')
        },
        updated: function () {
            console.log('调用了updated钩子函数')
        }
    })
    app.msg = 2

结果：
![9](C:\Users\86136\Desktop\repository\notes\13-Vue\images\9.png)
如果绑定了数据，会调用两个钩子函数：

    <h1>测试有数据绑定修改数据，钩子函数调用情况</h1>
    <div id="app">
    </div>
    <script>
        var app = new Vue({
            el:"#app",
            template:"<p>{{msg}}</p>",
            data:{
                msg:"原数据"
            },
            beforeUpdate: function () {
                console.log("调用了beforeUpdate钩子函数")
            },
            updated: function () {
                console.log("调用了updated钩子函数");
            },
        });
        app.msg = "数据被修改了";
    </script>

结果：
![10](C:\Users\86136\Desktop\repository\notes\13-Vue\images\10.png)

>注意只有写入模板的数据才会被追踪

### 13.2.6	beforeDestroy和destroyed钩子函数间的生命周期

![11](C:\Users\86136\Desktop\repository\notes\13-Vue\images\11.png)

#### 13.2.6.1	beforeDestroy

销毁前执行（$destroy方法被调用的时候就会执行）,一般在这里善后:清除计时器、清除非指令绑定的事件等等…’)

#### 13.2.6.2	destroyed

销毁后 （Dom元素存在，只是不再受vue控制）,卸载watcher，事件监听，子组件

>总结

- beforecreate : 可以在这加个loading事件
- created ：在这结束loading，还做一些初始数据的获取，实现函数自-执行
- mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情
- beforeDestroy： 你确认删除XX吗？
- destroyed ：当前组件已被删除，清空相关内容







# （十四）前端模块化

## 14.1	为什么要有模块化

- 随着前端项目越来越大，团队人数越来越多，多人协调开发一个项目成为常态。例如现在小明和小张共同开发一个项目，小明定义一个aaa.js，小张定义了一个bbb.js。

> aaa.js

```javascript
//小明开发
var name = '小明'
var age = 22

function sum(num1, num2) {
  return num1 + num2
}
var flag = true
if (flag) {
  console.log(sum(10, 20));
}
```

- 此时小明的`sum`是没有问题的。

> bbb.js

```javascript
//小红
var name = "小红"
var flag = false
```

- 此时小明和小红各自用各自的`flag`你变量没问题。

> 但是此时小明又创建了一个mmm.js

```javascript
//小明
if(flag){
  console.log("flag是true")
}
```

- 在index.html页面导入这些js文件

```php+HTML
  <script src="aaa.js" ></script>
  <script src="bbb.js" ></script>
  <script src="ccc.js" ></script>
```

- 此时小明知道自己在aaa.js中定义的`flag`是`true`，认为打印没有问题，但是不知道小红的bbb.js中也定义了`flag`为`true`，所以mmm.js文件并没有打印出“flag是true”。

> 这就是全局变量同名问题。

## 14.2	使用导出全局变量模块解决全局变量同名问题

> aaa.js

```javascript
//模块对象
var moduleA = (function (param) {
  //导出对象
  var obj = {}
  var name = '小明'
  var age = 22

  function sum(num1, num2) {
    return num1 + num2
  }
  var flag = true
  if (flag) {
    console.log(sum(10, 20))
  }
  obj.flag=false
  return obj
})()
```

> mmm.js

```javascript
//小明
//使用全局变量moduleA
if(moduleA.flag){
  console.log("flag是true")
}
```

这样直接使用aaa.js导出的moduleA变量获取小明自己定义的`flag`。

## 14.3 CommonJS的模块化实现

​	CommonJS需要nodeJS的依支持。

> aaa.js

```javascript
//CommonJS需要nodeJS支持
var name = '小明'
var age = 22

function sum(num1, num2) {
  return num1 + num2
}
var flag = true
if (flag) {
  console.log(sum(10, 20))
}

// module.exports = {
//   flag : flag,
//   sum : sum
// }
//导出对象
module.exports = {
  flag,
  sum
}
```

使用`module.exports = {}`导出需要的对象。

> mmm.js

```javascript
//导入对象,nodejs语法,需要node支持,从aaa.js取出对象
var {flag,sum} = require("./aaa")

console.log(sum(10,20));

if(flag){
  console.log("flag is true");
}
```

使用 `var {flag,sum} = require("./aaa")`获取已经导出的对象中自己所需要的对象。

## ES6的模块化实现

​	如何实现模块化，在html中需要使用`type='module'`属性。

```html
  <script src="aaa.js" type="module"></script>
  <script src="bbb.js" type="module"></script>
  <script src="mmm.js" type="module"></script>
```

此时表示aaa.js是一个单独的模块，此模块是有作用域的。如果要使用aaa.js内的变量，需要在aaa.js中先导出变量，再在需要使用的地方导出变量。

### 14.4.1	直接导出

```javascript
export let name = '小明'
```

> 使用

```javascript
import {name} from './aaa.js'
console.log(name)
```

`./aaa.js`表示aaa.js和mmm.js在同级目录。

如图打印结果。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\14.4-1.png)



### 14.4.2	统一导出

```javascript
var age = 22
function sum(num1, num2) {
  return num1 + num2
}
var flag = true
if (flag) {
  console.log(sum(10, 20))
}
//2.最后统一导出
export {
  flag,sum,age
}
```

> 使用`import {name,flag,sum} from './aaa.js'`导入多个变量

```javascript
import {name,flag,sum} from './aaa.js'

console.log(name)

if(flag){
  console.log("小明是天才");
}

console.log(sum(20,30));
```

> 使用{}将需要的变量放置进去

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\14.4-2.png)



### 14.4.3	导出函数/类

> 在aaa.js中添加

```javascript
//3.导出函数/类
export function say(value) {
  console.log(value);
}
export class Person{
  run(){
    console.log("奔跑");
  }
}
```

> 在mmm.js中添加

```javascript
import {name,flag,sum,say,Person} from './aaa.js'

console.log(name)

if(flag){
  console.log("小明是天才");
}

console.log(sum(20,30));

say('hello')
const p = new Person();
p.run();
```

> 如图

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\14.4-3.png)

### 14.4.4	默认导入 export default

> 导出
>
> - 一个模块只允许有一个default

```javascript
export default {
  flag,sum,age
}
```

> 导入

```javascript
//4.默认导入 export default
import aaa from './aaa.js'
console.log(aaa.sum(10,110));
```

> 注意：使用默认导出会将所有需要导出的变量打包成一个对象，此时导出一个对象，此时我在`mmm.js`中导入变量时候命名为aaa，如果要调用变量需要使用aaa.变量。

### 14.4.5	统一全部导入

> 使用`import * as aaa from './aaa.js'`统一全部导入

```javascript
// 5.统一全部导入
import * as aaa from './aaa.js'
console.log(aaa.flag);
console.log(aaa.name);
```





# （十五）webpack

## 15.1	webpack起步

### 15.1.1	什么是webpack

webpack是一个JavaScript应用的静态模块打包工具。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-1.png)

从这句话中有两个要点，**模块**和**打包**需要关注。**grunt/gulp**都可以打包，那有什么区别。

> 模块化

webpack可以支持前端模块化的一些方案，例如AMD、CMD、CommonJS、ES6。可以处理模块之间的依赖关系。不仅仅是js文件可以模块化，图片、css、json文件等等都可以模块化。

> 打包

webpack可以将模块资源打包成一个或者多个包，并且在打包过程中可以处理资源，例如压缩图片，将scss转成css，ES6语法转成ES5语法，将TypeScript转成JavaScript等等操作。**grunt/gulp**也可以打包。

**和grunt/glup的对比**

- grunt/glup的核心是Task
  - 我们可以配置一系列的task，并且定义task要处理的事务（例如ES6/TS转化，图片压缩，scss转css）
  - 之后可以让grunt/glup来执行依次这些任务，让整个流程自动化
  - 所以grunt/glup也被称为前端自动化任务管理工具
- 看一个gulp例子
  - task将src下的js文件转化为ES5语法
  - 并输入到dist文件夹中

<pre>const gulp = require('gulp')
    const babel = require('gulp-babel')
    gulp.task('js'()=>
      gulp.src('src/*.js')
        .pipe(babel({
          presets:['es2015']
        }))
        .pipe(gulp.dest('dist'))
    );
</pre>


- 什么时候使用grunt/gulp呢？
  - 如果工程依赖简单，甚至没有模块化
  - 只需要进行简单的合并/压缩
  - 如果模块复杂，相互依赖性强，我们需要使用webpack
- grunt/glup和webpack区别
  - grunt/glup更加强调的是前端自动化流程，模块化不是其核心
  - webpack加强模块化开发管理，而文件压缩/合并/预处理等功能，是附带功能

webpack就是前端模块化打包工具

### 15.1.2	webpack的安装

1. webpack依赖node环境。
2. node环境依赖众多包，所以需要npm，npm（node packages manager）node包管理工具
3. nvm是node管理工具可以自由切换node环境版本

**全局安装webpack**

```shell
npm install webpack -g
//指定版本安装
npm install webpack@3.6.0 -g
```

> 由于vue-cli2基于webpack3.6.0
> 如果要用vue-cli2的可以使用`npm install webpack@3.6.0 -g`

**局部安装**

```shell
npm install webpack --save-dev
```

- 在终端执行webpack命令，使用的是全局安装。

- 当在package.json中定义了scripts时，其中包括了webpack命令，那么使用的是局部webpack

### 15.1.3    起步

新建一个文件夹，新建如下结构的目录：

**目录结构**

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-2.png)

如图所示在src文件夹（源码文件夹），dist（要发布的文件，已经处理过的）。

**1.新建入口js文件`main.js`和`mathUtils.js`，`main.js`依赖`mathUtils.js`。**

> mathUtils

```javascript
//1.新建mathUtils.js，用CommonJs规范导出
function add(num1,num2) {
  return num1+num2
}
function mul(num1,num2) {
  return num1*num2
}
module.exports = {
  add,mul
}
```

> main.js

```javascript
//2.新建入口js文件main.js 导入mathUtil.js文件，并调用
const {add,mul} = require("./mathUtils.js")

console.log(add(10,20))
console.log(mul(10,10))
```

**2.使用webpack命令打包js文件**

> 注意：webpack3使用`webpack ./src/main.js ./dist/bundle.js`
>
> webpack4，webpack打包在01-webpack的起步目录下打开终端 `webpack ./scr/main.js -o ./dist/bundle.js`

我全局安装的是webpack@3.6.0，所以在根路径执行

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-3.png)

如图显示打包成功，查看dist文件夹下自动生成了一个`bundle.js`。

> bundle.js

```javascript
//2.新建入口js文件main.js 导入mathUtil.js文件，并调用
const {add,mul} = __webpack_require__(1)

console.log(add(10,20))
console.log(mul(10,10))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

//1.新建mathUtils.js，用CommonJs规范导出
function add(num1,num2) {
  return num1+num2
}
function mul(num1,num2) {
  return num1*num2
}
module.exports = {
  add,mul
}

```

内容很多，其中包含mathUtils.js和main.js 内容，打包成功。

**3.新建一个index.html文件，导入bundle.js**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>webpack入门</title>
</head>
<body>
  <!-- 3.新建一个indexhtml文件并使用 webpack ./src/main.js ./dist/bundle.js webpack3使用此命令 -->
  <!-- 4.引用webpack打包后的js文件 -->
  <script src="./dist/bundle.js"></script>
</body>
</html>
```

如图测试，打印成功。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-4.png)

**4.新建一个`info.js`使用ES6的语法导出**

> info.js

```javascript
//es6语法导出
export default {
  name:'zzz',
  age:24,
}
```

> main.js导入info.js

```javascript
//使用es6语法导入
import info from './info.js'

console.log(info.name)
console.log(info.age)
```

> 再次使用`webpack ./src/main.js ./dist/bundle.js`，重新打包

**5.打开index.html测试**

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-5.png)

> 总结

webpack可以帮我们打包js文件，只要指定入口文件（main.js）和输出的文件（bundle.js），不管是es6的模块化还是CommonJs的模块化，webpack都可以帮我们打包，还可以帮我们处理模块之间的依赖。

## 15.2	webpack的配置

### 15.2.1	基本配置

如果每次都用webpack命令自己写入口文件和出口文件会很麻烦，此时我们可以使用webpack的配置。

> 准备工作：复制**01-webpack的起步**文件夹并粘贴在同级目录，改名为**02-webpack的配置**。

#### webpack.config.js

**1.在根目录（02-webpack的配置）下新建一个`webpack.config.js`**

```javascript
//1.导入node的path包获取绝对路径，需要使用npm init初始化node包
const path = require('path')

//2.配置webpack的入口和出口
module.exports = {
  entry: './src/main.js',//入口文件
  output:{
    path: path.resolve(__dirname, 'dist'),//动态获取打包后的文件路径,path.resolve拼接路径
    filename: 'bundle.js'//打包后的文件名
  }
}
```

**2.在02-webpack的配置根目录执行`npm init`初始化node包，因为配置文件中用到了node的path包**

```shell
npm init 
```

初始化

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-6.png)

**3.使用webpack打包**

```shell
webkpack
```

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-7.png)

这样入口和出口的配置已经配置完成了，只需要使用webpack命令就行了。

4.使用自定义脚本（script）启动

一般来是我们使用的是

```shell
npm run dev//开发环境
npm run build//生产环境
```

#### package.json

- 在package.json中的script中加上映射：

```json
"build": "webpack"
```

- 使用`npm run build`相当于`webpack`命令

```shell
npm run build
```

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-8.png)

### 15.2.2	全局安装和局部安装

- webpack有全局安装和局部安装。

- **使用`npm run build`执行webpack会先从本地查找是否有webpack，如果没有会使用全局的。**

- 此时本地需要安装webapck

```shell
npm install webpack@3.6.0 --save-dev
```

- package.json中自动加上开发时的依赖`devDependencies`
  - 区别运行时依赖：dependencies

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-9.png)

再次使用`npm run build`，使用的是本地webpack版本。

## 15.3	webpack的loader

### 什么是loader

- loader是webpack中一个非常核心的概念。

- webpack可以将js、图片、css处理打包，但是对于webpack本身是不能处理css、图片、ES6转ES5等。

- 此时就需要webpack的扩展，使用对应的loader就可以。

#### **loader使用**

- 步骤

  - 步骤一：通过npm安装需要使用的loader

  - 步骤二：通过webpack.config.js中的modules关键字下进行配置

- 大部分loader可以在webpack的官网找到对应的配置。



### CSS文件处理	

**1.将除了入口文件（main.js）所有js文件放在js文件夹，新建一个css文件夹，新建一个normal.css文件**

> normal.css

```css
body{
  background-color: red;
}
```

**2.main.js导入依赖**

```javascript
//4.依赖css文件
require('./css/normal.css')
```

此时如果直接进行打包`npm run build`。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-10.png)

> 提示信息很清楚，打包到css文件时报错，提示我们可能需要一个loader来处理css文件。

**3.安装css-loader**

```shell
npm install --save-dev css-loader
```

**4.使用css-loader**

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,//正则表达式匹配css文件
        //css-loader只负责css文件加载，不负责解析，要解析需要使用style-loader
        use: [{
          loader: 'css-loader'
        }]//使用loader
      }
    ]
  }
}
```

> 执行`npm run build`，提示打包成功，但是背景色并没有变红色，是因为css-loader只负责加载css文件，不负责解析，如果要将样式解析到dom元素中需要使用style-loader。

5.安装使用style-loader

```shell
npm install --save-dev style-loader
```

```javascript
  module: {
    rules: [
      {
        test: /\.css$/,//正则表达式匹配css文件
        //css-loader只负责css文件加载，不负责解析，要解析需要使用style-loader
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]//使用loader
      }
    ]
  }
```

> 注意：webpack使用多个loader是**从右往左解析**的，所以需要将css-loader放在style-loader右边，先加载后解析。

此时样式成加载解析到DOM元素上。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-11.png)



### less文件处理

**1.在css文件夹中新增一个less文件**

> special.less

```less
@fontSize:50px;//定义变量字体大小
@fontColor:orange;//定义变量字体颜色
body{
  font-size: @fontSize;
  color: @fontColor;
}
```

**2.main.js中导入less文件模块**

```javascript
//5.依赖less文件
require('./css/special.less')
//6.向页面写入一些内容
document.writeln("hello,zzzz!")
```

**3.安装使用less-loader**

```shell
npm install --save-dev less-loader less
```

在`webpack.config.js`中使用less-loader

```javascript
  module: {
    rules: [
      {
        test: /\.less$/,//正则表达式匹配css文件
        //css-loader只负责css文件加载，不负责解析，要解析需要使用style-loader
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'//less文件loader
        }]//使用loader
      }
    ]
  }
```

**4.执行npm run build**

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-12.png)

less文件生效了，字体是orange，大小为50px。



### 图片文件的处理

> 准备工作，准备两张图片，图片大小为一张8KB以下（实际大小为5KB，名称为small.jpg），一张大于8KB（实际大小为10KB，名称为big.jpg），新建一个img文件夹将两张图片放入。

**1.修改normal.css样式，先使用小图片作为背景**

```
body{
  /* background-color: red; */
  background: url("../img/small.jpg");
}
```

- 此时如果直接使用npm run build 直接打包会报错，因为css文件中引用了图片url，此时需要使用**url-loader**。

**2.安装使用url-loader处理图片**

- url-loader像 file loader 一样工作，但如果文件小于限制，可以返回 [data URL](https://tools.ietf.org/html/rfc2397) 。

```shell
npm install --save-dev url-loader
```

- 配置

```javascript
{
        test: /\.(png|jpg|gif)$/,//匹配png/jpg/gif格式图片
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192//图片小于8KB时候将图片转成base64字符串，大于8KB需要使用file-loader
            }
          }
        ]
      }
```

> limit属性
>
> - 图片小于8KB时候将图片转成base64字符串，直接响应给浏览器（字符串）
> - 大于8KB需要使用file-loader，被打包后放在dist一起发给浏览器（图片）

**3.打包**

- 使用npm run build打包后，打开index.html。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-13.png)

> 小于`limit`大小的图片地址被编译成base64格式的字符串。

- 此时修改css文件，使用big.jpg做背景。

```css
body{
  /* background-color: red; */
  /* background: url("../img/small.jpg"); */
  background: url("../img/big.jpg");
}
```

- 再次打包，报错，提示未找到file-loader模块。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-14.png)

> 因为大于`limit`的图片需要`file-loader`来打包。

**4.安装使用file-loader处理图片**

```shell
npm install --save-dev file-loader
```

- 不需要配置，因为url-loader超过limit的图片会直接使用file-loader。

再次打包，没有报错，打包成功，但是图片未显示。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-15.png)

> 1.当加载的图片大小小于limit，使用base64将图片编译成字符串
>
> 2.当加载的图片大小大于limit，使用file-loader模块直接将big.jpg直接打包到dist文件夹，文件名会使用hash值防止重复。
>
> 3.此时由于文件路径不对所以导致没有加载到图片

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-16.png)

**5.如何使用file-loader，指定路径**

修改output属性  publicPath: 'dist/'

```javascript
  output:{
    path: path.resolve(__dirname, 'dist'),//动态获取打包后的文件路径,path.resolve拼接路径
    filename: 'bundle.js',//打包后的文件名
    publicPath: 'dist/'
  },
```

此时打包，图片正常显示

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-17.png)



> 注意：一般来说，index.html最终也会打包到dist文件夹下，所以，并不需要配置publicPath，如何打包index.html请看webpack处理.vue文件。

> file-loader打包后，使用hash值做文件名太长，此时可以使用options的一些配置。

```javascript
options: {
              limit: 8192,
              name: 'img/[name].[hash:8].[ext]'
            }
```

> 修改options，加上name属性，其中img表示文件父目录，[name]表示文件名（原文件名）,[hash:8]表示将hash截取8位，[ext]表示后缀

再次打包

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-18.png)



### ES6语法处理

- webpack打包时候ES6语法没有打包成ES5语法，如果需要将ES6打包成ES5语法，那么就需要使用**babel**。直接使用babel对应的loader就可以了。

#### 安装

```shell
npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
```

#### 配置

```javascript
      {
        test: /\.js$/,
        //排除node模块的js和bower的js
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // presets: ['@babel/preset-env']
            //这里直接使用指定
            presets: ['es2015']
          }
        }
      }
```

> 1.如果要使用@babel/preset-env这里需要在根目录新建一个babel的文件
>
> 2.**exclude**排除不需要打包的文件



## 15.4	webpack的vue

### 简单安装使用vue

- 如果需要使用vue，必须使用npm先安装vue。

```shell
npm install vue --save	
```

- 使用vue简单开发。

> 准备工作

- 复制`03-webpack的loader`到同级目录，改名为`04-webpack的vue`，并在`04-webpack的vue`根目录执行`npm install vue --save	`，下载安装vue。

**1.在入口文件main.js导入已安装的vue，并在index.html声明要挂载的div。在main.js加入以下代码。**

```javascript
//6.使用vue开发
import Vue from 'vue'

const app = new Vue({
  el: "#app",
  data: {
    message: "hello webpack and vue"
  }
})
```

- 修改index.html代码，添加

```html
  <div id="app">
    <h2>{{message}}</h2>
  </div>
```

**2.再次打包`npm run build`后打开index.html**

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-19.png)

- 发现message并没有正确显示，打开console发现vue报错。错误提示我们，正在使用`runtime-only`构建，不能将template模板编译。

> 1.`runtime-only`模式，**代码中不可以有任何template**，因为无法解析。
>
> 2.`runtime-complier`模式，代码中可以有template，因为complier可以用于编译template。

- 在webpack中配置，设置指定使用`runtime-complier`模式。

> webpack.config.js

```javascript
  resolve: {
    // alias:别名
    alias: {
        //指定vue使用vue.esm.js
      'vue$':'vue/dist/vue.esm.js'
    }
  }
```

**3.重新打包，显示正确**

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-20.png)



### 如何分步抽取实现vue模块

> 创建vue的template和el关系
>
> - el表示挂载**DOM**的挂载点
>
> - template里面的**html**将替换挂载点

- 一般我们使用vue会开发单页面富应用(single page application)，只有一个index.html，而且index.html都是简单结构。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>webpack入门</title>
</head>
<body>
  <div id="app">
  </div>
  <script src="./dist/bundle.js"></script>
</body>
</html>
```

**1.第一次抽取，使用template替换`<div id="app"></div>`。**

> 修改mian.js的vue相关代码

```javascript
//6.使用vue开发
import Vue from 'vue'

new Vue({
  el: "#app",
  template:`
  <div>
    <h2>{{message}}</h2>
    <button @click='btnClick'>这是一个按钮</button>
    <h2>{{name}}</h2>
  </div>
  `,
  data: {
    message: "hello webpack and vue",
    name: 'zzzz'
  },
  methods: {
    btnClick(){
      console.log("按钮被点击了")
    }
  },
})
```

- 使用template模板替换挂载的id为app的div元素，此时不需要修改html代码了，只需要写template。

- 再次打包，显示成功。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-21.png)

**2.第二次抽取，使用组件化思想替换template**

- 考虑第一次抽取，写在template中，main.js的vue代码太冗余。

> 修改main.js的代码

```javascript
//1.定义一个组件
const App = {
  template: `
  <div>
    <h2>{{message}}</h2>
    <button @click='btnClick'>这是一个按钮</button>
    <h2>{{name}}</h2>
  </div>
  `,
  data() {
    return {
      message: "hello webpack and vue",
      name: 'zzzz'
    }
  },
  methods: {
    btnClick(){
      console.log("按钮被点击了")
    }
  },
}
```

> 修改main.js，vue实例中注册组件，并使用组件

```javascript
new Vue({
  el: "#app",
  //使用组件
  template: '<App/>',
  components: {
    //注册局部组件
    App
  }
})
```

再次使用`npm run build`打包，打包成功，显示和使用template替换div一样。

**3.第三次抽取组件对象，封装到新的js文件，并使用模块化导入main.js**

此处我的vue-loader是15.7.2。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-24.png)

将其修改为13.0.0

```json
"vue-loader": "^13.0.0"
```

重新安装版本

```shell
npm install
```

再次打包，打包成功，样式生效了。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-25.png)

**6.组件化开发**

我们使用app.vue分离了模板、行为、样式，但是不可能所有的模板和样式都在一个vue文件内，所以要用组件化。

在vue文件夹下新建一个Cpn.vue文件

> Cpn.vue组件

```vue
<template>
  <div>
    <h2 class='title'>{{name}}</h2>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Cpn",
  data() {
      return {
        name: "组件名字是Cpn"
      };
    }
};
</script>

<style scoped>
.title {
  color: red;
}
</style>
```

将Cpn.vue组件导入到App.vue

```vue
<template>
  <div>
    <h2 class='title'>{{message}}</h2>
    <button @click="btnClick">按钮</button>
    <h2>{{name}}</h2>
    <!-- 使用Cpn组件 -->
    <Cpn/>
  </div>
</template>

<script type="text/ecmascript-6">
//导入Cpn组件
import Cpn from './Cpn.vue'
export default {
  name: "App",
  data() {
      return {
        message: "hello webpack",
        name: "zzz"
      };
    },
    methods: {
      btnclick() {}
    },
    components: {
      Cpn//注册Cpn组件
    }
};
</script>

<style scoped>
.title {
  color: green;
}
</style>
```

再次打包，打开index.html，cpn组件的内容显示

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-26.png)

基于此，一个vue文件可以依赖导入很多vue文件，组成一个单页面富应用。

> 如果你在使用ES6语法导入模块时候想要简写的时候，例如这样省略`.vue`后缀

```javascript
import Cpn from './Cpn'
```

可以在`webpack.config.js`中配置：

```javascript
  resolve: {
    //导入模块简写省略指定后缀
    extensions: ['.js', '.css', '.vue'],
    // alias:别名
    alias: {
      //指定vue使用vue.esm.js
      'vue$':'vue/dist/vue.esm.js'
    }
  }
```



## 15.5	webpack的plugin

> plugin插件用于扩展webpack的功能的扩展，例如打包时候优化，文件压缩。

- **loader和plugin的区别**

  - loader主要用于转化某些类型的模块，是一个**转化器**。

  - plugin主要是对webpack的本身的扩展，是一个**扩展器**。

- **plugin的使用过程**

  - 步骤一：通过npm安装需要使用的plugins(某些webpack已经内置的插件不需要在安装)

  - 步骤二：在**webpack.config.js**中的plugins中配置插件。

> 准备工作
>
> 复制04-webpack的vue到同级目录，并改名为05-webpack的plugin



### 添加版权的Plugin

- BannerPlugin插件是属于webpack自带的插件可以添加版权信息。

- 自带的插件无需安装，直接配置。

- 先获取webpack的对象，在配置BannerPlugin插件。

```javascript
//获取webpack
const webpack = require('webpack')
//2.配置plugins
module.exports = {
    ...
    plugins:[
        new webpack.BannerPlugin('最终解释权归zz所有')
      ]
}
```

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-27.png)

- 打包后，查看bundle.js，结果如图所示：

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-28.png)

- 多了一行我们自定义的版权声明注释。



### 打包html的plugin

- 之前我们的index.html文件都是存放在根目录下的。

- 在正式发布项目的时候发布的是dist文件夹的内容，但是dist文件夹是没有index.html文件的，那么打包就没有意义了。

- 所以我们需要将index.html也打包到dist文件夹中，这就需要使用**`HtmlWebpackPlugin`**插件了。

> **`HtmlWebpackPlugin`**：
>
> 自动生成一个index.html文件（指定模板）
>
> 将打包的js文件，自动同script标签插入到body中

- 首先需要安装**`HtmlWebpackPlugin`**插件

```shell
npm install html-webpack-plugin --save-dev	
```

- 使用插件，修改webpack.config.js文件中的plugins部分

```javascript
//获取htmlWebpackPlugin对象
const htmlWbepackPlugin = require('html-webpack-plugin')
//2.配置plugins
module.exports = {
    ...
    plugins:[
        new webpack.BannerPlugin('最终解释权归zz所有'),
        new htmlWbepackPlugin({
          template: 'index.html'
        })
      ]
}
```

> 1.template表示根据哪个模板来生成index.html
>
> 2.需要删除output中添加的publicPath属性，否则插入的script标签的src可能有误

- 再次打包，打开dist文件夹，多了一个index.html

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-29.png)

- 自动加入了script引入了bundle.js。



### 压缩打包代码插件

- uglifyjs-webpack-plugin是第三方插件，如果是vuecli2需要指定版本1.1.1。

- 安装：

```shell
npm install uglifyjs-webpack-plugin@1.1.1 --save-dev
```

- 配置plugin

```javascript
//获取uglifyjs-webpack-plugin对象
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
//2.配置plugins
module.exports = {
    ...
    plugins:[
        new webpack.BannerPlugin('最终解释权归zz所有'),
        new htmlWbepackPlugin({
          template: 'index.html'
        }),
    	new uglifyjsWebpackPlugin()
      ]
}
```

- 打包过后，打开bundle.js，发现已经压缩了，此时版权声明被删除了。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-30.png)

> webpack高版本自带了压缩插件。



## 15.6	webpack搭建本地服务器

- webpack提供了一个可选的本地开发服务器，这个本地服务器基于node.js搭建，内部使用了express框架，可以实现热启动。

> 准备工作复制05-webpack的plugin文件夹到同级目录，并改名为06-webpack搭建本地服务器。

- 不过这是一个单独的模块，在webpack中使用之前需要先安装：

```shell
npm install --save-dev webpack-dev-server@2.9.1
```

- devServe也是webpack中一个选项，选项本省可以设置一些属性：
  - contentBase：为哪个文件夹提供本地服务，默认是根文件夹，这里我们需要改成./dist	
  - port：端口号
  - inline：页面实时刷新
  - historyApiFallback：在SPA（单页面富应用）页面中，依赖HTML5的history模式

- 修改webpack.config.js的文件配置

```javascript
//2.配置webpack的入口和出口
module.exports = {
 ...
  devServer: {
    contentBase: './dist',//服务的文件夹
    port: 4000,
    inline: true//是否实时刷新
  }

}

```

- 配置package.json的script：
  - 直接输入指令 “webpack-dev-server --open” 会在全局找

```json
"dev": "webpack-dev-server --open"
```

> --open表示直接打开浏览器

- 启动服务器

```shell
npm run dev
```

- 启动成功，自动打开浏览器，发现在本地指定端口启动了，此时你修改src文件内容，**会热修改。**

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-31.png)

> 1.服务器启动在内存中。
>
> 2.开发调试时候最好不要使用压缩js文件的插件，不易调试。



## 15.7	webpack的配置文件分离

- `webpack.config.js`文件中有些是开发时候需要配置，有些事生产环境发布编译需要的配置，比如搭建本地服务器的devServer配置就是开发时配置，接下来我们分析如何分离配置文件。

> 准备工作：复制06-webpack搭建本地服务器文件夹到同级目录，并改名为07-webpack的配置文件分离。

- 在根目录下新建一个`build`的文件夹，新建配置文件。

> base.config.js（公共的配置）

```javascript
//1.导入node的path包获取绝对路径，需要使用npm init初始化node包
const path = require('path')
//获取webpack
const webpack = require('webpack')
//获取htmlWebpackPlugin对象
const htmlWbepackPlugin = require('html-webpack-plugin')

//2.配置webpack的入口和出口
module.exports = {
  entry: './src/main.js',//入口文件
  output:{
    path: path.resolve(__dirname, 'dist'),//动态获取打包后的文件路径,path.resolve拼接路径
    filename: 'bundle.js',//打包后的文件名
    // publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,//正则表达式匹配css文件
        //css-loader只负责css文件加载，不负责解析，要解析需要使用style-loader
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]//使用loader
      },
      {
        test: /\.less$/,//正则表达式匹配css文件
        //css-loader只负责css文件加载，不负责解析，要解析需要使用style-loader
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'less-loader'//less文件loader
        }]//使用loader
      },
      {
        test: /\.(png|jpg|gif)$/,//匹配png/jpg/gif格式图片
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,//图片小于8KB时候将图片转成base64字符串，大于8KB需要使用file-loader
              name: 'img/[name].[hash:8].[ext]'//img表示文件父目录，[name]表示文件名,[hash:8]表示将hash截取8位[ext]表示后缀
            }
          }
        ]
      },
      {
        test: /\.js$/,
        //排除node模块的js和bower的js
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            //如果要使用@babel/preset-env这里需要在根目录新建一个babel的文件
            // presets: ['@babel/preset-env']
            //这里直接使用指定
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.vue$/,//正则匹配.vue文件
        use: {
          loader: 'vue-loader'
        }
      }
    ]
  },
  resolve: {
    // alias:别名
    alias: {
      //指定vue使用vue.esm.js
      'vue$':'vue/dist/vue.esm.js'
    }
  },
  plugins:[
    new webpack.BannerPlugin('最终解释权归zz所有'),
    new htmlWbepackPlugin({
      template: 'index.html'
    })
  ]
}
```

> dev.config.js（开发时候需要的配置）

```javascript
module.exports = {
  devServer: {
    contentBase: './dist',//服务的文件夹
    port: 4000,
    inline: true//是否实时刷新
  }
}
```

> prod.config.js（构建发布时候需要的配置）

```javascript
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  plugins:[
    new uglifyjsWebpackPlugin()
  ]
}
```

- 此时我们将`webpack.config.js`文件分成了三个部分，公共部分、开发部分、构建发布的部分。

> 1.如果此时是dev环境，我们只需要使用`base.config.js`+`dev.config.js`的内容
>
> 2.如果此时是生产发布构建的环境，我们只需要使用`base.config.js`+`prod.config.js`的内容

- 要将两个文件内容合并需要使用`webpack-merge`插件，安装`webpack-merge`。

```shell
npm isntall webpack-merge --save-dev
```

- 合并内容都是将`base.config.js`的内容合并到dev或者prod的文件中，修改`dev.config.js`和`prod.config.js`文件。

> 修改dev.config.js

```javascript
//导入webpack-merge对象
const webpackMerge = require('webpack-merge')
//导入base.config.js
const baseConfig = require('./base.config')

//使用webpackMerge将baseConfig和dev.config的内容合并
module.exports = webpackMerge(baseConfig, {
  devServer: {
    contentBase: './dist',//服务的文件夹
    port: 4000,
    inline: true//是否实时刷新
  }

})

```

> 修改prod.config.js

```javascript
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
//导入webpack-merge对象
const webpackMerge = require('webpack-merge')
//导入base.config.js
const baseConfig = require('./base.config')

//使用webpackMerge将baseConfig和prod.config的内容合并
module.exports = webpackMerge(baseConfig, {
  plugins:[
    new uglifyjsWebpackPlugin()
  ]
})
```

- 此时我们使用三个文件构成了配置文件，此时在不同环境使用不同的配置文件，但是webpack不知道我们新配置文件，此时我们需要在package.json中的script指定要使用的配置文件。

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config ./build/prod.config.js",
    "dev": "webpack-dev-server --open --config ./build/dev.config.js"
  }
```

- 此时使用`npm run build`打包文件，dist文件并不在根目录下，因为我们在`base.config.js`中配置的出口文件使用的是当前文件的路径，即打包的根路径是配置文件的当前路径，也就是build文件夹。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\15-32.png)

```javascript
  entry: './src/main.js',//入口文件
  output:{
    path: path.resolve(__dirname, 'dist'),//动态获取打包后的文件路径,path.resolve拼接路径
    filename: 'bundle.js',//打包后的文件名
    // publicPath: 'dist/'
  }
```

> 注意：__dirname是当前文件路径，path.resolve拼接路径，所以在当前路径下创建了一个dist文件夹。

- 此时修改output属性：

```javascript
output:{
    path: path.resolve(__dirname, '../dist'),//动态获取打包后的文件路径,path.resolve拼接路径
    filename: 'bundle.js',//打包后的文件名
    // publicPath: 'dist/'
  }
```

> 使用`../dist`，在当前目录的上级目录创建dist文件夹
>
> 否则会在build目录下创建dist文件夹





# （十六）vue-cli

## 16.1	vue-cli起步

### 什么是vue-cli

Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，提供：

- 通过 `@vue/cli` 搭建交互式的项目脚手架。
- 通过 `@vue/cli` + `@vue/cli-service-global` 快速开始零配置原型开发。
- 一个运行时依赖 (`@vue/cli-service`)，该依赖：
  - 可升级；
  - 基于 webpack 构建，并带有合理的默认配置；
  - 可以通过项目内的配置文件进行配置；
  - 可以通过插件进行扩展。
- 一个丰富的官方插件集合，集成了前端生态中最好的工具。
- 一套完全图形化的创建和管理 Vue.js 项目的用户界面。

> Vue CLI 致力于将 Vue 生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。与此同时，它也为每个工具提供了调整配置的灵活性，无需 eject。



### **CLI是什么意思？**

- CLI是Command-Line Interface，即命令行界面，也叫脚手架。
- vue cli 是vue.js官方发布的一个vue.js项目的脚手架
- 使用vue-cli可以快速搭建vue开发环境和对应的webpack配置



### vue cli使用

**vue cli使用前提node**

- vue cli依赖nodejs环境，vue cli就是使用了webpack的模板。

- 安装vue脚手架，现在脚手架版本是vue cli3

```shell
npm install -g @vue/cli
```

- 如果使用yarn

```bash
yarn global add @vue/cli
```

- 安装完成后使用命令查看版本是否正确：

```bash
vue --version
```

> 注意安装cli失败

1. 以管理员使用cmd
2. 清空npm-cache缓存

```bash
npm clean cache -force
```

**拉取2.x模板（旧版本）**

 Vue CLI >= 3 和旧版使用了相同的 `vue` 命令，所以 Vue CLI 2 (`vue-cli`) 被覆盖了。如果你仍然需要使用旧版本的 `vue init` 功能，你可以全局安装一个桥接工具： 

```bash
npm install -g @vue/cli-init

# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```

**1.在根目录新建一个文件夹`16-vue-cli`，cd到此目录，新建一个vue-cli2的工程。**

```bash
cd 16-vue-cli
//全局安装桥接工具
npm install -g @vue/cli-init
//新建一个vue-cli2项目
vue init webpack 01-vuecli2test
```

> 注意：如果是创建vue-cli3的项目使用：

```bash
vue create 02-vuecli3test

@vue-cli4
npx vue create 02-vuecli4test
```

2.创建工程选项含义

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\16-1.png)

- project name：项目名字（默认）
- project description：项目描述
- author：作者（会默认拉去git的配置）
- vue build：vue构建时候使用的模式
  - runtime+compiler：大多数人使用的，可以编译template模板
  - runtime-only：比compiler模式要少6kb，并且效率更高，直接使用render函数
- install vue-router：是否安装vue路由
- user eslint to lint your code：是否使用ES规范
- set up unit tests：是否使用unit测试
- setup e2e tests with nightwatch：是否使用end 2 end，点到点自动化测试
- Should we run `npm install` for you after the project has been created? (recommended)：使用**npm**还是**yarn**管理工具

> 注意：如果创建工程时候选择了使用ESLint规范，又不想使用了，需要在config文件夹下的index.js文件中找到useEslint，并改成false。

```javascript
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
```



## 16.2	vue-cli的目录结构

- 创建完成后，目录如图所示：

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\16-2.png)

- 其中build和config都是**配置**相关的文件。



### build和config

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\16-3.png)

- 如图所示，build中将webpack的配置文件做了分离：
  - `webpack.base.conf.js`（公共配置）
  - `webpack.dev.conf.js`（开发环境）
  - `webpack.prod.conf.js`（生产环境）

- 我们使用的脚本命令配置在`package.json`中。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\16-4.png)

- 打包构建：

```bash
npm run build
```

- 如果搭建了本地服务器`webpack-dev-server`，本地开发环境：

```bash
npm run dev
```

- 此时`npm run build`打包命令相当于使用node 执行build文件夹下面的build.js文件。

> build.js

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\16-5.png)

1. 检查dist文件夹是否已经存在，存在先删除
2. 如果没有err，就使用webpack的配置打包dist文件夹



- 在生产环境，即使用build打包时候，使用的是`webpack.prod.conf.js`配置文件。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\16-6.png)

- 源码中，显然使用了`webpack-merge`插件来合并prod配置文件和公共的配置文件，合并成一个配置文件并打包，而`webpack.dev.conf.js`也是如此操作，在开发环境使用的是dev的配置文件。

- config文件夹中是build的配置文件中所需的一些变量、对象，在`webpack.base.conf.js`中引入了`index.js`。

```javascript
const config = require('../config')
```



### src和static

- src**源码**目录，就是我们需要写业务代码的地方。

- static是放**静态资源**的地方，static文件夹下的资源会原封不动的打包复制到dist文件夹下。



### 其他相关文件

#### .babelrc文件

- .babelrc是**ES代码相关转化**配置。

```json
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-vue-jsx", "transform-runtime"]
}
```

- browsers表示需要适配的浏览器，份额大于1%，最后两个版本，不需要适配ie8及以下版本

- "stage-2"：阶段

- "plugins"：babel需要的插件



#### .editorconfig文件

- .editorconfig是**编码**配置文件。

```properties
root = true		// 根据root开始查找

[*]
charset = utf-8
indent_style = space
indent_size = 2		// 缩进
end_of_line = lf	// 最后换行
insert_final_newline = true // 最后添加一行
trim_trailing_whitespace = true // 清除多余空格
```

- 一般是配置编码，代码缩进2空格，是否清除空格等。



#### .eslintignore文件

- .eslintignore文件忽略一些**不规范**的代码。

```
/build/
/config/
/dist/
/*.js
```

- 忽略build、config、dist文件夹和js文件。



#### .eslintrc.js文件



#### .gitignore文件

- .gitignore是git忽略文件，git提交忽略的文件。



#### .postcssrc.js文件

- css转化是配置的一些。



#### index.html文件

- index.html文件是使用`html-webpack-plugin`插件打包的index.html模板。



#### package.json和package-lock.json

1. package.json(包管理,记录大概安装的版本)
2. package-lock.json(记录真实安装版本)



## 16.3	runtime-compiler和runtime-only区别

- 新建两个vuecli2项目：

```bash
//新建一个以runtime-compiler模式
vue init webpack 02-runtime-compiler
//新建一个以runtime-only模式
vue init webpack 03-runtime-only
```

- 两个项目的**main.js**区别

> runtime-compiler

```javascript
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```

> runtime-only

```javascript
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
```

`render: h => h(App)`

```javascript
render:function(h){
  return h(App)
}
```

**compiler编译解析template过程**

> template → ast → render → virtual dom → 真实dom

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\16-7.png)

- 过程
  - `vm.options.template`解析(parse)成`ast(abstract syntax tree)`抽象语法树
  - 抽象语法树编译(compiler)成`vm.options.render(functions)`render函数
  - render函数最终将template解析的ast渲染成虚拟DOM（`virtual dom`）
  - 最终虚拟dom映射到ui上。



**runtime-compiler**

- template会被解析 => ast(抽象语法树) => 然后编译成render函数 => 渲染成虚拟DOM（vdom）=> 真实dom(UI)

**runtime-only**

- render => vdom => UI
- 性能更高
- 需要代码量更少



#### render函数

```javascript
render:function(createElement){
  //1.createElement('标签',{标签属性},[''])
  return createElement('h2',
    {class:'box'},
    ['Hello World',createElement('button',['按钮'])])
  //2.传入组件对象
  //return createElement(cpn)
}
```

- h就是一个传入的**createElement**函数
- .vue文件的template是由**vue-template-compiler**插件解析。



- 将02-runtime-compiler的main.js修改

```javascript
new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>'
  //1.createElement('标签',{标签属性},[''])
  render(createElement){
    return createElement('h2',
    {class:'box'},
    ['hello vue', createElement('button',['按钮'])])
  }
})
```

- 并把config里面的inedx.js的`useEslint: true`改成false，即关掉eslint规范，打包项目`npm run dev`，打开浏览器。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\16-8.png)

在修改main.js

```javascript
new Vue({
  el: '#app',
  // components: { App },
  // template: '<App/>'
  //1.createElement('标签',{标签属性},[''])
  render(createElement){
    // return createElement('h2',
    // {class:'box'},
    // ['hello vue', createElement('button',['按钮'])])
    //2.传入组件
    return createElement(App)
  }
```

再次打包，发现App组件被渲染了。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\16-9.png)



## 16.4	vue-cli3

### vue-cli3起步

**vue-cli3与2版本区别**

- vue-cli3基于webpack4打造，vue-cli2是基于webpack3
- vue-cli3的设计原则是"0配置"，移除了配置文件，build和config等
- vue-cli3提供`vue ui`的命令，提供了可视化配置
- 移除了static文件夹，新增了public文件夹，并将index.html移入了public文件夹



**创建vue-cli3项目**

```bash
vue create 04-vuecli3test
```

**目录结构：**

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\16-10.png)

- public 类似 static文件夹，里面的资源会原封不动的打包
- src源码文件夹



使用`npm run serve`运行服务器，打开浏览器输入http://localhost:8080/

打开src下的main.js

```javascript
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

`Vue.config.productionTip = false`构建信息是否显示

如果vue实例有el选项，vue内部会自动给你执行`$mount('#app')`，如果没有需要自己执行。



### vue-cli3的配置

- 在创建vue-cli3项目的时候可以使用`vue ui`命令进入图形化界面创建项目，可以以可视化的方式创建项目，并配置项。

- vue-cli3配置被隐藏起来了，可以在`node_modules`文件夹中找到`@vue`模块，打开其中的`cli-service`文件夹下的`webpack.config.js`文件。

<img src="C:\Users\86136\Desktop\repository\notes\13-Vue\images\16-11.png" />

- 再次打开当前目录下的`lib`文件夹，发现配置文件`service.js`，并导入了许多模块，来自与lib下面的config、util等模块

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\16-11.png)

- **如何要自定义配置文件**

在项目根目录下新建一个`vue.config.js`配置文件，必须为`vue.config.js`，vue-cli3会自动扫描此文件，在此文件中修改配置文件。

```javascript
//在module.exports中修改配置
module.exports = {
  
}
```





# （十七）vue-router

## 17.1	路由简介

**什么是路由？**

- 路由就是通过互联的网络把信息用源地址传送到目的地的活动

- 路由提供了两种机制：**路由**和**传送**
  - 路由是决定数据包从**来源**到**目的地**的路径
  - 转送就是将数据转移
- 路由表
  - 路由表本质就是一个**映射表**，决定了数据包的指向



## 17.2	前端/后端路由 

> 回顾：https://www.bilibili.com/video/BV15741177Eh?p=101&spm_id_from=pageDriver

- 第一阶段 **后端渲染**（服务端渲染）

  - 后端路由：**后端处理URL和页面映射关系**
  - 例如springmvc中的@requestMapping注解配置的URL地址，映射前端页面

  - jsp技术

  - 缺点：前后端责任不清晰

- 第二阶段 **前后端分离（前端渲染）**（ajax请求数据）
  - 后端只负责提供数据
  - 静态资源服务器（html+css+js）
  - ajax发送网络请求后端服务器，服务器回传数据
    js代码渲染dom

- 第三阶段 **单页面富应用**（SPA页面）
  - 前后端分离加上**前端路由**，前端路由的url映射表不会向服务器请求，是单独url的页面自己的ajax请求后端，后端只提供api负责响应数据请求。改变url，页面不进行整体的刷新。
  - 整个网站只有一个html页面。
  - 前端来维护一套路由规则
  - **核心**
    - 改变url，页面整体不进行刷新
    - 实现手段
      - hash
      - history



## 17.3	URL的hash和HTML5的history

### URL的hash

- URL的hash是通过锚点(#)，其本质上改变的是**window.location的href**属性。
- 可以通过直接赋值**location.hash**来改变href，但是页面并不会发生刷新。

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-1.png)

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-2.gif)

> 结论

- 测试发现url的地址栏改变了变成了http://localhost:8080/#/zty  ，通过查看network发现只有favicon.ico资源重新请求了，这个是工程的logo图标，其他资源都未请求。可以通过改变hash改变url，此时页面是未刷新的。

- vue-router其实用的就是这样的机制，改变url地址，这个url地址存在一份路由映射表里面，比如`/user`代表要请求用户页面，只要配置了这个路由表（路由关系），就可以前端跳转而不刷新页面，所有的数据请求都走ajax。



### HTML5的history模式

#### pushState

同样的使用HTML5的history模式也是不会刷新页面的,history对象栈结构，先进后出，pushState类似压入栈中，back是回退。

```js
hristory.pushState({}, '', '/foo')
history.back()
```

![xxxx](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-3.png)



#### replaceState

- replaceState模式与pushState模式区别在于replaceState模式浏览器没有返回（**浏览器左上角没有返回按钮**），只是**替换**，不是压入栈中。“无痕浏览”

```js
history.replaceState({}, '', 'home')
```

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-4.png)



#### go

- go只能在pushState模式中使用，go是**前进后退**到哪个**历史页面**。

```js
history.go(-1) // 回退一个页面
history.go(1) // 前进一个页面
history.forward() // 等价于go(1)
history.back() // 等价于go(-1)
```



## 17.4	vue-router的安装配置

- 使用`npm install vue-router --save`来安装vue-router插件模块

- 在模块化工程中使用他(因为是一个插件，所以可以通过Vue.user来安装路由功能)
  - 在src下创建一个router文件夹（一般安装vue-router时候会自动创建）用来存放vue-router的路由信息导入路由对象，并且调用**Vue.use(VueRouter)**
  - 创建路由实例，并且传入路由**映射配置**
  - 在vue实例中挂载创建的**路由实例对象**

> router文件夹中的index.js

```js
/**
 * 配置路由相关信息
 * 1.先导入vue实例和vue-router实例
 */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

// 2. 通过Vue.use(插件)，安装插件
Vue.use(Router)
//3. 创建 router路由对象
const routes = [
  //配置路由和组件之间的对应关系
  {
    path: '/',//url
    name: 'HelloWorld',
    component: HelloWorld //组件名
  }
]
const router = new Router({
  //配置路由和组件之间的应用关系
  routes
})
//4.导出router实例
export default router
```

> main.js中挂载router对象

```js
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//使用路由对象，简写对象增强写法
  render: h => h(App)
})
```



## 17.5	vue-router的使用

### 创建路由组件

- 在components文件夹下创建2个组件。

> Home组件

```vue
<template>
  <div class="page-contianer">
    <h2>这是首页</h2>
    <p>我是首页的内容,123456.</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'Home'
}
</script>
<style scoped>
</style>
```

> About组件

```vue
<template>
  <div class="page-contianer">
    <h2>这是关于页面</h2>
    <p>我是关于页面的内容，about。</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'About'
}
</script>
<style scoped>
</style>
```



### 配置路由映射：组件和路径映射关系

- 在路由与组件对应关系配置在`routes`中。

> 修改index.js

```js
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

// 2. 通过Vue.use(插件)，安装插件
Vue.use(Router)
//3. 创建 router路由对象
const routes = [
  //配置路由和组件之间的对应关系
  {
    path: '/home',//home  前端路由地址
    name: 'Home',
    component: Home //组件名
  },
  {
    path: '/about',//about 前端路由地址
    name: 'About',
    component: () => import('@/components/About') //懒加载组件
  }
]
const router = new Router({
  //配置路由和组件之间的应用关系
  routes
})
//4.导出router实例
export default router
```



### 使用路由：通过`<router-link>`和`<router-view>`

在app.vue中使用`<router-link>`和`<router-view>` 两个全局组件显示路由。

> `<router-link>`是全局组件，最终被渲染成**a标签**，但是`<router-link>`只是标记路由指向类似一个a标签或者按钮一样，但是我们点击a标签要跳转页面或者要显示页面，所以就要用上`<router-view>`。
>
> `<router-view>`  是用来占位的，就是路由对应的**组件展示**的地方，该标签会根据当前的路径，动态渲染出不同的组件。
>
> 路由切换的时候切换的是`<router-view>`挂载的组件，其他不会发生改变。
>
> `<router-view>`默认使用hash模式，可以在index.js中配置修改为history模式。

> app.vue修改template

```vue
<template>
  <div id="app">
    <router-link to="/home">首页</router-link> |
    <router-link to="/about">关于</router-link>
    <router-view/>
  </div>
</template>
```

使用`npm run dev`启动项目，此时`<router-view>`在`<router-link>`下面，那渲染页面就在下面，此时未配置路由的默认值，所以第一次进入网页的时候`<router-view>`占位的地方是没有内容的。

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-6.gif)



### 路由的默认值和history模式

> 路由的默认值，修改index.js的routes

```js
const routes = [
  {
    path: '',
    redirect: '/home'//缺省时候重定向到/home
  },
  //配置路由和组件之间的对应关系
  {
    path: '/home',//home  前端路由地址
    name: 'Home',
    component: Home //组件名
  },
  {
    path: '/about',//about 前端路由地址
    name: 'About',
    component: () => import('@/components/About') //懒加载组件
  }
]
```

- 添加缺省值，并**重定向**到`/home`路径，此时打开http://localhost:8080  ，直接显示home组件内容。

- 修改hash模式为history模式，修改index.js的router对象
  - mode: 'history'

```js
const router = new Router({
  //配置路由和组件之间的应用关系
  routes,
  mode: 'history'//修改模式为history
})
```

此时发现浏览器地址栏的URL是没有`#`的。

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-7.png)



### `<router-link>`的其他属性

- `to`属性：用于跳转到指定路径。

- `tag`属性：可以指定`<router-link>`之后渲染成什么组件使用`<router-link to='/home' tag='button'>`会被渲染成一个按钮，而不是a标签。

- `relapce`属性：在history模式下指定`<router-link to='/home' tag='button' replace>`使用`replaceState`而不是pushState，此时浏览器的返回按钮是不能使用的。

- `active-class`属性：当`<router-link>`对应的路由匹配成功的时候，会自动给当前元素设置一个`router-link-active`的class，设置active-class可以修改默认的名称。
  - 在进行高亮显示的导航菜单或者底部tabbar时，会用到该属性

  - 但是通常不会修改类的属性，会直接使用默认的`router-link-active`

  - `<router-link to='/home' tag='button' active-class='active'>`此时被选中的`<router-link>`就会有active的class。

  - 如果每个`<router-link>`都要加上`active-class='active'`，那就在**路由里**面统一更改。



   ```js
   const router = new Router({
     //配置路由和组件之间的应用关系
     routes,
     mode: 'history',//修改模式为history
     linkActiveClass: 'active'
   })
   ```



   ```vue
   <template>
     <div id="app">
       <router-link to="/home" tag='button' replace active-class='active'>首页</router-link> |
       <router-link to="/about" active-class='active'>关于</router-link>
       <router-view/>
     </div>
   </template>

   <script>
   export default {
     name: 'App'
   }
   </script>

   <style>
   #app {
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
     margin-top: 60px;
   }
   .active {
     color: red;
   }
   </style>
   ```

   修改app.vue文件此时被选中的`<router-link>`就有了active属性，给active的class加上字体变红的css。

   ![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-8.png)



### 通过代码修改路由跳转

> $router属性

```vue
<template>
  <div id="app">
    <!-- <router-link to="/home" tag='button' replace active-class='active'>首页</router-link> |
    <router-link to="/about" active-class='active'>关于</router-link> -->
    <button @click="homeClick">首页</button>|
    <button @click="aboutClick">关于</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    homeClick() {//通过代码的路径修改路由
      this.$router.push('/home')//push 等价于pushState
      // this.$router.replace('/home')//replace 等价于replaceState
      console.log("homeClick")
    },
    aboutClick() {
      this.$router.push('/about')
      // this.$router.replace('/about')//replace 等价于replaceState
      console.log("aboutClick")
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.active {
  color: red;
}
</style>
```

- 修改app.vue，将`<router-link>`换成`button`等任何组件，添加上点击事件，并写好点击事件响应方法，此时使用`this.$router.push('/home')`，push方法 等价于pushState方法，replace 方法等价于replaceState方法。



## 17.5	渐入vue-router

### vue-router的动态路由

- 一个页面的path路径可能是不确定的，例如可能有`/user/aaaa`或者`/user/bbbb`，除了`/user`之外，后面还跟上了用户ID`/user/123`等。这种**path和component的匹配关系，叫动态路由**。

> 新建一个User组件

```vue
<template>
  <div class="page-contianer">
    <h2>这是用户界面</h2>
    <p>这里是用户页面的内容。</p>
    <p>用户ID是: {{ userId }}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'User',
  computed:{
    userId() {
      return this.$route.params.userId
    }
  }
}
</script>
<style scoped>
</style>

```

- 该组件定义一个计算属性，通过`this.$route.params.userId`获取**处于激活状态**的路由参数`userId`。
  - 注意区别 router 、​routes、route
    - $router：*const* router = new VueRouter({}）对象——路由器。
    - routes：路由数组名，可自定义。
    - $route：每一个路由，拿到的就是当前渲染状态的路由。

> 配置路由参数index.js

```js
  {
    path: '/user/:userId',
    name: 'User',
    component: () => import('@/components/User') //懒加载组件
  }
```

使用`:userId`指定动态路由参数`userId`。

> app.vue中添加user页面的`<router-link>`，并添加userId变量

```vue
    <router-link :to="/user/ + userId">用户</router-link>
```

```js
  data (){
    return {
      userId: 'zty'
    }
```

启动项目，点击用户。

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-9.png)

> 总结

`$route`是代表处于激活状态的路由，这里指的也就是

```js
  {
    path: '/user/:userId',
    name: 'User',
    component: () => import('@/components/User')
  }
```

通过`$route.params`获取 [`$route`]([https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7](https://router.vuejs.org/zh/api/#路由对象属性)) 所有的参数，`$route.params.userId`，获取所有参数中的名字叫`userId`的属性，此时可以在User组件中动态获取路由参数，也就可以在app.vue中动态设置路由中的`userId`，其他属性请参考 [`$route`]([https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7](https://router.vuejs.org/zh/api/#路由对象属性)) 。



### 懒加载——vue-router的打包文件解析

> 问题：打包时候js太大，页面响应缓慢

- 懒加载
  - 如果组件模块化了，**当路由被访问的时候才开始加载被选中的组件**

```js
ES6
component: () => import('@/components/User')

AMD写法
const About = resolve => require(['../components/About.vue'], resolve)
```

使用`npm run build`命令将之前创建的项目打包，打开dist文件夹，器目录结构如下：

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-10.png)

- app.xxx.js是我们自己编写的**业务代码**
- vendor.xxx.js是**第三方框架**，例如vue/vue-router/axios等
- mainfest.xxx.js是为了打包的代码做**底层支持**的，**一般是webpack帮我们做一些事情**
- 除了这三个还多了2个js，这2个js文件（0.5bxxx.js和1.e5xxx.js）分别是About和User组件，因为这2个组件是**懒加载**的所以被分开打包了。

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-11.png)

- 此时因为是懒加载，需要用到这个组件的时候才会加载，所以不会一次性请求所有js。



### 认识嵌套路由

- 平常在一个home页面中，我们可能需要`/home/news`和`/home/message`访问一些内容，一个路由映射一个组件就像后端一个api对应一个controller的一个requestMapping一样，访问两个路由也会分别渲染这两个组件。

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-12.png)

- 要实现嵌套路由：
  - 创建对应的子组件，并且在路由映射(`router/index.js`)中配置对应的子路由。

  - 在组件内部使用`<router-view>`标签来占位。

> 新建2个组件HomeNews和HomeMessage

```vue
<template>
  <div class="page-contianer">
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item + index + 1 }}</li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'HomeNews',
  data() {
    return {
      list: ['新闻', '新闻', '新闻', '新闻']
    }
  }
}
</script>
<style scoped></style>
```

```vue
<template>
  <div class="page-contianer">
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item + index + 1 }}</li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'HomeMessage',
  data() {
    return {
      list: ['消息', '消息', '消息', '消息']
    }
  }
}
</script>
<style scoped></style>
```

> 配置嵌套路由

```js
  {
    path: '/home',//home  前端路由地址
    name: 'Home',
    component: Home, //组件名
    children: [
      {
        path: '',
        redirect: '/home/news'//缺省时候重定向到/home/news
      },
      {
        path: 'news',//子嵌套路由 无须加/
        name: 'News',
        component: () => import('@/components/HomeNews') //懒加载组件
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/components/HomeMessage') //懒加载组件
      }
    ]
  },
```

> 修改Home.vue组件加上`<router-link>`和`<router-view/>`

```vue
<template>
  <div class="page-contianer">
    <h2>这是首页</h2>
    <p>我是首页的内容,123456.</p>
    <router-link to="/home/news">新闻</router-link>|
    <router-link to="/home/message">消息</router-link>
    <router-view/>
  </div>
</template>
```

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-13.png)



### vue-router的参数传递

- 之前的动态路由说的`userId`也是参数传递的方式的一种，准备新建一个Profile.vue组件，并配置路由映射，添加指定的`<router-link>`。

```vue
<template>
  <div class="page-contianer">
    <h2>这是档案界面</h2>
    <p>这里是档案页面的内容。</p>
    <p>档案的名字是: {{ profileInfo.name }}</p>
    <p>档案的年龄是: {{ profileInfo.age }}</p>
    <p>档案的身高是: {{ profileInfo.height }}</p>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'Profile',
  computed: {
    profileInfo() {
      return this.$route.query.profileInfo
    }
  }
}
</script>
<style scoped></style>
```

```js
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/components/Profile')
  }
```

```vue
<router-link :to="{ path: '/profile', query: { profileInfo } }">档案</router-link>
```

- 在app.vue中设置初始的对象`profileInfo`

```js
  data (){
    return {
      userId: 'zty',
      profileInfo: {
        name: "zty",
        age: 24,
        height: 177
      }
    }
  }
```

#### 传递参数主要有两种类型：params和query

- params的类型也就是动态路由形式
  - 配置路由的格式：`/user/:userId`
  - 传递的方式：在path后面跟上对应的userId
  - 传递形成的路径：`/user/123`，`/user/xxx`
  - 通过`$route.params.userId`获取指定userId

- query的类型
  - 配置路由的格式：`/profile`，也就是普通的配置
  - 传递的方式：对象中使用query的key作为传递的方式
  - 传递形成的路径：`/profile?name=zty&age=24&height=177`（这个传递的是三个键值对），`/profile?profileInfo=%5Bobject%20Object%5D`（这个query传递的是一个对象的键值对，key为profileInfo，value是一个对象）

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-14.png)

- 使用代码编写传递数据，使用`button`代替`<router-link>`，并添加点击事件。

```vue
    <button @click="userClick">用户</button>
    <button @click="profileClick">档案</button>
```

```js
    userClick() {
      this.$router.push('/user/' + this.userId)
      console.log("userClick")
    },
    profileClick() {
      let profileInfo = this.profileInfo
      this.$router.push({
        path: '/profile',
        query: {
          profileInfo
        }
      })
      console.log("profileClick")
    }
```



### router和route的由来

- vue全局对象`this.$router`与main.js导入的router对象是一个对象，也就是我们`router/index.js`**导出的对象router**。

```js
new Vue({
  el: '#app',
  router, zz// 使用路由对象
  render: h => h(App)
})
```

```js
//4.导出router实例
export default router
```

- `this.$route`对象是当前处于活跃的路由，有params和query属性可以用来传递参数。

- 查看`vue-router`源码,在我们项目中的`router/index.js`中，vue 对于插件必须要使用`Vue.use(Router)`，来安装插件，也就是执行vue-router的`install.js`。

在[vue-router的github](https://github.com/vuejs/vue-router/tree/dev/src)源码中查看src结构如下：

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-15.png)

- 其中index.js是入口文件，入口js文件就是导入并执行了install.js文件。

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-16.png)

> 发现

- install.js中有注册2个全局组件`RouterView`和`RouterLink`，所以我们能使用`<router-view>`和`<router-link>`组件。

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-17.png)

> $router和$route是继承自vue的原型

- 怎么理解原型？学过Java 的都知道有父类和子类，子类也可以有自己的子类，但是他们都有一个处于最顶层的类Object(所有类的父类)。在Vue中就有那一个`Vue`类似Object，在java中在Object中定义的方法，所有的类都可以使用可以重写，类似的`Vue.prototype`（Vue的原型）定义的属性方法，他的原型链上的对象都可以使用，而`$router`和`$route`都在Vue的原型链上。

- 在main.js入口文件中在vue的原型上定义一个方法test，然后在User组件中尝试调用。

```js
import Vue from 'vue'
import App from './App'
import router from './router'

//在vue的原型上添加test方法
Vue.prototype.test = function () {
  console.log("test")
}
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//使用路由对象
  render: h => h(App)
})

```

```vue
<template>
  <div class="page-contianer">
    <h2>这是用户界面</h2>
    <p>这里是用户页面的内容。</p>
    <p>用户ID是: {{ userId }}</p>
    <button @click="btnClick">按钮</button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'User',
  computed:{
    userId() {
      return this.$route.params.userId
    }
  },
  methods: {
    btnClick() {
      //所有组件都继承自vue的原型
      console.log(this.$router)
      console.log(this.$route)
      //调用vue原型的test
      this.test()
    }
  }
}
</script>

<style scoped>
</style>
```

- 启动项目点击User页面上的按钮，打开浏览器控制台查看日志发现test方法被执行了，而User组件中并未定义test方法，却可以调用。

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-18.png)

- 继续来读install.js，install.js中一开始就将`Vue`这个类当参数传入了install方法中，并把`Vue`赋值给`_Vue`。

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-19.png)

- 继续读install.js发现以下代码

```js
  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })
//Object.defineProperty用来定义属性
  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
```

- `Object.defineProperty`用来定义属性，以上代码就是给`Vue.prototype`(Vue原型)添加`$router`和`$route`属性并给属性赋值，等价于:

```js
Vue.prototype.$router = {
    get () { return this._routerRoot._router }
}
Vue.prototype.$router = {
  get () { return this._routerRoot._router }
}
```

- 也就是在Vue的原型上添加`$router`和`$route`属性,再查看get()返回值`this._routerRoot._router`

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-20.png)

这里的`this.$options.router`就是我们main.js入口文件传入的参数`router`，也就是router/index.js导出的`router`对象。

```js
new Vue({
  el: '#app',
  router,//使用路由对象
  render: h => h(App)
})
```





## 17.6	vue-router其他

### vue-router的导航守卫

> 问题：我们经常需要在路由跳转后，例如从用户页面跳转到首页，页面内容虽然可以自己定义，但是只有一个html文件，也只有一个title标签，我们需要改变标题。

- 可以使用js去修改title，可以使用vue的生命周期函数在组件被创建的时候修改title标签内容。

```js
created() {
	//创建的时候修改title
    document.title = '关于'
}
mounted() {
    //数据被挂载到dom上的时候修改title
}
update() {
    //页面刷新的时候修改
}
```

- 当然不能每个组件去写生命周期函数，如果我们能监听路由的变化(了解路由从哪来往哪里跳转)，那我们就能在跳转中修改title标签，这就是导航守卫能做的事情。

### 前置守卫——前置钩子（回调）

- 修改`router/index.js`

```js
/**
 * 前置钩子：从from跳转到to
 * from 来的路由
 * to 要去的路由
 */
router.beforeEach((to, from, next) => {
  document.title = to.matched[0].meta.title //给目标路由的页面的title赋值
  next()//必须调用，不调用不会跳转
})
```

> router.beforeEach()称为前置钩子(前置守卫)，顾名思义，跳转之前做一些处理。

- 当然每个路由配置上也要加上meta属性，不然就取不到了，为什么要使用`matched[0]`，因为如果你是嵌套路由，有没有给子路由添加meta（元数据：描述数据的数据）属性，就会显示`undefined`，使用`matched[0]`表示取到匹配的第一个就会找到父路由的meta属性。

```js
  //配置路由和组件之间的对应关系
  {
    path: '/home',//home  前端路由地址
    name: 'Home',
    component: Home, //组件名
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '',
        redirect: '/home/news'//缺省时候重定向到/home/news
      },
      {
        path: 'news',//子嵌套路由 无须加/
        name: 'News',
        component: () => import('@/components/HomeNews') //懒加载组件
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/components/HomeMessage') //懒加载组件
      }
    ]
  },
```

- 启动服务发现功能已经实现。

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-21.gif)



### 导航守卫补充——后置钩子

- 前面说了前置守卫router.beforeEach()，相对的应该也存在**后置守卫**(后置钩子)。

```js
/**
 * 后置钩子
 */
router.afterEach((to, from) => {
  console.log('后置钩子调用了----')
})
```

- 顾名思义，也就是在跳转之后的回调函数。
  - 前置守卫和后置守卫都是**全局守卫**。
  - 还有[路由独享守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E8%B7%AF%E7%94%B1%E7%8B%AC%E4%BA%AB%E7%9A%84%E5%AE%88%E5%8D%AB)
  - [组件内的守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E7%BB%84%E4%BB%B6%E5%86%85%E7%9A%84%E5%AE%88%E5%8D%AB)

> 路由独享守卫，路由私有的

```js
  {
    path: '/about',//about 前端路由地址
    name: 'About',
    component: () => import('@/components/About'),
    beforeEnter: (to, from, next) => {
      console.log('来自' + from.path + ',要去' + to.path)
      next()
    },
    meta: {
      title: '关于'
    }
  },
```

`beforeEnter`的参数与全局守卫一样，修改`about`路由的参数，添加路由独享守卫，此时只有跳转到`about`路由，才会打印日志。

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-22.png)

> 组件内的守卫，直接在组件中定义的属性

- `beforeRouteEnter`
- `beforeRouteUpdate` (2.2 新增)
- `beforeRouteLeave`

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以**不支持**传递回调，因为没有必要了。

```js
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```

这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 `next(false)` 来取消。

```js
beforeRouteLeave (to, from , next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```



### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。



## 17.7	keep-alive

- 先给Home组件加上`created()`和`destoryed()`2个生命周期函数。

```vue
<script type="text/ecmascript-6">
export default {
  name: 'Home',
  created() {
    console.log('Home组件被创建了')
  },
  destoryed() {
    console.log('Home组件被销毁了')
  }
}
</script>
```

- 启动项目，某些时候可能有这样的需求，如图所示：

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-23.gif)

**分析**

- 在首页和关于组件之间路由跳转的时候，Home组件一直重复创建和销毁的过程，每次创建都是新的Home组件，但是我有这样的需求。当我点击首页消息页面，随后跳转到关于页面，又跳转到首页，此时我希望显示的是首页的消息页面而不是默认的新闻页面，此时就需要`keep-alive`来使组件**保持状态，缓存**起来，离开路由后，Home组件生命周期的**`destroyed()`不会被调用**，Home组件不会被销毁。

- `keep-alive`是Vue内置的一个组件，可以使被包含的组件保留状态，或者避免重新渲染。
- `router-view`也是一个组件，如果用`<keep-alive><router-vie/></keep-alive>`，将其包起来，所有路径匹配到的视图组件都会被缓存。

**修改`app.vue`代码**

```html
    <keep-alive>
      <router-view/>
    </keep-alive>
```

- 再次启动项目，发现还是新闻页面？难道是`keep-alive`无效？

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-24.gif)

- 仔细看控制台发现，在跳转关于页面的时候Home组件并没有被销毁，说明`keep-alive`生效了。仔细查看路由配置发现，`/home`被默认重定向到了`/home/news`。所以在访问`/home`的时候每次出来的都是新闻。

**思路**

- 将默认的重定向去掉，但是第一次进入首页，那新闻页面内容又不会显示了。

  ```js
        // {
        //   path: '',
        //   redirect: '/home/news'//缺省时候重定向到/home/news
        // },
  ```



- 为了第一次能使新闻页面内容显示，可以使用`created()`，将路由用代码的方式手动重定向，也就是push。

  ```js
    created() {
      console.log('Home组件被创建了')
      this.$router.push('/home/news')
    },
  ```



- 由于`keep-alive`组件只创建一次，第一次进入Home组件的时候，新闻页面显示正常，当第二次跳转首页的时候，因为不会再调用`created()`，所以新闻页面又不会显示了。

- 为了解决问题，在Home组件中引入`activated()`和`deactivated()`两个函数，这2个函数与`keep-alive`有关，不使用`keep-alive`的这两个函数无效。

  - `activated()`当组件属于进入活跃状态的时候调用
  - `deactivated()`当组件属于退出活跃状态的时候调用(此时路由已经跳转，所以不能在此方法中修改路由，因为修改的是to路由)

- 为了使第二次进入首页新闻页面可以生效，使用`activated()`在Home组件使活跃状态时候就重定向

  ```js
      data() {
      return {
        path: '/home/news'
      }
    },
    activated(){
      console.log('调用actived')
      this.$router.push(this.path)//在活跃的时候将保存的路由给当前路由
    },
    deactivated(){
      console.log('调用actived')
      console.log(this.$route.path)
      this.path = this.$route.path//变成不活跃状态，将最后的路由保存起来
    }
  ```

- 发现还是不行，由于`deactivated()`调用的时候，此时路由已经跳转，所以不能在此方法中修改路由，因为修改的是to路由。

- 使用路由守卫(组件内守卫)，`beforeRouteLeave (to, from , next)`在离开路由的时候将当前的路由赋值给path并保存起来。

  ```js
    activated(){
      console.log('调用actived')
      this.$router.push(this.path)
    },
    // deactivated(){
    //   console.log('调用actived')
    //   console.log(this.$route.path)
    //   this.path = this.$route.path
    // },
    beforeRouterLeave(to, from, next) {
      console.log(this.$route.path)
      this.path = this.$route.path
      next()
    }
  ```

- 此时问题完全解决了。

  ![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-25.gif)



### **keep-alive的属性**

```vue
    <keep-alive>
      <router-view/>
    </keep-alive>
```

- 我们将`<router-view/>`包起来，那所有的组件都会缓存，都只会创建一次，如果我们需要某一个组件每次都创建销毁，就需要使用`exclude`属性。

```vue
<keep-alive exclude='Profile,User'>
   <router-view/>
</keep-alive>
```

- 此时`Profile`和`User`组件（这里组件需要有name属性，分别为`Profile`和`User`）就被排除在外，每次都会创建和销毁。相对应的也有`include`属性，顾名思义就是包含，只有选中的才有`keep-alive`。

```vue
<keep-alive include='Profile,User'>
   <router-view/>
</keep-alive>
```

> `include`和`exclude`都是使用字符串和正则表达式，使用字符串的时候，注意“,”之后之前都别打空格。





## 17.8	综合练习-实现Tab-Bar

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-26.gif)

### 实现Tab-Bar思路

1. 下方单独的`Tab-Bar`组件如何封装？
   - 自定义`Tab-Bar`组件，在APP中使用
   - 让`Tab-Bar`位置在底部，并设置你需要的样式
2. `Tab-Bar`中显示的内容由外部决定
   - 定义插槽
   - flex布局平分`Tab-Bar`
3. 自定义`Tab-Bar-Item`，可以传入图片和文字
   - 定义`Tab-Bar-Item`，并定义两个插槽：图片和文字
   - 给插槽外层包装`div`，设置样式
   - 填充插槽，实现底部`Tab-Bar`的效果
4. 传入高亮图片
   - 定义另一个插槽，插入`active-icon`的数据
   - 定义一个变量`isActicve`，通过`v-show`来决定是否显示对应的icon
5. `Tab-Bar-Item`绑定路由数据
   - 安装路由：`npm install vue-router --save`
   - 在`router/index.js`配置路由信息，并创建对应的组件
   - `main.js`中注册`router`
   - `App.vue`中使用`router-link`和`router-view`
6. 点击item跳转到对应的路由，并且动态决定`isActive`
   - 监听`item`的点击，通过`this.$router.replace()`替换路由路径
   - 通过`this.$route.path.indexOf(this.link)!==-1`来判断是否使`active`
7. 动态计算active样式
   - 封装新的计算属性：`this.isActive?{'color': 'red'}:{}`



### 代码实现

- 使用`vue init webpack 02-vue-router-tabbar-v1`新建一个项目工程(使用`vuecli2`)。

1. 在文件夹assest下新建css/base.css,用于初始化css

   > base.css



   ```css
   body {
     padding: 0;
     margin: 0;
   }
   ```

   > 修改App.vue，添加初步样式

   ```vue
   <template>
     <div id="app">
       <div id="tar-bar">
         <div class="tar-bar-item">首页</div>
         <div class="tar-bar-item">分类</div>
         <div class="tar-bar-item">购物车</div>
         <div class="tar-bar-item">我的</div>
       </div>
     </div>
   </template>

   <script>
   export default {
     name: 'App'
   }
   </script>

   <style>
       /* style中引用使用@import */
     @import url('./assets/css/base.css');

     #tar-bar {
       display: flex;
       background-color: #f6f6f6;

       position: fixed;
       left: 0;
       right: 0;
       bottom: 0;

       box-shadow: 0 -1px  1px rgba(100, 100, 100, .2);
     }

     .tar-bar-item {
       flex: auto;
       text-align: center;
       height: 49px;
       font-size: 20px;
     }
   </style>

   ```

   > 使用npm run dev，查看网页效果

   <img src="C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-27.png" style="zoom:75%;" />

   > 思考：如果每次都要复用tabbar，那每次都需要复制粘贴，应该要把tabbar抽离出来，vue就是组件化思想。



2. 将tabbar抽离成组件

   在components下新建tabbar文件夹，新建`TarBar.vue`和`TabBarItem.vue`,`TabBarItem`组件是在组件`TarBar`中抽取出来的，可以传入图片和文字（比如首页），所有需要使用插槽`<slot>`代替。

   > TarBar.vue

   ```vue
   
   ```

<template>
       <div id="tab-bar">
         <!-- 插槽代替tabbaritem -->
         <slot></slot>
       </div>
   </template>
   <script type="text/ecmascript-6">
   export default {
     name: 'TabBar'
   }
   </script>
   <style scoped>
     #tab-bar {
       display: flex;
       background-color: #f6f6f6;


       position: fixed;
       left: 0;
       right: 0;
       bottom: 0;
       
       box-shadow: 0 -1px  1px rgba(100, 100, 100, .2);
     }

   </style>

   ```
TabBar弄一个slot插槽用于插入TabBarItem组件（可能插入多个）.

> TabBarItem.vue

​```vue
<template>
    <div class="tab-bar-item">
      <!-- item-icon表示图片插槽 item-text表示文字插槽，例如首页 -->
      <slot name="item-icon"></slot>
      <slot name="item-text"></slot>
    </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'TabBarItem'
  }
</script>
<style scoped>
  .tab-bar-item {
    flex: auto;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
   ```

- TabBarItem组件中插入2个插槽一个用于插入图片一个用于插入文字。

> MainTabBar.vue

```vue
<template>
  <div class="main-tab-bar">
    <TabBar>
      <TabBarItem path="/home" activeColor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="" srcset="">
        <template v-slot:item-text>
          <div>首页</div>
        </template>
      </TabBarItem>
      <TabBarItem path="/categories">
        <template #item-icon>
          <img src="~assets/img/tabbar/categories.png" alt="" srcset="">
        </template>
        <template #item-text>
          <div>分类</div>
        </template>
      </TabBarItem>
      <TabBarItem path="/shop">
        <template #item-icon>
          <img src="~assets/img/tabbar/shopcart.png" alt="" srcset="">
        </template>
        <template #item-text>
          <div>购物车</div>
        </template>
      </TabBarItem>
      <TabBarItem path="/me">
        <template #item-icon>
          <img src="~assets/img/tabbar/profile.png" alt="" srcset="">
        </template>
        <template #item-text>
          <div>我的</div>
        </template>
      </TabBarItem>
    </TabBar>
  </div>
</template>
<script type="text/ecmascript-6">
  import TabBar from "@/components/tabbar/TabBar"
  import TabBarItem from "@/components/tabbar/TabBarItem"
  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>
<style scoped>
</style>

```

- 在MainTabBar组件中加入另外2个组件。

> 注意此处使用`~assets`和`@/components`是使用了别名配置，[详情请看17.8.3别名配置](#17.8.3	别名配置)

- 最后在app.vue中导入MainTabBar组件。

```vue
<template>
  <div id="app">
    <MainTabBar></MainTabBar>
  </div>
</template>
<script>
  import MainTabBar from '@/components/MainTabBar'
  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>
<style>
    /* style中引用使用@import */
  @import url('./assets/css/base.css');
</style>

```

- 效果如图所示，将组件进行了分离重组，只要修改MainTabBar组件就可以修改图片和文字描述，可以复用。

![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-28.png)

3. 如何实现点击首页首页字体变红图片变红色

   - 这里需要用到路由的`active-class`。

   > 思路：引用2张图片，一张是正常颜色一张是红色，使用`v-if`和`v-else`来处理是否变色，在路由处于活跃状态的时候，变红色。

   - 引入路由使用路由就不细说了，这里仅贴上tabbar的修改代码。

   > TabBarItem.vue组件

   ```vue
   <template>
       <div class="tab-bar-item" :style="activeStyle" @click="itemClick">
         <!-- item-icon表示图片插槽 item-text表示文字插槽，例如首页 -->
         <div v-if="!isActive">
           <slot  name="item-icon"></slot>
         </div>
         <div  v-else>
           <slot name="item-icon-active"></slot>
         </div>
         <div :class="{active:isActive}">
           <slot name="item-text"></slot>
         </div>
       </div>
   </template>
   
   <script type="text/ecmascript-6">
     export default {
       name: 'TabBarItem',
       props:{
         path:String,
         activeColor:{
           type:String,
           default:'red'
         }
       },
       computed: {
         isActive(){
           return this.$route.path.indexOf(this.path) !== -1
         },
         activeStyle(){
           return this.isActive ? {color: this.activeColor} : {}
         }
       },
       methods: {
         itemClick(){
           this.$router.push(this.path)
         }
       }
     }
   </script>
   
   <style scoped>
     .tab-bar-item {
       flex: auto;
       text-align: center;
       height: 49px;
       font-size: 14px;
     }
   
     .tab-bar-item img {
       height: 24px;
       width: 24px;
       margin-top: 3px;
       vertical-align: middle;
       margin-bottom: 2px;
     }
   </style>
   ```

   

   1. 使用`props`获取传递的值，这里传递是激活颜色，默认是红色
   2. 设置计算属性`isActive`和`activeStyle`，分别表示激活状态和激活的样式
   3. 定义`itemClick()`方法用于获取点击事件，点击后使用代码实现路由跳转，这里使用默认的hash模式
   4. 使用`v-if`和`v-else`来进行条件判断

   > MainTabBar.vue组件

   ```vue
         <TabBarItem path="/home">
           <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="" srcset="">
           <img slot="item-icon-active" src="~assets/img/tabbar/home_active.png" alt="" srcset="">
           <template v-slot:item-text>
             <div>首页</div>
           </template>
         </TabBarItem>
   ```

   - 添加激活状态的图片与未激活的图片并列。

4. 配置路由信息，参考之前的代码

   ```js
   import Vue from 'vue'
   import Router from 'vue-router'
   
   
   Vue.use(Router)
   
   const routes = [
     {
       path: '/',
       redirect: '/home'//缺省时候重定向到/home
     },
     {
       path: '/home',
       component: () => import ('../views/home/Home.vue')
     },
     {
       path: '/categories',
       component: () => import ('../views/categories/Categories.vue')
     },
     {
       path: '/shop',
       component: () => import ('../views/shop/Shop.vue')
     },
     {
       path: '/profile',
       component: () => import ('../views/profile/Profile.vue')
     },
   ]
   
   export default new Router({
     routes,
     // linkActiveClass:"active"
   })
   ```

   ![](C:/Users/86136/Desktop/repository/notes/13-Vue/images/17-29.png)

5. 修改main.js和App.vue

   ```js
   import Vue from 'vue'
   import App from './App'
   import router from './router'
   
   Vue.config.productionTip = false
   
   /* eslint-disable no-new */
   new Vue({
     el: '#app',
     router,
     render: h => h(App)
   })
   ```

   

   ```vue
   <template>
     <div id="app">
       <router-view></router-view>
       <MainTabBar></MainTabBar>
     </div>
   </template>
   
   <script>
     import MainTabBar from '@/components/MainTabBar'
     export default {
       name: 'App',
       components: {
         MainTabBar
       }
     }
   </script>
   
   <style>
       /* style中引用使用@import */
     @import url('./assets/css/base.css');
   
   </style>
   
   ```



### 别名配置

- 经常的我们向引入图片文件等资源的时候使用相对路径，诸如`../assets/xxx`这样的使用`../`获取上一层，如果有多个上层就需要`../../xxx`等等这样不利于维护代码。此时就需要一个能获取到指定目录的资源的就好了。

> 配置

- 在`webpack.base.config`中配置使用别名，找到resolve:{}模块，增加配置信息

```js
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'views': resolve('scr/views')
    }
  },
```

- 这里`@`指定目录是`src`，例如`@/components`表示`src/components`目录，`assets`表示`src/assets`前缀，如果是`assets/img`就表示`src/assets/img`目录。







# （十八）Promise

## 18.1	什么是Promise

- **简单说Promise是异步编程的一种解决方案。**

- Promise是ES6中的特性。

> 什么是异步操作？

- 网络请求中，对端服务器处理需要时间，信息传递过程需要时间，不像我们本地调用一个js加法函数一样，直接获得`1+1=2`的结果。这里网络请求不是同步的有时延，不能立即得到结果。

> 如何处理异步事件？

- 对于网络请求这种，一般会使用回调函数，在服务端传给我数据成功后，调用回调函数。例如ajax调用。

```js
$.ajax({
	success:function(){
		...
	}
})
```

> 如果碰到嵌套网络请求，例如第一次网络请求成功后回调函数再次发送网络请求，这种代码就会让人很难受。

```json
$.ajax({
	success:function(){
		$.ajax({
			...
        })
	}
})
```

- 如果还需要再次网络请求，那么又要嵌套一层，这样的代码层次不分明很难读，也容易出问题。



## 18.2	Promise的基本使用

### 什么时候使用Promise？

- 如何解决异步请求冗余这样的问题，promise就是用于**封装异步请求**的。



### Promise对象

```js
new Promise((resolve, reject) => {})
```

- Promise对象的参数是一个函数`(resolve, reject) => {}`
- 这个函数又有2个参数分别是`resolve`和`reject`。这2个参数本身也是函数
- 后面还有回调函数`then(func)`的参数也是一个函数。

> 模拟定时器的异步事件

- 用定时器模拟网络请求，定时一秒为网络请求事件，用console.log()表示需要执行的代码。

```js
//1.使用setTimeout模拟嵌套的三次网络请求
setTimeout(() => {//第一次请求
    console.log("hello world")//第一次处理代码
    setTimeout(() => {//第二次请求
        console.log("hello vuejs")//第二次处理代码
        setTimeout(() => {//第三次请求
            console.log("hello java")//第三次处理代码
        }, 1000)
    }, 1000)
}, 1000)
```

- 一层套一层，看起是不是很绕。

- 使用promise来处理异步操作


```js
//参数 -> 函数
// resolve和reject本身也是函数
//then()的参数也是一个函数
new Promise((resolve, reject) => {
    setTimeout(() => {//第一次网络请求
        resolve()
    }, 1000)
}).then(() => {
    console.log("hello world")//第一次处理代码
    return new Promise((resolve, reject) => {
        setTimeout(() => {//第二次网络请求
            resolve()
        }, 1000).then(() => {
            console.log("hello vuejs")//第二次处理代码
            return new Promise((resolve, reject) => {
                setTimeout(() => {//第三次网络请求
                    resolve()
                }, 1000)
            }).then(() => {
                console.log("hello java")//第三次处理代码
            })
        })
    })
})
```

- 是不是觉得代码还要更复杂了？仔细看看第一个如果使用了多个就找不到对应关系了。相反第二个流程就很清楚，调用`resolve()`就能跳转到`then()`方法就能执行处理代码，`then()`回调的返回值又是一个`Promise`对象。层次很明显，只要是`then()`必然就是执行处理代码，如果还有嵌套必然就是返回一个Promise对象，这样调用就像java中的StringBuffer的append()方法一样，链式调用。


```js
new Promise((resolve, reject) => {
    setTimeout(() => {
    	resolve('success')
    }, 1000).then(success => {
    	console.log(success)
    })
})
```

- setTimeout()模拟的是网络请求，而then()执行的是网络请求后的代码，这就将网络请求和请求得到响应后的操作分离了，每个地方干自己的事情。在resolve中传参了，那么在then()方法中的参数就有这个参数，例如data。

**网络请求中也会有失败情况？例如网络堵塞。**

- 如何处理失败情况，此时就要用到reject()

```js
new Promise((resolve, reject) => {
    setTimeout(() => {
    	reject('error message')
    }, 1000).catch(error => {
    	console.log(error)
    })
})
```

- 此时`reject(error)`，`catch()`方法捕获到`reject()`中的error。


> 合起来

```js
new Promise((resolve, reject) => {
    setTimeout(() => {
        // 成功的时候调用resolve()
        // resolve('hello world')

        // 失败的时候调用reject()
        reject('error message')
    }, 1000).then(success => {
        console.log(success)
    }).catch(error => {
        console.log(error)
    })
})
```

- 拿ajax来举例子：


```js
new Promise((resolve, reject) => {
    $.ajax({
        success:function(){
            // 成功的时候调用resolve()
            // resolve('hello world')

            // 失败的时候调用reject()
            reject('error message')
        }
    }).then(success => {
        console.log(success)
    }).catch(error => {
        console.log(error)
    })
})
```



## 18.3	Promise的三种状态

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\18-1.png)

- **pending:等待状态**，比如正在进行的网络请求还未响应，或者定时器还没有到时间
- **fulfilled:满足状态**，当我们主动回调了resolve函数，就处于满足状态，并会回调then()
- **reject:拒绝状态**，当我们主动回调reject函数，就处于该状态，并且会**回调catch()**



## 18.4	Promise的链式调用

1. 网络请求响应结果为 hello ,打印hello
2. 处理： hello world ,打印hello world
3. 处理： hello world，vuejs ,打印hello world，vuejs

```js
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('hello')
      }, 1000)
    }).then(res => {
      console.log(res)//打印hello
      return new Promise(resolve => {
          resolve(res + ' world')
      }).then(res => {
        console.log(res)//打印hello world
        return new Promise(resolve => {
          resolve(res + ',vuejs')
        }).then(res => {
          console.log(res)//打印hello world,vuejs
        })
      })
    })
```

- 链式调用就是`then()`方法的返回值返回一个Promise对象继续调用`then()`，此外还有简写`Promise.resolve()`。


```js
new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('hello')
      }, 1000)
    }).then(res => {
      console.log(res)//打印hello
      return Promise.resolve(res + ' world')
    }).then(res => {
        console.log(res)//打印hello world
        return Promise.resolve(res + ',vuejs')
    }).then(res => {
      console.log(res)//打印hello world,vuejs
    })
```

- 还可以直接省略掉`Promise.resolve()`


```js
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('hello')
      }, 1000)
    }).then(res => {
      console.log(res)//打印hello
      return res + ' world'
    }).then(res => {
        console.log(res)//打印hello world
        return res + ',vuejs'
    }).then(res => {
      console.log(res)//打印hello world,vuejs
    })
```

- 如果中途发生异常，可以通过`catch()`捕获异常


```js
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('hello')
      }, 1000)
    }).then(res => {
      console.log(res)//打印hello
      return res + ' world'
    }).then(res => {
        console.log(res)
        // return Promise.reject('error message')//发生异常
        throw 'error message' //抛出异常
    }).then(res => {
      console.log(res)//打印hello world,vuejs
    }).catch(error => {
      console.log(error)
    })
```

- 也可以通过`throw`抛出异常，类似java


```js
throw 'error message' //抛出异常
```



## 18.5	Promise的all使用

- 有这样一个情况，一个业务需要请求2个地方（A和B）的数据，只有A和B的数据都拿到才能走下一步。

> ajax实现

```js
$.ajax({
    ...//结果A
    resultA = true
    callback()
})
$.ajax({
    ...//结果B
    resultB = true
    callback()
})
//回调函数
function callback(){
    if(resultA&&resultB){
        ...
    }
}
```

- 由于不知道网络请求A和网络请求B哪个先返回结果，所以需要定义一个函数只有2个请求都返回数据才回调成功。

> Promise实现

```js
    Promise.all([
      new Promise((resolve, resjct) => {
        $.ajax({
          url: 'url1',
          success: function (data) {
            resolve(data)
          }
        })
      }),
      new Promise((resolve, resjct) => {
        $.ajax({
          url: 'url2',
          success: function (data) {
            resolve(data)
          }
        })
      }).then(results => {
        console.log(results)
      })
    ])
```

- 上面是伪代码，只是包装了ajax，ajaxA和ajaxB的结果都放在`resolve()`中，Promise将其放在`results`中了，使用`setTimeout`模拟。

```js
    Promise.all([
      new Promise((resolve, reject) => {
        setTimeout(() => {//  请求A
          resolve('结果A')
        }, 1000)
      }),
      new Promise((resolve, reject) => {
        setTimeout(() => {//  请求B
          resolve('结果B')
        }, 1000)
      })
    ]).then(results => {
      console.log(results)
    })
```







# （十九）Vuex

## 19.1	什么是Vuex

> Vuex就是一个**状态管理模式**，为什么叫模式？因为Vuex包含了一套**对state(状态)的操作规范，集中存储管理应用的所有组件的状态**。

### 状态管理

- 简单来说就是**管理各个组件共享的数据**，类似session

- session可以存数据，**存的过程就是管理**，数据的每一次赋值就是当次状态。

- Vuex在Vue实例顶层中。

  - Vuex也可以理解为java中的一个map，这个map是static（静态资源）的，每次获取map的值，都需要调用java的api，比如map.get(key)获取对应的值，也可以放入数据map.put(data)，而且这个数据是所有类都可以调用的，只需要导入这个map就能使用里面的共享数据。

  - 不了解java也没关系，你也可以理解成为百度百科就是一个容纳百科知识的容器，你要搜vuex，百科就会出现vuex的描述，这个搜索就是获取状态，如果你角色百科的vuex描述有误。你也可以发起修改操作，改成正确的vuex描述，这个修改操作就是修改vuex在百科里面的状态。当然你可以搜索修改vuex，别人也可以，因为这个状态是共享的。

  - 简单来看实现这个功能好像我们自己封装一个对象就能实现，但是Vuex有一个特性就是响应式。如果我们自己封装对象想做到完美响应式比较麻烦，所有Vuex帮我们做了这个事情。

### 什么状态需要Vuex去管理？

- 比如用户的登录的状态（token）、用户的信息（头像、名称、地理位置信息）等等
- 比如商品的收藏，购物车的商品等等
- 这些状态应该是响应式的，用户昵称、头像修改了需要响应

### Vuex简单模型

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\19-01.png)

- **state**，驱动应用的数据源，相当于组件的data对象；
- **view**，以声明方式将 **state** 映射到视图；
- **actions**，响应在 **view** 上的用户输入导致的状态变化。

> 这是一个单页面数据流向，比如想要修改用户昵称，当前用户昵称的状态是A，通过输入框输入了新的昵称B，调用ajax请求后端修改成功后将state改成B，然后视图响应用户昵称的变化从A到B。

但是，当我们的应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。
- 所以我们需要vuex的规范操作来管理状态。



## 19.2	Vuex基本使用

**1.新建一个vuecli2工程**

使用`vue init webpack 01-vuex-vuecli2`新建一个vue项目。

```shell
vue init webpack 01-vuex-vuecli2
```

**2.修改`App.vue`并新建一个`HelloVuex.vue`组件**

```vue
<template>
  <div id="app">
    <h3>{{ message }}</h3>
    <h3>{{ count }}</h3>
    <button @click="count++">+</button>
    <button @click="count--">-</button>
    <hello-vuex :count="count"/>
  </div>
</template>

<script>
import HelloVuex from './components/HelloVuex'

export default {
  name: 'App',
  data () {
    return {
      message: '',
      count: 0
    }
  },
  components: {
    HelloVuex
  }
}
</script>
```

> HelloVuex.vue

```vue
<template>
  <div class="hello">
    <h2>{{ message }}</h2>
    <h2>{{ count }}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloVuex',
  data () {
    return {
      message: 'HelloVuex'
    }
  },
  props: {
    count: Number
  }
}
</script>
```

此时我们使用了父子组件通信来完成子组件`HelloVuex`获取父组件的`count`。

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\19-02.gif)

- 如果不是父子组件如何通信，此时就需要vuex了，还是这这2个组件，现在不使用父子通信，直接使用vuex。

**3.使用vuex管理状态**

- 使用`npm install vuex --save`安装Vuex

- 安装插件Vue.use(Vuex)，在src下新建一个store文件夹，新建一个index.js

  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'
  
  // 1.安装插件
  Vue.use(Vuex)
  
  // 2.创建对象
  const store = new Vuex.Store({
    state: { // 状态集合
      count: 0 // 具体的状态数据
    }
  })
  
  // 3.导出store对象
  export default store
  ```

- 修改`App.vue`和`HelloVuex.vue`，直接使用`$store.state.count`获取count值

  ```vue
  <template>
    <div id="app">
      <h3>{{ message }}</h3>
      <h3>{{ $store.state.count }}</h3>
      <button @click="$store.state.count++">+</button>
      <button @click="$store.state.count--">-</button>
      <hello-vuex />
    </div>
  </template>
  
  <script>
  import HelloVuex from './components/HelloVuex'
  
  export default {
    name: 'App',
    data () {
      return {
        message: ''
      }
    },
    components: {
      HelloVuex
    }
  }
  </script>
  ```

  ```vue
  <template>
    <div class="hello">
      <h2>{{ message }}</h2>
      <h2>这是HelloVuex的count：{{ $store.state.count }}</h2>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HelloVuex',
    data () {
      return {
        message: 'HelloVuex'
      }
    }
  }
  </script>
  ```

- 一般不会直接使用`$store.state.count`获取vuex中的状态，也不是直接使用`$store.state.count++`来操作vuex中的状态。



## 19.3	Vuex的流程

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\19-03.png)

- Vue Components是vue组件
- Mutations ：更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
- State 是vuex中状态的集合
- Actions与Mutations 类似，经常与后端交互，不同在于：
  - Action 提交的是 mutation，而不是直接变更状态。
  - Action 可以包含任意**异步操作**，mutation不能进行异步操作

- 组件中修改state，通过提交 mutation，修改完成后vuex帮我们响应到vue组件上。



### 修改index.js使用mutation

```js
// 2.创建对象
const store = new Vuex.Store({
  state: { // 状态集合
    count: 0 // 具体的状态数据
  },
  mutations: { // 操作修改state（状态）
    increment (state) { // 增加
      state.count++
    },
    decrement (state) { // 减少
      state.count--
    }
  }
})
```

### 修改App.vue提交mutation

```vue
<template>
  <div id="app">
    <h3>{{ message }}</h3>
    <h3>{{ $store.state.count }}</h3>
    <button @click="add">+</button>
    <button @click="sub">-</button>
    <hello-vuex />
  </div>
</template>

<script>
import HelloVuex from './components/HelloVuex'

export default {
  name: 'App',
  data () {
    return {
      message: ''
    }
  },
  components: {
    HelloVuex
  },
  methods: {
    add () {
      this.$store.commit('increment')
    },
    sub () {
      this.$store.commit('decrement')
    }
  }
}
</script>
```

### 测试

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\19-04.gif)

- 测试发现没有问题与直接使用`$store.state.count++`效果一致，通过提交mutation修改了状态state，在`vue-devtools`中也能跟踪state变化以及提交的mutation。



## 19.4	Vuex的核心概念

- State —— “状态”
- Getters
- Mutation —— “改变”
- Action —— “行为”
- Moudule —— “模块”



### State（单一状态树）

- Vuex 使用**单一状态树**——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“**唯一数据源** ([SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth))”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

- 简单说就是把数据所有有关的数据封装到一个对象中，这个对象就是store实例，无论是数据的状态（state），以及对数据的操作（mutation、action）等都在store实例中，便于管理维护操作。

- state的操作在19.2.Vuex的基本使用已经了解，直接通过`this.$store.state`获取state对象。



### Getters

- Getters类似**计算属性**，帮我们做一些重复的事情。

- 例如有这样一个store实例，我们需要获取**年龄大于20岁的学生数量**：

```js
const store = new Vuex.Store({
  state: { // 状态集合
    students: [
      {id: 110, name: 'zzz', age: '18'},
      {id: 111, name: 'ttt', age: '20'},
      {id: 112, name: 'yyy', age: '22'},
      {id: 113, name: 'zty', age: '25'}
    ]
  }
})
```

- 你可能会这样写这样一个计算属性去获取**年龄大于20岁的学生数量**：

```js
computed: {
    stuCount() {
      return this.$store.state.students.filter(student => student.age > 20).length
    }
  }
```

- 如果很多组件中需要**年龄大于20岁的学生数量**，你可能会将这个计算属性复制，将filter函数写很多遍，但是如果你有**Getters**。

> 在store实例中定义getters

```js
  getters: {
    getStudentCounts: state => {
      return state.students.filter(s => s.age > 20).length
    }
  }
```

> 通过属性调用getters

```
computed: {
    stuCount() {
      return this.$store.getters.getStudents
    }
  }
```

- 现在只需要调用getters的getStudents对象，就能获取数量。

- 如果你想查询指定ID（传入ID）的学生信息。

- 你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

> 定义getters

```js
  getters: {
    getStuById: state => id => {
      return state.students.find(s => s.id === id)
    }
  }
```

> 通过方法访问

```js
  computed: {
    stuById() {
      return this.$store.getters.getStuById(110)
    }
  }
```

- 传入学生ID为110，输出

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\19-05.png)

### Mutation（状态更新）

- Vuex的store状态更新的唯一方式：**提交Mutation**

- Mutation主要包括两个部分：

  - 字符串的**事件类型（type）**

  - 一个**回调函数（handler）**，这个回调函数就是我们实际进行状态更改的地方，该回调函数的**第一个参数就是state**

- mutations规范

  - mutations中的每个方法尽可能完成的事件比较单一

- Mutation的定义方式：

  ```js
  mutation: {
      increment (state) {
          state.count++
      }
  }
  // increment 为事件类型
  ```

- 通过Mutation更新

  ```js
  mutation () {
  	this.$store.commit('increment')
  }
  ```



#### mutation接受单个参数

- mutation携带的参数被称为是mutation的**载荷**（Payload）

- 在19.2的工程的基础上修改，添加2个按钮分别是让state中的**count+5、count+10**，增加2个按钮

```vue
<button @click="addCount(5)">+5</button>
<button @click="addCount(10)">+10</button>
```

- 新增**addCount**方法:

```js
addCount (count) {
    this.$store.commit('addCount', count) // 将count传入
}
```

- 新增一个mutation

```js
addCount (state, count) { // 第二个参数是count，第一个始终是state
	state.count+=count
}
```

- 测试：

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\19-06.gif)

#### mutation接受多个参数

- 如果mutation需要接受多个参数，此时可以传一个**对象**，例如新增一个功能点击按钮新增一个学生，此时需要传学生的ID、姓名、年龄，可以封装成一个学生对象传入。

1. **新增按钮**

   ```vue
   <button @click="addStu()">新增一个指定的学生</button>
   ```

2. **新增mutation**

   ```js
   addStu (state, stu) {
       state.students.push(stu) // 向数组中添加指定的stu
       console.log(state.students.find(s => s.id === stu.id)) // 输出打印查看state中是否有新增stu
   }
   ```

3. **新增方法**

   ```js
   addStu () {
       const stu = {
           id: 114,
           name: 'ytz',
           age: '35'
       }
       this.$store.commit('addStu', stu)
   }
   ```

4. **测试**

   ![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\19-07.png)

#### mutation的提交风格

1. 普通提交风格

   ```js
   this.$store.commot('increment', count)
   ```

   此时count传过去的就是count=10

2. 特殊的提交封装

   ```js
   this.$store.commit({
   	type: 'addCount',
   	count //count：count
   })
   ```

   ```js
   addCount (state, payload) { // 此时传入的就不是一个count值了，而是一个对象
   	state.count += payload.count
   }
   ```

   - 此时count传过去是一个对象payload（载荷）

   ```js
   {
   	type: 'incrementCount',
   	count: 10
   }
   ```



#### Vuex的响应式原理

- Vuex的store的state是响应式的，当state中的数据发生改变时，Vue组件会自动更新。

- 响应式需要遵循规则
  - state的对象需要**初始化**
  - 如果需要给state中的对象添加新属性的时候，使用以下方式
    - 使用**Vue.set(obj, 'newProp', 123)**
    - 用新对象替换旧对象



1. 在state中增加一个对象user

   ```js
   user: {
       name: 'zhangsan',
       sex: '男'
   }
   ```

2. 在app.vue增加按钮修改信息

   ```vue
   <h3>{{ $store.state.user }}</h3>
   <button @click="updateInfo()">修改信息</button>
   ```

3. app.vue增加按updateInfo()方法

   ```js
   updateInfo () {
       this.$store.commit('updateInfo', 12)
   }
   ```

4. 在mutation中添加updateInfo()

   ```json
   updateInfo (state, age) {
       state.user.age = age
   }
   ```

   

5. 点击**修改信息**按钮，发现state的值变化了，但是页面没有响应变化

   ![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\19-08.png)

6. 使用`Vue.set()`方法支持响应式

   ```js
       updateInfo (state, age) {
         // state.user.age = age
         Vue.set(state.user, 'age', 12)
       }
   ```

   

7. 再次点击**修改信息**按钮，发现变响应式了

   ![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\19-09.png)

> 总结

1. state未初始化属性（`age`）

   - 使用直接赋值的方式不能响应式
   - 需要使用` Vue.set(state.user, 'age', 12)`

2. state已经初始化了，可以使用直接赋值方式

3. 关于删除属性

   ```js
         // 该方法没有响应式，需要使用vue.delete
         // delete state.user.age
         Vue.delete(state.user, age)// 响应式删除age
   ```



#### mutation的类型常量

- 一个vue文件中有关mutation的方法太多了，常常可能写错，所有可以在store文件夹下定义一个`mutation-type.js`的常量。

1. 定义一个`mutation-type.js`的常量

```json
export const UPDATEINFO = 'updateInfo'
```

2. 修改`App.vue`的updateinfo方法

```js
import { UPDATEINFO } from './store/mutation-type'
[UPDATEINFO] () {
	this.$store.commit(UPDATEINFO, 12)
}
```

3. 修改store的`index.js`，将mutation的方法名也改成常量使用方式

```js
import { UPDATEINFO } from './mutation-type'
[UPDATEINFO] (state, age) {
    // state.user.age = age
    Vue.set(state.user, 'age', 12)
    // 该方法没有响应式，需要使用vue.delete
    // delete state.user.age
    // Vue.delete(state.user, age)// 响应式删除age
}
```

- 这样保证了所有的方法都定义在`mutation-types.js`中，不会出问题。





### Actions

- 使用mutation操作更新state的时候，使用异步修改数据。
- 有逻辑判断时使用

1. 修改updateInfo()方法

```js
[UPDATEINFO] (state, age) {
    Vue.set(state.user, 'age', 12)
    setTimeout(() => { // 延时模拟异步网络请求
        state.user.name = 'lisi'
    }, 1000)
}
```

2. 点击**修改信息**按钮

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\19-10.png)

- 发现页面的数据改变了，但是vue-devtools工具中并未跟踪到改变。所以我们不要在mutation中进行异步操作。

> 定义

- Action 类似于 mutation，不同在于：
  - Action 提交的是 mutation，而不是直接变更状态。
  - Action 可以包含任意异步操作。

1. 新增一个mutation

```js
updateName (state, name) {
	state.user.name = name
}
```

2. 新增一个actions

```js
actions: {
    // context：上下文
    aUpdateInfo (context, name) {
        setTimeout(() => {
        context.commit(UPDATEINFO, 12)
        }, 1000)
    }
}
```

3. 在`App.vue`中新增一个按钮修改user对象姓名

```vue
<h3>异步修改的信息:{{ $store.state.user }}</h3>
<button @click="aUpdateInfo()">异步修改信息</button>
```

4. 给按钮新增方法

```js
aUpdateInfo () {
	this.$store.dispatch('aUpdateInfo', 'lisi')
}
```

5. 点击`异步修改信息`按钮测试

![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\19-11.png)

- 在点击按钮之后，信息修改了，dev-tools也能跟踪到state的变化。通过`$store.dispacth()`方法来调用actions，发送异步请求，在actions中需要提交mutation来修改state。

6. **actions回调**，在异步操作后，成功或者失败都应该会有回调，`$store.dispacth()`返回一个Promise对象，修改actions，返回一个Promise对象，成功调用`resolve(msg)`，将成功的`msg`传入（**不理解的请看一下18章的Promise对象详解**）。

   ```js
   actions: {
       // context：上下文
       aUpdateInfo (context, name) {
           let msg = '响应成功'
           return new Promise((resolve, reject) => {
               setTimeout(() => {
                   context.commit(UPDATEINFO, 12)
                   resolve(msg)
               }, 1000)
           })
       }
   }
   ```

   

7. 修改`aUpdateInfo()`方法，获取回调参数`msg`，此时的`response`就是actions中回调的`msg`，也可以支持失败的回调，只要actions中使用了reject，在`aUpdateInfo()`方法中catch回调结果就能获取resjct对象回传结果。

   ```js
   aUpdateInfo () {
       this.$store.dispatch('aUpdateInfo', 'lisi').then(response => {
           console.log(response)
       })
   }
   ```

8. 再次点击`异步修改信息`，打印结果信息

   ![](C:\Users\86136\Desktop\repository\notes\13-Vue\images\19-12.png)

> Actions 支持同样的载荷方式(**payload**)和对象方式进行分发

```js
// 以载荷形式分发
store.dispatch('aUpdateInfo', {
  name: 'lisi'
})

// 以对象形式分发
store.dispatch({
  type: 'aUpdateInfo',
  name: 'lisi'
})
```



### moudules（模块）

- 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

- 为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。

- 比如这样

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状
```



> 模块的局部状态

1. 模块内部的mutation 和 getter，接收的第一个参数是**模块的局部状态对象**。

2. 模块内部的 action，局部状态是 `context.state` ，**根节点状态则为 `context.rootState`。**

3. 对于模块内部的 getter，第三个参数是**根节点**状态。

   ```js
   const moduleA = {
     state: () => ({
       count: 0
     }),
     mutations: {
       increment (state) {
         // 这里的 `state` 对象是模块的局部状态
         state.count++
       }
     },
     actions: {
       incrementIfOddOnRootSum (context) {
         if ((context.state.count + context.rootState.count) % 2 === 1) {
           context.commit('increment')
         }
       }
     },
     getters: {
       doubleCount (state, getters, rootState) {
         console.log(rootState.count) // 获取的是根状态的count
         return state.count * 2
       }
     }
   }
   ```

   > 注意actions的context

   ```js
   actions: {
       incrementIfOddOnRootSum ({ state, commit, rootState }) {
           if ((context.state.count + context.rootState.count) % 2 === 1) {
               context.commit('increment')
           }
       }
   }
   ```

   `{ state, commit, rootState }`对应`context`对象中的属性，使用ES6的**对象解构**。



### 项目结构

- Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：

1. 应用层级的状态应该集中到单个 store 对象中。
2. 提交 **mutation** 是更改状态的唯一方法，并且这个过程是同步的。
3. 异步逻辑都应该封装到 **action** 里面。

- 只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。

- 对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：

```bash
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```







# （二十）Axios

## 20.1	为什么选择Axios

- 可以在浏览器发送XMH请求
- 在nodejs发送http请求
- 支持Promise API
- 拦截请求和响应
- 转换请求和响应数据

>  补充
>
>  axios：ajax i/o system 理解



## 20.2	axios框架基本使用

### 多种请求方式

- axios( config )
- axios.request（config）
- axios.get（url [，config]）
- axios.delete(url [，config])
- axios.head(url [，config])
- axios.post(url [，data[, config]])
- axios.put(url [，data[, config]])
- axios.patch(url [，data[, config]])

### axios()

```javascript
// 默认使用GET方法
axios({
  url: 'http://123.207.32.32:8000/home/multidata',
  method: 'GET'
}).then(res => {
  console.log(res)
})
```

#### get请求——参数拼接

```javascript
axios({
  url: 'http://123.207.32.32:8000/home/multidata',
  method: 'GET',
  params: {
    type: 'pop',
    page: 1
  }
}).then(res => {
  console.log(res)
})
```





## 20.3	axios发送并发请求

> ajax: Promise.all ([])
>
> axios: axios.all ([])

### 格式

```javascript
axios.all([axios(),axios()]).then(res => {})

axios.all([
  axios({
    url: 'http://123.207.32.32:8000/home/multidata'
  }),
  axios({
    url: 'http://123.207.32.32:8000/home/data'
  })
])
.then(res => {
  console.log(res)
})
```

#### 分割结果

```javascript
axios.all([
  axios.get('http://123.207.32.32:8000/home/multidata'),
  axios.get('http://123.207.32.32:8000/home/data',{
     params: { type: 'shell', page: 1 }})])
.then(axios.spread((res1, res2) => {
  console.log(res1)
  console.log(res2)
}))
```





## 20.4	axios的配置信息

- 上面的案例中，BaseURL是固定的
  - 在开发中很多参数都是固定的
  - 这个时候可以进行一些抽取，也可以利用axios的**全局配置**
  - defaults属性

#### 实例

```javascript
axios.defaults.baseURL = 'http://123.207.32.32:8000'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 1000
```

```javascript
// 全局配置
axios.defaults.baseURL = 'http://123.207.32.32:8000'

// 并发请求
axios.all([
  axios({
    url: '/home/multidata'
  }),
  axios({
    url: '/home/data'
  })
])
.then(res => {
  console.log(res)
})
```

#### 常见配置选项

- 请求地址 
  - url：‘/user’
- 请求类型
  - method：‘get’

- 请求路径
  - baseURL：‘http://www.xxx.com/api’
- 请求前的数据处理
  - transformRequest: [function(data){}]
- URL查询对象
  - params: { id:12 }



## 20.5	axios的实例和模块封装

#### 创建axios实例

```javascript
const instance1 =  axios.create({
  baseURL: 'http://123.207.32.32:8000',
  timeout: 5000
})

// 使用
instance1({
  url: '/home/multidata'
}).then(res => {
  console.log(res)
})

instance1({
  url: 'home/data',
  params: { 
    type: 'pop',
    page: 1
  }
}).then(res => {
  console.log(res)
})

```

> 每个实例可以看成不同的服务器。



#### 封装成单独文件

> 分析封装的优点

- 第一次封装

```javascript
export function request (config, success, failure) {
  // 1.创建axios实例
  const instance = axios.creat({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  instance(config)
    .then(res => {
      success(res)
    })
    .catch(err => {
      failure(err)
    })
}

// 其他文件调用
import { request } from './network/request.js'

request({
  url: '/home/data'
}, res => {
  console.log(res)
}, err => {
  console.log(err)
})

```



- 第二次封装

```javascript
export function request (config) {
  // 1.创建axios实例
  const instance = axios.creat({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  instance(config.baseConfig)
    .then(res => {
      config.success(res)
    })
    .catch(err => {
      config.failure(err)
    })
}


// 调用
request({
  baseConfig: {

  },
  success: function (res) {

  },
  failure: function (ree) {
    console.log(err)
  }
})

```



- 方案三

```javascript
export function request (config) {
  return new Promise((resolve, reject) => {
    // 1.创建axios实例
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
    })
    
    // 2.发送请求
    instance(config)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 调用
request({
  url: '/home/data'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

```



- **最终方案**

```javascript
export function request (config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })
  
  // 2.发送请求
  return instance(config)
}

// 调用
request({
  url: '/home/data'
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

```





## 20.6	axios拦截器使用

- 作用

  - 用于在发送每次请求或者得到响应后，进行对应处理

- 使用

  - 请求拦截——成功、失败

    `instance.interceptors.request`

  - 响应拦截——成功、失败

    `instance.interceptors.response`

```javascript
// 3.拦截器
  instance.interceptors.request.use(config => {
    console.log(config)
    // (1)处理数据、信息转化
    // (2)比如每次发送网络请求时，希望在界面显示一个请求图标
    // (3)某些网络请求必须携带一些特殊信息（token）
    return config  // 拦截后需要还回去
  }, err => {
    console.log(err)
  })

  instance.interceptors.response.use(res => {
    console.log(res)
    // 取出数据
  }, err => {
    console.log(err)
  })
```



# （二十一）Better Scroll

## 21.1	基本使用

### 安装

`<script src="https://unpkg.com/@better-scroll/core@latest/dist/core.js"></script>`

### 使用

```javascript
// js代码
const ct = document.querySelector('.content')
const bscroll = new BScroll(ct, {
    
})

```

```html
<div class="content">
  <ul>
    <li></li>
    ...
  </ul>
</div>

```



## 21.2	参数

```javascript
const ct = document.querySelector('.content')
const bscroll = new BScroll(ct, {
  probeType: 2
})
```

#### probeType

> 实时侦测滚动位置，默认值0

- 值
  - 0/1都不监听
  - 2：手指滚动过程中侦测，离开后惯性滚动不侦测
  - 3：只要滚动都侦测



#### pullUpLoad

> 上拉加载功能

- 值
  - Boolean
  - object



#### useTransition

>解决滑动时字体变模糊问题

- 值
  - true



## 21.3	BScroll可滚动区域问题

- BScroll在决定有多少区域可以滚动时，是根据scrollerHeight属性决定

  - scrollerHeight属性是根据放BScroll的content中的子组件高度决定
  - 但是首页中，刚开始计算scrollerHeight属性时，是没有将图片计算在内的
  - 所以计算出来的高度是错误的
  - 后来图片加载进来后有了新高度，但是scrollerHeight属性没有进行更新
  - 所以出现了滚动问题

- 解决

  - 监听每一张图片是否加载完成，只要有一张图片加载完成了，执行一次**refresh**

  - 如何监听图片加载完成了？
    - 原生js监听图片：img.onload = function(){}
    - Vue中监听：@load = '方法'
  - 调用scroll的refresh()
    - 隔太远，不好传值
    - 解决
      - Vuex
      - **事件总线**

- 事件总线 $bus

  - 作用：管理事件

  - 区别Vuex管理状态

  - 使用

    - `Vue.prototype.$bus = new Vue()`

    - goodslistitem发射事件

      - `this.$bus.$emit('itemImageLoad')`

    - home监听该事件

      - `this.$bus.on('itemImageLoad', () => {})`

        

### 防抖函数

- 优化：refresh调用次数过多

> 防抖：**在规定时间内执行多次事件只执行最后一次事件**

- 防抖debounce / 节流throttle

- 作用过程
  - 如果直接执行refresh，那么refresh函数会被执行30次
  - 可以将refresh函数传入到debounce函数中，生成一个新的函数







#  商城项目1.0



## Project setup

```
npm install
```

### Compies and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```



## 目录结构

```javascript
┌-  ..
├-	public/
    ├-  favicon.ico			// ico
    ├-	index.html
├-	src/
    ├-	assets/				// 项目资源
           ├- css/			
    			- normalize.css // 第三方统一样式
				- base.css		// 自定义统一样式
           ├- img/
    ├-	components			// 公共组件
           ├- common/		// 纯公共组件（扩展其他项目）
               ├- navbar/	// 公共导航条组件
               		- NavBar.vue
               ├- tabbar/ 	// 底部导航栏组件	
                   	- TabBar.vue
					- TabBarItem.vue
               ├- swiper/   // 轮播图组件	
                   	- index.js
					- Swiper.vue
					- SwiperItem.vue
           ├- content/		// 当前项目公共组件
               ├- mainTabBar// 底部导航栏（业务版）
					- MainTabBar.vue
    ├-	common/    			// 公共js文件
    ├-  network/			// 网络请求文件
           ├- home.js		// 主页网络请求文件封装
		   ├- request.js	// 全局网络请求封装
    ├-	router/				// 路由文件
           ├- index.js		
    ├-  store/				// 状态管理文件
    ├-	views/				// 页面视图
           ├- category/
        	   ├- Category.vue // 分类页面主组件
           ├- home/			// 主页视图
               ├- childComps// 主页功能小组件
					- HomeSwiper.vue
			   ├- Home.vue  // home主组件
           ├- profile/
               ├- Profile.vue// 个人页面主组件
           ├- shotcart/
               ├- Shotcart.vue// 购物车主组件
    ├-	App.vue				// root组件
    ├- 	main.js				// 启动文件
├-	vue.config.js			// 自定义配置文件
├-	.gitignore				// git提交忽略文件
├-	babel.config.js
├-	package.json			// 版本控制
├-	package-lock.json		// 版本锁
├-	LICENSE					// 许可
├-	README.md				// what u see
└-	
```



## 步骤

- 导入base.css样式
  - normalize.css
- 配置文件路径别名
  - vue.config.js，必须与src文件同目录
  - 默认有‘@’：’src‘
- 配置代码风格文件
  - .editorconfig
- 导航模块划分
  - tabbar -> 路由映射关系
- 首页开发
  - navbar封装
  - 网络数据的请求
  - 轮播图
  - 推荐信息





>  附录
>
>  [1] 首页保存商品的数据结构设计
>
>  ```javascript
>  goods(流行/新款/精选)
>  
>  goods: {
>  'pop': {page: 5, list: [150]},
>  'news': {page: 1, list: [90]},
>  'sell': {page: 1, list: [30]}
>  }
>  ```
>
>  

>  附录

## tabControl的吸顶效果

#### 获取到tabControl的offsetTop

- 必须知道滚动到多少时，开始有吸顶效果，这个时候就需要获取tabControl的offsetTop
- 但是，如果直接在mounted中获取tabControl的offsetTop，那么值不正确
- 如何获取正确的值？
  - 监听HomeSwiper中的img的加载完成
  - 加载完成后。发出事件，在home.vue中，获取正确的值
  - 补充：为了不让homeSwiper多次发出事件，使用isLoad变量进行记录状态
    - 注意：这里不进行多次调用和debounce的区别

#### 监听滚动，动态改变TabControl的样式

- 问题一：下面的商品内容会突然上移
- 问题二：tabControl虽然设置了fixed，都是也随着BS一起滚出去了
- 其他方案
  - 在最上面，复制了一份TabControl组件对象，利用它来实现停留效果
  - 当用户滚动到一定位置时，TabControl显示出来
  - 当用户滚动没有到达一定位置时，隐藏起来



### 让Home保持原来状态

#### 让Home不要随意销毁掉

- keep-alive

#### 让home中保持原来位置



## FastClick点击事件优化



## 图片懒加载 vue-lazyload库

### 基本使用

- 安装

`npm i vue-lazyload`

- 在main.js导入	

  - ```
    import VueLazyLoad from 'vue-lazyload'
    ```

  - ```
    Vue.use(VueLazyLoad)
    ```

- 修改img

  - ：scr→ v-lazy

### 参数

- 占位图：loading
- ...

## CSS单位转化插件 px2vw





## 部署

- windows-Nginx
- centos-Nginx