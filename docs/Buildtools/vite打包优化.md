---
title: vite打包优化
---

# {{$frontmatter.title}}

## 打包优化需要优化一些什么东西？

- 将零碎的多个文件合并为 1 个文件
- 对打包后的结果(如:css/js 文件)进行压缩

## 解决方案

:::tip
cssCodeSplit

类型： boolean

默认： true

启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。
:::

该配置确实可以把所有得到 css 打包成一个。但是不能把 js 打包在一起啊。所以也不行。

### manualChunks

后来又看到 `vite` 的打包使用的是 `rollup`，可以通过 `build-rollupoptions` 配置自定义 `rollup` 的配置。 `rollup` 没有 `webpack=》splitChunks=》cacheGroups` 的属性。但是有 `manualChunks` 方法。

:::
manualChunks

Type: { [chunkAlias: string]: string[] } | ((id: string, {getModuleInfo, getModuleIds}) => string | void)

Allows the creation of custom shared common chunks. When using the object form, each property represents a chunk that contains the listed modules and all their dependencies if they are part of the module graph unless they are already in another manual chunk. The name of the chunk will be determined by the property key.

Note that it is not necessary for the listed modules themselves to be part of the module graph, which is useful if you are working with @rollup/plugin-node-resolve and use deep imports from packages. For instance
:::

简而言之可以通过文件 id（路径）自定义设置 key，将相同的 key 打包成一个文件。这不就和 webpack=》cacheGroups=》test 方法类似嘛。于是乎按照我的项目需求将打包分成三个大包。

```js
{
"build": {
    "rollupOptions": {
      "output": {
        "entryFileNames": `assets/entry/[name][hash].js`,
        "chunkFileNames": `assets/chunk/[name][hash].js`,
        "assetFileNames": `assets/file/[name][hash].[ext]`,
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor" //代码分割为第三方包
          }
          if (id.includes("views/modules")) {
            return "views-modules" //代码分割为业务视图
          }
          if (id.includes("views/common")) {
            return "views-common" //代码分割为common页面登录页
          }
        }
      }
    }
  }
}
```

## 参考资料

[vue 官方：性能优化](https://cn.vuejs.org/guide/best-practices/performance.html)

[vue-router: 路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)

[vite-plugin-chunk-split: Vite 代码拆包插件。支持多种拆包策略，可避免手动操作 manualChunks 潜在的循环依赖问题](https://github.com/sanyuan0704/vite-plugin-chunk-split/blob/master/README-CN.md)

[循环加载/循环依赖](https://es6.ruanyifeng.com/#docs/module-loader#%E5%BE%AA%E7%8E%AF%E5%8A%A0%E8%BD%BD)

[Vite - 代码分割策略](https://juejin.cn/post/7135671174893142030)

[vite 优化篇-弱网条件下 build 配置的优化](https://juejin.cn/post/7093817000102723620)

[webpack-bundle-analyzer 优化实战](https://juejin.cn/post/7035951233907032077)

[vite-自身的构建优化](http://yiming_chang.gitee.io/pure-admin-doc/pages/buildgood/#vite-%E8%87%AA%E8%BA%AB%E7%9A%84%E6%9E%84%E5%BB%BA%E4%BC%98%E5%8C%96)
