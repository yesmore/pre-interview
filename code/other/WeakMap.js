const oBtn1 = document.querySelector('#btn1')
const oBtn2 = document.querySelector('#btn1')

const oBtnMap = new WeakMap()

// 将节点与回调绑定在一起，垃圾回收时一起被回收（键名键值一起回收）
// 键名是弱引用
oBtnMap.set(oBtn1, handleClick1)
oBtnMap.set(oBtn2, handleClick2)

oBtn1.addEventListener('click', handleClick1, false)
oBtn2.addEventListener('click', handleClick2, false)

function handleClick1() {}

function handleClick2() {}

oBtn1.remove() // 删除节点，但是不能回收事件回调函数
oBtn2.remove()

// 垃圾回收：必须使用这种方法删除回调
// handleClick1 = null;
// handleClick2 = null