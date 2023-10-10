# 一、简介
AJAX全称为Asynchronous JavaScript And XML，就是异步的Js和XML。通过AJAX可以在浏览器中向服务器发送异步请求，最大的优势：无刷新获取数据。AJAX不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式。
# 二、Ajax 的优缺点
## 1、优点
### ① 可以无需刷新页面而与服务器端进行通信。
### ② 允许你根据用户事件（鼠标、键盘、表单、文档）来更新部分页面内容。
## 1、缺点
### ① 没有浏览历史不能回退
### ② 存在跨域问题（同源）
### ③ SEO（搜索引擎）不友好
# 三、HTTP请求
解释：HTTP (hypertext transport protocol)协议『超文本传输协议』，协议详细规定了浏览器和万维网服务器之间互相通信的规则。
## 1、包含内容
### ① 请求报文
重点是格式与参数

- 请求行（包含如下）
   - 请求类型：GET、POST、DELETE、PUT
   - URL：路径参数
   - HTTP版本：有1.0、1.1、2.0即 HTTP/1.1 
- 请求头
   - Host：请求将要发送到的服务器主机名和端口号
   - Cookie：是服务器发送到用户浏览器并保存在本地的一小块数据。 浏览器会存储cookie 并在下次向同一服务器再发起请求时携带并发送到服务器上。用于告知服务端两个请求是否来自同一浏览器——如保持用户的登录状态。
   - Content-Type：请求数据类型
   - User-agent：（例如：“Chrome 83”）
      - 1、统计用户浏览器使用情况。 有些浏览器说被多少人使用了，实际上就可以通过判断每个IP的UA来确定这个IP是用什么浏览器访问的，以得到使用量的数据。 
      - 2、根据用户使用浏览器的不同，显示不同的排版从而为用户提供更好的体验
- 请求空行
- 请求体：（可空，例如：“username=admin&password=admin”）
   - GET请求：内容为空
   - POST请求：可以不为空
### ② 响应报文

- 响应行（包含如下）
   - HTTP协议版本：有1.0、1.1、2.0即 HTTP/1.1 
   - 响应状态码：如：403、404、401、200、500、505等
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
<body>
    <button>点击发送请求</button>
    <div class="result"></div>
    <script>
      // 获取元素
      const btn = document.getElementsByTagName('button')[0];
      let result = document.getElementsByClassName('result')[0]
      // 绑定事件
      btn.onclick = () => {
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
        xhr.onreadystatechange = () => {
          // 判断
          if (xhr.readyState === 4) {
            // 判断响应状态码
            if (xhr.status >= 200 && xhr.status < 300) {
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
    </script>
  </body>
```
## 2、POST 请求
```html
<script>
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
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              console.log('xhr----', xhr);
              console.log('xhr.response----', xhr.response);
              console.log('xhr.responseURL----', xhr.responseURL);
              result.innerHTML = xhr.response;
            }
          }
        };
      });
    </script>
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
app.get('/server', (request, response) => {
  // 设置响应头  设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 设置响应
  response.send('<h1>根目录默认GET请求成功</h1>');
});

app.post('/server', (request, response) => {
  // 设置响应头  设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');
  // 打印请求中的参数
  console.log('request.body----', request.body);
  // 设置响应
  response.send('<h1>根目录默认POST请求成功</h1>');
});

// 4.监听端口启动服务
app.listen(8000, () => {
  console.log('服务已启动……');
});

```
## 3、nodemon 自动重启工具
[nodemon 安装官网](https://www.npmjs.com/package/nodemon)
### ① 安装与使用
:::tips
npm install -g nodemon
nodemon app.js
:::
# 五、Ajax IE缓存问题
```javascript
// 在请求 URL 中加入 【时间戳】 让浏览器认为每次都是新的请求之后就不会走缓存 
xhr.open('GET', `http://localhost:8000/ie?t=${Date.now()}`);
```
# 六 、Ajax 超时请求与异常处理
```javascript
// 超时设置 2s 设置
xhr.timeout = 2000;
// 设置超时回调
xhr.ontimeout = () => {
   alert('网络超时请重试');
};
```
# 七、Ajax 取消请求
```javascript
<script>
      const btns = document.querySelectorAll('button');
      const result = document.querySelector('.result');
      // 创建公共 Ajax
      let xhr;
      btns[0].addEventListener('click', () => {
        xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:8000/delay?t=' + Date.now());
        xhr.send();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              console.log('xhr.response----', xhr.response);
              result.innerHTML = xhr.response;
            }
          }
        };
      });
      // abort:终止请求/取消请求
      btns[1].addEventListener('click', () => {
        xhr.abort();
      });
    </script>
```
# 八、jQuery 发送请求

## 1、jQuery——GET 请求
```javascript
<script>
      // 发送GET请求
      $('button')
        .eq(0)
        .click(() => {
          $.get('http://localhost:8000/jQuery-server', { a: 100, b: 200 }, (a) => {
            console.log(a);
          });
        });
    </script>
```
## 2、jQuery——POST 请求
```javascript
<script>
      /**    
  		 * 发送POST请求
       * $.post(URL,参数[Object],返回值回调函数,返回数据格式)
  		 * **/
      $('button')
        .eq(1)
        .click(() => {
          $.post(
            'http://localhost:8000/jQuery-server',
            { a: 100, b: 200 },
            (response) => {
              console.log(response);
            },
            'json'
          );
        });
    </script>
```
## 2、jQuery——Ajax 请求
```javascript
<script>
      /**
       * 发送 Ajax请求
       * **/
      $('button')
        .eq(2)
        .click(() => {
          $.ajax({
            // 路径,
            url: 'http://localhost:8000/delay',
            //  参数对象,
            data: { a: 100, b: 200 },
            // 请求类型,
            type: 'GET',
            // 响应体结果类型,
            dataType: 'json',
            // 超时时间
            timeout: 2000,
            // 成功回调
            success: (response) => {
              console.log(response);
            },
            // 失败回调
            error: (err) => {
              console.log('出错了');
            },
          });
        });
</script>
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

- CORS是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在**【服务器】**中进行处理。跨域资源共享标准新增了一组HTTP首部字段，允许服务器声明哪些源站通过浏览器有枚限访问哪些资源
```javascript
// 设置响应头  设置允许跨域
response.setHeader('Access-Control-Allow-Origin', '*');
```
