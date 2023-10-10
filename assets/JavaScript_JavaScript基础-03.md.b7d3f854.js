import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.d6ec958f.js";const F=JSON.parse('{"title":"JavaScript基础-3篇","description":"","frontmatter":{},"headers":[],"relativePath":"JavaScript/JavaScript基础-03.md","filePath":"JavaScript/JavaScript基础-03.md","lastUpdated":1696918359000}'),p={name:"JavaScript/JavaScript基础-03.md"},o=l(`<h1 id="javascript基础-3篇" tabindex="-1">JavaScript基础-3篇 <a class="header-anchor" href="#javascript基础-3篇" aria-label="Permalink to &quot;JavaScript基础-3篇&quot;">​</a></h1><h2 id="_1-循环" tabindex="-1">1 - 循环 <a class="header-anchor" href="#_1-循环" aria-label="Permalink to &quot;1 - 循环&quot;">​</a></h2><h3 id="_1-1-for循环" tabindex="-1">1.1 for循环 <a class="header-anchor" href="#_1-1-for循环" aria-label="Permalink to &quot;1.1 for循环&quot;">​</a></h3><ul><li>语法结构</li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">for</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">初始化变量</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">条件表达式</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">操作表达式</span><span style="color:#ABB2BF;"> ){</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#7F848E;font-style:italic;">//循环体</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><table><thead><tr><th>名称</th><th>作用</th></tr></thead><tbody><tr><td>初始化变量</td><td>通常被用于初始化一个计数器，该表达式可以使用 var 关键字声明新的变量，这个变量帮我们来记录次数。</td></tr><tr><td>条件表达式</td><td>用于确定每一次循环是否能被执行。如果结果是 true 就继续循环，否则退出循环。</td></tr><tr><td>操作表达式</td><td>用于确定每一次循环是否能被执行。如果结果是 true 就继续循环，否则退出循环。</td></tr></tbody></table><p>执行过程：</p><ol><li>初始化变量，初始化操作在整个 for 循环只会执行一次。</li></ol><ul><li>执行条件表达式，如果为true，则执行循环体语句，否则退出循环，循环结束。</li></ul><ol><li>执行操作表达式，此时第一轮结束。</li><li>第二轮开始，直接去执行条件表达式（不再初始化变量），如果为 true ，则去执行循环体语句，否则退出循环。</li><li>继续执行操作表达式，第二轮结束。</li><li>后续跟第二轮一致，直至条件表达式为假，结束整个 for 循环。</li></ol><p>断点调试：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#abb2bf;">	断点调试是指自己在程序的某一行设置一个断点，调试时，程序运行到这一行就会停住，</span></span>
<span class="line"><span style="color:#abb2bf;">  然后你可以一步一步往下调试，</span></span>
<span class="line"><span style="color:#abb2bf;">  调试过程中可以看各个变量当前的值，出错的话，调试到出错的代码行即显示错误，停下。</span></span>
<span class="line"><span style="color:#abb2bf;">  断点调试可以帮助观察程序的运行过程</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="language-html line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#ABB2BF;">断点调试的流程：</span></span>
<span class="line"><span style="color:#ABB2BF;">1、浏览器中按 F12--&gt; sources --&gt;找到需要调试的文件--&gt;在程序的某一行设置断点</span></span>
<span class="line"><span style="color:#ABB2BF;">2、Watch: 监视，通过watch可以监视变量的值的变化，非常的常用。</span></span>
<span class="line"><span style="color:#ABB2BF;">3、摁下F11，程序单步执行，让程序一行一行的执行，这个时候，观察watch中变量的值的变化。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul><li><p>for 循环重复相同的代码</p><p>比如输出10句“媳妇我错了”</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#7F848E;font-style:italic;">//  基本写法</span></span>
<span class="line"><span style="color:#C678DD;">for</span><span style="color:#ABB2BF;">(</span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&lt;=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">10</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#56B6C2;">++</span><span style="color:#ABB2BF;">){</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;媳妇我错了~&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 用户输入次数</span></span>
<span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">num</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">prompt</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;请输入次数:&#39;</span><span style="color:#ABB2BF;">)；</span></span>
<span class="line"><span style="color:#C678DD;">for</span><span style="color:#ABB2BF;"> ( </span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;"> ; </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&lt;=</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">num</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#56B6C2;">++</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;媳妇我错了~&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></li><li><p>for 循环重复不相同的代码</p><p>例如，求输出1到100岁：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ul><p>// 基本写法 for (var i = 1; i &lt;= 100; i++) { console.log(&#39;这个人今年&#39; + i + &#39;岁了&#39;); }</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">例如，求输出1到100岁，并提示出生、死亡</span></span>
<span class="line"><span style="color:#abb2bf;"></span></span>
<span class="line"><span style="color:#abb2bf;">\`\`\`js</span></span>
<span class="line"><span style="color:#abb2bf;">// for 里面是可以添加其他语句的 </span></span>
<span class="line"><span style="color:#abb2bf;">for (var i = 1; i &lt;= 100; i++) {</span></span>
<span class="line"><span style="color:#abb2bf;"> if (i == 1) {</span></span>
<span class="line"><span style="color:#abb2bf;">    console.log(&#39;这个人今年1岁了， 它出生了&#39;);</span></span>
<span class="line"><span style="color:#abb2bf;"> } else if (i == 100) {</span></span>
<span class="line"><span style="color:#abb2bf;">    console.log(&#39;这个人今年100岁了，它死了&#39;);</span></span>
<span class="line"><span style="color:#abb2bf;">  } else {</span></span>
<span class="line"><span style="color:#abb2bf;">       console.log(&#39;这个人今年&#39; + i + &#39;岁了&#39;);</span></span>
<span class="line"><span style="color:#abb2bf;">  }</span></span>
<span class="line"><span style="color:#abb2bf;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>for循环因为有了计数器的存在，还可以重复的执行某些操作，比如做一些算术运算。</p><h3 id="_1-2-双重for循环" tabindex="-1">1.2 双重for循环 <a class="header-anchor" href="#_1-2-双重for循环" aria-label="Permalink to &quot;1.2 双重for循环&quot;">​</a></h3><ul><li><p>双重 for 循环概述</p><p>循环嵌套是指在一个循环语句中再定义一个循环语句的语法结构， 例如在for循环语句中，可以再嵌套一个for 循环，这样的 for 循环语句我们称之为双重for循环。</p></li><li><p>双重 for 循环语法</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">for</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">外循环的初始</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">外循环的条件</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">外循环的操作表达式</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">for</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">内循环的初始</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">内循环的条件</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">内循环的操作表达式</span><span style="color:#ABB2BF;">) {  </span></span>
<span class="line"><span style="color:#ABB2BF;">       </span><span style="color:#E06C75;">需执行的代码</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">   }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul><li>内层循环可以看做外层循环的循环体语句</li><li>内层循环执行的顺序也要遵循 for 循环的执行顺序</li><li>外层循环执行一次，内层循环要执行全部次数</li></ul></li><li><p>打印五行五列星星</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">star</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">for</span><span style="color:#ABB2BF;"> (</span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">j</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">j</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&lt;=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">3</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">j</span><span style="color:#56B6C2;">++</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">for</span><span style="color:#ABB2BF;"> (</span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&lt;=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">3</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#56B6C2;">++</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E06C75;">star</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;☆&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;font-style:italic;">// 每次满 5个星星 就 加一次换行</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">star</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;</span><span style="color:#56B6C2;">\\n</span><span style="color:#98C379;">&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">star</span><span style="color:#ABB2BF;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>核心逻辑：</p><p>1.内层循环负责一行打印五个星星</p><p>2.外层循环负责打印五行</p></li><li><p>for 循环小结</p><ul><li>for 循环可以重复执行某些相同代码</li><li>for 循环可以重复执行些许不同的代码，因为我们有计数器</li><li>for 循环可以重复执行某些操作，比如算术运算符加法操作</li><li>随着需求增加，双重for循环可以做更多、更好看的效果</li><li>双重 for 循环，外层循环一次，内层 for 循环全部执行</li><li>for 循环是循环条件和数字直接相关的循环</li></ul></li></ul><h3 id="_1-3-while循环" tabindex="-1">1.3 while循环 <a class="header-anchor" href="#_1-3-while循环" aria-label="Permalink to &quot;1.3 while循环&quot;">​</a></h3><p>while语句的语法结构如下：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">while</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">条件表达式</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;font-style:italic;">// 循环体代码 </span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>执行思路：</p><ul><li>1 先执行条件表达式，如果结果为 true，则执行循环体代码；如果为 false，则退出循环，执行后面代码</li><li>2 执行循环体代码</li><li>3 循环体代码执行完毕后，程序会继续判断执行条件表达式，如条件仍为true，则会继续执行循环体，直到循环条件为 false 时，整个循环过程才会结束</li></ul><p>注意：</p><ul><li>使用 while 循环时一定要注意，它必须要有退出条件，否则会成为死循环</li></ul><h3 id="_1-4-do-while循环" tabindex="-1">1.4 do-while循环 <a class="header-anchor" href="#_1-4-do-while循环" aria-label="Permalink to &quot;1.4 do-while循环&quot;">​</a></h3><p>do... while 语句的语法结构如下：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">do</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;font-style:italic;">// 循环体代码 - 条件表达式为 true 时重复执行循环体代码</span></span>
<span class="line"><span style="color:#ABB2BF;">} </span><span style="color:#C678DD;">while</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">条件表达式</span><span style="color:#ABB2BF;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>执行思路</p><ul><li><p>1 先执行一次循环体代码</p></li><li><p>2 再执行条件表达式，如果结果为 true，则继续执行循环体代码，如果为 false，则退出循环，继续执行后面代码</p><p>注意：先再执行循环体，再判断，do…while循环语句至少会执行一次循环体代码</p></li></ul><h3 id="_1-5-continue、break" tabindex="-1">1.5 continue、break <a class="header-anchor" href="#_1-5-continue、break" aria-label="Permalink to &quot;1.5 continue、break&quot;">​</a></h3><p>continue 关键字用于立即跳出本次循环，继续下一次循环（本次循环体中 continue 之后的代码就会少执行一次）。</p><p>例如，吃5个包子，第3个有虫子，就扔掉第3个，继续吃第4个第5个包子，其代码实现如下：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">for</span><span style="color:#ABB2BF;"> (</span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&lt;=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#56B6C2;">++</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">     </span><span style="color:#C678DD;">if</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">==</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">3</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">         </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;这个包子有虫子，扔掉&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">         </span><span style="color:#C678DD;">continue</span><span style="color:#ABB2BF;">; </span><span style="color:#7F848E;font-style:italic;">// 跳出本次循环，跳出的是第3次循环 </span></span>
<span class="line"><span style="color:#ABB2BF;">      }</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;我正在吃第&#39;</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;个包子呢&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>运行结果：</p><p><img src="http://110.41.157.104/server/uploads/2023-10-10/2d99cce3041696910273772.png" alt="images"></p><p>break 关键字用于立即跳出整个循环（循环结束）。</p><p>例如，吃5个包子，吃到第3个发现里面有半个虫子，其余的不吃了，其代码实现如下：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">for</span><span style="color:#ABB2BF;"> (</span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&lt;=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#56B6C2;">++</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">   </span><span style="color:#C678DD;">if</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">==</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">3</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">       </span><span style="color:#C678DD;">break</span><span style="color:#ABB2BF;">; </span><span style="color:#7F848E;font-style:italic;">// 直接退出整个for 循环，跳到整个for下面的语句</span></span>
<span class="line"><span style="color:#ABB2BF;">   }</span></span>
<span class="line"><span style="color:#ABB2BF;">   </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;我正在吃第&#39;</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;个包子呢&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;"> }</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>运行结果：</p><p><img src="http://110.41.157.104/server/uploads/2023-10-10/9be25930941696910273763.png" alt="images"></p><h2 id="_2-代码规范" tabindex="-1">2 - 代码规范 <a class="header-anchor" href="#_2-代码规范" aria-label="Permalink to &quot;2 - 代码规范&quot;">​</a></h2><h3 id="_2-1-标识符命名规范" tabindex="-1">2.1 标识符命名规范 <a class="header-anchor" href="#_2-1-标识符命名规范" aria-label="Permalink to &quot;2.1 标识符命名规范&quot;">​</a></h3><ul><li>变量、函数的命名必须要有意义</li><li>变量的名称一般用名词</li><li>函数的名称一般用动词</li></ul><h3 id="_2-2-操作符规范" tabindex="-1">2.2 操作符规范 <a class="header-anchor" href="#_2-2-操作符规范" aria-label="Permalink to &quot;2.2 操作符规范&quot;">​</a></h3><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// 操作符的左右两侧各保留一个空格</span></span>
<span class="line"><span style="color:#C678DD;">for</span><span style="color:#ABB2BF;"> (</span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&lt;=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#56B6C2;">++</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">   </span><span style="color:#C678DD;">if</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">==</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">3</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">       </span><span style="color:#C678DD;">break</span><span style="color:#ABB2BF;">; </span><span style="color:#7F848E;font-style:italic;">// 直接退出整个 for 循环，跳到整个for循环下面的语句</span></span>
<span class="line"><span style="color:#ABB2BF;">   }</span></span>
<span class="line"><span style="color:#ABB2BF;">   </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;我正在吃第&#39;</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;个包子呢&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="_2-3-单行注释规范" tabindex="-1">2.3 单行注释规范 <a class="header-anchor" href="#_2-3-单行注释规范" aria-label="Permalink to &quot;2.3 单行注释规范&quot;">​</a></h3><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">for</span><span style="color:#ABB2BF;"> (</span><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&lt;=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#56B6C2;">++</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">   </span><span style="color:#C678DD;">if</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">==</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">3</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">       </span><span style="color:#C678DD;">break</span><span style="color:#ABB2BF;">; </span><span style="color:#7F848E;font-style:italic;">// 单行注释前面注意有个空格</span></span>
<span class="line"><span style="color:#ABB2BF;">   }</span></span>
<span class="line"><span style="color:#ABB2BF;">   </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;我正在吃第&#39;</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;个包子呢&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_2-4-其他规范" tabindex="-1">2.4 其他规范 <a class="header-anchor" href="#_2-4-其他规范" aria-label="Permalink to &quot;2.4 其他规范&quot;">​</a></h3><pre><code>关键词、操作符之间后加空格
</code></pre><p><img src="http://110.41.157.104/server/uploads/2023-10-10/af405c95901696910273763.png" alt="images"></p>`,52),e=[o];function r(c,t,B,i,y,b){return a(),n("div",null,e)}const u=s(p,[["render",r]]);export{F as __pageData,u as default};
