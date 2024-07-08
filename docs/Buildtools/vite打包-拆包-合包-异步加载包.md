---
title: vite打包-拆包-合包-异步加载包
---

# {{$frontmatter.title}}

## 打包

**什么样的资源会被打包？**

从入口文件开始，进行扩散性关联扫描，被引用且被使用过至少 1 次的资源会被打包

**什么样的文件会被独立成一个包？**

- 默认情况下，被引用了至少两次的文件，会被打成一个独立的包

如: `Utils01.ts` 被 `Main.vue`, `Other.vue` 两个 vue 文件引用，则`Utils01.ts`会被打成一个独立的包

- 异步组件（含普通异步组件以及异步路由组件）会被打成一个独立包

**什么样的资源会被合并打包？**

- 默认情况下，只被引用了一次的文件会被合并到调用处打包

如：`Utils01.ts` 只被 `Other.vue` 文件引用，则`Utils01.ts`会被打包到`Other.vue`中

- 通过动态扫描引入的包会被合并打包.

这里的合并打包有两种情况：

1. 动态扫描引入的 vue 文件只在一个 vue 组件中使用，那么动态引入的 vue 文件，会被合并打包到调用处
2. 动态扫描引入的 vue 文件在多个 vue 组件中使用，那么动态引入的 vue 文件，会被合并打包到一个单独的 chunk

```ts
import { Component as VueComponent } from 'vue'

const compMap = new Map<string, VueComponent>()
const mockFiles = import.meta.glob('./demo/*.vue', {
  eager: true,
  import: 'default',
})
Object.keys(mockFiles).forEach(key => {
  const defaultObj = mockFiles[key]
  //@ts-ignore
  compMap.set(defaultObj.name, defaultObj)
})
```

## 如何手动合并零碎的文件

**chunk 碎片 是如何产生的？**

除了入口点（静态入口点、动态入口点）单独生成一个 chunk 之外，当一个模块被 2 个或以上的 `chunk` 引用，这个模块会单独生成一个 `chunk`。

而模块信息中，有两个字段可以利用，一个是 `importers`，一个是 `dynamicImporters`，对应着当前模块被静态引入的模块，以及被动态引入的模块。

当前模块的 `importers.length + dynamicImporters.length > 1`，就可以认为当前模块会被单独打成一个`chunk`

**如何通过手动分包解决 chunk 碎片 问题？**

让多个`module`拥有相同的`chunk名称`

## 如何鉴别哪些需要合包？

碎片化的产物可能需要合包

## 如何判断合包或拆包之后，是有效优化？

某个界面，在资源请求数量没有明显增多的情况下，总资源量变小了。特别要注意合包之后，不要导致首页资源加载变多

## 基于 vite3 发现的一些手动合包/拆包的规律

1. 如果 chunk 中的有 1 个 module 有在首页使用到，那么该 chunk 必然会在首页加载（这可能导致首页加载了不必要的资源）
2. 如果对异步路由组件进行合包，那被合包的 chunk, 必然会在首页加载（这个异步路由对于首页而言，可能也是不必要的资源）
3. 如果对异步组件(如:`const HelloWorld = defineAsyncComponent(() => import('./HelloWorld.vue'))`)进行合包, 则该合包的 chunk 必然会在首页加载（这个异步组件对于首页而言，可能也是不必要的资源）
4. vite3 默认会根据引用情况对第三方依赖，进行拆包/合包，通常情况比我们自己再进行拆包合包形成的包的大小更合理（更小）

总结：

1. 尽量只对自己编写的碎片化的普通 ts/js 文件进行合包(所谓普通 ts/js 如：XxxUtil, XxxApi 之类的)
2. 不要对异步路由组件进行合包
3. 不要对异步组件合包，除非该 chunk 中所有的异步组件本来就要在首页使用
4. 尽量不要手动对第三方依赖进行合包/分包

## 参考资料

[分析 vite2.x/rollup 分包原理，解决 chunk 碎片问题](https://juejin.cn/post/7103730522517569567)

[Vite 如何打包分割代码](https://blog.csdn.net/sinat_37255207/article/details/126574286)

[记一次 vite2.x 打包优化过程](https://segmentfault.com/a/1190000041464140)

[vite2 打包的时候 vendor-xxx.js 文件过大的解决方法](https://www.cnblogs.com/jyk/p/16029074.html)

[Vite 异步 Chunk 加载优化](https://www.cnblogs.com/guangzan/p/14807289.html)
