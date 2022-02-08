#### JavaScript实现动态显示时间效果
**知识点**
>Timing事件之 setInterval()方法：![](https://img-blog.csdnimg.cn/20200809150657625.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQ3NjU0MDEw,size_16,color_FFFFFF,t_70)

**效果**
![](https://img-blog.csdnimg.cn/20200809150619988.jpg)

**上代码**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>

    </style>
</head>
<body>

    <div id="time"></div>
	<input type="button" value="开始" id="start"></input>
	<input type="button" value="结束" id="end"></input>
</body>

<script type="text/javascript">
    window.onload = function(){

    
        var start = document.getElementById('start');
        var end = document.getElementById('end');
        var time1 = document.getElementById('time');

        start.onclick = function(){
            
            // clearInterval(timer);

            timer = setInterval(function(){
                
                var d = new Date();
                //  年月日
                var year = d.getFullYear();
                var month = d.getMonth()+1;
                var day = d.getDate();
                //  时分秒
                var h = d.getHours();
                var m = d.getMinutes();
                var s = d.getSeconds();
                if(s<10){
                    s = "0"+s;
                }
                // time1.innerHTML = s;
                time1.innerHTML = "当前时间："+year+"-"+month+"-"+day+" "+h+":"+m+":"+s;

            },100);

            end.onclick = function(){
                clearInterval(timer);
                // alert('stop');
            };
        };
        
    };
</script>
</html>
```
