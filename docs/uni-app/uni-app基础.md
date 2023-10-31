# 一、环境搭建

安装编辑器HBuilderX  [**下载地址**](https://www.dcloud.io/hbuilderx.html)

安装微信开发者工具  [**下载地址**](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

# 二、uni-app基本结构
| 名称 | 作用 |
| --- | --- |
| pages | 存放项目页面 |
| static | 静态资源包括：字体样式、字体图标、图片、视频 |
| unpackage | 最终打包输出的文件，可以打包成H5页面、ios页面应用、Android页面应用 |
| App.vue | 根组件，所有页面切换都在此文件，是页面入口文件，可以调用应用的生命周期函数 |
| main.js | 项目的入口文件，项目加载时先会加载此文件 |
| manifest.json | 配置应用打包的东西，包括图标配置、启动图、H5配置、微信小程序配置 |
| pages.json | 设置整个项目页面的存放路径，以及窗口的外观 |
| uni.scss | 这里是uni-app内置的常用样式变量，可直接调佣使用 |


# 三、uni-app开发规范

为了实现多端兼容，综合考虑编译速度、运行性能等因素，uni-app约定如下开发规范：

- 页面文件遵循 [**Vue单文件组件（SFC）规范**](https://vue-loader.vuejs.org/zh/spec.html#%E7%AE%80%E4%BB%8B)
- 组件标签靠近小程序规范，详见 [**uni-app 组件规范**](https://uniapp.dcloud.net.cn/component/)
- 接口能力（JS API）靠近微信小程序规范，但需将前缀**wx**替换为**uni**，详见[**uni-app 接口规范**](https://uniapp.dcloud.net.cn/api/)
- 数据绑定及事件处理同Vue.js。规范，同时补充了App及页面的生命周期
- 为兼容多端运行，建议使用flex布局进行开发

# 四、全局配置和页面配置

**通过globalStyle进行全局配置**，[**详细文档**](https://uniapp.dcloud.net.cn/collocation/pages.html#globalstyle)

用于设置应用的状态栏、导航条、标题、窗口背景色等。

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| navigationBarBackgroundColor | HexColor | #F7F7F7 | 导航栏背景颜色（同状态栏背影颜色） |
| navigationBarTextStyle | String | white | 导航栏标题字体颜色及状态栏前景颜色，仅支持black/white |
| navigationBarTitleText | String |  | 导航栏标题文字内容 |
| backgroundColor | HexColor | #ffffff | 窗口的背景颜色 |
| backgroundTextStyle | String | dark | 下拉loading的样式，仅支持dark/light |
| enablePullDownRefresh | Boolean | false | 是否开启下拉刷新，详见[**页面生命周期**](https://uniapp.dcloud.net.cn/tutorial/page.html#componentlifecycle) |
| onReachBottomDistance | Number | 50 | 页面上拉触底事件出发时距页面底部距离，单位只支持px，详见[**页面生命周期**](https://uniapp.dcloud.net.cn/tutorial/page.html#componentlifecycle) |


# 五、配置tabBar

如果应用是一个多tab应用，可以通过tabBar配置项指定tab的表现，以及tab切换时显示的对应页。

**tips**

- 当设置 position 为 top 时，将不会显示icon
- tabBar 中的 list 是一个数组，只能配置最少2个、最多5个tab。tab按数组的顺序排序
- tabbar 的页面展现过一次后就保留在内存中，再次切换 tabbar 页面，只会触发每个页面的onShow，不会再触发onLoad（页面加载）。
| 属性 | 类型 | 必填 | 默认值 | 描述 | 平台差异说明 |
| --- | --- | --- | --- | --- | --- |
| color | HexColor | 是 |  | tab 上的文字默认颜色 |  |
| selectedColor | HexColor | 是 |  | tab 上的文字选中时的颜色 |  |
| backgroundColor | HexColor | 是 |  | tab 的背景颜色 |  |
| borderStyle | String | 否 | black | tabBar 上边框的颜色，仅支持black/white | App2.3.4+ 支持其他颜色值 |
| list | Array | 是 |  | tab 的列表，详见list属性说明，最少2个、最多5个tab |  |
| position | String | 否 | bottom | 可选值 bottom、top | top 值仅微信小程序支持 |


其中 list 接收一个数组，数组中的每个项都是一个对象，其属性值如下：

| 属性 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| pagePath | String | 是 | 页面路径，必须在 pages 中先定义 |
| text | String | 是 | tab 上按钮文字，在5+APP 和 H5 平台为非必填。录入中间客房一个没有文字的+号图标 |
| iconPath | String | 否 | 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 position 为 top 时，此参数无效，不支持网络图片，不支持字体图标 |
| selectedIconPath | String | 否 | 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 position 为 top 时，此参数无效 |


# 六、condition启动模式配置

启动模式配置，仅开发期间生效。用于模拟直达页面的场景，如：小程序转发后，用户点击所打开的页面。

**属性说明：**

| 属性 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| current | Number | 是 | 当前激活的模式，list节点的索引值 |
| list | Array | 是 | 启动模式列表 |


**list说明：**

| 属性 | 类型 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| name | String | 是 | 启动模式名称 |
| path | String | 是 | 启动页路径 |
| query | String | 否 | 启动参数，可在页面的 [**onLoad**](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle)
 函数里获得 |


# 七、组件的基本使用

uni-app提供了丰富的基础组件给开发者，开发者可以像搭积木一样， 组合各种组件拼接成自己的应用

uni-app中的组件，就像 htrml 中的 div 、p 、span 等标签的作用一样，用于搭建页面的基础结构

## 1、text  组件（**text  文本组件的用法** [**官方文档**](https://uniapp.dcloud.net.cn/component/) ）
| 属性 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| selectable | boolean | false | 否 | 文本是否可选 |
| space | String |  | 否 | 显示连续空格，可选参数：ensp 、 emsp 、nbsp |
| decode | boolean | false | 否 | 是否解码 |


- text 组件相当于行内标签、在同一行显示
- 除了文本节点以外的其他节点都无法长按选中

## 2、view  组件（**view  文本组件的用法** [**官方文档**](https://uniapp.dcloud.net.cn/component/) ）

- view 视图容器，类似于 HTML 中的 div
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| hover-class | String | none | 指定按下去的样式类。当 hover-class = "none" 时，没有点击状态效果 |
| hover-stop-propagation | Boolean | false | 指定是否阻止本节点的祖先节点出现点击态 |
| hover-start-time | Number | 50 | 按住多久出现点击态，单位毫秒 |
| hover-stay-time | Number | 400 | 手指松开后点击态保留时间，单位毫秒 |


## 3、button 组件（**button  按钮组件的用法** [**官方文档**](https://uniapp.dcloud.net.cn/component/button.html) ）

**属性说明**

| 属性名 | 类型 | 默认值 | 说明 | 生效时机 | 平台差异说明 |
| --- | --- | --- | --- | --- | --- |
| size | String | default | 按钮的大小 |  |  |
| type | String | default | 按钮的样式类型 |  |  |
| plain | Boolean | false | 按钮是否镂空，背景色透明 |  |  |
| disabled | Boolean | false | 是否禁用 |  |  |
| loading | Boolean | false | 名称前是否带 loading 图标 |  | H5、App(App-nvue 平台，在 ios 上为雪花，Android上为圆圈) |


**size 有效值**

| 值 | 说明 |
| --- | --- |
| default | 默认大小 |
| mini | 小尺寸 |


**type 有效值**

| primary | 微信小程序、360小程序为绿色，App、H5、百度小程序、支付宝小程序、飞书小程序、快应用为蓝色，字节跳动小程序为红色，QQ小程序为浅蓝色。如想在多端统一颜色，请改用default，然后自行写样式 |
| --- | --- |
| default | 白色 |
| warn | 红色 |


## 4、 image 组件（**image 图片组件的用法** [**官方文档**](https://uniapp.dcloud.net.cn/component/image.html) ）

**Tips**

- `<image>` 组件默认宽度 320px、高度 240px；app-nvue平台，暂时默认为屏幕宽度、高度 240px；

**属性说明：**

| 属性名 | 类型 | 默认值 | 说明 | 平台差异说明 |
| --- | --- | --- | --- | --- |
| src | String |  | 图片资源地址 |  |
| mode | String | 'scaleToFill' | 图片裁剪、缩放的模式 |  |


**mode 有效值：**

| 模式 | 值 | 说明 |
| --- | --- | --- |
| 缩放 | scaleToFill | 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素 |
| 缩放 | aspectFit | 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。 |
| 缩放 | aspectFill | 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。 |
| 缩放 | widthFix | 宽度不变，高度自动变化，保持原图宽高比不变 |
| 缩放 | heightFix | 高度不变，宽度自动变化，保持原图宽高比不变 **App 和 H5 平台 HBuilderX 2.9.3+ 支持、微信小程序需要基础库 2.10.3** |


# 八、uni-app中的样式

-  rpx即响应式px，一种根据屏幕宽度自适应的动态单位。以750宽的屏幕为基准，750px恰好为屏幕宽度。屏幕变宽，rpx实际显示效果会等比放大。 
-  使用`@import`语句可以导入外联样式表，`@import`后跟需要导入的外联样式表的相对路径，用 `;` 表示语句结束 
-  支持基本常用的选择器class、id、element等 
-  在uni-app中不能使用*选择器。 
-  page相当于body节点 
-  定义在`App.vue`中的样式为全局样式，作用于每一个页面。在`pages`目录下的`vue`文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖`App.vue`中相同的选择器。 
-  `uni-app`支持使用字体图标，使用方式与普通`web`项目相同，需要注意以下几点： 
> 1、字体文件小于40kb，`uni-app`会自动将其转化为`base64`格式；
>  
> 2、字体文件大于等于40kb，需开发者自己转换，否则使用将不生效：
>  
> 3、字体文件的引用路径推荐使用以~@开头的绝对路径。
>  

```css
@font-face{
   font-family:test1-icon;
   src:url('~@/static/iconfont.ttf');
}
```
 

## 1、字体图标 iconfont

**导入字体步骤：**

1、将`fonts`字体图标放入项目

2、在全局`App.vue`中引入`@import url("./static/fonts/iconfont.css")`

3、更改`iconfont.css`字体图标的所有引用路径更改为`~@/...`

4、使用字体图标：

```html
<view class="inconfont icon-xxx"></view>
```

# 九、uni-app生命周期

## 1、**应用的生命周期**

生命周期概念：一个对象从创建、运行、销毁的整个过程被称为生命周期。

生命周期函数：在生命周期中每个阶段会伴随着每个函数的触发，这些函数被称为生命周期函数

`uni-app`支持如下应用生命周期函数：

| 函数名 | 说明 |
| --- | --- |
| onLaunch | 当`uni-app`
初始化完成时触发（全局只触发一次） |
| onShow | 当`uni-app`
启动，或从后台进入前台显示 |
| onHide | 当`uni-app`
从前台进入后台 |
| onError | 当`uni-app`
报错时触发 |


## 2、**页面的生命周期**

`**uni-app**`**支持如下页面生命周期函数：**

| 函数名 | 说明 | 平台差异 | 最低版本 |
| --- | --- | --- | --- |
| onLoad | 监听页面加载，其参数为上个页面传递的数据（options），参数类型为Object(用于页面传参)，[**参考示例**](https://uniapp.dcloud.net.cn/api/router.html#navigateto) |  |  |
| onShow | 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面 |  |  |
| onReady | 监听页面初次渲染完成。 |  |  |
| onHide | 监听页面隐藏 |  |  |
| onUnload | 监听页面卸载 |  |  |


# 十、下拉刷新

## 1、开启下拉刷新

在uni-app中有两种方式开启下拉刷新

- 需要在`pages.js`里，找到当前页面的pages节点，并在`style`选项中开启`enablePullDownRefresh`
- 通过调用`uni.startPullDownRefresh()`方法来开启下拉刷新

### 通过配置文件开启

```html
<template>
	<view>
		<view v-for="(item,index) in list" :key="index">
			{{item}}
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				list:['前端','JAVA','UI','测试','大数据']
			}
		},
	}
</script>
```

### 通过API开启

[**api文档**](https://uniapp.dcloud.net.cn/api/ui/pulldown.html#startpulldownrefresh)

```javascript
uni.startPullDownRefresh()
```

## 2、监听下拉刷新

通过onPullDownRefresh()可以监听到下拉刷新的动作

```javascript
<script>
	export default{
		data(){
			return{
				list:['前端','JAVA','UI','测试','大数据']
			}
		},
		// 刷新
		onPullDownRefresh() {
			console.log("触发了下拉刷新");
		},
		methods:{
			pullDown(){
				uni.startPullDownRefresh()
			}
		}
	}
</script>
```

## 3、关闭下拉刷新

uni.stopPullDownRefresh()

停止当前页面下拉刷新。

```javascript
<script>
	export default{
		data(){
			return{
				list:['前端','JAVA','UI','测试','大数据']
			}
		},
		// 刷新
		onPullDownRefresh() {
			console.log("触发了下拉刷新");
			setTimeout(()=>{
				this.list = ['UI','大数据','前端','测试','JAVA']
                  // 在这里关闭刷新
				uni.stopPullDownRefresh()
			},2000)
			
		},
		methods:{
			pullDown(){
				uni.startPullDownRefresh()
			}
		}
	}
</script>
```

# 十一、懒加载 onReachBottom

页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。具体见下方注意事项

配置：`onReachBottom`使用注意 可在`pages.js`找到当前页面的pages节点，并在`style`选项中开启[**onReachBottomDistance**](https://uniapp.dcloud.net.cn/collocation/pages.html#globalstyle)，比如设为50，那么滚动页面到距离底部50px时，就会触发`onReachBottom`事件。

**pages.json**

```json
"pages": [ 
    {
        "path": "pages/list/list",
        "style": {
            // 单页面导航栏标题文字内容（会覆盖下方全局设置）
            "navigationBarTitleText": "列表页",
            // 开启触底事件
            "onReachBottomDistance": 100
        }
    },
]
```

## 通过配置文件开启

```javascript
<script>
	export default{
		data(){
			return{
				list:['前端','JAVA','UI','测试','大数据','前端','JAVA','UI','测试','大数据']
			}
		},
		onReachBottom() {
			console.log("页面触底了");
			this.list.push(...['UI','大数据','前端','测试','JAVA'])
		},
	}
</script>
```

# 十二、发起网络请求[**uni.request(Object)**](https://uniapp.dcloud.net.cn/api/request/request.html#request)

**OBJECT 参数说明**

| 参数名 | 类型 | 必填 | 默认值 | 说明 | 平台差异说明 |
| --- | --- | --- | --- | --- | --- |
| url | String | 是 |  | 开发者服务器接口地址 |  |
| success | Function | 否 |  | 收到开发者服务器成功返回的回调函数 |  |


```javascript
<script>
	export default{
		methods:{
			get(){
				uni.request({
					url:"http://localhost:8082/api/getlunbo",
					success(res){
						console.log(res);
					}
				})
			}
		}
	}
</script>
```

# 十三、本地数据存储

## 异步如下：

### 1、（存）uni.setStorage(Object)	[**官方文档**](https://uniapp.dcloud.net.cn/api/storage/storage.html#setstorage)
| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| key | String | 是 | 存储到本地的键 |
| data | Any | 是 | 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象 |
| success | Function | 否 | 接口调用成功的回调函数 |
| fail | Function | 否 | 接口调用失败的回调函数 |
| complete | Function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |


**示例：**

```javascript
<script>
    export default{
        methods:{
			setStorage(){
                uni.setStorage({
                    key:"id",
                    data:80,
                    success() {
                        console.log("存储成功");
                    }
                })
            }
        }
	}
</script>
```

### 2、（取）uni.getStorage(Object)	[**官方文档**](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstorage)
| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| key | String | 是 | 存储到本地的键 |
| success | Function | 是 | 接口调用的回调函数，res = {data: key对应的内容} |
| fail | Function | 否 | 接口调用失败的回调函数 |
| complete | Function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |


**success 返回参数说明**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| data | Any | key 对应的内容 |


**示例：**

```javascript
<script>
    export default{
        methods:{
            getStorage(){
                uni.getStorage({
                    key:"id",
                    success(res) {
                        console.log("获取成功",res.data);
                    }
                })
            }
        }
	}
</script>
```

### 3、（移除）uni.removeStorage(Object)	[**官方文档**](https://uniapp.dcloud.net.cn/api/storage/storage.html#removestorage)

- 从本地缓存中异步移除指定 key。
| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| key | String | 是 | 存储到本地的键 |
| success | Function | 是 | 接口调用的回调函数 |
| fail | Function | 否 | 接口调用失败的回调函数 |
| complete | Function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |


**示例：**

```javascript
<script>
    export default{
		methods:{
            removeId(){
                uni.removeStorage({
                    key:"id",
                    success() {
                        console.log("删除成功");
                    }
                })
            }
        }
	}
</script>
```

## 同步如下：

### 1、（存）uni.setStorageSync(key,data)	[**官方文档**](https://uniapp.dcloud.net.cn/api/storage/storage.html#setstoragesync)

- 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

**参数说明**

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| key | String | 是 | 本地缓存中的指定的 key |
| data | Any | 是 | 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象 |


**示例：**

```javascript
<script>
    export default{
        methods:{
            setStorage(){
                uni.setStorageSync("id",100)
            }
        }
	}
</script>
```

### 2、（取）uni.getStorageSync(key)	[**官方文档**](https://uniapp.dcloud.net.cn/api/storage/storage.html#getstoragesync)

- 从本地缓存中同步获取指定 key 对应的内容。

**参数说明**

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| key | String | 是 | 本地缓存中的指定的 key |


**示例：**

```javascript
<script>
    export default{
        methods:{
            getStorage(){
				const res = uni.getStorageSync("id")
				console.log(res);
            }
        }
	}
</script>
```

### 3、（移除）uni.removeStorageSync(key)	[**官方文档**](https://uniapp.dcloud.net.cn/api/storage/storage.html#removestoragesync)

- 从本地缓存中同步获取指定 key 对应的内容。

**参数说明**

| 参数 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| key | String | 是 | 本地缓存中的指定的 key |


**示例：**

```javascript
<script>
    export default{
        methods:{
            removeId() {
				uni.removeStorageSync("id")
            }
        }
	}
</script>
```

# 十四、图片

## 1、图片上传	uni.chooseImage(Object)	[**官方文档**](https://uniapp.dcloud.net.cn/api/media/image.html#chooseimage)

- 从本地相册选择图片或使用相机拍照

**OBJECT 参数说明**

| 参数名 | 类型 | 必填 | 说明 | 平台差异说明 |
| --- | --- | --- | --- | --- |
| count | Number | 否 | 最多可以选择的图片张数，默认9 | 见下方说明 |
| sizeType | Array | 否 | original 原图，compressed 压缩图，默认二者都有 | App、微信小程序、支付宝小程序、百度小程序 |
| extension | Array | 否 | 根据文件拓展名过滤，每一项都不能是空字符串。默认不过滤。 | H5(HBuilder X2.9.9+) |
| sourceType | Array | 否 | album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项 |  |
| crop | Object | 否 | 图像裁剪参数，设置后 sizeType 失效 | App 3.1.19+ |
| success | Function | 是 | 成功则返回图片的本地文件路径列表 tempFilePaths |  |
| fail | Function | 否 | 接口调用失败的回调函数 | 小程序、App |
| complete | Function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |  |


**success 返回参数说明**

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| tempFilePaths | Array | 图片的本地文件路径列表 |
| tempFiles | Array | 图片的本地文件列表，每一项是一个 File 对象 |


**Tips**

- count 值在 H5 平台的表现，基于浏览器本身的规范。目前测试的结果来看，只能限制单选/多选，并不能限制数量。并且，在实际的手机浏览器很少有能够支持多选的。

```vue
<template>
	<view>
		<button type="primary" @click="chooseImg">上传图</button>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				imgArr:[]
			}
		},
		methods:{
			chooseImg(){
				uni.chooseImage({
                      // 限制上传数量
					count:10,
					success:(res)=> {
						console.log(res);
						//	将路径赋值给imgArr（便于下方展示）
						this.imgArr = res.tempFilePaths
					}
				})
			},
		}
	}
</script>
```

## 2、图片预览 	uni.previewImage(Object)	[**官方文档**](https://uniapp.dcloud.net.cn/api/media/image.html#unipreviewimageobject)

**OBJECT 参数说明**

| 参数名 | 类型 | 必填 | 说明 | 平台差异说明 |
| --- | --- | --- | --- | --- |
| current | String/Number | 详见下方说明 | 详见下方说明 |  |
| urls | Array | 是 | 需要预览的图片链接列表 |  |
| indicator | String | 否 | 图片指示器样式，可取值："default" - 底部圆点指示器； "number" - 顶部数字指示器； "none" - 不显示指示器。（仅在app中生效） | App |
| loop | Boolean | 否 | 是否可循环预览，默认值为 false（仅在app中生效） | App |
| longPressActions | Object | 否 | 长按图片显示操作菜单，如不填默认为**保存相册** | App 1.9.5+ |
| success | Function | 否 | 接口调用成功的回调函数 |  |
| fail | Function | 否 | 接口调用失败的回调函数 |  |
| complete | Function | 否 | 接口调用结束的回调函数（调用成功、失败都会执行） |  |


**current 参数说明**

> 1.9.5+ 支持传图片在 urls 中的索引值


current 为当前显示图片的链接/索引值/地址，不填或填写的值无效则为 urls 的第一张。**App平台在 1.9.5至1.9.8之间，current为必填。不填会报错**

```vue
<template>
	<view>
		<image 
		v-for="(item,index) in imgArr" 
		:key="index" 
		:src="item" 
		mode="aspectFit" 
		@click="priviewImg(item)"
		>{{imgArr}}</image>
	</view>
</template>
		
<script>
	export default{
		data(){
			return{
				// 赋值看上方上传图片示例（上方上传为此赋值）
				imgArr:[]
			}
		},
		methods:{
             // current图片路径
			priviewImg(current){
				uni.previewImage({
					// current：点击后需要显示图片的链接/索引值/地址
					current:current,
                      // 需要预览的图片链接列表
					urls:this.imgArr
				})
			}
		}
	}
</script>
```

# 十五、跨端兼容	[**官方文档**](https://uniapp.dcloud.net.cn/tutorial/platform.html)

## 1、条件编译	[**官方文档**](https://uniapp.dcloud.net.cn/tutorial/platform.html#preprocessor)

**条件编译是用特殊的注释作为标记，在编译时根据这些特殊的注释，将注释里面的代码编译到不同平台。**

**写法：**以 #ifdef 或 #ifndef 加 **%PLATFORM%** 开头，以 #endif 结尾。

- #ifdef：if defined 仅在某平台存在
- #ifndef：if not defined 除了某平台均存在
- **%PLATFORM%**：平台名称

**%PLATFORM%** **可取值如下：**

| 值 | 生效条件 |
| --- | --- |
| VUE3 | HBuilderX 3.2.0+  [**详情**](https://ask.dcloud.net.cn/article/37834) |
| APP-PLUS | App |
| APP-PLUS-NVUE或APP-NVUE | App nvue |
| H5 | H5 |
| MP-WEIXIN | 微信小程序 |
| MP-ALIPAY | 支付宝小程序 |
| MP-BAIDU | 百度小程序 |
| MP-TOUTIAO | 字节跳动小程序 |
| MP-LARK | 飞书小程序 |
| MP-QQ | QQ小程序 |
| MP-KUAISHOU | 快手小程序 |
| MP-JD | 京东小程序 |
| MP-360 | 360小程序 |
| MP | 微信小程序/支付宝小程序/百度小程序/字节跳动小程序/飞书小程序/QQ小程序/360小程序 |
| QUICKAPP-WEBVIEW | 快应用通用(包含联盟、华为) |
| QUICKAPP-WEBVIEW-UNION | 快应用联盟 |
| QUICKAPP-WEBVIEW-HUAWEI | 快应用华为 |


**示例：**

```vue
<template>
	<view>
		<!-- #ifdef H5 -->
		<view >
			我只希望在h5中看见
		</view>
		<!-- #endif  -->
        
		<!-- #ifdef MP-WEIXIN -->
		<view >
			我只希望在微信小程序中看见
		</view>
		<!-- #endif  -->
        
		<!-- #ifdef APP-PLUS -->
		<view >
			我只希望在App中看见
		</view>
		<!-- #endif  -->
	</view>
</template>
```

# 十六、uni中的导航跳转

## 1、生命式跳转	[**navagator**](https://uniapp.dcloud.net.cn/component/navigator.html)

页面跳转。该组件类似HTML中的`<a>`组件，但只能跳转本地页面。目标页面必须在pages.json中注册。

**属性说明**

| 属性名 | 类型 | 默认值 | 说明 | 平台差异说明 |
| --- | --- | --- | --- | --- |
| url | String |  | 应用内的跳转链接，值为相对路径或绝对路径，如："../first/first"，"/pages/first/first"，注意不能加 `.vue`
 后缀 |  |
| open-type | String | navigate | 跳转方式 |  |
| delta | Number |  | 当 open-type 为 'navigateBack' 时有效，表示回退的层数 |  |
| animation-type | String | pop-in/out | 当 open-type 为 navigate、navigateBack 时有效，窗口的显示/关闭动画效果，详见：[**动画窗口**](https://uniapp.dcloud.net.cn/api/router.html#animation) | APP |
| animation-duration | Number | 300 | 当 open-type 为 navigate、navigateBack 时有效，窗口显示/关闭动画的持续时间。 | APP |
| hover-class | String | navigator-hover | 指定点击时的样式类，当hover-class="none"时，没有点击态效果 |  |
| hover-stop-propagation | Boolean | false | 指定是否阻止本节点的祖先节点出现点击态 | 微信小程序 |
| hover-start-time | Number | 50 | 按住后多久出现点击态，单位毫秒 |  |
| hover-stay-time | Number | 600 | 手指松开后点击态保留时间，单位毫秒 |  |
| target | String | self | 在哪个小程序目标上发生跳转，默认当前小程序，值域self/miniProgram | 微信2.0.7+、百度2.5.2+、QQ |


**open-type 有效值**

| 值 | 说明 | 平台差异说明 |
| --- | --- | --- |
| navigate | 对应 uni.navigateTo 的功能 |  |
| redirect | 跳转至存页面后无返回按钮（关闭当前页面再跳转） |  |
| switchTab | 跳转至存在tabBar中的页面 |  |
| reLaunch | 对应 uni.reLaunch 的功能 | 字节跳动小程序与飞书小程序不支持 |
| navigateBack | 对应 uni.navigateBack 的功能 |  |
| exit | 退出小程序，target="miniProgram"时生效 | 微信2.1.0+、百度2.5.2+、QQ1.4.7+ |


**示例：**

```vue
<template>
	<view >
		<navigator url="/pages/detail/detail">跳转至详情页</navigator>
		<navigator url="/pages/index/index" open-type="switchTab">跳转至存在tabBar中的首页</navigator>
		<navigator url="/pages/detail/detail" open-type="redirect">跳转至详情页并卸载（销毁）当前页</navigator>
	</view>
</template>
```

## 2、编程式跳转

**OBJECT参数说明**

| 参数 | 类型 | 必填 | 默认值 | 说明 | 平台差异说明 |
| --- | --- | --- | --- | --- | --- |
| url | String | 是 |  | 需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，path为下一个页面的路径，下一个页面的onLoad函数可得到传递的参数 |  |
| animationType | String | 否 | pop-in | 窗口显示的动画效果，详见：[**动画窗口**](https://uniapp.dcloud.net.cn/api/router#animation) | App |
| animationDuration | Number | 否 | 300 | 窗口动画持续时间，单位为 ms | App |
| events | Object | 否 |  | 页面间通信接口，用于监听被打开页面发送到当前页面的数据。2.8.9+ 开始支持。 |  |
| success | Function | 否 |  | 接口调用成功的回调函数 |  |
| fail | Function | 否 |  | 接口调用失败的回调函数 |  |
| complete | Function | 否 |  | 接口调用结束的回调函数（调用成功、失败都会执 |  |


**object.success 回调函数**

**参数**

**Object res**

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| eventChannel | [**EventChannel**](https://uniapp.dcloud.net.cn/api/router.html#event-channel) | 和被打开页面进行通信 |


### 2-1、uni.navigateTo(Object)	[**官方文档**](https://uniapp.dcloud.net.cn/api/router.html#navigateto)

**保留当前页面，跳转到应用内的某个页面，使用**`**uni.navigateBack**`**可以返回到原页面。**

**示例：**

```vue
<template>
	<view >
		<button @click="goDetail" type="primary">跳转至详情页</button>
	</view>
</template>
<script>
	export default{
		methods:{
			goDetail:()=>{
				uni.navigateTo({
					url:"/pages/detail/detail"
				})
			},
		}
	}
</script>
```

### 2-2、uni.switchTab(Object)	[**官方文档**](https://uniapp.dcloud.net.cn/api/router.html#switchtab)

**跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。**

**示例：**

```vue
<template>
	<view >
		<button @click="goMessage" type="primary">跳转至信息页</button>
	</view>
</template>
<script>
	export default{
		methods:{
			goMessage:()=>{
				uni.switchTab({
					url:"/pages/message/message"
				})
			}
		}
	}
</script>
```

### 2-3、uni.redirectTo(Object)	[**官方文档**](https://uniapp.dcloud.net.cn/api/router.html#redirectto)

**关闭当前页面，跳转到应用内的某个页面。**

**示例：**

```vue
<template>
	<view >
		<button @click="redirectDetail" type="primary">跳转至详情页并关闭当前页面</button>
	</view>
</template>
<script>
	export default{
		methods:{
			redirectDetail:()=>{
				uni.redirectTo({
					url:"/pages/detail/detail"
				})
			}
		}
	}
</script>
```

## 3、生命式导航传参（编程式导航同理在url中添加参数传参）

### 3-1示例（传id）：

```vue
<view >
    <!-- 静态传单个参至detail页面 -->
    <navigator url="/pages/detail/detail?id=80">跳转至详情页</navigator>
    <!-- 静态传多个参至detail页面 -->
    <navigator url="/pages/detail/detail?id=80&name=xxx">跳转至详情页</navigator>
    <!-- 动态传单个参至detail页面 -->
    <navigator :url="'/pages/detail/detail?id='+id">跳转至详情页</navigator>
    <!-- 动态传多个参至detail页面 -->
    <navigator :url="'/pages/detail/detail?id='+id+'&name='+name">跳转至详情页</navigator>
</view>
<script>
	export default{
		data(){
			return{
				id:80
			}
		},
</script>
```

### 3-2示例（接收id）：

**detail.vue**

```vue
<script>
	<script>
	export default{
    	//onLoad页面加载时，options接收上一个页面传过来的参数
		onLoad(options){
			console.log(options);
		}
	}
</script>
```

# 十七、uni-app中创建组件

在uni-app中，可以通过创建一个后缀名为vue的文件，即创建一个组件成功，其他组件可以将该组件通过import的方式引入，在通过components进行注册即可

- 创建login组件，在component中创建login目录，然后创建login组件

```vue
<template>
	<view>
		组件
	</view>
</template>

<script>
</script>

<style>
</style>
```

- 在其他组件中导入文件并注册

```vue
<script>
    import test  from '../components/test.vue'
</script>
```

- 注册组件

```vue
<script>
    components:{
        test:test
    }
</script>
```

# 十八、组件通信

## 1、父组给子组件传值

通过`props`来接收外界传递到组件内部的值

```vue
<template>
	<view>
		<view>这是父组件传递过来的数据{{title}}</view>
	</view>
</template>

<script>
	export default{
		props:['title'],
    }
</script>

<style>
</style>
```

其他组件在使用login组件的时候专递值

```vue
<template>
	<view>
		<test :title = "title"></view>
	</view>
</template>

<script>
    import test  from '../components/test.vue'
	export default{
        data() {
            return {
                title:"Hello"
            }
        },
        components:{
			test:test
		}
    }
</script>

<style>
</style>
```

## 2、子组件给父组件传值

通过`$emit`触发事件进行传递参数

**子组件：**

```vue
<template>
	<view>
		<test :title = "title"></test>
	</view>
</template>

<script>
    import test  from '../components/test.vue'
	export default{
        data(){
			return{
				num:3
			}
		},
       methods:{
			sendNum(){
				console.log("传值");
				this.$emit('myEven',this.num)
			}
		}
    }
</script>

<style>
</style>
```

**父组件：**

```vue
<template>
	<view >
		<test @myEven="geNum"></test>
		<view>这是子组件传递过来的数据：{{num}}</view>
	</view>
</template>

<script>
    import test  from '../components/test.vue'
	export default{
        data(){
			return{
				num:3
			}
		},
        methods: {
                geNum(num){
				this.num = num;
			}
		}
    }
</script>

<style>
</style>
```

## 3、兄弟组件通讯 	[**官方文档**](https://uniapp.dcloud.net.cn/api/window/communication.html#emit)

**传值A组件：**

```vue
<template>
	<view>
		这是a组件：<button @click="addNum" type="primary">修改b组件的数据</button>
	</view>
</template>

<script>
	export default{
		methods:{
			addNum(){
				uni.$emit('updateNum',10)
			}
		}
	}
</script>

<style>
	
</style>
```

**接收值B组件：**

```vue
<template>
	<view>
		这是b组件的数据{{num}}
	</view>
</template>

<script>
	export default{
		data(){
			return{
				num:0
			}
		},
		created() {
			uni.$on('updateNum',(num)=>{
				this.num += num
			})
		}
	}
</script>

<style>
	
</style>
```

# 十九、 rich-text转换数据HTML元素	[**官方文档**](https://uniapp.dcloud.net.cn/component/rich-text.html)

将带有HTML标签的数据解析其中的标签显示在页面上

如数据：`<p>数据……</p>`，可解析其中的标签

**示例：**

```vue
<template>
	<view>
        <rich-text :nodes="detail.content"></rich-text>
	</view>
</template>
<script>
	export default{
		data(){
			return{
                detail:{
                    content:"<p>数据……</p>"
                }
			}
		}
	}
</script>
```
# 二十、微信登录流程
微信小程序的登录流程通常如下：

1. 用户打开小程序，进入到登录界面。
2. 小程序调用wx.login接口，获取用户临时登录凭证code。
3. 小程序将code发送到开发者后台服务器。
4. 开发者后台服务器接收到code后，向微信服务器发送请求，使用AppID和AppSecret换取用户的session_key和openid等信息。可以使用https://api.weixin.qq.com/sns/jscode2session接口进行调用。
5. 微信服务器验证AppID和AppSecret，返回包括session_key和openid在内的用户信息给开发者服务器。
6. 开发者后台服务器根据返回的用户信息生成用户的身份凭证token或进行其他业务逻辑处理。
7. 开发者后台服务器将生成的身份凭证token返回给小程序。
8. 小程序保存用户的身份凭证token，并在以后的请求中携带该凭证进行身份验证。
9. 用户登录成功后，小程序跳转到登录后的页面，展示相应内容。

需要注意的是，在步骤3中，为了保障用户信息的安全，建议使用HTTPS协议将code发送给开发者服务器。而在步骤8中，生成的身份凭证token应采取一定的安全措施，以防止泄露和滥用。
# 二十一、保证多端效果一致性方案
要保证UniApp在多个端上的效果一致性，可以考虑以下几点：

1. 统一UI组件：UniApp提供了一套跨平台的UI组件库，如uni-ui，可以使用这些统一的UI组件来构建页面，从而确保在不同端上显示效果一致。
2. 样式规范：遵循统一的样式规范，使用相对单位（如rem、vw/vh）进行布局和样式定义，以适应不同设备的屏幕大小和分辨率。
3. 条件编译：UniApp支持条件编译，在编写代码时可以针对不同端进行特定逻辑的处理。通过条件编译，可以针对不同端的特性和限制进行相应的适配。
4. 测试与调试：在开发过程中，及时在不同端进行测试和调试，检查页面在各个平台上的显示效果和功能是否一致，并解决可能存在的兼容性问题。
5. 响应式布局：使用弹性盒子布局（flexbox）或者网格布局（grid）等响应式布局技术，使页面能够自动适应不同屏幕尺寸和方向，提供更好的用户体验。
6. 功能判断：在代码中对不支持的功能进行判断，根据不同端的能力差异进行相应的降级处理或替代方案，确保核心功能在各个端上都能正常运行。

综上所述，通过合理的设计和开发，结合条件编译、样式规范、测试与调试等手段，可以较好地保证UniApp在多个端上的效果一致性。
