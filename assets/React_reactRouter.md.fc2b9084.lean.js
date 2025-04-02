import{_ as a,o as n,c as l,O as o}from"./chunks/framework.218070ce.js";const u=JSON.parse('{"title":"React 路由","description":"","frontmatter":{},"headers":[],"relativePath":"React/reactRouter.md","filePath":"React/reactRouter.md","lastUpdated":1743585365000}'),p={name:"React/reactRouter.md"};function e(t,s,r,c,B,y){return n(),l("div",null,s[0]||(s[0]=[o(`<h1 id="react-路由" tabindex="-1">React 路由 <a class="header-anchor" href="#react-路由" aria-label="Permalink to &quot;React 路由&quot;">​</a></h1><h2 id="react-router-6-react-路由-最详细教程" tabindex="-1">React Router 6 (React 路由) 最详细教程 <a class="header-anchor" href="#react-router-6-react-路由-最详细教程" aria-label="Permalink to &quot;React Router 6 (React 路由) 最详细教程&quot;">​</a></h2><p>本文首发：《<a href="https://link.juejin.cn?target=https%3A%2F%2Fkalacloud.com%2Fblog%2Freact-router-tutorial%2F" title="https://kalacloud.com/blog/react-router-tutorial/" target="_blank" rel="noreferrer">React Router 6 (React 路由) 最详细教程</a>》</p><p><strong>React Router</strong>  经历多个版本的发展，现在已经到了  <strong>React Router 6</strong>。虽然网络上写 React-Router 路由本身的教程很多，但真正讲到 React-Router 6 的并不多。同时因为第 6 版引入了很多新的概念，以及大量使用 Hook，因此网上的很多旧教程已经不实用了。这篇文章里我们总结  <a href="https://link.juejin.cn?target=https%3A%2F%2Fkalacloud.com%2Fblog%2Freact-router-tutorial%2F" title="https://kalacloud.com/blog/react-router-tutorial/" target="_blank" rel="noreferrer">React Router 6 路由器</a>的用法，用例子说明如何实现各种场景和需求，比如程序化跳转等等。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fbf442bfc0146fa92a002641c9f4e0e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="React Router 6"></p><p>在卡拉云中，我们也大量地使用了 React-Router 6，所以在讲解过程中我们会用一些在实际使用的例子来说明问题，但本文的主要例子会放在  <a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fkalacloud-inc%2Freact-router-6-tutorial" title="https://github.com/kalacloud-inc/react-router-6-tutorial" target="_blank" rel="noreferrer">github 仓库</a>中，方便你参考。如果你觉得有用，不妨分享和加星，或在博客中链回本文，让更多人看到。</p><h2 id="什么是-react-router" tabindex="-1">什么是 React-Router <a class="header-anchor" href="#什么是-react-router" aria-label="Permalink to &quot;什么是 React-Router&quot;">​</a></h2><p>要理解什么是 React-Router 就要先理解什么是 SPA (Single Page Application)，也就是俗称的单页应用。</p><p>每个单页应用其实是一系列的 JS 文件，当用户请求网站时，网站返回一整个(或一系列)的 js 文件和 HTML，而当用户在某个页面内点击时，你需要告诉浏览器怎么加载另一个页面地址。单页应用中通常只有一个  <code>index.html</code>  文件的，所以浏览器自带的  <code>&lt;a&gt;</code>  链接 tag 并不能用来做单页应用的跳转，因此你需要一个在 React 中的路由实现。</p><p>然而 React 框架本身是不带路由功能的，因此如果你需要实现路由功能让用户可以在多个单页应用中跳转的话，就需要使用 React-Router。</p><p>React-Router 从 2014 年开始开发，到现在已经经历了 6 次大版本迭代，而从它的使用者来看，Netflix, Twitter, Discord 等等大厂纷纷背书，因此 React-Router 已经基本成了在 React 中做路由的默认选项。如果你现在还在用老的版本，想要升级，那么可以参考<a href="https://link.juejin.cn?target=https%3A%2F%2Freactrouter.com%2Fdocs%2Fen%2Fv6%2Fupgrading%2Fv5" title="https://reactrouter.com/docs/en/v6/upgrading/v5" target="_blank" rel="noreferrer">升级教程</a>，否则的话可以一步步参考本文。</p><p>在读完本文后，你应该可搭起来如下这样的简单应用，用一个导航栏控制用户可以访问的页面，同时保护某些页面，必须在用户登录后才可以进入。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bf14475cb724d0098b382d514ca961c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="react-router示例"></p><p>虽然这个应用看起来简单，但是它却包含了 React-Router 中常见的功能和 API，包括</p><ul><li>BrowserRouter</li><li>Link</li><li>Routes</li><li>Route</li><li>Outlet</li></ul><p>等等</p><h2 id="如何安装-react-router" tabindex="-1">如何安装 React-Router <a class="header-anchor" href="#如何安装-react-router" aria-label="Permalink to &quot;如何安装 React-Router&quot;">​</a></h2><p>安装 React-Router 非常简单，如果你使用的是 yarn 或者 npm，则用通常的安装方式即可</p><p>我们先用  <code>create-react-app</code>  脚手架建起一个 app 来</p><div class="language-lua line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#E06C75;">npx</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">create</span><span style="color:#ABB2BF;">-</span><span style="color:#E06C75;">react</span><span style="color:#ABB2BF;">-</span><span style="color:#E06C75;">app</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">react</span><span style="color:#ABB2BF;">-</span><span style="color:#E06C75;">router</span><span style="color:#ABB2BF;">-</span><span style="color:#D19A66;">6</span><span style="color:#ABB2BF;">-</span><span style="color:#E06C75;">tutorial</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>然后用 npm 安装 <code>npm install react-router-dom@6</code></p><p>这样 react-router 就安装好了。注意如果在 web 上的话，你需要的是  <code>react-router-dom</code>  而不是  <code>react-router</code>  这个包。<a href="https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fremix-run%2Freact-router%2Fissues%2F4648" title="https://github.com/remix-run/react-router/issues/4648" target="_blank" rel="noreferrer">它们的区别</a>是，后者包含了  <code>react-native</code>  中需要的一些组件，如果你只需要做网页应用的话，用前者就可以了</p><h2 id="react-router-api" tabindex="-1">React Router API <a class="header-anchor" href="#react-router-api" aria-label="Permalink to &quot;React Router API&quot;">​</a></h2><p>React Router 的 API 在它的<a href="https://link.juejin.cn?target=https%3A%2F%2Freactrouter.com%2Fdocs%2Fen%2Fv6%2Fapi" title="https://reactrouter.com/docs/en/v6/api" target="_blank" rel="noreferrer">官方文档</a>上已经介绍得比较清楚了，我们这里简单地总结一下几个可能用到的 API。具体的用法在下文中我们详细来讲，这里只是作为参考，如果碰上问题可以查一查</p><h3 id="browserrouter" tabindex="-1">BrowserRouter <a class="header-anchor" href="#browserrouter" aria-label="Permalink to &quot;BrowserRouter&quot;">​</a></h3><p>在 React Router 中，最外层的 API 通常就是用 BrowserRouter。BrowserRouter 的内部实现是用了  <code>history</code>  这个库和 React Context 来实现的，所以当你的用户前进后退时，<code>history</code>  这个库会记住用户的历史记录，这样需要跳转时可以直接操作。</p><p>BrowserRouter 使用时，通常用来包住其它需要路由的组件，所以通常会需要在你的应用的最外层用它，比如如下</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">ReactDOM</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;react-dom&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">*</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">as</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">React</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;react&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">BrowserRouter</span><span style="color:#ABB2BF;"> } </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;react-router-dom&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">App</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;./App&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E5C07B;">ReactDOM</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">render</span><span style="color:#ABB2BF;">(</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;</span><span style="color:#E5C07B;">BrowserRouter</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E5C07B;">App</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  &lt;/</span><span style="color:#E5C07B;">BrowserRouter</span><span style="color:#ABB2BF;">&gt;,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">document</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">getElementById</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&quot;app&quot;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="route" tabindex="-1">Route <a class="header-anchor" href="#route" aria-label="Permalink to &quot;Route&quot;">​</a></h3><p>Route 用来定义一个访问路径与 React 组件之间的关系。比如说，如果你希望用户访问  <code>https://your_site.com/about</code>  的时候加载  <code>&lt;About /&gt;</code>  这个 React 页面，那么你就需要用 Route:</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">Route</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">path</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;/about&quot;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">element</span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;">{</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">About</span><span style="color:#ABB2BF;"> /&gt;</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;"> /&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="routes" tabindex="-1">Routes <a class="header-anchor" href="#routes" aria-label="Permalink to &quot;Routes&quot;">​</a></h3><p>Routes 是用来包住路由访问路径(Route)的。它决定用户在浏览器中输入的路径到对应加载什么 React 组件，因此绝大多数情况下，Routes 的唯一作用是用来包住一系列的  <code>Route</code>，比如如下</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">Routes</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">Route</span><span style="color:#ABB2BF;"> } </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;react-router-dom&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">App</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> (</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E5C07B;">Routes</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      &lt;</span><span style="color:#E5C07B;">Route</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">path</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;/&quot;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">element</span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;">{</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">Home</span><span style="color:#ABB2BF;"> /&gt;</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      &lt;</span><span style="color:#E5C07B;">Route</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">path</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;/about&quot;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">element</span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;">{</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">About</span><span style="color:#ABB2BF;"> /&gt;</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;/</span><span style="color:#E5C07B;">Routes</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  );</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>在这里，Routes 告诉了 React Router 每当用户访问根地址时，加载  <code>Home</code>  这个页面，而当用户访问  <code>/about</code>  时，就加载  <code>&lt;About /&gt;</code>  页面。</p><h2 id="react-router-实操案例" tabindex="-1">React Router 实操案例 <a class="header-anchor" href="#react-router-实操案例" aria-label="Permalink to &quot;React Router 实操案例&quot;">​</a></h2><p>在上文中我们介绍了 React Router 的 API，余下全文中我们用一个实例来说明如何使用 React Router。</p><p>首先我们建起几个页面</p><p>xml</p><p>复制代码</p><p><code>&lt;Home /&gt; &lt;About /&gt; &lt;Dashboard /&gt;</code></p><p><code>Home</code>  用于展示一个简单的导航列表，<code>About</code>用于展示关于页，而  <code>Dashboard</code>  则需要用户登录以后才可以访问。</p><p>首先我们新建一个  <code>router.js</code>  文件，并在其中加载好 React-Router 组件</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;./App.css&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">BrowserRouter</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">Route</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">Routes</span><span style="color:#ABB2BF;"> } </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;react-router-dom&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">App</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> (</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E5C07B;">BrowserRouter</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      &lt;</span><span style="color:#E5C07B;">Routes</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E5C07B;">Route</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">path</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;/&quot;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">element</span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;">{</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">Home</span><span style="color:#ABB2BF;"> /&gt;</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      &lt;/</span><span style="color:#E5C07B;">Routes</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;/</span><span style="color:#E5C07B;">BrowserRouter</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  );</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">Home</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> () </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;hello world&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;;</span></span>
<span class="line"><span style="color:#ABB2BF;">};</span></span>
<span class="line"><span style="color:#C678DD;">export</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">default</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">App</span><span style="color:#ABB2BF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>这里我们直接在  <code>App.js</code>  中加上一个叫 Home 的组件，里面只是单纯地展示  <code>hello wolrd</code>  而已。接下来，我们再把另外两个路径写好，加入 About 和 Dashboard 两个组件</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;./App.css&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">BrowserRouter</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">Route</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">Routes</span><span style="color:#ABB2BF;"> } </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;react-router-dom&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">App</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> (</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E5C07B;">BrowserRouter</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      &lt;</span><span style="color:#E5C07B;">Routes</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E5C07B;">Route</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">path</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;/&quot;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">element</span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;">{</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">Home</span><span style="color:#ABB2BF;"> /&gt;</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E5C07B;">Route</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">path</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;/about&quot;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">element</span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;">{</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">About</span><span style="color:#ABB2BF;"> /&gt;</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E5C07B;">Route</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">path</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;/dashboard&quot;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">element</span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;">{</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">Dashboard</span><span style="color:#ABB2BF;"> /&gt;</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      &lt;/</span><span style="color:#E5C07B;">Routes</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;/</span><span style="color:#E5C07B;">BrowserRouter</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  );</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">Home</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> () </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;hello world&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;;</span></span>
<span class="line"><span style="color:#ABB2BF;">};</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">About</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> () </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;这里是卡拉云的主页&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;;</span></span>
<span class="line"><span style="color:#ABB2BF;">};</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">Dashboard</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> () </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;今日活跃用户: 42&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;;</span></span>
<span class="line"><span style="color:#ABB2BF;">};</span></span>
<span class="line"><span style="color:#C678DD;">export</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">default</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">App</span><span style="color:#ABB2BF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>此时，当我们在浏览器中切换到  <code>/</code>  或  <code>/about</code>  或  <code>/dashboard</code>  时，就会显示对应的组件了。注意，在上面每个  <code>Route</code>  中，用  <code>element</code>  项将组件传下去，同时在  <code>path</code>  项中指定路径。在  <code>Route</code>  外，用  <code>Routes</code>  包裹起整路由列表。</p><p>写到这里，我们其实已经完成了一个基本的路由功能，对于绝大多数可以公开访问的网站(或者内部系统)，这差不多就已经完结的。但有时，你可能希望知道用户所在的路径，来做一些对应显示和特殊逻辑处理，或者是你需要让用户鉴权后才能访问某个路径，那么你需要继续读一下后文几个章节</p><h2 id="如何获取当前页路径" tabindex="-1">如何获取当前页路径 <a class="header-anchor" href="#如何获取当前页路径" aria-label="Permalink to &quot;如何获取当前页路径&quot;">​</a></h2><p>如何在 React-Router 中获取当前用户在访问的页面的路径？其实很简单，在 React-Rotuer 6 中，提供了一个 hook 钩子，专门用来获得当前路径。在上文的例子中，我们只需要在对应的页面里，比如  <code>About</code>  中，加上这个 hook 就可以了</p><p>首先我们导入  <code>useLocation</code>  这个 hook，然后仿照如下代码就可以获得当前位置</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">useLocation</span><span style="color:#ABB2BF;"> } </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&quot;react-router-dom&quot;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">About</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> () </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#7F848E;font-style:italic;">// 使用 hook</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">location</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">useLocation</span><span style="color:#ABB2BF;">();</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> { </span><span style="color:#E5C07B;">from</span><span style="color:#ABB2BF;">, </span><span style="color:#E5C07B;">pathname</span><span style="color:#ABB2BF;"> } </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">location</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> (</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      这里是卡拉云的网站，你当前在 </span><span style="color:#C678DD;">{</span><span style="color:#E06C75;">pathname</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;">，你是从 </span><span style="color:#C678DD;">{</span><span style="color:#E06C75;">from</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;"> 跳转过来的</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  );</span></span>
<span class="line"><span style="color:#ABB2BF;">};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="如何设置默认页路径-如-404-页" tabindex="-1">如何设置默认页路径(如 404 页) <a class="header-anchor" href="#如何设置默认页路径-如-404-页" aria-label="Permalink to &quot;如何设置默认页路径(如 404 页)&quot;">​</a></h2><p>在上文的路由列表  <code>Routes</code>  中，我们可以加入一个  <code>catch all</code>  的默认页面，比如用来作 404 页面。</p><p>我们只要在最后加入  <code>path</code>  为  <code>*</code>  的一个路径，意为匹配所有路径，即可</p><p>javascript</p><p>复制代码</p><div class="language-jsx line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">App</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> (</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;</span><span style="color:#E5C07B;">BrowserRouter</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      &lt;</span><span style="color:#E5C07B;">Routes</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E5C07B;">Route</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">path</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;/&quot;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">element</span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;">{</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">Home</span><span style="color:#ABB2BF;"> /&gt;</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E5C07B;">Route</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">path</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;/about&quot;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">element</span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;">{</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">About</span><span style="color:#ABB2BF;"> /&gt;</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E5C07B;">Route</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">path</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;/dashboard&quot;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">element</span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;">{</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">Dashboard</span><span style="color:#ABB2BF;"> /&gt;</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">        &lt;</span><span style="color:#E5C07B;">Route</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">path</span><span style="color:#56B6C2;">=</span><span style="color:#98C379;">&quot;*&quot;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;font-style:italic;">element</span><span style="color:#56B6C2;">=</span><span style="color:#C678DD;">{</span><span style="color:#ABB2BF;">&lt;</span><span style="color:#E5C07B;">NotFound</span><span style="color:#ABB2BF;"> /&gt;</span><span style="color:#C678DD;">}</span><span style="color:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">      &lt;/</span><span style="color:#E5C07B;">Routes</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">    &lt;/</span><span style="color:#E5C07B;">BrowserRouter</span><span style="color:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="color:#ABB2BF;">  );</span></span>
<span class="line"><span style="color:#ABB2BF;">} </span><span style="color:#7F848E;font-style:italic;">// 用来作为 404 页面的组件</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">NotFound</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> () </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> &lt;</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;你来到了没有知识的荒原&lt;/</span><span style="color:#E06C75;">div</span><span style="color:#ABB2BF;">&gt;;</span></span>
<span class="line"><span style="color:#ABB2BF;">};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>当然你可以把 404 页面做得更好看一点，比如卡拉云中如果访问不存在的链接的话，404 页面如下</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e09a3d838e8d4518822a8da5c379cac5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="卡拉云 404 页面"></p><h2 id="如何用-react-router-鉴权并保护路径" tabindex="-1">如何用 React Router 鉴权并保护路径 <a class="header-anchor" href="#如何用-react-router-鉴权并保护路径" aria-label="Permalink to &quot;如何用 React Router 鉴权并保护路径&quot;">​</a></h2><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>本文中我们介绍了如何使用 React-Router，用一个实例说明 React Router 6 中的 API，以及常见的使用场景等。如果你对我们的技术博客感兴趣，欢迎继续阅读</p><ul><li><a href="https://link.juejin.cn?target=https%3A%2F%2Fkalacloud.com%2Fblog%2Fvideo-js-tutorial%2F" title="https://kalacloud.com/blog/video-js-tutorial/" target="_blank" rel="noreferrer">Vue Video.js 教程</a></li><li><a href="https://link.juejin.cn?target=https%3A%2F%2Fkalacloud.com%2Fblog%2Fhow-to-force-vue-to-re-render-component%2F" title="https://kalacloud.com/blog/how-to-force-vue-to-re-render-component/" target="_blank" rel="noreferrer">Vue 强制刷新</a></li><li><a href="https://link.juejin.cn?target=https%3A%2F%2Fkalacloud.com%2Fblog%2Fvue-echarts-line-tutorial%2F" title="https://kalacloud.com/blog/vue-echarts-line-tutorial/" target="_blank" rel="noreferrer">Echarts 折线图如何配置</a></li><li><a href="https://link.juejin.cn?target=https%3A%2F%2Fkalacloud.com%2Fblog%2Fbest-modal-popup-dialog%2F" title="https://kalacloud.com/blog/best-modal-popup-dialog/" target="_blank" rel="noreferrer">Vue 弹窗</a></li></ul>`,64)]))}const F=a(p,[["render",e]]);export{u as __pageData,F as default};
