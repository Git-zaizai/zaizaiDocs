import{_ as a,o as n,c as l,O as p}from"./chunks/framework.218070ce.js";const F=JSON.parse('{"title":"记录ES11之后（包括之前没记录的）的常用特性","description":"","frontmatter":{},"headers":[],"relativePath":"JavaScript/esnext.md","filePath":"JavaScript/esnext.md","lastUpdated":1743585365000}'),o={name:"JavaScript/esnext.md"};function e(r,s,c,t,B,y){return n(),l("div",null,s[0]||(s[0]=[p(`<h1 id="记录es11之后-包括之前没记录的-的常用特性" tabindex="-1">记录ES11之后（包括之前没记录的）的常用特性 <a class="header-anchor" href="#记录es11之后-包括之前没记录的-的常用特性" aria-label="Permalink to &quot;记录ES11之后（包括之前没记录的）的常用特性&quot;">​</a></h1><h2 id="at-函数" tabindex="-1"><code>at</code> 函数 <a class="header-anchor" href="#at-函数" aria-label="Permalink to &quot;\`at\` 函数&quot;">​</a></h2><ul><li><code>String.at()</code></li><li><code>Array.at()</code></li></ul><p>在以前你想获取字符或数组中从<code>后面</code>开始的某一个数据时：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">let</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;65135asd351a3sd168&#39;</span></span>
<span class="line"><span style="color:#C678DD;">let</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">arr</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> [</span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">2</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">3</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">4</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">6</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">7</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">8</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">9</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;">[</span><span style="color:#E5C07B;">a</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">length</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">-</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">])</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">arr</span><span style="color:#ABB2BF;">[</span><span style="color:#E5C07B;">a</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">length</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">-</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">2</span><span style="color:#ABB2BF;">])</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>有了<code>at</code>函数你就可以不需要写 <code>[xx.lenght - 1]</code>了</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">let</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;65135asd351a3sd168&#39;</span></span>
<span class="line"><span style="color:#C678DD;">let</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">arr</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> [</span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">2</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">3</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">4</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">5</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">6</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">7</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">8</span><span style="color:#ABB2BF;">,</span><span style="color:#D19A66;">9</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">a</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">at</span><span style="color:#ABB2BF;">(</span><span style="color:#56B6C2;">-</span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">))</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">arr</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">at</span><span style="color:#ABB2BF;">(</span><span style="color:#56B6C2;">-</span><span style="color:#D19A66;">2</span><span style="color:#ABB2BF;">))</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="promise-allsettled" tabindex="-1"><code>Promise.allSettled</code> <a class="header-anchor" href="#promise-allsettled" aria-label="Permalink to &quot;\`Promise.allSettled\`&quot;">​</a></h2><p>解决Promise.all的痛点，Promise.all本身的强硬逻辑， 当处理多个Promise并行时，一旦有一个promise出现了异常，被reject了， 尽管能用catch捕获其中的异常，但你会发现其他执行的Promise的消息都丢失了， 而Promise.allSettled可以获取到所有的Proimse的执行结果，不管是 reslove还是reject了。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">promises</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> [</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">delay</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">100</span><span style="color:#ABB2BF;">).</span><span style="color:#61AFEF;">then</span><span style="color:#ABB2BF;">(() </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">),</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">delay</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">200</span><span style="color:#ABB2BF;">).</span><span style="color:#61AFEF;">then</span><span style="color:#ABB2BF;">(() </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">2</span><span style="color:#ABB2BF;">),</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E5C07B;">Promise</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">reject</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">3</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">  ]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E5C07B;">Promise</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">allSettled</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">promises</span><span style="color:#ABB2BF;">).</span><span style="color:#61AFEF;">then</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">values</span><span style="color:#C678DD;">=&gt;</span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">values</span><span style="color:#ABB2BF;">))</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 最终输出： </span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//    [</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//      {status: &quot;fulfilled&quot;, value: 1},</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//      {status: &quot;fulfilled&quot;, value: 2},</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//      {status: &quot;rejected&quot;, value: 3},</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">//    ]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>可以看到所有promise的数据都被包含在then语句中， 且每个promise的返回值多了一个status字段，表示当前promise的状态， 没有任何一个promise的信息被丢失。 因此，当用Promise.allSettled时，只需专注在then语句里， 当有promise被异常打断时，我们依然能妥善处理那些已经成功了的promise，不必全部重来。</p><h2 id="下划线-分隔符" tabindex="-1">下划线 <code>_</code> 分隔符 <a class="header-anchor" href="#下划线-分隔符" aria-label="Permalink to &quot;下划线 \`_\` 分隔符&quot;">​</a></h2><p>当你要写一个很长的数字的时候，使用了数字分隔符 _ （下划线），就可以让数字读的更清晰：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">let</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">x</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">2_3333_3333</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// x 的值等同于 233333333，只是这样可读性更强，不用一位一位数了</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 100万的表示</span></span>
<span class="line"><span style="color:#C678DD;">let</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">b</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">1_000_000</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 1000万的表示</span></span>
<span class="line"><span style="color:#C678DD;">let</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">q</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">10_000_000</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="逻辑赋值操作符-、-、" tabindex="-1">逻辑赋值操作符 <code>??=</code> 、<code>&amp;&amp;=</code> 、 <code>||=</code> <a class="header-anchor" href="#逻辑赋值操作符-、-、" aria-label="Permalink to &quot;逻辑赋值操作符 \`??=\` 、\`&amp;&amp;=\` 、 \`||=\`&quot;">​</a></h2><p>如下：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">let</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">1</span></span>
<span class="line"><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+=</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">1</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这个简写特性后很熟悉，有了新的标准 <code>??</code> 、<code>&amp;&amp;</code> 、 <code>||</code> 也可以进行简写了</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// 等同于 a = a || b</span></span>
<span class="line"><span style="color:#E06C75;">a</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">||=</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">b</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 等同于 c = c &amp;&amp; d</span></span>
<span class="line"><span style="color:#E06C75;">c</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">&amp;&amp;=</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">d</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 等同于 e = e ?? f</span></span>
<span class="line"><span style="color:#E06C75;">e</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">??=</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">f</span><span style="color:#ABB2BF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="正则表达式匹配字符串的时候返回开始和结束索引" tabindex="-1">正则表达式匹配字符串的时候返回<code>开始</code>和<code>结束</code>索引 <a class="header-anchor" href="#正则表达式匹配字符串的时候返回开始和结束索引" aria-label="Permalink to &quot;正则表达式匹配字符串的时候返回\`开始\`和\`结束\`索引&quot;">​</a></h2><p>简单来说这个新属性就是允许我们告诉RegExp在返回match对象的时候， 给我们返回匹配到的子字符串的开始和结束索引。</p><p>给正则表达式添加一个</p><p><code>d</code></p><p>的标记来让它在匹配的时候给我们既返回匹配到的子字符串的起始位置还返回其结束位置:</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">str</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;sun and moon&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">regex</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#E06C75;"> /and/</span><span style="color:#C678DD;">d</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">matchObj</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">regex</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">exec</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">str</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">matchObj</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">[</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  &#39;and&#39;,</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  index: 4,</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  input: &#39;sun and moon&#39;,</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  groups: undefined,</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">  indices: [ [ 4, 7 ], groups: undefined ]</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">]</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,25)]))}const d=a(o,[["render",e]]);export{F as __pageData,d as default};
