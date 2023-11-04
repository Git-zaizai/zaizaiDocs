import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8218e65d.js";const b=JSON.parse('{"title":"mongodb","description":"","frontmatter":{},"headers":[],"relativePath":"Backend/Mongodb.md","filePath":"Backend/Mongodb.md","lastUpdated":1699082320000}'),o={name:"Backend/Mongodb.md"},p=l(`<h1 id="mongodb" tabindex="-1"><code>mongodb</code> <a class="header-anchor" href="#mongodb" aria-label="Permalink to &quot;\`mongodb\`&quot;">​</a></h1><h2 id="node使用mongodb" tabindex="-1"><code>node使用mongodb</code> <a class="header-anchor" href="#node使用mongodb" aria-label="Permalink to &quot;\`node使用mongodb\`&quot;">​</a></h2><p>环境：</p><ul><li>mongodb 6.0.1</li><li>node 18+ module:module</li><li>mongodb 链接库 官方出的 mongodb 链接库</li></ul><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#61AFEF;">pnpm</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">add</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">mongodb</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>不多 bb 直接开码</p><p>首先，简单的封装一下</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">MongoClient</span><span style="color:#ABB2BF;"> } </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;mongodb&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">MONGDB_CONFIG</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">url</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;mongodb://127.0.0.1:27017/&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">database</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;gadgets&#39;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">async</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">mongodb</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">title</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">try</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">mongoClient</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">connect</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">db</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">mongoClient</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">db</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">MONGDB_CONFIG</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">database</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">titleDB</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">db</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">collection</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">title</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;mongodb 连接 ===&gt; 成功&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> {</span><span style="color:#E06C75;">mongoClient</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">db</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">titleDB</span><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#ABB2BF;">  } </span><span style="color:#C678DD;">catch</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">e</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;mongodb 连接 ===&gt; 失败&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">Promise</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">reject</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">e</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>使用</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">async</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">function</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">init</span><span style="color:#ABB2BF;">(){</span></span>
<span class="line"><span style="color:#ABB2BF;">   </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> { </span><span style="color:#E5C07B;">titleDB</span><span style="color:#ABB2BF;"> } </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">mongodb</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;user&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">   </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">userArr</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">await</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">titleDB</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">find</span><span style="color:#ABB2BF;">({}).</span><span style="color:#61AFEF;">toArray</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">   </span><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">userArr</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>文档：<a href="https://www.mongodb.com/docs/drivers/node/current/" target="_blank" rel="noreferrer">node mongodb</a></p><h2 id="objectid" tabindex="-1"><code>ObjectId</code> <a class="header-anchor" href="#objectid" aria-label="Permalink to &quot;\`ObjectId\`&quot;">​</a></h2>`,12),e=[p];function r(c,B,t,y,i,d){return n(),a("div",null,e)}const A=s(o,[["render",r]]);export{b as __pageData,A as default};