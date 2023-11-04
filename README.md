# 崽崽的文档

#### 基于 VitePress 的个人前端导航页面模板
#### 记录各种开发学习或技巧

## 目录说明

``` Shell
.
|-- .github  // github自动部署
|   `-- workflows
|       `-- blank.yml
|-- .vite // 缓存目录
|-- .vitepress // vitepress配置目录
|   |-- config.mts // 主配置
|   |-- configs
|   |   |-- head.ts // html -> head 配置
|   |   |-- index.ts
|   |   |-- nav.ts // 头部导航 配置
|   |   `-- sidebar.ts // 侧边栏 配置
|   `-- theme // vitepress 主题配置
|       |-- composables
|       |   `-- useMediumZoom.ts
|       |-- index.ts
|       `-- styles // 主题 css
|           |-- index.scss 
|           |-- medium-zoom.scss
|           |-- rainbow.scss
|           |-- vars.scss
|           `-- vitepress.scss
|-- components // 各种组件
|-- dist
|-- docs // 编写文档的目录
|-- vitePlugin // 自定义vite插件
|-- env.d.ts
|-- package.json
|-- pnpm-lock.yaml
|-- .gitignore
|-- tsconfig.json
`-- README.md
```

## 可用的路径别名

> 在 vitepress中 `@` 与 `#` 被内置使用，所以还是不要用了

alias: `/~/` -> `/components`

## 环境.env说明

环境模式自定义了一下，不分开 `.env.xxx` 文件，只需要 `.env` 一个文件

``` ts
# 开发时
# 开发 base 路径
VITE_BASE = / 
# 端口
VITE_PORT = 7373

# 生产环境的配置
# github pages 路径
VITE_GITHUB_PAGES_BASE = /zaizaiDocs/
# 有域名填上
VITE_REFERE = docs.xiaoheizi.one
```

### `VITE_GITHUB_PAGES_BASE`

`VITE_GITHUB_PAGES_BASE` 是用于 `github pages` 部署时填入的项目名称，一般情况下 `github pages` 部署的路径为

`用户名.github.io/项目名字`

需要设置项目的根路径，不然 `404` 了

### VITE_REFERE

`VITE_REFERE` 是用于如果配置了 `github pages` 的自定义域名就要配置一个 `value` 给它，原因：`github pages` 你配置了域名，它的路径就不会添加你的项目名字，变成了根路径 `/`

### 注意事项

**默认情况下 `VITE_REFERE` 的权重要比 `VITE_GITHUB_PAGES_BASE` 要高**，所以不需要 `自定义域名` 请不要往 `VITE_REFERE` 填入 `value`，会覆盖的

>在vitepress中自定义组件并不能读取到你自定义的变量，但是有办法可以[前往](./docs/Miscellaneous/vitepress.md#环境变量注意情况)

## 修改环境

如想修改请前往 `.vitepress > config.ts` 文件中修改代码

```ts
export default ({ mode }) => {
  const { VITE_PORT, VITE_BASE, VITE_REFERE, VITE_GITHUB_PAGES_BASE } = loadEnv(
    mode,
    process.cwd()
  )
  let base = ''

  if (mode === 'development') {
    base = VITE_BASE
  }
  if (mode === 'production') {
    if (VITE_REFERE) {
      base = '/'
    } else {
      base = VITE_GITHUB_PAGES_BASE
    }
  }
  return defineConfig({
    base,
  })
}

```

# 参考资料

`Vitepress` : https://vitepress.qzxdp.cn

前端导航模块由 `茂茂 | [链接](https://fe-nav.netlify.app/)