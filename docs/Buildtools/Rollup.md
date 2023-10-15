# Rollup 打包配置

在 Monorepo 项目中配置 Rollup 打包，同时也是重构 [tampermonkey-scripts](https://github.com/maomao1996/tampermonkey-scripts) 项目的踩坑和总结，如需完整代码，可以查看[该项目源码](https://github.com/maomao1996/tampermonkey-scripts)

[Rollup](https://cn.rollupjs.org/) 是一个用于 JavaScript 的模块打包工具，常用于类库的打包，其打包速度快、体积小

## 配置 Rollup 打包

在 Monorepo 项目中，每一个子包都是独立的项目，所以需要在每个子包中配置 Rollup 打包，而每个子包的基础配置都是相同的，所以我们可以把 Rollup 的一些公共配置抽离出来，然后在每个子包中引入，从而实现代码的复用

同时为了方便管理和简化使用，可以把公共配置抽离到一个单独的子包中，并将其安装为公共依赖

### 初始化 `rollup-config` 子包

```shell
npm init -w shared/rollup-config -y

# 删除 package.json 中的 workspaces 属性
npm pkg delete workspaces
```

**修改 `pnpm-workspace.yaml`**

> 内容如下：

```shell
packages:
  - 'packages/*'
  - 'shared/*'
```

**修改 `package.json`**

如果仅在 Monorepo 项目中使用，可以将 `private` 属性设置为 `true`，防止被发布到 npm

```shell
{
  "name": "@femm/shared-rollup-config",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "src/index.js"
  // 其他配置可以根据需要自行添加
}
```

**安装依赖**

`rollup` 为公共依赖（每一个子包都需要使用 `rollup` 命令）

```shell
# 安装 rollup
pnpm add -Dw rollup
```

`rollup` 插件为 `rollup-config` 子包的私有依赖

- [`@rollup/plugin-terser`](https://github.com/rollup/plugins/tree/master/packages/terser) 用于压缩代码（主要用于删除注释）
- [`rollup-plugin-postcss`](https://github.com/egoist/rollup-plugin-postcss) 用于处理 CSS
- [`rollup-plugin-swc3`](https://github.com/SukkaW/rollup-plugin-swc) 用于处理 JavaScript 和 TypeScript
- [`rollup-plugin-userscript-metablock`](https://github.com/FlandreDaisuki/rollup-plugin-userscript-metablock) 用于处理用户脚本的元数据

```shell
pnpm -F "shared/rollup-config" add @rollup/plugin-terser rollup-plugin-postcss rollup-plugin-swc3 rollup-plugin-userscript-metablock
```

### 编写公共配置

创建 `src/index.js`，内容如下：

```shell
import path from 'node:path'
import { defineConfig } from 'rollup'
import postcss from 'rollup-plugin-postcss'
import { swc } from 'rollup-plugin-swc3'
import terser from '@rollup/plugin-terser'
import metablock from 'rollup-plugin-userscript-metablock'

export function createRollupConfig({ pkg, plugins = [] }) {
  const file = path.resolve(
    '../../',
    process.env.BUILD === 'development' ? 'dist-dev' : 'dist',
    `${pkg.name}.user.js`,
  )

  return defineConfig({
    input: 'src/index.ts',
    output: {
      file,
      format: 'iife',
    },
    plugins: [
      ...plugins,
      // 处理 CSS
      postcss({ minimize: true }),
      // 处理 JavaScript 和 TypeScript
      swc({
        jsc: { target: 'es5' },
      }),
      // 删除注释
      terser({
        mangle: {
          keep_fnames: true,
        },
        compress: {
          defaults: false,
        },
        format: {
          ascii_only: true,
          beautify: true,
          indent_level: 2,
        },
      }),
      // 注入脚本元数据
      metablock({
        override: {
          version: pkg.version,
          namespace: 'https://github.com/maomao1996/tampermonkey-scripts',
          author: 'maomao1996',
          homepage: 'https://github.com/maomao1996/tampermonkey-scripts',
          supportURL: 'https://github.com/maomao1996/tampermonkey-scripts/issues',
          license: 'MIT',
        },
      }),
    ],
  })
}
```

### 在其他子包中使用 `rollup-config` 子包 [​](#在其他子包中使用-rollup-config-子包)

安装 `rollup-config` 子包

```shell
pnpm add -Dw @femm/shared-rollup-config
```

在子包中创建 `rollup.config.js`，内容如下：

```shell
import { createRollupConfig } from '@femm/shared-rollup-config'

import pkg from './package.json' assert { type: 'json' }

export default createRollupConfig({ pkg })
```

修改子包的 `package.json`，内容如下：

```shell
{
  "name": "kill-watermark",
  "version": "0.0.2",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "rollup -c",
    "dev": "rollup --environment BUILD:development -c --watch"
  }
}
```

- `--environment BUILD:development` 表示注入 `BUILD` 环境变量，值为 `development`
- `-c` 表示使用配置文件
- `--watch` 表示监听文件变化

### 修改主包的 `package.json` [​](#修改主包的-package-json)

```shell
{
  // ... 省略其他配置
  "scripts": {
    "build": "pnpm -r build",
    "dev": "pnpm --stream --parallel -r dev",
  }
  // ... 省略其他配置
}
```

---

相关资料

- 详细配置过程请阅读 —— [使用 rollup 打包用户脚本（user script）]
- 参考了 [rollup/plugins | GitHub](https://github.com/rollup/plugins) 的相关代码

## 配置 TypeScript [​](#配置-typescript)

安装 TypeScript

```shell
pnpm add -Dw typescript
```

### 方案一：配置统一的 `tsconfig.json` [​](#方案一-配置统一的-tsconfig-json)

在主包中创建 `tsconfig.json`，内容如下：

```shell
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["DOM", "ES2022"],

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,

    "strict": true,
    "skipLibCheck": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["packages/**/*.ts", "shared/**/*.ts", "types/*.d.ts"]
}
```

### 方案二：在每个子包中配置 `tsconfig.json` [​](#方案二-在每个子包中配置-tsconfig-json)

为了方便管理和简化使用，同样将公共的 `tsconfig.json` 配置封装成一个子包中，并将其安装为公共依赖

**创建 `tsconfig` 子包**

```shell
npm init -w shared/tsconfig -y

# 删除 package.json 中的 workspaces 属性
npm pkg delete workspaces
```

**修改 `tsconfig` 子包的 `package.json`**

```shell
{
  "name": "@femm/shared-tsconfig",
  "version": "1.0.0",
  "private": true
}
```

**在 `tsconfig` 子包中创建 `tsconfig.json` 文件**，内容

```shell
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["DOM", "ES2022"],

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,

    "strict": true,
    "skipLibCheck": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**在主包中安装 `tsconfig` 子包**

```shell
pnpm add -Dw @femm/shared-tsconfig
```

**在每个子包中创建 `tsconfig.json` 文件**，内容如下：

```shell
{
  "extends": "@femm/shared-tsconfig"
}
```

## 在所有子包中共享 TypeScript 类型 [​](#在所有子包中共享-typescript-类型)

在 TypeScript 项目中，其会自动加载 `node_modules/@types` 中的类型，所以我们可以把类型放到 `node_modules/@types` 中，从而在所有子包中共享

**创建 `types` 子包**

```shell
npm init -w shared/types -y

# 删除 package.json 中的 workspaces 属性
npm pkg delete workspaces
```

**修改 `pnpm-workspace.yaml`**，内容如下：

```shell
packages:
  - 'packages/*'
  - 'types'
```

**修改 `types` 子包的 `package.json`**

```shell
{
  "name": "@types/shared-types",
  "version": "1.0.0",
  "private": true,
  "types": "./index.d.ts"
}
```

WARNING

子包的 `name` 必须要以 `@types/` 开头，否则 TypeScript 无法自动加载

**编写 `index.d.ts`**

```shell
declare const unsafeWindow: Window
```

**在主包中安装 `types` 子包**

```shell
pnpm add -Dw @types/shared-types
```

---

相关资料

参考了 [tsconfig/bases | GitHub](https://github.com/tsconfig/bases) 的相关代码
