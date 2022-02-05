# Webpack

## 简介

### 前端资源构建工具，静态模块打包器

- 打包生成对应的静态资源（bundle）

### 引入：less文件无法直接引入到html文件中

## 五个核心概念

### Entry

- 入口指示：以哪个文件为入口起点开始打包，分析构建内部依赖图

### Output

- 输出指示：打包后的资源bundles输出到哪里去，以及如何命名

### Loader

- 翻译官：让webpack能够去处理那些非 js 文件

### Plugins

- 插件：可以拥有执行范围更广的任务
- 包括从打包优化和压缩，重新定义环境中的变量等等

### Mode

- 模式

	- development

		- 描述

			- 将process.env.NODE_ENV的值设为development。启用NamedChunksPlugin和NamedModulesPlugin

		- 特点

			- 能让代码本地调试运行的环境

	- production

		- 描述

			- 将process.env.NODE_ENV的值设为production

		- 特点

			- 能让代码优化上线运行的环境

## 初体验

### 运行指令

- 开发环境

	- webpack ./src/index.js -o ./build/built.js --mode=development
	- webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.j
	- 整体打包环境，是开发环境

- 生产环境

	- webpack ./src/index.js -o ./build/built.js --mode=production
	-  webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
	- 整体打包环境，是生产环境

### 结论

- webpack能处理js/json资源，不能处理css/img等其他资源
- 生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化~
- 生产环境比开发环境多一个压缩js代码。

## webpack开发环境配置

### 打包样式资源

- webpack.config.js

	- webpack的配置文件
	- 作用

		- 指示 webpack 干哪些活
		- 当你运行 webpack 指令时，会加载里面的配置

- 注意

	- 所有构建工具都是基于nodejs平台运行的
	- 模块化默认采用commonjs

- 处理less/css

### 打包html资源

### 打包图片资源

### 打包其他资源

### devServer

### 开发环境配置

*XMind: ZEN - Trial Version*