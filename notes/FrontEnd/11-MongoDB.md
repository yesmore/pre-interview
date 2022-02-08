# MongoDB

## 简介

### 数据库简介

- 数据持久化保存在硬盘中（非文件）
- 方便操作
- 组成

	- 数据库的服务器

		- 保存数据

	- 数据库的客户端

		- 操作服务器

### 分类

- 关系数据库RDBMS

	- mysql、Oracle、DB2、SQLServer
	- 特点

		- 全是表

- 非关系数据库No SQL（not only sql）

	- MongoDB(文档数据库)、Redis
	- 特点

		- 键值对数据库

### MongoDB简介

- 为快速开发互联网web应用而设计
- 设计目标

	- 极简、灵活

- MongoDB的数据模型是面向文档的，所谓文档是一种类似于JSON的结构，叫 BSON

## 基础

### 配置

- 启动

	- 启动服务器

		- 先在bin目录下打开cmd：

			- mongod -dbpath C:\MongoDB\data\db
			- 其他选项

				- --port 10086

	- 启动客户端

		- 再在bin另打开cmd：

			- mongo

				- >

- 将Mdb设置为系统服务

	- 开机自启

### 图形化界面

- compass

### 三个概念

- 数据库db

	- 定义

		- 是一个仓库，在仓库中可以存放集合

- 集合collection

	- 定义

		- 类似于数组，在集合中可以存放文档

- 文档doc

	- 定义

		- 文档数据库中的最小单位，操作的对象都是文档

### 基本指令

- show  dbs

	- 显示当前所有数据库

- use  dbname

	- 进入指定数据库
	- 注意：数据库和集合都不需要手动创建，当创建文档时，如果指定集合或数据库不存在，会自动创建数据库和集合

- db

	- 变量，表示当前所处的数据库（类似this）

-  show collections

	- 显示数据库中所有集合

### 内嵌文档

- MongoDB文档中的属性值也可以是一个文档
- 当一个文档的属性值是一个文档时，称这个文档叫做 内嵌文档
- 支持直接通过内嵌文档的属性进行查询

	- 如果要通过内嵌文档来对文档进行查询，此时属性名必须使用引号

### CRUD

- 插入文档

	- db . collecName . insert (doc)

		- 向集合中插入一个或多个文档
		- doc可看成普通json对象

	- db . collecName . insert ( {}, {}, {}）

		- 插入多个对象

	- db . collecName . insertOne（）

		- 插入一个文档对象

	- db . collecName . insertMany（）

		- 插入多个文档对象

	- _id

		- 定义

			- 自动为文档添加的属性，作为唯一的标识

		- 查看

			- ObjectId （）

		- 指定

			- 在对象中添加   _id：“xxx”
			- 必须确保唯一性，建议自动添加

- 查询文档

	- db . collecName . find ( )

		- 查询所有符合条件的文档，返回一个数组
		- 条件对象

			- { } 等于 所有文档
			- { 字段名 : "值"}

		- . count ()

			- 统计数量

	- db . collecName . findOne（）

		- 查询集合中符合条件的第一个文档
		- 返回一个文档对象

- 修改文档

	- db.stus.update(, , )

		- 默认替换旧对象

			- 参数

				- 查询条件
				- 新对象
				- 配置条件

					- multi：true/false

						- 修改多个

					- 子主题 2

		- 默认只修改一个
		- 修改制定属性

			- 修改操作符

				- $set ：用来修改文档中的指定属性
				- $ unset ：删除指定属性

	- db.stus.updateMany、db.stus.updateOne、db.stus.replaceOne

- 删除文档

	- db.stus.remove

		- 删除符号条件的所有文档
		- 参数

			- 删除对象
			- true/false

				- 删除多个/一个对象

		- { } ：清空（性能较差）

	- db.stus.deleteOne、db.stus.deleteMany
	- db.stus.drop ()

		- 直接清空集合

	- db.dropDatabase()

		- 删除数据库

	- 注意

		- 一般不会直接删除，而是设置一个flag，例如  “isDel：1/0”，选择删除isDel则为1，查询时，isDel值为0

### 操作符

- $set/$unset
- $push

	- 操作数组，插入值
	- 不考虑元素是否重复

- $addToSet

	- 向数组添加一个新元素
	- 如果数组中已存在该元素则无法添加

- 比较操作符

	- $eq

		- 等于

	- db.numbers.find({num:{$gt:500}})
	- ...

### 方法

- limit()

	- 显示数据的上限

- skip（）

	- 跳过指定数量的数据

### 文档间的关系

- 分类

	- 一对一 one to one

		- 例：夫妻
		- 在Mdb中，通过内嵌文档中体现出一对一关系

	- 一对多 / 多对一

		- 例：父母-孩子、老师-学生、用户-订单、文章-评论
		- 可通过内嵌文档映射一对多的关系
		- 将一个集合的id设置为另一个集合的属性

	- 多对多

		- 例：分类 - 商品、老师 - 学生
		- 子主题 2

### 补充

- sort（）

	- 指定文档的排序规则
	- 参数

		- { 字段名 1：1/ -1，字段名2:1， ...}

			- 1升序/-1降序

	- 可与limit、skip任意顺序调用

- 投影

	- 在查询时，可以在第二个参数的位置来设置查询结果的  投影
	- db.dept.find( {}, {name: 1，_id：0} )

## mongoose

### 简介

- 定义

	- 是一个可以通过node来操作MongoDB的模块
	- 是一个对象文档模型ODM库，对node原生的MongoDB进行了封装

- 好处

	- 为文档创建一个模式结构Schema（约束）
	- 可以对模型中的对象/文档进行验证
	- 数据可以通过类型转换转换为对象模型
	- 可以使用中间件来应用业务逻辑挂钩
	- 比node原生的MongoDB驱动更容易

### 新的对象

- Scheme（模式对象）

	- 定义约束了数据库中的文档结构

- Model

	- 作为集合中所有文档的表示，相当于 collection

- Document

	- 表示集合中的具体文档，相当于集合中的一个具体的文档

### 使用

- 1.安装下载mongoose
- 2.引入

	- require

- 3.连接MongoDB数据库

	- 查看官网 https://mongoosejs.com/
	- mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
	- 如果端口是默认的，则可以省略

- 4. 监听数据库连接状态

	- connection属性

		- 表示数据库连接
		- 监视该对象的状态可以监听数据库的链接与断开

- 5.断开数据库连接

	- mongoose.disconnect()

		- 一般不用

	- MongoDB一般情况下只需要连接一次，除非项目停止

### 操作

- Scheme

	- 创建模式对象

		- var stuScheme = new Schema({
    name: String,
    age: Number,
    //实际开发中几乎不用布尔值
    gender: {
        type: String,
        default: "female"
    },
    address: String
})

- Model

	- Model代表集合，通过Model才能对数据库进行操作
	- 通过Scheme来创建Model

		- var StuModel = mongoose.model('', stuScheme)
		- 参数

			- modelName

				- 集合名

			- 约束

	- 向数据库插入文档

		- StuModel.create({}，fn)

	- 方法

		- 增

			- StuModel.create（docs，【callback】）

				- 创建一个或多个文档对象添加到数据库

		- 查

			- find（）

				- 查询所有符合条件的文档
				- 参数

					- 查询条件
					- 投影

						- {name：1，  age：0}

							- 只有name没有age

						- "name   age   -_id"

							- 只显示name、age，不要id

					- 查询选项

						- skip、limit

					- 回调函数

						- 必传

				- 返回一个数组对象，即文档对象document（document对象是model的实例）

			- findById（）

				- 根据文档的id属性查询文档
				- 返回一个文档

			- findOne（）

				- 查询符合条件的第一个文档

		- 改

			- update（）

				- 修改一个或多个文档
				- 参数

					- 查询条件
					- doc修改后的对象
					- 配置参数
					- 回调函数

			- updateMany（）/replace（）

		- 删

			- remove（）

				- 参数

					- 条件
					- 回调

			- deleteOne（）/ deleteMany（）

		- count（）

			- 返回文档长度
			- 参数

				- 条件
				- 回调

- Document

	- 与数据库中的文档一一对应

		- 是Model的实例

	- 创建doc

		- var stu = new StuModel({

	- 方法

		- save（）

			- 保存到数据库
			- 参数

				- 条件
				- 回调

		- update（）

			- 修改对象，在当前对象的回调中使用
			- doc.name = xx
			- 参数

				- 修改后
				- 回调

		- remove（）

			- 参数

				- 回调

		- get（name）

			- 获取文档的指定属性值
			- 等于 doc.name

		- set（name,  value）

			- 设置文档的指定属性值
			- 等于doc.name = xxx

		- id()
		- toJSON（）

			- 转换为一个json对象
			- 子主题 2

		- toObject（）

			- doc对象转换为一个普通 j s 对象

