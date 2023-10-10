import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.d6ec958f.js";const d=JSON.parse('{"title":"JavaScript 基础-5 篇","description":"","frontmatter":{},"headers":[],"relativePath":"JavaScript/JavaScript基础-05.md","filePath":"JavaScript/JavaScript基础-05.md","lastUpdated":1696918359000}'),p={name:"JavaScript/JavaScript基础-05.md"},o=l(`<h1 id="javascript-基础-5-篇" tabindex="-1">JavaScript 基础-5 篇 <a class="header-anchor" href="#javascript-基础-5-篇" aria-label="Permalink to &quot;JavaScript 基础-5 篇&quot;">​</a></h1><h2 id="_1-作用域" tabindex="-1">1 - 作用域 <a class="header-anchor" href="#_1-作用域" aria-label="Permalink to &quot;1 - 作用域&quot;">​</a></h2><h3 id="_1-1-作用域概述" tabindex="-1">1.1 作用域概述 <a class="header-anchor" href="#_1-1-作用域概述" aria-label="Permalink to &quot;1.1 作用域概述&quot;">​</a></h3><p>通常来说，一段程序代码中所用到的名字并不总是有效和可用的，而限定这个名字的可用性的代码范围就是这个名字的作用域。作用域的使用提高了程序逻辑的局部性，增强了程序的可靠性，减少了名字冲突。 JavaScript（es6 前）中的作用域有两种：</p><ul><li>全局作用域</li><li>局部作用域（函数作用域）</li></ul><h3 id="_1-2-全局作用域" tabindex="-1">1.2 全局作用域 <a class="header-anchor" href="#_1-2-全局作用域" aria-label="Permalink to &quot;1.2 全局作用域&quot;">​</a></h3><pre><code>作用于所有代码执行的环境(整个 script 标签内部)或者一个独立的 js 文件。
</code></pre><h3 id="_1-3-局部作用域" tabindex="-1">1.3 局部作用域 <a class="header-anchor" href="#_1-3-局部作用域" aria-label="Permalink to &quot;1.3 局部作用域&quot;">​</a></h3><pre><code>作用于函数内的代码环境，就是局部作用域。 因为跟函数有关系，所以也称为函数作用域。
</code></pre><h3 id="_1-4-js-没有块级作用域" tabindex="-1">1.4 JS 没有块级作用域 <a class="header-anchor" href="#_1-4-js-没有块级作用域" aria-label="Permalink to &quot;1.4 JS 没有块级作用域&quot;">​</a></h3><ul><li><p>块作用域由 { } 包括。</p></li><li><p>在其他编程语言中（如 java、c#等），在 if 语句、循环语句中创建的变量，仅仅只能在本 if 语句、本循环语句中使用，如下面的 Java 代码：</p><p>java 有块级作用域：</p><div class="language-java line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">if</span><span style="color:#E06C75;">(</span><span style="color:#D19A66;">true</span><span style="color:#E06C75;">){</span></span>
<span class="line"><span style="color:#E06C75;">  </span><span style="color:#C678DD;">int</span><span style="color:#E06C75;"> num </span><span style="color:#56B6C2;">=</span><span style="color:#E06C75;"> </span><span style="color:#D19A66;">123</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E06C75;">  </span><span style="color:#E5C07B;">system</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">out</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">print</span><span style="color:#ABB2BF;">(num);</span><span style="color:#E06C75;">  </span><span style="color:#7F848E;font-style:italic;">// 123</span></span>
<span class="line"><span style="color:#E06C75;">}</span></span>
<span class="line"><span style="color:#E5C07B;">system</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">out</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">print</span><span style="color:#ABB2BF;">(num);</span><span style="color:#E06C75;">    </span><span style="color:#7F848E;font-style:italic;">// 报错</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>以上 java 代码会报错，是因为代码中 { } 即一块作用域，其中声明的变量 num，在 “{ }” 之外不能使用；</p><p>而与之类似的 JavaScript 代码，则不会报错：</p><p>Js 中没有块级作用域（在 ES6 之前）</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">if</span><span style="color:#ABB2BF;"> (</span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">num</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">123</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">123</span><span style="color:#ABB2BF;">) </span><span style="color:#7F848E;font-style:italic;">//123</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">123</span><span style="color:#ABB2BF;">) </span><span style="color:#7F848E;font-style:italic;">//123</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li></ul><h2 id="_2-变量的作用域" tabindex="-1">2 - 变量的作用域 <a class="header-anchor" href="#_2-变量的作用域" aria-label="Permalink to &quot;2 - 变量的作用域&quot;">​</a></h2><pre><code>在JavaScript中，根据作用域的不同，变量可以分为两种：
</code></pre><ul><li><p>全局变量</p></li><li><p>局部变量</p><p>2.1 全局变量</p><pre><code>在全局作用域下声明的变量叫做全局变量（在函数外部定义的变量）。
</code></pre></li><li><p>全局变量在代码的任何位置都可以使用</p></li><li><p>在全局作用域下 var 声明的变量 是全局变量</p></li><li><p>特殊情况下，在函数内不使用 var 声明的变量也是全局变量（不建议使用）</p><p>2.2 局部变量</p><pre><code>在局部作用域下声明的变量叫做局部变量（在函数内部定义的变量）
</code></pre></li><li><p>局部变量只能在该函数内部使用</p></li><li><p>在函数内部 var 声明的变量是局部变量</p></li><li><p>函数的形参实际上就是局部变量</p><p>2.3 全局变量和局部变量的区别</p></li><li><p>全局变量：在任何一个地方都可以使用，只有在浏览器关闭时才会被销毁，因此比较占内存</p></li><li><p>局部变量：只在函数内部使用，当其所在的代码块被执行时，会被初始化；当代码块运行结束后，就会被销毁，因此更节省内存空间</p></li></ul><h2 id="_3-作用域链" tabindex="-1">3 - 作用域链 <a class="header-anchor" href="#_3-作用域链" aria-label="Permalink to &quot;3 - 作用域链&quot;">​</a></h2><p>只要是代码都一个作用域中，写在函数内部的局部作用域，未写在任何函数内部即在全局作用域中；如果函数中还有函数，那么在这个作用域中就又可以诞生一个作用域；根据在 [ <strong>内部函数可以访问外部函数变量</strong> ]的这种机制，用链式查找决定哪些数据能被内部函数访问，就称作作用域链 案例分析 1：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">f1</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">num</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">123</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">f2</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">num</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">f2</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">num</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">456</span></span>
<span class="line"><span style="color:#61AFEF;">f1</span><span style="color:#ABB2BF;">()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><img src="http://110.41.157.104/server/uploads/2023-10-10/28ea0724aa1696910521833.png" alt="images"></p><pre><code>作用域链：采取就近原则的方式来查找变量最终的值。
</code></pre><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">1</span></span>
<span class="line"><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">fn1</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">2</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">b</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;22&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">fn2</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">fn2</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">3</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#61AFEF;">fn3</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">fn3</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">4</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;">) </span><span style="color:#7F848E;font-style:italic;">//a的值 ?</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">b</span><span style="color:#ABB2BF;">) </span><span style="color:#7F848E;font-style:italic;">//b的值 ?</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#61AFEF;">fn1</span><span style="color:#ABB2BF;">()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><img src="http://110.41.157.104/server/uploads/2023-10-10/2b2214f2231696910521833.png" alt="images"></p><h2 id="_4-预解析" tabindex="-1">4 - 预解析 <a class="header-anchor" href="#_4-预解析" aria-label="Permalink to &quot;4 - 预解析&quot;">​</a></h2><p>4.1 预解析的相关概念</p><p>JavaScript 代码是由浏览器中的 JavaScript 解析器来执行的。JavaScript 解析器在运行 JavaScript 代码的时候分为两步：预解析和代码执行。</p><ul><li><p>预解析：在当前作用域下, JS 代码执行之前，浏览器会默认把带有 var 和 function 声明的变量在内存中进行提前声明或者定义。</p></li><li><p>代码执行： 从上到下执行 JS 语句。</p><p><strong>预解析会把变量和函数的声明在代码执行之前执行完成。</strong></p><p>4.2 变量预解析</p><pre><code>预解析也叫做变量、函数提升。
变量提升（变量预解析）： 变量的声明会被提升到当前作用域的最上面，变量的赋值不会提升。
</code></pre></li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">num</span><span style="color:#ABB2BF;">) </span><span style="color:#7F848E;font-style:italic;">// 结果是多少？</span></span>
<span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">num</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">10</span><span style="color:#ABB2BF;"> </span><span style="color:#7F848E;font-style:italic;">// ？</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><pre><code>结果：undefined

注意：**变量提升只提升声明，不提升赋值**
</code></pre><p>4.3 函数预解析</p><pre><code>函数提升： 函数的声明会被提升到当前作用域的最上面，但是不会调用函数。
</code></pre><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#61AFEF;">fn</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">fn</span><span style="color:#ABB2BF;">() {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;打印&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><pre><code>结果：控制台打印字符串 --- ”打印“

注意：函数声明代表函数整体，所以函数提升后，函数名代表整个函数，但是函数并没有被调用！
</code></pre><p>4.4 函数表达式声明函数问题</p><pre><code>函数表达式创建函数，会执行变量提升，此时接收函数的变量名无法正确的调用：
</code></pre><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#61AFEF;">fn</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">fn</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> () {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;想不到吧&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>结果：报错提示 ”fn is not a function&quot; 解释：该段代码执行之前，会做变量声明提升，fn 在提升之后的值是 undefined；而 fn 调用是在 fn 被赋值为函数体之前，此时 fn 的值是 undefined，所以无法正确调用</p><h2 id="_5-对象" tabindex="-1">5 - 对象 <a class="header-anchor" href="#_5-对象" aria-label="Permalink to &quot;5 - 对象&quot;">​</a></h2><h3 id="_5-1-对象的相关概念" tabindex="-1">5.1 对象的相关概念 <a class="header-anchor" href="#_5-1-对象的相关概念" aria-label="Permalink to &quot;5.1 对象的相关概念&quot;">​</a></h3><ul><li>什么是对象？</li></ul><p>在 JavaScript 中，对象是一组无序的相关属性和方法的集合，所有的事物都是对象，例如字符串、数值、数组、函数等。 对象是由属性和方法组成的。</p><ul><li><p>属性：事物的特征，在对象中用属性来表示（常用名词）</p></li><li><p>方法：事物的行为，在对象中用方法来表示（常用动词）</p><p><img src="http://110.41.157.104/server/uploads/2023-10-10/a758060a031696910521848.png" alt="images"></p></li><li><p>为什么需要对象？</p><pre><code>保存一个值时，可以使用变量，保存多个值（一组值）时，可以使用数组。

如果要保存一个人的完整信息呢？

例如，将“张三疯”的个人的信息保存在数组中的方式为：
</code></pre><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#abb2bf;">var arr = [‘张三疯’, ‘男&#39;, 128,154];</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ul><p>上述例子中用数组保存数据的缺点是：数据只能通过索引值访问，开发者需要清晰的清除所有的数据的排行才能准确地获取数据，而当数据量庞大时，不可能做到记忆所有数据的索引值。</p><p>为了让更好地存储一组数据，对象应运而生：对象中为每项数据设置了属性名称，可以访问数据更语义化，数据结构清晰，表意明显，方便开发者使用。</p><p>使用对象记录上组数据为：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">obj</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;张三疯&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">sex</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;男&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">age</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">128</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">height</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">154</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>JS 中的对象表达结构更清晰，更强大。</p><h3 id="_5-2-创建对象的三种方式" tabindex="-1">5.2 创建对象的三种方式 <a class="header-anchor" href="#_5-2-创建对象的三种方式" aria-label="Permalink to &quot;5.2 创建对象的三种方式&quot;">​</a></h3><ul><li><p>利用字面量创建对象</p><h5 id="使用对象字面量创建对象" tabindex="-1"><strong>使用对象字面量创建对象</strong>： <a class="header-anchor" href="#使用对象字面量创建对象" aria-label="Permalink to &quot;**使用对象字面量创建对象**：&quot;">​</a></h5><pre><code>	就是花括号 { } 里面包含了表达这个具体事物（对象）的属性和方法；{ } 里面采取键值对的形式表示
</code></pre><ul><li><p>键：相当于属性名</p></li><li><p>值：相当于属性值，可以是任意类型的值（数字类型、字符串类型、布尔类型，函数类型等）</p><p>代码如下：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">star</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;pink&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">age</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">18</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">sex</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;男&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">sayHi</span><span style="color:#ABB2BF;">: </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> () {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#61AFEF;">alert</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;大家好啊~&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>上述代码中 star 即是创建的对象。</p></li></ul></li><li><p>对象的使用</p><ul><li><p>对象的属性</p><ul><li>对象中存储<strong>具体数据</strong>的 &quot;键值对&quot;中的 &quot;键&quot;称为对象的属性，即对象中存储具体数据的项</li></ul></li><li><p>对象的方法</p><ul><li>对象中存储<strong>函数</strong>的 &quot;键值对&quot;中的 &quot;键&quot;称为对象的方法，即对象中存储函数的项</li></ul></li><li><p>访问对象的属性</p><ul><li><p>对象里面的属性调用 : 对象.属性名 ，这个小点 . 就理解为“ 的 ”</p></li><li><p>对象里面属性的另一种调用方式 : 对象[‘属性名’]，注意方括号里面的属性必须加引号</p><p>示例代码如下：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">star</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;">) </span><span style="color:#7F848E;font-style:italic;">// 调用名字属性</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">star</span><span style="color:#ABB2BF;">[</span><span style="color:#98C379;">&#39;name&#39;</span><span style="color:#ABB2BF;">]) </span><span style="color:#7F848E;font-style:italic;">// 调用名字属性</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul></li><li><p>调用对象的方法</p><ul><li><p>对象里面的方法调用：对象.方法名() ，注意这个方法名字后面一定加括号</p><p>示例代码如下：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#E5C07B;">star</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">sayHi</span><span style="color:#ABB2BF;">() </span><span style="color:#7F848E;font-style:italic;">// 调用 sayHi 方法,注意，一定不要忘记带后面的括号</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ul></li><li><p>变量、属性、函数、方法总结</p><pre><code>属性是对象的一部分，而变量不是对象的一部分，变量是单独存储数据的容器
</code></pre><ul><li><p>变量：单独声明赋值，单独存在</p></li><li><p>属性：对象里面的变量称为属性，不需要声明，用来描述该对象的特征</p><p>方法是对象的一部分，函数不是对象的一部分，函数是单独封装操作的容器</p></li><li><p>函数：单独存在的，通过“函数名()”的方式就可以调用</p></li><li><p>方法：对象里面的函数称为方法，方法不需要声明，使用“对象.方法名()”的方式就可以调用，方法用来描述该对象的行为和功能。</p></li></ul></li></ul></li><li><p>利用 new Object 创建对象</p><ul><li><p>创建空对象</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">andy</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">new</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">Obect</span><span style="color:#ABB2BF;">()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>通过内置构造函数 Object 创建对象，此时 andy 变量已经保存了创建出来的空对象</p></li><li><p>给空对象添加属性和方法</p><ul><li><p>通过对象操作属性和方法的方式，来为对象增加属性和方法</p><p>示例代码如下：</p></li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#E5C07B;">andy</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">name</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;pink&#39;</span></span>
<span class="line"><span style="color:#E5C07B;">andy</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">age</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">18</span></span>
<span class="line"><span style="color:#E5C07B;">andy</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">sex</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;男&#39;</span></span>
<span class="line"><span style="color:#E5C07B;">andy</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">sayHi</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> () {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">alert</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;大家好啊~&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>注意：</p><ul><li>Object() ：第一个字母大写</li><li>new Object() ：需要 new 关键字</li><li>使用的格式：对象.属性 = 值;</li></ul></li></ul></li><li><p>利用构造函数创建对象</p><ul><li><p>构造函数</p><ul><li><p>构造函数：是一种特殊的函数，主要用来初始化对象，即为对象成员变量赋初始值，它总与 new 运算符一起使用。我们可以把对象中一些公共的属性和方法抽取出来，然后封装到这个函数里面。</p></li><li><p>构造函数的封装格式：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">构造函数名</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">形参1</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;font-style:italic;">形参2</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;font-style:italic;">形参3</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">属性名1</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">参数1</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">属性名2</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">参数2</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">属性名3</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">参数3</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">this</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">方法名</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">函数体</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li><li><p>构造函数的调用格式</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#abb2bf;">var obj = new 构造函数名(实参1，实参2，实参3)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>以上代码中，obj 即接收到构造函数创建出来的对象。</p></li><li><p>注意事项</p><ol><li>构造函数约定<strong>首字母大写</strong>。</li><li>函数内的属性和方法前面需要添加 <strong>this</strong> ，表示当前对象的属性和方法。</li><li>构造函数中<strong>不需要 return 返回结果</strong>。</li><li>当我们创建对象的时候，<strong>必须用 new 来调用构造函数</strong>。</li></ol></li><li><p>其他</p><p>构造函数，如 Stars()，抽象了对象的公共部分，封装到了函数里面，它泛指某一大类（class）<br> 创建对象，如 new Stars()，特指某一个，通过 new 关键字创建对象的过程我们也称为对象实例化</p></li></ul></li></ul></li><li><p>new 关键字的作用</p><ol><li>在构造函数代码开始执行之前，创建一个空对象；</li><li>修改 this 的指向，把 this 指向创建出来的空对象；</li><li>执行函数的代码</li><li>在函数完成之后，返回 this---即创建出来的对象</li></ol><h3 id="_5-3-遍历对象" tabindex="-1">5.3 遍历对象 <a class="header-anchor" href="#_5-3-遍历对象" aria-label="Permalink to &quot;5.3 遍历对象&quot;">​</a></h3><pre><code>for...in 语句用于对数组或者对象的属性进行循环操作。

其语法如下：
</code></pre><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">for</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">变量</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">in</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">对象名字</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#7F848E;font-style:italic;">// 在此执行代码</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><pre><code>语法中的变量是自定义的，它需要符合命名规范，通常我们会将这个变量写为 k 或者 key。
</code></pre><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">for</span><span style="color:#ABB2BF;"> (</span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">k</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">in</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">obj</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">k</span><span style="color:#ABB2BF;">) </span><span style="color:#7F848E;font-style:italic;">// 这里的 k 是属性名</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">obj</span><span style="color:#ABB2BF;">[</span><span style="color:#E06C75;">k</span><span style="color:#ABB2BF;">]) </span><span style="color:#7F848E;font-style:italic;">// 这里的 obj[k] 是属性值</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li></ul>`,47),e=[o];function r(c,t,B,i,y,u){return n(),a("div",null,e)}const b=s(p,[["render",r]]);export{d as __pageData,b as default};
