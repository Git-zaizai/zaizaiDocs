# 一、基础应用篇

## 1.1  为什么需要Webpack

想要理解为什么要使用 webpack，我们先回顾下历史，在打包工具出现之前，我们是如何在 web 中使用 JavaScript 的。在浏览器中运行 JavaScript 有两种方法：
**第一种方式**，引用一些脚本来存放每个功能，比如下面这个文档：

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial- scale=1.0">
<title>千锋大前端教研院-Webpack5学习指南</title>
</head>
<body>
<!-- HTML 代码 -->
<div>我的HTML代码</div>

<!-- 引入外部的 JavaScript 文件 -->
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.mi n.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/loda sh.core.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/twitter- bootstrap/5.0.2/js/bootstrap.min.js"></script>

<!-- 引入我自己的 JavaScript 文件 -->
<script src="./scripts/common.js"></script>
<script src="./scripts/user.js"></script>
<script src="./scripts/authentication.js"></script>
<script src="./scripts/product.js"></script>
<script src="./scripts/inventory.js"></script>
<script src="./scripts/payment.js"></script>
<script src="./scripts/checkout.js"></script>
<script src="./scripts/shipping.js"></script>
</body>
</html>

```

此解决方案很难扩展，因为加载太多脚本会导致网络瓶颈。同时如果你不小心更改了
JavaScript文件的加载顺序，这个项目可能要崩溃。
**第二种方式**，使用一个包含所有项目代码的大型 .js 文件，对上面的文档做改进：

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial- scale=1.0">
<title>千锋大前端教研院-Webpack5学习指南</title>
</head>
<body>
<!-- HTML 代码 -->
<div>我的HTML代码</div>

<!-- 引入我自己的 JavaScript 文件 -->
<script src="./scripts/bundle.33520ba89e.js"></script>
</body>
</html>

```

这种方式解决了方式一的问题，但会导致作用域、文件大小、可读性和可维护性方面的问题。如何解决这些问题，请往下阅读。

### 1.1.1如何解决作用域问题

早先前，我们使用 Grunt 和 Gulp 两个工具来管理我们项目的资源。
这两个工具称为任务执行器，它们将所有项目文件拼接在一起。利用了 立即调用函数 表达式(IIFE) - Immediately invoked function expressions , 解决了大型项目的作用域问题；当脚本文件被封装在 IIFE 内部时，你可以安全地拼接或安全地组合所有文件，而不必担心作用域冲突。 什么是IIFE，参见下面的代码：

当函数变成立即执行的函数表达式时，表达式中的变量不能从外部访问。

```javascript
(function () {
  var name = "Barry";
})();
// 无法从外部访问变量 name
name // 抛出错误："Uncaught ReferenceError: name is not defined"

```

将 IIFE 分配给一个变量，不是存储 IIFE 本身，而是存储 IIFE 执行后返回的结果。  

```javascript
var result = (function () {
  var name = "Barry";
  return name
})();
// IIFE 执行后返回的结果：
result; // "Barry"

```

Grunt， Gulp解决了作用域问题。但是，修改一个文件意味着必须重新构建整个文件。拼接可以做到很容易地跨文件重用脚本，却使构建结果的优化变得更加困难。如何判断代码是否实际被使用？
即使你只用到 lodash 中的某个函数，也必须在构建结果中加入整个库，然后将它们压缩在一起。大规模地实现延迟加载代码块及无用代码的去除，需要开发人员手动地进行大量工作。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial- scale=1.0">
    <script src="https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js"></script>
    <title>千锋大前端教研院-Webpack5学习指南</title>
  </head>
  <body>
    <script>
      // 这里我们只使用了一个join函数，确要引入整个lodash库
      const str = _.join(['前端教研院', 'Webpack5学习指南'], '- ')
      console.log(str)
    </script>
  </body>
</html>

```

### 1.1.2 如何解决代码拆分问题

- 感谢 Node.js，JavaScript **模块**诞生了！Node.js是一个 JavaScript运行时，可以在浏览器环境之外的计算机和服务器中使用。webpack 运行在 Node.js 中。
- 当 Node.js发布时，一个新的时代开始了，它带来了新的挑战。既然不是在浏览器中运行 JavaScript，现在已经没有了可以添加到浏览器中的 html 文件和 script 标签。那么 Node.js 应用程序要如何加载新的代码文件呢？

CommonJS问世并引入了 require 机制，它允许你在当前文件中加载和使用某个模块。导入需要的每个模块，这一开箱即用的功能，帮助我们解决了代码拆分的问题。

- Node.js 已经成为一种语言、一个平台和一种快速开发和创建快速应用程序的方式，接管了整个 JavaScript 世界。  
-但 CommonJS 没有浏览器支持。没有 live binding(实时绑定)。循环引用存在问题。 同步执行的模块解析加载器速度很慢。虽然 CommonJS 是 Node.js 项目的绝佳解决 方案，但浏览器不支持模块，我们似乎又遇到了新问题  

### 1.1.3 如何让浏览器支持模块  

- 在早期，我们应用 Browserify 和 RequireJS 等打包工具编写能够在浏览器中运行 的 CommonJS 模块:  
目前，我们还有一个选择，就是来自 Web 项目的好消息是，模块正在成为 ECMAScript 标准的官方功能。然而，浏览器支持不完整，版本迭代速度也不够快，还是推荐上面两个早期模块实现。早期的任务构建工具基于 Google 的 Closure 编译器，要求我们手动在顶部声明所有的依赖，开发体验不好。

### 1.1.4 Webpack 搞定这一切

- 是否可以有一种方式，不仅可以让我们编写模块，而且还支持任何模块格式（至少在 我们到达 ESM 之前），并且可以同时处理 resource 和 assets ？
- 这就是 webpack 存在的原因。它是一个工具，可以打包你的 JavaScript 应用程序 （支持 ESM 和 CommonJS），可以扩展为支持许多不同的静态资源，例如： images , fonts 和 stylesheets 。
- webpack 关心性能和加载时间；它始终在改进或添加新功能，例如：异步地加载和预先加载代码文件，以便为你的项目和用户提供最佳体验。![image.png](https://cdn.nlark.com/yuque/0/2023/png/35560689/1693470726555-75f4a433-fd0b-4c3b-8801-aab7078a8687.png#averageHue=%2326343c&clientId=u5bd8e7e7-df54-4&from=paste&height=376&id=u52c2fc91&originHeight=376&originWidth=926&originalType=binary&ratio=1&rotation=0&showTitle=false&size=91992&status=done&style=none&taskId=ub9d20691-c0e9-4112-9739-3650bb59708&title=&width=926)
- Webpack
  - Webpack 为处理资源管理和分割代码而生，可以包含任何类型的文件。灵活，插件多。
  - Parcel Parcel 是 0 配置工具， 用户一般无需再做其他配置即可开箱即用。
  - Rollup
  - Rollup 用标准化的格式（es6）来写代码，通过减少死代码尽可能地缩小包体积。 一般只用来打包JS。
- 小结论：
  - 构建一个简单的应用并让它快速运行起来？使用 Parcel。
  - 构建一个类库只需要导入很少第三方库？使用 Rollup。
  - 构建一个复杂的应用，需要集成很多第三方库？需要代码分拆，使用静态资源文件， 还有 CommonJS 依赖？使用 webpack。
- Vite
  - 在刚刚结束的 VueConf2021 中，除了 Vue 3.0 以外，另外一个亮点就是下一代构建工具 Vite 了。  
  - 在尤雨溪分享的【 Vue 3 生态进展和计划】的演讲中，尤大神还特意提到 Vite 将成为 Vue 的现代标配。甚至最近新推出的 Petite Vue 从开发、编译、发布、Demo几 乎全都是使用 Vite 完成。  

![image.png](https://cdn.nlark.com/yuque/0/2023/png/35560689/1693470964699-725880c0-a376-4702-81cd-baad1664122f.png#averageHue=%233e4049&clientId=u5bd8e7e7-df54-4&from=paste&height=298&id=KVGye&originHeight=353&originWidth=713&originalType=binary&ratio=1&rotation=0&showTitle=false&size=136721&status=done&style=none&taskId=u1117afb2-b010-4f01-8838-271aba8a116&title=&width=602)

- Vite 这种基于 ESmodule 的构建方式会日益受到用户青睐，不仅因为 Vite 按需编译，热模块替换等特性，还有其丝滑的开发体验以及和 Vue 3 的完美结合。
  - 按照这种说法，也许有人会问：是不是马上 Webpack 就要被取代了， Vite 的时代 就要到来了呢？ Webpack、Vite 作为前端热门的工程化构建工具，它们都有各自的适用场景，并不 存在“取代”这一说法  

## 1.2 小试 Webpack  

### 1.2.1 开发准备

- 在进入 Webpack 世界之前，我们先来用原生的方法构建一个Web应用。 一个JavaScript文件，编写一段通用的函数 helloWorld

```javascript
function helloWorld() {
  console.log('Hello world')
}
```

- 再创建一个JavaScript文件，调用这个函数：  

```html
helloWorld()
```

- 最后创建一个 html 页面去引用这两个JS文件：  

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initialscale=1.0">
<title>千锋大前端教研院-Webpack5学习指南</title>
</head>
<body>
<!-- 注意这里的js文件的引用顺序要正确 -->
<script src="./src/index.js"></script>
<script src="./src/hello-world.js"></script>
</body>
</html>
```

- 正常同步的 JavaScript 代码是按照在页面上加载的顺序执行的，上面 html 文件先引用 index.js 文件，后引用 hello-world.js 文件，由于两个文件的代码存在先定义后才能调用的顺序关系，所以浏览器运行后会报以下错误：
danger
helloWorld is not defined at index.js:1

- 调整 JS 文件的引用顺序：  

```html
<body>
<!-- 注意这里的js文件的引用顺序要正确 -->
<script src="./src/hello-world.js"></script>
<script src="./src/index.js"></script>
</body>

```

- 在浏览器运行后输出如下：  
hello world
- 如果页面引用的JS文件很少，我们可以手动的来调整顺序，但页面一旦引用大量的JS文件，调整顺序的心智负担和工作量可想而知，如何解决？我们就要有请 Webpack 了。

### 1.2.2 安装 Webpack

先安装 node.js
[webpack GitHub地址 链接](https://github.com/webpack/webpack/releases)

```vb
npm install --save-dev webpack
// 或指定版本
npm install --save-dev webpack@<version>
```

提示： 是否使用 --save-dev 取决于你的应用场景。假设你仅使用 webpack 进行构建 操作，那么建议你在安装时使用 --save-dev 选项，因为可能你不需要在生产环境上使用 webpack。如果需要应用于生产环境，请忽略 --save-dev 选项。
如果你使用 webpack v4+ 版本，并且想要在命令行中调用 webpack ，你还需要安装

```vb
npm install --save-dev webpack-cli
```

对于大多数项目，我们建议本地安装。这可以在引入重大更新(breaking change)版本时，更容易分别升级项目。 通常会通过运行一个或多个 npm scripts 以在本地 node_modules 目录中查找安装的 webpack， 来运行 webpack：  

```json
"scripts": {
 "build": "webpack --config webpack.config.js"
}
```

提示：
想要运行本地安装的 webpack，你可以通过 node_modules/.bin/webpack 来访问它的二进制版本。另外，如果你使用的是 npm v5.2.0 或更高版本，则可以 运行 npx webpack 来执行。  

全局安装
通过以下 npm 安装方式，可以使 webpack 在全局环境下可用：  

```vb
npm install --global webpack
```

提示
不推荐 全局安装 webpack。这会将你项目中的 webpack 锁定到指定版本，并 且在使用不同的 webpack 版本的项目中， 可能会导致构建失败。  
最新体验版本
如果你热衷于使用最新版本的 webpack，你可以使用以下命令安装 beta 版本， 或 者直接从 webpack 的仓库中安装：  

```vb
npm install --save-dev webpack@next
// 或特定的 tag/分支
npm install --save-dev webpack/webpack#<tagnamebranchname>
```

 提示： 安装这些最新体验版本时要小心！它们可能仍然包含 bug，因此不应该用于生产环境。  

我们的安装

根据以上的各种情景，在我们的项目中安装 Webpack：

```vb
# 当前目录: 任意你的目录/webpack5
npm install webpack webpack-cli
```

### 1.2.3 运行 Webpack  

 Webpack安装好了以后，就可以在项目环境里运行了。在运行之前，我们先修改一 下代码：  

```javascript
function helloWorld() {
  console.log('Hello world')
}
// 导出函数模块
export default helloWorld
```

```javascript
// 导入函数模块
import helloworld from './hello-world.js'

helloworld()
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initialscale=1.0">
    <title>Webpack5学习指南</title>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

 进入项目目录，运行 Webpack，结果如下：

```vb
[felix] 03-try-webpack $ npx webpack
  
  asset main.js 50 bytes [emitted] [minimized] (name: main)
  orphan modules 81 bytes [orphan] 1 module
    ./src/index.js + 1 modules 135 bytes [built] [code generated]
  WARNING in configuration
  The 'mode' option has not been set, webpack will fallback to
  'production' for this value.
    Set 'mode' option to 'development' or 'production' to enable
  defaults for each environment.
    You can also set it to 'none' to disable any default behavior.
    Learn more: https://webpack.js.org/configuration/mode/
  webpack 5.54.0 compiled with 1 warning in 197 ms
```

 在这里，我们在没有任何配置的情况下运行 Webpack（通常你会为 Webpack 提供 一个配置文件，现在，自Webpack4 开始，可以使用默认配置来打包文件了）。 这里还有一个警告：“mode” 选项尚未设置。我们将在本课程后面讨论“mode”选 项。 从结果来看，webpack 为我们生成了一个main.js文件，具体见下图:

![](https://cdn.nlark.com/yuque/0/2023/png/35560689/1693474562975-fc5d4117-b4fa-4c05-88c2-d1e636891c9f.png#averageHue=%231f1d21&clientId=u5bd8e7e7-df54-4&from=paste&height=413&id=GPFks&originHeight=413&originWidth=325&originalType=binary&ratio=1&rotation=0&showTitle=false&size=70453&status=done&style=none&taskId=uf0727c7c-536d-4c7f-94c5-19d12012b78&title=&width=325)

```javascript
(()=>{"use strict";console.log("Hello world")})();
```

生成的代码非常简洁。这时你可能不禁会问，这个代码是从哪些文件里生成出来的呢？回到终端，我们再运行一下命令：

```vb
[felix] 03-try-webpack $ npx webpack --stats detailed 
  PublicPath: auto asset main.js 50 bytes {179} [compared for emit] [minimized] 
    (name: main) Entrypoint main 50 bytes = main.js chunk {179} (runtime: main) 
    main.js (main) 180 bytes [entry] [rendered]
> ./src main
orphan modules 103 bytes [orphan] 1 module
./src/index.js + 1 modules [860] 180 bytes {179} [depth 0] [built] [code generated]
[no exports]
[no exports used]
......
```

我们看到，**assetmain.js** 是从入口 **>./srcmain**生成的。那么，我们能自己配置这个入口吗？请看下一节，自定义 Webpack配置。

### 1.2.4 自定义 Webpack配置

实际上， **webpack-cli**给我们提供了丰富的终端命令行指令，可以通过 **webpack --help**来查看：

```vb
npm webpack --help
```

可是命令行不方便也不直观，而且还不利于保存配置的内容。因此，webpack 还给我们提供了通过配置文件，来自定义配置参数的能力。

```js
module.exports = {
 entry: './src/index.js',

 output: {
  filename: 'bundle.js',
  // 输出文件夹必须定义为绝对路径
  path: './dist'
 },

mode: 'none'
}

```

在项目目录下运行 npxwebpack, 可以通过配置文件来帮我们打包文件。

```vb
[felix] 03-try-webpack $ npx webpack
[webpack-cli] Invalid configuration object. Webpack has been initialized using a 
  configuration object that does not match the API schema.
- configuration.output.path: The provided value "./dist" is not an absolute path!
-> The output directory as **absolute path** (required).
```

我们发现，打包并没有成功，因为webpack要求我们打包配置 output.path 的路径必须为绝对路径，通过 path 模块来定义输出路径为**绝对路径**：

```javascript
const path = require('path') module.exports = {
  entry: './src/index.js',


  output: {
    filename: 'bundle.js',
    // 输出文件夹必须定义为绝对路径
    path: path.resolve( __dirname, './dist')
  },


  mode: 'none'
}

```

```vb
// 打包成功！
npx webpack
```

### 1.2.5 重新运行项目

项目文件通过 webpack 打包好了，可是我们在浏览器运行 index.html 提示如下错误：
danger
Cannot use import statement outside a module

这是因为页面引用的JS代码，在浏览器里不能正确解析了，我们得去引用打包好了的 JS才 对。修改 index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial- scale=1.0" />
    <title>千锋大前端教研院-Webpack5学习指南</title>
  </head>
  <body>
    <!-- <script src="./src/index.js"></script> -->
    <!-- 引用打包好的 JS 文件 -->
    <script src="./dist/bundle.js"></script>
  </body>
</html>
```

在浏览器里再次运行 index.html

## 1.3 自动引入资源

### 1.3.1 什么是插件

**插件**是 webpack的 核心 功能。插件可以用于执行一些特定的任务，包括：打包优化，资源管理，注入环境变量等。Webpack 自身也是构建于你在 webpack 配置中用到的 **相同的插件系统**之上！
想要使用一个插件，你只需要 **require()**它，然后把它添加到 **plugins**数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 **new**操作符来创建一个插件实例。Webpack提供很多开箱即用的 [插件](https://webpack.docschina.org/plugins/)。

### 1.3.2   使用 HtmlWebpackPlugin

```vb
npm install --save-dev html-webpack-plugin
```

```javascript
plugins: [
  // 实例化 html-webpack-plugin 插件
  new HtmlWebpackPlugin({
    template: './index.html', // 打包生成的文件的模板
    filename: 'app.html', // 打包生成的文件名称。默认为index.html
    inject: 'body', // 设置所有资源文件注入模板的位置。可以设置的值true|'head'|'body'|false，默认值为 true
  }),
];

```

```vb
npx webpack
```

warning
这次打包应用到了我们的模板文件**index.html** , 并且生成了新的文件 **app.html** , 文件里自动引用的 **bundle.js** 也从 **<header\>** 迁移到了**<body\>** 里。

### 1.3.3  清理dist

```javascript
output: {
  // 打包前清理 dist 文件夹
  clean: true
}
```

## 1.4  搭建开发环境

### 1.4.1 mode选项

在开始前，我们先将 [mode设置为'development'](https://webpack.docschina.org/configuration/mode/#mode-development)

```javascript
module.exports = {
  // 开发模式
  mode: 'development',
}
```

### 1.4.2 使用source-map

当 webpack打包源代码时，可能会很难追踪到 error(错误) 和 warning(警告) 在源代码中的原始位置。例如，如果将三个源文件（a.js，b.js 和 c.js）打包到一个 bundle（bundle.js）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会直接指向到 bundle.js。你可能需要准确地知道错误来自于哪个源文件，所以这种提示这通常不会提供太多帮助。
为了更容易地追踪 error 和 warning，JavaScript提供了 [source maps](http://blog.teamtreehouse.com/introduction-source-maps) 功能，可以将编译后的代码映射回原始源代码。如果一个错误来自于 b.js，source map 就会明确的告诉你。
在本篇中，我们将使用 **inline-source-map** 选项：

```javascript
module.exports = {
  // 在开发模式下追踪代码
  devtool: 'inline-source-map',
}
```

### 1.4.3 **使用**watchmode (**观察模式**)

在每次编译代码时，手动运行 **npx webpack** 会显得很麻烦。
我们可以在 webpack 启动时添加 "watch" 参数。如果其中一个文件被更新，代码将被重新编译，所以你不必再去手动运行整个构建

```vb
npx webpack --watch
```

### 1.4.4 **使用**webpack-dev-server

webpack-dev-server 为你提供了一个基本的 web server，并且具有 live reloading(实时重新加载) 功能。先安装：

```vb
npm install --save-dev webpack-dev-server
```

```javascript
//...
module.exports = {
  //...
  // dev-server
  devServer: {
    static: './dist',
  },
};
```

以上配置告知 webpack-dev-server，将 **dist** 目录下的文件作为 web 服务的根目录。

```javascript
npm webpack serve --open
```

当修改 .js 文件时，我们不用刷新浏览器页面，在控制台上能看到浏览器内容自动更新了

## 1.5 资源模块

[资源模块](https://webpack.docschina.org/guides/asset-modules/) (asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外
loader：

| asset/resource | 发送一个单独的文件并导出 URL。 |
| --- | --- |
| asset/inline | 导出一个资源的 data URI。 |
| asset/source | 导出资源的源代码。 |
| asset | 在导出一个 dataURI和发送一个单独的文件之间自动选择。 |

### 1.5.1 asset/resource

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //...
  // 配置资源文件
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource',
      },
    ],
  },
  //...
};
```

```javascript
import imgsrc from './assets/img-1.png'

const img = document.createElement('img') 
img.src = imgsrc 
document.body.appendChild(img)
```

```javascript
npx webpack
```

发现图片(.png)文件已经打包到了dis目录下：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35560689/1693898077286-d868a0b2-a0f3-4ffd-b1a4-0dc2e7b50b9d.png#averageHue=%231f1d20&clientId=uea610c1f-40fb-4&from=paste&height=149&id=u580a69ad&originHeight=209&originWidth=422&originalType=binary&ratio=1&rotation=0&showTitle=false&size=43578&status=done&style=none&taskId=u7cf5bfea-1b3e-467c-87b4-dcc27be93f2&title=&width=301)
执行启动服务命令：

```javascript
npx webpack serve --open
```

### 1.5.2 自定义输出文件名

默认情况下， **asset/resource** 模块以 **[contenthash][ext][query]** 文件名发送到输出目录。可以通过在 webpack 配置中设置板字符串：[output.assetModuleFilename](https://webpack.docschina.org/configuration/output/#outputassetmodulefilename)

```javascript
//...
module.exports = {
  //...
  output: {
    //...
    assetModuleFilename: 'images/[contenthash][ext][query]',
  },
  //...
};

```

 执行编译：  

```javascript
npx webpack
```

![image.png](https://cdn.nlark.com/yuque/0/2023/png/35560689/1693898077286-d868a0b2-a0f3-4ffd-b1a4-0dc2e7b50b9d.png#averageHue=%231f1d20&clientId=uea610c1f-40fb-4&from=paste&height=149&id=gzeHk&originHeight=209&originWidth=422&originalType=binary&ratio=1&rotation=0&showTitle=false&size=43578&status=done&style=none&taskId=u7cf5bfea-1b3e-467c-87b4-dcc27be93f2&title=&width=301)
 另一种自定义输出文件名的方式是，将某些资源发送到指定目录，修改配置：  

```javascript
//...
module.exports = {
  //...
  output: {
    //...
    // 配置资源文件
    module: {
      rules: [
        {
          test: /\.png/,
          type: 'asset/resource',
          // 优先级高于 assetModuleFilename
          generator: {
            filename: 'images/[contenthash][ext][query]',
          },
        },
      ],
    },
    //...
  },
};

```

 输出结果与 assetModuleFilename 设置一样  
![image.png](https://cdn.nlark.com/yuque/0/2023/png/35560689/1693898791059-94980f09-d647-4368-8f46-d484cc1cd206.png#averageHue=%231f1d20&clientId=uea610c1f-40fb-4&from=paste&height=180&id=ua81f7526&originHeight=247&originWidth=428&originalType=binary&ratio=1&rotation=0&showTitle=false&size=48405&status=done&style=none&taskId=u8e35282c-800a-49dc-85ab-2a6fdaa2a8f&title=&width=312)

### 1.5.2 asset/inline

```javascript
//... module.exports = {
//...
// 配置资源文件
module: {
  rules: [
    //...
    {
      test: /\.svg/,
      type: 'asset/inline',
    },
  ];
}
```
