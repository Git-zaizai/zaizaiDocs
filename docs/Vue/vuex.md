# Vuex

## 为什么我们需要 vuex

首先 vue 的官方对于 vuex 给出的定义是：

> `Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。`

状态管理模式，理解起来可能还有点抽象，说通俗点`就是解决 vue 框架中各个组件数据共享的一种方式`，有点类似于全局的数据仓库`(可以看做一个全局的对象)`，在 vuex 中维护的 `state` 对象，可以流程到各个 vue 实例上。那么它是为什了什么场景而生的呢？

了解 vue 框架的话，都知道 `vue2.0` 是通过选项的方式传入一个 `option` 生成 vue 实例，每个 `option` 中要定义一个 `data` 属性，或者计算属性，这份内部维护的数据可以进行数据于视图的绑定，也就是 `mvvm` 双向绑定。

如果是比较简单的应用的话，多个 vue 组件之间没有设计的数据共享的情况下，vue 内部维护的一份数据还是可以可以解决的，**如果设计的多个组件的数据共享，那么很显然这种场景并不能胜任**，虽然 vue 框架内部也提供了几种组件通信的技术，如通过 `props`、`emit`、`provide\inject`等等进行组件的通信的方式，但是依然不能胜任复杂的需要多个组件共享数据场景。所以 vuex 就应允而生了。

每一个 `Vuex` 应用的核心就是 `store`（仓库）。`store`基本上就是一个容器，它包含着你的应用中大部分的`**状态 (state)**` 。

Vuex 和单纯的全局对象有以下两点不同：

1.  `Vuex` 的状态存储是响应式的。当 Vue 组件从 `store` 中读取状态的时候，若 `store` 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2.  你不能直接改变 `store` 中的状态。改变 `store` 中的状态的唯一途径就是显式地`**提交 (commit) mutation**`。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

## Vuex 由哪几个部分组成

### `state`

上面已经提到 `vuex` 的本质其实是维护了一份能在应用内共享的全局数据。

这就需要包含一个数据容器，在 `vuex` 里对应的是 `state` 对象，通过键值的形式映射了一系列需要全局共享的数据。

举一个例子，加入我们想要实现一个计数器应用，希望他的 count 能在全局共享。可以先定义一个 `state` 容器。 引入 `vuex`，并实例化 `Store` 实例。

```js
import Vue from 'vue';
import App from './App.vue';
// 导入 Vuex
import Vuex from 'vuex';

Vue.config.productionTip = false;
// 在Vue中使用 Vuex (相当于调用 vuex 的 install 函数 )
Vue.use(Vuex);
// 实例化 vex 并进行配置
const store = new Vuex.Store({});

new Vue({
  render: (h) => h(App),
  // Vuex 注入到 vue实例
  store,
}).$mount('#app');
```

现在，在任何的 `vue组件` 中都可以通过  `store.state`  来获取状态对象。

### `getter`

`vuex` 允许我们对 `store` 中的 `state` 中派生出一些状态，这样的状态可以放在 `getters` 对象下。可以认为是 `store` 的计算属性，就像计算属性一样，`getter` 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

例如有一个场景，对列表进行过滤并计数：如果不借助 `getters` 属性的话，你在组件中自行想办法进行过滤

```vue
<template>
  <h1>文章数量: {{ item }}</h1>
</template>
<script>
export default {
  data: {},
  computed: {
    // 过滤 只有 崽崽 的文章数量
    doneTodosCount() {
      return this.$store.state.todos.filter((todo) => todo.done).length;
    },
  },
};
</script>
```

如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。
为了代码的简洁行性，这部分的逻辑可以放在 `getters` 里,`Getter` 接受 `state` 作为其第一个参数，`Getter`也可以接受其他`getter` 作为第二个参数。

```js
import Vue from 'vue';
import App from './App.vue';
// 导入 Vuex
import Vuex from 'vuex';

Vue.config.productionTip = false;
// 在Vue中使用 Vuex (相当于调用 vuex 的 install 函数 )
Vue.use(Vuex);
// 实例化 vex 并进行配置
const store = new Vuex.Store({
  state: {
    todos: [
      {
        done: '崽崽',
        txt: '...',
      },
      {
        done: '崽崽',
        txt: '...',
      },
      ...还有很多个,
    ],
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length;
    },
  },
});

new Vue({
  render: (h) => h(App),
  // Vuex 注入到 vue实例
  store,
}).$mount('#app');
```

现在可以在项目中通过`store.getters.doneTodos`访问到这些变量

### `mutation`

有了数据容易后，vuex 对于数据的维护即对数据的改变的有一套自己的规定，

vue 官方强调，我们通过提交 `mutation` 的方式，而非直接改变  `store.state.todo`，是因为我们想要更明确地追踪到状态的变化。

这个简单的约定能够让你的意图更加明显，这样你在阅读代码的时候能更容易地解读应用内部的状态改变。

此外，这样也让我们有机会去实现一些能记录每次状态改变，保存状态快照的调试工具。

定义 `mutations` 的方式也非常简单，只要将 `state` 对应属性的改变封装成方法放在 `mutations` 对象里面即可

```js
import Vue from 'vue';
import App from './App.vue';
// 导入 Vuex
import Vuex from 'vuex';

Vue.config.productionTip = false;
// 在Vue中使用 Vuex (相当于调用 vuex 的 install 函数 )
Vue.use(Vuex);
// 实例化 vex 并进行配置
const store = new Vuex.Store({
  state: {
    str: 'state-str',
    todo: [],
  },
  mutations: {
    setStr(state, value) {
      state.str = value;
    },
    addTodo(state, item) {
      state.todo.push({ text: item, done: false });
    },
  },
});

new Vue({
  render: (h) => h(App),
  // Vuex 注入到 vue实例
  store,
}).$mount('#app');
```

需要注意的是 `mutation必须是同步函数` 如果 `mutation` 函数中包含了异步的逻辑，如下面所示

```js
mutations: {
    someMutation(state) {
      api.callAsyncMethod(() => {
        state.count++;
      });
    },
  },
```

我们正在 debug 一个 app 并且观察 `devtool` 中的 `mutation` 日志。

每一条 `mutation` `被记录，devtools` 都需要捕捉到前一状态和后一状态的快照。

然而，在上面的例子中 `mutation` 中的异步函数中的回调让这不可能完成：因为当 `mutation` 触发的时候，回调函数还没有被调用，`devtools` 不知道什么时候回调函数实际上被调用。

#### `分发 Mutation`

定义完 mutations 后，可以通过  `store.commit`  方法触发状态变更。

`store.commit('setCount', 10)`

同时也支持另一种通过对象风格的提交方式

`store.commit({   type: 'increment',   amount: 10 })`

### `action`

刚刚我们提到 `mutation` 当中不能包含异步方法导致状态改变的改变的逻辑，那样会使得程序的状态难以调试。

所以在 vuex 中需要将这两种方式导致的状态改变区分开，所以 vuex 提供了另一个对象用于异步状态的改变 `action` 类似于 `mutation` 不同在于：

- `Action` 提交的是 `mutation`，而不是直接变更状态。
- `Action` 可以包含任意异步操作。

`Action` 函数接受一个与 `store` 实例具有相同方法和属性的 `context` 对象，这个 `context` 对象里包含了 `store` 实例里相同的属性，如 `state`,`getters`, 也可以通过 `commit` 方法发起一个 `mutation` 调用。

```js
import Vue from 'vue';
import App from './App.vue';
// 导入 Vuex
import Vuex from 'vuex';

Vue.config.productionTip = false;
// 在Vue中使用 Vuex (相当于调用 vuex 的 install 函数 )
Vue.use(Vuex);
// 实例化 vex 并进行配置
const store = new Vuex.Store({
  state: {
    str: 'state-str',
  },
  mutations: {
    setStr(state, value) {
      state.str = value;
    },
  },
  actions: {
    setCount(context, value) {
      // 提交了 调用 setStr 动作
      context.commit('setStr', value);
    },
  },
});

new Vue({
  render: (h) => h(App),
  // Vuex 注入到 vue实例
  store,
}).$mount('#app');
```

实践中，我们会经常用到 ES6 的`参数解构` 来简化代码（特别是我们需要调用  `commit`  很多次的时候）：

```js
const actions = {
  setCount({ commit }, value) {
    commit('setStr', value);
  },
};
```

除了可以在 action 内部提交一个 commit 外，action 中还可以执行**异步**逻辑

```js
actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },
  }
```

#### `分发 Action`

`Action` 通过  `store.dispatch`  方法触发：

`store.dispatch('increment')`

Actions 支持同样的对象方式进行分发：

`store.dispatch({   type: 'incrementAsync',   amount: 10 })`

## 辅助函数

vuex 中提供了几个辅助函数用以更加方便的在组件中使用这份全局状态数据。

### mapState

当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用  `mapState`  辅助函数帮助我们生成计算属性：

```js
import { mapState } from 'vuex';

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: (state) => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // state状态和组件本身的数据派生出一个新的计算属性
    countPlusLocalState(state) {
      return state.count + this.localCount;
    },
  }),
};
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给  `mapState`  传一个字符串数组。这也是项目中常见的使用场景

```js
import { mapState } from 'vuex';

export default {
  // ...
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'count',
  ]);
};
```

值得一提的是`mapState`  函数**返回的是一个对象**。 在有需要将 mapState 结合组件本身的局部数据一起使用时可以使用对象展开运算符的方式

```js
import { mapState } from 'vuex';

export default {
  // ...
  computed:{
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapState([
        'count',
        'anotherGetter',
        ...
    ]);
  }
};
```

### mapGetters

`mapGetters`  辅助函数仅仅是将 `store` 中的 `getter` 映射到局部计算属性：

```js
mport { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

同样的，如果你想将一个 getter 属性另取一个名字，使用对象形式：

```js
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount',
});
```

### mapMutations

除了上面提到的可以使用  `this.$store.commit('xxx')`  提交 `mutation` 以外，vuex 中对 `mutations` 的方法也提供了  `mapMutations`  辅助函数将组件中的 `methods` 映射为  `store.commit`  调用。

```js
import { mapMutations } from 'vuex';

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy', // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment', // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
  },
};
```

### mapAction

同样的 vuex 也提供了`mapActions`  辅助函数将组件的 methods 映射为  `store.dispatch`  调用。

```js
import { mapActions } from 'vuex';

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy', // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
  },
};
```

## module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）** 。每个模块拥有自己的 state、mutation、action、getter。

```js
onst moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

### 命名空间

::: tip
默认情况下，模块内部的 `action` 和 `mutation` 仍然是注册在全局命名空间的——这样使得多个模块能够对同一个 `action` 或 `mutation` 作出响应。
:::

#### 不开启命名空间时

对于于 `action` 、 `mutation` 和 `getter` ，是在模块中还是在全局中，它们的使用方式是相同的，

但是要`注意方法同名的问题`,当有函数同名时会出现方法被覆盖的 BUG，

只是 `state` 会有所不同，模块中的 `state` 会多一层模块名。格式变成 `store.state.模块名.状态名（根state中的格式为store.state.状态名）`。

```js
onst moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
    state:{

    },
    mutations:{
        // 把 a 模块的所有  mutations 放在全局中
        ...a.mutations
    },
    actions:{
        // 把 a 模块的所有  actions 放在全局中
        ...a.actions
    },
    getters:{
         // 把 a 模块的所有 getters 放在全局中
        ...a.getters
    }
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

#### 开启命名空间

如果你想模块之间相互独立、互不影响。可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块

当模块被注册后，它的所有 `getter` 、 `action` 和 `mutation` 都会自动根据模块注册的路径调整命名。所以开启命名空间的模块中的 `getter` 、 `action` 和 `mutation` 的使用方式都会改变。

但是开启命名空间和不开启命名空间的模块中的 state 的使用方式不会改变。格式依然是`store.state.模块名.状态名`。

```js
const a = {
  namespaced: true,
  state: {
    str: 'aa',
    cont: 0,
    ...各种数据,
  },
  mutations: {
    setStr(state, value) {
      state.str = value;
    },
    ...各种方法,
  },
  getters: {
    doneCont: (state) => {
      return state.cont;
    },
    ...各种方法,
  },
};

// 实例化 vex 并进行配置
const store = new Vuex.Store({
  state: {
    str: 'state-str',
  },
  mutations: {
    setStr(state, value) {
      state.str = value;
    },
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },
  },
  modules: {
    a,
  },
});
```

在组件中使用

```js
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    // 【传统方式】获取store中的数据
    /*
    proData() {
    	return this.$store.state.a.str
    },
    themeData() {
      return this.$store.getters['a/doneCont']
    },
    */

    // 【辅助函数方式一】获取store中的数据（代码更简洁）
    /*
    ...mapState({ a: state => state.productModule.proData }),
    ...mapGetters(['a/themeData']),
    ...mapGetters(['a/proName', 'a/proDesc', 'a/indexData'])
    */

    // 【辅助函数方式二】获取store中的数据（代码最简洁）
    // 将模块的空间名称字符串作为第一个参数传递给辅助函数，这样所有绑定都会自动将该模块作为上下文。
    ...mapState('a', { proData: (state) => state.proData }),
    ...mapGetters('a', ['themeData']),
    ...mapGetters('a', ['proName', 'proDesc', 'indexData']),
  },
  created() {
    // 【传统方式】获取异步数据
    // this.$store.dispatch('a/queryThemeAction') // 获取主题数据
    // this.$store.dispatch('a/queryProDataAction') // 获取产品数据
    // this.$store.dispatch('a/queryIndexDataAction') // 获取首页数据

    // 【辅助函数方式】获取异步数据（需要先在methods中使用mapActions定义方法）
    this.queryThemeAction(); // 获取主题数据
    this.queryProDataAction(); // 获取产品数据
    this.queryIndexDataAction(); // 获取首页数据
  },
  methods: {
    ...mapActions('themeModule', ['queryThemeAction']),
    ...mapActions('productModule', ['queryProDataAction', queryIndexDataAction]),
  },
};
```
