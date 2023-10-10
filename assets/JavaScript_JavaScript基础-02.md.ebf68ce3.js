import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.d6ec958f.js";const b=JSON.parse('{"title":"JavaScript基础-2篇","description":"","frontmatter":{},"headers":[],"relativePath":"JavaScript/JavaScript基础-02.md","filePath":"JavaScript/JavaScript基础-02.md","lastUpdated":1696918359000}'),p={name:"JavaScript/JavaScript基础-02.md"},e=l(`<h1 id="javascript基础-2篇" tabindex="-1">JavaScript基础-2篇 <a class="header-anchor" href="#javascript基础-2篇" aria-label="Permalink to &quot;JavaScript基础-2篇&quot;">​</a></h1><h2 id="_1-运算符-操作符" tabindex="-1">1 - 运算符（操作符） <a class="header-anchor" href="#_1-运算符-操作符" aria-label="Permalink to &quot;1 - 运算符（操作符）&quot;">​</a></h2><h3 id="_1-1-运算符的分类" tabindex="-1">1.1 运算符的分类 <a class="header-anchor" href="#_1-1-运算符的分类" aria-label="Permalink to &quot;1.1 运算符的分类&quot;">​</a></h3><p><strong>运算符</strong>（operator）也被称为操作符，是用于实现赋值、比较和执行算数运算等功能的符号。</p><pre><code>JavaScript中常用的运算符有：
</code></pre><ul><li>算数运算符</li><li>递增和递减运算符</li><li>比较运算符</li><li>逻辑运算符</li><li>赋值运算符</li></ul><h3 id="_1-2-算数运算符" tabindex="-1">1.2 算数运算符 <a class="header-anchor" href="#_1-2-算数运算符" aria-label="Permalink to &quot;1.2 算数运算符&quot;">​</a></h3><ul><li><p>算术运算符概述</p><p>概念：算术运算使用的符号，用于执行两个变量或值的算术运算。</p><p><img src="http://110.41.157.104/server/uploads/2023-10-10/de958e06601696909781408.png" alt="images"></p></li><li><p>浮点数的精度问题</p><p>浮点数值的最高精度是 17 位小数，但在进行算术计算时其精确度远远不如整数。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">result</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">0.1</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">0.2</span><span style="color:#ABB2BF;">;    </span><span style="color:#7F848E;font-style:italic;">// 结果不是 0.3，而是：0.30000000000000004</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">0.07</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">*</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">100</span><span style="color:#ABB2BF;">);   </span><span style="color:#7F848E;font-style:italic;">// 结果不是 7，  而是：7.000000000000001</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>所以：不要直接判断两个浮点数是否相等 !</p></li><li><p>表达式和返回值</p><p>表达式：是由数字、运算符、变量等以能求得数值的有意义排列方法所得的组合</p><p>简单理解：是由数字、运算符、变量等组成的式子</p><p>表达式最终都会有一个结果，返回给开发者，称为返回值</p></li></ul><h3 id="_1-3-递增和递减运算符" tabindex="-1">1.3 递增和递减运算符 <a class="header-anchor" href="#_1-3-递增和递减运算符" aria-label="Permalink to &quot;1.3 递增和递减运算符&quot;">​</a></h3><ul><li><p>递增和递减运算符概述</p><p>如果需要反复给数字变量添加或减去1，可以使用递增（++）和递减（ -- ）运算符来完成。</p><p>在 JavaScript 中，递增（++）和递减（ -- ）既可以放在变量前面，也可以放在变量后面。放在变量前面时，我们可以称为前置递增（递减）运算符，放在变量后面时，我们可以称为后置递增（递减）运算符。</p><p>注意：递增和递减运算符必须和变量配合使用。</p></li><li><p>递增运算符</p><ul><li><p>前置递增运算符</p><p>++num 前置递增，就是自加1，类似于 num = num + 1，但是 ++num 写起来更简单。</p><p>使用口诀：先自加，后返回值</p></li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">num</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">10</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#61AFEF;">alert</span><span style="color:#ABB2BF;">(</span><span style="color:#56B6C2;">++</span><span style="color:#E06C75;">num</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">10</span><span style="color:#ABB2BF;">);   </span><span style="color:#7F848E;font-style:italic;">// 21</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li><p>后置递增运算符</p><p>num++ 后置递增，就是自加1，类似于 num = num + 1 ，但是 num++ 写起来更简单。</p><p>使用口诀：先返回原值，后自加</p></li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">num</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">10</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#61AFEF;">alert</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">10</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">num</span><span style="color:#56B6C2;">++</span><span style="color:#ABB2BF;">);  </span><span style="color:#7F848E;font-style:italic;">// 20</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul><h3 id="_1-4-比较运算符" tabindex="-1">1.4 比较运算符 <a class="header-anchor" href="#_1-4-比较运算符" aria-label="Permalink to &quot;1.4 比较运算符&quot;">​</a></h3><ul><li><p>比较运算符概述</p><p>概念：比较运算符（关系运算符）是两个数据进行比较时所使用的运算符，比较运算后，会返回一个布尔值（true / false）作为比较运算的结果。</p><p><img src="http://110.41.157.104/server/uploads/2023-10-10/8e686cf7621696909781575.png" alt="images"></p></li><li><p>等号比较</p><p><img src="http://110.41.157.104/server/uploads/2023-10-10/d95776310c1696909781587.png" alt="images"></p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">18</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">==</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;18&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">18</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">===</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;18&#39;</span><span style="color:#ABB2BF;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li></ul><h3 id="_1-5-逻辑运算符" tabindex="-1">1.5 逻辑运算符 <a class="header-anchor" href="#_1-5-逻辑运算符" aria-label="Permalink to &quot;1.5 逻辑运算符&quot;">​</a></h3><ul><li><p>逻辑运算符概述</p><p>概念：逻辑运算符是用来进行布尔值运算的运算符，其返回值也是布尔值。后面开发中经常用于多个条件的判断</p><p><img src="http://110.41.157.104/server/uploads/2023-10-10/3d53089c5c1696909781795.png" alt="images"></p></li><li><p>逻辑与&amp;&amp;</p><p>两边都是 true才返回 true，否则返回 false</p><p><img src="http://110.41.157.104/server/uploads/2023-10-10/c1506fe4e91696909781795.png" alt="images"></p></li><li><p>逻辑或 ||</p><p>两边都是 true才返回 true，否则返回 false <img src="http://110.41.157.104/server/uploads/2023-10-10/68744125001696909781961.png" alt="images"></p></li><li><p>逻辑非 ！</p><p>逻辑非（!）也叫作取反符，用来取一个布尔值相反的值，如 true 的相反值是 false</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">isOk</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">!</span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">isOk</span><span style="color:#ABB2BF;">);  </span><span style="color:#7F848E;font-style:italic;">// false</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li><li><p>短路运算（逻辑中断）</p><p>短路运算的原理：当有多个表达式（值）时,左边的表达式值可以确定结果时,就不再继续运算右边的表达式的值;</p><ul><li><p>逻辑与</p><p>语法： 表达式1 &amp;&amp; 表达式2</p><pre><code>  - 如果第一个表达式的值为真，则返回表达式2
  
  - 如果第一个表达式的值为假，则返回表达式1
</code></pre><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">( </span><span style="color:#D19A66;">123</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&amp;&amp;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">456</span><span style="color:#ABB2BF;"> );        </span><span style="color:#7F848E;font-style:italic;">// 456</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">( </span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&amp;&amp;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">456</span><span style="color:#ABB2BF;"> );          </span><span style="color:#7F848E;font-style:italic;">// 0</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">( </span><span style="color:#D19A66;">123</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&amp;&amp;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">456</span><span style="color:#56B6C2;">&amp;&amp;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">789</span><span style="color:#ABB2BF;"> );  </span><span style="color:#7F848E;font-style:italic;">// 789</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li><li><p>逻辑或</p><p>语法： 表达式1 || 表达式2</p><pre><code> - 如果第一个表达式的值为真，则返回表达式1
 
 - 如果第一个表达式的值为假，则返回表达式2
</code></pre><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">( </span><span style="color:#D19A66;">123</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">||</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">456</span><span style="color:#ABB2BF;"> );         </span><span style="color:#7F848E;font-style:italic;">//  123</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">( </span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">||</span><span style="color:#ABB2BF;">  </span><span style="color:#D19A66;">456</span><span style="color:#ABB2BF;"> );          </span><span style="color:#7F848E;font-style:italic;">//  456</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">( </span><span style="color:#D19A66;">123</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">||</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">456</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">||</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">789</span><span style="color:#ABB2BF;"> );  </span><span style="color:#7F848E;font-style:italic;">//  123</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li></ul></li></ul><h3 id="_1-6-赋值运算符" tabindex="-1">1.6 赋值运算符 <a class="header-anchor" href="#_1-6-赋值运算符" aria-label="Permalink to &quot;1.6 赋值运算符&quot;">​</a></h3><pre><code>概念：用来把数据赋值给变量的运算符。
</code></pre><p><img src="http://110.41.157.104/server/uploads/2023-10-10/2b9607ec161696909780557.png" alt="images"></p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">var</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">age</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">10</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#E06C75;">age</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">;  </span><span style="color:#7F848E;font-style:italic;">// 相当于 age = age + 5;</span></span>
<span class="line"><span style="color:#E06C75;">age</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">-=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">;  </span><span style="color:#7F848E;font-style:italic;">// 相当于 age = age - 5;</span></span>
<span class="line"><span style="color:#E06C75;">age</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">*=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">10</span><span style="color:#ABB2BF;">; </span><span style="color:#7F848E;font-style:italic;">// 相当于 age = age * 10;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="_1-7-运算符优先级" tabindex="-1">1.7 运算符优先级 <a class="header-anchor" href="#_1-7-运算符优先级" aria-label="Permalink to &quot;1.7 运算符优先级&quot;">​</a></h3><p><img src="http://110.41.157.104/server/uploads/2023-10-10/1769dcfcde1696909780563.png" alt="images"></p><ul><li>一元运算符里面的逻辑非优先级很高</li><li>逻辑与比逻辑或优先级高</li></ul><h2 id="_2-流程控制" tabindex="-1">2 - 流程控制 <a class="header-anchor" href="#_2-流程控制" aria-label="Permalink to &quot;2 - 流程控制&quot;">​</a></h2><h3 id="_2-1-流程控制概念" tabindex="-1">2.1 流程控制概念 <a class="header-anchor" href="#_2-1-流程控制概念" aria-label="Permalink to &quot;2.1 流程控制概念&quot;">​</a></h3><pre><code>在一个程序执行的过程中，各条代码的执行顺序对程序的结果是有直接影响的。
</code></pre><p>很多时候我们要通过控制代码的执行顺序来实现我们要完成的功能。</p><pre><code>简单理解：**流程控制就是来控制代码按照一定结构顺序来执行**

流程控制主要有三种结构，分别是**顺序结构**、**分支结构**和**循环结构**，代表三种代码执行的顺序。
</code></pre><p><img src="http://110.41.157.104/server/uploads/2023-10-10/f114ee5d661696909780819.png" alt="images"></p><h3 id="_2-2-顺序流程控制" tabindex="-1">2.2 顺序流程控制 <a class="header-anchor" href="#_2-2-顺序流程控制" aria-label="Permalink to &quot;2.2 顺序流程控制&quot;">​</a></h3><p>​</p><p>​ 顺序结构是程序中最简单、最基本的流程控制，它没有特定的语法结构，程序会按照代码的先后顺序，依次执行，程序中大多数的代码都是这样执行的。 <img src="http://110.41.157.104/server/uploads/2023-10-10/6c440b6a951696909780817.png" alt="images"></p><h3 id="_2-3-分支流程控制" tabindex="-1">2.3 分支流程控制 <a class="header-anchor" href="#_2-3-分支流程控制" aria-label="Permalink to &quot;2.3 分支流程控制&quot;">​</a></h3><ul><li><p>分支结构</p><p>由上到下执行代码的过程中，根据不同的条件，执行不同的路径代码（执行代码多选一的过程），从而得到不同的结果 <img src="http://110.41.157.104/server/uploads/2023-10-10/17b2b556f11696909781028.png" alt="images"></p><p>JS 语言提供了两种分支结构语句：if 语句、switch 语句</p></li><li><p>if 语句</p><ul><li>语法结构</li></ul><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// 条件成立执行代码，否则什么也不做</span></span>
<span class="line"><span style="color:#C678DD;">if</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">条件表达式</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;font-style:italic;">// 条件成立执行的代码语句</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>语句可以理解为一个行为，循环语句和分支语句就是典型的语句。一个程序由很多个语句组成，一般情况下，会分割成一个一个的语句。</p><ul><li><p>执行流程</p><p><img src="http://110.41.157.104/server/uploads/2023-10-10/0d1d82aa6f1696909781007.png" alt="images"></p></li></ul></li><li><p>if else语句（双分支语句）</p><ul><li><p>语法结构</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// 条件成立  执行 if 里面代码，否则执行else 里面的代码</span></span>
<span class="line"><span style="color:#C678DD;">if</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">条件表达式</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;font-style:italic;">// [如果] 条件成立执行的代码</span></span>
<span class="line"><span style="color:#ABB2BF;">} </span><span style="color:#C678DD;">else</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;font-style:italic;">// [否则] 执行的代码</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li><li><p>执行流程</p><p><img src="http://110.41.157.104/server/uploads/2023-10-10/fbde7d6f921696909781195.png" alt="images"></p></li></ul></li><li><p>if else if 语句(多分支语句)</p><ul><li><p>语法结构</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// 适合于检查多重条件。</span></span>
<span class="line"><span style="color:#C678DD;">if</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">条件表达式1</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">语句1</span><span style="color:#ABB2BF;">；</span></span>
<span class="line"><span style="color:#ABB2BF;">} </span><span style="color:#C678DD;">else</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">if</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">条件表达式2</span><span style="color:#ABB2BF;">)  {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">语句2</span><span style="color:#ABB2BF;">；</span></span>
<span class="line"><span style="color:#ABB2BF;">} </span><span style="color:#C678DD;">else</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">if</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">条件表达式3</span><span style="color:#ABB2BF;">)  {</span></span>
<span class="line"><span style="color:#ABB2BF;">   </span><span style="color:#E06C75;">语句3</span><span style="color:#ABB2BF;">；</span></span>
<span class="line"><span style="color:#ABB2BF;"> ....</span></span>
<span class="line"><span style="color:#ABB2BF;">} </span><span style="color:#C678DD;">else</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#7F848E;font-style:italic;">// 上述条件都不成立执行此处代码</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></li><li><p>执行逻辑</p><p><img src="http://110.41.157.104/server/uploads/2023-10-10/b1a95af9401696909781201.png" alt="images"></p></li></ul></li></ul><h3 id="_2-4-三元表达式" tabindex="-1">2.4 三元表达式 <a class="header-anchor" href="#_2-4-三元表达式" aria-label="Permalink to &quot;2.4 三元表达式&quot;">​</a></h3><ul><li><p>语法结构</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#E06C75;">表达式1</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">?</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">表达式2</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">:</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">表达式3</span><span style="color:#ABB2BF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>执行思路</p><ul><li>如果表达式1为 true ，则返回表达式2的值，如果表达式1为 false，则返回表达式3的值</li><li>简单理解： 就类似于 if else （双分支） 的简写</li></ul></li></ul><h3 id="_2-5-switch分支流程控制" tabindex="-1">2.5 switch分支流程控制 <a class="header-anchor" href="#_2-5-switch分支流程控制" aria-label="Permalink to &quot;2.5 switch分支流程控制&quot;">​</a></h3><ul><li><p>语法结构</p><p>switch 语句也是多分支语句，它用于基于不同的条件来执行不同的代码。当要针对变量设置一系列的特定值的选项时，就可以使用 switch。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">switch</span><span style="color:#ABB2BF;">( </span><span style="color:#E06C75;">表达式</span><span style="color:#ABB2BF;"> ){ </span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">case</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">value1</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#7F848E;font-style:italic;">// 表达式 等于 value1 时要执行的代码</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#C678DD;">break</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">case</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">value2</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#7F848E;font-style:italic;">// 表达式 等于 value2 时要执行的代码</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#C678DD;">break</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">default</span><span style="color:#ABB2BF;">:</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#7F848E;font-style:italic;">// 表达式 不等于任何一个 value 时要执行的代码</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><ul><li><p>switch ：开关 转换 ， case ：小例子 选项</p></li><li><p>关键字 switch 后面括号内可以是表达式或值， 通常是一个变量</p></li><li><p>关键字 case , 后跟一个选项的表达式或值，后面跟一个冒号</p></li><li><p>switch 表达式的值会与结构中的 case 的值做比较</p></li><li><p>如果存在匹配全等(===) ，则与该 case 关联的代码块会被执行，并在遇到 break 时停止，整个 switch 语句代码执行结束</p></li><li><p>如果所有的 case 的值都和表达式的值不匹配，则执行 default 里的代码</p><p><strong>注意： 执行case 里面的语句时，如果没有break，则继续执行下一个case里面的语句。</strong></p></li></ul></li><li><p>switch 语句和 if else if 语句的区别</p><ul><li>一般情况下，它们两个语句可以相互替换</li><li>switch...case 语句通常处理 case为比较确定值的情况， 而 if…else…语句更加灵活，常用于范围判断(大于、等于某个范围)</li><li>switch 语句进行条件判断后直接执行到程序的条件语句，效率更高。而if…else 语句有几种条件，就得判断多少次。</li><li>当分支比较少时，if… else语句的执行效率比 switch语句高。</li><li>当分支比较多时，switch语句的执行效率比较高，而且结构更清晰。</li></ul></li></ul>`,36),o=[e];function r(c,t,i,B,y,u){return a(),n("div",null,o)}const F=s(p,[["render",r]]);export{b as __pageData,F as default};
