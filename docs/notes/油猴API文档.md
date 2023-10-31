# Tampermonkey 油猴用户脚本 API 文档

> 官方文档地址： [www.tampermonkey.net/documentati…](https://link.juejin.cn?target=https%3A%2F%2Fwww.tampermonkey.net%2Fdocumentation.php%3Fext%3Ddhdg%23GM_openInTab 'https://www.tampermonkey.net/documentation.php?ext=dhdg#GM_openInTab')

## Header

每一个油猴脚本都有这个头部注释，是油猴监本的配置选

```js
// ==UserScript==
// @name         油猴脚本 Header
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://baidu.com/
// @match        https://baidu.com/site/*
// @match        https://baidu.com/property/*
// @connect      *
// @grant        GM_xmlhttpRequest
// @require      file://E:/**/**/baidu.js
// ==/UserScript==
```

## `@name`

脚本名称

## `@namesapce`

描述脚本的命名空间，默认是 `http://tampermonkey.net/`

`@namespace` 及 `@name` 这两个属性将帮助用户脚本管理器判断是否已安装该脚本

## `@version`

描述脚本版本，默认 0.1 这用于更新检查，以防脚本未从 userscript.org 安装或在检索脚本元数据时出现问题。

## `@author`

描述编写脚本的作者信息

## `@description`

关于脚本的简述，脚本发布时，必须修改其内容，不能使用默认的。

## `@homepage`、`@homepageURL`、`@website`、`@source`

在“选项”页上用于从脚本名链接到给定页的作者主页。请注意，如果 `@namespace` 标记以 `http://` 开头，则其内容也将用于此操作

## `@icon`、`@iconURL`、`@defaulticon`

低分率的脚本会在脚本管理列表上显示，链接地址可以为 `http://` 或者 `https://`

![png](https://img-blog.csdnimg.cn/20210628134915155.png)

## `@icon64`、`@icon64URL`

脚本 icon 64\*64 如果给了这个标签，但给了图标，则图标图像将在选项页的某些位置缩放

## `@updateURL`

更新脚本的地址，注意：只有存在@version 标签才会去更新

## `@downloadURL`

定义检测到更新时将从中下载脚本的 URL。如果值为 none，则不会执行更新检查。

## `@supportURL`

定义使用者报告 issues 和个人支持的地址

## `@include`

设置脚本在哪些网页中可以运行，允许设置多个标签。可以使用正则匹配,`@include` 不支持 URL hash 参数。

```js
@include http://123.com/*
@include https://123.com/*
@include https://*
```

## `@match`

和@include 标签差不多的意思，
注意： 尚不支持 `<all-urls>` 语句，scheme 部分也接受 `http*：//`。
允许多个标记实例。

```js
@match http*:
@match http://123.com/*
@match https://123.com/*
@match https://*
```

## `@exclude`

排除的 URL， 在这些页面不运行脚本， 即使地址包含在 `@include`或`@match`标签内。允许设置多个。

```js
@match http://456.com/*   可以运行
@exclude http://123.com/*  不可以运行
@match http://456.com/*    不可以运行，被排除了
@exclude http://789.com/*  不可以运行
```

## `@require`

表示在运行脚本前需要加载和运行的 JavaScript 文件。允许设置多个。 注：如果加载的脚本使用`use strict`模式，用户脚本可能也会受严格模式影响。
一般都是引入操作 dom 的库，jq，vue，react 都行看你，然后网络库都不能使用就不要引入了，还有什么不能引入的就不知道了，一般都是一个 jq 搞定了。

```js
@require https://code.jquery.com/jquery-2.1.4.min.js
@require https://code.jquery.com/jquery-2.1.3.min.js#sha256=23456...
@require https://code.jquery.com/jquery-2.1.2.min.js#md5=34567...,sha256=6789..
@require https://unpkg.com/vue@3/dist/vue.global.js
@require https://unpkg.com/react-dom@18/umd/react-dom.development.js
```

## `@resource`

定义一些需要预加载的资源文件，这些资源可以在脚本中通过`GM_getResourceURL`，`GM_getResourceText`访问。允许设置多个。

复制代码

```js
@resource icon2 /images/icon.png
@resource html http://www.tampermonkey.net/index.html
@resource xml http://www.tampermonkey.net/crx/tampermonkey.xml
@resource SRIsecured1 http://www.tampermonkey.net/favicon.ico#md5=123434...
```

## `@connect`

设置允许通过`GM_xmlhttpRequest`连接访问的域名（包括子域名）。

`@connect` 标签允许设置的值：

- 域名，如`tampermonkey.net`, 设置后该域名下的所有子域名都是允许访问的
- 子域名，如`safari.tampermonkey.net`
- `self` 当前脚本正在运行的域名
- `localhost`
- `1.2.3.4` 允许连接的 IP 地址
- `*` 所有域名

如果无法声明用户脚本可能连接到的所有域，则最好执行以下操作：

**声明所有已知或至少所有可能由脚本连接的公共域**。这样，大多数用户都可以避免确认对话框。

另外在脚本中添加 `@connect *`。
通过这样做，tampermonkey 仍然会询问用户是否允许下一个连接到未提及的域，但也会提供一个**总是允许所有域**按钮。

如果用户单击此按钮，则将自动允许所有未来的请求。用户还可以通过在**脚本设置**选项卡
的用户域白名单中添加 `*` 来白名单所有请求。

注意：

初始 url 和最终的 url 都会被检查，为了向后兼容 scriptish@domain 标记也会被解释。
允许多个标记实例。

## `@run-at`

GPT 翻译：
"脚本注入的时机"是指脚本被执行的时间点。与其他脚本处理程序不同，@run-at 指定了脚本希望运行的最早可能时刻。这意味着，如果使用了@require 标签的脚本在获取所需的脚本时花费了很长时间，它可能会在文档已经加载完之后才被执行。无论如何，所有发生在给定注入时刻之后的 DOMNodeInserted 和 DOMContentLoaded 事件都会被缓存，并在脚本注入时传递给该脚本。

`@run-at document-start`

脚本在最早的时刻被注入

`@run-at document-body`

当 body 元素存在时脚本被注入

`@run-at document-end`

脚本在 DOMContentLoaded 事件**发生时或之后**被注入

`@run-at document-idle `

脚本在 DOMContentLoaded 事件**发生后**被注入. 当没有设置@run-at 标签时,会采用该值作为默认值

`@run-at content-menu`

当在浏览器点击鼠标右键时,脚本被注入(只支持桌面版 Chrome 浏览器)注: 当该值设置的时候, 所有的@include 和@exclude 声明会被忽略, 将来可能会有调整.

## `@grant`

`@grant`标签用于设置`GM_*`方法， `unsafeWindow`对象， `window`对象方法的白名单。如果没有提供@grant 标签，TM（脚本管理器）会猜测脚本所需的权限。

```js
@grant GM_setValue
@grant GM_getValue
@grant GM_setClipboard
@grant unsafeWindow
@grant window.close
@grant window.focus
```

由于关闭和聚焦选项卡是一个强大的功能，因此还需要将其添加到@grant 语句中。

如果后跟 `@grant none`，沙盒将被禁用，脚本将直接在页面上下文中运行。

在此模式下，没有`GM_*`函数，但`GM_uinfo`属性将可用。

## `@noframes`

这个标签表明脚本在主页面上运行，而不是在 iframes 里

## `@unwrap`

这个标签是被忽略的，因为他在谷歌浏览器里不需要

## `@nocompat`

目前，tm 试图通过查找 `@match` 标记来检测脚本是否是在 google chrome/chromium 的知识中编写的，但并不是每个脚本都使用它。

这就是为什么 tm 支持这个标签来禁用运行为 firefox/greasemonkey 编写的脚本所需的所有优化。

要保持此标记可扩展，可以添加可由脚本处理的浏览器名称。

示例：`@nocompat Chrome`

## API 或 GM\_\* 方法

## `unsafeWindow`

`unsafeWindow` 对象提供权限访问页面的 js 函数和变量

## `Subresource Integrity` 子资源完整性

可以使用@resource 和@require 标记的 url 的散列组件来实现此目的。

示例：

```js
@resource SRIsecured1 http://www.tampermonkey.net/favicon1.ico#md5=ad34bb...
@resource SRIsecured2 http://www.tampermonkey.net/favicon2.ico#md5=ac3434...,sha256=23fd34...
@require https://code.jquery.com/jquery-2.1.1.min.js#md5=45eef...
@require https://code.jquery.com/jquery-2.1.2.min.js#md5=ac56d...,sha256=6e789...
```

TM 本机支持 MD5 哈希作为回退，所有其他（SHA-1、SHA-256、SHA-384 和 SHA-512）都依赖于 window.crypto。

如果给定了多个散列（用逗号或分号分隔），则 TM 将使用当前支持的最后一个散列。

如果外部资源的内容与所选哈希不匹配，则资源不会传递到用户脚本。

所有散列都需要以十六进制或 base64 格式编码。

## `GM_addStyle(css)`

将给定样式添加到文档中并返回注入的样式元素

示例与注意事项：

```js
var ads = [
  'iframe',
  '.layout-header',
  '.layout-footer',
  '.xuexi',
  '.WNiH6aSBS23IzewzHGi4v',
  'audio',
  '.redflag-2',
  "div[style='background-repeat: no-repeat;']",
  '.my-points-section .earn-header',
  'img'
]
for (var i = 0; i < ads.length; i++) {
  GM_addStyle(ads[i] + '{display:none}')
}

GM_addStyle('.my-points-card {height:150px !important}')
GM_addStyle('* {margin-top:0px !important; margin-left:0px !important}')
```

1. GM_addStyle 可以自动遍历这里.my-points-card 是一个元素数组及多个 div 公用一个 class GM_addStyle 将所有元素都添加了指定属性。
2. - 指所有元素，使用要小心。

```js
GM_addStyle('.my-points-card,.layout-header{height:150px !important}')
GM_addStyle('* {margin-top:0px !important; margin-left:0px !important}')
```

括号内可以指定多个元素或属性，中间用逗号或分号隔开。其实也就是和正常的写 CSS 一样

## `GM_deleteValue(name)`

删除 **name** 从 **storage** 里

## `GM_listValues()`

列出 **storage** 中的所有 **name**

## `GM_addValueChangeListener(name, function(name, old_value, new_value, remote) {})`

`GM_addValueChangeListener(name, function(name, old_value, new_value, remote) {})`

在 storage 里添加一个改变事件的监听，并返回监听 id

`name` 是被观察的变量

回调函数的 `remote` 变量是显示此值是从另一个选项卡的实例修改的 `true` 还是在此脚本实例中修改的 `false` 。

因此，不同浏览器选项卡的脚本可以使用此功能相互通信。

可以使用此 API 实现不同浏览器 Tab 的相互通讯

## `GM_removeValueChangeListener(listener_id)`

通过监听器的 id 移除一个监听改变的事件

## `GM_setValue(name, value)`

设置 **name** 的值到 **storage** 中

## `GM_getValue(name, defaultValue)`

从 **storage** 里面获取 **name** 的值

## `GM_log(message)`

在控制台打印日志，直接用 `console.log()` 也行，debug 也行

## `GM_getResourceText(name)`

获取在脚本头部用 `@resource` 标签预定义的的内容

## `GM_getResourceURL(name)`

获取在脚本头部用 `@resource` 标签预定义的的 base64 编码的 URI

## `GM_registerMenuCommand(name, fn, accessKey)`

注册一个能在页面上能够显示TM菜单命令，当这个脚本执行是，并且返回菜单命令id

意思就是可以注册一个直接显示TM的菜单的ming

## `GM_unregisterMenuCommand(menuCmdId)`

取消注册一个菜单命令根据菜单命令ID(**通过GM_registerMenuCommand 提供的**)

## `GM_openInTab(url, options), GM_openInTab(url, loadInBackground)`

使用参数url打开一个新的标签页，options可以是以下值

- `active` 定义焦点是否在新标签页上
- `insert`
- `setParent`

另外，新的选项卡将被添加。loadinbackground具有与active相反的含义，并被添加以实现Greasemonkey 3.x兼容性。

如果未指定“活动”或“加载后台”，则选项卡将不会聚焦。此函数返回一个具有函数close、侦听器onclosed和一个名为closed的标志的对象。

## `GM_xmlhttpRequest(details)`

创建一个xmlHttpRequest，在油猴中使用这个函数来进行 **ajax** 请求，好像还可以使用 `Fetch` ，自己实践吧 2023-10-17 前，会更新

参数 `details` 的属性有:

+   `method` 可以是 GET, HEAD, POST其中一种
+   `url` 请求的url
+   `headers` 如： user-agent, referer, ... (一些特殊的 headers 不被支持在Safari and Android 浏览器里)
+   `data` 一些字符串有post请求发送过去
+   `binary` 说过binary 模式，类型发送数据
+   `timeout` 超时时间
+   `context` 被添加到response对象上的对象
+   `responseType` 可以是 arraybuffer, blob, json
+   `overrideMimeType` 请求的 MIME type
+   `anonymous` 在请求中不需要发送cookies，详细请看fetch 注释
+   `fetch` (beta) 使用一个fetch来代替xhr请求， 在chrome中，这会导致xhr.abort、details.timeout和xhr.onprogress不工作，并使xhr.onreadystatechange仅接收readystate 4事件
+   `username` 授权的用户名
+   `password` 授权的用户密码
+   `onabort` 请求中断时执行的回调函数
+   `onerror` 请求以错误结束时需要执行的回调函数
+   `onloadstart` 请求开始加载时执行的回调函数
+   `onprogress` 请求状态变化时执行的回调函数
+   `onreadystatechange` 请求的准备状态改变是执行的回调函数
+   `ontimeout` 超时后执行的回调函数
+   `onload` 当请求被返回时执行的回调函数 ，他的几个参数如下
    +   `finalUrl` - 从加载数据的位置进行所有重定向后的最终 URL
    +   `readyState` - 就绪状态
    +   `status` - 状态码
    +   `statusText` - 请求状态文本
    +   `responseHeaders` - 响应头 
    +   `response` - 如果设置了details.responseType，则响应数据作为对象
    +   `responseXML` - 作为 XML 文档的响应数据
    +   `responseText` - 作为纯字符串的响应数据


返回的对象包含以下属性 
 +  `abort` - 取消请求的函数

注意：不支持详细信息处的同步标志重要提示：如果您想使用此方法，请同时查看有关@connect的文档。

## `GM_download(details)`、`GM_download(url, name)`

下载 URL 指定资源到本地磁盘

`details` 可以有如下属性:

- `url` - 下载地址 (必需)
- `name` - 文件名 - 由于安全原因需要在 Tampermonkey 的配置页把文件扩展名设为白名单（_for security reasons the file extension needs to be whitelisted at Tampermonkey's options page_） (必需)
- `headers` - 参见 `GM_xmlhttpRequest`
- `saveAs` - `boolean`, 弹出“保存为”的弹框
- `onerror` - 下载失败的回调
- `onload` - 下载完成回调
- `onprogress` 下载进度变化时的回调
- `ontimeout` 由于超时导致下载失败时的回调

`onerror` 回调函数的参数：

- `error` - 失败原因
  - `not_enabled` - 用户不能使用下载功能
  - `not_whitelisted` - 下载文件后缀不在白名单内
  - `not_permitted` - 用户启用了下载功能，但没有授予下载权限
  - `not_supported` - 浏览器/版本不支持下载功能
  - `not_succeeded` - 下载未开始或失败，详细信息属性可能提供更多信息
- `details` 关于错误的详细信息

返回具有以下属性的对象：
- `abort` - 要调用的函数以取消此下载

根据下载模式 `GM_info` 提供一个名为downloadMode的属性，该属性设置为以下值之一：**native、disabled或browser**。

下载扩展白名单如图所示：


![下载扩展白名单](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/15/16e6d3ac0c5dd527~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp)

> Chrome 可以使用 Tampermonkey 的 GM_download 函数绕过 CSP(Content Security Policy) 的限制

## `GM_getTab(callback)`

只要此选项卡处于打开状态，就获取一个持久对象。

## `GM_saveTab(tab)`

保存选项卡对象以在页面卸载后重新打开它。

## `GM_getTabs(callback)`

获取所有选项卡对象作为散列以与其他脚本实例通信。

## `GM_notification(details, ondone)` `GM_notification(text, title, image, onlick)`

显示一个 H5 桌面通知，并/或 高亮显示当前 Tab

`details` 有如下特性:

- `text` - 通知的文本 (需要 `highlight` 设置为`false`)
- `title` - 通知的标题
- `image` - 图片
- `highlight` - `boolean` 是否高亮发送通知的标签页 (未设置`text`时)
- `silent` - `boolean` 是否播放提示音
- `timeout` - `timeout` 设置的时间之后通知会被隐藏 (0 = disabled)
- `ondone` - 通知被关闭时调用 (no matter if this was triggered by a timeout or a click) or the tab was highlighted
- `onclick` - 用户点击通知时调用

## `GM_setClipborad(data, info)`

将数据复制到剪贴板。参数 `info` 可以是像 `{ type: 'text', mimetype: 'text/plain'}` 这样的对象，或者只是一个表示类型的字符串（text或html）。

## `GM_info`

获取有关脚本和油猴的一些信息。该对象可能如下所示：

```js
Object+
---> script: Object+
------> author: ""
------>copyright: "2012+, You"
------>description: "enter something useful"
------>excludes: Array[0]
------>homepage: null
------>icon: null
------>icon64: null
------>includes: Array[2]
------>lastUpdated: 1338465932430
------>matches: Array[2]
------>downloadMode: 'browser'
------>name: "Local File Test"
------>namespace: "http://your.homepage/"
------>options: Object+
--------->awareOfChrome: true
--------->compat_arrayleft: false
--------->compat_foreach: false
--------->compat_forvarin: false
--------->compat_metadata: false
--------->compat_prototypes: false
--------->compat_uW_gmonkey: false
--------->noframes: false
--------->override: Object+
------------>excludes: false
------------>includes: false
------------>orig_excludes: Array[0]
------------>orig_includes: Array[2]
------------>use_excludes: Array[0]
------------>use_includes: Array[0]
--------->run_at: "document-end"
------>position: 1
------>resources: Array[0]
------>run-at: "document-end"
------>system: false
------>unwrap: false
------>version: "0.1"
---> scriptMetaStr: undefined
---> scriptSource: "// ==UserScript==\n// @name       Local File Test\n ...."
---> scriptUpdateURL: undefined
---> scriptWillUpdate: false
---> scriptHandler: "Tampermonkey"
---> isIncognito: false
---> isFirstPartyIsolation: false
---> version: "4.0.25"
```

`<><![CDATA[your_text_here]]></>`
Tampermonkey 支持这种存储元数据的方式。油猴尝试自动检测脚本是否需要启用此兼容性选项。

Greasy Fork发布脚本注意事项
1.不能使用脚本默认描述
2.在Greasy Fork发布的脚本只能在Greasy Fork上更新

![png](https://img-blog.csdnimg.cn/202107091144305.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2dvb2RfZ29vZF94aXU=,size_16,color_FFFFFF,t_70)