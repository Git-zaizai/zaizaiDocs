# `Vite`

## `loadEnv` 环境变量读取

从 `vue cli` 到 `vite` 环境变量居然还分出来使用了，客户端可使用 `import.meta.env` 读取，而在 `node` 居然没有
附加到 `process.env` 上，那怎么办呢 **╮(๑•́ ₃•̀๑)╭**

所以 `vite` 提供了 `loadEnv` 函数来获取配置数据（额，还要手动读... **(•ิ_•ิ)**）

+ 最常用 `vite.config.ts` 中的配置切换了

```ts
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

export default defineConfig(({mode}) => {
  const viteEnv = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv;

  来一段 巨量 if else 判断环境  <(￣︶￣)>

  return {
    plugins: [
      vue(),
      vueJsxPlugin(),
    ],
    base: viteEnv.VITE_BASE_URL,
    server: {
      host: '0.0.0.0',
      port: 1110,
      open: Boolean(viteEnv.VITE_OPEN),
    },
  };
});
```

## `vite` 插件： `vitrpress` `import.meta.url`静态注入

>前情提要：[环境变量注意情况](../Miscellaneous/vitepress.md#环境变量注意情况)
>
>官方文档：[前往](https://cn.vitejs.dev/guide/env-and-mode.html)

根据[**环境变量注意情况**](../Miscellaneous/vitepress.md#环境变量注意情况)的分析，这个插件只需要要在 `源文件中插入赋值代码`，然后再交给 `vite` 解析，所以插件运行要在
`Vite 核心插件` 插件之前。

### 分析

实验：

使用`vitrpress`中95%都是使用 `.md` 、`.vue` 和 `.js` 、`.ts` 文件再加上更少用的
`.tsx` 、`.jsx`无非就这几种文件而在 `"vitepress": "1.0.0-rc.20"` 版本的
`import.meta.url` 的常规规范(奇奇怪怪的不管了)

> `.md` 文件只能在 `<script></script>` 标签中使用 `import.meta.url`，其他地方编译不通过
>
> `.vue` 文件也是只能在 `<script></script>` 标签中使用 `import.meta.url`，其他地方编译不通过
>
> 而 `.js` 、`.ts` 、`.tsx` 、`.jsx`这几个灵活的很，在哪里有可能，但是也很好处理

可以看出这些文件可以分类为两大类 `SFC` 文件和 `js类` 文件，那就只需要处理两种文件

处理：

::: tip
`vite` 是采用了 **`静态替换`** 的方式扩展了  `import.meta.env`，
同时会收集对 `import.meta.env` 进行操作的代码解析合并后进行 **`静态替换`**，
那我们只需要在对

`SFC` 文件在 `<script>` 这一行下插入对 `import.meta.env` 的赋值语句

`js类` 文件直接在文件头插入赋值语句，这就很简单粗暴，就处理简单 ~(￣▽￣)~*
:::

### 实现

`viteManualInjectEnv()` 主函数：

首先，主函数要做一些配置与处理

```ts
import { Plugin } from 'vitepress'

export type Env = Record<string, string>
export type Option = {
  switch?: boolean // 开启插件
  env?: Env // .env 环境变量
  pathNameArray?: string[] // 要排除文件夹
}
/**
 * @function 主函数
 */
export default function viteManualInjectEnv(option: Option): Plugin | undefined {
  const opt = Object.assign({ switch: false }, option)
  if (!opt.switch && !opt?.env) return

  return {
    // 插件名称
    name: 'vite-plugin-vitepress-inject-env',
    // 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
    enforce: 'pre',
    // 代码转译，这个函数的功能类似于 `webpack` 的 `loader`
    transform(code, id) {

    }
  }
}
```

接着要实现 `transform()` 函数

```ts
import { Plugin } from 'vitepress'

export type Env = Record<string, string>
export type Option = {
  switch?: boolean // 开启插件
  env?: Env // .env 环境变量
  pathNameArray?: string[] // 要排除文件夹
}

/***
 * @function unique 去重 要排除的文件夹
 */
export function unique(pathNameList: string[] | undefined): string[] {
  if (pathNameList) {
    return [...new Set(['node_modules', '.vite'].concat(pathNameList))]
  }
  return ['node_modules', '.vite']
}


/**
 * @function 主函数
 */
export default function viteManualInjectEnv(option: Option): Plugin | undefined {
  const opt = Object.assign({ switch: false }, option)
  if (!opt.switch && !opt?.env) return

  return {
    // 插件名称
    name: 'vite-plugin-vitepress-inject-env',
    // 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
    enforce: 'pre',
    // 代码转译，这个函数的功能类似于 `webpack` 的 `loader`
    transform(code, id) {

    }
  }
}
```

下面主函数就变成了这样 Σ( ° △ °|||)︴

```ts
/**
 * @function 主函数
 */
export default function viteManualInjectEnv(option: Option): Plugin | undefined {
  const opt = Object.assign({ switch: false, pathNameList: [] }, option)
  if (!opt.switch && !opt?.env && !Object.values(opt.env as Env).length) return

  const pathNameList = [...new Set(['node_modules', '.vite'].concat(opt.pathNameList))]
  const fileRegex = /\.(md|vue|ts|js|tsx|jsx)$/ //匹配文件
  const codeReg = /import\.meta\.env/ // 匹配 代码
  const scrptRegex = /<script\b[^>]*>/g; // 匹配 <script>
  /**
   * 匹配 <script> 在 
   * ``` js
   * <script>
   * ``` 
   * 里面
   */
  const scriptCodeReg = /```[\s\S]*?<script\b[^>]*>[\s\S]*?<\/script>[\s\S]*?```/g
  const vueJsReg = /[?&]/ // 匹配 ****.vue?vue&type=script&setup=true&lang.ts的文件
  return {
    // 插件名称
    name: 'vite-plugin-vitepress-inject-env',
    // 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
    enforce: 'pre',
    // 代码转译，这个函数的功能类似于 `webpack` 的 `loader`
    // code 文件内容
    // id 文件绝对路径
    transform(code, id) {
      // 过滤 不要处理的 文件夹 里面的文件
      const isPath = pathNameList.some(item => id.includes(item))
      if (!isPath && fileRegex.test(id) && codeReg.test(code)) {
        let str: string | null = null
        if (id.endsWith('.md') || id.endsWith('.vue')) {
          if (scrptRegex.test(code) && !scriptCodeReg.test(code)) {
            str = scriptLoader(code, opt.env as Env)
          }
        } else
          /**
           * vite解析过程中 vue文件会被解析成为 ****.vue?vue&type=script&setup=true&lang.ts的文件
           * 额 插件会被调用多次，结尾又是 .ts 所以要加个判断 
           * 
           */
          if (!vueJsReg.test(id)) {
            str = jsCodeLoader(code, opt.env as Env)
          }
        return str ?? code

      }
    }
  }
}
```

到此为止主函数完成，接下来先写一个生成赋值语句的函数

>应该先贴子函数还是先主函数呢？感觉都差不多先看哪里 ˋ(′～‵)ˊ

```ts
/***
 * @function createEnvCode 生成赋值代码
 */
export function createEnvCode(env: Env): string {
  const list: string[] = []
  for (const key in env) {
    list.push(`import.meta.env.${key} = '${env[key]}'`)
  }
  return '\n' + list.join('\n') + '\n'
}
```

剩下的就是处理文件返回内容就可以了，先处理 `js类` 文件它简单粗暴 = `赋值语句 + 源文件内容`

`jsCodeLoader()` 函数：

```ts
/**
 * @function docScriptLoader 处理 `<script> 标签类` 文件
 */
export function scriptLoader(code: string, env: Env): string {
  const findcode = findScriptCode(code)
  const str = code.slice(0, findcode.lastindex)
  const envCode = createEnvCode(env)
  const strLast = code.slice(findcode.lastindex, code.length)

  return str + envCode + strLast
}
```

最后是处理 `SFC` 文件，它需要再`<script>` 这一行下插入对 `import.meta.env` 的赋值语句，所以得先
查找 `<script>` 标签

```ts
/**
 * @function findScriptCode 查找 <script> 标签位置
 */
export function findScriptCode(code: string) {
  const regex = /<script\b[^>]*>/g;
  const match = regex.exec(code)

  let lastindex = 0,
    isAdd = false
  if (match) {
    lastindex = match.index + match[0].length
    isAdd = true
  }
  return {
    isAdd,
    lastindex
  }
}
```

然后再是截取字符串拼接字符串就完成了

```ts
/**
 * @function docScriptLoader 处理 `<SFC> 标签类` 文件
 */
export function scriptLoader(code: string, env: Env): string {
  const findcode = findScriptCode(code)
  const str = code.slice(0, findcode.lastindex)
  const envCode = createEnvCode(env)
  const strLast = code.slice(findcode.lastindex, code.length)

  return str + envCode + strLast
}
```

最最后在 `vitepress` 的配置文件引入使用

```ts
import { defineConfig, loadEnv } from 'vitepress'

export default ({ mode }) => {
  const viteEnv = loadEnv(
    mode,
    process.cwd()
  )
  return defineConfig({
    vite: {
      plugins: [viteManualInjectEnv({ env: viteEnv })]
    }
  })
}
```

搞定，快不快不好说，反正能跑

### 完整代码

```ts
import { Plugin } from 'vitepress'

export type Env = Record<string, string>
export type Option = {
  switch?: boolean // 开启插件
  env?: Env
  pathNameArray?: string[]
}


/***
 * @function createEnvCode 生成赋值代码
 */
export function createEnvCode(env: Env): string {
  const list: string[] = []
  for (const key in env) {
    list.push(`import.meta.env.${key} = '${env[key]}'`)
  }
  return '\n' + list.join('\n') + '\n'
}

/**
 * @function findScriptCode 查找 <script> 标签位置
 */
export function findScriptCode(code: string) {
  const regex = /<script\b[^>]*>/g;
  const match = regex.exec(code)

  let lastindex = 0,
    isAdd = false
  if (match) {
    lastindex = match.index + match[0].length
    isAdd = true
  }
  return {
    isAdd,
    lastindex
  }
}

/**
 * @function docScriptLoader 处理 `SFC类` 文件
 */
export function scriptLoader(code: string, env: Env): string {
  const findcode = findScriptCode(code)
  const str = code.slice(0, findcode.lastindex)
  const envCode = createEnvCode(env)
  const strLast = code.slice(findcode.lastindex, code.length)

  return str + envCode + strLast
}


/**
 * 
 * @function jsCodeLoader 处理 `js类` 文件
 */
export function jsCodeLoader(code: string, env: Env): string {
  const envCode = createEnvCode(env)
  return envCode + code
}

/**
 * @function 主函数
 */
export default function viteManualInjectEnv(option: Option): Plugin | undefined {
  const opt = Object.assign({ switch: false, pathNameList: [] }, option)
  if (!opt.switch && !opt?.env && !Object.values(opt.env as Env).length) return

  const pathNameList = [...new Set(['node_modules', '.vite'].concat(opt.pathNameList))]
  const fileRegex = /\.(md|vue|ts|js|tsx|jsx)$/ //匹配文件
  const codeReg = /import\.meta\.env/ // 匹配 代码
  const scrptRegex = /<script\b[^>]*>/g; // 匹配 <script>
  /**
   * 匹配 <script> 在 
   * ``` js
   * <script>
   * ``` 
   * 里面
   */
  const scriptCodeReg = /```[\s\S]*?<script\b[^>]*>[\s\S]*?<\/script>[\s\S]*?```/g
  const vueJsReg = /[?&]/ // 匹配 ****.vue?vue&type=script&setup=true&lang.ts的文件
  return {
    // 插件名称
    name: 'vite-plugin-vitepress-inject-env',
    // 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
    enforce: 'pre',
    // 代码转译，这个函数的功能类似于 `webpack` 的 `loader`
    // code 文件内容
    // id 文件绝对路径
    transform(code, id) {
      // 过滤 不要处理的 文件夹 里面的文件
      const isPath = pathNameList.some(item => id.includes(item))
      if (!isPath && fileRegex.test(id) && codeReg.test(code)) {
        let str: string | null = null
        if (id.endsWith('.md') || id.endsWith('.vue')) {
          if (scrptRegex.test(code) && !scriptCodeReg.test(code)) {
            str = scriptLoader(code, opt.env as Env)
          }
        } else
          /**
           * vite解析过程中 vue文件会被解析成为 ****.vue?vue&type=script&setup=true&lang.ts的文件
           * 额 插件会被调用多次，结尾又是 .ts 所以要加个判断 
           * 
           */
          if (!vueJsReg.test(id)) {
            str = jsCodeLoader(code, opt.env as Env)
          }
        return str ?? code

      }
    }
  }
}
```
