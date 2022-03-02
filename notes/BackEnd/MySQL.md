# MySQL

## 数据库简介

###  一种ANSI 的标准计算机语言

### sql：结构化查询语言

### RDBMS 指的是关系型数据库管理系统。

### 数据库表

### 优点

- 可持久化数据到本地
- 结构化查询

### 数据库存储数据特点

- 数据 → 表 → 库
- 一个库有多张表
- 表中分为多个列，称为“字段”， 相当于java“属性”
- 每一行数据相当于java的“对象”

## MySQL简介

### 背景

- 前身  ：mysql  AB

### 优点

- 开源、免费、成本低
- 性能高、移植性好
- 体积小，便于安装

### 安装

- c/s架构，一般安装服务端
- 企业版、社区版

## 语法

### 启动与停止

- net  start mysql55、net  stop  mysql55

### 登录与退出

- dos窗口

	- mysql -u root -p   或
mysql    -h localhost    -P3306    -u root    -p[password]

- 自带客户端

	- CLC（root）

- 退出

	- exit、Ctrl+C

### 常见命令

- show

	- show databases

		- 查看当前所有库

	- show tables

		-  查看所有表

	- show tables from tes

		- 查看其他库所有表

- select

	- select database();    查看所在的库
	-  select * from stuinfo;   查看表中数据

- use

	- 	use 库名;      打开库

- 	insert into  stuinfo (id, name) value(2, 'rose');   插入数据
- update stuinfo set name='lilei' where id=1;   更新元素
- delete from stuinfo where id=1;  删除元素

### 规范

- 不区分大小写，建议关键字大写，表名，列名小写
- 最好用分号结尾
- 根据命令需要，可缩进、换行
- 注释

	- 单行注释

		- #文字
		- 				-- 文字     （有空格）

	- 多行注释

		- /* 文字*/

## myemployee库

### 四表

## DQL语言

### 查询列表

- 表中字段

	- 例

		- 查询单个字段
		- 查询多个字段

			- “，”隔开

		- 查询所有字段

			- *

- 常量值

	- select   100;
	- select    'john';

- 表达式

	- setec   100+98;

- 函数

	- select   version()

### 查询

- 基础查询

	- 语法

		- select   查询列表    from    表名；

			- 类似java打印输出

		- 注意

			- 查询最上段加：use  库名
			- `查询列表`加着重号

	- 查询结果是虚拟不保存的
	- 显示表结构，并查询其中的全部数据

		- DESC   表名；

	- 起别名

		- select  100%98  as    别名
		- select   last-name   别名   from    ....
		- 特殊情况：别名有关键字或特殊符号

			- 此时把别名加双引号

	- 去重

		- 案例：查所有部门的部门编号
		- 在关键字前面加     DISTINCT

	- + 号的作用

		- 案例：查询员工名和姓，连接成一个字段，显示为   姓名
		- 只有运算符功能
		- select   100+’xxx‘

			- 会自动转换为数值型
			- 转换失败则置0  ’xxx‘
			- null  + 任何值  =  NULL

		- select   CONCAT(last_name，first_name )  as   姓名  from  ....

- 条件查询

	- 语法

		- select   查询列表    from     表名   where     筛选条件

	- 分类

		- 按条件表达式筛选

			- 条件运算符

				- <   >    =    <>(不等于)

		- 按逻辑表达式筛选

			- 逻辑运算符

				- and(&&)    or(||)     not(!)   

		- 模糊查询（简单的条件运算符）

			- like

				- 筛选员工名中包含字母a的人：last_name LIKE '%a%'; 
				- 一般与通配符搭配使用
				- 通配符（占位符）

					- %

						- 任意多个字符

					- _

						- 任意单个字符

							- 例：员工第三个字符为e，第五个字符为a

								- __e_a%

							- 例：查询第二个字符为  _  的员工

								- _ \ _ %

									- 转义字符

										- 可使用‘escape’关键字自定义转义字符

			- between   and

				- 临界值不能颠倒

			- in

				- 判断某字段的值是否属于in列表的某一项
				- 特点

					- 提高简洁度
					- in列表的值类型必须一致或兼容
					- 不支持通配符

				- 例 ：查询各个工种id

					- job_id = 'IT_PROT'   or   job_id =  'AD_PRES'
					- job_id  IN ('IT_PROT',  'AD_PRES')

			- is  [not] null

				- 只用于判断NULL值
				- =  或  <>   不能拥有判断NULL值
				- 例：查询没有奖金的员工名和奖金率

					- commission_pct    IS   NULL

			- <=>  

				- 安全查询
				- 既可以判断Null值，又可以判断普通数值

- 排序查询

	- 语法

		- 追加  : order  by    排序列表    【asc(升序) | desc(降序)】

	- 规范

		- 单个字段、多个字段、表达式、函数、别名
		- 一般放在查询最后，除limit子句

	- 例

		- SELECT * FROM employees ORDER BY salary DESC;
		- SELECT *, salary*12*(1+IFNULL(commission_pct,0)) 年薪
FROM employees
ORDER BY 年薪;
		- SELECT *
FROM employees
ORDER BY salary ASC, employee_id DESC;
		- SELECT *,LENGTH(email)
FROM employees
WHERE email like '%e%'
ORDER BY LENGTH(email) DESC,department_id ASC;

### 函数

- 常见函数

	- ifnull

		- ifnull( job_id,  0)

			- 判断是否为null，是则返回指定值，否则返回原本的值

	- isnull

		- isnull( job_id )

			- 判断某字段或表达式是否为null， 返回  1  或  0

- 调用

	- select  函数名(【实参】)  from  表；

- 分类

	- 单行函数

		- 功能

			- 传单个参数，返回单值

		- 分类

			- 字符函数

				- length（str）
				- concat（str1，str2）拼接字符串
				- upper（str） / lower（）字符变大/小写
				- substr（）截取字符串

					- SELECT SUBSTR('女魔头的', 3) 截取后;

				- instr（str，substr）

					- 返回substr在str的起始位置

				- trim（）去除两端空格
				- lpad（str，10，‘ * ’）

					- 用  *  左填充指定长度到10

				- replace（‘张xx爱上我’，‘我’，‘你’）

			- 数学函数

				- round（1.65）四舍五入
				- ceil（）向上取整，返回>=该数的最小整数
				- floor（）向下取整
				- truncate（1.65,1）截断

					- =1.6

				- mod（10， 3）取模

			- 日期函数

				- now（）返回当前系统日期、时间
				- curdate（）返回当前日期
				- curtime（）返回当前时间
				- 获取指定部分

					- year(now())、month（）、monthname（）

				- str_to_date

					- 将日期格式的字符转换成指定格式的日期

				- date_format

					- 将日期转换成字符

				- datediff

					- 两个日期之差

			- 其他函数

				- version（）
				- database（）

					- 当前库

				- user（）当前用户

			- 流程控制函数

				- if函数

					- IF(10<5,'大','小');

				- case函数

					- 使用一

						- case  表达式或字段
when   常量1    then     语句1/值1；
when   常量2   then     语句2/值2；
....
else      要显示的值n或语句n；
end

							- 值后不用分号

					- 使用二

						- case  
when   条件1    then   要显示的值1/语句1；
when   条件2    then   要显示的值2/语句2；
...
else   要显示的值n或语句n
end

	- 分组函数

		- 功能

			- 做统计使用，又称为统计函数、聚合函数、组函数

		- 分类

			- sum(num)、avg(num)、max(num/str)、min(num/str)、count(sum/str)

		- 特点

			- 参数支持类型
			- 都忽略Null值
			- 可以与distinct搭配

				- SELECT sum(DISTINCT salary),sum(salary) FROM employees;

		- count

			- count( * )

				- 常用来统计行数

			- count( 常量 )

				- 多加了一列全是常量，统计该常量 的个数

			- 效率

				- MYISAM存储引擎

					- count（*）效率高

				- INNODB存储引擎

					- count（*）与count（1）效率差不多，比count（字段）高

		- 注意

			- 和分组函数一同查询的字段有限制
			- 和分组函数一同查询的字段要求是group by后的字段

### 分组查询

- 引入：查询每个部门的平均工资
- 简介

	- 使用 GROUP  BY将表中数据分成若干组

- 语法

	- select  分组函数 ，列(要求出现在group by后面的列)
from  表                                                                                       
【where   条件】                                                                       
group by  分组的列表                                                         
【order  by   字句】                                                                 

- 添加筛选条件

	- 分类

		- 分组前筛选

			- SELECT MAX(salary) 最高工资, manager_id 领导编号
FROM employees
WHERE commission_pct IS NOT NULL
GROUP BY manager_id;

		- 分组后筛选

			- 由分组函数查询的 结果 需要进一步筛选
			- having
			- SELECT COUNT(*), department_id
FROM employees
GROUP BY department_id
HAVING COUNT(*)>2;

	- 总结

		- 分组函数做条件，肯定放在having字句中
		- 优先考虑使用分组前筛选

## 分类

### 分组前筛选

- 原始表

### 分组后筛选

- 分组后的结果集

## 位置

## group BY后

## group  BY前

## where

## having

## 关键字

## 数据源

*XMind: ZEN - Trial Version*