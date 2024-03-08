# `hox` 状态共享库

[官方文档：前往](https://hox.js.org/zh)

`只聚焦于一个痛点：在多个组件间共享状态`

## 开始

在`app.jsx`注册全局`hox`

```jsx
import { HoxRoot } from 'hox'
import './styles/index.css'
function App() {
  return (
    <>
      <HoxRoot>
        <app></app>
      </HoxRoot>
    </>
  )
}
export default App

```

然后创建 `store` 文件夹，就可以在下面搞一个个的 `store`，比如：

```js
// index.js
// 设置一个全局的 store
import { createGlobalStore } from 'hox'
import { useState } from 'react'

const [useAccountStore, getAccountStore] = createGlobalStore(() => {
  const [theme, setTheme] = useState('ligth')
  const [state, setstate] = useState({
    userInfo: {
      name: ''
    }
  })

  return {
    theme,
    setTheme,
    stroe:state,
    setstate
  }
})

export const useStore = useAccountStore
export const getStore = getAccountStore
```

比如说在你要在用户页面使用

```js
// user.jsx
import { useStore } from '@/store'
import { useRef } from 'react'

export default () => {
    // 获取全局的 store
  const { store, setstate, theme, setTheme } = useStore()
  const input = useRef()
  const updateUserName = () => {
    setstate(state => {
      return {
        ...state,
        userInfo: {
          name: input.current.value
        }
      }
    })
  }
  return (
    <>
      <div>
        <h1>用户名：{store.userInfo.name}</h1>
        <input type='text' ref={input} />
        <button onClick={updateUserName}></button>
        <h2>当前主题：{theme === 'ligth' ? '亮色' : '暗色'}</h2>
        <button onClick={() => setTheme('dark')}></button>
      </div>
    </>
  )
}
```

是不是很简单，当你需要一个简单易用的 `共享状态` 库，这个就非常的合适，
引用官网的说法：

::: info 为什么要用 Hox
+ 直接复用已有的 React 知识，几乎没有学习成本，你怎么写 React 组件，就可以怎么写 Store
+ 为灵活重构而设计，在 Store 和组件中使用同一套 DSL 可以让你几乎 0 成本的将组件的局部状态转化为一个组件间共享的状态
+ 同时支持局部状态和全局状态，在灵活和简单之间做到了很好的平衡
+ 优秀的性能和 TypeScript 支持
:::
