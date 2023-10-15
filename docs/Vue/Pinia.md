# `Pinia`

简介：

Pinia  最初是在 2019 年 11 月左右重新设计使用  `Composition API` 。从那时起，最初的原则仍然相同，但 Pinia 对 Vue 2 和 Vue 3 都有效，并且不需要您使用组合 API。 除了安装和 SSR 之外，两者的 API 都是相同的，并且这些文档针对 Vue 3，并在必要时提供有关 Vue 2 的注释，以便 Vue 2 和 Vue 3 用户可以阅读！

## `Pinia 优点`

- vue3 vue2 均支持
- 抛弃了 Mutation 的操作，只有 `state` 、 `getter` 和 `action`
- `Actions` 支持同步和异步
- 支持使用插件扩展 Pinia 功能
- 不需要嵌套模块，更加符合 Vue3 的 `Composition api`
- 支持 `typescript`
- 代码更加的简洁

:::tip
如果你的应用使用的 Vue 版本低于 2.7，你还需要安装组合式 API 包：@vue/composition-api。如果你使用的是 Nuxt，你应该参考这篇指南。
:::

## 初始化

安装

```shell
pnpm add Pinia
```

基本配置

```ts
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

// 1. 导入 pinia
import { createPinia } from 'pinia';

// 2. 创建 pinia 实例
const pinia = createPinia();

// 3. 挂载到 Vue 根实例
app.use(pinia);

app.mount('#app');
```

## 创建仓库

在 src 目录下创建 /store/index.ts pinia 仓库，

`defineStore`它的第一个参数要求是一个独一无二的名字：这个名字 ，也被用作 `id` ，是必须传入的， Pinia 将用它来连接 `store` 和 `devtools`。为了养成习惯性的用法，将返回的函数命名为 `use..`. 是一个符合组合式函数风格的约定。

defineStore() 的第二个参数可接受两类值：`Setup` 函数或 `Option` 对象。

pinia 创建数据仓库有两个方式，要使用那种看你自己

> `Option Store` 选项式 API

```ts
import { defineStore } from 'pinia';

const useMainStore = defineStore('mian', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

> `Composition API` 组合式 API

```ts
import { defineStore } from 'pinia';

const useMainStore = defineStore('counter', () => {
  const count = ref(0);
  function increment() {
    count.value++;
  }

  return { count, increment };
});
```

在 Setup Store 中：

- ref() 就是 state 属性
- computed() 就是 getters
- function() 就是 actions

:::tip
Setup store 比 Option Store 带来了更多的灵活性，因为你可以在一个 store 内创建侦听器，并自由地使用任何组合式函数。不过，请记住，使用组合式函数会让 SSR 变得更加复杂。
:::

## 组件中使用仓库数据

`步骤`： 导入仓库 -> 创建 store 实例 -> 获取数据

```vue
<template>
  <div>
    <p>{{ mainStore.count }}</p>
  </div>
</template>

<script lang="ts" setup>
// 1. 按需导入仓库
import { useMineStore } from '../store';
// 2. 创建 store 实例
const mainStore = useMineStore();
// 3. 使用 mianStore 中的 state 里面的数据
console.log(mainStore.count);
</script>
```

### 使用解构赋值

如果直接使用普通的解构赋值方式，被解构出来的数据将不具备响应式

因为 `Pinia` 其实是把 `state` 里的数据都做了 `reactive 处理了（reactive 直接使用普通的解构赋值的数据也不具备响应式）`

解决方法：使用 `Pinia` 官方提供的 API

`storeToRefs` 函数

```vue
<template>
  <div>
    <!-- 这里的 count 是响应式的！-->
    <p>{{ count }}</p>
    <button @click="handlerChangeState">修改count</button>
  </div>
</template>

<script lang="ts" setup>
// 导入官方提供的 API
import { storeToRefs } from 'pinia';
import { useMineStore } from '../store';
const mainStore = useMineStore();

// 普通的解构赋值
// const { count } = mainStore

// 解决方法：使用 Pinia 官方提供的 API
const { count, foo } = storeToRefs(mainStore);

// 点击修改 count 的值
const handlerChangeState = () => {
  mainStore.count++;
};
</script>
```

## 修改 `sotre` 的数据

> 方式一：组件中直接修改 state 中的数据

```vue
<script lang="ts" setup>
import { useMineStore } from '../store';
const mainStore = useMineStore();

// 点击修改 count 的值
const handlerChangeState = () => {
  // 方式一：直接修改 state 中的数据
  mainStore.count++;
  mainStore.foo = 'hello';
};
</script>
```

> 方式二：$patch({ }) 接收一个修改对象，如果需要修改多个数据，
> 建议使用 $patch 批量更新，具有性能优化的效果

```vue
<script lang="ts" setup>
import { useMineStore } from '../store';
const mainStore = useMineStore();

// 点击修改 count 的值
const handlerChangeState = () => {
  // 方式二：使用 $patch({}) 修改数据
  mainStore.$patch({
    count: mainStore.count + 1,
    foo: 'hello',
  });
};
</script>
```

> 方式三：`$patch((state)=>{ })` 接收一个函数 更好的批量更新的方式:$patch 一个函数，state 则为 store 中的 state，也具有性能优化的效果

```vue
<script lang="ts" setup>
import { useMineStore } from '../store';
const mainStore = useMineStore();

// 点击修改 count 的值
const handlerChangeState = () => {
  // 方式三：使用 $patch((state)=>{ }) 修改数据
  mainStore.$patch((state) => {
    state.count++;
    state.foo = 'hello';
    state.arr.push(4);
  });
};
</script>
```

> 方式四：逻辑比较多的时候可以封装到 actions 做处理

```ts
import { defineStore } from "pinia";

export const useMineStore = defineStore('Mine', {
  state: () => {
    return {
      count: 100,
      foo: 'bar'
    }
  },
  },
  actions: {
    changeState(val){
        this.conut = val
    }
  }
})
```

```vue
<script lang="ts" setup>
import { useMineStore } from '../store';
const mainStore = useMineStore();

// 点击修改 count 的值
const handlerChangeState = () => {
  // 方式四：逻辑比较多的时候可以封装到 actions 做处理
  mainStore.changeState(10);
};
</script>
```

## `getters` 的使用

就是 pinia 的计算属性，与 `computed` 或者 vuex 的 `getters` 一样，就是一个计算属性

```ts
import { defineStore } from 'pinia';

export const useMineStore = defineStore('main', {
  state: () => {
    return {
      count: 100,
    };
  },

  actions: {},

  getters: {
    count10(state) {
      console.log('count 调用了');
      return state.count + 10;
    },
    // 注意：如果接收了一个 state 参数，内部却用了 this，也是可以的
    // return this.count + 10;
    // 手动指定返回值类型
    count11(): number {
      console.log('count 调用了');
      return this.count + 10;
    },
  },
});
```

### getters 中的函数允许相互调用

这里的 newArr 函数过滤了 arr 数组中为 3 的值并返回一个数组，然后被 newArr1 使用了新的数组，在组件中也可以访问 newArr1 去获取到值。

这只是用来演示 getters 中的函数可以相互调用，再以后的项目中，可以实现其他更好的功能。

```ts
import { defineStore } from 'pinia';

export const useMineStore = defineStore('main', {
  state: () => {
    return {
      arr: [1, 2, 3],
    };
  },
  getters: {
    newArr(state) {
      return this.arr.filter((item) => item !== 3);
    },
    // getters 里面的函数可以互相调用到，直接使用 this 即可
    newArr2() {
      return this.newArr;
    },
  },
});
```

## `pinia-plugin-persistedstate` 持久化

### 将插件添加到 pinia 实例上

```ts
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
```

```ts
import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      someState: '你好 pinia',
    };
  },
  persist: true,
});
```

:::tip 官网
更多相关信息去官网看看别，[**点击前往**](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/)
:::

## 相关资料

[Pinia 官网](https://pinia.vuejs.org/zh/)
