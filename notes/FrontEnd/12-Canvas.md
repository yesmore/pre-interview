# Canvas

## 简介

### canvas是一个矩形区域的画布

### 兼容性

- ie9以上支持
- 在移动端兼容性高

### 应用领域

- 游戏、可视化数据、banner广告、未来模拟器、远程计算器控制、图形编辑器、嵌入网站、完整的canvas移动端应用

## 基础

### 绘制基础

- 宽高

	- 通过canvas内联属性设置或js设置，不适用css设置
	- 若css与canvas同时设置宽高，会导致拉伸效果

- 上下文

	- 绘画功能的封装体
	- getContext()

- 坐标系

	- 同css盒子

- 基本步骤（画线）

	- 1.获取canvas标签
	- 2.获取上下文
	- 3.绘制路径

		- closePath()

			- 自动闭合路径

	- 4.填充内容(描边)

### 描边和填充样式

- stroke()

	- 设置描边

- strokeStyle属性

	- 设置苗边样式

- lineWidth属性

	- 设置描边宽度
	- 当填充时，一半会被填充

- fillStyle属性

	- 填充颜色

- fill()

	- 默认黑色

### 案例：绘制表格

- moveTo(0, 0)

	- 如果不设置moveTo，当前画笔没有位置
	- 且 第一个lineTo相当于moveTo

### 基于状态的绘图

- 从moveTo开始时，默认开启一个状态：保存绘制的样式
- beginPath()

	- 开启新状态
	- 保存新的样式，也可继承之前状态的样式
	- 但是当前状态设置的所有的状态，只能作用于当前的状态

### 绘制矩形

- rect()

	- 绘制矩形
	- 参数

		- 矩形的 x 起始坐标
		- 矩形的 y 起始坐标
		- 矩形的宽高

- strokeRect（）
- fillRect（）

	- 填充

- clearRect（）

	- 清除矩形

### 饼状图绘制

- arc（）

	- 参数

		- x，y

			- 圆心

		- r

			- 半径

		- sAngle

			- 起始角度
		- eAngle

			- 结束角度

		- true/false

			- 是否逆时针

### 填充文字

- c.strokeText()

	- 参数

- c.fillText（）

*XMind: ZEN - Trial Version*