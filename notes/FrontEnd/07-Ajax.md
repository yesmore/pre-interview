# Ajax

## 简介

### 服务器

- 不关机、断电的电脑
- 分类

	- 文件服务器、邮件服务器、web服务器

- 文件目录、文件名最好是英文，服务器不支持中文

### php基础

- 注释

	- //
	- /**/

- 定义变量

	- $num = 10;

- 打印内容

	- echo $num;
	- 注意点: 后端编写的代码不能直接运行, 只能放到服务器对应的文件夹下, 通过服务器运行
	- 如何通过服务器运行: 通过ip地址找到服务器对应的文件夹, 然后再找到对应的文件运行

- 定义集合

	- 数组

		- $arr = array(1, 3, 5)
		- print_r($arr);

			- echo不能打印数组

		- 索引

			- echo $arr[1]

	- 字典

		- $dict = array("name"=>"lnj", "age"=>"33");
		- print_r($dict);
		- 索引

			- $dict["name"]

- 分支循环语句

	- if/switch/三目/for/while

## 基础

### get请求处理

- form标签

	- method属性

		- method="get"

- 提交的数据显示在url之后

	- ?userName=lnj&userPwd=123456

- php后端获取前端提交数据

	- $_GET

### post请求处理

- method=“post”
- 提交的数据位于 “header”

	- Form data

- php后端获取前端提交数据

	- $_POST

### GET/POST请求应用场景

- GET请求用于提交非敏感数据和小数据
- POST请求用于提交敏感数据和大数据

### post文件上传

- 上传文件一般使用POST提交
- 传文件必须设置enctype="multipart/form-data" （form属性）
- 步骤

	- 1.获取上传文件对应的字典

		- $_FILES
		- $fileInfo = $_FILES["upFile"];

	- 2.获取上传文件的名称

		- $fileName = $fileInfo["name"];

	- 3.获取上传文件保存的临时路径

		- $filePath = $fileInfo["tmp_name"];

	- 4.移动文件

		- move_uploaded_file($filePath, "./source/".$fileName);

- 大文件上传

	- 默认情况下服务器对上传文件的大小是有限制的, 如果想修改上传文件的限制可以修改php.ini文件
	- file_uploads = On

		- 是否允许上传文件 On/Off 默认是On

	- upload_max_filesize = 2048M

		- 上传文件的最大限制

	- post_max_size = 2048M

		- 通过Post提交的最多数据

	- max_execution_time = 30000 

		- 脚本最长的执行时间 单位为秒

	- max_input_time = 30000 

		- 接收提交的数据的时间限制 单位为秒

	- memory_limit = 2048M

		- 最大的内存消耗

## Ajax

### 简介

- 什么是Ajax?

	- AJAX 是与服务器交换数据并更新部分网页的艺术，在不重新加载整个页面的情况下。
	- 发送异步请求

### GET

- 五步核心

	- 1.创建一个异步对象

		- xmlhttp = new XMLHttpRequest()

			- 不兼容ie5/6

	- 2.设置请求方式和请求地址

		- xmlhttp.open(）

			- 参数一

				- method：请求的类型；GET 或 POST

			- 参数二

				- url：文件在服务器上的位置

			- 参数三

				- async：true（异步）或 false（同步）

	- 3.发送请求

		- xmlhttp.send()

	- 4.监听状态的变化

		- xmlhttp.onreadystatechange = function (ev2) {
		- xmlhttp.readyState

			- 0: 请求未初始化
       1: 服务器连接已建立
2: 请求已接收
3: 请求处理中
                         4: 请求已完成，且响应已就绪

		- 判断是否请求成功

			- http状态码xmlhttp.status

				- 200 ~ 300
				- 304

	- 5.处理返回的结果

- 服务器响应XHR

	- xhr.responseText

		- 获得字符串形式的响应数据

	- xhr.responseXML

		- 获得XML形式的响应数据

- IE兼容

	- 创建对象时兼容问题
	- ie缓存问题

		- 在IE浏览器中, 如果通过Ajax发送GET请求, 那么IE浏览器认为同一个URL只有一个结果
		- 解决

			- 每次改变url地址
			- "05-ajax-get.txt?t="+(new Date().getTime())

- GET封装

	- 五步骤
	- 参数

		- 两个回调

			- success
			- error

		- 处理ie兼容性对象
		- 将对象转换为字符串参数
		- 中文参数转码
		- 超时反馈

### POST

- xhr.open("POST","08-ajax-post.php",true);
- xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");

	- 代码必须放到open和send之间

### XML

- 可扩展的文本语言
- 规范

	- 第一行

		- <?xml version="1.0" encoding="UTF-8" ?>

	- 必须有根结点

### JSON

- 子主题 1

### cookie

- 简介

	- 会话跟踪技术

		- 客户端

	- session

		- 会话跟踪技术

			- 服务端

- 作用

	- 将网页中的数据保存到浏览器中

- cookie属性（document对象）

	- 数据格式

		- key=value

			- document.cookie = "age=33;“

- cookie注意点

	- cookie默认不会保存任何的数据
	- cookie不能一次性保存多条数据, 要想保存多条数据,只能一条一条的设置
	- cookie有大小和个数的限制

		- 个数限制: 20~50
		- 大小限制: 4KB左右

- cookie生命周期

	- 默认情况下生命周期是一次会话(浏览器被关闭)
	- expires

		-  如果通过expires=设置了过期时间, 并且过期时间没有过期, 那么下次打开浏览器还是存在
		- 如果通过expires=设置了过期时间, 并且过期时间已经过期了,那么会立即删除保存的数据
		- "age=33;expires="+date.toGMTString()+";"

- cookie作用范围

	- 范围：同一个浏览器的同一个路径下访问
	- 如果在同一个浏览器中, 默认情况下下一级路径就可以访问
	- path

		- 如果在同一个浏览器中, 想让上一级目录也能访问保存的cookie, 那么需要添加一个path属性才可以;

			- 所有文件下都可以访问

		- document.cookie = "name=zs;path=/;";

	- domain

		- 在不同url访问
		- 指定根域名

			- domain=it666.com;

				- 则可访问 ’www.it666.com‘  或  'edu.it666.com'

	- document.cookie = "name=zs;path=/;domain=127.0.0.1;";

- 封装

*XMind: ZEN - Trial Version*