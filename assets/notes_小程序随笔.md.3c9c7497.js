import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8218e65d.js";const p="/assets/image.e57de781.png",o="/assets/xinjianenjian.689b0817.png",e="/assets/kaifazheshezhi.999a41fa.png",b=JSON.parse('{"title":"小程序随笔","description":"","frontmatter":{},"headers":[],"relativePath":"notes/小程序随笔.md","filePath":"notes/小程序随笔.md","lastUpdated":1709906007000}'),r={name:"notes/小程序随笔.md"},c=l('<h1 id="小程序随笔" tabindex="-1">小程序随笔 <a class="header-anchor" href="#小程序随笔" aria-label="Permalink to &quot;小程序随笔&quot;">​</a></h1><h2 id="原生微信小程序-模块化" tabindex="-1">原生微信小程序 模块化 <a class="header-anchor" href="#原生微信小程序-模块化" aria-label="Permalink to &quot;原生微信小程序 模块化&quot;">​</a></h2><p>截止 2024-2-23，目前微信小程序的模块化默认为 <code>commonJS </code> ,如果你想使用 <code>ES Module</code> 就必需要打开 <code>es6转es5</code> 的编译项目</p><blockquote><p>这样会把所有es6的代码全部转换转换为es5，但是你又不想转换其他的es6代码 你就得考虑你的项目需求，如果你不想把项目体积小店就不打开 <code>es6转es5</code> 如果你想使用 <code>ES Module</code> 不考虑其他那就随意</p></blockquote><p><img src="'+p+'" alt="alt text"></p><h2 id="原生微信小程序-环境变量-方案" tabindex="-1">原生微信小程序 <code>环境变量</code> 方案 <a class="header-anchor" href="#原生微信小程序-环境变量-方案" aria-label="Permalink to &quot;原生微信小程序 `环境变量` 方案&quot;">​</a></h2><h3 id="wx-getaccountinfosync-官方提供的api" tabindex="-1"><code>wx.getAccountInfoSync</code> 官方提供的API <a class="header-anchor" href="#wx-getaccountinfosync-官方提供的api" aria-label="Permalink to &quot;`wx.getAccountInfoSync` 官方提供的API&quot;">​</a></h3><p><a href="https://developers.weixin.qq.com/miniprogram/dev/api/open-api/account-info/wx.getAccountInfoSync.html" target="_blank" rel="noreferrer">文档：获取小程序当前版本信息</a></p><div class="danger custom-block"><p class="custom-block-title">缺点：</p><p>在提审时有跟问题，提审的版本会认为是develop版导致请求的数据是测试版的，然后被审核拒绝。</p><p>处理办法： develop 环境的接口数据尽量模拟正式环境的接口数据 获取直接放正式环境的接口数据</p></div><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#7F848E;font-style:italic;">// 自动根据版本切换接口请求地址</span></span>\n<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">miniProgram</span><span style="color:#ABB2BF;">: { </span><span style="color:#E5C07B;">envVersion</span><span style="color:#ABB2BF;"> } } </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">wx</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">getAccountInfoSync</span><span style="color:#ABB2BF;">();</span></span>\n<span class="line"><span style="color:#C678DD;">let</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">url</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;&#39;</span><span style="color:#ABB2BF;">;</span></span>\n<span class="line"><span style="color:#C678DD;">switch</span><span style="color:#ABB2BF;"> (</span><span style="color:#E06C75;">envVersion</span><span style="color:#ABB2BF;">) {</span></span>\n<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">case</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;develop&#39;</span><span style="color:#ABB2BF;">:</span></span>\n<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">url</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">`</span><span style="color:#C678DD;">${</span><span style="color:#E5C07B;">defaultConfig</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">devUrl</span><span style="color:#C678DD;">}${</span><span style="color:#E5C07B;">params</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">url</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">`</span><span style="color:#ABB2BF;">;</span></span>\n<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">break</span><span style="color:#ABB2BF;">;</span></span>\n<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">case</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;trial&#39;</span><span style="color:#ABB2BF;">:</span></span>\n<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">url</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">`</span><span style="color:#C678DD;">${</span><span style="color:#E5C07B;">defaultConfig</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">devUrl</span><span style="color:#C678DD;">}${</span><span style="color:#E5C07B;">params</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">url</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">`</span><span style="color:#ABB2BF;">;</span></span>\n<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">break</span><span style="color:#ABB2BF;">;</span></span>\n<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">case</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;release&#39;</span><span style="color:#ABB2BF;">:</span></span>\n<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">url</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">`</span><span style="color:#C678DD;">${</span><span style="color:#E5C07B;">defaultConfig</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">prodUrl</span><span style="color:#C678DD;">}${</span><span style="color:#E5C07B;">params</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">url</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">`</span><span style="color:#ABB2BF;">;</span></span>\n<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">break</span><span style="color:#ABB2BF;">;</span></span>\n<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">default</span><span style="color:#ABB2BF;">:</span></span>\n<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">url</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">`</span><span style="color:#C678DD;">${</span><span style="color:#E5C07B;">defaultConfig</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">baseUrl</span><span style="color:#C678DD;">}${</span><span style="color:#E5C07B;">params</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">url</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">`</span><span style="color:#ABB2BF;">;</span></span>\n<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#C678DD;">break</span><span style="color:#ABB2BF;">;</span></span>\n<span class="line"><span style="color:#ABB2BF;">}</span></span>\n<span class="line"><span style="color:#C678DD;">export</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">url</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="构建npm功能-方案" tabindex="-1"><code>构建npm功能</code> 方案 <a class="header-anchor" href="#构建npm功能-方案" aria-label="Permalink to &quot;`构建npm功能` 方案&quot;">​</a></h3><p>安装了插件并构建npm之后，点上传代码，<code>node_modules</code> 文件夹是不会上传的， <a href="https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html#packOptions" target="_blank" rel="noreferrer">project.config.json</a>配置项中的packOptions.ignore字段， 用以配置打包时对符合指定规则的文件或文件夹进行忽略，以跳过打包的过程，这些文件或文件夹将不会出现在预览或上传的结果内</p><p>首先在根目录新建各种文件 <code>按照自己习惯就好</code></p><p><img src="'+o+`" alt="alt text"></p><p>接着在终端执行 <code>npm init</code>，然后在 <code>package.json</code>中进行配置</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#ABB2BF;">{</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">&quot;type&quot;</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;module&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">&quot;scripts&quot;</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">&quot;build&quot;</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;SET NODE_ENV=production &amp;&amp; node ./build/index.js&quot;</span><span style="color:#ABB2BF;">,</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">&quot;dev&quot;</span><span style="color:#ABB2BF;">: </span><span style="color:#98C379;">&quot;SET NODE_ENV=development &amp;&amp; node ./build/index.js&quot;</span></span>
<span class="line"><span style="color:#ABB2BF;">  },</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>然后在开发者工具设置</p><p><img src="`+e+`" alt="alt text"></p><p>最后编写 <code>./build/index.js</code></p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki one-dark-pro"><code><span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">fs</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;node:fs&#39;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">path</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;node:path&#39;</span></span>
<span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">fileURLToPath</span><span style="color:#ABB2BF;"> } </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;url&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">__dirname</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">path</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">dirname</span><span style="color:#ABB2BF;">(</span><span style="color:#61AFEF;">fileURLToPath</span><span style="color:#ABB2BF;">(</span><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">meta</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">url</span><span style="color:#ABB2BF;">))</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">ph</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">path</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">join</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">__dirname</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&#39;../&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">NODE_ENV</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">process</span><span style="color:#ABB2BF;">.</span><span style="color:#E5C07B;">env</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">NODE_ENV</span></span>
<span class="line"><span style="color:#C678DD;">let</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">config</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">files</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">fs</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">readdirSync</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">ph</span><span style="color:#ABB2BF;">).</span><span style="color:#61AFEF;">filter</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">v</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">v</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">includes</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;.env&#39;</span><span style="color:#ABB2BF;">))</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">envFile</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">NODE_ENV</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">===</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;development&#39;</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">?</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">files</span><span style="color:#ABB2BF;">[</span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">] </span><span style="color:#C678DD;">:</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">files</span><span style="color:#ABB2BF;">[</span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">let</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">str</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">fs</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">readFileSync</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">path</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">join</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">ph</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">envFile</span><span style="color:#ABB2BF;">)).</span><span style="color:#61AFEF;">toString</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#E5C07B;">str</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">split</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">/\\r\\n/</span><span style="color:#ABB2BF;">).</span><span style="color:#61AFEF;">forEach</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">sv</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">=&gt;</span><span style="color:#ABB2BF;"> {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#C678DD;">let</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">svs</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">sv</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">split</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;=&#39;</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">config</span><span style="color:#ABB2BF;">[</span><span style="color:#E06C75;">svs</span><span style="color:#ABB2BF;">[</span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">].</span><span style="color:#61AFEF;">trim</span><span style="color:#ABB2BF;">()] </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">svs</span><span style="color:#ABB2BF;">[</span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">].</span><span style="color:#61AFEF;">trim</span><span style="color:#ABB2BF;">()</span></span>
<span class="line"><span style="color:#ABB2BF;">})</span></span>
<span class="line"><span style="color:#C678DD;">let</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">content</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;&#39;</span></span>
<span class="line"><span style="color:#C678DD;">for</span><span style="color:#ABB2BF;"> (</span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">key</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">in</span><span style="color:#ABB2BF;"> </span><span style="color:#E06C75;">config</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">content</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">+=</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">\`module.exports.</span><span style="color:#C678DD;">\${</span><span style="color:#E06C75;">key</span><span style="color:#C678DD;">}</span><span style="color:#98C379;"> = </span><span style="color:#C678DD;">\${</span><span style="color:#E06C75;">config</span><span style="color:#ABB2BF;">[</span><span style="color:#E06C75;">key</span><span style="color:#ABB2BF;">] </span><span style="color:#56B6C2;">||</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;</span><span style="color:#56B6C2;">\\&#39;\\&#39;</span><span style="color:#98C379;">&#39;</span><span style="color:#C678DD;">}</span><span style="color:#56B6C2;">\\n</span><span style="color:#98C379;">\`</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"><span style="color:#E5C07B;">fs</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">writeFileSync</span><span style="color:#ABB2BF;">(</span><span style="color:#E5C07B;">path</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">join</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;">__dirname</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&#39;../env.js&#39;</span><span style="color:#ABB2BF;">), </span><span style="color:#E06C75;">content</span><span style="color:#ABB2BF;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>搞完，收工 😏</p>`,21),B=[c];function t(y,i,F,A,C,d){return n(),a("div",null,B)}const m=s(r,[["render",t]]);export{b as __pageData,m as default};
