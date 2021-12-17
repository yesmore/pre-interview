# Diff算法

提到这个算法，就必须说一下关于`Key`的事情了。

其实每个组件中的每个标签都会有一个key, 只不过有的必须显示的指定，有的可以隐藏。

 如果生成的render出来后就**不会改变里面的内容，那么你不需要指定key**（不指定key时，React也会生成一个默认的标识）,或者将index作为key，只要key不重复即可。

但是如果你的标签是动态的，是有可能刷新的，就必须显示的指定key。上面案使用map进行便利的时候就必须指定Key:

```react
this.state.num.map((n,index)=>{
	return <div className="news" key={index} >新闻{n}</div>
})
```

这个地方虽然显示的指定了key，但是**官网并不推荐使用Index作为Key去使用**；

这样会很有可能会有效率上的问题

举个例子：

在一个组件中，我们先创建了两个对象，通过循环的方式放入< li>标签中，此时key使用的是index。

```react
person:[
    {id:1,name:"张三",age:18},
    {id:2,name:"李四",age:19}
]

this.state.person.map((preson,index)=>{
  return  <li key = {index}>{preson.name}</li>
})
```

如下图展现在页面中：

![原始对象数组](https://cdn.jsdelivr.net/gh/yesmore/img/img/1611800406864.png)

此时，我们想在点击按钮之后动态的添加一个对象，并且放入到li标签中，在重新渲染到页面中。

我们通过修改State来控制对象的添加。

```react
<button onClick={this.addObject}>点击增加对象</button>
addObject = () =>{
    let {person} = this.state;
    const p = {id:(person.length+1),name:"王五",age:20};
    this.setState({person:[p,...person]});
}
```

如下动图所示：

 ![原始对象数组](https://cdn.jsdelivr.net/gh/yesmore/img/img/addObject.gif) 

这样看，虽然完成了功能。但是其实存在效率上的问题，	我们先来看一下两个前后组件状态的变化：

![组件状态的变化](https://cdn.jsdelivr.net/gh/yesmore/img/img/1611800988496.png)

我们发现，组件第一个变成了王五，张三和李四都移下去了。因为我们使用Index作为Key，这三个标签的key也就发生了改变【张三原本的key是0，现在变成了1，李四的key原本是1，现在变成了2，王五变成了0】在组件更新状态重新渲染的时候，就出现了问题：

因为react是通过key来比较组件标签是否一致的，拿这个案例来说：

首先，状态更新导致组件标签更新，react根据Key，判断旧的虚拟DOM和新的虚拟DOM是否一致

key = 0 的时候 旧的虚拟DOM 内容是张三  新的虚拟DOM为王五 ，react认为内容改变，从而重新创建新的真实DOM.

key = 1 的时候 旧的虚拟DOM 内容是李四，新的虚拟DOM为张三，react认为内容改变，从而重新创建新的真实DOM

key = 2 的时候 旧的虚拟DOM没有，创建新的真实DOM 

这样原本有两个虚拟DOM可以复用，但都没有进行复用，完完全全的都是新创建的；这就导致效率极大的降低。

其实这是因为我们将新创建的对象放在了首位，如果放在最后其实是没有问题的，但是因为官方并不推荐使用Index作为key值，我们推荐使用id作为key值。从而完全避免这样的情况。



### 虚拟DOM中key的作用

1). 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。

2). 详细的说: 当状态中的数据发生变化时，react会根据 **新数据** 生成 **新的虚拟DOM**，随后React进行 新虚拟DOM 与 旧虚拟DOM 的**diff比较**，比较规则如下：

**a**. 旧虚拟DOM中找到了与新虚拟DOM相同的key：

- 若虚拟DOM中内容没变, 直接使用之前的真实DOM

- 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM

**b**. 旧虚拟DOM中未找到与新虚拟DOM相同的key

- 根据数据创建新的真实DOM，随后渲染到到页面

### 用index作为key可能会引发的问题

1）若对数据进行:逆序添加、逆序删除等破坏顺序操作:

会产生没有必要的真实DOM更新  界面效果没问题,但效率低。

2）如果结构中还包含输入类的DOM:

会产生错误DOM更新   界面有问题。

3）注意! 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。

### 开发如何选择key?

最好使用每一条数据的唯一标识作为key 比如id，手机号，身份证号；

如果确定只是简单的展示数据，用Index也是可以的

**而这个判断key的比较规则就是Diff算法**

Diff算法其实就是react生成的新虚拟DOM和以前的旧虚拟DOM的比较规则：

- 如果旧的虚拟DOM中找到了与新虚拟DOM相同的key:
  - 如果内容没有变化，就直接只用之前旧的真实DOM
  - 如果内容发生了变化，就生成新的真实DOM			

- 如果旧的虚拟DOM中没有找到了与新虚拟DOM相同的key:
  - 根据数据创建新的真实的DOM,随后渲染到页面上