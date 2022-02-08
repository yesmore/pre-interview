# 第一章 快速入门

## 0、TypeScript简介

1. TypeScript是**JavaScript的超集**。
2. 它对JS进行了扩展，向JS中引入了类型的概念，并添加了许多新的特性。
3. TS代码需要通过编译器编译为JS，然后再交由JS解析器执行。
4. TS完全兼容JS，换言之，任何的JS代码都可以直接当成JS使用。

- 相较于JS而言，TS拥有了静态类型，更加严格的语法，更强大的功能；
- TS可以在代码执行前就完成代码的检查，减小了运行时异常的出现的几率；
- TS代码可以编译为任意版本的JS代码，可有效解决不同JS运行环境的兼容问题；
- 同样的功能，TS的代码量要大于JS，但由于TS的代码结构更加清晰，变量类型更加明确，在后期代码的维护中TS却远远胜于JS。



## 1、TypeScript 开发环境搭建

1. 下载Node.js
   - 64位：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x64.msi
   - 32位：https://nodejs.org/dist/v14.15.1/node-v14.15.1-x86.msi
   
2. 安装Node.js

3. 使用npm全局安装typescript
   - 进入命令行
   - 输入：npm i -g typescript
   
4. 创建一个ts文件

5. 使用tsc对ts文件进行**编译**
   - 进入命令行
   
   - 进入ts文件所在目录
   
   - 执行命令：tsc xxx.ts
   
     

## 2、基本类型

- #### 类型声明

  - 类型声明是TS非常重要的一个特点

  - 通过类型声明可以指定TS中变量（参数、形参）的类型

  - 指定类型后，当为变量赋值时，TS编译器会自动检查值是否符合类型声明，符合则赋值，否则报错

  - **简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值**

  - 语法：

    ```typescript
    let 变量: 类型;
    
    let 变量: 类型 = 值;
    
    function fn(参数: 类型, 参数: 类型): 类型{
        ...
    }
    ```

- #### 自动类型判断

  - TS拥有自动的类型判断机制
  - **当对变量的声明和赋值是同时进行的，TS编译器会自动判断变量的类型**
  - 所以如果你的变量的声明和赋值时同时进行的，可以省略掉类型声明

- #### 类型：

  |  类型   |       例子        |              描述              |
  | :-----: | :---------------: | :----------------------------: |
  | number  |    1, -33, 2.5    |            任意数字            |
  | string  | 'hi', "hi", `hi`  |           任意字符串           |
  | boolean |    true、false    |       布尔值true或false        |
  | 字面量  |      其本身       |  限制变量的值就是该字面量的值  |
  |   any   |         *         |            任意类型            |
  | unknown |         *         |         类型安全的any          |
  |  void   | 空值（undefined） |     没有值（或undefined）      |
  |  never  |      没有值       |          不能是任何值          |
  | object  |  {name:'孙悟空'}  |          任意的JS对象          |
  |  array  |      [1,2,3]      |           任意JS数组           |
  |  tuple  |       [4,5]       | 元素，TS新增类型，固定长度数组 |
  |  enum   |    enum{A, B}     |       枚举，TS中新增类型       |

- number

  ```typescript
  let decimal: number = 6;
  let hex: number = 0xf00d;
  let binary: number = 0b1010;
  let octal: number = 0o744;
  let big: bigint = 100n;
  ```

- boolean

  ```typescript
  let isDone: boolean = false;
  ```

- string

  ```typescript
  let color: string = "blue";
  color = 'red';
  
  let fullName: string = `Bob Bobbington`;
  let age: number = 37;
  let sentence: string = `Hello, my name is ${fullName}.
  
  I'll be ${age + 1} years old next month.`;
  ```

- 字面量

  - 也可以使用字面量去指定变量的类型，通过字面量可以确定变量的取值范围

  - ```typescript
    let color: 'red' | 'blue' | 'black';
    let num: 1 | 2 | 3 | 4 | 5;
    ```

- any

  - 相当于关闭该变量的ts语法，开发时不建议使用

  - ```typescript
    let d: any = 4;
    d = 'hello';
    d = true;
    
    // 声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any （隐式的any）
    let d;
    d = 10;
    d = 'hello';
    d = true;
    ```

- unknown

  - 区别any

    - any，可以赋值给任意变量
    - unknown类型的变量，不能直接赋值给其他变量

  - ```typescript
    let notSure: unknown = 4;
    notSure = 'hello';
    // unknown 实际上就是一个类型安全的any
    ```

- void

  ```typescript
  let unusable: void = undefined;
  ```

- never

  ```typescript
  function error(message: string): never {
    throw new Error(message);
  }
  ```

- object（没啥用）

  ```typescript
  let obj: object = {};
  ```

  ```typescript
  // 1.{} 用来指定对象中可以包含哪些属性
  // 语法：{属性名:属性值,属性名:属性值}
  // 在属性名后边加上?，表示属性是可选的
  let b: {name: string, age?: number};
  b = {name: '孙悟空', age: 18};
  
  // 2.[propName: string]: any 表示任意类型的属性
  let c: {name: string, [propName: string]: any};
  c = {name: '猪八戒', age: 18, gender: '男'};
  
  /*
  *  3.设置函数结构的类型声明：
  *       语法：(形参:类型, 形参:类型 ...) => 返回值
  * */
  let d: (a: number ,b: number)=>number;
  let d = function (n1: string, n2: string): number{
     return 10;
  }
  ```

- array

  ```typescript
  /*
  *   数组的类型声明：
  *       类型[]
  *       Array<类型>
  * */
  let list: number[] = [1, 2, 3];
  let list: Array<number> = [1, 2, 3];
  
  // string[] 表示字符串数组
  let e: string[];
  // number[] 表示数值数值
  let f: number[];
  let g: Array<number>;
  ```

- tuple

  ```typescript
  /*
  *   元组，元组就是固定长度的数组
  *       语法：[类型, 类型, 类型]
  * */
  let x: [string, number];
  x = ["hello", 10]; 
  ```

- enum

  ```typescript
  //enum 枚举
  enum Color {
    Red,
    Green,
    Blue,
  }
  let c: Color = Color.Green;
  
  enum Color {
    Red = 1,
    Green,
    Blue,
  }
  let c: Color = Color.Green;
  
  enum Color {
    Red = 1,
    Green = 2,
    Blue = 4,
  }
  let c: Color = Color.Green;
  
  // 补充
  let j: { name: string } & { age: number };
  // j = {name: '孙悟空', age: 18};
  ```

- 类型别名

  ```typescript
  type myType = 1 | 2 | 3 | 4 | 5;
  let k: myType;
  let l: myType;
  let m: myType;
  
  k = 2;
  ```

  

- 类型断言

  - 有些情况下，变量的类型对于我们来说是很明确，但是TS编译器却并不清楚，此时，**可以通过类型断言来告诉编译器变量的类型**，类比强制转换。

  - 断言有两种形式：

    - 第一种

      ```typescript
      let someValue: unknown = "this is a string";
      let strLength: number = (someValue as string).length;
      ```

    - 第二种

      ```typescript
      let someValue: unknown = "this is a string";
      let strLength: number = (<string>someValue).length;
      ```

      

## 3、编译选项

### 自动编译文件

- 编译文件时，使用 `-w` 指令后，TS编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译。

- 示例：

  - ```powershell
    tsc xxx.ts -w
    ```



### 自动编译整个项目

- 如果直接使用**tsc**指令，则可以自动将当前项目下的所有ts文件编译为js文件。
- 但是能直接使用tsc命令的前提时，要先在项目根目录下创建一个ts的配置文件 **tsconfig.json**
- tsconfig.json是一个JSON文件，添加配置文件后，只需只需 tsc 命令即可完成对整个项目的编译

#### 配置选项

##### **include**

- 定义希望被编译文件所在的目录

- 默认值：["\*\*/\*"]

- 示例：

  ```json
  "include":[
      "src/**/*", 
      "tests/**/*"
  ]
  // "**"表示任意目录，“*”表示任意文件
  ```

  - 上述示例中，所有src目录和tests目录下的文件都会被编译

##### **exclude**

- 定义需要排除在外的目录

- 默认值：["node_modules", "bower_components", "jspm_packages"]

- 示例：

  ```json
  "exclude": ["./src/hello/**/*"]
  ```

  - 上述示例中，src下hello目录下的文件都不会被编译

##### **extends**

- 定义被继承的配置文件

- 示例：

  - ```json
    "extends": "./configs/base"
    ```

  - 上述示例中，当前配置文件中会自动包含config目录下**base.json**中的所有配置信息

##### **files**

- 指定被编译文件的列表，只有需要编译的文件少时才会用到

- 示例：

  - ```json
    "files": [
        "core.ts",
        "sys.ts",
        "types.ts",
        "scanner.ts",
        "parser.ts",
        "utilities.ts",
        "binder.ts",
        "checker.ts",
        "tsc.ts"
      ]
    ```

  - 列表中的文件都会被TS编译器所编译

  

##### **compilerOptions**

- **编译选项**是配置文件中非常重要也比较复杂的配置选项

- 在compilerOptions中包含多个子选项，用来完成对编译的配置

###### 项目选项

- **target**

  - 设置ts代码编译的目标版本

  - 可选值：

    - ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext

  - 示例：

    ```json
    "compilerOptions": {
        "target": "ES6"
    }
    ```

    - 如上设置，我们所编写的ts代码将会被编译为ES6版本的js代码

- **lib**

  - 指定代码运行时所包含的库（宿主环境）

  - 可选值：

    - ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ......

  - 示例：

    ```json
    "compilerOptions": {
        "target": "ES6",
        "lib": ["ES6", "DOM"],
        "outDir": "dist",
        "outFile": "dist/aa.js"
    }
    ```

- **module**

  - 设置编译后代码使用的模块化系统

  - 可选值：

    - CommonJS、UMD、AMD、System、ES2020、ESNext、None

  - 示例：

    ```typescript
    "compilerOptions": {
        "module": "CommonJS"
    }
    ```

- **outDir**

  - 编译后文件的所在目录

  - 默认情况下，编译后的js文件会和ts文件位于相同的目录，设置outDir后可以改变编译后文件的位置

  - 示例：

    ```json
    "compilerOptions": {
        "outDir": "dist"
    }
    ```

    - 设置后编译后的js文件将会生成到dist目录

- **outFile**

  - 将所有的文件编译为一个js文件

  - 默认会将所有的编写在全局作用域中的代码合并为一个js文件，如果module制定了None、System或AMD则会将模块一起合并到文件之中

  - 示例：

    ```json
    "compilerOptions": {
        "outFile": "dist/app.js"
    }
    ```

- **rootDir**

  - 指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过rootDir可以手动指定根目录

  - 示例：

    ```json
    "compilerOptions": {
        "rootDir": "./src"
    }
    ```

- **allowJs**

  - 是否对js文件编译，默认是false

- **checkJs**

  - 是否检查js代码是否符合语法规范，默认是false

  - 示例：

    ```json
    "compilerOptions": {
        "allowJs": true,
        "checkJs": true
    }
    ```

- **removeComments**

  - 是否删除注释
  - 默认值：false

- **noEmit**

  - 不生成编译后的文件
  - 默认值：false

- **sourceMap**

  - 是否生成sourceMap
  - 默认值：false

- **noEmitOnError**
  
  - 当有错误时不生成编译后的文件



- **严格检查**
- strict
    - 启用所有的严格检查，默认值为true，设置后相当于开启了所有的严格检查
  - alwaysStrict
    - 总是以严格模式对代码进行编译
  - noImplicitAny
    - 禁止隐式的any类型
  - noImplicitThis
    - 禁止类型不明确的this
  - strictBindCallApply
    - 严格检查bind、call和apply的参数列表
  - strictFunctionTypes
    - 严格检查函数的类型
  - strictNullChecks
    - 严格的空值检查
  - strictPropertyInitialization
    - 严格检查属性是否初始化
  
- 额外检查

  - noFallthroughCasesInSwitch
    - 检查switch语句包含正确的break
  - noImplicitReturns
    - 检查函数没有隐式的返回值
  - noUnusedLocals
    - 检查未使用的局部变量
  - noUnusedParameters
    - 检查未使用的参数

- 高级

  - allowUnreachableCode
    - 检查不可达代码
    - 可选值：
      - true，忽略不可达代码
      - false，不可达代码将引起错误
  - noEmitOnError
    - 有错误的情况下不进行编译
    - 默认值：false

## 4、webpack

- 通常情况下，实际开发中我们都需要使用构建工具对代码进行打包，TS同样也可以结合构建工具一起使用，下边以webpack为例介绍一下如何结合构建工具使用TS。

- 步骤：

  1. 初始化项目

     - 进入项目根目录，执行命令 ``` npm init -y```
       - 主要作用：创建package.json文件

  2. 下载构建工具

     - ```npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin```
       - 共安装了7个包
         - **webpack**
           - 构建工具webpack
         - **webpack-cli**
           - webpack的命令行工具
         - **webpack-dev-server**
           - webpack的开发服务器
         - **typescript**
           - ts编译器
         - **ts-loader**
           - ts加载器，用于在webpack中编译ts文件
         - **html-webpack-plugin**
           - webpack中html插件，用来自动创建html文件
         - **clean-webpack-plugin**
           - webpack中的清除插件，每次构建都会先清除目录

  3. 根目录下创建webpack的配置文件webpack.config.js

     ```javascript
     const path = require("path");
     const HtmlWebpackPlugin = require("html-webpack-plugin");
     const { CleanWebpackPlugin } = require("clean-webpack-plugin");
     
     module.exports = {
         optimization:{
             minimize: false // 关闭代码压缩，可选
         },
     
         entry: "./src/index.ts",
         
         devtool: "inline-source-map",
         
         devServer: {
             contentBase: './dist'
         },
     
         output: {
             path: path.resolve(__dirname, "dist"),
             filename: "bundle.js",
             environment: {
                 arrowFunction: false // 关闭webpack的箭头函数，可选
             }
         },
     	// 用来设置引用模块
         resolve: {
             extensions: [".ts", ".js"]
         },
         
         module: {
             // 指定要加载的规则
             rules: [
                 {
                     // test指定的是规则生效的文件
                     test: /\.ts$/,
                     // 配置babel
                     use: {
                        loader: "ts-loader"     
                     },
                     // 要排除的文件
                     exclude: /node_modules/
                 }
             ]
         },
     
         plugins: [
             new CleanWebpackPlugin(),
             new HtmlWebpackPlugin({
                 title:'TS测试'
             }),
         ]
     
     }
     ```

  4. 根目录下创建tsconfig.json，配置可以根据自己需要

     ```json
     {
         "compilerOptions": {
             "target": "ES2015",
             "module": "ES2015",
             "strict": true
         }
     }
     ```

  5. 修改package.json添加如下配置

     ```json
     {
       ...略...
       "scripts": {
         "test": "echo \"Error: no test specified\" && exit 1",
         "build": "webpack",
         "start": "webpack serve --open chrome.exe"
       },
       ...略...
     }
     ```

  6. 在src下创建ts文件，并在并命令行执行```npm run build```对代码进行编译，或者执行```npm start```来启动开发服务器

     

## 5、Babel

- 经过一系列的配置，使得TS和webpack已经结合到了一起，除了webpack，开发中还经常需要结合babel来**对代码进行转换**以使其可以**兼容到更多的浏览器**，在上述步骤的基础上，通过以下步骤再将babel引入到项目中。

  1. 安装依赖包：
     - ```npm i -D @babel/core @babel/preset-env babel-loader core-js```
     - 共安装了4个包，分别是：
       - @babel/core
         - babel的核心工具
       - @babel/preset-env
         - babel的预定义环境
       - @babel-loader
         - babel在webpack中的加载器
       - core-js
         - core-js用来使老版本的浏览器支持新版ES语法

  2. 修改webpack.config.js配置文件

     - ```javascript
       ...略...
       module: {
         rules: [
           {
             test: /\.ts$/,
             use: [
               {
                  loader: "babel-loader",// 指定加载器
                   // 设置babel
                  options:{
                      // 设置预定义环境
                    presets: [
                      	[
                         "@babel/preset-env",// 指定环境的插件
                           // 配置信息
                            {
                               "targets":{
                                   // 要兼容的目标浏览器
                                  "chrome": "58",
                                     "ie": "11"
                                 },
                                 "corejs":"3",// 指定corejs版本
                                 "useBuiltIns": "usage" // 按需加载
                              }
                       ]
                    ]
                   }
                 },
                 {
                    loader: "ts-loader",
                  }
                 ],
                   exclude: /node_modules/
               }
           ]
}
       ...略...
       ```
       
     - 如此一来，使用ts编译后的文件将会再次被babel处理，使得代码可以在大部分浏览器中直接使用，可以在配置选项的targets中指定要兼容的浏览器版本。



# 第二章：面向对象

面向对象是程序中一个非常重要的思想，它被很多同学理解成了一个比较难，比较深奥的问题，其实不然。面向对象很简单，简而言之就是**程序之中所有的操作都需要通过对象来完成**。

- 举例来说：
  - 操作浏览器要使用window对象
  - 操作网页要使用document对象
  - 操作控制台要使用console对象

一切操作都要通过对象，也就是所谓的面向对象，那么对象到底是什么呢？这就要先说到程序是什么，计算机程序的本质就是**对现实事物的抽象**，**抽象**的反义词是**具体**，比如：照片是对一个具体的人的抽象，汽车模型是对具体汽车的抽象等等。程序也是对事物的抽象，在程序中我们可以表示一个人、一条狗、一把枪、一颗子弹等等所有的事物。一个事物到了程序中就变成了一个对象。

在程序中所有的对象都被分成了两个部分：**数据**和**功能**，以人为例，人的姓名、性别、年龄、身高、体重等属于数据，人可以说话、走路、吃饭、睡觉这些属于人的功能。数据在对象中被成为属性，而功能就被称为方法。所以简而言之，**在程序中一切皆是对象。**

## 1、类（class）

要想面向对象，操作对象，首先便要拥有对象，那么下一个问题就是如何**创建对象**。要创建对象，必须要**先定义类**，所谓的类可以理解为**对象的模型**，程序中可以根据类创建指定类型的对象，举例来说：可以通过Person类来创建人的对象，通过Dog类创建狗的对象，通过Car类来创建汽车的对象，不同的类可以用来创建不同的对象。

- 定义类：

  ```typescript
  class 类名 {
  	属性名: 类型;
  	
  	constructor(参数: 类型){
  		this.属性名 = 参数;
  	}
  	
  	方法名(){
  		....
  	}
  
  }
  /*
      *   1.直接定义的属性是实例属性，需要通过对象的实例去访问：
      *       const per = new Person();
      *       per.name
      *
      *   2.使用static开头的属性是静态属性（类属性），可以直接通过类去访问
      *       Person.age
      *
      *   readonly开头的属性表示一个只读的属性无法修改
      * */
  ```

- 两种属性：
  - **实例属性**
    - 直接定义的属性是实例属性，需要通过对象的实例去访问
  - **静态属性**
    - 使用static开头的属性是静态属性（类属性），可以直接通过类去访问

- 构造函数constructor：

  - ```typescript
    constructor(name: string, age: number) {
        // 在实例方法中，this就表示当前当前的实例
        // 在构造函数中当前对象就是当前新建的那个对象
        // 可以通过this向新建的对象中添加属性
        this.name = name;
        this.age = age;
    }
    ```

- 示例：

  ```typescript
  class Person{
      name: string;
      age: number;
  
      constructor(name: string, age: number){
          this.name = name;
          this.age = age;
      }
  
      sayHello(){
          console.log(`大家好，我是${this.name}`);
      }
  }
  ```

- 使用类：

  ```typescript
  const p = new Person('孙悟空', 18);
  p.sayHello();
  ```



## 2、面向对象的特点

#### 封装

- 对象实质上就是属性和方法的容器，它的主要作用就是**存储属性和方法**，这就是所谓的封装

- 默认情况下，对象的属性是可以任意的修改的，为了**确保数据的安全性**，在TS中可以对属性的权限进行设置

- 只读属性（readonly）：

  - 如果在声明属性时添加一个readonly，则属性便成了只读属性无法修改

- TS中**属性**具有三种**修饰符**：

  - **public**（默认值），可以在类、子类和对象中修改
  - **protected** ，可以在类、子类中修改
  - **private** ，可以在类中修改

- 示例：

  - public

    ```typescript
    class Person{
        public name: string; // 写或什么都不写都是public
        public age: number;
    
        constructor(name: string, age: number){
            this.name = name; // 可以在类中修改
            this.age = age;
        }
    
        sayHello(){
            console.log(`大家好，我是${this.name}`);
        }
    }
    
    class Employee extends Person{
        constructor(name: string, age: number){
            super(name, age);
            this.name = name; //子类中可以修改
        }
    }
    
    const p = new Person('孙悟空', 18);
    p.name = '猪八戒';// 可以通过对象修改
    ```

    

  - protected

    ```typescript
    class Person{
        protected name: string;
        protected age: number;
    
        constructor(name: string, age: number){
            this.name = name; // 可以修改
            this.age = age;
        }
    
        sayHello(){
            console.log(`大家好，我是${this.name}`);
        }
    }
    
    class Employee extends Person{
    
        constructor(name: string, age: number){
            super(name, age);
            this.name = name; //子类中可以修改
        }
    }
    
    const p = new Person('孙悟空', 18);
    p.name = '猪八戒';// 不能修改
    ```

    

  - private

    ```typescript
    class Person{
        private name: string;
        private age: number;
    
        constructor(name: string, age: number){
            this.name = name; // 可以修改
            this.age = age;
        }
    
        sayHello(){
            console.log(`大家好，我是${this.name}`);
        }
    }
    
    class Employee extends Person{
    
        constructor(name: string, age: number){
            super(name, age);
            this.name = name; //子类中不能修改
        }
    }
    
    const p = new Person('孙悟空', 18);
    p.name = '猪八戒';// 不能修改
    ```

- 属性存取器

  - 对于一些不希望被任意修改的属性，可以将其设置为private

  - 直接将其设置为private将导致无法再通过对象修改其中的属性

  - 我们可以在类中定义一组读取、设置属性的方法，这种对属性读取或设置的属性被称为属性的存取器

  - 读取属性的方法叫做setter方法，设置属性的方法叫做getter方法

  - 示例：

    ```typescript
    class Person{
        private _name: string;
    
        constructor(name: string){
            this._name = name;
        }
    
        get name(){
            return this._name;
        }
    
        set name(name: string){
            this._name = name;
        }
    
    }
    
    const p1 = new Person('孙悟空');
    console.log(p1.name); // 通过getter读取name属性
    p1.name = '猪八戒'; // 通过setter修改name属性
    ```
    
    ```typescript
    (function (){
        // 定义一个表示人的类
        class Person{
            // TS可以在属性前添加属性的修饰符
            /*
            *   public 修饰的属性可以在任意位置访问（修改） 默认值
            *   private 私有属性，私有属性只能在类内部进行访问（修改）
            *       - 通过在类中添加方法使得私有属性可以被外部访问
            *   protected 受包含的属性，只能在当前类和当前类的子类中访问（修改）
            *
            * */
            private _name: string;
            private _age: number;
    
            constructor(name: string, age: number) {
                this._name = name;
                this._age = age;
            }
    
            /*
            *   getter方法用来读取属性
            *   setter方法用来设置属性
            *       - 它们被称为属性的存取器
            * */
    
            // 定义方法，用来获取name属性
            // getName(){
            //     return this._name;
            // }
            //
            // // 定义方法，用来设置name属性
            // setName(value: string){
            //     this._name = value;
            // }
            //
            // getAge(){
            //     return this._age;
            // }
            //
            // setAge(value: number){
            //     // 判断年龄是否合法
            //     if(value >= 0){
            //         this._age = value;
            //     }
            // }
    
            // TS中设置getter方法的方式
            get name(){
                // console.log('get name()执行了！！');
                return this._name;
            }
    
            set name(value){
                this._name = value;
            }
    
            get age(){
                return this._age;
            }
    
            set age(value){
                if(value >= 0){
                    this._age = value
                }
            }
        }
    
        const per = new Person('孙悟空', 18);
    
        /*
        * 现在属性是在对象中设置的，属性可以任意的被修改,
        *   属性可以任意被修改将会导致对象中的数据变得非常不安全
        * */
    
        // per.setName('猪八戒');
        // per.setAge(-33);
    
        per.name = '猪八戒';
        per.age = -33;
    
        // console.log(per);
    
    
        class A{
            protected num: number;
    
            constructor(num: number) {
                this.num = num;
            }
        }
    
        class B extends A{
    
            test(){
                console.log(this.num);
            }
    
        }
    
        const b = new B(123);
        // b.num = 33;
    
    
       /* class C{
    
            name: string;
            age: number
    
            // 可以直接将属性定义在构造函数中
            constructor(name: string, age: number) {
                this.name = name;
                 this.age = age;
            }
    
        }*/
    
        class C{
    
            // 可以直接将属性定义在构造函数中
            constructor(public name: string, public age: number) {
            }
    
        }
    
        const c = new C('xxx', 111);
    
        console.log(c);
    
    })();
    ```

  

- 静态属性

  - 静态属性（方法），也称为类属性。使用静态属性无需创建实例，通过类即可直接使用

  - 静态属性（方法）使用static开头

  - 示例：

    ```typescript
    class Tools{
        static PI = 3.1415926;
        
        static sum(num1: number, num2: number){
            return num1 + num2
        }
    }
    
    console.log(Tools.PI);
    console.log(Tools.sum(123, 456));
    ```

- this

  - 在类中，使用this表示当前对象

#### 继承

- 继承时面向对象中的又一个特性

- 通过继承可以将其他类中的属性和方法引入到当前类中

  - 示例：

    ```typescript
    class Animal{
        name: string;
        age: number;
    
        constructor(name: string, age: number){
            this.name = name;
            this.age = age;
        }
    }
    
    class Dog extends Animal{
    
        bark(){
            console.log(`${this.name}在汪汪叫！`);
        }
    }
    
    const dog = new Dog('旺财', 4);
    dog.bark();
    ```

- 通过继承可以在不修改类的情况下完成对类的扩展

  

#### 重写

- 发生继承时，如果子类中的方法会**替换**掉父类中的同名方法，这就称为方法的重写

- 示例：

  - ```typescript
    class Animal{
        name: string;
        age: number;
    
        constructor(name: string, age: number){
            this.name = name;
            this.age = age;
        }
    
        run(){
            console.log(`父类中的run方法！`);
        }
    }
    
    class Dog extends Animal{
    
        bark(){
            console.log(`${this.name}在汪汪叫！`);
        }
    
        run(){
            console.log(`子类中的run方法，会重写父类中的run方法！`);
        }
    }
    
    const dog = new Dog('旺财', 4);
    dog.bark();
    ```

- **super**

  - 在类的方法中 **super就表示当前类的父类**
  - 如果在子类中写了构造函数，在子类构造函数中必须对父类的构造函数进行调用

  ```typescript
  (function () {
      class Animal {
          name: string;
  
          constructor(name: string) {
              this.name = name;
          }
  
          sayHello() {
              console.log('动物在叫~');
          }
      }
  
      class Dog extends Animal{
  
          age: number;
  
          // 相当于重写了
          constructor(name: string, age: number) {
              // 如果在子类中写了构造函数，在子类构造函数中必须对父类的构造函数进行调用
              super(name); // 调用父类的构造函数
              this.age = age;
          }
  
          sayHello() {
              // 在类的方法中 super就表示当前类的父类
              //super.sayHello();
  
              console.log('汪汪汪汪！');
          }
  
      }
  
      const dog = new Dog('旺财', 3);
      dog.sayHello();
  })();
  ```

- **抽象类**（abstract class）

  - 抽象类是专门用来被其他类所继承的类，它**只能被其他类所继承不能用来创建实例**

  - ```typescript
    abstract class Animal{
        abstract run(): void;
        bark(){
            console.log('动物在叫~');
        }
    }
    
    class Dog extends Animals{
        run(){
            console.log('狗在跑~');
        }
    }
    ```

  - 使用**abstract**开头的方法叫做抽象方法，抽象方法没有方法体只能定义在抽象类中，继承抽象类时抽象方法必须要实现（必须重写）

    ```typescript
    abstract sayHello():void;
    ```

  

## 3、接口（Interface）

- 接口的作用**类似于抽象类**，不同点在于接口中的所有方法和属性都是**没有实值**的，换句话说接口中的所有方法**都是抽象方法**。

- 接口主要负责定义一个类的结构，接口可以去限制一个对象的接口，对象只有包含接口中定义的所有属性和方法时才能匹配接口。

- 示例（检查对象类型）：

  ```typescript
  interface Person{
      name: string;
      sayHello():void;
  }
  
  function fn(per: Person){
      per.sayHello();
  }
  
  fn({name:'孙悟空', sayHello() {console.log(`Hello, 我是 ${this.name}`)}});
  
  ```

- 同时，可以让一个类去实现接口，实现接口时类中要保护接口中的所有属性。

- 实现接口就是使类满足接口的要求

- 示例（实现）

  ```typescript
  interface Person{
      name: string;
      sayHello():void;
  }
  
  class Student implements Person{
      constructor(public name: string) {
      }
  
      sayHello() {
          console.log('大家好，我是'+this.name);
      }
  }
  ```



## 4、泛型（Generic）

- 概念
  
  - 不确定某个类型
  - **自定义表示某个类型。**
  
- 使用条件
  - 在定义函数或是类时，如果遇到类型不明确就可以使用泛型
  - 定义一个函数或类时，有些情况下**无法确定其中要使用的具体类型**（返回值、参数、属性的类型不能确定），此时泛型便能够发挥作用。

- 举个例子：

  - ```typescript
    function test(arg: any): any{
    	return arg;
    }
    ```

  - 上例中，test函数有一个参数类型不确定，但是能确定的时其返回值的类型和参数的类型是相同的，由于类型不确定所以参数和返回值**均使用了any**，但是很明显这样做是不合适的，首先使用any会关闭TS的类型检查，其次这样设置也不能体现出参数和返回值是相同的类型

  - 使用泛型：

  - ```typescript
    function test<T>(arg: T): T{
    	return arg;
    }
    ```

  - 这里的```<T>```就是泛型，T是我们给这个类型起的名字（不一定非叫T），设置泛型后即可在函数中使用T来表示该类型。所以泛型其实很好理解，就**表示某个类型。**

  - 那么如何使用上边的函数呢？

    - 方式一（直接使用）：

      - ```typescript
        test(10)
        ```

      - 使用时可以直接传递参数使用，类型会由TS自动推断出来，但有时编译器无法自动推断时还需要使用下面的方式

    - 方式二（指定类型）：

      - ```typescript
        test<number>(10)
        ```

      - 也可以在函数后手动指定泛型

  - 可以同时指定多个泛型，泛型间使用逗号隔开：

    - ```typescript
      function test<T, K>(a: T, b: K): K{
          return b;
      }
      
      test<number, string>(10, "hello");
      ```

    - 使用泛型时，完全可以将泛型当成是一个普通的类去使用

  - 类中同样可以使用泛型：

    - ```typescript
      class MyClass<T>{
          prop: T;
      
          constructor(prop: T){
              this.prop = prop;
          }
      }
      ```

  - 除此之外，也可以对泛型的范围进行约束

    - ```typescript
      interface MyInter{
          length: number;
      }
      
      function test<T extends MyInter>(arg: T): number{
          return arg.length;
      }
      ```

    - 使用T extends MyInter表示泛型T必须是MyInter的子类，不一定非要使用接口类和抽象类同样适用。





