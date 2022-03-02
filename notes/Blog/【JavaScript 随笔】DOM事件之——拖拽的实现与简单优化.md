#### 【JavaScript 随笔】DOM事件之——拖拽的实现与简单优化
##### *效果*
```鼠标点击文档中任意元素拖拽至任意位置。```
##### *思路与流程*
```
鼠标按下时，开始拖拽：onmousedown
鼠标移动，元素被拖动：onmousemove
鼠标松开，被拖拽元素固定：onmouseup
```
##### *代码*
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        #box1{
            width: 200px;
            height: 30px;
            background-color: bisque;
            position: absolute;
        }
        #box2{
            width: 50px;
            height: 50px;
            background-color: rgb(184, 127, 59);
            position: absolute;

            left: 200px;
            top: 200px;
        }
        #img1{
            width: 250px;
            position: absolute;
        }
    </style>
    <script>
        window.onload = function(){
            //拖拽box1元素
            /*流程
             *  1.当鼠标按下时，开始拖拽：onmousedown
             *  2.鼠标移动，元素被拖动：onmousemove
             *  3.鼠标松开，被拖拽元素固定：onmouseup
            */
            var box1 = document.getElementById('box1');
            var box2 = document.getElementById('box2');
            var img = document.getElementById('img1');
            //开启box1
            drag(box1);
            drag(box2);
            drag(img);

            };

            //优化：3提前一个专门用来设置拖拽的函数
            //参数：obj
            function drag(obj){
                //第一步
                obj.onmousedown = function(event){
                //设置box1捕获所有鼠标按下的事件
                obj.setPointerCapture;
                //优化 1
                //div的偏移量 鼠标.clientX - 元素.offsetLeft
                //div的偏移量 鼠标.clientY - 元素.offsetTop
                event = event || window.event;
                var ol = event.clientX - obj.offsetLeft;
                var ot = event.clientY - obj.offsetTop;

                //第二部
                document.onmousemove = function(event){
                    event = event || window.event;
                    //第三部
                    //获取鼠标坐标
                    var left = event.clientX - ol;
                    var top = event.clientY - ot;
                    //修改box1的位置
                    obj.style.left = left+'px';
                    obj.style.top = top+'px';
                    obj.innerHTML = 'x='+left+' y='+top;
                };
                document.onmouseup = function(){
                    //鼠标松开时，固定在当前位置
                    //取消onmousemove
                    document.onmousemove = null;
                    //取消onmouseup(一次性事件)
                    document.onmouseup = null;
                    //事件松开时，取消对事件的捕获
                    obj.releasePointerCapture;
                };
                //优化 2
                return false;
            }
        };
    </script>
</head>
<body>
    <div id="box1"></div>
    <div id="box2"></div>
    <img src="./img/1.jpg" id="img1">
</body>
</html>
```
##### *优化*

 1. 鼠标的偏移量
	> 初始代码的拖拽效果，会出现明显的偏移，即鼠标在移动时，偏离最初点击的位置，用户体验差。
	
	**解决方法**
	>元素的偏移量 鼠标.clientX - 元素.offsetLeft
元素的偏移量 鼠标.clientY - 元素.offsetTop
 2. 拖拽内容时，浏览器会默认去搜索引擎中搜索内容
 	**解决方法1**
 	>return false (不兼容ie8及以下)
 	
	**解决方法2**
	>setCapture()方法 (不支持Chrome)
	
	>setPointerCapture属性：鼠标单击时，捕获所有鼠标按下的事件。
	releasePointerCapture属性：事件松开时，取消对事件的捕获
 3. 提取该拖拽函数

```javascript
//优化：3提前一个专门用来设置拖拽的函数
//参数：obj
function drag(obj){
    //第一步
    obj.onmousedown = function(event){
    //设置box1捕获所有鼠标按下的事件
    obj.setPointerCapture;
    //优化 1
    //div的偏移量 鼠标.clientX - 元素.offsetLeft
    //div的偏移量 鼠标.clientY - 元素.offsetTop
    event = event || window.event;
    var ol = event.clientX - obj.offsetLeft;
    var ot = event.clientY - obj.offsetTop;

    //第二部
    document.onmousemove = function(event){
        event = event || window.event;
        //第三部
        //获取鼠标坐标
        var left = event.clientX - ol;
        var top = event.clientY - ot;
        //修改box1的位置
        obj.style.left = left+'px';
        obj.style.top = top+'px';
        obj.innerHTML = 'x='+left+' y='+top;
    };
    document.onmouseup = function(){
        //鼠标松开时，固定在当前位置
        //取消onmousemove
        document.onmousemove = null;
        //取消onmouseup(一次性事件)
        document.onmouseup = null;
        //事件松开时，取消对事件的捕获
        obj.releasePointerCapture;
    };
    //优化 2
    return false;
}
```
	 
