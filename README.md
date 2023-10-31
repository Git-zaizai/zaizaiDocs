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
|-- env.d.ts
|-- package.json
|-- pnpm-lock.yaml
|-- .gitignore
|-- tsconfig.json
`-- README.md
```

## 可用的路径别名

> 在 vitepress中 `@` 与 `#` 被内置使用，所以还是不要用了

alias: `/~/` -> `components`

# 参考资料

`Vitepress` : https://vitepress.qzxdp.cn

前端导航模块由 `茂茂 | maomao 开发`：https://github.com/maomao1996/vitepress-nav-template
