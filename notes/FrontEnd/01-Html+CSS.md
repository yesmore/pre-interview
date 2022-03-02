# HTML+CSS



## HTML

### 定义

- 标签和注释
- 网页基本结构

### 规范

- html

	- h5

		- 是一个强大的技术集（h5 ≈ html+css+js）

- css

	- css3

		- h5的一部分

- js

	- ECMASCRIPT
	- DOM
	- BOM

		- 没有规范，window

- 前端没有版本的概念，“css3”指的是第三级别

### 转义字符

- &xxx

### 语义化标签

- 行内元素

	- 能与其他元素共存一行

- 块级元素

	- 独占一行

- 浏览器解析网页时，会自动修正不符合规范内容
- 布局标签

	- header、main、footer、nav、aside、section、div、span

### 列表

- 无序列表

	- ul（创建），li（项）

- 有序列表

	- ol、li

- 定义列表

	- dl（创建）、dt（定义）、dd（解释）

### 链接

- a标签

	- target属性

		- _self
		- _blank

	- href

		- 地址
		- #id ：到最底层id位置
		- #：调转到最顶部

### 图片标签

- img标签

	- src属性

		- 地址

	- alt属性

		- 搜索引擎会根据alt的内容来识别图片.没有此属性不会被搜索引擎找到

	- width、height

### 内联框架

- iframe标签

	- 用于向当前页面中引入一个其他页面
	- scr属性
	- frameborder属性

		- 边框

	- width、height

### 音视频

- audio标签

	- control：控制
	- autoplay:打开页面时自动播放
	- loop:循环

- soure

	- 路径

### 表格（*CSS样式）

- 简介

	- 表示格式化数据

		- 课程表、成绩单

- 创建

	- table标签

		- 属性

			- border - spacing   边框距离
			- border-collapse 

				- 边框合并

	- tr：表示一行

		- td   表示一格

			- 属性

				- colspan  横向合并单元格
				- rowspan  纵向合并单元格

			- 默认文字垂直居中

				- 可使用vertical-align调整

		- th

			- 头部，加粗居中

- 特殊表格

	- 长表格

		- thead
		- tbody

			- 如果表格没有使用tbody，那么浏览器会自动创建一个tbody，并且将tr全部放入tbody

		- tfoot

### 表单（*CSS样式）

- 简介

	- 用于提交数据
	- 网页中的表单用于将本地的数据提交给服务器

- 创建

	- form标签

		- 属性

			- action

				- 表单要提交的服务器地址

		- 表单项

			- input

				- 文本框

					- type=text

				- 密码框

					- type = password

				- 提交按钮

					- type=submit

				- 单选按钮

					- type = radio

						- 必须有相同name
						- 必须有value，返回用户填的值

					- checked

						- 设置默认单选按钮

				- 多选框

					- type = checkbox

						- 必须指定name、value

			- buttom

	- select标签

		- 下拉列表
		- 配合option
		- selected  属性：默认选中

## H+C静态页面项目

### 项目搭建

## CSS

### 基础

- 简介

	- 内联样式，行内样式
	- 将样式编写到head中的style标签里
	- 外部样式表

- 语法

	- 选择器
	- 声明块

- 常用选择器

	- 元素选择器

		- 根据标签名选择

	- id选择器

		- #id属性值{}

	- 类（class）选择器

		- .class属性值

	- 通配选择器

		- *

	- 复合选择器

		- 交集选择器

			- 语法：选择器1选择器2选择器3...{}

		- 并集选择器

			- 语法：选择器1，选择器2，。。。{}

	- 关系选择器

		- 子元素选择器

			- 父元素 > 子元素{}

		- 后代元素选择器

			- 语法：祖先 后代

		- 选择下一个兄弟

			- 语法：前一个 + 下一个

		- 选择下面所有的兄弟

			- 语法：前一个 ~ 下一坨

	- 属性选择器

		- 【属性名】
		- 【属性名 = 值】
		- 【属性名 ^= 值】

			- 选择属性值以指定值开头的元素

		- 【属性名 $= 值】

			- 选择属性值以指定值结尾的元素

		- 【属性名 *= 值】

			- 选择属性值含有某值的元素

	- 伪类选择器

		- 用来描述一个元素的特殊状态
		- 例：自动选择第一个li元素 
		- 语法    :伪类名
		- 超链接的伪类

			- ：link
			- ：visited

	- 伪元素选择器

		- 表示页面中一些特殊的并不真实存在的元素（特殊的位置）
		- 例：首字母下沉
		- 语法    ::伪类名
		- ::first-letter
		- ::first-line

- 选择器的权重

	- 样式冲突

		- 通过不同的选择器，选中相同的元素，并为相同的样式设置相同的值。

	- 选择器的权重

		- 内联样式        1,0,0,0
		- id选择器        0,1,0,0
		- 类和伪类选择器   0,0,1,0
		- 元素选择器       0,0.0,1
		- 通配选择器(*)    0,0,0,0
		- 继承的样式       无优先级

	- 注意

		- 比较优先级时，需要将所有选择器的优先级相加（分组选择器是单独计算的）
		- 如果优先级相同，此时则优先使用靠下的样式
		- 添加 ！importent 变成最优先级，在开发中慎用

- 样式的继承

	- 定义：为一个元素设置的样式同时也会应用到它的后代元素
	- 注意：并不是所有样式都会被继承，如背景、布局等

- 单位

	- 长度单位

		- 像素

			- 屏幕由小点组成
			- 不同屏幕的像素大小不同，越小越清楚
			- 分辨率

				- 1920 X 1080

			- 视口（网页窗口）

				- 通过视口的大小，来观察CSS像素与物理像素转化比
				- 默认情况下

					- 视口宽度为  1920px（CSS像素）
					- 1920px （物理像素）

				- 放大网页时，视口变小

					- 放大两倍

						- CSS ：物理  =  1：2

			- 分类

				- CSS像素

					- 编写网页时所用的像素（100px）
					- 浏览器在显示网页时，需要将CSS像素转换成物理像素
					- 转换比由浏览器绝对

						- 默认情况下，1个CSS像素 = 1个物理像素

				- 物理像素

					- 小点点

		- 百分比

			- 可以将属性设置为相对于父元素属性的百分比
			- 优点：设置百分比可以跟随父元素的改变而改变

		- em

			- 相对于元素的字体大小来计算的
			- 1em = 1font-size
			- 会根据字体大小改变而改变

		- rem

			- 相对于根元素的字体大小计算

	- 颜色单位

		- RGB

			- 在CSS中可以直接用颜色名来设置
			- RGB值

				- 通过红、绿、蓝的不同浓度调配出的颜色
				- 值范围：0~255（0%~100%）
				- 语法：rgb(1, 1, 1)

		- RGBA

			- 半透明效果
			- 1表示完全不透明，0表示完全透明

		- 十六进制RGB

			- 语法：#红色绿色蓝色
			- 颜色范围：00~ff
			- 两位重复可简写：#ffff00 → #ff0

		- HSL、HSLA

			- H色相（0~360），S饱和度（0%~100%），L亮度（0%~100%）

	- deg

		- 度数单位

### 进阶

- CSS布局

	- 文档流（normal  flow）

		- 概念

			- 网页是多层结构，一层摞者一层
			- 通过CSS为每一层来设置样式
			- 用户只能看到最上层
			- 这些层最底下的一层称为文档流
			- 我们所创建的元素默认都是在文档流中进行排列

				- 元素主要有两个状态

					- 在文档流中

						- 特点

							- 块元素

								- 在页面中独占一行，自上而下，垂直排列
								- 默认宽度是父元素的全部（100%父元素）
								- 默认高度是被子元素撑开（字体高度）

							- 行内元素

								- 只占自身大小，自左向右水平排列
								- 与人书写习惯相同
								- 默认宽度与高度都是被内容撑开

					- 脱离文档流

	- 盒子模型（box model）

		- CSS将页面中的所有元素都设置为了一个矩形的盒子
		- 将元素设置为矩形的盒子后，对页面的布局就变成了将不同的盒子摆放到不同的位置
		- 每个盒子的组成部分

			- 内容区（content）

				- 由width（默认auto）、height属性设置

			- 内边距（padding）

				- 内容区与边框的距离
				- padding - top/right/bottom/left
				- 会影响盒子大小
				- 背景颜色会延伸到内边距上
				- 内置div
				- 顺时针

					- 四个值：上右下左
					- 3个值：上  左右  下
					- 2个值：上下   左右

			- 边框（border）

				- 盒子的边缘
				- 设置边框

					- 至少三个样式

						- 边框宽度：border-width

							- 可省，默认3px
							- 顺时针

								- 四个值：上右下左
								- 3个值：上  左右  下
								- 2个值：上下   左右

						- 边框颜色：border-color

							- 顺时针同上
							- 可省，受color影响

						- 边框样式：border-style

							- solid实线
							- dotted点虚线
							- dashed 虚线
							- double双

				- 边框的大小会影响盒子的大小
				- border简写属性

					- border：solid  1px   color
					- border-top/right/bottom/left   同上

			- 外边距（margin）

				- 影响盒子的位置，不影响盒子大小
				- 会影响盒子实际占用空间大小
				- margin-top/right/bottom/left

					- 正负值反方向
					- top、left动自己
					- right、bottom挤别人

				- 由于自左向右排列

		- 水平方向的布局

			- 元素在父元素中

				- 元素的属性由以下几个属性共同决定

					- m-left
					- bor-left
					- pad-left
					- width
					- pad-right
					- bor-right
					- m-right

				- 过度约束

					- 若等式不成立，则浏览器会自动调整
					- 调整的情况

						- 如果七个值没有auto，则浏览器会自动调整 m-right值使等式满足
						- 七个值中有三个可以auto：width、m-left、m-right
						- 如果某个值为auto，则会自动调整为auto的那个值以使等式成立
						- 如果有三个auto，外边距为0，宽度最大
						- 如果两个外边距为auto，则水平居中

		- 垂直方向的布局

			- 默认情况下父元素的高度被内容撑开
			- 有溢出现象
			- 使用 overflow 属性来设置父元素如何处理溢出的子元素

				- 选项

					- visible

						- 默认值，子元素会从父元素中溢出，在父元素外部的位置显示

					- hidden

						- 裁剪溢出内容（一剪梅）

							- 文字内容也会被裁剪掉

					- scroll

						- 滚动条，水平垂直滚动条
						- auto

							- 根据需要生成滚动条

					- overflow-x、overflow-y

						- 单独处理水平、垂直方向

		- 外边距的折叠（重叠）

			- 相邻的垂直方向外边距会发生重叠现象

				- 兄第元素

					- 相邻垂直外边距会取两者之间的较大值（都是正值）

						- 特殊情况

							- 一正一负：取和
							- 二负：取绝对值大的

					- 对于开发有利，不需要处理

				- 父子元素

					- 子元素会传递给父元素（上外边距）
					- 不利
					- 处理

						- 给父元素加外边框

		- 行内元素的盒模型

			- 不支持设置宽度和高度
			- 可以设置padding，但是垂直方向的padding不会影响元素的布局
			- 可以设置border，但是垂直方向的border不会影响元素的布局
			- 可以设置marpin，但是垂直方向的margin不会影响元素的布局
			- display

				- 设置元素显示的类型
				- 值：

					- inline

						- 行内元素

					- block

						- 块元素

					- inline-block

						- 行内块元素

							- 既可设置宽度和高度，又不会独占一行

					- table

						- 将元素设置为一个表格

					- none

						- 元素不在页面中显示

							- 隐藏元素效果

								- 不占位

			- visibility

				- 显示元素状态
				- 默认值：visible
				- hidden   元素隐藏不显示

					- 依然占位

		- 盒子的大小

			- 默认情况下，盒子的可见框大小有内容区、内边距、边框共同决定
			- box-sizing

				- 用来设置盒子大小的计算方式，即设置width与height的作用范围
				- 可选值

					- content-box

						- 默认值，宽高用来设置内容区的大小

					- border-box

						- 宽高用来设置整个盒子可见框大小

		- 轮廓和圆角

			- outline

				- 设置元素轮廓线，与border相似

					- 不同点：不会影响可见框大小

			- box-shadow

				- 设置阴影效果，不会影响页面布局
				- 默认在元素的正下方

					- 值： 水平偏移   垂直偏移   阴影模糊半径   颜色

				- 一般配合透明使用

					- rgba

			- border-radius

				- 设置圆角

					- 半径大小

						- 可设置两个值，椭圆（x，y）轴半径
						- 50%，圆形

				- border-top-left-radius
				- border-bottom-right-radius

	- 浏览器的默认样式

		- 通常情况，浏览器都会为元素设置一些默认样式
		- 会影响到布局
		- 通常情况下，在编写网页时，必须要去除默认样式
		- 设置body、p、ul等
		- 去margin、padding

			- *{}

		- 重置样式表

			- reset.css

				- 直接去除了浏览器的默认样式

			- normalize.css

				- 对默认样式进行了统一

	- 浮动

		- 浮动简介

			- 使元素向父元素左右侧移动
			- float属性

				- 值

					- none：默认值
					- left：向左浮动
					- right：向右浮动

				- 作用

					- 水平排列布局

				- 特点

					- 设置浮动以后，水平布局的等式就不需要强制成立了
					- 不会从父元素中移出
					- 元素设置浮动后，会完全从文档流中脱离，不占用文档流的位置，且不会超过前面的浮动元素
					- 不会超过上边浮动的兄弟元素
					- 横向排列效果

		- 其他特点

			- 浮动元素不会遮住文字，文字会自动环绕

				- 实现文字环绕效果

			- 从文档流中脱离，元素的一些特点也会发生变化

				- 块元素

					- 不再独占一行
					- 宽度和高度都被内容撑开

				- 行内元素

					- 变成块元素，特点与块元素一样

				- 不再区分块和行内元素

		- 网页的布局
		- 典型问题

			- 高度塌陷

				- 父元素高度不能写死
				- 当子元素浮动后，从文档流脱离，将无法撑开父元素，导致父元素高度丢失
				- 父元素高度丢失，其下的元素会自动上移
				- 处理

					- 把父元素高度写死（不治本）
					- BFC

						- Block  Formatting   Context  块级格式化环境
						- 是CSS中隐含的属性
						- 开启BFC该元素会变成一个独立的布局区域
						- 开启后的特点

							- 不会被浮动元素覆盖
							- 子元素和父元素的外边距不会重叠
							- 可以包含浮动的子元素

						- 通过特殊方式开启BFC

							- 设置元素浮动（不推荐）

								- float

							- 设置为行内块元素（不推荐）

								- display

							- 将元素的overflow值设置为非visible值

								- hidden
								- auto

					- clear

						- 清除浮动元素对当前元素所产生的的影响
						- 原理

							- 设置后，浏览器会自动为元素添加一个上外边距，使其不受其他元素影响

						- 可选值

							- left
							- right
							- both

								- 清除两侧最大影响那侧

					- after伪类解决塌陷
					- clearfix

						- .clearfix::before,
        .clearfix::after{
            content: '';
            display: table;
            clear: both;
            /* 同时解决塌陷和外边距重叠的问题 */
        }

	- 定位

		- 定位简介

			- 是一种更加高级的布局手段
			- 可以将元素摆放到页面的任意位置
			- 使用position属性设置

		- 可选值

			- static

				- 默认值，元素静止，没开启定位

			- relative相对定位

				- 特点

					- 如果不设置偏移量，元素不发生任何变化
					- 参照原点

						- 相对于在文档流原来的位置

					- 会提升元素的层级
					- 不会脱离文档流

						- 不会改变元素性质(块，行内)

					- 灵魂出窍（肉体不动）

			- absolute绝对定位

				- 特点

					- 参考原点

						- 是相对于其包含块进行定位的

							- 包含块

								- 正常情况下

									- 当前元素最近的祖先块元素

								- 开启绝对定位后

									- 就是离它最近的开启了定位的祖先元素
									- 如果所有的祖先元素都没开启定位则根元素(html)就是其包含块

					- 如果不设置偏移量，元素的位置不会发生变化
					- 开启后，元素会从文档流中脱离
					- 绝对定位会改变元素的性质，行内变成块，块的内容被宽高撑开
					- 元素提升一个层级

			- fixed固定定位

				- 也是一种绝对定位，大部分特点一样
				- 永远参考浏览器的视口进行定位

			- sticky粘滞定位

				- 与相对定位特点基本一致
				- 到达某一位置后将其固定

		- 偏移量（offset）

			- 开启定位后，设置元素位置
			- 只会移动自己
			- 属性

				- top

					- 定位元素与定位位置距离

				- bottom
				- left
				- right

		- 绝对定位元素的布局

			- 水平方向

				- 当开启绝对定位后，水平方向的布局需要添加left 与 right两个值，其他规则一样

			- 垂直方向

				- top + margin-top/bottom + padding-top/bottom + border-top/bottom + height

		- 元素的层级

			- 对于开启了定位的元素，可以通过z-index来指定元素的层级
			- z-index（z轴）

				- 值越大层级越高
				- 如果值一样，则优先选择代码行数靠下的元素
				- 祖先元素的层级不会盖住后代元素

- 字体

	- 字体族

		- 属性

			- color
			- font-size

				- em、rem

			- font-family

				- 字体族

					- 可同时指定多个值，使用“，”隔开，优先使用第一个值

				- 可选值（字体的分类）

					- serif

						- 衬线字体

					- sans-serif

						- 非。。。

					- monospace

						- 等宽字体

					- cursive

						- 草书字体

					- fantasy

						- 虚幻字体

			- @font-face属性

				- 将服务器的字体直接提供给用户使用
				- 缺点

					- 加载速度较慢
					- 版权问题

	- 图标字体（iconfont）

		- 在网页中经常使用一些图标，可通过图片引入，但有缺点
		- 将图标设置为字体

			- 通过font-face对字体引入
			- 以使用字体的形式使用图标

		- 使用

			- 同一文件夹
			- 将all.css引入到网页
			- 方法

				- 直接通过类名使用

					- 类名前面加 “fas” 或 “fab”

				- 通过伪元素设置

					- 使用before、after选中
					- 在content属性中设置字体编码

				- 实体设置

					- &#x编码

	- 行高

		- 文字占有的实际高度
		- 使用line-height设置行高

			- 实际是设置字体框的高度

				- 字体框

					- 字体存在的格子
					- 字体会在字体框居中

			- 值

				- px、em
				- 整数

					- 默认 1 . 333

		- 设置行间距

			- 行间距 = 行高 - 字体大小

	- 字体的简写属性

		- font ：[italic]   [bold]  字体大小 /行高   字体族
		- 行高可省略

			- 最好写

	- 加粗

		- font-weight

			- 100~900
			- bold加粗
			- normal默认

	- 字体风格

		- font-style

	- 文本样式

		- 水平和垂直对齐

			- text-align  水平对齐

				- right
				- left（默认值）
				- center居中对齐
				- justify  两端对齐

			- vertical-align垂直对齐

				- baseline 基线对齐（默认值）
				- top   顶部对齐
				- bottom  底部对齐
				- middle 居中对齐
				- 赋值：10px...

		- 其他

			- text-decoration  文本修饰

				- none
				- underline  下划线
				- line - through  删除线
				- overline  上划线
				- 可设置颜色、样式

			- 内容省略效果

				- white-space  

					- 设置网页如何处理空白
					- 值

						- normal
						- nowarp  不换行
						- pre   保留空白

				- width: 200px;
               white-space: nowrap;
       overflow: hidden;
               text-overflow: ellipsis;

- 背景

	- 背景颜色
	- 背景图片

		- bg - image
		- bg - repeat

			- 设置背景的重复方式
			- 可选值

				- repeat

					- 默认值，背景会沿着x、y轴重复

				- repeat-x
				- repeat - y
				- no-repeat

		- bg - position

			- 用来设置图片的位置（必须同时指定两个值）
			- 通过方位

				- top、left、right、bottom、center

			- 通过偏移量

				- 水平方向、垂直方向

		- bg - origin

			- 背景图片的偏移量计算的原点
			- 可选值

				- padding-box

					- 默认值，原点从内边距开始计算

				- content-box

					- 从内容区开始计算

				- border-box

					- 背景的图片的原点从边框处开始计算

		- bg-clip

			- 设置背景的范围
			- 可选值

				- border-box

					- 默认值，背景会出现在边框的下面

				- padding-box

					- 背景不会出现在边框，只出现在内容区、内边距

				- content-box

					- 背景只出现在内容区

		- bg-size

			- 背景图片的尺寸
			- 可选值

				- 100px  100px
				- 100px
				- 100%  auto
				- cover

					- 图片比例不变，将元素铺满

				- contain

					- 图片比例不变，将图片在元素中完整显示

		- bg-attachment

			- 背景图片是否跟随元素移动
			- 可选值

				- scroll

					- 默认值，背景图片会跟随元素移动

				- fixed

					- 背景会固定在页面中，不随元素移动

		- bg

			- 简写属性
			- 注意

				- bg-size必须在bg-position后面，且用/隔开
				- origin必须在clip前面

		- 图片闪烁问题

			- css-sprite技术

				- 雪碧图

					- 将多个小图片同时保存到一张大图片

		- 渐变

			- 是图片，需要bg - image来设置
			- 可选值

				- liner-gradient   线性渐变

					- 多个颜色平均分配

						- (red, yellow)

					- 手动分配颜色

						- （red   10px，yellow  20px）

					- 可指定渐变方向

						- (to right, red, yellow)
						- to   top/bottom/left
						- 45deg    ：45°
						- 1 turn ：  一圈

				- repeat-liner-gradient

					- 可以平铺的线性渐变

				- radial - gradient()    径向渐变

					- 语法

						- （大小  at  位置，颜色   位置，颜色，位置，颜色   位置）

					- 指定渐变范围

						- （100px  100px，red，yellow）

					- 指定渐变位置

						- （100px  100px，at  0  0 ， red，yellow）

					- 可选值

						- circle  圆
						- ellipse  椭圆

- 动画

	- 过渡

		- transition

			- 属性

				- transition-property

					- 指定要执行过渡的属性
					- 多个属性间使用逗号隔开
					- 必须是一个有效值向另一个有效值过渡（无法识别auto）

				- transition-duration

					- 指定过渡效果持续的时间
					- 单位：s、ms

				- transition-timing-function

					- 过渡的时序函数

						- 指定过渡方式

					- 可选值

						- ease ：默认值，慢速开始，先加速再减速
						- linear：线性匀速运动
						- ease-in：加速运动
						- ease-out：减速运动
						- ease-in-out

							- 先加速，后减速

						- cubic-bezier()

							- 贝塞尔曲线

						- steps()

							- 分步执行过渡效果
							- 可选值

								- （2，end）

									- 分两次。在1s后开始动

								- （2，start）

									- 直接开始执行

				- transition-delay

					- 过渡效果的延时

	- 动画

		- 与过渡类似，实现动态效果
		- 网上搜 “ sprite animation”
		- 设置关键帧

			- 设置动画执行的每一步
			- @keyframs:  关键帧名 {
to{

}
from{

}
}

				- from:  动画开始位置，也可使用0%表示
				- to：动画结束位置，100%
	
		- 设置动画
	
			- animation-name
	
				- 对当前属性生效的关键帧名
	
			- animation-duration
	
				- 动画执行时间
	
			- animation-delay
	
				- 延时
	
			- animation-timing-function
	
				- 。。。
	
			- animation-iteration-count
	
				- 动画执行次数
				- infinite无限执行
	
			- animation-direction
	
				- 指定动画运行的方向
				- 可选值
	
					- normal
	
						- 默认值，from→to
	
					- reverse
	
						- to→from
	
					- alternate
	
						- 重复执行时，往返跑
	
					- alternate-direction
	
						- 对立上面
	
			- animation-play-state
	
				- 设置动画执行状态
				- 可选值
	
					- running
	
						- 默认值，动画执行
	
					- pause
	
						- 暂停
	
			- animation-fill-mode
	
				- 动画填充模式
				- 可选值
	
					- none
	
						- 默认值，动画执行完毕，元素回到原来位置
	
					- forwards
	
						- 执行完毕，停到to的位置
	
					- backwards
	
						- 动画延时等待时，元素就处于开始位置
	
					- both
	
						- 结合了forwards和backwards

- 变形

	- 定义：通过CSS改变元素的形状和位置，不会影响到页面的布局
	- transform（）
	- transform-origin

		- 变形的原点
		- center 默认值

	- 平移

		- 可选值

			- translateX（）

				- 沿着x轴平移

			- translateY（）
			- translateZ（）

				- 须设置网页的视距

					- perspective: 800px;

		- 使用平移居中

			- left: 50%;
top: 50%;
 transform: translateX(-50%)translateY(-50%);

		- 设置点击后的浮动效果

	- 旋转

		- 定义：使元素沿x、y、z轴旋转指定 的角度
		- 须设置网页视距
		- 可选值

			- rotateX（）
			- rotateY（）
			- rotateZ（）

		- backface-visibility

			- 是否显示背面内容

	- 缩放

		- scaleX（）

			- 水平方向缩放

		- scaleY（）
		- scale（）

- less

	- 简介

		- 定义：less是一门css的预处理语言

			- 是css的增强版，代码量减少

		- 功能：less语法编译成CSS语法

			- 新增许多css扩展

		- CSS支持设置变量、函数

	- 语法

		- 注释

			- //  单行注释
			- /* */多行注释

				- 会被解析到css文件中

		- 内嵌元素

	- 变量

		- @变量名
		- 作为类名使用

			- . @{a}

		- （重名时）就近原则

	- 父元素和扩展

		- &

			- 表示外层的父元素

		- .p2 : extend ( .p1 ) {}

			- p2 扩展 p1 的属性

		- . p1 ( )

			- 直接调用p1的属性（复制）

	- 混合函数

		- 在选择器后面加上括号

			- 创建一个mixins混合函数

				- 专门给其他元素调用

		- 在混合函数中可直接设置变量 （传参）

			- 类似函数

		- 其他函数库

	- 其他

		- 数值可直接运算

			- 100px - 50px
			- +  -  *  /

		- @import  “style.less”

			- 导入其他less文件
			- 模块化处理

- 弹性盒  flex

	- 简介

		- 定义：布局手段，主要用来代替浮动
		- 作用：可以使元素具有弹性，让元素可以根据页面的大小改变而改变

	- 概念

		- 弹性容器

			- 要使用弹性盒，必须先将一个元素设置为弹性容器
			- display：flex/inline-flex

				- 块级/行内弹性容器

		- 弹性元素

			- 弹性容器的（直接）子元素是弹性元素（弹性项）

		- 主轴

			- 定义：弹性元素的排列方向

		- 侧轴

			- 定义：与主轴垂直的方向

	- 弹性容器的样式

		- flex-direction

			- 指定弹性元素的排列方式
			- 可选值

				- row

					- 默认值，弹性元素水平排列（自左向右）

						- 主轴自左向右

				- row-reverse

					- 水平排列（自右向左）

				- column

					- 纵向排列（上到下）

				- column-reverse

					- 。。。。

		- flex-grow

			- 指定弹性元素的伸展的系数

				- 当父元素有多余空间时，子元素如何伸展

			- 可选值

				- 0 

					- 默认值，不伸展

		- flex- shrink

			- 指定收缩系数

				- 当父元素空间不足以容纳子元素

			- 可选值

				- 0

					- 默认值，不收缩

				- 值越大，缩越多

		- flex-wrap

			- 设置弹性元素是否自动换行
			- 可选值

				- nowrap
				- wrap
				- wrap-reverse

					- 沿辅轴反方向换行

		- flex-flow

			- row与wrap的简写属性

		- justify- content

			- 表示如何分配主轴的空白空间
			- 可选值

				- flex-start

					- 元素沿着主轴起点排列

				- flex-end

					- 元素沿着主轴终点排列

				- center

					- 元素居中排列

				- space-around

					- 空白分布到元素两侧

				- space-between

					- 空白均匀分布到元素间

				- space-evenly

					- 空白分布到元素的单侧

		- align-items

			- 元素在辅轴上如何对齐

				- 元素之间的关系

			- 可选值

				- stretch

					- 默认值，设置元素长度相同

						- 行与行之间的高度

				- flex-start

					- 元素不会拉伸。沿着辅轴起点对齐

				- flex-end

					- 。。。

				- center

					- 居中对齐

				- 基线对齐

		- align-content

			- 辅轴空白空间的分布
			- 可选值

				- 同justify-content

	- 弹性元素的样式

		- flex-basis

			- 元素在主轴上的基础长度
			- 可选值

				- auto

					- 默认值，参考元素自身高度

				- 如果传递某值，则以此值为准

		- flex-grow
		- flex-shrink
		- flex

			- 默认值

				- initial

					- 0   1   auto

				- auto

					- 1   1   auto

				- none

					- 0   0   auto

						- 无弹性

			- 等分布局

				- flex ：1

		- order

			- 决定弹性元素的排列顺序

				- 值越小排越前面

- 移动端页面

	- 像素

		- 屏幕由小点组成
		- 不同屏幕的像素大小不同，越小越清楚
		- 分辨率

			- 1920 X 1080

		- 视口（网页窗口）

			- 通过视口的大小，来观察CSS像素与物理像素转化比
			- 默认情况下

				- 视口宽度为  1920px（CSS像素）
				- 1920px （物理像素）

		- 分类

			- CSS像素

				- 编写网页时所用的像素（100px）
				- 浏览器在显示网页时，需要将CSS像素转换成物理像素
				- 转换比由浏览器绝对

					- 默认情况下，1个CSS像素 = 1个物理像素

			- 物理像素

				- 小点点

	- 手机像素

		- 在不同屏幕，单位像素的大小不同

			- 智能手机的像素点远远小于计算机的像素点

		- 问：宽900px的网页在移动端（宽度750px）中如何显示？

			- 750px是物理像素
			- 900px是CSS像素
			- 默认情况下，移动端的视口都会设置为 980px（CSS像素）

				- 确保pc端网页可以完整展示在移动端

		- 默认情况下，移动端的像素比为   980/移动端宽度
		- 设置视口大小

			- 完美视口

				- width=device-width
				- initial-scale=1.0

	- VM单位

		- 表示视口宽度

			- 100vw = 一个视口的宽度

				- 一般情况下：  100vw = 750px

			- 1vw = 1%视口宽度

		- 与百分比差别
		- vw适配

			- rem

- 媒体查询

	- 响应式布局

		- 网页可以根据不同的设备、窗口大小呈现出不同效果
		- 使用响应式布局可以使一个网页适用于所有设备
		- 设计思路

			- 先设计移动端
			- 再渐进增强适应pc端

	- 简介

		- 响应式布局的关键
		- 通过媒体查询，可以为不同设备来分别设置样式

	- 语法

		- @media 媒体类型 [关键字] { }
		- 关键字

			- only

				- 处理浏览器尽量问题

					- 回避老浏览器

			- and

				- 连接一条查询规则

			- ，

				- 连接多条查询规则

			- not

				- 取反

		- 媒体类型

			- all

				- 所有设备

			- print

				- 打印设备

			- screen

				- 有屏幕的设备

			- speech

				- 屏幕阅读器

	- 媒体属性

		- width

			- 视口的宽度

				- @media (width:500px) {

					- 视口宽度为500px，下面内容生效

		- device-width

			- 设备独立像素（设备尺寸）

		- device-pixel-ratio

			- 像素比
			- 必须加webkit前缀

		- height

			- 视口的高度

		- min-width

			- 视口的最小宽度

		- max-width
		- orientation：landscape

			- 横屏

		- orientation：portrait

			- 竖屏

	- 断点

		- 样式切换的分界点
		- 常用断点

			- 小于768 超小屏幕 ：max-width = 768px
			- 大于768  小屏幕： min-width = 768px
			- 大于992  中型屏幕：min - width=992px
			- 大于1200  大屏幕：min-width=1200px

## 前端路线[](https://www.processon.com/view/link/5e71904ae4b092510f60d9b0#map)



### HTMl

- 标签
- 属性
- 事件
- 字符集

### CSS

- 基础教程
- CSS样式

	- 背景
	- 文本
	- 字体
	- 链接
	- 列表
	- 表格
	- 轮廓

- CSS框模型

	- 内边距
	- 边框
	- 子主题 3

- CSS定位
- CSS选择器
- CSS高级

### H5 + C3

- CSS3
- H5

### JavaScript阶段一

- 基本语法
- 数据类型
- 流程控制
- BOM对象
- DOM对象
- js高阶
- 子主题 7

### JavaScript阶段二

- PS切图
- animate.css学习（扩展）
- Bootstrap，同下
- ES进阶

	- ES6
	- ES7
	- ES8
	- ES9
	- ES10

- jQuery

	- 子主题 1
	- 子主题 2
	- 子主题 3
	- 子主题 4

- 网页特效
- DOM+BOM综合

### 项目实践

- 理解业务逻辑

### Vue框架（三）

- axios

	- 认识axios、全局配置，发送POST、GET请求等

- Vue-router
- vuex
- vue基础

### react框架（三）

- 认识react
- react元素渲染
- JSX
- 组件
- state
- pros
- 事件处理
- 条件渲染
- 子主题 9
- 子主题 10

### node*（三）

- 基础
- 高级

### webpack（三）

### Typescript*（三）

### MySQL

- 子主题 1
- 子主题 2
- 子主题 3

## 放大网页时，视口变小

### 放大两倍

- CSS ：物理  =  1：2

*XMind: ZEN - Trial Version*