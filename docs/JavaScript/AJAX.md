# 一、简介

AJAX 全称为 Asynchronous JavaScript And XML，就是异步的 Js 和 XML。通过 AJAX 可以在浏览器中向服务器发送异步请求，最大的优势：无刷新获取数据。AJAX 不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式。

# 二、Ajax 的优缺点

## 1、优点

### ① 可以无需刷新页面而与服务器端进行通信。

### ② 允许你根据用户事件（鼠标、键盘、表单、文档）来更新部分页面内容。

## 1、缺点

### ① 没有浏览历史不能回退

### ② 存在跨域问题（同源）

### ③ SEO（搜索引擎）不友好

# 三、HTTP 请求

解释：HTTP (hypertext transport protocol)协议『超文本传输协议』，协议详细规定了浏览器和万维网服务器之间互相通信的规则。

## 1、包含内容

### ① 请求报文

重点是格式与参数

- 请求行（包含如下）
  - 请求类型：GET、POST、DELETE、PUT
  - URL：路径参数
  - HTTP 版本：有 1.0、1.1、2.0 即 HTTP/1.1
- 请求头
  - Host：请求将要发送到的服务器主机名和端口号
  - Cookie：是服务器发送到用户浏览器并保存在本地的一小块数据。 浏览器会存储 cookie 并在下次向同一服务器再发起请求时携带并发送到服务器上。用于告知服务端两个请求是否来自同一浏览器——如保持用户的登录状态。
  - Content-Type：请求数据类型
  - User-agent：（例如：“Chrome 83”）
    - 1、统计用户浏览器使用情况。 有些浏览器说被多少人使用了，实际上就可以通过判断每个 IP 的 UA 来确定这个 IP 是用什么浏览器访问的，以得到使用量的数据。
    - 2、根据用户使用浏览器的不同，显示不同的排版从而为用户提供更好的体验
- 请求空行
- 请求体：（可空，例如：“username=admin&password=admin”）
  - GET 请求：内容为空
  - POST 请求：可以不为空

### ② 响应报文

- 响应行（包含如下）
  - HTTP 协议版本：有 1.0、1.1、2.0 即 HTTP/1.1
  - 响应状态码：如：403、404、401、200、500、505 等
  - 响应字符串：如：OK
- 响应头
  - Content-Type：请求数据类型（text/html; charset=utf-8）
  - Content-length：响应长度（2048）
  - Content-encoding：压缩方式（gzip）
- 响应空行
- 响应体：JSON

# 四、Ajax 基本使用

## 1、GET 请求

```html
<body
    <button点击发送请求</button
    <div class="result"</div
    <script
      // 获取元素
      const btn = document.getElementsByTagName('button')[0];
      let result = document.getElementsByClassName('result')[0]
      // 绑定事件
      btn.onclick = () = {
        // 1.创建对象
        const xhr = new XMLHttpRequest();
        // 2.初始化 设置请求方法和url
        xhr.open('get', 'http://127.0.0.1:8000/server');
        // 3.发送
        xhr.send();
        /** 4.事件绑定 处理服务端返回结果
         * on  when 当……时候
         * readystate 是 xhr 对象中的属性，表示状态 0 1 2 3 4
         * change 改变
         * **/
        xhr.onreadystatechange = () = {
          // 判断
          if (xhr.readyState === 4) {
            // 判断响应状态码
            if (xhr.status = 200 && xhr.status < 300) {
              // 处理结果
              console.log('xhr.status------', xhr.status); // 状态码
              console.log('xhr.statusText------', xhr.statusText); // 状态字符串
              console.log('xhr.getAllResponseHeaders------', xhr.getAllResponseHeaders());// 所有响应头
              console.log('xhr.响应体------', xhr.response); // 响应体
              // 设置 result 的文本
                result.innerHTML = xhr.response

            }
          }
        };
      };
    </script
  </body
```

## 2、POST 请求

```html
<script
      // 获取元素
      const result = document.querySelector('.result');
      // 绑定监听事件
      result.addEventListener('mouseover', function (e) {
        // 1.创建对象
        const xhr = new XMLHttpRequest();
        // 2.初始化 设置 '请求类型' 与 'URL'
        xhr.open('POST', 'http://127.0.0.1:8000/server');
        // 3.发送请求
        xhr.send();
        // 4.处理返回结果
        xhr.onreadystatechange = () = {
          if (xhr.readyState === 4) {
            if (xhr.status = 200 && xhr.status < 300) {
              console.log('xhr----', xhr);
              console.log('xhr.response----', xhr.response);
              console.log('xhr.responseURL----', xhr.responseURL);
              result.innerHTML = xhr.response;
            }
          }
        };
      });
    </script
```

### ① POST 添加请求体

**send() 中**可设置【任意类型】【任意数据】只要后端能处理

```js
// 类型1
xhr.send('a=100&b=200&c=300');

// 类型2
xhr.send('a:100&b:200&c:300');

// 类型3
const data = {
  name: 'wqf',
  age: 22,
};
// 转换成 URL 传参格式（ name:wqf&age:22）
const urlParms = new URLSearchParams(data);
xhr.send(urlParms);
```

node.js 中 使用 express.urlencoded 【解析】 并 接收

```javascript
// 1.引入 express
const express = require('express');

// 2.创建应用对象
const app = express();
// 使用 express.urlencoded() 中间件来解析 URL 编码的请求体
app.use(express.urlencoded({ extended: true }));
// 使用 express.json() 中间件来解析 JSON 请求体
app.use(express.json());

/**
 * 3.创建路由规则
 * @request：对请求报文的封装
 * @response：对响应报文的封装
 */
app.get('/server', (request, response) = {
  // 设置响应头  设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 设置响应
  response.send('<h1根目录默认GET请求成功</h1');
});

app.post('/server', (request, response) = {
  // 设置响应头  设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 打印请求中的参数
  console.log('request.body----', request.body);
  // 设置响应
  response.send('<h1根目录默认POST请求成功</h1');
});

// 4.监听端口启动服务
app.listen(8000, () = {
  console.log('服务已启动……');
});

```

## 3、nodemon 自动重启工具

[nodemon 安装官网](https://www.npmjs.com/package/nodemon)

### ① 安装与使用

```vb
npm install -g nodemon
nodemon app.js
```

# 五、Ajax IE 缓存问题

```javascript
// 在请求 URL 中加入 【时间戳】 让浏览器认为每次都是新的请求之后就不会走缓存
xhr.open('GET', `http://localhost:8000/ie?t=${Date.now()}`);
```

# 六 、Ajax 超时请求与异常处理

```javascript
// 超时设置 2s 设置
xhr.timeout = 2000;
// 设置超时回调
xhr.ontimeout = () = {
   alert('网络超时请重试');
};
```

# 七、Ajax 取消请求

```javascript
<script
      const btns = document.querySelectorAll('button');
      const result = document.querySelector('.result');
      // 创建公共 Ajax
      let xhr;
      btns[0].addEventListener('click', () = {
        xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8000/delay?t=' + Date.now());
        xhr.send();
        xhr.onreadystatechange = () = {
          if (xhr.readyState === 4) {
            if (xhr.status = 200 && xhr.status < 300) {
              console.log('xhr.response----', xhr.response);
              result.innerHTML = xhr.response;
            }
          }
        };
      });
      // abort:终止请求/取消请求
      btns[1].addEventListener('click', () = {
        xhr.abort();
      });
    </script
```

# 九、同源策略

### ① 解释【同源】与【跨域】：

- 同源：协议、域名、端口号 必须完全相同
- 跨域：违背上述同源策略就是【跨域】

### ② JSONP 解决跨域（仅支持 GET 请求）

- 页面中默认拥有跨域能力的标签有： 【script】【img】【link】【iframe】
- 【JSONP】通过 【script】进行跨域

### ③ CORS 解决跨域（支持 GET POST DELET PUT ）

[官网看看](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)

- CORS 是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在**【服务器】**中进行处理。跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有枚限访问哪些资源

```javascript
// 设置响应头  设置允许跨域
response.setHeader('Access-Control-Allow-Origin', '*');
```

## 封装库

近年来使用好用又多人用的库 Axios，
在 jQuery 的时候，jQusey.ajax 是最方便的选择，
当然在当前有很多的封装库，选择一个用或者自己封装都可以，
如想了解百度一搜索就会有很多的资料学习。

# Fetch

`fetch()`是 XMLHttpRequest 的升级版，用于在 JavaScript 脚本里面发出 HTTP 请求。浏览器原生提供这个对象。

[mdn 链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

## 一、基本用法

`fetch()`的功能与 XMLHttpRequest 基本相同，但有三个主要的差异。

（1）`fetch()`使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。

（2）`fetch()`采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。

（3）`fetch()`通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。

在用法上，`fetch()`接受一个 URL 字符串作为参数，默认向该网址发出 GET 请求，返回一个 Promise 对象。它的基本用法如下。

```javascript
fetch(url)
  .then(...)
  .catch(...)
```

下面是一个例子，从服务器获取 JSON 数据。

```javascript
fetch('https://api.github.com/users/ruanyf')
  .then((response = response.json()))
  .then((json = console.log(json)))
  .catch((err = console.log('Request Failed', err)));
```

上面示例中，`fetch()`接收到的`response`是一个 [Stream 对象](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)，`response.json()`是一个异步操作，取出所有内容，并将其转为 JSON 对象。

Promise 可以使用 await 语法改写，使得语义更清晰。

```javascript
async function getJSON() {
  let url = 'https://api.github.com/users/ruanyf';
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Request Failed', error);
  }
}
```

上面示例中，`await`语句必须放在`try...catch`里面，这样才能捕捉异步操作中可能发生的错误。

后文都采用`await`的写法，不使用`.then()`的写法。

## 二、Response 对象：处理 HTTP 回应

### 2.1 Response 对象的同步属性

`fetch()`请求成功以后，得到的是一个 [Response 对象](https://developer.mozilla.org/en-US/docs/Web/API/Response)。它对应服务器的 HTTP 回应。

```javascript
const response = await fetch(url);
```

前面说过，Response 包含的数据通过 Stream 接口异步读取，但是它还包含一些同步属性，对应 HTTP 回应的标头信息（Headers），可以立即读取。

```javascript
async function fetchText() {
  let response = await fetch('/readme.txt');
  console.log(response.status);
  console.log(response.statusText);
}
```

上面示例中，`response.status`和`response.statusText`就是 Response 的同步属性，可以立即读取。

标头信息属性有下面这些。

**Response.ok**

`Response.ok`属性返回一个布尔值，表示请求是否成功，`true`对应 HTTP 请求的状态码 200 到 299，`false`对应其他的状态码。

**Response.status**

`Response.status`属性返回一个数字，表示 HTTP 回应的状态码（例如 200，表示成功请求）。

**Response.statusText**

`Response.statusText`属性返回一个字符串，表示 HTTP 回应的状态信息（例如请求成功以后，服务器返回"OK"）。

**Response.url**

`Response.url`属性返回请求的 URL。如果 URL 存在跳转，该属性返回的是最终 URL。

**Response.type**

`Response.type`属性返回请求的类型。可能的值如下：

- `basic`：普通请求，即同源请求。
- `cors`：跨域请求。
- `error`：网络错误，主要用于 Service Worker。
- `opaque`：如果`fetch()`请求的`type`属性设为`no-cors`，就会返回这个值，详见请求部分。表示发出的是简单的跨域请求，类似`<form`表单的那种跨域请求。
- `opaqueredirect`：如果`fetch()`请求的`redirect`属性设为`manual`，就会返回这个值，详见请求部分。

**Response.redirected**

`Response.redirected`属性返回一个布尔值，表示请求是否发生过跳转。

### 2.2 判断请求是否成功

`fetch()`发出请求以后，有一个很重要的注意点：只有网络错误，或者无法连接时，`fetch()`才会报错，其他情况都不会报错，而是认为请求成功。

这就是说，即使服务器返回的状态码是 4xx 或 5xx，`fetch()`也不会报错（即 Promise 不会变为 `rejected`状态）。

只有通过`Response.status`属性，得到 HTTP 回应的真实状态码，才能判断请求是否成功。请看下面的例子。

```javascript
async function fetchText() {
  let response = await fetch('/readme.txt');
  if ((response.status = 200 && response.status < 300)) {
    return await response.text();
  } else {
    throw new Error(response.statusText);
  }
}
```

上面示例中，`response.status`属性只有等于 2xx （200~299），才能认定请求成功。这里不用考虑网址跳转（状态码为 3xx），因为`fetch()`会将跳转的状态码自动转为 200。

另一种方法是判断`response.ok`是否为`true`。

```javascript
if (response.ok) {
  // 请求成功
} else {
  // 请求失败
}
```

### 2.3 Response.headers 属性

Response 对象还有一个`Response.headers`属性，指向一个 [Headers 对象](https://developer.mozilla.org/en-US/docs/Web/API/Headers)，对应 HTTP 回应的所有标头。
Headers 对象可以使用`for...of`循环进行遍历。

```javascript
const response = await fetch(url);

for (let [key, value] of response.headers) {
  console.log(`${key} : ${value}`);
}

// 或者
for (let [key, value] of response.headers.entries()) {
  console.log(`${key} : ${value}`);
}
```

Headers 对象提供了以下方法，用来操作标头。

- `Headers.get()`：根据指定的键名，返回键值。
- `Headers.has()`： 返回一个布尔值，表示是否包含某个标头。
- `Headers.set()`：将指定的键名设置为新的键值，如果该键名不存在则会添加。
- `Headers.append()`：添加标头。
- `Headers.delete()`：删除标头。
- `Headers.keys()`：返回一个遍历器，可以依次遍历所有键名。
- `Headers.values()`：返回一个遍历器，可以依次遍历所有键值。
- `Headers.entries()`：返回一个遍历器，可以依次遍历所有键值对（`[key, value]`）。
- `Headers.forEach()`：依次遍历标头，每个标头都会执行一次参数函数。

上面的有些方法可以修改标头，那是因为继承自 Headers 接口。对于 HTTP 回应来说，修改标头意义不大，况且很多标头是只读的，浏览器不允许修改。

这些方法中，最常用的是`response.headers.get()`，用于读取某个标头的值。

```javascript
let response = await fetch(url);
response.headers.get('Content-Type');
// application/json; charset=utf-8
```

`Headers.keys()`和`Headers.values()`方法用来分别遍历标头的键名和键值。

```javascript
// 键名
for (let key of myHeaders.keys()) {
  console.log(key);
}

// 键值
for (let value of myHeaders.values()) {
  console.log(value);
}
```

`Headers.forEach()`方法也可以遍历所有的键值和键名。

```javascript

let response = await fetch(url);
response.headers.forEach(
  (value, key) = console.log(key, ':', value)
);
```

### 2.4 读取内容的方法

`Response`对象根据服务器返回的不同类型的数据，提供了不同的读取方法。

- `response.text()`：得到文本字符串。
- `response.json()`：得到 JSON 对象。
- `response.blob()`：得到二进制 Blob 对象。
- `response.formData()`：得到 FormData 表单对象。
- `response.arrayBuffer()`：得到二进制 ArrayBuffer 对象。

上面 5 个读取方法都是异步的，返回的都是 Promise 对象。必须等到异步操作结束，才能得到服务器返回的完整数据。

**response.text()**

`response.text()`可以用于获取文本数据，比如 HTML 文件。

```javascript
const response = await fetch('/users.html');
const body = await response.text();
document.body.innerHTML = body;
```

**response.json()**

`response.json()`主要用于获取服务器返回的 JSON 数据，前面已经举过例子了。

**response.formData()**

`response.formData()`主要用在 Service Worker 里面，拦截用户提交的表单，修改某些数据以后，再提交给服务器。

**response.blob()**

`response.blob()`用于获取二进制文件。

```javascript
const response = await fetch('flower.jpg');
const myBlob = await response.blob();
const objectURL = URL.createObjectURL(myBlob);

const myImage = document.querySelector('img');
myImage.src = objectURL;
```

上面示例读取图片文件`flower.jpg`，显示在网页上。

**response.arrayBuffer()**

`response.arrayBuffer()`主要用于获取流媒体文件。

```javascript
const audioCtx = new window.AudioContext();
const source = audioCtx.createBufferSource();

const response = await fetch('song.ogg');
const buffer = await response.arrayBuffer();

const decodeData = await audioCtx.decodeAudioData(buffer);
source.buffer = buffer;
source.connect(audioCtx.destination);
source.loop = true;
```

上面示例是`response.arrayBuffer()`获取音频文件`song.ogg`，然后在线播放的例子。

### 2.5 Response.clone()

Stream 对象只能读取一次，读取完就没了。这意味着，前一节的五个读取方法，只能使用一个，否则会报错。

```javascript
let text = await response.text();
let json = await response.json(); // 报错
```

上面示例先使用了`response.text()`，就把 Stream 读完了。后面再调用`response.json()`，就没有内容可读了，所以报错。

Response 对象提供`Response.clone()`方法，创建`Response`对象的副本，实现多次读取。

```javascript
const response1 = await fetch('flowers.jpg');
const response2 = response1.clone();

const myBlob1 = await response1.blob();
const myBlob2 = await response2.blob();

image1.src = URL.createObjectURL(myBlob1);
image2.src = URL.createObjectURL(myBlob2);
```

上面示例中，`response.clone()`复制了一份 Response 对象，然后将同一张图片读取了两次。

Response 对象还有一个`Response.redirect()`方法，用于将 Response 结果重定向到指定的 URL。该方法一般只用在 Service Worker 里面，这里就不介绍了。

### 2.6 Response.body 属性

`Response.body`属性是 Response 对象暴露出的底层接口，返回一个 ReadableStream 对象，供用户操作。

它可以用来分块读取内容，应用之一就是显示下载的进度。

```javascript
const response = await fetch('flower.jpg');
const reader = response.body.getReader();

while (true) {
  const { done, value } = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`);
}
```

上面示例中，`response.body.getReader()`方法返回一个遍历器。这个遍历器的`read()`方法每次返回一个对象，表示本次读取的内容块。

这个对象的`done`属性是一个布尔值，用来判断有没有读完；`value`属性是一个 arrayBuffer 数组，表示内容块的内容，而`value.length`属性是当前块的大小。

## 三、`fetch()`的第二个参数：定制 HTTP 请求

`fetch()`的第一个参数是 URL，还可以接受第二个参数，作为配置对象，定制发出的 HTTP 请求。

```javascript
fetch(url, optionObj);
```

上面命令的`optionObj`就是第二个参数。

HTTP 请求的方法、标头、数据体都在这个对象里面设置。下面是一些示例。

**（1）POST 请求**

```javascript
const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  body: 'foo=bar&lorem=ipsum',
});

const json = await response.json();
```

上面示例中，配置对象用到了三个属性。

- `method`：HTTP 请求的方法，`POST`、`DELETE`、`PUT`都在这个属性设置。
- `headers`：一个对象，用来定制 HTTP 请求的标头。
- `body`：POST 请求的数据体。

注意，有些标头不能通过`headers`属性设置，比如`Content-Length`、`Cookie`、`Host`等等。它们是由浏览器自动生成，无法修改。

**（2）提交 JSON 数据**

```javascript
const user = { name: 'John', surname: 'Smith' };
const response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(user),
});
```

上面示例中，标头`Content-Type`要设成`'application/json;charset=utf-8'`。因为默认发送的是纯文本，`Content-Type`的默认值是`'text/plain;charset=UTF-8'`。

**（3）提交表单**

```javascript
const form = document.querySelector('form');

const response = await fetch('/users', {
  method: 'POST',
  body: new FormData(form),
});
```

**（4）文件上传**

如果表单里面有文件选择器，可以用前一个例子的写法，上传的文件包含在整个表单里面，一起提交。

另一种方法是用脚本添加文件，构造出一个表单，进行上传，请看下面的例子。

```javascript
const input = document.querySelector('input[type="file"]');

const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/avatars', {
  method: 'POST',
  body: data,
});
```

上传二进制文件时，不用修改标头的`Content-Type`，浏览器会自动设置。

**（5）直接上传二进制数据**

`fetch()`也可以直接上传二进制数据，将 Blob 或 arrayBuffer 数据放在`body`属性里面。

```javascript
let blob = await new Promise((resolve = canvasElem.toBlob(resolve, 'image/png')));

let response = await fetch('/article/fetch/post/image', {
  method: 'POST',
  body: blob,
});
```

## 四、`fetch()`配置对象的完整 API

`fetch()`第二个参数的完整 API 如下。

```javascript
const response = fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8',
  },
  body: undefined,
  referrer: 'about:client',
  referrerPolicy: 'no-referrer-when-downgrade',
  mode: 'cors',
  credentials: 'same-origin',
  cache: 'default',
  redirect: 'follow',
  integrity: '',
  keepalive: false,
  signal: undefined,
});
```

`fetch()`请求的底层用的是 [Request() 对象](https://developer.mozilla.org/en-US/docs/Web/API/Request/Request)的接口，参数完全一样，因此上面的 API 也是`Request()`的 API。

这些属性里面，`headers`、`body`、`method`前面已经给过示例了，下面是其他属性的介绍。

**cache**

`cache`属性指定如何处理缓存。可能的取值如下：

- `default`：默认值，先在缓存里面寻找匹配的请求。
- `no-store`：直接请求远程服务器，并且不更新缓存。
- `reload`：直接请求远程服务器，并且更新缓存。
- `no-cache`：将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存。
- `force-cache`：缓存优先，只有不存在缓存的情况下，才请求远程服务器。
- `only-if-cached`：只检查缓存，如果缓存里面不存在，将返回 504 错误。

**mode**

`mode`属性指定请求的模式。可能的取值如下：

- `cors`：默认值，允许跨域请求。
- `same-origin`：只允许同源请求。
- `no-cors`：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求。

**credentials**

`credentials`属性指定是否发送 Cookie。可能的取值如下：

- `same-origin`：默认值，同源请求时发送 Cookie，跨域请求时不发送。
- `include`：不管同源请求，还是跨域请求，一律发送 Cookie。
- `omit`：一律不发送。

跨域请求发送 Cookie，需要将`credentials`属性设为`include`。

```javascript
fetch('http://another.com', {
  credentials: 'include',
});
```

**signal**

`signal`属性指定一个 AbortSignal 实例，用于取消`fetch()`请求，详见下一节。

**keepalive**

`keepalive`属性用于页面卸载时，告诉浏览器在后台保持连接，继续发送数据。

一个典型的场景就是，用户离开网页时，脚本向服务器提交一些用户行为的统计信息。这时，如果不用`keepalive`属性，数据可能无法发送，因为浏览器已经把页面卸载了。

```javascript
window.onunload = function () {
  fetch('/analytics', {
    method: 'POST',
    body: 'statistics',
    keepalive: true,
  });
};
```

**redirect**

`redirect`属性指定 HTTP 跳转的处理方法。可能的取值如下：

- `follow`：默认值，`fetch()`跟随 HTTP 跳转。
- `error`：如果发生跳转，`fetch()`就报错。
- `manual`：`fetch()`不跟随 HTTP 跳转，但是`response.url`属性会指向新的 URL，`response.redirected`属性会变为`true`，由开发者自己决定后续如何处理跳转。

**integrity**

`integrity`属性指定一个哈希值，用于检查 HTTP 回应传回的数据是否等于这个预先设定的哈希值。

比如，下载文件时，检查文件的 SHA-256 哈希值是否相符，确保没有被篡改。

```javascript
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef',
});
```

**referrer**

`referrer`属性用于设定`fetch()`请求的`referer`标头。

这个属性可以为任意字符串，也可以设为空字符串（即不发送`referer`标头）。

```javascript
fetch('/page', {
  referrer: '',
});
```

**referrerPolicy**

`referrerPolicy`属性用于设定`Referer`标头的规则。可能的取值如下：

- `no-referrer-when-downgrade`：默认值，总是发送`Referer`标头，除非从 HTTPS 页面请求 HTTP 资源时不发送。
- `no-referrer`：不发送`Referer`标头。
- `origin`：`Referer`标头只包含域名，不包含完整的路径。
- `origin-when-cross-origin`：同源请求`Referer`标头包含完整的路径，跨域请求只包含域名。
- `same-origin`：跨域请求不发送`Referer`，同源请求发送。
- `strict-origin`：`Referer`标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送`Referer`标头。
- `strict-origin-when-cross-origin`：同源请求时`Referer`标头包含完整路径，跨域请求时只包含域名，HTTPS 页面请求 HTTP 资源时不发送该标头。
- `unsafe-url`：不管什么情况，总是发送`Referer`标头。

## 五、取消`fetch()`请求

`fetch()`请求发送以后，如果中途想要取消，需要使用`AbortController`对象。

```javascript

let controller = new AbortController();
let signal = controller.signal;

fetch(url, {
  signal: controller.signal
});

signal.addEventListener('abort',
  () = console.log('abort!')
);

controller.abort(); // 取消

console.log(signal.aborted); // true
```

上面示例中，首先新建 AbortController 实例，然后发送`fetch()`请求，配置对象的`signal`属性必须指定接收 AbortController 实例发送的信号`controller.signal`。

`controller.abort()`方法用于发出取消信号。这时会触发`abort`事件，这个事件可以监听，也可以通过`controller.signal.aborted`属性判断取消信号是否已经发出。

下面是一个 1 秒后自动取消请求的例子。

```javascript

let controller = new AbortController();
setTimeout(() = controller.abort(), 1000);

try {
  let response = await fetch('/long-operation', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') {
    console.log('Aborted!');
  } else {
    throw err;
  }
}
```

## 六、参考链接

- [阮一峰 Fetch API 教程](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)
- [Network requests: Fetch](https://javascript.info/fetch)
- [node-fetch](https://github.com/node-fetch/node-fetch)
- [Introduction to fetch()](https://developers.google.com/web/updates/2015/03/introduction-to-fetch)
- [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Javascript Fetch API: The XMLHttpRequest evolution](https://developerhowto.com/2019/09/14/javascript-fetch-api/)
