---
title: vite打包
---

# {{$frontmatter.title}}

## vite.config.ts 配置

```ts
import { ConfigEnv, loadEnv, PluginOption, UserConfigExport } from 'vite'

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const resultConfig: UserConfigExport = {
    build: {
      // 是否生成sourcemap文件, 默认:false, 生产应该设置为false，当需要调试打包后的源代码时，要设置为true
      sourcemap: true,
      // 打包结果是否minify. 默认为true, 当像看看打包后的文件内容时，可以设置为false，生产应该设置为true
      minify: false,
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容的hash值
          entryFileNames: 'js/[name].[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'js/[name].[hash].js',
          // 用于输出静态资源（如：css，图片等）的命名，[ext]表示文件扩展名
          assetFileNames: '[ext]/[name].[hash].[ext]',
          // 拆分js到模块文件夹
          /*
          chunkFileNames: chunkInfo => {
            const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []
            const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'
            return `js/${fileName}/[name].[hash].js`
          },
          */
        },
      },
    },
  }
  return resultConfig
}
```

## umd.cjs 文件 process.env.NODE_ENV 报错

`process not defined`

打包之后的 umd.cjs 文件包含 `process\.env\.NODE_ENV`, 而浏览器环境是没有`process对象的`

### 解决方案

```
把 `process\.env\.NODE_ENV` 这个替换掉
```

```shell
pnpm add rollup-plugin-replace -D
```

```js
import replace from 'rollup-plugin-replace'

const env = process.env.NODE_ENV

plugins: [
  replace({
    'process.env.NODE_ENV': JSON.stringify(env),
  }),
]
```

## 相关文章

[vite 打包优化](./vite打包优化)

## 参考资料

[vite 打包 npm lib 库, 为什么直接引入组件不包含 css?](https://www.zhihu.com/question/470701634)

[vite 库打包模式生成类型文件及 CSS 引入修复 - 使用 Vite 制作组件库](https://www.bilibili.com/video/BV1EY411M7DY/?spm_id_from=333.788&vd_source=23294ec8baabb0692f8df2972e225409)

[vite 打包 lib 库](https://juejin.cn/post/7073646687968821256)

[使用 Vite 库模式打包一个 Vue 组件](https://juejin.cn/post/7124967210749001765)

[如何使用 Vite.js 构建 CSS 库](https://www.freecodecamp.org/chinese/news/build-a-css-library-with-vitejs/)

[将 scss 源文件放入 vite 打包结果目录](https://stackoverflow.com/questions/73314758/vite-building-a-sass-file-as-it-is-written)

[vite 自定义 打包文件名](https://blog.cinob.cn/archives/393)

[vite 官网：库模式](https://vitejs.cn/vite3-cn/guide/build.html#library-mode)

[Vite 打包性能优化](https://blog.csdn.net/weixin_43443341/article/details/127805524)

[vite 打包拆分 js 和 css](https://www.cnblogs.com/peter-web/p/16049628.html)

[vite 拆包策略](https://github.com/laoyutong/blog/issues/27)

[rollup 打包 js 的注意点](https://www.haorooms.com/post/rollup_tips)

[使用 rollup 打包 JS](https://juejin.cn/post/6844903731343933453)
