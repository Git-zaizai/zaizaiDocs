# VitePress

## VitePress 的路径别名

在.vitepress 的 config 配置中添加 vite 配置

```ts
import { defineConfig } from 'vitepress';
import { resolve, join } from 'node:path';
export default () => {
  const pathAlias = (path: string) => resolve(join(__dirname, path));

  return defineConfig({
    vite: {
      resolve: {
        alias: {
          '/~': pathAlias('../components'),
        },
      },
    },
  });
};
```

::: error 注意：
路径的别名不能使用 `@` 或 `#` 这两个符号，在 vitepress 内部已经使用了，经过测试不能覆盖

所以不要使用，换其他符号
:::
