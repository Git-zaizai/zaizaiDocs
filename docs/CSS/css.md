# CSS三大特性

## 三大特性

层叠性，继承性，优先级

# 页布局

网页布局的三大核心

- 盒子模型
- 浮动
- 定位

# 1、盒子模型

## 1-1	盒子的组成


## 1-2	网页布局过程


## 1-3	盒子模型

盒子就类似生活中常见的盒子，有内部空间，有盒子边框等等。在网页布局中，多了一个外边距

- 内部空间是盒子模型中的 content，用来存放元素，存放网页内容的。
- 盒子边框是盒子模型中的border，就是边框的厚度有多厚。
- 盒子的内边距是盒子模型的 padding，是存放的内容距离border内壁的宽度。
- 盒子的外边距也就是盒子模型中的margin，是当前盒子与其他盒子外壁的距离
- 盒子可以嵌套另外一个盒子，内部盒子的宽度高度可能会超出外部盒子。
- 盒子模型中的盒子就是 `HTML`中的标签

### 1-3-1	盒子模型示意


### 1-3-2	盒子模型解释


## 1-4	border

盒子模型中的border是边框，边框有样式，粗细，颜色。注意：边框的宽度和高度与盒子本身的宽度高度不一样。


- border-width 主要设置边框的宽度
- border-style 主要设置边框的样式，常见的三种 `solid实线` `dashed虚线` `dotted点线`
- border-color 主要设置边框的颜色，默认为黑色

### 1-4-1	简写

三个属性可以分别对四个边框单独设置，每一个边框都可以使用简写的方式


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    div {
      width: 200px;
      height: 200px;
      /* 单独设置 */
      border-width: 5px;
      border-style: solid;
      border-color: pink;
			/* 简写方式 */
      border: 5px solid pink;

      /* 单独边框设置 */
      border-top: 5px dashed pink;
      border-bottom: 5px solid purple;

			/*当有重复的时候，可以使用层叠性 简化代码*/
      border-top: 1px dashed red;
      border-bottom: 2px solid burlywood;
      border-left: 2px solid burlywood;
      border-right: 2px solid burlywood;

			/* 简化代码 */
      border: 2px solid burlywood;
      border-top: 1px dashed red;
    }
  </style>
</head>
<body>
  <div>
  </div>
</body>
</html>
```

### 1-4-2	合并相邻的边框

`border-collpase:collapse` 合并相邻的边框

盒子的边框会影响盒子的实际大小，实际大小：盒子的大小+边框的大小，也就是盒子模型中，设置盒子的大小是存放空间的大小，不包括盒子的边框，也不包括盒子的margin。

## 1-5	padding

内部元素（content）和border的内壁之间的距离，由上下左右四部分构成

注意：在没有指定盒子的大小(`width height`)时，padding不会撑开盒子（继承了父级元素的大小），但是如果制定了盒子的大小，那么 padding是会撑开盒子，所以要进行计算。同时注意书写padding属性时，值的个数的区别。

如果添加了padding，那么此时的盒子大小是原有的盒子加上padding的上下左右。和border类似，此时的解决方案是要求的盒子大小减去padding大小，最后剩下的就是空间大小。


模拟案例：新浪首页导航栏。实际开发中，通常使用padding指定精确的值。

> 实际开发中，如果一个盒子由padding属性，一般加入一个父亲盒子，当前盒子继承了父亲盒子的大小，没有height width属性，那么就不会撑开当前的盒子，如果直接在当前盒子的样式表中制定了height或者width属性，那么padding会撑开当前的盒子。


## 1-6	margin

外部元素和border的外壁之间的距离，由上下左右四部分构成。margin属于盒子的属性，也就是盒子包括 内部空间 padding border margin


开发中常用居中对齐的方法（块级的元素）

- 必须指定了盒子的宽度（集成父元素或者显式指定）
- 盒子左右的外边距都设置为 `auto`

```html
常见的写法

margin-left: auto;
margin-right: auto;

或者
margin: auto;

或者
margin: 0 auto;
```

行内元素，行内块元素

父级元素添加属性： `text-align:center`

## 1-7	注意问题


## 1-8	相邻块元素垂直外边距合并

> 注意：垂直外边距的合并



简单来说上下相邻的块级元素，如果上边元素设置了margin的下边距，下边元素设置了margin的上边距，那么这两个元素的间距不是下边距+上边距，而是这两个margin（下边距 上边距）中取较大的一个作为间隔。

> 解决方案：开发中尽量往一边指定外边距，一般选取 `左 上`


## 1-9	嵌套块元素垂直外边距的塌陷

> 简单来说：父级元素嵌套了子元素，父级元素和子元素父级元素和子元素都有margin属性设置，如父级元素设置了 `margin-top:10px`，子级元素也设置了 `margin-top:20px`，那么父级元素的下降是**20px**而不是 **10px**，同时子元素还是紧贴父元素的左上方没有间隔，这是由于嵌套块元素垂直外边距的塌陷造成的。



### 1-9-1	解决方案

- 为父元素定义上边框 `border:1px solid transparent` 设置透明的边框
- 为父元素定义内边距 `padding` 设置内边距
- 为父元素添加 `overfllow:hidden` 开发中最常用的写法，不会改变盒子的大小 `overflow:hidden`

## 1-10	常见的问题

> 外边距合并是对于兄弟元素来讲，塌陷是对于父子元素来讲。
>  
> 无论是兄弟元素还是父子元素，只要有一个浮动，那么左右外边距合并还是垂直塌陷都不会发生。



行内元素通常只设置左右外边距，设置了上下外边距不起作用，可以转换为行内块元素来设置。

# 2、布局

进行布局时，一定要进行整体的排版，即即使可以使用小盒子完成，此事的小盒子也应该由大盒子包裹来完成布局。一定是要有大盒子后才进行小盒子的布局排版，和以前的table表格布局类似。

## 2-1	练习

如果需要设置图片的大小，设置宽度即可，设置时一般设置是子元素占父级元素的多少`占比`。

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo01</title>
    <style>
      * {
        margin: 0px;
        padding: 0px;
      }

      body {
        background-color: #f0f0f0;
      }

      .part {
        width: 298px;
        height: 375px;
        overflow: hidden;
        /·* 防止塌陷 */
        background-color: #fff;
        text-align: center;
        /* 父级元素设置了 text-align:center 文字和图像都会居中对齐（行内元素） 如果是块级元素margin的左右设置为auto即可*/

        margin: 100px auto;
      }

      .part img {
        width: 80%;
      }

      .part h3 {
        font-weight: 400;
        font-size: 14px;
        margin-top: 10px;
      }

      .part .detail {
        margin-top: 10px;
        font-size: 10px;
        color: rgb(185, 185, 185);
      }

      .part .price {
        margin-top: 25px;
        color: rgb(255, 116, 22);
      }

      .part em {
        margin-left: 6px;
        font-style: normal;
        font-weight: 700;
        color: #b4b4b4;
      }

      .part del {
        margin-left: 6px;
        color: #b4b4b4;
      }
    </style>

  </head>

  <body>
    <div class="part">
      <img src="./watch.jpg" alt="watch">
      <h3>Redmi 手表</h3>
      <p class="detail">35g超轻/1.4"大屏/多功能NFC/7天长续航</p>
      <p class="price">249 <em>|</em> <del>288</del></p>
    </div>
  </body>

</html>
```

> 去除li的修饰
>  

```html
List-style：none
```

```html
<!DOCTYPE html>
<html lang="zh-hans">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>海报小案例</title> 

  <style>
    * {
      margin: 0px;
      padding: 0px;
    }

    .main {
      width: 460px;
      height: 262px;
      overflow: hidden; /*防止嵌套元素的垂直外边距塌陷 还有一个相邻元素的垂直外边距合并*/
      border: 1px solid #D3D6D3;
      margin: 100px auto;
    }
    .main h3 {
      border-bottom: 2px solid #738DB0;
      padding: 15px 25px; /*没有设置宽度，不会左右撑开盒子 但是上下会撑开*/
    }
    .main ul {
      margin-top: 10px;
    }
    .main ul li {
      padding-left: 20px;
      padding-top: 10px;
      list-style: none;
    }
    .main ul li a {
      text-decoration: none;
      color: rgb(197, 181, 181);
    }
    /* a:hover { 不会起效果，因为权重低
      text-decoration: underline;
    } */
    .main ul li a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="main">
    <h3>品优购快报</h3>
    <ul>
      <li><a href="#">【特惠】爆款耳机五折秒！</a></li>
      <li><a href="#">【特惠】母亲节爆款好礼低至五折！</a></li>
      <li><a href="#">【特惠】爆款耳机五折秒！</a></li>
      <li><a href="#">【特惠】9.9元洗一百张照片！</a></li>
      <li><a href="#">【特惠】长虹智能空调立省1000！</a></li>
    </ul>
  </div>
</body>
</html>
```

# 布局（重点）

## 2-2	传统的三种布局方式


PC端的网页布局需要依靠三种布局进行展现。移动端有新的布局方式。

## 2-3	普通流布局

普通流又称为文档流，标准流，简单的说是指按照标签默认的展现方式进行布局


## 2-4	浮动流布局

> 可以将行内元素和块级元素转换为具有**行内块元素性质**的元素。无论是行内元素还是块级元素都可以指定宽度和高度，如果没有指定宽度，那么宽度就是内容所占的宽度，和行内元素一致。简单的说浮动就是行内块元素的性质的使用。盒子的宽度是内容的宽度，但是一行内的元素可以指定宽度和高度。




一些网页布局用标准流是很难实现的，即使实现也很难维护，如常见的块级元素在一行展示，块级（行内）元素左右分别显示等等。

> 重点：**浮动可以改变标签默认的排列方式**


浮动可以改变标签的默认排列方式，说白了就是类似行内块元素的作用，但是不仅仅只是行内块元素的作用。

> **记忆：纵向的块级元素排列使用标准流，横向的块级元素排列找浮动**



一个是往左浮动，一个是往右浮动，规则是遇到边界或者是某一个元素的右边或者左边就停止。如果父级元素的宽度容纳不下子元素，那么子元素会顶格另起一行显示。

### 2-4-1	浮动特性


#### 2-4-1-1	脱离标准流


### 2-4-2	浮动的元素显示

浮动的元素会在没有浮动元素的上方，从视觉效果上说就是浮动的元素浮起来了，首先看到的是浮起来的元素，然后才是普通的元素。


同一视线上，首先看到浮动的元素，后看到普通的元素。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0px;
      padding: 0px;
    }
    main {
      width: 400px;
      height: 80px;
      margin: 100px auto;
    }
    .float {
      float: left;
      width: 200px;
      height: 40px;
      background-color: pink;
    }
    .common {
      width: 400px;
      height: 80px;
      background-color: skyblue;
    }
  </style>
</head>
<body>
  <main>
    <div>
      <div class="float" style="float: none;">普通元素显示</div>
      <div class="common">普通元素显示</div>
      <br>
      <div class="float">浮动的元素</div>
      <div class="common">普通元素</div>
    </div>
  </main>
</body>
</html>
```


无论是左浮动还是右浮动，是按照标准流的顺序来进行浮动的。也就是标准流中的顺序是浮动的顺序，当需要空间不够时，那么会另起一行。

### 2-4-3	记忆

大部分浮动元素的性质就是行内块元素的性质。只是多了一些可以对齐的方式。


### 2-4-4	布局策略


> **使用标准流的父盒子来控制显示总体位置和纵向排列，使用浮动流的子盒子来控制横向排列**


### 2-4-5	练习

完成浮动案例


```html
<!DOCTYPE html>
<html lang="zh">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
      * {
        margin: 0;
        padding: 0;
      }
      body {
        background-color: #f5f5f5;
      }

      .box {
        width: 1200px;
        height: 400px;
        margin: 100px auto;
        overflow: hidden;
        text-align: center;
      }

      li {
        list-style: none;
      }
      .box ul {
        width: 100%;
        margin: 30px auto;
      }

      .box ul li {
        float: left;
        width: 270px;
        height: 340px;
        margin-left: 10px;
        background-color: #FFFFFF;
      }
      .box ul li:hover {
        box-shadow: 0px 10px 10px -4px rgba(0, 0, 0, 0.3);
        transition: 400ms;
      }
      .box ul li h3 {
        font-weight: 400;
      }
      .box ul li .detail {
        color: #B8B8B8;
        font-size: 12px;
      }
      .box ul li .price {
        color: #FF6D0B;
        margin-top: 10px;
      }
    </style>
  </head>

  <body>
    <div class="box">
      <ul>
        <li>
          <img src="./浮动练习2.1.webp" alt="">
          <h3>Xiaomi 12 Pro</h3>
          <span class="detail">全新骁龙8 | AMOLED屏幕</span>
          <div class = "price">4699元起</div>
        </li>
        <li>
          <img src="./浮动练习2.2.webp" alt="">
          <h3>Xiaomi 12 Pro</h3>
          <span class="detail">全新骁龙8 | AMOLED屏幕</span>
          <div class = "price">4699元起</div>
        </li>
        <li>
          <img src="./浮动练习2.3.webp" alt="">
          <h3>Xiaomi 12 Pro</h3>
          <span class="detail">全新骁龙8 | AMOLED屏幕</span>
          <div class = "price">4699元起</div>
        </li>
        <li>
          <img src="./浮动练习2.4.webp" alt="">
          <h3>Xiaomi 12 Pro</h3>
          <span class="detail">全新骁龙8 | AMOLED屏幕</span>
          <div class = "price">4699元起</div>
        </li>
      </ul>
    </div>
  </body>

</html>
```

GIF



## 重点

浮动只会影响标准流与标准流之间的元素，标准流会隔断两边的浮动流，不会合并在一起。

想象两条相邻的河流，被一条河岸隔开，两边的流水不会互相影响。只要有标准流，那么标准流两边的流水就不会相互影响，也就是不会重叠排列。


标准流两边的浮动流不会相互影响。即使标准流因浮动流漂浮后移动上去，两个浮动流之间还是隔着标准流，所以不会相互影响。

> 浮动流浮动的方向是朝着屏幕的外面来浮动，而标准流的移动是朝着屏幕的上方进行移动。




## 2-5	清除浮动

清除浮动是为了解决浮动影响范围过大而设置的，浮动的元素会将原有的标准流的位置空出来，如果父级元素没有设置高度（一般自适应都不会设置），那么浮动元素原有的位置会被其他标准流元素占有，但是在排版时是按照标准流来进行纵向排版，此时因为占有了浮动元素的位置，排版不正确，所以需要用到清除浮动元素的方法。

> 清除浮动：将浮动的元素限制在父级元素的区域，父级元素根据子元素自适应高度。



很多时候，浮动起来的元素会将原有的位置空出来，其他的元素会占有原有的位置，但是有一些时候不希望其他元素占有浮动起来元素的原有位置，此时就需要用到清除浮动。

### 2-5-1	清除浮动元素影响的位置


### 2-5-2	清除浮动元素的方法


### 2-5-3	额外标签法


### 小结


### 2-5-4	overflow: hidden方法



### 2-5-5	:after 单伪元素方法

简单来说伪元素的方法是额外标签法的升级版，利用css自动在最后一个浮动元素后添加了一个空标签，空标签的css使用了 `clear:both` 清除左右的浮动（类似一道墙隔开了影响）。


### 2-5-6	:before 和 :after 双伪元素方法

`:after单伪元素方法` 的再升级版，在第一个子元素之前和最后一个的子元素之后添加空盒子。

# Pink老师部分总结


# 3、圆角矩形

圆角是CSS3中新增加的属性，使用 `border-radius:数值`指定圆角的半径，半径越大，圆角的宽度越明显。

原理：半径为指定的圆和原有的矩形相切，最后生成圆角。


## 3-1练习

圆角练习

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>圆角小案例</title>

  <style>
    * {
      margin: 0px;
      padding: 0px;
    }
    .main {
      width: 400px;
      margin: 100px auto;
      font-size: 12px;
      overflow: hidden;
    }
    .main .square {
      width: 100px;
      height: 100px;
      margin: 10px auto;
      text-align: center;
      line-height: 100px; /*设置行高等于盒子的高度，那么文字会垂直居中*/
      background-color: pink;
    }
    .main .round {
      width: 100px;
      height: 100px;
      margin: 10px auto;
      /* border-radius: 50px; 圆角半径设置为正方形边长的一半 */
      border-radius: 50%; /*可以使用50%*/
      text-align: center;
      line-height: 100px; /*行高设置为盒子高度 表明文字垂直居中*/
      background-color: pink;
    }
    .main .rectangle {
      width: 200px;
      height: 50px;
      margin: 10px auto;
      text-align: center;
      line-height: 50px;
      background-color: pink;
    }
    .main .common {
      width: 200px;
      height: 50px;
      margin: 10px auto;
      border-radius: 15px;
      text-align: center;
      line-height: 50px;
      background-color: pink;
    }
    .main .radius {
      width: 200px;
      height: 50px;
      margin: 10px auto;
      border-radius: 25px;
      text-align: center;
      line-height: 50px;
      background-color: pink;
    }
  </style>
</head>


<body>
  <div class="main">
    <div class="square">正方形</div>
    <div class="round">正方形变为圆形</div>
    <div class="rectangle">矩形</div>
    <div class="common">普通圆角矩形</div>
    <div class="radius">矩形变为圆角矩形</div>
  </div>
</body>
</html>
```

如果需要生成圆，需要借助正方形后设置圆角半径为正方形的一半即可。圆角矩形可以设置为高度的一半，即可生成左右为半圆的矩形。


## 3-2四个角分别设置

常用的 可以写一个值，可以写两个值，可以写四个值


写两个值


# 4、盒子阴影

`box-shadow设置盒子的阴影位置`

注意：水平位置右半轴为正，垂直位置下半轴为正。


盒子阴影可以想象成是一个直角坐标系，原有的盒子在原点。

两个属性是必选的，分别是水平阴影位置，垂直阴影位置。表示水平方向上的阴影位置和垂直方向上的阴影位置。


阴影的blur表示阴影的模糊强度，如果设置为0则表示没有模糊。类似克隆一份用设定的颜色和位置表示。

阴影相对于原盒子的水平位置，垂直位置，模糊距离强度，模糊阴影尺寸，阴影颜色，内\外阴影

阴影颜色一般使用 `rgba()`来表示，a表示透明度。

- `阴影水平位置，阴影垂直位置，阴影模糊距离强度，阴影模糊尺寸，阴影模糊颜色，阴影内外位置`


## 4-1注意事项


值得注意的是盒子的阴影是不占用空间的，简单来说就是视觉效果，不占用浏览器的面板空间。还有一点是外阴影`outset`是默认的，但是不允许写，最后一个阴影选项只有不写和inset两种，不能写outset。

`box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.3);`

**阴影模糊的强度**和**阴影模糊的尺寸**一般都要综合阴影水平和垂直位置来使用。颜色一般都是给定灰色透明等。

## 4-2简单交互效果

```css
.main p:hover {
	box-shadow: 0 10px 10px -4px rgba(0, 0, 0, 0.3);
}
```




# 5、文字阴影

使用 `text-shadow`添加文字阴影。


`text-shadow`有四个属性，其中两个必选，四个可选。水平位置和垂直位置是必选的，模糊的距离和阴影的颜色是可选的。

## 5-1	定位

定位的的主要作用是网页中一些小部件或者固定部件的排版，如左右切换、焦点图、一些需要固定的元素的位置的摆放。

定位由`定位模式`和`边偏移`组成。



### 5-1-1	定位布局的优势



## 5-2	定位模式（参照物的选择）

定位模式也就是如何定位，定位的方法。如静态定位，相对定位，绝对定位，固定定位等。



## 5-3	边偏移（距离的设定）

在定位模式决定后（参照物的选择），边偏移就是决定元素怎么排列。相对于父级元素的上下左右。



### 5-3-1	静态定位（默认）



### 5-3-2	相对定位（重要）

相对于原有的位置进行移动。


**相对定位是不脱标的，也就是占有原有元素的位置。在视觉上是更靠近眼睛。**


### 5-3-3	绝对定位（重要）


决定定位是**参考父元素或者祖先元素**来进行定位的。

- 如果定位布局的元素没有父元素或者祖先元素，那么参考整个文档页面进行定位。
- **如果定位布局的元素的父元素或者祖先元素没有定位布局显示，那么定位布局的元素直至最近带有定位布局的祖先元素进行布局，如果所有的祖先元素都没有定位布局，那么参考整个文档进行布局。**
- 绝对定位是托标的，也就是和浮动类似，不占有原有元素的位置。

### 5-3-4	子绝父相

因为绝对定位是不占有原有元素的空间，所以非常适合来做一些小图标，因为不占有原有的空间。但是由于每一个绝对定位的元素需要有个参考点，参考的为带有任何定位布局的祖先元素，所以用到了相对定位，相对定位占有原有元素的空间，使得排版还是和定位布局模式之前类似。用相对定位排版做父级元素，用绝对定位美化做子级元素。


### 5-3-5	固定定位（重要）

固定定位的显示就是浏览器显示当前页面是固定的，不是文档中的位置不变，而是参考于浏览器当前的可视窗口的位置是不变的。既不是参考与显示器，也不是文档，而是浏览器的可视窗口（浏览器可以调整大小，但是固定定位的位置是不变的）


### 技巧


### 5-3-6	粘性定位（了解）

常用于导航栏的显示。





```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    div {
      height: 100px;
    }
    .show {
      position: sticky;
      top: 10px;
      width: 700px;
      height: 50px;
      background-color: pink;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div></div>
  <div class="show"></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</body>
</html>
```

## 总结



### 1.各种定位模式的优先级

使用z-index调整优先级


## 5-4	如何调整版心和绝对定位元素的距离



常见的算法方法就是先让绝对定位的元素移动到中心，然后让绝对定位的盒子走版心或者走自身盒子宽度的一半，即可达到效果。

## 5-5	定位的拓展

绝对定位和固定定位的元素默认就是行内元素了，不需要显式的转换，行内元素默认显示的宽度、高度是元素的内容的宽度、高度。



定位的元素是不会触发外边距塌陷的问题的。

**浮动元素不会压住文字，但是定位会遮盖文字。**

- 浮动的作用是为了文字的环绕效果。
- 定位的作用是为了方便调整位置，不是为了文字的环绕。



## 总结

1. 标准流垂直排版
2. 浮动流左右排版
3. 定位流层叠排版（视频播放按钮叠加在视频上面）



# 6、图片格式



# 7、CSS书写的顺序



## 7-1	注意事项



# 8、网页元素的显示与隐藏

网页的显示过程中，一些效果为 鼠标经过时显示，鼠标移出时隐藏。



## 8-1	display属性

隐藏元素，去除原有的位置。



## 8-2	visibility属性

隐藏元素，不去除原有的位置。

默认的值时继承 `inherit` 即父元素的



## 8-3	overflow属性

定位的盒子一般不使用 overflow:hidden



常用的时display:none和overflow:hidden，overflow常用于滚动条的使用。

## 注意

绝对定位常和display:none共同使用，做出播放时的效果，因为绝对定位是漂浮的阴影，而鼠标没有移入是是隐藏的，所以在鼠标移入了之后就可以 display:block 显示出元素。

# 9、精灵图

## 9-1	为什么需要精灵图

精灵图是将一些小的图片结合成一个大的图片，目的是为了减少服务器的请求次数，降低服务器的压力。在本地浏览器解析时，直接定位精灵图的一些小图片即可。



## 9-2	精灵图的使用

通过背景图片位置 `background-postition` 来定位图片



### 9-2-1	王者荣耀精灵图的使用



# 10、字体图标

## 10-1	字体图标优势

对于一些简单的图标，可以使用字体图标，字体图标本质上属于字体，随意放大不失真。



优势



## 10-2	使用

在html文件的同级目录存放fonts目录，fonts目录存放 字体图标文件，最后css引入字体图标文件，然后指定字体 font-family即可。

# 11、	三角制作

在CSS中，盒子的四个边框都是等腰三角形连接在一起，无论边框的宽度怎么变化，相邻的边框（等腰三角形）的腰长会自适应变化。

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    body {
      margin: 100px 100px;
    }
    div.square {
      width: 0;
      height: 0;
      margin: 50px 100px;
      border-top: 100px solid skyblue;
      border-right: 100px solid pink;
      border-bottom: 100px solid red;
      border-left: 100px solid purple;
    }
    div.rectangle {
      width: 0;
      height: 0;
      margin: 50px 100px;
      border-top: 10px solid skyblue;
      border-right: 100px solid pink;
      border-bottom: 100px solid red;
      border-left: 100px solid purple;
    }
    div.show {
      width: 0;
      height: 0;
      margin: 0 100px;
      border: 100px solid transparent; /*设置四个边框都是透明的*/
      /* border-top: 10px solid skyblue;
      border-right: 100px solid pink;
      border-bottom: 100px solid red; */
      border-left-color: purple; /*设置左边框的颜色紫色*/
    }
  </style>
</head>
<body>
  <div class="square"></div>
  <div class="rectangle"></div>
  <div class="show"></div>
</body>
</html>
```

可以想象只要有正方形大小，按这种方式显示出来的图形中间始终会被挖去一块，因此而呈现梯形不是三角形，当正方形无限小（w0 h0）时，才能呈现三角形。



### 11-1	三角强化

可以通过调整边框的宽度来实现不同三角形的制作。

```css
div.strong {
  width: 0;
  height: 0;
  margin: 0 0;
  border-top: 100px solid transparent; /*设置透明*/
  border-right: 30px solid pink;
  border-bottom: 0 solid red;
  border-left-color: purple; /*设置左边框的颜色紫色*/
}
```



边框的三角形可以加上定位实现斜线反斜线三角形的效果。



# 12、用户界面

取消默认的蓝色边框 `outline: none;`

## 12-1	鼠标

`cursor: 样式类型`

强制性转换为需要的样式。



## 12-2	输入框

`outline: none;`



## 12-3	文本域

`outline: none; resize: none;`



## 12-4	垂直居中

在图片和文件的对齐中，常用的属性是 `vertical-align: middle`，常见的行内块元素如图片、表单等都可以使用这个属性。默认的对齐方式是基线对齐。

```css
img {
  vertical-align: middle;
}
```

`verticcal-align`是常用在 `img`标签的属性，常用的属性值： middle



注意

行内块元素的对齐方式是基线对齐，此时一些常见的字母 p j 等下部分属于底线的部分，而对于图片来说就会默认留有空白缝隙，此时可以采用两种方式解决。



## 12-5	省略号显示

### 12-5-1	单行文本显示省略号

- 不允许自动换行，强制一行展示 `white-space: nowrap;`
- 超出部分隐藏 `overflow: hidden;`
- 用省略号代理超出的部分 `text-overflow: ellipsis;`



### 12-5-2	多行文本显示省略号



## 12-6	margin负值

一些使用边框的界面上，可能会出现两个盒子的边框互相叠加，形成较大的边框，此时如果只需要显示一条边框，那么可以使用margin的负值



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    div {
      width: 700px;
      margin: 100px auto;
    }
    ul {
      float: left;
      width: 300px;
    }
    ul li {
      float: left;
      width: 50px;
      height: 400px;
      list-style: none;
      /* background-color: pink; */
      border: 2px solid pink;
    }
    ul.left li {
      margin-left: -2px;
    }
  </style>
</head>
<body>
  <div>
    <ul class="none">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
    <ul class="left">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
    </ul>
  </div>
  
</body>
</html>
```



浮动的是为了文字的环绕效果产生的。

## 12-7	居中效果

-  对于 行内元素或者行内块元素，只需要在**父盒子**中添加了  `text-align:center` 即可实现居中对齐。注意一定是在父盒子中书写属性 `text-alidn:center`父盒子父盒子父盒子。或者是本身的标签。 
-  对于块级元素，设置 `margin-left: auto; margin-rignt:auto;` 即可实现在父盒子中居中对齐。 
-  文字的垂直居中，只要行高等于盒子的高度即可实现文字的垂直居中。 
-  背景图片的居中 `background-posttion: center` 同时设置不重复等等。同时背景图片也可以有精灵图的效果，很方便的定位。 
-  图片和文件的居中对齐 在图片img标签中添加属性 `vertical-align:middle`即可文字垂直居中对齐图片。vertical [ˈvɜːtɪk(ə)l] 垂直的。直立的，不同层次的。同时可以去除图片下层空白缝隙的问题。 

# 13、HTML5新增语义化标签



HTML5在不适用插件的情况下，也可原生的支持音视频播放，但是支持的格式有限。

## 13-1	视频 video 标签

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
您的浏览器不支持Video标签。
</video>

或者

<video src="CSS.assets/mov_bbb.mp4" controls="controls"></video>
```



### 13-2	视频标签的常见属性

在Chrome系浏览器中，需要静音才可以进行自动播放，也就是 `muted="muted"`必须要设置。



## 13-2	音频标签





值得注意的是：Chrome系浏览器将音频和视频的自动播放都静止了。

## 13-3	HTML5新增input标签属性

- color、date、datetime、datetime-local、email、month、number、range、search、tel、time、url、week



**注意:**并不是所有的主流浏览器都支持新的input类型，不过您已经可以在所有主流的浏览器中使用它们了。即使不被支持，仍然可以显示为常规的文本域。

## 13-4	HTML新增的表单属性



## 13-5	CSS3新增属性选择器

CSS3中新增加的属性选择器使用 `标签[属性名]` 来确定。如 `input[value]` `input[value="Hoe"]` 等都属于属性选择器



属性选择器非常重要，CSS3中新增的属性选择器在以后会越来越常见。属性选择器的权重是**10**

## 13-6	CSS3中新增的机构伪类选择器

结构伪类选择器是按照文档结构来确定的，如ul标签的第几个li标签等此类选择均属于结构伪类选择器。

```css
选择第一个子元素，无论是否为li
ul :firstchild {
  color: pink;
}

选择第一个li元素
ul li:firstchilld {
  color: pink;
}

ul和li中间有空格是因为这是后代选择器，表示选中ul中所有的li元素
li和:first-child之间没有空格是因为这是交集选择器，表示选中的元素不仅是第一个元素，而且还是一个li元素
```

CSS3中新增加的结构伪类选择器的使用，最主要的便是 `:firstchil` `:lastchild` `nth-child(n)` 第一个 最后一个 第n个



### 13-6-1	nth-child(n)的使用

n可以写成公式，这就是nth-child的妙用。所有的妙处都是 n从0开始计算的子元素的个数的。



偶数的子孩子，奇数的子孩子，前几个，第几个开始到最后，某整数的整数倍的某个元素位置，一定要记住**n是从0开始的**。

## 13-7	of-type 和 child 的使用区别

child的查找顺序是先给所有的子元素排序号，然后查看给定的第n个元素是否与目标元素一致，如果一致生效，如果不一致则不生效；of-type的查找顺序是找到目标元素类型的所有元素，然后再进行排序，检查给定的n是否存在，如果存在则生效，如果不存在则不生效。



### 13-7-1	nth-of-type和nth-child的使用区别



使用场景

child主要选择第几个子元素，而of-type主要选择给定类型的元素的第几个。

## 13-8	伪元素选择器

简化HTML结构，伪元素是实在的元素，但是在文档树中找不到这个元素，只是css创建的元素。



### 13-8-1	注意

双冒号写法，行内元素，必须具有 `content`属性，是在父盒子里面的最前或者最后，权重为1



伪元素选择器更多的运用于一些小图标的使用或者一些小特效的使用，如下拉等箭头，遮罩层等。



# 14、CSS3的盒子模型（重点）

两种盒子模型，第一个是CSS3以前的默认盒子，也就是padding在设置对了方向的宽或者高后会撑开的盒子，第二个是新类型的盒子，也就是给定的就是实际的盒子模型，只要内容和padding和边框宽度不超过给的那个的宽高，那么盒子的宽度就是固定的。



# 15、CSS3其他的特性

## 15-1	filter特性



## 15-2	calc特性



# 16、CSS3的transition 过度



## 16-1	属性

记住写法特定：哪一个元素需要变化，就给谁加transittion属性。以哪种方式来，以哪种方式走。

注意：一般不在伪元素 ：hover中加入transition属性，因为不对成，只有移入的时候才变化，但是只要移出，那么变化就为变速闪动，所以transition的属性给变化的元素添加，无论鼠标是移入还是移出，变化都是按照元素的transition变化的，这也就是**以哪种方式来，以哪种方式走**

如给 div 增加 transitions 属性



## 16-2	演示

```css
div {
  margin: 100px auto;
  width: 300px;
  height: 100px;
  background-color: pink;
  transition: width 0.5s;
}
div:hover {
  width: 400px;
}
```

### 16-2-1	不加transition过度属性



### 16-2-2	加入过度属性



## 16-3	进度条实例

```css
.box {
  margin: 100px auto;
  padding: 1px;
  width: 400px;
  height: 30px;
  border: 1px dotted red;
  border-radius: 15px;
}
.box_in {
  width: 50%;
  height: 30px;
  border-radius: 15px;
  background-color: red;
  transition: all 0.5s;
}
.box_in:hover {
  width: 100%;
}

或者

.box:hover .box_in{
  width: 100%;
}
```

第二种 `.box:hover.box_in` 可以改变后代的属性写法。



# 17、广义的HTML5（了解）



# 17-1	项目练习

## 17-1-1	项目整体流程



## 17-1-2	项目规范，项目初始

### 17-1-2-1	模块化开发

模块化开发，简化代码复杂度，重复使用代码。



### 17-1-2-2	项目目录规范



### 17-1-2-3	SEO的优化


logo优化



#### 1. title设置



#### 2. description网站说明



#### 3. keywords网站关键字设置



### 17-1-2-1	favicon设置

使用比特虫工具制作ico图标

#### 17-1-2-1-1	命名



# 18、CSS3

2D 转换transform的三个要素：移动 旋转 缩放。

## 18-1	2D转换 transform之translate



`transform: translate()`

注意：translate可以加百分比，此时的百分比是相对于自身元素的百分比。如果加的单位是像素，那么此时无论元素走到哪个位置，坐标的起始点都是最初开始的地方。

### 18-1-1	案例

```css
以前如果想要盒子水平居中和垂直居中，需要用到定位，即走父盒子的50%，然后走自身的50%，但是自身的50%需要通过计算得到，并且数据是写死的，不便于使用，此时自身的50%就可以使用translate来实现，因为translate的百分比是相对于元素自身来做的

div {
  position: absolute;
	/*父元素的百分比*/
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  /*移动自身的百一半*/
  margin-top: -100px;
  margin-left: -100px;
}

可以看出，单纯的使用定位和外边距进行居中会很麻烦
div {
  position: absolute;
  /*父元素的百分比*/
  top: 50%;
  left: 50%;
 	width: 200px;
 	height: 200px;
  /*translate的百分比是相对于自身元素 如果修改了元素大小，那么也会自动居中对齐，因为使用的是百分比*/
  transform: translate(50%,50%);
}
```

## 18-2	2D转换transform之旋转rotate

不影响其他的元素，transform的移动 旋转 缩放都不影响其他的元素的位置。





### 18-2-1	案例

之前的案例中，下拉的三角或者是其他的三角形都需要使用字体图标，显得有点麻烦，此时可以通过构造一个盒子，只有相邻的边框，再rotate45deg即可形成各种三角形。

注意：无论如何选择，旋转时的角度一定是相对于原有的最初始开始的状态而言的。

```css
div {
  position: relative;
  width: 300px;
  height: 40px;
  margin:  100px auto;
  border: 1px solid #000;
}

div::after {
  content: ''; /*content属性不能忘记，否则不能出现*/
  position: absolute;
  top: 12px;
  right: 14px;
  width: 10px;
  height: 10px;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  transform: rotate(45deg);
  transition: all 0.3s;
}
div:hover::after {
  transform: rotate(225deg);
}
```



## 18-3	transform转换之rotate旋转的中心点



注意：默认的是50% 50%，也即是中心点来旋转，此时的是设置属性值，而不是一个函数，所以中间用空格隔开，不需要像其他的括号函数一样使用逗号将参数隔开。

### 18-3-1	案例

常见的旋转教程，父盒子中的一个子盒子绕着某一个角进行选择，常见用于logo的交互。



```css
.father {
  width: 200px;
  height: 200px;
  margin: 100px auto;
  overflow: hidden;
  background-color: pink;
}
.son {
  width: 100%;
  height: 100%;
  background-color: skyblue;
  transform-origin: left bottom;
  transform: rotate(90deg);
  transition: all 0.6s;
}
.father:hover .son{
  transform: rotate(0deg);
}
```

常见的玩法



## 18-4	2D转换transform之缩放

最大的优势是：不会影响其他的盒子，并且可以设置缩放的方向。即设置缩放的基准点，基准点的反方向进行缩放。其中参数是放大的倍数。不能加单位。



### 18-4-1	重点



### 18-4-2	案例

缩放因为不影响其他盒子的特性，常用来图片的缩放，提升用户的体验效果。又如分页中的交互效果，当鼠标经过某一个分页数字时显示出缩放的效果。



```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>分页效果</title>
  <style>
    ul {
      width: 400px;
      margin: 100px auto;
    }
    li {
      float: left;
      width: 40px;
      height: 40px;
      margin-right: 10px;
      list-style: none;
      border: 1px solid #000;
      border-radius: 50%;
      text-align: center;
      line-height: 40px;
    }
    li:hover {
      transform: scale(1.3);
      box-shadow: 0 3px 8px #ccc;
    }
  </style>
</head>
<body>
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
  </ul>
</body>
</html>
```

## 18-5	transform总结





## 18-6	CSS3动画







**先使用  **`**@keyframes 动画名称**`**定义动画，定义的动画有开始的0%状态和结束的100%状态，定义完动画后，如果需要使用动画，必须要在元素内声明 动画名称和动画时长**

`animation-name: 动画名称; animation-duration： 持续时长;`

```css
@keyframes move {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(1000px);
  }
}
div {
  width: 300px;
  height: 300px;
  background-color: pink;

  /* 声明动画名称 */
  animation-name: move;
  /* 声明动画持续时长 */
  animation-duration: 2s;

}
```

注意： @keyframes中并不是一定只有0%和100%的，此时的百分比是指总时长的百分比，可以定义 25%，也就是从0-25%的总时长做完变化。

## 18-7	动画常见的属性



简写



### 18-7-1	热点图



### 18-7-2	代码

```html
<!DOCTYPE html>
<html lang="zh-CN">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;

      }

      .map {
        width: 1200px;
        height: 700px;
        /* background-color: pink; */
        margin: 0 auto;
        background: url(china_map.jfif) no-repeat top center;
      }

      .city {
        position: absolute;
        top: 240px;
        right: 610px;
        width: 8px;
        height: 8px;
      }

      .shanghai {
        top: 360px;
        right: 520px;
      }

      .kunming {
        top: 450px;
        right: 760px;
      }

      .dotted {
        /* 保证点在中心位置 */
        position: absolute;
        top: 50%;
        right: 50%;
        width: 8px;
        height: 8px;
        transform: translate(50%, -50%);
        background-color: #A1DAFB;
        border-radius: 50%;
      }

      div[class^="circle"] {
        /* 保证所有的圆圈都是围绕中心缩放的，而此时的缩放不使用scale，因为scale会使阴影增大，导致不美观 */
        position: absolute;
        top: 50%;
        right: 50%;
        width: 12px;
        height: 12px;
        transform: translate(50%, -50%);
        border: 1px solid #A1DAFB;
        box-shadow: 0 0 12px #21B3EC;
        border-radius: 50%;

        /* 声明动画 */
        /* animation: name duration timing-function delay iteration-count direction fill-mode; */
        animation: circle 1s ease infinite;
      }

      div.circle2 {
        animation-delay: 0.4s;
      }

      div.circle3 {
        animation-delay: 0.8;
      }

      @keyframes circle {
        0% {}

        50% {
          opacity: 0.5;
        }

        70% {
          opacity: 0.7;
        }

        100% {
          width: 70px;
          height: 70px;
          opacity: 0;
        }
      }
    </style>
  </head>

  <body>
    <div class="map">
      <div class="city beijing">
        <div class="dotted"></div>
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
      </div>
      <div class="city shanghai">
        <div class="dotted"></div>
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
      </div>
      <div class="city kunming">
        <div class="dotted"></div>
        <div class="circle1"></div>
        <div class="circle2"></div>
        <div class="circle3"></div>
      </div>
    </div>
  </body>

</html>
```

### 18-7-3	案例

小熊动画



一边动，一边移动



走到中间停止



```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>小熊动画</title>
  <style>
    body {
      background-color: #E8E8E8;
    }
    div {
      position: absolute;
      width: 200px;
      height: 100px;
      background: #e8e8e8 url(bear.png) no-repeat;

      /* 声明动画 */
      /* animation: name duration timing-function delay iteration-count direction fill-mode; */
      animation: bear 1s steps(8) infinite, move 2s linear forwards;
    }

    /* 定义关键帧的动画 */
    @keyframes bear {
      0%{
        background-position: 0%;
      }
      100% {
        background-position: -1600px;
      }
    }

    @keyframes move {
      0% {
        left: 0%;
      }
      100%{
        left: 50%;
        transform: translateX(-50%);
      }
    }
  </style>
</head>
<body>
  <div></div>  
</body>
</html>
```

# 19、3D

3D坐标系



主要使用属性



## 19-1	D移动 translate3d

注意：3d和2d一样，都是通过设置 `transform:`的属性值来设置位置的。图中写错了，应该为transform，除了多了translate3d属性和perspective[pəˈspektɪv]（透视）属性其余和2d一致



## 19-2	3D的透视 perspective 属性

perspective属性写在被透物体的父级元素上，而不是透视元素本身。



一定要注意透视（视距：眼睛距离物理的距离）和translateZ的区别，translateZ是基于屏幕中的元素的原有距离的移动，而视距是基于眼睛和物体之间的距离，即透视（视距）越小，物体看起来越大，而translateZ越大，物体看起来就越大。两个属性的参考点不一样。

## 19-3	3D旋转 rotateX、rotateY、rotateZ

分别绕x轴 y轴 z轴旋转，同时也可以设置自定义旋转轴 如 xy的45°线.

一定要住以旋转的角度的正负值，对于任何一条轴线，以正方向指向眼睛，瞬时间为正，逆时针为负。

或者左手准则



更多的写法，包含矢量如x和y合成对角线的矢量方向。



## 19-4	案例



```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    @keyframes rotateX {
      0% {
        transform: rotateX(0deg);
      }
      100% {
        transform: rotateX(360deg);
      }
    }
    @keyframes rotateY {
      0% {
        transform: rotateY(0deg);
      }
      100% {
        transform: rotateY(360deg);
      }
    }
    @keyframes rotateZ {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
    main {
      width: 800px;
      text-align: center;
      margin: 100px auto;
    }
    div {
      float: left;
      width: 200px;
    }
    img {
      width: 100%;

      /* animation: name duration timing-function delay iteration-count direction fill-mode; */
      animation: rotateX 2s infinite;
    }
    .x {
      animation-name: rotateX;
    }
    .y {
      animation-name: rotateY;
    }
    .z {
      animation-name: rotateZ;
    }
  </style>
</head>
<body>
  <main>
    <div><img src="pic.jpg" alt="" class="x"></div>
  <div><img src="pic.jpg" alt="" class="y"></div>
  <div><img src="pic.jpg" alt="" class="z"></div>
  </main>
</body>
</html>
```

## 19-5	transform的 transform-style属性



`transform-style: preserve-3d`很重要，后面的动画透视中，几乎必用。

未开启 `transform-style: preserve-3d`属性时



开启 `transform-style: preserve-3d`属性



3D导航栏



可以看出，旋转的轴有些不对成，此时是因为前面的盒子没有移动。

即设置完成底部以后，前面的盒子还需要往前轴50%，这是因为中心点是不变的，如果想要绕着x轴完整的转动，就必须设置前面的盒子往前走50%。但是这里的50%不正确，translateZ的单位一般都是px，所以设置盒子的一半高度即可。



## 19-6	3D移动和转换结合

沿着单独的轴移动和顺着单独轴旋转



绕着Y轴旋转和沿着Z轴移动就形成了这种效果。

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>透视和旋转</title>
  <style>
    div {
      width: 200px;
      margin: 100px auto;
      
      /* 透视距离 */
      perspective: 500px;
    } 
    img {
      width: 100%;
      transition: all 0.2s;

      transform: translateZ(300px);

      /* 声明动画 */
      animation: rotateY 2s infinite;
    }

    @keyframes rotateY {
      0% {
        transform: translateZ(300px) rotateY(0deg);
      }
      100% {
        transform: translateZ(-300px) rotateY(360deg);
      }
    }
  </style>
</head>
<body>
  <div><img src="pic.jpg" alt=""></div>
</body>
</html>
```

## 19-7	重点

注意：如果先旋转后移动那么此时元素的坐标系也会随着变化，此时的后移动就会随着新的坐标系进行移动，如果设置先移动后旋转，那么此时后旋转还是参考原有的坐标系。这个就是两个的区别，如果先旋转那么会形成新的坐标系，如果后旋转，那么原有的坐标系进行旋转，此时注意，必须是旋转移动同时存在才是，如果只是单独的旋转和移动，都是参考原有的坐标系。这就是两个方式的区别。

# 20、浏览器的私有前缀

## 20-1	私有前缀

浏览器的私有前缀是为了兼容不同的浏览器，或者是统一浏览器的不同历史版本的浏览器



# 21、移动端基础

移动端的浏览器内核一般都是webkit内核，所以针对于移动端浏览器，对于iH5C3支持不再考虑兼容等。



## 21-1	移动端视口

理解各种视口的不同。

视口主要分为三部分：布局视口，视觉视口，理想视口。当前主流的应用是理想视口。













## 21-2	物理像素和物理像素比

> 物理像素是屏幕实际的像素，即每一个发光的点就是物理像素，在PC端的开发中，开发的像素就等于物理像素，也就是像素比是1:1，但是在移动端中，各种手机的设置可能不一样，如iPhone6、7、8的像素比就是1:2，即实际的像素是750px，而开发时的像素就是375px。移动端开发一定要注意像素比。




为什么移动端开发会出现像素比呢？

因为移动端的设备大小是较小的，采用更更多的物理像素来显示一个开发像素，那么会提高屏幕的细腻程度。这也就是视网膜屏奇数。





## 21-3	设置背景图片的大小

- 百分比是相对于父元素来设置的
- cover是一直拉伸，直到宽和高都覆盖



## 21-4	移动端开发



## 21-5	CSS3盒子模型



## 21-6	默认样式



# 22、移动端开发

## 22-1	技术选型



## 22-2	流式布局



### 22-2-1	案例

京东首页



# 23、flex布局



## 23-1	布局原理



## 23-2	属性值



## 21-3	flex布局属性 - flex-direction 设置主轴方向





主轴的方向也就是子元素的排列方向，子元素也称呼为项目。子元素是按照主轴的方向进行排列的。

## 21-4	flex布局属性 justify-content 设置主轴子元素排列方式



这些排列方式都经常使用，一定要记住，弄清楚是按照什么轴来排列后，再使用相应的排列方式。即先确定好按照什么轴排列，然后再确定按照什么方式排列。

属性书写顺序：`display: flex; flex-direction:row/column; justify-content: center;`

按照顺序书写，可以明确自己想要的效果是什么，否则只会弄出一个四不像出来。

五种排列方式

- flex-start  靠左排列
- flex-end 靠右排列
- center 居中排列
- space-around 平均分配
- space-between 优先贴两边，而后中间平均分配

## 21-5	flex布局属性 flex-wrap 设置子元素是否换行显示



在flex布局中，如默认的将所有的子元素都放在主轴上显示，即使当前的父级元素不能够放下所有的子元素，flex布局会将其他的元素的宽度进行压缩，然后在一行上塞进所有的元素。简单来说就是：一定要在父级元素的范围内显示所有的元素，如果不够，则压缩其他的元素。

而 flex-wrap: wrap 属性就可以设置当父级元素一行显示不了那么多元素时，就进行换行显示。

## 21-6	flex布局属性 align-items 设置侧轴的子元素排列方式（单行）

多行状态下无效 即只在 flex-wrap:nowrap时有效



注意一定要弄清楚主轴和侧轴，因为主轴和侧轴的不同直接导致了排列方式所做出的效果是不一样的。项目中主轴和侧轴的排列方式经常混合使用。

注意：align-items属性只对单行的对齐方式有效，即flex-wrap: nowrap的显示方式有效果。

## 21-7	flex布局属性 align-content 设置侧轴的子元素排列方式（多行）

单行状态下无效，只在多行状态下有效 即 felx-wrap: wrap时有效果。



## 重点

注意这个单行和多行，一定要看主轴的排列方式，然后看flex-wrap的属性值，这样的才是判断单行和多行的方法。



## 21-8	align-items和align-content总结



## 21-9	flex布局 子元素属性 flex: 份数

flex布局中，常用的子元素的属性时 `flex:份数`，意思时指定的子元素从剩余的空间中占几份，总的份数只有等到所有子元素的需求都确定好后，才能得到，也就是每个人先提需求，然后平均分成总分数，每个人按照自己的需求占用相应的份数即可。



## 21-10	flex布局子元素属性 align-self：控制自身在侧轴上的移动



简单来说，align-items是控制所有的元素在侧轴上的移动，而align-self是子元素控制自己在侧轴上的移动。

## 21-11	flex布局子元素属性 order：控制自身在主轴上排列的位置



在主轴上，每个元素都是啊按照标准流的顺序来排列的，如果想要控制后面的元素在前面，那么子元素使用order属性即可，默认是0，只需要比前面一个属性值小，即可移动到比属性值大的前面。

## 21-12	案例

携程网首页制作

技巧

渐变色



# 22、rem适配布局

## 22-1	rem定义



## 22-2	媒体查询



媒体查询语法











### 22-2-1	引入资源



## 22-3	Less基础

less只是为了css的维护更加的简单，而不是取代css，最后less文件还是要转换成css文件给html引用。

## 22-4	css的弊端



## 22-5	Less介绍



## 22-6	Less编译



## 22-7	Less嵌套

### 22-7-1	后代选择器



### 22-7-2	伪类，交集、伪元素选择器



## 22-8	Less 计算







## 22-9	rem适配方案







## 22-10	rem适配方案1



现在标准的适配机器（一般以iPhone为准）下算出rem的值，然后即可适配其他的不同尺寸。也就是有一个标准后，然后算出来rem，其他的机器会动态的适配。一般以750px为准，网页设计师给定的设计稿也是750px的大小，那么直接量出px，看设备划分多少等份，750px/份数=html元素大小，然后量出设计稿中的元素处于算出的html元素大小，两者相除就是rem了。

简单的来说，先给定一套标准的参考，如750px，然后网页设计师根据750px设计出750px 的设计稿，前端人员根据标准的设计稿，算出rem，这样等比例缩放就可以适配其他的机器了。



动图理解，设计稿和显示器都是标准的750px，可以完美适配，此时根据设备显示器分为多少等份，确定 1rem 的大小，然后直接量出设计稿中元素的大小，除于1rem大小，就是整个元素的rem大小了。



### 22-10-1	案例

苏宁手机端首页





等等

## 22-11	rem适配方案2



等等

# 23、响应式

## 23-1	响应式简介

### 23-1-1	响应式 开发原理



### 23-1-2	响应式开发布局



响应式开发主要运用的是栅格系统，以bootstrap为准吗，就是标准的响应式开发框架

## 23-2	bootstrap



# 24、移动适配 vw / vh

目标：能够使用**vw单位**实则之网页元素的**尺寸**

- 相对单位
- 相对**视口的尺寸**计算结果
- vw：viewport width 
   - 1vw=**1/100**视口宽度
- vh：viewport height 
   - 1vw=**1/100**视口高度

## 24-1	适配原理

-  目标：实现在**不同宽度**的设备中，网页元素尺寸**等比例缩放**效果 
-  vw单位尺寸
- 确定设计稿对应的vw尺寸（1/100视口宽度） 
-  vw单位的尺寸 = **px单位数值 **/ （1/100视口宽度） 
