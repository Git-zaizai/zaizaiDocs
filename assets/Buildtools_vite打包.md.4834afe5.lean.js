import{_ as l,o as e,c as p,k as n,a as o,t as r,O as t}from"./chunks/framework.218070ce.js";const m=JSON.parse('{"title":"vite打包","description":"","frontmatter":{"title":"vite打包"},"headers":[],"relativePath":"Buildtools/vite打包.md","filePath":"Buildtools/vite打包.md","lastUpdated":1743585365000}'),c={name:"Buildtools/vite打包.md"},i={id:"frontmatter-title",tabindex:"-1"};function B(a,s,y,b,u,d){return e(),p("div",null,[n("h1",i,[o(r(a.$frontmatter.title)+" ",1),s[0]||(s[0]=n("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{$frontmatter.title}}"'},"​",-1))]),s[1]||(s[1]=t(`<h2 id="vite-config-ts-配置" tabindex="-1">vite.config.ts 配置 <a class="header-anchor" href="#vite-config-ts-配置" aria-label="Permalink to &quot;vite.config.ts 配置&quot;">​</a></h2><div class="language-ts line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">ConfigEnv</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">loadEnv</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">PluginOption</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">UserConfigExport</span><span style="color:#ABB2BF;"> } </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;vite&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">export</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">default</span><span style="color:#ABB2BF;"> ({ </span><span style="color:#E06C75;font-style:italic;">command</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;font-style:italic;">mode</span><span style="color:#ABB2BF;"> }: </span><span style="color:#E5C07B;">ConfigEnv</span><span style="color:#ABB2BF;">): </span><span style="color:#E5C07B;">UserConfigExport</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">resultConfig</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">UserConfigExport</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">build</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#7F848E;font-style:italic;">// 是否生成sourcemap文件, 默认:false, 生产应该设置为false，当需要调试打包后的源代码时，要设置为true</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E06C75;">sourcemap</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">true</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#7F848E;font-style:italic;">// 打包结果是否minify. 默认为true, 当像看看打包后的文件内容时，可以设置为false，生产应该设置为true</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E06C75;">minify</span><span style="color:#ABB2BF;">: </span><span style="color:#D19A66;">false</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">      </span><span style="color:#E06C75;">rollupOptions</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">        </span><span style="color:#E06C75;">output</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#61AFEF;">manualChunks</span><span style="color:#ABB2BF;">: (</span><span style="color:#E06C75;font-style:italic;">id</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">string</span><span style="color:#ABB2BF;">) </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">            </span><span style="color:#C678DD;">if</span><span style="color:#ABB2BF;"> (</span><span style="color:#E5C07B;">id</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">includes</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;node_modules&#39;</span><span style="color:#ABB2BF;">)) {</span></span>
<span class="line"><span style="color:#ABB2BF;">              </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">id</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">toString</span><span style="color:#ABB2BF;">().</span><span style="color:#61AFEF;">split</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;node_modules/&#39;</span><span style="color:#ABB2BF;">)[</span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">].</span><span style="color:#61AFEF;">split</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;/&#39;</span><span style="color:#ABB2BF;">)[</span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">].</span><span style="color:#61AFEF;">toString</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">            }</span></span>
<span class="line"><span style="color:#ABB2BF;">          },</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#7F848E;font-style:italic;">// 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容的hash值</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E06C75;">entryFileNames</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;js/[name].[hash].js&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#7F848E;font-style:italic;">// 用于命名代码拆分时创建的共享块的输出命名</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E06C75;">chunkFileNames</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;js/[name].[hash].js&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#7F848E;font-style:italic;">// 用于输出静态资源（如：css，图片等）的命名，[ext]表示文件扩展名</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#E06C75;">assetFileNames</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&#39;[ext]/[name].[hash].[ext]&#39;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#7F848E;font-style:italic;">// 拆分js到模块文件夹</span></span>
<span class="line"><span style="color:#ABB2BF;">          </span><span style="color:#7F848E;font-style:italic;">/*</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">          chunkFileNames: chunkInfo =&gt; {</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split(&#39;/&#39;) : []</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">            const fileName = facadeModuleId[facadeModuleId.length - 2] || &#39;[name]&#39;</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">            return \`js/\${fileName}/[name].[hash].js\`</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">          },</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">          */</span></span>
<span class="line"><span style="color:#ABB2BF;">        },</span></span>
<span class="line"><span style="color:#ABB2BF;">      },</span></span>
<span class="line"><span style="color:#ABB2BF;">    },</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">return</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">resultConfig</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><h2 id="umd-cjs-文件-process-env-node-env-报错" tabindex="-1">umd.cjs 文件 p<wbr>rocess.env.NODE_ENV 报错 <a class="header-anchor" href="#umd-cjs-文件-process-env-node-env-报错" aria-label="Permalink to &quot;umd.cjs 文件 p&lt;wbr&gt;rocess.env.NODE_ENV 报错&quot;">​</a></h2><p><code>process not defined</code></p><p>打包之后的 umd.cjs 文件包含 <code>process\\.env\\.NODE_ENV</code>, 而浏览器环境是没有<code>process对象的</code></p><h3 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h3><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#abb2bf;">把 \`process\\.env\\.NODE_ENV\` 这个替换掉</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-shell line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#61AFEF;">pnpm</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">add</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">rollup-plugin-replace</span><span style="color:#ABB2BF;"> </span><span style="color:#D19A66;">-D</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">replace</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;rollup-plugin-replace&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">env</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">process</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">env</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">NODE_ENV</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E06C75;">plugins</span><span style="color:#ABB2BF;">: [</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#61AFEF;">replace</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#98C379;">&#39;p<wbr>rocess.env.NODE_ENV&#39;</span><span style="color:#ABB2BF;">: </span><span style="color:#E5C07B;">JSON</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">stringify</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">env</span><span style="color:#ABB2BF;">),</span></span>
<span class="line"><span style="color:#ABB2BF;">  }),</span></span>
<span class="line"><span style="color:#ABB2BF;">]</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="相关文章" tabindex="-1">相关文章 <a class="header-anchor" href="#相关文章" aria-label="Permalink to &quot;相关文章&quot;">​</a></h2><p><a href="./vite打包优化">vite 打包优化</a></p><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><p><a href="https://www.zhihu.com/question/470701634" target="_blank" rel="noreferrer">vite 打包 npm lib 库, 为什么直接引入组件不包含 css?</a></p><p><a href="https://www.bilibili.com/video/BV1EY411M7DY/?spm_id_from=333.788&amp;vd_source=23294ec8baabb0692f8df2972e225409" target="_blank" rel="noreferrer">vite 库打包模式生成类型文件及 CSS 引入修复 - 使用 Vite 制作组件库</a></p><p><a href="https://juejin.cn/post/7073646687968821256" target="_blank" rel="noreferrer">vite 打包 lib 库</a></p><p><a href="https://juejin.cn/post/7124967210749001765" target="_blank" rel="noreferrer">使用 Vite 库模式打包一个 Vue 组件</a></p><p><a href="https://www.freecodecamp.org/chinese/news/build-a-css-library-with-vitejs/" target="_blank" rel="noreferrer">如何使用 Vite.js 构建 CSS 库</a></p><p><a href="https://stackoverflow.com/questions/73314758/vite-building-a-sass-file-as-it-is-written" target="_blank" rel="noreferrer">将 scss 源文件放入 vite 打包结果目录</a></p><p><a href="https://blog.cinob.cn/archives/393" target="_blank" rel="noreferrer">vite 自定义 打包文件名</a></p><p><a href="https://vitejs.cn/vite3-cn/guide/build.html#library-mode" target="_blank" rel="noreferrer">vite 官网：库模式</a></p><p><a href="https://blog.csdn.net/weixin_43443341/article/details/127805524" target="_blank" rel="noreferrer">Vite 打包性能优化</a></p><p><a href="https://www.cnblogs.com/peter-web/p/16049628.html" target="_blank" rel="noreferrer">vite 打包拆分 js 和 css</a></p><p><a href="https://github.com/laoyutong/blog/issues/27" target="_blank" rel="noreferrer">vite 拆包策略</a></p><p><a href="https://www.haorooms.com/post/rollup_tips" target="_blank" rel="noreferrer">rollup 打包 js 的注意点</a></p><p><a href="https://juejin.cn/post/6844903731343933453" target="_blank" rel="noreferrer">使用 rollup 打包 JS</a></p>`,25))])}const A=l(c,[["render",B]]);export{m as __pageData,A as default};
