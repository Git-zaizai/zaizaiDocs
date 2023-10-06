# 一、fs 模块中的读和写文件的方法

fs模块是  Node.js 官方提供的、用来操作文件的模块。它提供了一系列的方法和属性，用来满足用户对文件操作需求。

导入fs模块：

```javascript
const fs = require('fs')
```

例如：

## 1、[fs.readFile()](https://www.nodeapp.cn/fs.html#fs_fs_readfile_path_options_callback)	文件写入

解释：用来读取指定文件中的内容

语法格式：

```javascript
fs.redFile(path[,options],callback)
```

参数解读：

- path：必选参数，字符串，表示文件的路径。
- options：可选参数，表示以什么编码格式来读取文件。
- callback：必选参数，文件读取完毕后，通过回调函数拿到读取的结果

示例：以 utf8 的编码格式，读取指定文件的内容，并打印 err 和 dataStr 的值

```javascript
const fs = require('fs')
// err => 读取失败的结果
// dataStr => 读取成功的结果
fs.redFile('./files/11.txt','utf8'fonction(err,dataStr){
    console.log(err)
    console.log('------')
    console.log(dataStr)
})
```

## 2、[fs.writeFile()](https://www.nodeapp.cn/fs.html#fs_fs_writefile_file_data_options_callback)	文件读取

解释：用来向指定的文件中写入内容

语法格式：

```javascript
fs.write(file，data[,options],callback)
```

参数解读：

- file：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径。
- data：必选参数，表示要写入的内容
- options：可选参数，表示以什么格式写入文件的内容，默认认识 utf8
- callback：必选参数，文件写入完成后的回调函数（无论成功还是失败都会执行）
- options：必选参数，文件读取完毕后，通过回调函数拿到读取的结果

示例：

```javascript
const fs = require('fs');

fs.writeFile('./files/2.txt', 'AAA', function (err) {
    // 写入成功返回null
	console.log(err);
});
```

## 3、练习

将成绩成绩.txt文件中的数据，整理到成绩-ok.txt文件中

```javascript
// 1.导入 fs 模块
const fs = require('fs');

// 2.调用 fs.readFile() 读取文件的内容
fs.readFile('./files/成绩.txt', 'utf-8', (err, dataStr) => {
	// 3.判断是否读取成功
	if (err) {
		return console.log('读取文件失败！' + err.message);
	}

	// 4.1把数据以空格进行分隔
	const arrOld = dataStr.split(' ');
	const arrNew = [];

	// 4.2 循环后replace => 将数组中的等号替换为冒号
	arrOld.forEach((item) => {
		arrNew.push(item.replace('=', '：'));
	});

	// 4.3将新数组的每一项，进行合并，得到一个新的字符串
	const newStr = arrNew.join('\r\n');

	// 5.调用 fs.writeFile() 方法，把处理完毕的数据，写入到新文件中
	fs.writeFile('./files/成绩-ok.txt', newStr, (err) => {
		if (err) {
			return console.log('文件读取失败' + err.message);
		}
		console.log('写入文件成功！');
	});
});
```

# 二、path 路径模块

path 模块是Node.js 官方提供的、用来处理路径的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。

**__dirname 表示当前文件夹所处的目录**

导入

```javascript
// 1.导入 path 模块
const path = require('path');
```

## 1、[path.join()](https://www.nodeapp.cn/path.html#path_path_join_paths)	路径拼接

解释：用来将多个路径片段拼接成一个完整的路径字符串

**语法格式：**

```javascript
path.join([...paths])
```

参数解读：

- ...path多个路径
- 返回值：

示例：

```javascript
const pathStr = path.join('/a','/b/c','../','./d','e')
console.log(pathStr) // 输出 \a\b\d\e

const pathStr2 = path.join(__dirname,'./files/1.txt')
console.log(pathStr2) // 输出 当前文件所处目录\files\1.txt
```

Tips：**今后凡是涉及到路径拼接的操作，都要使用 path.join() 方法进行处理。**不要直接使用 + 进行字符串的拼接。

## 2、[path.basename()](https://www.nodeapp.cn/path.html#path_path_basename_path_ext)	读取文件名

解释：用来从路径字符串中，将文件名解析出来

**语法格式：**

```javascript
path.basename(path[,ext])
```

参数解读：

- path必选参数，表示一个路径的字符串
- ext：可选参数，表示文件扩展名

示例：

```javascript
// 文件的存放路径
const fpath = '/a/b/c/index.html' 

// 有后缀名扩展名
const fullName = path.basename(fpath)
console.log(fullName) // 输出 index.html

// 无后缀名扩展名
const nameWithoutExt = path.basename(fpath,'.html')
console.log(nameWithoutExt) // 输出 index
```

## 3、[path.extname()](https://www.nodeapp.cn/path.html#path_path_extname_path) 获取文件扩展名

解释：用来获取路径中的扩展名部分

**语法格式：**

```javascript
path.extname(path)
```

参数解读：

- path  必选参数，表示一个路径的字符串
- 返回值： 返回得到的扩展名字符串

示例：

```javascript
// 文件的存放路径
const fpath = '/a/b/c/index.html' 

const fext= path.extname(fpath)
console.log(fext) // 输出 .html
```

## 4、时钟案例

**Tips：**

- 需要先创建一个文件夹（clock）
- 重复调用 `fs.writeFile()` 方法写入同一个文件时，新写入的内容会覆盖之前的旧内容

```javascript
// 1.1导入fs模块
const fs = require('fs');

// 1.2导入fs模块

const path = require('path');

// 1.3定义正则分别匹配<style></style> 和 <script></script>标签
/**
 * \s => 匹配空白字符
 * \S => 匹配任意非空白字符
 */
const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

// 2.1调用 fs.readFile() 方法读取文件
fs.readFile(path.join(__dirname, '../素材/index.html'), 'utf-8', (err, dataStr) => {
	// 2.2读取文件失败
	if (err) {
		return console.log('读取HTML文件失败！' + err.message);
	}
	// 2.3 读取文件成功后，调用对应的三个方法，分别解出 css、js、html 文件
	resolveCSS(dataStr);
	resolveJS(dataStr);
	resolveHTML(dataStr);
});

// 3.1 定义处理 css 样式的方法
function resolveCSS(htmlStr) {
	// 3.2使用正则提取需要的内容
	const r1 = regStyle.exec(htmlStr);
	// 3.3 将提取出来的样式字符串，进行字符串的 replace 替换操作
	const newCSS = r1[0].replace('<style>', '').replace('</style>', '');
	// 3.4 调用 fs.writeFile() 方法，将提取的样式，写入到 clock 目录中 index.css 的文件里面
	fs.writeFile(path.join(__dirname, './clock/index.css'), newCSS, (err) => {
		if (err) {
			return console.log('写入index.css文件失败：' + err.message);
		}
		console.log('写入index.css文件成功！');
	});
}

// 4.1 定义处理 script 样式的方法
function resolveJS(htmlStr) {
	// 4.2使用正则提取需要的内容
	const r2 = regScript.exec(htmlStr);
	// 4.3 将提取出来的样式字符串，进行字符串的 replace 替换操作
	const newJS = r2[0].replace('<script>', '').replace('</script>', '');
	// 4.4 调用 fs.writeFile() 方法，将提取的样式，写入到 clock 目录中 index.js 的文件里面
	fs.writeFile(path.join(__dirname, './clock/index.js'), newJS, (err) => {
		if (err) {
			return console.log('写入index.js文件失败：' + err.message);
		}
		console.log('写入index.js文件成功！');
	});
}

// 5 定义处理 html 样式的方法
function resolveHTML(htmlStr) {
	// 5.1 将提取出来的样式字符串，进行字符串的 replace 替换操作
	const newHTML = htmlStr
		.replace(regStyle, '<link rel="stylesheet" href="./index.css" />')
		.replace(regScript, '<script rel="stylesheet" src="./index.js" ></script>');
	// 5.2 调用 fs.writeFile() 方法，将提取的样式，写入到 clock 目录中 index.html 的文件里面
	fs.writeFile(path.join(__dirname, '/clock/index.html'), newHTML, (err) => {
		if (err) {
			return console.log('写入index.html文件失败！' + err.message);
		}
		console.log('写入index.html文件成功！');
	});
}
```

# 三、http	模块

http 模块是`Node.js`官方提供的、用来创建 `web` 服务器的模块。通过`http` 模块提供的 [**http.createServer()**](https://www.nodeapp.cn/http.html#http_http_createserver_requestlistener) 方法，就能方便得吧一台普通的电脑，变成一台`Web`服务器，从而对外提供`Web`资源服务

## 1、步骤

### 1.	导入

```javascript
// 1.导入 http 模块
const http = require('http');
```

### 2.	创建基本的web服务器实例 	[**createServer()**](https://www.nodeapp.cn/http.html#http_http_createserver_requestlistener)

```javascript
const server = http.createServer()
```

### 3.	为服务器实例绑定 request 事件

**可监听客户端发送过来的网络经请求：**

```javascript
// 使用服务器实例的 .on() 方法，服务器绑定一个 request 事件
server.on('request',(req,res)=>{
    // 只要有客户端来请求我们自己的服务器，就会触发 request 事件，从而调用这个事件的处理函数
    console.log("Someon visit our web server")
})
```

### 4.	启动服务器 [**server.listen()**](https://www.nodeapp.cn/http.html#http_server_listen)

**可启动当前的**`**web**`**服务器实例**

```javascript
// 调用server.listen(端口号,cb回调) 方法，即可启动 web 服务器
server.listen(80,() =>{
    console.log("http sever running at http://127.0.0.1")
})
```

## 2、req请求对象

只要服务器接收到了哭护短的请求，就会调用通过  server.on() 为服务器绑定的[**request 事件处理函数。**](https://www.nodeapp.cn/http.html#http_event_request) 如果想在事件处理函数中，访问客户端相关的  数据 或 属性，可以使用如下的方式：

```javascript
server.on('request', (req, res) => {
	console.log('访问了服务器');
	// 客户端要请求的 URL 地址
	const url = req.url;
	// 客户端请求的类型GET/POST
	const method = req.method;
	// 返回客户端的内容
	const str = `您请求的地址是 ${url} , 请求方式 ${method}`;
	// 防止中文乱码 设置相应头 Content-Type 的值为 text/html; charset=utf-8
	res.setHeader('Content-Type', 'text/html; charset=utf-8');
	console.log(str);
	// 向客户端返回数据
	res.end('返回值：' + str);
});
```

## 3、根据不同的 url 响应不同的 html 内容

①	获取请求的 url 地址

②	设置默认的响应内容为 404 Not found

③	判断用户请求的是否为 / 或 /index.html 首页

④	判断用户请求的是否为 /about.html  关于页面

⑤	设置 res.setHeader() 防止中文乱码

⑥	使用 res.end() 把内容响应给用户

**示例：**

```javascript
const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
	let content;
	if (req.url == '/index.html') {
		content = '<h1>首页</h1>';
	} else if (req.url == '/about.html') {
		content = '<h1>关于我们</h1>';
	} else {
		content = `<h1>404 Not found 您请求的地址是${req.url},您请求的方式是${req.method}</h1>`;
	}
	res.setHeader('Content-Type', 'text/html; charset=utf-8');
	res.end(content);
});

server.listen(8080, () => {
	console.log('开启的服务器：http://127.0.0.1:8080');
});
```

# 四、模块化向外共享模块作用域中的成员

## 1、[module](https://www.nodeapp.cn/path.html#path_path_join_paths) 对象

在每一个`.js` 自定义模块中都有一个`module`对象，他们里面 存储了和当前模块有相关的信息 。

## 2、module.exports	对象

在自定义模块中，可以使用`module.exports`对象，将模块内的成员共享出去，供外界使用心外界用 require0方法 导入自定义模块时，得到的就是module.exports所指向的对象。

**Tips：**使用 require0方法 导入模块时，导入的结果， 永远以module.exports指向的对象为准。

```javascript
// 模块内成员
const age = 20;
module.exports.userName = '张三';
module.exports.sayHello = function () {
	console.log('Hello!');
};
// 共享成员
module.exports.age = age;
```

# 五、npm 与 包

**搜索包：**[**ctr + 左键点我**](https://www.npmjs.com/)

**下载包：**`**https://registry.npmjs.org/**`

## 1、练习（时间格式化）

①	使用 `npm` 包管理工具，在项目中安装格式化时间的包 `moment`

②	使用 `require()` 导入格式化时间的包

③	参考 `moment` 的官方 `API` 文档对时间进行格式化

**安装：** `npm i 完整包名称`

**示例：**`npm i moment`

```javascript
const moment = require('moment');
const dt = moment().format('YYYY-MM-DD HH:mm:ss');
console.log(dt);// 结果：2022-07-20 13:33:49
```

# 六、Express

使用 Express，可快速创建 Web 网站 的服务器或 API 接口 的服务器

## 1、步骤

### 1.安装

```javascript
npm i express@4.17.1
```

### 2.Express 的基本使用

```javascript
// 1.导入 express
const express = require('express')
// 2.创建 web 服务器
const app = express()
// 3.启动 web 服务器
app.listen(80,()=>{
    console.log('expess server running at http://127.0.0.1');
})
```

### 3.监听get请求

```javascript
app.get('请求URL',(req,res)=>{

})
```

### 4.监听post请求

```javascript
app.post('请求URL',(req,res)=>{

})
```

### 5.把内容响应给客户端

```javascript
app.get('/user',(req,res)=>{
    // 向客户端发送 JSON 对象
	res.send({
        name:'25',
        age:'20',
        gender:'男',
    })
})

app.post('/user',(req,res)=>{
    // 向客户端发送文本内容
	res.send('请求成功')
})
```

### 6.获取 URL 中携带的查询参数

通过  `req.query` 对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数

```javascript
app.get('/',(req,res)=>{
    // req.query获取客户端发送过来的 查询参数
    console.log(req.query);
    res.send(req.query)
})
```

### 7.获取 URL 中的动态参数

通过 `req.params` 对象，可以访问到 URL 中，通过 `:` 匹配到的动态参数

```javascript
app.get('/user/:id&:name',(req,res)=>{
    // req.params 默认是一个空对象
    console.log(req.params);
    res.send(req.params)
})
```

## 2、Express托管静态资源

### 1.托管单个静态资源目录	express.static()

可创建一个静态资源服务器，例如可通过如下代码就可以将`public`目录下的图片、CSS文件、JS文件对外开放访问

```javascript
app.use(express.static('public'))
```

`http://loclhost:3000/index.html`

`http://loclhost:3000/index.css`

`http://loclhost:3000/index.js`

**Tips：在指定的静态目录中查找文件，并对外提供资源的访问路径。因此，存放金泰问价你的目录不会出现在 URL 中**

### 2.托管多个静态资源目录	express.static()

```javascript
app.use(express.static('./素材/clock'))
app.use(express.static('./files'))
```

### 3.挂载路径前缀

```javascript
app.use('/public',express.static('./素材/clock'))
app.use('/public',express.static('./files'))
```

`http://loclhost:3000/public/index.html`

`http://loclhost:3000/public/index.css`

`http://loclhost:3000/public/index.js`

## 3、Express模块化路由

### 1.步骤

①	创建路由模块对应的`.js` 文件

②	调用 `express.Router()` 函数创建路由对象

③	向路由对象上挂载具体的路由

④	使用 `modoule.express` 向外暴露路由对象

⑤	使用 `app.use()` 函数注册路由模块

**示例：**`创建路由模块 router.js`

```javascript
// 1.导入 express
const express = require('express');
// 2.创建路由对象
const router = express.Router();
// 3.挂载路由
router.get('/user/list', (req, res) => {
  res.send('Get user list.');
});
router.post('/user/add', (req, res) => {
  res.send('Add new list.');
});
// 4.向外暴露路由
module.exports = router;
```

`使用 router`

```javascript
const express = require('express');
const app = express();
// 1.导入路由模块
const router = require('./03.router');
// 2.注册路由模块
app.use(router);
// 3.启动服务器
app.listen(80, () => {
  console.log('http://127.0.0.1');
});
```

### 2.为路由添加前缀（托管静态资源）

```javascript
// 添加 /api 前缀
app.use('/api', router);
```

访问路由： `http://127.0.0.1/api/user/list`

## 4、Express 中间件

### 1.next() 函数的作用,共享req	res

next 函数 是实现 多个中间件连续调用 的关键，他表示吧流转转关系 转交 给下一个 中间件 或 路由

```javascript
const express = require('express');
const app = express();
const moment = require('moment');
const dt = moment().format('YYYY-MM-DD HH:mm:ss');

app.use((req, res, next) => {
  //   获取到请求达到服务器的时间
  const time = moment().format('YYYY-MM-DD HH:mm:ss');
  //   为 req 对象，挂载自定义starTime属性，从而把时间共享给后面的路由
  req.starTime = time;
  next();
});

app.get('/', (req, res) => {
  res.send('Home page.' + req.starTime);
});

app.get('/user', (req, res) => {
  res.send('User page.' + req.starTime);
});

app.listen(80, () => {
  console.log('http://127.0.0.1');
});
```

### 2.全局生效的中间件

**示例：**

```javascript
const express = require('express');
const app = express();

// 可简化以下中间件
//const mw = (req, res, next) => {
//  console.log('最简单的中间件函数');
//  next();
//};

// 将 mw 注册为全局生效的中间件
// app.use(mw);

// 简化如下
app.use((req, res, next) => {
  console.log('最简单的中间件函数');
  next();
});

app.get('/', (req, res) => {
  res.send('Home page.');
});

app.get('/user', (req, res) => {
  res.send('User page.');
});

app.listen(80, () => {
  console.log('http://127.0.0.1');
});
```

### 3.定义多个全局中间件

```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log('第一个中间件');
  next();
});

app.use((req, res, next) => {
  console.log('第二个中间件');
  next();
});

app.get('/user', (req, res) => {
  res.send('User page.');
});

app.listen(80, () => {
  console.log('http://127.0.0.1');
});
```

### 4.局部生效的中间件

```javascript
// 导入 express 模块
const express = require('express');
// 创建 express 的服务器实例
const app = express();

// 1.定义中间件函数
const mw1 = (req, res, next) => {
  console.log('调用了局部生效的中间件');
  next();
};

// 2.创建路由，不使用中间件
app.get('/', (req, res) => {
  // send() 函数向客户端响应内容
  res.send('Home page.');
});

// 添加 mw1 局部中间件
app.get('/user', mw1, (req, res) => {
  // send() 函数向客户端响应内容
  res.send('User page.');
});

// 调用 app.listen() 方法，指定端口号并启动web服务器
app.listen(80, () => {
  console.log('服务器开启在：http://127.0.0.1');
});
```

### 5.定义多个局部中间件

`方法一：`

```javascript
// 添加 mw1 mw2 局部中间件
app.get('/user', mw1, mw2, (req, res) => {
  // send() 函数向客户端响应内容
  res.send('User page.');
});
```

`方法二：`

```javascript
// 添加 mw1 mw2 局部中间件
app.get('/user2', [mw1, mw2], (req, res) => {
  // send() 函数向客户端响应内容
  res.send('User2 page.');
});
```

### 6.错误级别的中间件

**Tips：错误级别的中间件，必须注册在所有路由之后！**

```javascript
// 导入 express 模块
const express = require('express');
// 创建 express 的服务器实例
const app = express();

// 1.定义路由
app.get('/', (req, res) => {
  // 1.1人为的制造错误
  throw new Error('服务器内部发生错误');
  // send() 函数向客户端响应内容
  res.send('Home page.');
});

// 定义错误级别的中间件，捕获整个项目的异常错误，从而防止程序的崩溃
app.use((err, req, res, next) => {
  console.log('发生了错误！' + err.message);
  res.send('Eror：' + err.message);
});

// 调用 app.listen() 方法，指定端口号并启动web服务器
app.listen(80, () => {
  console.log('服务器开启在：http://127.0.0.1');
});
```

### 7.express内置的中间件

#### ①	`express.static()` 托管静态资源

#### ②	`express.json()` 解析 JSON 格式的请求数据

#### ③	`express.urlencoded` 解析URL-encoded 格式的请求体数据

**示例：**`**express.json()**`

```javascript
// 导入 express 模块
const express = require('express');
// 创建 express 的服务器实例
const app = express();

// Tips：除了错误级别的中间件，其他的中间件必须在路由之前配置
app.use(express.json());

app.post('/', (req, res) => {
  // 在服务器，可以使用 req.body 这个属性，来接收客户端发送过来的请求数据
  // 默认情况下，如果不配置解析表单数据的中间件则 req.body 默认等于 undefined
  console.log(req.body);
  // send() 函数向客户端响应内容
  res.send('ok');
});

// 调用 app.listen() 方法，指定端口号并启动web服务器
app.listen(80, () => {
  console.log('服务器开启在：http://127.0.0.1');
});
```

**示例：**`**express.urlencoded()**`

```javascript
// 导入 express 模块
const express = require('express');
// 创建 express 的服务器实例
const app = express();

// Tips：除了错误级别的中间件，其他的中间件必须在路由之前配置
app.use(express.urlencoded({ extended: false }));

app.post('/book', (req, res) => {
  // 在服务器端可以使用 req.body 这个属性来获取 JOSN 格式的表单数据和 urlencoded 格式的数据
  console.log(req.body);
  res.send('ok');
});

// 调用 app.listen() 方法，指定端口号并启动web服务器
app.listen(80, () => {
  console.log('服务器开启在：http://127.0.0.1');
});
```

### 8.第三方中间件	body-parser

**body-parser 用来解析请求体数据。使用步骤如下**

#### ①	运行 `npm i body-parser` 安装中间件

#### ②	使用 `require` 导入中间件

#### ③	调用 `app.use()` 注册并使用中间件

**示例：**

```javascript
// 导入 express 模块
const express = require('express');
// 创建 express 的服务器实例
const app = express();

// 1.导入解析表单的中间件 body-parser
const parser = require('body-parser');
// 2.使用app.use() 注册中间件
app.use(parser.urlencoded({ extended: false }));

app.post('/u⑤ser', (req, res) => {
  console.log(req.body);
  // send() 函数向客户端响应内容
  res.send('ok');
});

// 调用 app.listen() 方法，指定端口号并启动web服务器
app.listen(80, () => {
  console.log('服务器开启在：http://127.0.0.1');
});
```

### 9.自定义中间件

**定义一个类似于 **`**express.urlencoded**`** 的中间件，用来解析请求体数据。实现步骤如下**

#### ①	定义中间件

#### ②	监听 `req` 的 `data` 事件

#### ③	监听 `req` 的 `end` 事件

#### ④	使用 `querystring` 模块解析请求体数据

#### ⑤	将解析出来的数据对象挂载为 `req.body`

#### ⑥	将自定义中间件封装为模块

**示例：**`**custom-body-parser.js**`

```javascript
// 导入 Node.js 内置的 querystring 模块
const qs = require('querystring');

const bodyParser = (req, res, next) => {
  // 1.用来存储客户端发送过来的请求体数据
  let str = '';
  // 2.监听data数据
  req.on('data', (chunk) => {
    str += chunk;
  });
  // 3.监听end事件
  req.on('end', () => {
    // TODO：吧字符串格式的请求体数据，解析成对象格式
    const body = qs.parse(str);
    req.body = body;
    next();
  });
};
// 向外暴露
module.exports = bodyParser;
```

**使用：**`**XXX.js**`

```javascript
// 导入 express 模块
const express = require('express');
// 创建 express 的服务器实例
const app = express();

// 1.导入自己封装的中间件模块
const customBodyParser = require('./14.custom-body-parser');
app.use(customBodyParser);

app.post('/user', (req, res) => {
  // send() 函数向客户端响应内容
  res.send(req.body);
});

// 调用 app.listen() 方法，指定端口号并启动web服务器
app.listen(80, () => {
  console.log('服务器开启在：http://127.0.0.1');
});
```

# 七、编写接口

## 1、步骤

#### ①	创建基本的服务器

#### ②	创建 `API` 路由模块

#### ③	编写 `get` 接口

#### ④	编写 `post` 接口

**示例：**`**Router.js**`

```javascript
// 导入 express 模块
const express = require('express');
// 创建路由实例
const router = express.Router();

// 挂载对应的路由
router.get('/get', (req, res) => {
  //通过req.query 获取客户端通过查询字符串，发送到服务器的数据
  const query = req.query;
  // send() 函数向客户端响应内容
  res.send({
    status: 0, // 0 表示处理成功，1 表示处理失败
    get: 'get 请求成功',
    data: req.query, // 需要相应给客户端的数据
  });
});

router.post('/post', (req, res) => {
  //通过req.body 获取请求体重包含的 urlencoded 格式的数据
  const body = req.body;
  // send() 函数向客户端响应内容
  res.send({
    status: 0, // 0 表示处理成功，1 表示处理失败
    get: 'body 请求成功',
    data: req.body, // 需要相应给客户端的数据
  });
});

// 把路由对象暴露出去，供外部使用
module.exports = router;
```

**使用：**`**xxx.js**`

```javascript
// 导入 express 模块
const express = require('express');
// 创建 express 的服务器实例
const app = express();
// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 配置 cors 中间件
const cors = require('cors');
app.use(cors());

// 导入路由模块
const router = require('./16.apiRouter');

// 把路由模块，注册到 app 上
app.use('/api', router);

// 调用 app.listen() 方法，指定端口号并启动web服务器
app.listen(80, () => {
  console.log('服务器开启在：http://127.0.0.1');
});
```

## 2、基于cors解决接口跨域问题

**步骤：（配合上方接口使用）**

#### ①	运行 `npm i cors` 安装中间件

#### ②	使用 `const cors = require('cors');` 导入中间件

#### ③	在路由之前调用 `app.use(cors());` 配置中间件

**示例：**`**index.html**`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js"></script>
  </head>
  <body>
    <button id="btnGet">get</button>
    <button id="btnPost">post</button>
    <button id="btnJsonp">JSONP</button>

    <script>
      $(function () {
        // 1.测试get接口
        $('#btnGet').on('click', () => {
          $.ajax({
            type: 'get',
            url: 'http://127.0.0.1/api/get',
            data: { name: 'zs', age: 23 },
            success: (res) => {
              console.log(res);
            },
          });
        });
        // 2.测试post接口
        $('#btnPost').on('click', () => {
          $.ajax({
            type: 'post',
            url: 'http://127.0.0.1/api/post',
            data: { bookName: '水浒传', author: '施耐庵' },
            success: (res) => {
              console.log(res);
            },
          });
        });
        // 3.测试 JSONP 接口
        $('#btnJsonp').on('click', () => {
          $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1/api/jsonp',
            dataType: 'jsonp',
            success: (res) => {
              console.log(res);
            },
          });
        });
      });
    </script>
  </body>
</html>
```

## 3、cors 跨域资源共享

### 1.CORS响应头部-Access-Control-Allow-Origin

响应头部中可以携带一个 Access-Control-Allow-Origin字段，*表示允许来着任何域的请求，其语法如下:

```javascript
res.setHeader('Access-Control-Allow-Origin','*')
```

其中，origin参数的值指定了允许访问该资源的外域URL。

例如，下面的字段值将只允许来自`http://itcast.cn`的请求:

```javascript
res.setHeader('Access-Control-Allow-Origin','http://itcast.cn')
```

### 2.CORS响应头部-Access-Control-Allow-Headers

默认情况下，CORS仅支持客户端向服务器发送如下的9个请求头:

如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过Access-Control-Allow-Headers 对额外的请求头进行声明，否则这次请求会失败!

```javascript
// 允许客户端额外向服务器发送 Content-Type 请求头和 X-Custom-Header 请求头
// 注意：多个请求头之间使用英文的逗号进行分隔
res.setHeader('Access-Control-Allow-Headers','Content-Type,X-Custom-Header')
```

### 2.CORS响应头部-Access-Control-Allow-Methods

默认情况下，CORS仅支持客户端发起GET、POST、HEAD请求。

如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过Access-Control-Alow-Methods来指明实际请求所允许使用的HTTP方法。

```javascript
// POST、GET、DELETE、HEAD 请求方法
res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE,HEAD')
// 允许所有 HTTP 的请求方法
res.setHeader('Access-Control-Allow-Methods','*')
```

## 4、JSONP 接口

**Tips：配合上方html使用**

#### ①	获取客户端发送过来的回调函数的名字

#### ②	得到要通过 JSONP 形式发送给客户端的数据

#### ③	根据前两部得到数据，拼接处一个函数调用的字符串

#### ④	把上一步拼接得到的字符串，响应给客户端的`<scipt>` 标签进行解析执行

```javascript
// 必须在配置 cors 中间件之前，配置 JSONP 的接口
app.get('/api/jsonp', (req, res) => {
  // TODO：定义 JSONP 接口具体的实现过程
  // 1.得到函数的名称
  const funcName = req.query.callback;
  // 2.定义要发送到客户端的数据对象
  const data = { name: 'zs', age: 22 };
  // 3.拼接出一个函数的调用
  const scriptStr = `${funcName}(${JSON.stringify(data)})`;
  // 4.把拼接的字符串，响应给客户端
  res.send(scriptStr);
});
```

# 八、配置MySQL

在使用mysql模块操作 MySQL数据库之前，必须先对 mysql模块进行必要的配置，主要的配置步骤如下：

## 步骤：

#### ①	配置包管理文件，记录项目使用的第三方包 `npm i init -y`

#### ②	安装 mysql 模块 `npm i mysql`

**示例：**`**db.js**`

```javascript
// 导入 mysql 模块
const mysql = require('mysql');
// 建立与 MySQL 数据库的连接
const db = mysql.createPool({
  host: '127.0.0.1', // 数据库的 IP 地址
  user: 'root', // 登录数据库的账号
  password: 'admin123', // 登录数据库的密码
  database: 'my_db_01', // 指定要操作哪个数据库
});
```

## 1、插入数据：

**Tips：向表中新增数据时，如果据对象的每个属性数和数据表的字段一一对应，则可以通过如下方式快速插入数据:**

```javascript
// 插入数据
const userData = { username: 'Spider-Man', password: 'pcc123' };
// sql 语句
const insertSql = 'insert into users set ?';
// 执行 sql 语句
db.query(insertSql, userData, (err, results) => {
  // sql 语句执行失败
  if (err) {
    return console.log(err.message);
  }
  // 插入成功，返回一个对象
  if (results.affectedRows == 1) {
    console.log('插入成功！');
  }
});
```

## 2、删除数据

**使用DELETE语句，会把真正的把数据从表中删除掉并无法恢复。为了保险起见，推荐使用标记删除的形式，来模拟删除的动作。把状态status改为1**

```javascript
// 删除数据：标记删除，使用 update 语句代替 delete 语句；只更新数据的状态，并没有真正的删除
userData = { id: 1 };
// sql 语句
const deleteSql = 'update users set status = 1 where id = ?';
// 执行 sql 语句
db.query(deleteSql, [userData.id], (err, results) => {
  // sql 语句执行失败
  if (err) {
    return console.log('删除数据失败：' + err.message);
  }
  // 修改成功，返回一个对象
  if (results.affectedRows == 1) {
    console.log('数据删除成功！');
  }
});
```

## 3、修改数据

```javascript
// 修改数据
userData = { id: 7, username: 'Spider-Man', password: '111111' };
// sql 语句
const updateSql = 'update users set ?  where id = ?';
// 执行 sql 语句
db.query(updateSql, [userData, userData.id], (err, results) => {
  // sql 语句执行失败
  if (err) {
    return console.log(err.message);
  }
  // 修改成功，返回一个对象
  if (results.affectedRows == 1) {
    console.log('数据更新成功成功！');
  }
});
```

## 4、查询数据

```javascript
// 查询 users 表中所有的数据
const selectSql = 'select * from users';
db.query(selectSql, (err, results) => {
  // 查询失败
  if (err) {
    return console.log(err.message);
  }
  // 查询成功，返回一个数组
  console.log(results);
});
```

# 九、Express-Session认证

## 1、配置 express-session 中间件

**Tips：通过 **`**app.use()**`** 来注册 **`**session**`** 中间件，示例如下：**

```javascript
// 导入 Session 中间件
const session = require('express-session');
// 配置 Session 中间件
app.use(
  session({
    secret: 'iteima', // 可以为任意字符串
    resave: false, // 固定写法
    saveUninitialized: true, // 固定写法
  })
);
```

## 2、向 session 中存数据

**Tips：可通过 **`**req.session**`** 来访问和使用 **`**session**`** 对象从而存储用户的关键信息：**

```javascript
// 登录的 API 接口
app.post('/api/login', (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'admin' || req.body.password !== '000000') {
    return res.send({ status: 1, msg: '登录失败' });
  }

  // TODO_02：请将登录成功后的用户信息，保存到 Session 中
req.session.userInfo = req.body // 用户信息
req.session.isLogin = true // 用户登录状态
  res.send({ status: 0, msg: '登录成功' });
});
```

## 3、获取 session中的数据

**Tips：可以从 **`**req.session**`** 对象上获取之前存储的数据，示例代码如下：**

```javascript
// 获取用户姓名的接口
app.get('/api/username', (req, res) => {
  // TODO_03：请从 Session 中获取用户的名称，响应给客户端
  if (!req.session.isLogin) {
    return res.send({ status: 1, mas: 'fail' });
  }
  // 获取 session 中的数据
  res.send({
    status: 0,
    mas: 'success',
    username: req.session.userInfo.username,
  });
});
```

## 4、清空 session

**Tips：调用 **`**req.session.destroy()**`** 函数，即可清空服务器中保存的 **`**session**`** 信息**

```javascript
// 退出登录的接口
app.post('/api/logout', (req, res) => {
  // TODO_04：清空 Session 信息
  req.session.destroy();
  res.send({
    status: 0,
    msg: '退出登录成功！',
  });
});
```

# 十、在 Express 中使用 JWT

## 1、安装 JWT 相关的包

**Tips：运行如下命令，安装如下两个 **`**JWT**`** 相关的包：**

```
npm i jsonwebtoken express-jwt
```

- jsonwebtoken：用于生成 `JWT` 字符串
- express-jwt：用于将 `JWT` 字符串解析还原成 JSON 对象

## 2、导入 JWT 相关的包

**Tips：使用 **`**require()**`** 函数，分别导入 **`**JWT**`** 相关的两个包：**

```javascript
// 安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
```

## 3、定义 secret 秘钥

**Tips：为了保证WT字符串的安全性，防止WT字符串在网络传输过程中被别人破解，我们需要专门定义一个用于加密和解密的secret密钥：**

### ①	当生成JWT字符串的时候，需要使用secret密钥对用户的信息进行加密，最终得到加密好的JWT字符串

### ②	当把JWT字符串解析还原成JSON对象的时候，需要使用secret密钥进行解密

```javascript
// 定义 secret 密钥，建议将密钥命名为 secretKey
const secretKey = 'itheime No1 ^_^'
```

## 4、在登录成功后生成 JWT 字符串

**Tips：调用 **`**jsonwebtoken**`** 包提供的 **`**sign()**`** 方法，将用户的信息加密成JWT字符串，响应给客户端：**

```javascript
// 登录接口
app.post('/api/login', function (req, res) {
  // 将 req.body 请求体中的数据，转存为 userinfo 常量
  const userinfo = req.body;
  // 登录失败
  if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
    return res.send({
      status: 400,
      message: '登录失败！',
    });
  }
  // 登录成功
  // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  /**
   * 参数1：用户的对象信息
   * 参数2：加密的秘钥
   * 参数3：配置对象，可以配置当前 token 的有效期
   */
  const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '30s' });

  res.send({
    status: 200,
    message: '登录成功！',
    token: 'tokenStr', // 要发送给客户端的 token 字符串
  });
});
```

## 5、将 JWT 字符串还原为 JSON 对象

- 客户端每次在访问那些有权限接口的时候，都需要主动通过请求头中的Authorization字段，将Token字符串发送到服务器进行身份认证。
- 此时，服务器可以通过 `express-jwt` 这个中间件，自动将客户端发送过来的`Token`解析还原成JSON对象:

```javascript
// TODO_04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
// 只要配置成功了 express-jwt 这个中间件,就可以把解析出来的用户信息，挂载到 req.user 属性上
/**
 * expressJWT({secret:secretKey})  解析 Token 的中间件
 * .unless({ path:[/^\/api\//] })  指定那些接口不需要访问权限
 */
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }));
```

## 6、使用 req.user 获取用户信息

```javascript
// 这是一个有权限的 API 接口
app.get('/admin/getinfo', function (req, res) {
  // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  res.send({
    status: 200,
    message: '获取用户信息成功！',
    data: req.user, // 要发送给客户端的用户信息
  });
});
```

## 7、捕获解析 JWT 失败后产生的错误

**Tips：当使用express-jwt解析Token字符串时，如果客户端发送过来的Token字符串过期或不合法，会产生一个解析失败的错误，影响项目的正常运行。我们可以通过 Express的错误中间件，捕获这个错误并进行相关的处理，示例代码如下：**

```javascript
// 使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      massage: '无效的token',
    });
  }
  res.send({
    status: 500,
    massage: '未知的错误',
  });
  next();
});
```
