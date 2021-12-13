## angularjs入门

### AngularJS是什么?

- Google开源的前端JS结构化框架

	- https://angularjs.org/

- AngularJS特性和优点

	- 双向数据绑定
	- 声明式依赖注入
	- 解耦应用逻辑, 数据模型和视图
	- 完善的页面指令
	- 定制表单验证
	- Ajax封装

- 与jQuery的比较

	- jQuery

		- JS函数库
		- 封装简化dom操作

	- angular

		- JS结构化框架
		- 主体不再是DOM, 而是页面中的动态数据

- AngularJS能做什么项目

	- 构建单页面(SPA)Web应用或Web App应用

		- SPA

			- 特点

				- 将所有的活动局限于一个页面
				- 当页面中有部分数据发送了变化不会去刷新整个页面，而是局部刷新
				- 利用Ajax技术，路由

	- 应用

		- 饿了吗: https://www.ele.me/home/
		- 微信网页版: https://wx.qq.com/
		- 知乎周报: https://zhuanlan.zhihu.com/Weekly
		- 后台管理应用: 阿里云, 土豆后台, 唯品会...

### 开发第一个Angular应用

1. 使用<script>引用AngularJS源文件
	1). 本地引入:  angularjs.js
	2). 在线远程引入(CDN):  http://cdn.bootcss.com/angular.js/1.5.5/angular.min.js

2. 在页面中使用Angular的指令和表达式
	ng-app
	ng-model
	{{name}}

- 引入AnaularJS
- 使用AngularJS
- 例子

  <!DOCTYPE html>
  <html ng-app="">
  <head lang="en">
      <meta charset="UTF-8">
      <title></title>
  </head>
  <body>
      <input type="text" placeholder="用户名" ng-model="username">
      <p>你输入的用户名为: {{username}}</p>
  </body>
  <script type='text/javascript' src="../../vendor/angular/angularjs.js"></script>
  </html>

	- ng-app (指令)

		- 告诉angular核心它管理当 前标签所包含的整个区域,并且会自动创建  $rootScope  根作用域对象
		- 通常放在body标签上

	- ng-model (指令)

		- 将当前输入框的值与谁关联(属性名:属性值)

			- 并作为当前 作用域对象($rootScope)的属性

	- {{ }}  （表达式）

		- 显示数据,从作用域对象的指定属性名上取

- 对比jQuery

  <!DOCTYPE html>
  <html>
  <head lang="en">
      <meta charset="UTF-8">
      <title></title>
  </head>
  <script type="text/javascript" src="../../vendor/jQuery/jquery-1.11.1.js"></script>
  <script type="text/javascript">
      $(function () {
          $('#name').keyup(function () {
              var name = this.value;
              $('#resultSpan').html(name);
          });
      });
  </script>
  <body>
      <input type="text" name="username" id="name">
      <p>你输入的用户名为：<span id="resultSpan">还未输入</span></p>
  </body>
  </html>

- 使用ng-inspector插件

### 补充

- 表达式

	- 通常有一个返回值，可以放在任何需要值得地方，比如函 数调用的参数，一个变量名，一个运算

- 语句

	- 通常表示一个完整的执行单位，一段完整的js可执行的代码 ，有的语句也可以用表达式来执行，叫做表达式语句。

- 区别

	- 语句用封号结尾

		- 有些语句我们没有加封号，比如console.log
      虽然我们没有加封号，但也是语句

			- 因为js引擎会自动解析并且加上封号。

		- 特例：if语句，就不用加封号  可也是完整的语句。

## 四个重要概念

### 双向数据绑定

- 数据绑定

	- 数据从一个地方A转移(传递)到另一个地方B, 而且这个操作由框架来完成

		- 数据从页面流向内存

	- 视图(View)

		- 也就是我们的页面(主要是Andular指令和表达式)

	- 模型(Model) 

		- 域对象(当前为$rootScope)(内存), 它可以包含一些属性或方法

	- 当改变View中的数据, Model对象的对应属性也会随之改变

		- 数据从View==>Model : ng-model/ng-init

	- 当Model域对象的属性发生改变时, 页面对应数据随之更新

		- 数据从Model==>View : {{}}表达式  

- 双向数据绑定

	- 数据可以从View（视图层）流向Model（数据层）, 也可以从Model流向View
	- ng-model是双向数据绑定, 而 {{}} 是单向数据绑定

### 依赖注入(DI)

- 依赖的对象被自动注入进来

	- Dependency Injection

- 什么是依赖对象?

  完成特定功能的函数需要某个对象才能实现, 这个对象就是依赖对象

	- 完成特定功能的函数需要某个对象才能实现, 这个对象就是依赖对象

- 如何引入依赖对象?

  方式一: 内部自己创建 : 不动态
  方式二: 全局变量 : 污染全局命名空间
  方式三: 形参引入依赖 : 依赖注入使用的方式

	- 方式一: 内部自己创建 : 不动态
	- 方式二: 全局变量 : 污染全局命名空间
	- 方式三: 形参引入依赖 : 依赖注入使用的方式($scope)

- 什么是依赖注入?

  1). 定义函数时, 使用形参声明依赖对象变量, 在函数体中使用依赖对象(我们实现)
  2). 函数调用时, 自动将创建好的依赖对象动态传入(框架实现)
  3). 例子: 事件监听就使用了依赖注入, event就是依赖对象(event可以是任意名称)

	- 1).自己实现

		- 定义函数时, 使用形参声明依赖对象变量, 在函数体中使用依赖对象

	- 2). 框架实现

		- 函数调用时, 自动将创建好的依赖对象动态传入

	- 3). 例子: 事件监听就使用了依赖注入, event就是依赖对象(event可以是任意名称)

- Angular中的依赖注入

  形参必须是特定的名称, 否则Angular无法注入抛异常

- 声明式和命令式

	- 命令式

		- 命令程序执行的时候每一步都是按照自己的指令，更注重执行的过程

	- 声明式

		- 更注重执行的结果。

### MVC模式

- 通用

	- 模型Model

		- 存储数据的实体模型
		- 操作数据的业务模型

	- 视图View

		- 显示数据
		- 响应用户操作, 与用户进行交互

	- 控制器Controller

		- 操作模型数据, 更新视图
		- View与Model之间的桥梁

- angular

	- View视图

		- html/css/directive/expression/filter
		- 显示Model的数据
		- 将数据同步到Model
		- 与用户交互

	- Model模型

		- scope
		- 储存数据的容器
		- 提供操作数据的方法

	- Controller控制器

		- controller
		- 初始化Model数据
		- 为Model添加行为方法

	- 结构图

### M-V-VM模式

- MVVM是MVC的进化版, Angular使用的就是M-V-VM

  在angular中MVVM模式主要分为四部分：
  1. View：它专注于界面的显示和渲染，在angular中则是包含一堆声明式Directive的视图模板。
  2. Model：它是与应用程序的业务逻辑相关的数据的封装载体，它是业务领域的对象，Model并不关心会被如何显示或操作，所以模型也不会包含任何界面显示相关的逻辑。也就是Angular中的Service
  3. ViewModel：它是View和Model的粘合体，负责View和Model的交互和协作，它负责给View提供显示的数据，以及提供了View中Command事件操作Model的途径；也就是Angular中的scope
  4. Controller：这并不是MVVM模式的核心元素，但它负责ViewModel对象的初始化，它将组合一个或者多个service来获取业务领域Model放在ViewModel对象上，使得应用界面在启动加载的时候达到一种可用的状态。

- Model/模型

	- scope中的各个数据对象
	- 数据模型

- View/视图

	- html/css/directive/expression
	- 显示VM中的数据
	- 与用户交互

- ViewModel/视图模型

	- scope对象
	- View和Model的交互和协作
	- 给View提供显示的数据
	- 提供了View中Command事件操作Model的途径

## 三个重要对象

### 作用域(scope)

- 一个js实例对象, ng-app指令默认会创建一个根作用域对象($rootScope)
- 它的属性和方法与页面中的指令或表达式是关联的

### 控制器(controller)

- 用来控制AngularJS应用数据的实例对象
- ng-controller   

	- 指定控制器构造函数, Angular会自动new此函数创建控制器对象 

- 同时Angular还有创建一个新的域对象$scope, 它是$rootScope的子对象
- 在控制器函数中声明$scope形参, Angular会自动将$scope传入

### 模块(module)

- 为什么要用多个模块?
- 创建模块对象

	- 用全局变量angular对象

- 使用模块对象

	- 定义控制器
	- 定义服务
	- 定义指令
	- ...

## 两个页面语法

### 表达式

- 使用Angular表达式

  语法: {{expression}}
  作用: 显示表达式的结果数据
  注意: 表达式中引用的变量必须是当前域对象所有的属性(包括其原型属性)

	- 语法: {{expression}}
	- 作用: 显示表达式的结果数据
	- 注意: 表达式中引用的变量必须是当前域对象所有的属性(包括其原型属性)

- Angular表达式操作的数据

	- 1. 基本类型数据: number/string/boolean
	- 2. undefined, Infinity, NaN, null解析为空串: "", 不显示任何效果
	- 3. 对象的属性或方法
	- 4. 数组

- 比较Angular表达与JS的表达式

	- 1. Angular表达式写法与JS的表达式类同
	- 2. 与JS表达式不同，AngularJS 表达式可以写在HTML中。
	- 3. 与JS表达式不同，AngularJS 表达式不支持条件判断，循环及异常。
	- 4. 与JS表达式不同，AngularJS 表达式支持过滤器(后面专门讲)

### 指令

- Angular指令

	- Angular为HTML页面扩展的属性,标签
	- 与Angular的Model交互,扩展页面的动态表现力

- 常用指令(一)

	- ng-app
	- ng-model
	- ng-controller
	- ng-init
	- ng-click

		- 调用作用域对象的方法（点击时）
		- 点击监听, 值为函数调用, 可以传$event

	- ng-repeat

		- 遍历数组显示数据，数组有几个元素就会产生几个新的作用域
		- 属性

			- $index

				- 索引

			- $first、$last、$middle、$odd(奇数)、$even(偶数)

	- ng-bind

		- 解决使用{{}}显示数据闪屏（在很短时间内显示{{}}）
		- 浏览器解析html标签时，只解析标签，不解析标签属性

	- ng-show

		- 布尔类型， 如果为true才显示

	- ng-hide

		- 布尔类型， 如果为true就隐藏

- 常用指令(2)

	- ng-class

		- 动态引用定义的样式  {aClass:true, bClass:false}

	- ng-style

		- 动态引用通过js指定的样式对象   {color:'red', background:'blue'}

	- ng-include
	- ng-click
	- ng-blur
	- ng-keydown
	- ng-keyup
	- ng-mouseover

		- ng-mouseenter: 鼠标移入监听, 值为函数调用, 可以传$event

	- ng-mousemove

		- ng-mouseleave: 鼠标移出监听, 值为函数调用, 可以传$event

	- ng-mouseout
	- ng-mousedown
	- ng-mouseup
	- $event
	- <form>
	- <input>

*XMind: ZEN - Trial Version*