# 中心主题

## Linux

### 基操

- 计算机概论
- 安装规划
- 文件

	- 权限与目录
	- 文件管理

- 实用指令

	- 运行级别

		- 0级

			- 关机

		- 1级

			- 单用户

		- 2级

			- 多用户无网络服务

		- 3级

			- 多用户有网络服务

		- 4级

			- 保留

		- 5级

			- 图形界面

		- 6级

			- 重启

		- 基本语法

			- init  0123456

		- 找回root密码

			- 思路

				- 进入到单用户模式（1级）

					- 修改 root密码

			- 原因

				- 单用户模式root不需要密码就可以登录

			- 步骤

				- 启动虚拟机
				- 按enter键
				- 输入“e”
				- 移动光标到“kernel...”行
				- 再输入“e”

	- 帮助指令

		- man

			- 语法：man  [命令配置文件]  
			- man ls

		- help

			- 语法： help   命令
			- help  cd

		- info
		- 百度

	- 文件目录类

		- pwd

			- 显示当前目录的绝对路径
			- 语法：pwd

		- ls

			- 查看当前目录的所有信息
			- 语法：ls   [选项]  【目录或文件】
			- 常用选项

				- -a：显示当前目录所有的文件和目录，包括隐藏
				- -l：以列表的方式显示信息

					- ==ll

		- cd

			- 切换路径
			- cd~

				- 回到家目录

			- cd ..

				- 返回上一级

		- mkdir

			- 用于创建目录
			- mkdir  【选项】 目录名
			- -p  ： 创建多级目录

		- touch

			- 创建空文件
			- 语法：touch  filename
			- 可一次性创建多个文件

		- 删除

			- rmdir

				- 删除空目录
				- rmdir  【选项】  空目录名

			- rm

				- 删除目录
				- rm 【选项】文件或目录
				- -r

					- 递归删除整个文件夹

				- -f

					- 强制删除不提示

		- cp

			- 拷贝文件到指定目录
			- 语法：cp  【选项】source   dest
			- -r: 递归复制整个文件夹
			- 若在cp前加“/”,表示强制覆盖相同文件

		- mv

			- 移动文件与目录或重命名
			- 语法

				-  mv    原文件名   新文件名
				- mv   文件名    目录

		- cat

			- 查看文件内容，只读
			- cat 【选项】  文件名
			- -n：显示行号
			- 配合more分页显示

				- 语法

					- cat   name |  more

				- 按空格换页

		- more

			- 基于Vi编辑器的文本过滤器
			- 语法：more   文件名
			- 快捷键

				- space向下翻页
				- enter 向下翻一行
				- q   离开more
				- C+F 向下滚动一屏
				- C+B返回上一屏
				- =      输出当前行号
				- ：f    输出文件名和当前行的行号

		- less

			- 分屏查看文件内容，与more类似，但比more强
			- 是根据显示需要加载内容，对显示大型文件具有较高的效率
			- 快捷键

				- pagedown

					- 向下翻一页

				- pageup
				- /字符串

					- 向下搜索字符串

						- n：向下查找
						- N：向上查找

				- ？字符串

					- 向上。。。。

						- n：向上
						- N：向下

				- q  离开

		- 输出重定向与追加

			- >

				- 覆盖原文件
				- 若原文件不存在则创建

			- >>

				- 不覆盖

			- 语法

				- ls -l > 文件

					- 列表的内容写入文件中（覆盖写）

				- ls -al>>文件

					- 列表的内容追加到文件的末尾

				- cat  文件1 >> 文件2

					- 将文件1的内容覆盖到文件 2

				- echo  “内容”>>文件

		- echo

			- 语法

				- echo 【选项】 【输出内容】

			- 例

				- 输出环境变量，输出当前的环境路径

					- echo $path

				- 输出hello，world

		- head

			- x显示文件的开头部分，默认前10行
			- 语法

				- head -n  5 name

					- 显示前5行

		- tail

			- 输出文件末尾内容，默认最后5行
			- 语法

				- tail  文件
				- tail -n  5  文件
				- tail -f  文件

					- 实时追踪该文档的所有更新（常用）
					- Ctrl +C退出

		- ln

			- 软链接（符号链接）

				- 类似于桌面快捷方式

					- 存放链接其他文件的路径

				- 语法

					- ln   -s  【原文件或目录】  【软链接名】

				- 删除链接

					- rm不行
					- rm -rf

		- history

			- 查看已经执行过历史命令，也可以执行历史命令
			- 语法

				- history    所有记录
				- history   10   最近10个
				- 执行编号为5的命令：！5

	- 时间日期类

		- date

			- 用法

				- date   显示当前时间
				- date +%Y     年份
				- date +%m    月
				- date +%d      日
				- date "+%Y-%m-%d %H:%M:%S"

			- 设置日期

				- date  -s  “字符串时间”

		- cal

			- 显示日历
			- 语法

				- cal  【选项】
				- cal  年

					- 显示整年

	- 搜索查找类

		- find

			- 将指定目录向下递归地遍历其各个子目录，将满足条件的文件或者目录显示在终端
			- 语法

				- find  【搜索范围】 【选项】
				- 选项

					- -name   文件名：按照指定的文件名查找模式或查找文件
					- -user   用户名 ：   查找属于指定用户名所有文件
					- -size   大小：按照指定的文件大小查找文件

						- 例

							- find / -size  +20M

								- 大于20Mb

							- -20M

								- 小于20MB

							- =20MB
							- +20k

					- find / -name  *.txt

						- 查找所有以txt结尾的文件

		- locate

			- 快速定位文件路径

				- 利用locate数据库实现
				- 无需遍历整个文件系统
				- 为保证准确度，管理员须定期更新locate时刻

			- 语法

				- locate   文件
				- 第一次运行前，须使用updatedb创建locate数据库

		- grep与管道符号

			- 管道符“|”

				- 将前一个命令的处理结果输出传递给后面的命令处理

			- grep 过滤查找

				- 语法

					- grep   【选项】 查找内容  源文件

				- 选项

					- -n   显示匹配行及行号
					- -i   忽略字母大小写

			- 例

				- cat  madate.txt  |  grep  song

	- 压缩与解压缩类

		- gzip、gunzip

			- gzip

				- 压缩文件，只能将文件压缩为 *.gz 文件
				- 语法：gzip  文件
				- 不保留原文件

			- gunzip

				- 语法：gunzip  文件.gz

		- zip、unzip

			- 在项目打包发布中很实用
			- zip

				- 压缩文件

					- 语法

						- zip   【选项】  xxx.zip   将要压缩内容

					- 选项

						- -r     ：递归压缩，即压缩目录

					- 例：zip -r mypack.zip /home

			- unzip

				- 解压

					- unzip   【选项】xxx.zip
					- 选项

						- -d<目录>   ：指定解压后文件的存放目录

		- tar

			- 打包指令

				- .tar.gz文件

			- 语法

				- tar  【选项】xxx.tar.gz 打包内容  

			- 选项

				- -c  ：产生.tar打包文件
				- -v ： 显示详细信息
				- -f：  指定压缩后的文件夹
				- -z： 打包同时压缩
				- -x： 解包.tar文件

			- 例

				- tar -zcvf a.tar.gz a1.txt a2.txt

					- 打包a1、a2

				- tar -zcvf myhome.tar.gz /home

					- 打包home下所有文件

				- tar -zxvf a.tar.gz

					- 解压到当前目录

				- tar -zxvf myhome.tar.gz -C /opt/

					- 解压到指定目录（该目录事先存在）

- 用户管理

	- 创建

		- useradd  用户名
		- useradd -g  组名  用户名

	- 删除
	- 设置密码
	- 查询用户信息
	- 用户组管理

		- 新增组

			- groupadd   组名

		- 删除组
		- 修改组

- 组管理和权限管理

	- 组

		- 基本介绍

			- 文件

				- 所有者

					- 查看所有者

						- ls   -ahl

							- a：所有
							- h：human
							- l：

					- 修改文件所有者

						- chown  用户名   文件名

				- 所在组

					- 修改文件所在组

						- chgrp   组名  文件名

					- 改变用户所在组

						- usermod  -g  组名  用户名
						- usermod  -d  目录名  用户名

							- 改变该用户登录的初始目录

				- 其他组

					- 除去所在组

	- 权限管理

		- rwx

			- 作用到文件

				- r（4）：可读
				- w（2）：可修改，但不代表可删除，改文件目录有w权限才能删除该文件
				- x（1）：可执行

			- 作用到目录

				- r：可读取，ls
				- w：可修改，目录的创建+删除+重命名目录
				- x：可进入该目录

		- 基本介绍

			- 第0位

				- - ：普通文件
				- d：目录
				- l：软链接
				- c：字符设备（键盘，鼠标）
				- b：块文件，硬盘

			- 1~3

				- 文件所有者权限

			- 4~6

				- 文件所在组权限

			- 7~9

				- 文件的其他组的用户的权限

		- 权限管理

			- 修改权限

				- 法一

					- u:所有者   g：所有组   o：其他人    a：所有人
					- chmod  a-x  文件目录名
					- chmod  o+w  文件目录名
					- chmod  u = rwx，g=rx，o=x  文件目录名

				- 法二

					- r = 4，w = 2 ，x = 1
					- chmod  751  文件目录名

			- 修改文件所有者

				- chown  用户名   文件名
				- chown   用户名：组名   文件名

					- 同时改变所有者和所有组

				- -R ：递归其下子文件或目录生效

			- 改变文件所在组
			- 实践

- 任务调度

	- 概述

		- 在某个时间执行特定的命令或程序

	- 基本语法

		- crontab  【选项】
		- 选项

			- -e   编辑crontab定时任务
			- -l   查询crontab任务
			- -r   删除当前用户的所有任务
			- service crond  restart   重启调度

		- 五个占位符

			- 第一个“ * ”

				- 一小时当中的第几分钟

					- 0~59

			- 第二个

				- 一天当中的第几小时

					- 0~23

			- 第三个

				- 一个月当中的第几天

					- 1~31

			- 第四个

				- 一年当中的第几月

					- 1~12

			- 第五个

				- 一周当中的星期几

					- 0~7

		- 特殊符号

	- 脚本或crontab
	- 应用实例

		- 每隔一分钟，将当前日期信息追加到  /tmp/mydate文件中

			- 先编写文件   home/mytext1.sh
			- 在shell文件输入： date  >> /tmp/mydate
			- 给没有mytext1.sh  可执行权限
			- crontab  -e   
			- */1 * * * * /home/mytext1.sh

		- 子主题 1

- 磁盘分区与挂载

	- 分区基础知识

		- 分区方式

			- mbr分区
			- gtb分区

		- windows的磁盘分区

			- 主分区
			- 扩展分区

				- 逻辑分区

	- linux分区

		- 原理

			- 只有一个根目录

		- lsblk  [-f]

			- 查看系统分区

				- “零食不离口”

		- linux硬盘

			- SCSI

				- 分区名称

					- sda1、sda2...

			- IDE（旧）

	- 实例

		- 增加硬盘并挂载到home/newdisk
		- 步骤

			- 虚拟机添加硬盘
			- 分区

				- fdisk  /dev/sdb

			- 格式化

				- mkfs -t  ext4  /dev/sdb1

			- 挂载

				- 先创建一个目录  ：mkdir /home/newdisk
				- 再挂载：   mount  /dev/sdb1  /home/newdisk

			- 设置可以自动挂载

				- vim  /etc/fstab
				- mount  -a

	- 磁盘情况查询

		- 语法

			- df  -lh

				- 查询系统整体磁盘使用情况

			- du  -h

				- 查询指定目录的磁盘占用情况
				- 选项

					- -s   指定目录占用大小汇总
					- -h   带计量单位
					- -a   含文件
					- -max-depth = 1    子目录深度

		- 常用实例

			- ls  -l   /home  |  grep  "^_ "   |   wc   -l

				- 统计/home文件夹下文件的个数

			- ls  -l   /home  |  grep  "^_d"   |   wc   -l

				- 统计/home文件夹下目录的个数

			- ls  -lR   /home  |  grep  "^_ "   |   wc   -l

				- 统计/home文件夹下文件的个数，包括子文件夹里的

			- ls  -lR   /home  |  grep  "^_d"   |   wc   -l

				- 统计文件夹下目录的个数，包括子文件夹里的

			- tree

				- 以树状显示目录结构

- 网络配置

	- 查看网络ip和网关 

		- 查看虚拟网络编辑器

			- 修改虚拟网卡ip地址

		- 查看网关

	- 网络环境配置

		- 自动获取

			- 缺点

				- 每次ip地址可能不一样，不适用于做服务器

		- 指定固定ip

			- 直接修改配置文件指定ip，并可以连接到外网
			- 编辑 /etc/sysconfig/network-scripts/ifcfg-eth0
			- service  network  restart

- 进程管理

	- 进程介绍

		- 每个执行的程序都称为一个进程，每一个进程都分配一个ID号
		- 分为前台和后台进程

	- 进程查询

		- 语法

			- ps

				- -a  显示当前终端的所有进程信息
				- -u   以用户的格式显示进程信息
				- -x   显示后台进程运行的参数

			- ps   -aux   |  grep   xxx
			- ps  -ef  |  grep  xxx

				- 查看父进程

		- 进程树pstree

			- 选项

				- -p  显示进程的PID 
				- -u  显示进程所属用户

	- 终止进程

		- 语法

			- kill   [选项]  进程号   
			- killall   进程名称（支持通配符）

		- 选项

			- -9   强迫进程立即停止

	- 服务管理

		- 本质：后台进程，监听端口
		- 指令

			- systemctl  服务名   star | stop | restar | reload | status

				- 临时生效

			- chkconfig

				- 永久生效

		- 远程电脑检测linux的某个端口是否在监听

			- telnet   ip   端口

		- 服务的运行级别

			- /etc/inittab
			- chkconfig给每个服务的各个运行级别设置自启动和关闭
			- 语法

				- chkconfig  -list | grep xxx

					- 查看服务

				- chkconfig  服务名  --list
				- chkconfig   --level  5  服务名  on/off

		- 监控服务

			- 动态监控进程

				- 类似ps显示进程，不同点在于top可以刷新进程
				- 语法

					- top  [选项]
					- 选项

						- -d  秒数

							- 指定top目录每隔几秒更新，默认是3秒

						- -i

							- 不显示任何闲置或者僵死进程

						- -p

							- 通过指定监控进程ID来仅仅监控某个进程的状态

				- 交互操作

					- q   退出
					- P   按PID升序排列
					- M  按内存使用大小排列
					- 子主题 4

			- 监控网络状态

				- 语法

					- netstat  [选项]
					- -an  按一定顺序排列输出
					- -p   显示哪个进程在调用

- rpm与yum

	- rpm包的管理

		- 类似windows的setup.exe
		- 查询已安装的rpm列表

			- rpm  -qa | grep xx

		- 查询软件包文件位置

			- rpm  -ql  软件包名

		- 卸载rpm包

			- rpm  -e  软件包名

		- 安装rpm包

			- rpm  -ivh  RPM包全路径名称

	- yum

		- shell前端软件包管理器

			- 自动处理依赖性关系

		- 需要联网

			- 访问yum服务器

		- 指令

			- yum  list  |   grep xx  软件列表

				- 查询yum服务器是否有需要安装的软件

			- yum   install   xxx

				- 下载安装

### 进阶

- shell编程

	- 简介

		- 作用： 服务器维护、运维、管理集群
		- 定义：shell命令解释器驱动内核，用户可以用sehll来启动、挂起、停止甚至是编写一些程序

	- 脚本执行方式

		- 格式要求

			- 以   # ! /bin/bash开头
			- echo  “”
			- 注释

				- # 
				- ：<<!
!

		- 执行命令

			- 方法一

				- 赋予.sh脚本的x权限
				- 执行

					- 相对路径   ./myshell.sh
					- 绝对路径    /root/shell/myshell.sh

			- 方法二

				- 不需要x权限（不推荐）
				- sh   ./myshell.sh

	- shell变量

		- 分类

			- 系统变量

				- $HOME  . $PWD等

					- echo  “user = $USER”

			- 用户自定义变量

		- 显示当前shell所有变量：set
		- 定义

			- 基本语法

				- 变量 = 值
				- 撤销： unset 变量
				- 声明静态变量： readonly  变量

					- 不能unset

			- 等号两侧不能有空格
			- 变量名一般大写

		- 将命令的返回值赋值给变量

			- A= `ls - la `  反引号，运行里面的命令，并把结果返回给变量A
			- A=$( ls - la )  等价于反引号

		- shell设置环境变量

			- 语法

				- export  变量名 = 变量值

					- 将shell变量输出为环境变量

				- source  配置文件

					- 让修改后的配置信息立即生效

				- echo  $变量名

					- 查询环境变量的值

		- 位置参数变量

			- 介绍

				- 获取到命令行的参数信息

			- 语法

				- $n

					- n为数值，$0代表命令本身，$1~9表示参数，超过10的参数要加大括号

				- $*

					- 代表命令行所有的参数

				- $@

					- 也代表所有参数，但是把每个参数区别对待

				- $#

					- 代表命令行中所有参数的个数

		- 预定义变量

			- 语法

				- $$

					- 当前进程的进程号（PID）

				- $!

					- 后台运行的最后一个进程的进程号

				- $?

					- 最后一次执行的命令的返回状态

						- 0：上一个命令正确执行
						- ！0：不正确

	- shell运算符

		- 语法

			- $( ( 运算式 ) )  或  $[ 运算式 ]
			- expr  m + n
			- expr  m - n
			- expr  \ *， /，% 

				- 乘 、除、取余

	- 条件判断

		- 语法

			- [  条件  ]

				- 非空返回真

					- 0：true
					- 1：false

		- 常用判断条件

			- 整数

				- =字符串比较
				- -lt 小于
				- -le 小于等于
				- -eq 等于
				- -gt 大于
				- -ge 大于等于
				- -ne 不等于

			- 按照文件权限判断

				- -r  有读的权限

					- 格式

						- 【 -r  文件路径 】

				- -w 写
				- -x  执行

			- 按照文件类型判断

				- -f  文件存在且是一个常规的文件
				- - e  文件存在
				- -d  文件存在且是一个目录

	- 流程控制

		- 语法

			- if语句

				- if  【 条件 】; then
       程序
fi
				- if   【条件】 
then
      程序
elif  【条件】
then
       程序
fi

			- case语句

				- case  $变量名  in
"值1"
程序1
::
"值2"
 。。。
::
esac

			- for循环

				- for  变量  in  值1  值2  值3...
  do
     程序
  done
				- for（（初始值；循环控制条件；变量变化））
  do
    程序
  done

			- while循环

				- while 【 条件 】
  do
     程序
  done

	- 读取控制台输入

		- 语法

			- read （选项）（参数）
			- 选项

				- -p  指定读取值时的提示符
				- -t   指定读取值时等待的时间（s），如果没有指定的时间内输入，就不再等待
				- 变量   指定读取值的变量名

		- read -t 10 -p "请输入一个数num2：" num2
		- 类似scanf、input

	- 函数

		- 系统函数

			- basename

				- 返回完整路径最后 / 的部分，常用于获取文件名
				- basename 【pathname】【suffx】
				- basename【string】【suffix】

			- dirname

				- 返回某文件的路径部分

		- 自定义函数

			- 语法

				- [ function ]  funcname[()]
{
        Action ;
        [return  int ; ]
}

			- 调用

				- funcname   【形参1】【形参2】

			- 没有形参

	- 实操：定时维护数据库

		- 思路

- python开发环境

	- Ubuntu

		- root用户设置

			- sudo  passwd

				- 输入新密码

			- su  root
			- exit

	- 开发python

		- apt  install  vim
		- vim  hello.py
		- 开始写代码....
		- 运行：python3  hello.py

	- apt 软件包管理

		- 安装包管理工具

			- 软件包的安装、删除、清理

		- /etc/apt/sources.list

			- 指定官方的软件仓库地址(美国)

		- 常用指令

			- sudo  apt-get  update  更新源

				- 改成镜像地址

			- sudp  apt-get  package   安装包
			- sudo  apt-get  remover  package  删除包
			- sudo  apy-cache  show  package  获取包的相关信息（说明、大小、版本等）
			- sudo  apt-get  source  package  下载该包的源代码

	- 远程登陆

		- 老版默认没有22端口监听（不支持sshd服务）
		- 安装ssh和启用

			- sudo apt-get  install  openssh-server
			- service  sshd  start
			- netstart   

		- 从windows远程登陆到linux
		- 从linux远程登陆到linux

			- 语法

				- ssh  用户名@ip
				- exit /  logout退出

## 正常模式

## 快捷键模式

### 复制

- （n）yy

### 粘粘

- p

### G、gg

- 文档最末、最首行

### u

- 撤回

### 移动指定行

- 数字+shift+g

## 命令行模式

### 退出

- :wq    :q      :q!

### 查找单词

- /关键字   回车
- n    往下
- noh   取消着色

### 设置行号

- ：set nu
- set  nonu

### 移动指定行

- ：行号   回车

## 插入模式

## Linux文件系统

## boot

### mnt

- home

## /

## 磁盘（硬盘）

## 分区1

## 分区2

## linux分区原理示意图

*XMind: ZEN - Trial Version*