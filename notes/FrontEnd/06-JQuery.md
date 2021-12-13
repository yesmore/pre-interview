# jQuery

## jQuery基础

### 简介

- 优秀的Js库
- 简化原生js的操作
- 主要用来做查询
- 浏览器兼容
- jQuery框架本质上是一个函数
- 版本

	- 1.x

		- 兼容ie678

	- 2.x

		- 不兼容ie678

	- 3.x

		- 不兼容ie678，只支持最新浏览器

### 使用

- 下载jq库

	- uncompressed

		- 未压缩版本

			- 开发时使用

	- compressed

		- 压缩版本（不利于阅读）

			- 上线时使用

- 引入jq库

	- src="js/jquery-1.12.4.js"

- 加载

	- $(document).ready(function () { });

### 入口函数

- jQuery入口函数

	- $(document).ready(function () { });
	- jQuery(document).ready(function () {});
	- $(function () {});

		- 推荐

	- jQuery(function () {});

- 加载模式对比

	- 原生JS会等到DOM元素加载完毕,并且图片也加载完毕才会执行
	- jQuery会等到DOM元素加载完毕,但不会等到图片也加载完毕就会执行
	- 原生的JS如果编写了多个入口函数,后面编写的会覆盖前面编写的
	- jQuery中编写多个入口函数,后面的不会覆盖前面的

- 解决冲突问题

	- 问题

		- $ 符号的使用发生冲突

			- $ = 123;

	- 解决

		- 1.释放$的使用权

			- jQuery原理.noConflict();
			- 注意点

				- 释放操作必须在编写其它jQuery代码之前编写
				- 释放之后就不能再使用$,改为使用jQuery

		- 2.自定义一个访问符号

			- var nj = jQuery.noConflict();

### 核心函数

- $ ( )

	- 代表调用jQuery的核心函数
	- 作用

		- 接收一个函数（传递函数）

			- $(function () { });

		- 接收一个字符串

			- 接收一个字符串选择器（传递选择器）

				- $box2 = $("#box2");
				- 返回一个jQuery对象, 对象中保存了找到的DOM元素

			- 接收一个代码片段（传递HTML）

				- $p = $("<p>我是段落</p>");
				- 返回一个jQuery对象, 对象中保存了创建的DOM元素

		- 接收一个DOM元素（ 传递DOM对象）

			- $span = $(span);
			- 会被包装成一个jQuery对象返回给我们

### jQuery对象

- 什么是jQuery对象

	- jQuery对象是一个伪数组

- 什么是伪数组?

	- 有0到length-1的属性, 并且有length属性

### 静态方法

- 回顾理解

	- 静态方法

		- 给这个类添加一个静态方法
		- 通过类调用

	- 实例方法

		- 通过类的实例调用

- 方法

	- $.each（object，[ callback ]）

		- 参数

			- 当前遍历到的索引
			- 遍历到的元素

		- 语法

			- $.each(obj, function (index, value) { }）

		- 对比原生js

			- 原生的forEach方法只能遍历数组, 不能遍历伪数组
			- jQuery的each方法是可以遍历伪数组的

	- $.map（arr [obj，callback]）

		- 参数

			- 要遍历的数组
			- 每遍历一个元素之后执行的回调函数

				- 遍历到的元素
				- 遍历到的索引

		- 对比原生js

			- jQuery的map静态方法也可以遍历伪数组
			- js的map和原生的forEach一样,不能遍历的伪数组

	- $.trim（str）

		- 作用

			- 去除字符串两端的空格

		- 参数

			- 需要去除空格的字符串

		- 返回值

			- 去除空格之后的字符串

	- $.isArray（obj）

		- 作用

			- 判断传入的对象是否是真数组

		- 返回值

			- true/false

	- $.isFunction（obj）

		- 作用

			- 判断传入的对象是否是一个函数

		- $.isFunction(jQuery)

	- $.isWindow（obj）

		- 作用

			- 判断传入的对象是否是window对象

		- 返回值

			- true/false

	- $.holdReady（hold）

		- 作用

			- 暂停入口函数的ready执行

		- 值

			- true暂停、false恢复

### jQuery对象

- jQuery选择器

	- 基础选择器、层次选择器、序选择器、属性选择器、内容过滤选择器
	- 内容选择器

		- :empty

			- 作用

				- 找到既没有文本内容也没有子元素的指定元素

		- :parent

			- 作用

				- 找到有文本内容或有子元素的指定元素

		- :contains(text)

			- 作用

				- 找到包含指定文本内容的指定元素

		- :has(selector)

			- 作用

				- 找到包含指定子元素的指定元素

- 属性操作

	- 属性和属性节点

		- 属性

			- 什么是属性?

				- 对象身上保存的变量就是属性

			- 如何操作属性?

				-         对象.属性名称 = 值;
对象.属性名称;
				-         对象["属性名称"] = 值;
对象["属性名称"];

		- 属性节点

			- 什么是属性节点?

				- html标签中的属性
				- <span name = "it666"></span>
            在编写HTML代码时,在HTML标签中添加的属性就是属性节点；
            在浏览器中找到span这个DOM元素之后, 展开看到的都是属性；
            在attributes属性中保存的所有内容都是属性节点

			- 如何操作属性节点?

				- DOM元素.setAttribute("属性名称", "值");
				- DOM元素.getAttribute("属性名称");

		- 区别

			- 任何对象都有属性, 但是只有DOM对象才有属性节点

	- 属性

		- attr ( name|pro|key, val|fn )

			- 作用

				- 获取或者设置属性节点的值

			- 参数

				- 如果传递一个参数, 代表获取属性节点的值
如果传递两个参数, 代表设置属性节点的值

			- 注意

				- 如果是获取

					- 论找到多少个元素, 都只会返回第一个元素指定的属性节点的值

				- 如果是设置

					- 找到多少个元素就会设置多少个元素
					- 如果设置的属性节点不存在, 那么系统会自动新增

		- removeAttr(name[  class，...])

			- 作用

				- 删除属性节点

			- 注意

				- 会删除所有找到元素指定的属性节点

		- prop方法

			- 特点和attr方法一致
			- 返回值（一个参数）

				- true/false

			- 注意

				- prop方法不仅能够操作属性, 他还能操作属性节点

					- 具有 true 和 false 两个属性的属性节点（checked, selected 、disabled）

						- 使用prop()
						- 其他的使用 attr()

		- removeProp方法

			- 特点和removeAttr方法一致

	- Class操作

		- 方法

			- addClass(class|fn)

				- 作用

					- 添加一个类

				- 如果要添加多个, 多个类名之间用空格隔开即可

			- removeClass([class|fn])

				- 作用

					- 删除一个类

				- 如果想删除多个, 多个类名之间用空格隔开即可

			- toggleClass( class|fn [,sw] )

				- 作用

					- 切换类

				- 有就删除, 没有就添加

	- 代码/文本/值操作

		- html ( [ val|fn ] )

			- 同innerHTML

		- text ( [ val | fn ] )

			- 同innerText

		- val ( [val | fn | arr ] )

			- 为标签设置 / 获取value属性（值）

- CSS相关

	- 操作CSS样式

		- 1.逐个设置

			- $("div").css("width", "100px");

		- 2.链式设置

			- $("div").css("width", "100px").css("height", "100px").css("background", "blue");
			- 注意点: 链式操作如果大于3步, 建议分开

		- 3.批量设置

			-          $("div").css({
                width: "100px",
                height: "100px",
                background: "red"
            });

		- 4.获取CSS样式值

			- $("div").css("background")

	- 位置

		- offset([coordinates])

			- 作用: 获取 / 设置元素距离窗口的偏移位

				- $(".son").offset().left
				- $(".son").offset({
left: 10
});

		- position()

			- 作用: 获取元素距离定位元素的偏移位
			- 注意点: position方法只能获取不能设置

		- scrollTop()

			- 获取滚动的偏移位

				- $(".scroll").scrollTop()
				- 获取网页滚动的偏移位

					- $("body").scrollTop()+$("html").scrollTop()
					- 按照如上写法保证浏览器的兼容

			- 设置滚动的偏移位

				- $(".scroll").scrollTop(300);
				- 设置网页滚动偏移位

					- $("html,body").scrollTop(300);
					- 按照如上设置保证浏览器的兼容

		- scrollLeft

	- 尺寸

		- 获取元素的宽度

			- $(".father").width()

		- 设置元素的宽度

			- $(".father").width("500px")

- 事件处理

	- 事件绑定

		- 方式

			- eventName ( fn )

				- 编码效率略高
				- 部分事件jQuery没有实现,所以不能添加

			- on ( eventName, fn );

				- 编码效率略低
				- 所有js事件都可以添加

		- 注意

			- 可以添加多个相同或者不同类型的事件,不会覆盖

	- 事件解绑

		- off（）

			- off方法如果不传递参数, 会移除所有的事件

				- $("button").off();

			- off方法如果传递一个参数, 会移除所有指定类型的事件

				- $("button").off("click");

			- off方法如果传递两个参数, 会移除所有指定类型的指定事件

				- $("button").off("click", test1);

	- 事件冒泡和默认行为

		- 事件冒泡

			- 什么是事件冒泡?

				- 从儿子传向祖先的事件

			- 如何阻止事件冒泡

				- 回调函数中加上   return false;
				- event.stopPropagation();

		- 默认行为

			- 什么是默认行为?

				- 如a标签默认是超链接，不需要绑定事件

			- 如何阻止默认行为

				- 添加  return false;
				- event.preventDefault();

	- 事件自动触发

		- trigger（）

			- $("span").trigger("click");
			- 会触发事件冒泡
			- 会触发默认行为

		- triggerHandler（）

			- $("a").triggerHandler("click");
			- 不会触发事件冒泡
			- 不会触发默认行为

	- 自定义事件

		- 条件

			- 事件必须是通过on绑定的
			- 事件必须通过trigger来触发

	- 事件命名空间

		- 语法

			- click . xxx
			- $(".son").on("click.zs", function () { });
$(".son").trigger("click.zs");

		- 想要事件的命名空间有效,必须满足两个条件

			- 1.事件是通过on来绑定的
			- 2.通过trigger触发事件

		- 面试题

			- 利用trigger触发子元素带命名空间的事件

				- 那么父元素带相同命名空间的事件也会被触发. 而父元素没有命名空间的事件不会被触发

			-  利用trigger触发子元素不带命名空间的事件

				- 那么子元素所有相同类型的事件和父元素所有相同类型的事件都会被触发

	- 事件委托

		- 什么是事件委托?

			- 请别人帮忙做事情, 然后将做完的结果反馈给我们
			- 找一个在入口函数执行之前就有的元素来监听动态添加的某些事件

		- 注意

			- 在jQuery中,如果通过核心函数找到的元素不止一个, 那么在添加事件的时候,jQuery会遍历所有找到的元素,给所有找到的元素添加事件

		- delegate（）

			- $("ul").delegate("li", "click", function () {
			- 代码含义：让 ul 帮 li 监听click事件

				- 之所以能够监听, 是因为入口函数执行的时候ul就已经存在了, 所以能够添加事件
				- 之所以this是li,是因为我们点击的是li, 而li没有click事件, 所以事件冒泡传递给了ul,ul响应了事件, 既然事件是从li传递过来的,所以ul必然指定this是谁（事件冒泡）

	- 事件

		- 移入移除事件

			- mouseover/mouseout

				- 子元素被移入移出也会触发父元素的事件

			- mouseenter/mouseleave

				- 子元素被移入移出不会触发父元素的事件（推荐）

			- hover（）

				- 参数

					- 一个参数

						- 同时监听移入移出

					- 两个参数

						- 1. function（）{ }
						- 2. function（）{}

				- 本质：mouseenter/mouseleave

			- 练习

				- 电影排行榜
				- Tab选项卡

					- index()

						- 获取索引值

					- eq（）

						- 参数：index值

					- siblings()

						- 找到非当前的同级别的其他元素（排他思想）
						- 实例：当选择一个元素时，其他同级元素去除hover效果

- 动画效果

	- 显示/隐藏动画

		- show（）

			- 显示动画
			- 参数

				- 1、动画时间
				- [ 2、回调函数（动画执行完毕调用）]

		- hide（）

			- 隐藏动画
			- 参数

				- 1、动画时间
				- [ 2、回调函数（动画执行完毕调用）]

		- toggle（）

			- 切换动画
			- 参数

				- 1、动画时间
				- [ 2、回调函数（动画执行完毕调用）]

		- 练习

			- 对联广告

				- 监听网页的滚动

					- scroll（）

						- $(window).scroll(function () {})

				- 获取网页滚动的偏移位

					- scrollTop()

						- var offset = $("html,body").scrollTop()

				- 判断网页是否滚动到了指定的位置

					- if

				- 显示广告

					- $("img").show(500)

				- 隐藏广告

					- $("img").hide(500)

	- 展开和收起动画（滑动）

		- slideDown（）

			- 展开动画
			- 参数

				- 1、动画时间
				- [ 2、回调函数（动画执行完毕调用）]

		- slideUp（）

			- 收起动画

		- slideToggle（）

			- 切换

	- 淡入淡出动画

		- fadeIn（）

			- 淡入

		- fadeOut（）

			- 淡出

		- fadeToggle（）

			- 切换

		- fadeTo()

			- 淡入到~
			- $("div").fadeTo(1000, 0.2, function () {

	- 自定义动画

		- animate（）

			- 操作属性

				- 参数

					- 三个参数

						- 修改的属性params

							- 可同时修改多个属性（用逗号隔开），多个属性的动画也会同时执行

						- 动画时长[speed]
						- 回调函数[fn]

					- 四个参数

						- 修改的属性params
						- 动画时长[speed]
						- 动画变换效果[easing]

							- linear

								- 匀速

							- swing

								- 缓动（默认）

						- 回调函数[fn]

			- 累加属性

				- width: "+=100"

			- 关键字

				- toggle

					- 交换
					- width: "toggle"

				- hide

					- 隐藏

		- stop() / delay()

			- delay（）

				- 用于告诉系统延迟时长

			- stop（‘是否停止后续动画’，‘是否完成当前动画’）

				- 参数

					- 立即停止当前动画, 继续执行后续的动画

						- stop()
						- stop(false)
						- stop(false, false)

					- 立即停止当前和后续所有的动画

						- stop(true)
						- stop(true, false)

					- 立即完成当前的, 继续执行后续动画

						- stop(false, true)

					- 立即完成当前的, 并且停止后续所有的

						- stop(true, true)

		- finish

			- 同stop

	- 设置

		-  jQuery.fx.off

			- 打开或关闭所有动画

		- jQuery.fx.interval

			- 设置动画的显示帧速。
			- 值越小越流畅，越耗性能

	- 练习

		- 折叠菜单（显示隐藏动画）

			- 监听一级菜单的点击事件

				- $(".nav>li").click(function () {

			- 拿到二级菜单

				- $sub = $(this).children(".sub");

			- 让二级菜单展开

				- $sub.slideDown(1000);

			- 拿到所有非当前的二级菜单

				- otherSub = $(this).siblings().children(".sub");

			- 让所有非当前的二级菜单收起

				- otherSub.slideUp(1000);

			- 让被点击的一级菜单箭头旋转

				- $(this).addClass("current");

			- 让所有非被点击的一级菜单箭头还原

				- $(this).siblings().removeClass("current");

		- 下拉菜单（滑动动画）

			- 动画队列问题

				- stop（）

			- 在jQuery中如果需要执行动画, 建议在执行动画之前先调用stop方法,然后再执行动画

		- 弹出广告（淡入淡出）

			- 监听span的点击事件

				- $("span").click(function () {
                $(".ad").remove();
            });

			- 执行广告动画

				- $(".ad").stop().slideDown(1000).fadeOut(1000).fadeIn(1000);

		- 图标特效

			- 1.遍历所有的li

				- 1.1生成新的图片位置
				- 1.2设置新的图片位置

			- 2.监听li移入事件

				- 2.1将图标往上移动
				- 2.2将图片往下移动
				- 2.3将图片复位

		- 无限循环滚动

			- 1.让图片滚动起来

				- autoPlay()

- 文档处理

	- 添加节点

		- 内部插入

			- append（）
			- appendTo（）
			- prepend（）
			- prependTo（）

		- 外部插入

			- after(content|fn)
			- insertAfter（）
			- before(content|fn)
			- insertBefore（）

	- 删除节点

		- remove( [ expr ] )

			- 删除指定元素
			- 利用remove删除之后再重新添加,原有的事件无法响应

		- detach([expr])

			- 删除指定元素
			- 利用detach删除之后再重新添加,原有事件可以响应

		- empty()

			- 删除指定元素的内容和子元素, 指定元素自身不会被删除

	- 替换节点

		- replaceWith ( content | fn )
		- replaceAll ( selector )

	- 复制节点

		- clone( [ Even [,deepEven ] ] )

			- 浅复制

				- false
				- 浅复制只会复制元素, 不会复制元素的事件

			- 深复制

				- true
				- 深复制会复制元素, 而且还会复制元素的事件

	- 练习

		- 新浪微博

### jQuery插件

### 综合实战

- 拍打灰太狼

## jQuery原理

### 基本结构

- 1.本质

	- jQuery的本质是一个闭包（立即执行函数）

		- (function( window, undefined ) { })( window );

- 2.jQuery为什么要使用闭包来实现?

	- 为了避免多个框架的冲突

- 3.jQuery如何让外界访问内部定义的局部变量

	- window.xxx = xxx;
	- window.jQuery = window.$ = jQuery;

- 4.jQuery为什么要给自己传递一个window参数?

	- 为了方便后期压缩代码
	- 为了提升查找的效率

- 5.jQuery为什么要给自己接收一个undefined参数?

	- 为了方便后期压缩代码
	- IE9以下的浏览器undefined可以被修改, 为了保证内部使用的undefined不被修改, 所以需要接收一个正确的undefined

### 入口函数测试

- 1.传入 '' null undefined NaN  0  false

	- 会返回一个空的jQuery对象给我们

- 2.传入html片段

	- 会将创建好的DOM元素存储到jQuery对象中返回

- 3.传入选择器

	- 会将找到的所有元素存储到jQuery对象中返回

- 4.传入数组

	- 会将数组中存储的元素依次存储到jQuery对象中立返回

- 5.传入伪数组

	- 会将数组中存储的元素依次存储到jQuery对象中立返回

- 6.传入对象

	- 会将传入的对象存储到jQuery对象中返回

- 7.传入DOM元素

	- 会将传入的DOM元素存储到jQuery对象中返回

- 8.传入基本数据类型

	- 会将传入的基本数据类型存储到jQuery对象中返回

- 代码片段实现

	- apply、call

		- 专门用于修改方法内部的this
		- 格式

			- apply(对象, [数组]);

				- 通过window.test找到test方法
				- 通过apply(obj)将找到的test方法内部的this修改为自定义的对象

			- call(对象, 参数1, 参数2, ...);

				- 1.通过window.sum找到sum方法
				- 2.通过apply(obj)将找到的sum方法内部的this修改为自定义的对象
				- 3.将传入数组中的元素依次取出, 传递给形参

	- push

		- 真数组转换伪数组的一个过程

			- var arr = [1, 3, 5, 7, 9];
			- var obj = {};

		- [].push.apply(obj, arr);

			- 1.通过[].push找到数组中的push方法
			- 2.通过apply(obj)将找到的push方法内部的this修改为自定义的对象
			- 3.将传入数组中的元素依次取出, 传递给形参

	- 真伪数组的转换

		- 真转伪

			- [].push.apply(obj, arr);

		- 伪转真

			- arr = [].slice.call(obj);

	- extend方法

		- 作用

			- 对代码进行分类，提升可维护性

		- 键值对结构

### jq原型上的属性和方法

- 属性

	- jquery

		- 获取jQ版本号

	- selector

		- 实例默认的选择器取值

	- length

		- 实例默认的长度

	- 子主题 4
	- 子主题 5

- 方法

	- push

		- 给实例添加新元素

	- sort

		- 对实例中的元素进行排序

	- splice

		- 按照指定下标指定数量删除元素，也可以替换删除的元素

	- toArray

		- 把实例转换为数组返回

	- get

		- 获取指定下标的元素，获取的是原生DOM

	- eq

		- 获取指定下标的元素，获取的是jQuery类型的实例对象

	- first

		- 获取实例中的第一个元素，是jQuery类型的实例对象

	- last

		- 获取实例中的最后一个元素，是jQuery类型的实例对象

	- each

		- 遍历实例，把遍历到的数据传给回调使用

	- map

		- 遍历实例，把遍历到的数据传给回调使用，然后把回调的返回值收集起来组成

### DOM操作相关方法

- 1、empty ==> 清空指定元素中的所有内容
- 2、remove ==> 删除所有的元素或指定元素
- 3、html ==> 设置所有元素的内容，获取第一个元素的内容
- 4、text ==> 设置所有元素的文本内容，获取所有元素的文本内容

*XMind: ZEN - Trial Version*