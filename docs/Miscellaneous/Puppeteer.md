# Puppeteer

在 `node` 使用 `Puppeteer`

文档：

[官网文档](https://pptr.dev/)
[中文文档1](https://pptr.nodejs.cn/)
[中文文档2](https://puppeteer.bootcss.com/)

## 使用

基本使用：

```js
// import puppeteer from 'puppeteer'
 const puppeteer = require('puppeteer')
;(async ()=>{
    const browser = await puppeteer.launch({
          headless: false,
          //headless: 'new', //headless: "new" 来提前选择新版无头模式。
          defaultViewport: null,
          args: [
            `--window-size=700,700`, // 打开窗口大小
          ]
    })

    // 创建一个 tap 页面
    const page = await browser.newPage()
    // 输入地址
    await page.goto(`https://www.baidu.com`)
})()
```

### 常用api

### `browser.close()`、`page.clone()`

一看就懂的了 `browser.close()` 关闭浏览器，`page.close()` 关闭tab页面

### `page.$()` 与 `page.$$()` 选择器

`page.$()` 约等于 `document.querySelector()`

`page.$()` 约等于 `document.querySelectorAll()`

只是 `约等于`，一般情况这样使用没有问题，更详细请查看文档[前往](https://pptr.nodejs.cn/guides/query-selectors)

```js
;(async ()=>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({
          headless: false,
          //headless: 'new', //headless: "new" 来提前选择新版无头模式。
          defaultViewport: null,
          args: [
            `--window-size=700,700`, // 打开窗口大小
          ]
    })

    // 创建一个 tap 页面
    const page = await browser.newPage()
    // 输入地址
    await page.goto(`https://www.baidu.com`)

    // 获取 input
    const input = await page.$('#kw')
    // 模拟用户输入
    await input.type('puppeteer')
    // 获取 搜索按钮
    const but = await page.$('#su')
    await but.click()
})()
```

### `page.setCookie()` 注入cookie

向`tab`页注入`cookie`，当然拿到cookie的方法你可以的，推荐一个浏览器插件 `Cookie Editor` 很舒服

`page.setCookie()`的参数是一个数组，大概就是这样参数那个必需就不懂了，插件导出的  (￣ˇ￣)

```js
[
    {
        "domain": "www.manhuagui.com",
        "expirationDate": 1733571342.635967,
        "hostOnly": true,
        "httpOnly": false,
        "name": "bitmedia_fid",
        "path": "/",
        "sameSite": null,
        "secure": false,
        "session": false,
        "storeId": null,
        "value": "eyJmaWQiOiI4MjZTkzN2M2N2FkODk4YzUyZiJ9"
    },
]
```

### `pageL.cookies()` 获取cookie

有get当然也有set它来的，不过需要你进行码代码进行登录操作，所以在set后面说

```js
;(async ()=>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({
          headless: false,
          //headless: 'new', //headless: "new" 来提前选择新版无头模式。
          defaultViewport: null,
          args: [
            `--window-size=700,700`, // 打开窗口大小
          ]
    })

    // 创建一个 tap 页面
    const page = await browser.newPage()
    // 输入地址
    await page.goto(`https://www.******.com/user`)

    const pwd = 'mima'


    // 你想也是使用 page.$ 获取在模拟输入 那个容易按那个来咯
    await page.evaluate((pwd)=>{
        document.querySelector('#edtUserName').value = 'admin'
        document.querySelector('#edtPassWord').value = pwd
        document.querySelector('#btnPost').click()
    },pwd)

})()
```

### `page.addScriptTag()` 向页面插入 `<script></script>` 标签

一般来说就是注入 `jQuery`，反正就是向网页插入一个 `<script></script>` 标签

```js
;(async ()=>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({
          headless: false,
          //headless: 'new', //headless: "new" 来提前选择新版无头模式。
          defaultViewport: null,
          args: [
            `--window-size=700,700`, // 打开窗口大小
          ]
    })

    // 创建一个 tap 页面
    const page = await browser.newPage()
    // 输入地址
    await page.goto(`https://www.******.com/user`)

    await page.addScriptTag({
        url:'https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.js'
    })

    // 不过还有一个方法 现代浏览器可用

    await page.evaluate(async ()=>{
        const $ = await import(`data:text/javascript,https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.js`);
    })

    /************************************************************** */

    // 你想也是使用 page.$ 获取在模拟输入 那个容易按那个来咯
    await page.evaluate((pwd)=>{
        $('#edtUserName').val('admin')
        $('#edtUserName').val(pwd)
        $('#but').click()
    },pwd)

})()
```

### `page.evaluate(()=>{})` 注入 `js` 脚本

向页面注入 `js` 脚本执行，可以传入参数，当然也可以返回数据，你想干啥干啥

```js
;(async ()=>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({
          headless: false,
          //headless: 'new', //headless: "new" 来提前选择新版无头模式。
          defaultViewport: null,
          args: [
            `--window-size=700,700`, // 打开窗口大小
          ]
    })

    // 创建一个 tap 页面
    const page = await browser.newPage()
    // 输入地址
    await page.goto(`https://www.baidu.com`)

    const listText = await page.evaluate(()=>{
        let val = document.querySelector('#kw')
        val.value = 'puppeteer'
        document.querySelector('#su').click()
        let list = []
        return Array.from(document.querySelectorAll('p')).map( v => v.innerHTML)
    })
})()
```

### `page.content()` 等待网页渲染完毕

等待网页渲染完毕，只对同步的网页有效，异步渲染就无效了

```js
;(async ()=>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({
          headless: false,
          //headless: 'new', //headless: "new" 来提前选择新版无头模式。
          defaultViewport: null,
          args: [
            `--window-size=700,700`, // 打开窗口大小
          ]
    })

    // 创建一个 tap 页面
    const page = await browser.newPage()
    // 输入地址
    await page.goto(`https://www.baidu.com`)
    
    // 等待网页渲染完毕
    await page.content('#kw')

    await page.evaluate(()=>{
        let val = document.querySelector('#kw')
        val.value = 'puppeteer'
        document.querySelector('#su').click()
    })
})()
```

### `page.waitForSelector()` 等待某个元素出现在页面上

如果你想等待某一个元素出现（渲染完毕可以获取到），可以使用 `page.waitForSelector()` 这个API，但是注意
**不会100%成功**，大部分的情况下都是可以的，少数情况下最好你要延时一下再执行，最后在获取

`page.waitForSelector('#id')` 是完全按照 `CSS选择器` 来选择元素

```js
;(async ()=>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({
          headless: false,
          //headless: 'new', //headless: "new" 来提前选择新版无头模式。
          defaultViewport: null,
          args: [
            `--window-size=700,700`, // 打开窗口大小
          ]
    })

    // 创建一个 tap 页面
    const page = await browser.newPage()
    // 输入地址
    await page.goto(`https://www.baidu.com`)
    
    // 等待搜索框出现
    await page.waitForSelector('#kw')

    await page.evaluate(()=>{
        let val = document.querySelector('#kw')
        val.value = 'puppeteer'
        document.querySelector('#su')
    })
})()
```

::: tip

```js
let val = document.querySelector('#kw')
val.value = 'puppeteer'
document.querySelector('#su')
```

这一段代码会插入到浏览器中执行，可以理解为使用了 `控制台` 执行了

:::

### `page.waitForResponse()` 拦截请求

`page.waitForResponse()`可以请求完成后，获取返回值，

比如点击后发起了某个请求后，你要拦截这个请求确认成功或其他方式，反正很有用

```js
;(async ()=>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({
          headless: false,
          //headless: 'new', //headless: "new" 来提前选择新版无头模式。
          defaultViewport: null,
          args: [
            `--window-size=700,700`, // 打开窗口大小
          ]
    })

    // 创建一个 tap 页面
    const page = await browser.newPage()
    // 输入地址
    await page.goto(`https://www.xxxxx.com`)
    // 等待搜索框出现
    await page.waitForSelector('#kw')
    // 模拟用户输入
    await input.type('puppeteer')
    // 获取 按钮
    const but = await page.$('#su')
    await but.click()

    await page.waitForResponse( response =>{
      if (
        response.url() === 'https://www.xxxxx.com/adduser' &&
        response.status() === 200
      ) {
        return response.json()
      }
      return Promise.resolve(false)
    })
})()
```

### `page.waitForNavigation()` 等待url跳转完毕

目前我的理解为就是 `等待url跳转完毕`，用法就是在页面你点击了按钮跳转那怎么知道跳转了呢，
如果这个是在当前 `tab` 页跳转，那就试试这个，

> 别问为什么，反正能跑 (╬▔▽▔)凸

```js
;(async ()=>{
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch({
          headless: false,
          //headless: 'new', //headless: "new" 来提前选择新版无头模式。
          defaultViewport: null,
          args: [
            `--window-size=700,700`, // 打开窗口大小
          ]
    })

    // 创建一个 tap 页面
    const page = await browser.newPage()
    // 输入地址
    await page.goto(`https://www.xxxxx.com`)
    // 获取 跳转按钮按钮
    const but = await page.$('#su')

    await Promise.all([
        page3.waitForNavigation(),
        but.click()
    ])
})()
```

## 终极办法 `ai` 询问

::: tip 提醒
`Puppeteer`的文档并不友好，所以有时候问 `ai` 比你看文档爽多了，看那个文档还不如面相百度来的实在，所以最好是 `ai` 在来 `百度` 最后看文档
:::

### 其他技巧

```js
    // 聚焦input
    await page.focus('#input')
    // 按下 Control+A 键选中所有文本
    await page.keyboard.down('Control')
    await page.keyboard.press('A')
    await page.keyboard.up('Control')

    // 按下 Backspace 键删除选中的文本
    await page.keyboard.press('Backspace')
    // 输入
    const ipInput = await page.$('#input')
    await ipInput.type('ni ma')
```

#### 延时函数

借助 `async/await` 延时执行

```js
export function yanshi(time = 1000) {
  return new Promise((res) => {
    setTimeout(() => {
      res()
    }, time)
  })
}
```

### `node:worker_threads` node多线程并发操作

`node` 单线程虽然顺序执行容易理解但是有时候不够快，就需要并发操作，下面举个例子

::: tip
`node:worker_threads`的多线程是看不到 `log` 的所以只能返回 `error`注意代码流程做好处理
:::

有目录

```js
|-- index.js
|-- setIndex.js
```

```js
// setIndexSeo.js
const { parentPort, workerData } = require('worker_threads')
const puppeteer = require('puppeteer')
;(async () => {
  const { baseurl, datajson, cookieList } = workerData

  const browser = await puppeteer.launch({headless: 'new'})
  const page = await browser.newPage()
  await page.setCookie(...cookieList)
  await page.goto(`${baseurl}/set/index.html`)

  await page.evaluate((data) => {
    $('#input').val(data.value)
  }, datajson)

  const Submit = await page.$('[type="Submit"]')
  await Promise.all([page.waitForNavigation(), Submit.click()])
//   延时300毫秒 保险
  await yashi(300)
  await browser.close()
  
  parentPort.postMessage({ code: 200, mag: 'xxx设置完成' })
})().catch((err) => {
  parentPort.postMessage({ code: 500, err })
})
```

```js
// index.js
const { Worker } = require('node:worker_threads')
const puppeteer = require('puppeteer')
const path = require('node:path')

function newRunWorker(filename, data) {
  return () =>
    new Promise((resolve, reject) => {
      const worker = new Worker(path.join(__dirname, filename), {
        workerData: data
      })

      worker.on('message', resolve)
      worker.on('error', reject)
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`))
        }
      })
    })
}

;(async ()=>{
    const browser = await puppeteer.launch({
          // headless: false,
          headless: 'new', //headless: "new" 来提前选择新版无头模式。
          defaultViewport: null,
          args: [
            `--window-size=700,700`, // 打开窗口大小
          ]
    })

    // 创建一个 tap 页面
    const page = await browser.newPage()
    
    // 登录
    await page.goto(`https://www.xxx.com/login`)
    await pageLogin.waitForSelector('#btnPost')
    await pageLogin.evaluate(
      (data) => {
        $('#edtUserName').val('admin')
        $('#edtPassWord').val(data.pwd)
        $("input[type='checkbox']").prop('checked', true)
        $('#btnPost').click()
      },
      { pwd }
    )

    await pageLogin.waitForNavigation()
    let cookieList = await pageLogin.cookies()

    console.log('登录完成，获取cookie成功！ ===>')

    console.log('开始多线程 =============>')

    // 并发5次设置
    const workerFun = [
      newRunWorker('./setIndex.js', { value:1 }),
      newRunWorker('./setIndex.js', { value:2 }),
      newRunWorker('./setIndex.js', { value:3 }),
      newRunWorker('./setIndex.js', { value:4 }),
      newRunWorker('./setIndex.js', { value:5 }),
    ]
    const response = await Promise.all(workerFun.map((fn) => fn()))
    response.forEach((fv) => {
      console.log('多线程结果 =============>', fv)
    })

    browser.close()
    console.log('全部完成')
})()

```
