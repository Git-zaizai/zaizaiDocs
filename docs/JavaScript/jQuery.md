## 1 jQuery 概述

### 1.1 JavaScript 库

库，是用于开发软件的子程序集合。库和可执行文件的区别是，库不是独立程序，他们是向其他程序提供服务的代码库链接。

**JavaScript** 库：即 library，是一个**封装**好的特定的**集合**（方法和函数）。就是把各种常用的代码片段，组织起来放在一个 js 文件里，组成一个包，这个包就是 JavaScript 库。

简单理解：就是一个 JS文件，里面对我们原生 js 代码进行了封装，存放到里面。这样我们就可以快速高效的使用这些封装好的功能了。

比如 jQuery，就是为了快速方便的操作 DOM，里面基本都是函数（方法）。再比如 Prototype、Dojo、[Extjs](https://so.csdn.net/so/search?q=Extjs&spm=1001.2101.3001.7020) 、 YUI、移动端的 zepto 等等，这些都是优秀的 JavaScript 库。它们都是对原生 JavaScript 的封装，**内部都是用 JavaScript 实现的**。

### 1.2 jQuery

jQuery 是一个**快速、简洁的 JavaScript 框架**，是继 Prototype 之后又一个优秀的 JavaScript 代码库（ 或 JavaScript 框架 ）。 jQuery 设计的宗旨是 “**write Less，Do More**”，即倡导写更少的代码，做更多的事情。

jQuery = javascript Query（查询）。意思是查询 js，把 js 中的 DOM 操作做了封装，我们可以快速的查询使用里面的功能。

它封装 JavaScript 常用的功能代码，提供一种简便的 JavaScript 设计模式，优化 HTML 文档操作、事件处理、动画设计和 Ajax 交互。

**优势**：

1. 轻量级。体积小，不会影响页面加载速度
2. 强大的选择器
3. 方便的选择页面元素（模仿 css 选择器更精确、更灵活）
4. 出色的 DOM 操作的封装
5. 对事件、样式、动画支持，大大简化了 DOM 操作
6. 跨浏览器兼容。基本兼容了现在主流的浏览器
7. 链式操作、隐式迭代
8. 支持插件扩展开发。有着丰富的第三方插件。
9. 免费、开源

## 2 jQuery 基本使用

[中文文档](https://jquery.cuishifeng.cn/)

### 2.1 jQuery 下载

① 官网地址：[jQuery](https://jquery.com/)

② 版本区别：

- 1x：兼容IE678,使用最为广泛，官网只做BUG维护，功能不再新增。因此一般项目来说，使用1.X版本就可以了。
- 2x：不兼容ie678，很少有人使用，官方只做BUG维护，功能不再新增。如果不考虑兼容低版本的浏览器可以使用2.x。(过渡)
- 3x：不兼容ie678，只支持最新的浏览器。除非特殊要求，一般不会使用3.x版本的，很多老的jQuery插件不支持这个版本。

### 2.2 导入方式

方式一：本地导入

直接在需要使用 jQuery 的页面引入 .js 文件：

```javascript
<script src=" jQuery.js 文件路径"></script>
```

方式二：在线导入

我们可以通过在 script 的 src 属性中写一个网址来导入在线的 jquery 代码。

```javascript
<script src="http://code.jquery.com/jquery-latest.js"></script>
```

### 2.3 jQuery 的入口函数

- Js 入口函数会在 DOM 元素加载完毕并且图片也加载完毕之后再执行
- jQuery 入口函数会等到 DOM 元素加载完毕，但不会等到图片加载完毕再执行

```javascript
$(document).ready(function (){
    alert("hello jquery");
})
jQuery(document).ready(function () {
    alert("hello jquery");
})

// 简化方式，推荐
$(function () {
    alert("hi jquery");
})
jQuery(function () {
    alert("hi jquery");
})
1234567891011121314
```

### 2.4 jQuery 的顶级对象 $

- `$`是 jQuery 的别称，在代码中可以使用 jQuery 代替`$`，但为了方便，通常都使用`$`。
- 冲突——**多库共存**
  
  原因：随着jQuery的流行，采用jQuery和`$`符为命名空间的 js 库越来越多，当然 jQuery 的`$`符也是参照的 Prototype库的，所以当多个库同时以`$`符或者 jQuery 为命名空间时，那么此时，就会产生冲突。
  
  解决方法：

1. 释放使用权

```javascript
jQuery.noConflict();
//1.释放操作在其他函数之前
//2.释放后不能用dollar符
123
```

2. 修改访问符号

```javascript
var suiBian = jQuery.noConflict();
//此时suiBian为新的访问符号
12
```

### 2.5 DOM对象 和 jQuery 对象

DOM 对象：用原生 js 获取过来的对象就是 DOM 对象。

jQuery 对象：用 jQuery 方式获取过来的对象就是 jQuery 对象。本质：通过 $ 把 DOM 元素进行了封装（[伪数组](https://so.csdn.net/so/search?q=%E4%BC%AA%E6%95%B0%E7%BB%84&spm=1001.2101.3001.7020)形式存储）。

**区别**：jQuery 对象只能使用 jQuery 方法，反之亦然。

相互转换：

- DOM --> jQuery

```javascript
$('DOM对象');
```

- jQuery --> DOM（两种方式）

```javascript
$('DOM对象')[index]; // index 是索引号
$('DOM对象').get(index);
12
```

## 3 jQuery 常用 API

### 3.1 jQuery 选择器

#### 3.1.1 jQuery 基础选择器

[jQuery选择器](https://so.csdn.net/so/search?q=jQuery%E9%80%89%E6%8B%A9%E5%99%A8&spm=1001.2101.3001.7020)虽然很多，但是选择器之间可以相互替代，就是说获取一个元素，你会有很多种方法获取到。所以我们平时真正能用到的只是少数的最常用的选择器。

> $(“选择器”) // 选择器格式与 css 选择器格式一摸一样

|名称|用法|描述|
|--|--|--|
|ID选择器|$("#id");|获取指定 ID 的元素|
|类选择器|$(".class");|获取同一类 class 的元素|
|标签选择器|$(“div”);|获取同一类标签的所有元素|
|并集选择器|$(“div,li,p”);|使用逗号分隔，获取多个元素|
|交集选择器|$(“div.show”);|获取 class 为 show 的 div 元素|
|全选选择器|$("\*");|匹配所有元素|

#### 3.1.2 jQuery 层级选择器

|名称|用法|描述|
|--|--|--|
|子代选择器|$(“ul>li”);|使用 > 号，获取儿子层级的元素；注意，并不会获取孙子层级的元素|
|后代选择器|$(“ul li”);|使用空格，代表后代选择器，获取 ul 下的所有 li 元素，包括孙子等|

#### 3.1.3 过滤选择器

|名称|用法|描述|
|--|--|--|
|:eq(index)|$(“li:eq(1)”);|获取到的li元素中，选择索引号为1的元素，索引号index从0开始。|
|:odd|$(“li:odd”);|获取到的li元素中，选择索引号为奇数的元素|
|:even|$(“li:even”);|获取到的li元素中，选择索引号为偶数的元素|

#### 3.1.4 筛选选择器（方法）

> 筛选选择器的功能与过滤选择器有点类似，但是用法不一样，筛选选择器主要是方法。

|名称|用法|描述|
|--|--|--|
|parent()|$(".first").parent();|查找父亲|
|children(selector)|$(“ul”).children(“li”)|相当于$(“ul>li”)，子类选择器|
|find(selector)|$(“ul”).find(“li”);|相当于$(“ul li”)，后代选择器|
|siblings(selector)|$(".first").siblings(“li”);|查找兄弟节点，不包括自己本身。|
|next()|$(".first").next();|查找当前元素之后的下一个兄弟|
|nextAll()|$(".first").nextAll();|查找当前元素之后的所有同辈元素|
|prev()|$(".last").prev();|查找当前元素之前的上一个兄弟|
|prevAll()|$(“last”).prevAll();|查找当前元素之前的所有同辈元素|
|hasClass(class)|$(“div”).hasClass(“show”)|检查当前的元素是否含有某个特定的类，如果有，则返回 true|
|eq(index)|$(“li”).eq(2);|相当于$(“li:eq(2)”)，index 从0开始|

#### 3.1.5 排他思想

```javascript
$(function() {
  $("button").click(function(){
      $(this).css();  // 对自己设置变化
      $(this).siblings("button").css();  // 给其他兄弟去掉变化
  })
})
123456
```

#### 3.1.6 链式编程

```javascript
$(function() {
  $("button").click(function(){
       $(this).css().siblings("button").css();  // 对自己设置变化,给其他兄弟去掉变化
  })
})
12345
```

#### 3.1.7 隐式迭代

遍历 jQuery 对象内部 DOM 元素（伪数组形式存储）的过程就叫**隐式迭代**

**简单理解：给匹配的所有元素进行循环遍历，执行相应的方法，而不是我们再进行循环，简化我们的操作，方便我们的调用。**

```javascript
// 给四个div设置背景颜色为粉色 jquery对象不能使用style
$("div").css("background", "pink");
// 隐式迭代就是把匹配的所有元素内部进行遍历循环，给每一个元素添加css这个方法
$("ul li").css("color", "red");
1234
```

### 3.2 jQuery 样式操作

#### 3.2.1 操作 css 方法

jQuery 可以使用 css 方法来修改简单元素样式；也可以操作类，修改多个样式。

- 参数只写属性名，则是返回属性值

```javascript
$(this).css("color");
```

- 参数是**属性名**，**属性值**，中间由逗号分隔，是一组样式，属性必须加引号，值如果是数字可以不用跟单位和引号

```javascript
$(this).css("color","red");
```

- 参数可以是对象形式，方便设置多组样式。属性名和属性值用冒号隔开，属性可以不用加引号

```javascript
$(this).css({"color":"red","font-size":"20px"});
```

#### 3.2.2 设置样式类方法

作用等同于以前的 classList，可以操作类样式，注意操作类里面的参数不要加点

- 添加类

```javascript
$("div").addClass("current");
```

- 移除类

```javascript
$("div").removeClass("current");
```

- 切换类

```javascript
$("div").toggleClass("current");
```

#### 3.2.3 与原生 js 区别

```javascript
// js 中的 className 会覆盖元素原先里面的类名
var one = document.querySelector(".one");
one.className = "two";  // one : class="two"

// jQuery 里面的类操作只是对指定类进行操作，不影响原先的类名
$(".one").addClass("two");  // one: class="one two"
123456
```

### 3.3 jQuery 效果

#### 3.3.1 显示隐藏效果

① 显示效果

- 语法规范

```javascript
show([speed,[easing],[fn]])
```

- 概述
  - 显示隐藏的匹配元素。
  - 这个就是 ‘show( speed, \[callback\] )’ 无动画的版本。如果选择的元素是可见的，这个方法将不会改变任何东西。无论这个元素是通过hide()方法隐藏的还是在CSS里设置了display:none;，这个方法都将有效。
- 显示参数
  - 参数都可以省略，省略后没有动画，直接显示。
  - `speed`:三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
  - `easing`:(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"。
  - `fn`:在动画完成时执行的函数，每个元素执行一次。

② 隐藏效果

- 语法规范

```javascript
hide([speed,[easing],[fn]])
```

- 概述
  - 隐藏显示的元素。
  - 这个就是 ‘hide( speed, \[callback\] )’ 的无动画版。如果选择的元素是隐藏的，这个方法将不会改变任何东西。
- 显示参数
  - 参数都可以省略，省略后没有动画，直接隐藏。
  - `speed`:三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
  - `easing`:(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"。
  - `fn`:在动画完成时执行的函数，每个元素执行一次。

#### 3.3.2 滑动效果

① 下滑效果

- 语法规范

```javascript
slideDown([speed],[easing],[fn])
```

- 概述
  - 通过高度变化（向下增大）来动态地显示所有匹配的元素，在显示完成后可选地触发一个回调函数。
  - 这个动画效果只调整元素的高度，可以使匹配的元素以“滑动”的方式显示出来。
- 显示参数
  - 参数都可以省略。
  - `speed`:三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
  - `easing`:(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"。
  - `fn`:在动画完成时执行的函数，每个元素执行一次。

② 上滑效果

- 语法规范

```javascript
slideUp([speed,[easing],[fn]])
```

- 概述
  - 通过高度变化（向上减小）来动态地隐藏所有匹配的元素，在隐藏完成后可选地触发一个回调函数。
  - 这个动画效果只调整元素的高度，可以使匹配的元素以“滑动”的方式隐藏起来。
- 显示参数
  - 参数都可以省略。
  - `speed`:三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
  - `easing`:(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"。
  - `fn`:在动画完成时执行的函数，每个元素执行一次。

③ 滑动效果

- 语法规范

```javascript
slideToggle([speed],[easing],[fn])
```

- 概述
  - 通过高度变化来切换所有匹配元素的可见性，并在切换完成后可选地触发一个回调函数。
  - 这个动画效果只调整元素的高度，可以使匹配的元素以“滑动”的方式隐藏或显示。
- 显示参数
  - 参数都可以省略。
  - `speed`:三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
  - `easing`:(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"。
  - `fn`:在动画完成时执行的函数，每个元素执行一次。

#### 3.3.3 事件切换

- 语法规范

```javascript
hover([over,]out)
```

- 概述
  - 一个模仿悬停事件（鼠标移动到一个对象上面及移出这个对象）的方法。这是一个自定义的方法，它为频繁使用的任务提供了一种“保持在其中”的状态。
  - 当鼠标移动到一个匹配的元素上面时，会触发指定的第一个函数。当鼠标移出这个元素时，会触发指定的第二个函数。而且，会伴随着对鼠标是否仍然处在特定元素中的检测（例如，处在div中的图像），如果是，则会继续保持“悬停”状态，而不触发移出事件（修正了使用mouseout事件的一个常见错误）。
- 显示参数
  - `over`:鼠标移到元素上要触发的函数（相当于 mouseenter）。
  - `out`:鼠标移出元素要触发的函数（相当于 mouseenter）。

#### 3.3.4 动画队列及其停止排队方法

① 动画或效果队列

动画或者效果一旦触发就会执行，如果多次触发，就造成多个动画或者效果排队执行。

② 停止排队

- 语法规范

```javascript
stop([clearQueue],[jumpToEnd])
```

- 概述
  - 停止所有在指定元素上正在运行的动画。
  - 如果队列中有等待执行的动画(并且clearQueue没有设为true)，他们将被马上执行。
- 显示参数
  - `queue`:用来停止动画的队列名称。
  - `clearQueue`:如果设置成true，则清空队列。可以立即结束动画。
  - `jumpToEnd`:如果设置成true，则完成队列。可以立即完成动画。

> 注意：stop() 写到动画或者效果的**前面**，相当于停止结束上一次的动画。

#### 3.3.5 淡入淡出效果

① 淡入效果

- 语法规范

```javascript
fadeIn([speed],[easing],[fn])
```

- 概述
  - 通过不透明度的变化来实现所有匹配元素的淡入效果，并在动画完成后可选地触发一个回调函数。
  - 这个动画只调整元素的不透明度，也就是说所有匹配的元素的高度和宽度不会发生变化。
- 显示参数
  - 参数都可以省略
  - `speed`:三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
  - `easing`:(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"。
  - `fn`:在动画完成时执行的函数，每个元素执行一次。

② 淡出效果

- 语法规范

```javascript
fadeOut([speed],[easing],[fn])
```

- 概述
  - 通过不透明度的变化来实现所有匹配元素的淡出效果，并在动画完成后可选地触发一个回调函数。
  - 这个动画只调整元素的不透明度，也就是说所有匹配的元素的高度和宽度不会发生变化。
- 显示参数
  - 参数都可以省略。
  - `speed`:三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
  - `easing`:(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"。
  - `fn`:在动画完成时执行的函数，每个元素执行一次。

③ 淡入淡出切换效果

- 语法规范

```javascript
fadeToggle([speed,[easing],[fn]])
```

- 概述
  - 通过不透明度的变化来开关所有匹配元素的淡入和淡出效果，并在动画完成后可选地触发一个回调函数。
  - 这个动画只调整元素的不透明度，也就是说所有匹配的元素的高度和宽度不会发生变化。
- 显示参数
  - 参数都可以省略。
  - `speed`:三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
  - `easing`:(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"。
  - `fn`:在动画完成时执行的函数，每个元素执行一次。

④ 渐进方式调整到指定的不透明度

- 语法规范

```javascript
fadeTo([[speed],opacity,[easing],[fn]])
```

- 概述
  - 把所有匹配元素的不透明度以渐进方式调整到指定的不透明度，并在动画完成后可选地触发一个回调函数。
  - 这个动画只调整元素的不透明度，也就是说所有匹配的元素的高度和宽度不会发生变化。
- 显示参数
  - `speed`:三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
  - `opacity`:一个0至1之间表示透明度的数字。
  - `easing`:(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"。
  - `fn`:在动画完成时执行的函数，每个元素执行一次。

#### 3.3.6 自定义动画 animate

- 语法规范

```javascript
animate(params,[speed],[easing],[fn])
```

- 概述
  - 用于创建自定义动画的函数。
  - 这个函数的关键在于指定动画形式及结果样式属性对象。这个对象中每个属性都表示一个可以变化的样式属性（如“height”、“top”或“opacity”）。注意：所有指定的属性必须用骆驼形式，比如用marginLeft代替margin-left。
  - 而每个属性的值表示这个样式属性到多少时动画结束。如果是一个数值，样式属性就会从当前的值渐变到指定的值。如果使用的是“hide”、“show”或“toggle”这样的字符串值，则会为该属性调用默认的动画形式。
- 显示参数
  - `params`:一组包含作为动画属性和终值的样式属性和及其值的集合（用对象实现），**必须写**。
  - `speed`:三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
  - `easing`:(Optional) 用来指定切换效果，默认是"swing"，可用参数"linear"。
  - `fn`:在动画完成时执行的函数，每个元素执行一次。

### 3.4 属性操作

#### 3.4.1 设置或获取元素固有属性值 prop()

所谓元素固有属性就是元素本身自带的属性，如`<a>`元素里面的`herf`，`<input>`元素里面的`type`。

① 获取属性语法

```javascript
prop("属性")
```

② 设置属性语法

```javascript
prop("属性","属性值")
```

#### 3.4.2 设置或获取元素自定义属性值 attr()

自定义属性就是用户自己给元素添加的属性。比如给`li`添加`index="1"`。

① 获取属性语法

```javascript
attr("属性")
```

② 设置属性语法

```javascript
attr("属性","属性值")
```

> 该方法也可用于获取 H5 自定义属性。

#### 3.4.3 数据缓存 data()

data()方法可以在指定的元素上存取数据，并不会修改DOM 的元素结构，一旦页面刷新，之前存放的数据都将被移除。

① 附加数据语法

```javascript
data("key","value")  // 向被选元素附加数据
```

② 获取数据语法

```javascript
data("key")  // 从被选元素获取数据
```

> 如果浏览器支持 HTML5，同样可以读取该 DOM 中使用 data-\[key\] = \[value\] 所存储的值。

### 3.5 jQuery 内容文本值

#### 3.5.1 普通元素内容 html()

> 相当于原生 js 中的 innerHTML

```javascript
html()  // 获取元素的内容
html("内容")  // 设置元素的内容
12
```

#### 3.5.2 普通元素文本内容 text()

> 相当于原生 js 中的 innerText

```javascript
text()  // 获取元素的内容
text("内容")  // 设置元素的内容
12
```

#### 3.5.3 表单值 val()

> 相当于原生 js 中的 value

```javascript
val()  // 获取元素的内容
val("内容")  // 设置元素的内容
12
```

### 3.6 jQuery 元素操作

#### 3.6.1 遍历元素

隐式迭代：对同一类元素做相同操作。如果做不同操作，需要使用遍历：

```javascript
$("div").each(function (index, domEle) {xxx;})

// 也可以写成
$.each($("div"),function (index, domEle) {xxx;}))
// 主要用于处理数据
12345
```

> - index 是每个元素的索引号，domEle 是每个 DOM 元素对象，不是 jQuery 对象
> - 想要使用 jQuery 方法，就要给这个 dom 元素转换为 jQuery 对象 $(domEle)

#### 3.6.2 创建元素

① 内部添加

```javascript
$("ul").append(li);//放到最后面，类似原生 appendChild
```

② 外部添加

```javascript
el.before(内容);  // 把内容放到目标元素前面
el.after(内容);  // 把内容放到目标元素后面
12
```

> - 内部添加元素后是父子关系
> - 外部添加元素后是兄弟关系

3.6.3 删除元素

```javascript
el.remove()  // 删除匹配节点（本身）
el.empty()  // 删除匹配节点的子节点
el.html("")  // 相当于 empty()
123
```

### 3.7 jQuery 尺寸、位置操作

#### 3.7.1 jQuery 尺寸

|语法|用法|
|--|--|
|width()/height()|取得匹配元素宽度和高度值，只算width/height|
|innerWidth()/innerHeight()|取得匹配元素宽度和高度值，包括padding|
|outerWidth()/outerHeight()|取得匹配元素宽度和高度值，包括padding和border|
|outerWidth(true)/outerHeight(true)|取得匹配元素宽度和高度值，包括padding、border和margin|

> - 以上参数为空，则获取响应值，返回的是数字型
> - 如果参数未数字，则是修改相应值
> - 参数可以不写单位

#### 3.7.2 jQuery 位置

① offset() 设置或获取元素偏移

- offset() 方法设置或返回被选元素相对于文档的偏移坐标，跟父级没有关系。
- 该方法有2个属性 left 和 top。offset().top 用于获取距离文档顶部的距离，offset().left 用于获取距离文档左侧的距离。
- 可以设置元素的偏移：offset({top:10,left:10})。

② position() 获取元素偏移

- position() 方法用于返回被选元素相对于**带有定位的父级**偏移坐标，如果父级没有定位，则以文档为准。

> 该方法只能获取不能设置偏移

③ scrollTop()/scrollLeft() 设置或获取元素被卷去的头部或左侧

- scollTop() 方法设置或返回被选元素卷去的头部。
- scollLeft() 方法设置或返回被选元素卷去的左侧。

## 4 jQuery 事件

### 4.1 事件注册

单个事件注册

```javascript
element.事件(function);
$("div").click(function(){ 事件处理程序 })  // 其他事件和原生事件基本一致
12
```

### 4.2 事件处理

#### 4.2.1 事件处理 on() 绑定事件

- 语法规范

```javascript
on(events,[selector],[data],fn)
```

- 概述
  - 在选择元素上绑定一个或多个事件的事件处理函数。
  - on() 方法绑定事件处理程序到当前选定的 jQuery 对象中的元素。
- 显示参数
  - `events`:一个或多个用空格分隔的事件类型和可选的命名空间，如"click"或"keydown.myPlugin" 。
  - `selector`:一个选择器字符串用于过滤器的触发事件的选择器元素的后代。如果选择的< null或省略，当它到达选定的元素，事件总是触发。
  - `data`:当一个事件被触发时要传递event.data给事件处理函数。
  - `fn`:该事件被触发时执行的函数。 false 值也可以做一个函数的简写，返回false。
- 优势1

```javascript
// 同一对象不同操作不同回调
$("div").on({
  mouseenter:function() {
    $(this).css("color", "red");
  },
  mouseleave:function() {
    $(this).css("color", "black");
  }
})

// 同一对象不同操作相同回调
$("div").on("mouseenter mouseleave", function(){
  $(this).toggleClass("current");
})
1234567891011121314
```

- 优势2

可以事件委派操作。事件委派的定义是：把原来子元素身上的事件绑定到父元素上，就是把事件委派给父元素。

```javascript
$("ul").on("click", "li", function(){
  alert("clicked li");
});
123
```

- 优势3

动态创建的元素，click() 没有办法绑定事件，on() 可以给动态生成元素绑定事件。

```javascript
$("ul").on("click", "li", function(){
  alert("clicked li");
});
let li = $("<li>click</li>");
$("ul").append(li);
12345
```

#### 4.2.2 事件处理 off() 解绑事件

- 语法规范

```javascript
off(events,[selector],[fn])
```

- 概述
  - 在选择元素上移除一个或多个事件的事件处理函数。
  - off() 方法移除用 on() 绑定的事件处理程序。
- 显示参数
  - `events`:一个或多个空格分隔的事件类型和可选的命名空间，或仅仅是命名空间，比如"click", “keydown.myPlugin”, 或者 “.myPlugin”。
  - `selector`:一个最初传递到 .on() 事件处理程序附加的选择器。
  - `fn`:事件处理程序函数以前附加事件上，或特殊值 false。
- 示例

```javascript
off();  // 解除所有事件
off("click");  // 只解除点击事件
off("click", "li");  // 解除事件委托
123
```

#### 4.2.3 事件处理 one() 绑定一次性事件

- 语法规范

```javascript
one(type,[data],fn)
```

- 概述
  - 为每一个匹配元素的特定事件（像click）绑定一个一次性的事件处理函数。
- 显示参数
  - `type`:添加到元素的一个或多个事件。由空格分隔多个事件。必须是有效的事件。
  - `data`:将要传递给事件处理函数的数据映射。
  - `fn`:每当事件触发时执行的函数。

#### 4.2.4 自动触发事件 trigger()

有些事件希望自动触发，比如轮播图自动播放功能与点击右侧按钮功能一致，可以利用定时器自动触发右侧按钮点击事件，不必鼠标点击触发。

```javascript
el.click();  // 简写形式
el.trigger("type");  // 自动触发形式
el.triggerHandler("type");  // 自动触发形式，不会触发元素的默认行为
123
```

### 4.3 事件对象

事件被触发，就会有事件对象的产生。

```javascript
on(events,[selector],function(even) { })
even.preventDefault()  // 阻止默认行为 或者用 return false
even.stopPropagation()  // 阻止冒泡
123
```
