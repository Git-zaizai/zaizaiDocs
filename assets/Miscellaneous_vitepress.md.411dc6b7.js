import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.7518ccd6.js";const d=JSON.parse('{"title":"VitePress","description":"","frontmatter":{},"headers":[],"relativePath":"Miscellaneous/vitepress.md","filePath":"Miscellaneous/vitepress.md","lastUpdated":1698760601000}'),l={name:"Miscellaneous/vitepress.md"},e=p(`<h1 id="vitepress" tabindex="-1">VitePress <a class="header-anchor" href="#vitepress" aria-label="Permalink to &quot;VitePress&quot;">​</a></h1><h2 id="vitepress-的路径别名" tabindex="-1">VitePress 的路径别名 <a class="header-anchor" href="#vitepress-的路径别名" aria-label="Permalink to &quot;VitePress 的路径别名&quot;">​</a></h2><p>在.vitepress 的 config 配置中添加 vite 配置</p><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">defineConfig</span><span style="color:#ABB2BF;"> } </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;vitepress&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">resolve</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">join</span><span style="color:#ABB2BF;"> } </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;node:path&#39;</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#C678DD;">export</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">default</span><span style="color:#ABB2BF;"> () </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">pathAlias</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;font-style:italic;">path</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">string</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">resolve</span><span style="color:#ABB2BF;">(</span><span style="color:#61AFEF;">join</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">__dirname</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">path</span><span style="color:#ABB2BF;">));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">defineConfig</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">vite</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E06C75;">resolve</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#E06C75;">alias</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#98C379;">&#39;/~&#39;</span><span style="color:#ABB2BF;">: </span><span style="color:#61AFEF;">pathAlias</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;../components&#39;</span><span style="color:#ABB2BF;">),</span></span>
<span class="line"><span style="color:#ABB2BF;">        },</span></span>
<span class="line"><span style="color:#ABB2BF;">      },</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#ABB2BF;">  });</span></span>
<span class="line"><span style="color:#ABB2BF;">};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>::: error 注意： 路径的别名不能使用 <code>@</code> 或 <code>#</code> 这两个符号，在 vitepress 内部已经使用了，经过测试不能覆盖</p><p>所以不要使用，换其他符号 :::</p>`,6),o=[e];function r(t,c,B,i,y,A){return n(),a("div",null,o)}const b=s(l,[["render",r]]);export{d as __pageData,b as default};