# Vue Router 4

vue3x 发布的同时，`Vue Router` 也升级成为了 4x 版本。

虽然进行了大更新，但是大部分的 `API` 没有变化

4x 使用了函数式编程的方式，从而更好的结合 `Composition API`

## 创建 router 实例

> hash 模式使用 `createWebHashHistory()` 方法
>
> history 模式使用 `createWebHistory()`方法
>
> 之前 component 引入组件的时候，后边可以省略 .vue 后缀，但在 vue-router 4 这不能省略后缀，否则就报错了

```js
// router.js
import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../components/login.vue'),
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('../components/reg.vue'),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
```

在 main.js 注册路由

```js
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 引入router

createApp(App)
  .use(router) // 使用router
  .mount('#app');
```

## 路由组件

4x 路由组件并没有什么变化，还是与之前的使用方法一致
在模版中也可以直接进行使用

```html
<template>
  <router-link to="/">去登录</router-link>
  <router-link to="/reg">去注册</router-link>
  <router-link :to="{ name: '/', params: { userId: 123 }}">去登录</router-link>
  <router-link :to="{ name: 'reg' }">去注册</router-link>
  <hr />
  {{ $router }} {{ $route }}
  <router-view></router-view>
</template>
```

## `Router API` 编程式导航

router4x 大部分的 API 并没有变化和以前一样

```js
// 字符串路径
router.push('/users/eduardo');

// 带有路径的对象
router.push({ path: '/users/eduardo' });

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } });

// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } });

// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' });

const username = 'eduardo';
// 我们可以手动建立 url，但我们必须自己处理编码
router.push(`/user/${username}`); // -> /user/eduardo
// 同样
router.push({ path: `/user/${username}` }); // -> /user/eduardo
// 如果可能的话，使用 `name` 和 `params` 从自动 URL 编码中获益
router.push({ name: 'user', params: { username } }); // -> /user/eduardo
// `params` 不能与 `path` 一起使用
router.push({ path: '/user', params: { username } }); // -> /user
```

## `Vue Router 4` 的变化

## `Vue Rouer` 与 `setup`

vue3 的 setup 中并不能访问 this，所有推出了一些 `hook` 函数，
使用这些函数就可以获取到 `router`、`route` 的实例,
下面说说两个最常用的 `hook` 函数`useRouter()`、`useRoute()`

### `useRouter()`

vue2 在组件中访问全局路由实例都是 `this.$router`，而在 vue3 你需要使用 `useRouter()` 访问全局路由实例

```vue
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
console.log(router);
// 方式一：字符串形式 path
router.push(url);
// 方式二：对象形式 path
router.push({
  path: url,
});
</script>
```

### `useRoute()`

显而易见 `this.$route` 转换到 vue3 就是 `useRoute()` 获取当前的路由对象

```vue
<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route);
watch(
  () => route.name,
  (val) => {
    // 逻辑代码
    ...
  }
);
</script>
```

### 其他 `hook` 函数

> `onBeforeRouteLeave` --在当前位置的组件将要离开时触发
>
> `onBeforeRouteUpdate` -- 在当前位置即将更新时触发

```vue
<template>
  <h1>{{ userData }}</h1>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
const userData = ref();

async function fetchUser(id: number) {
  return id ? 1 : -1;
}

onBeforeRouteLeave((to, from) => {
  const answer = window.confirm('you have unsaved changes!');
  if (!answer) return false;
});

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    userData.value = await fetchUser(to.params.id);
  }
});
</script>
```

了解更多可以去官网查看。[**点击前往=>**](https://router.vuejs.org/zh/api/#Functions)

## Vue Router 4 的变化

### history 替代了 mode

这样可以更好的创建路由实例，并自定义这个实例

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./components/Home.Vue'),
    },
  ],
});
```

#### createWebHistory(base)

创建一个 HTML5 历史，即单页面应用程序中最常见的历史记录

base 为可选参数，当应用程序被托管在非站点根目录文件夹中，诸如 `https://example.com/folder/` 之类时非常有用

```js
// 没有 base，应用托管在域名 https://example.com 的根目录下。
createWebHistory();
// 给出的网址为 https://example.com/folder/`
createWebHistory('/folder/');
```

#### createWebHashHistory(base)

创建一个 hash 历史记录。

对于没有主机的 web 应用程序 (例如 `file://`)，或当配置服务器不能处理任意 URL 时这非常有用

**注意：如果 SEO 对你很重要，你应该使用 createWebHistory**

提供一个可选的 base，默认是 `location.pathname + location.search`。如果 `head` 中有一个 `<base>`，它的值将被忽略，而采用这个参数。**但请注意它会影响所有的 history.pushState() 调用**，这意味着如果你使用一个 `<base>` 标签，它的 `href` 值**必须与这个参数相匹配** (请忽略 `#` 后面的所有内容)

```js
// at https://example.com/folder
createWebHashHistory();
// 给出的网址为 https://example.com/folder#
createWebHashHistory('/folder/');
// 给出的网址为 https://example.com/folder/#
// 如果在 base 中提供了 `#`，则它不会被 createWebHashHistory 添加
createWebHashHistory('/folder/#/app/');
// 给出的网址为 https://example.com/folder/#/app/
// 你应该避免这样做，因为它会更改原始 url 并打断正在复制的 url
createWebHashHistory('/other-folder/');
// 给出的网址为 https://example.com/other-folder/#
// at file:///usr/etc/folder/index.html
// 对于没有 `host` 的位置，base被忽略
// 给出的网址为 file:///usr/etc/folder/index.html#
createWebHashHistory('/iAmIgnored');
```

#### createMemoryHistory(base)

创建一个基于内存的历史记录。这个历史记录的主要目的是处理 SSR。它在一个特殊的位置开始，这个位置无处不在。如果用户不在浏览器上下文中，它们可以通过调用 `router.push()` 或 `router.replace()` 将该位置替换为启动位置。

Base 适用于所有 URL，默认为'/'

### 通配符\*被移除

现在必须使用自定义的 regex 参数来定义所有路由(`*`、`/*`)：

```js
const routes = [
  // pathMatch 是参数的名称，例如，跳转到 /not/found 会得到
  // { params: { params: { pathMatch: ['not', 'found'] }}
  // 这要归功于最后一个 *，意思是重复的参数，如果你
  // 打算直接使用未匹配的路径名称导航到该路径，这是必要的
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
  // 如果你省略了最后的 `*`，在解析或跳转时，参数中的 `/` 字符将被编码
  { path: '/:pathMatch(.*)', name: 'bad-not-found', component: NotFound },
];
// 如果使用命名路由，不好的例子：
router.resolve({
  name: 'bad-not-found',
  params: { pathMatch: 'not/found' },
}).href; // '/not%2Ffound'
// 好的例子:
router.resolve({
  name: 'not-found',
  params: { pathMatch: ['not', 'found'] },
}).href; // '/not/found'
```

### isReady() 替代 onReady()

**这个方法用于底层的服务端渲染**

当路由器完成初始化导航时，返回一个 Promise，这意味着它已经解析了所有与初始路由相关的异步输入钩子和异步组件。

如果初始导航已经发生了，那么 promise 就会立即解析。

这在服务器端渲染中很有用，可以确保服务器和客户端的输出一致。

需要注意的是，在服务器端，你需要手动推送初始位置，而在客户端，路由器会自动从 URL 中获取初始位置。

当路由器完成初始化导航时，返回一个 Promise，这意味着它已经解析了所有与初始路由相关的异步输入钩子和异步组件。

如果初始导航已经发生了，那么 promise 就会立即解析。

这在服务器端渲染中很有用，可以确保服务器和客户端的输出一致。

需要注意的是，在服务器端，你需要手动推送初始位置，而在客户端，路由器会自动从 URL 中获取初始位置。

```js
// 将
router.onReady(onSuccess, onError);
// 替换成
router.isReady().then(onSuccess).catch(onError);
// 或者使用 await:
try {
  await router.isReady();
  // 成功
} catch (err) {
  // 报错
}
```

### scrollBehavior

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

当创建一个 Router 实例，你可以提供一个 `scrollBehavior` 方法：

```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```

例子：

返回 `savedPosition`，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样滚到之前的位置，而不是跳到页面顶部

```js
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
```

### `<router-view>` 的 `<v-slot>`

现在 keep-alive 和 transition 必须用在 router-view 内部

`<router-view>` 暴露了一个 `v-slot` API，主要使用 `<transition>` 和 `<keep-alive>` 组件来包裹你的路由组件

```html
<!-- 以前的写法  -->
<keep-alive>
  <transition>
    <router-view></router-view>
  </transition>
</keep-alive>

<!-- 现在的写法 -->
<!-- 通过v-slot获取内部的组件和路由 -->
<router-view v-slot="{ Component, route }">
  <!-- 路由的meta内属性绑定过度行为 -->
  <transition :name="route.meta.transition || 'fade'" mode="out-in">
    <keep-alive>
      <!-- 通过:is动态渲染组件到keep-alive内部 -->
      <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
    </keep-alive>
  </transition>
</router-view>
```

### router-link 移除的属性

#### append

移除 append —— 可以手动将值设置到现有的 `path` 中

```vue
将
<router-link to="child-route" append>to relative child</router-link>
替换成
<router-link :to="append($route.path, 'child-route')">
  to relative child
</router-link>
```

你必须在 _App_ 实例上定义一个全局的 `append` 函数：

```js
app.config.globalProperties.append = (path, pathToAppend) => {
  return path + (path.endsWith('/') ? '' : '/') + pathToAppend;
};
```

#### tag/event

tag 属性是定义 router-link 渲染结果的标签，由于不再是 a 标签，点击没了跳转，所以需要事件触发

现在`<router-link>` 中的 `event` 和 `tag` 属性都已被删除。可以使用 [`v-slot` API](https://link.juejin.cn?target=https%3A%2F%2Fnext.router.vuejs.org%2Fzh%2Fapi%2F%23router-link-s-v-slot 'https://next.router.vuejs.org/zh/api/#router-link-s-v-slot') 来完全定制 `<router-link>`：

```js
将
<router-link to="/about" tag="span" event="dblclick">About Us</router-link>
替换成
<router-link to="/about" custom v-slot="{ navigate }">
  <span @click="navigate" @keypress.enter="navigate" role="link">About Us</span>
</router-link>
```

#### exact

现在完全匹配逻辑简化，特殊的业务逻辑由用户自己解决，如想自定义这种行为，例如考虑到 `hash` 部分，应该使用 [`v-slot` API](https://link.juejin.cn?target=https%3A%2F%2Fnext.router.vuejs.org%2Fapi%2F%23router-link-s-v-slot 'https://next.router.vuejs.org/api/#router-link-s-v-slot') 来扩展`<router-link>`。

### mixins 中的路由守卫将被忽略

### resolve 替代 match

`router.match` 和 `router.resolve` 已合并到 `router.resolve` 中，签名略有不同

**原因**：将用于同一目的的多种方法统一起来。

router.resolve()返回[路由地址](https://link.juejin.cn?target=https%3A%2F%2Fnext.router.vuejs.org%2Fzh%2Fapi%2F%23routelocationraw 'https://next.router.vuejs.org/zh/api/#routelocationraw')的[标准化版本](https://link.juejin.cn?target=https%3A%2F%2Fnext.router.vuejs.org%2Fzh%2Fapi%2F%23routelocation 'https://next.router.vuejs.org/zh/api/#routelocation')。还包括一个包含任何现有 `base` 的 `href` 属性。

### 移除 router.getMatchedComponents()

这个方法现在被删除了，因为匹配的组件可以从 `router.currentRoute.value.mixed` 中获取：

```js
router.currentRoute.value.matched.flatMap((record) => Object.values(record.components));
```

**原因**：这个方法只在 SSR 中使用，并且是用户一行就能完成的操作。

### 包括首屏导航在内的所有导航均为异步

所有的导航，包括第一个导航，现在都是异步的，这意味着，如果使用一个 `transition`，可能需要等待路由 _ready_ 好后再挂载程序：

```js
app.use(router);
router.isReady().then(() => app.mount('#app'));
```

> 如果首屏存在路由守卫，则可以不等待就绪直接挂载，产生结果将和 vue2 相同

### 移除 route 的 parent 属性

`parent` 属性已从标准化路由地址（`this.$route` 和 `router.resolve` 返回的对象）中删除。你仍然可以通过 `matched` 数组访问它：

```js
const parent = this.$route.matched[this.$route.matched / length - 2];
```

**原因**：同时存在 `parent` 和 `children` 会造成不必要的循环引用，而属性可以通过 `matched` 来检索

### history.state 的用法

Vue Router 将信息保存在 `history.state` 上。如果你有任何手动调用 `history.pushState()` 的代码，你应该避免它，或者用的 `router.push()` 和 `history.replaceState()` 进行重构：

```js
// 将
history.pushState(myState, '', url);
// 替换成
await router.push(url);
history.replaceState({ ...history.state, ...myState }, '');
```

同样，如果你在调用 `history.replaceState()` 时没有保留当前状态，你需要传递当前 `history.state`：

```js
// 将
history.replaceState({}, '', url);
// 替换成
history.replaceState(history.state, '', url);
```

### options 中需要配置 routes

**原因**：路由的设计是为了创建路由，尽管你可以在以后添加它们。在大多数情况下，你至少需要一条路由，一般每个应用都会编写一次。

```js
createRouter({ routes: [] });
```

### 一些错误处理的变更

#### 跳转不存在的命名路由会报错

`router.push({ name: homee})`

**原因**：以前，路由会导航到 `/`，但不显示任何内容（而不是主页）。抛出一个错误更有意义，因为我们不能生成一个有效的 URL 进行导航

#### 缺少必填参数会抛出异常

在没有传递所需参数的情况下跳转或解析命名路由，会产生错误：

```js
// 给与以下路由:
const routes = [{ path: '/users/:id', name: 'user', component: UserDetails }];

// 缺少 `id` 参数会失败
router.push({ name: 'user' });
router.resolve({ name: 'user' });
```

#### 命名子路由如果 path 为空的时候不在追加 /

给予任何空 `path` 的嵌套命名路由：

```js
const routes = [
  {
    path: '/dashboard',
    name: 'dashboard-parent',
    component: DashboardParent
    children: [
      { path: '', name: 'dashboard', component: DashboardDefault },
      { path: 'settings', name: 'dashboard-settings', component: DashboardSettings },
    ],
  },
]
```

现在，导航或解析到命名的路由 `dashboard` 时，会产生一个**不带斜线的 URL**：

`router.resolve({ name: 'dashboard' }).href // '/dashboard'`

这对子级 `redirect` 有重要的副作用，如下所示：

```js
const routes = [
  {
    path: '/parent',
    component: Parent,
    children: [
      // 现在将重定向到 `/home` 而不是 `/parent/home`
      { path: '', redirect: 'home' },
      { path: 'home', component: Home },
    ],
  },
];
```

请注意，如果 `path` 是 `/parent/`，这也可以，因为 `home` 到 `/parent/` 的相对地址确实是 `/parent/home`，但 `home` 到 `/parent` 的相对地址是 `/home`。

**原因**：这是为了使尾部的斜线行为保持一致：默认情况下，所有路由都允许使用尾部的斜线。可以通过使用 `strict` 配置和手动添加(或不添加)斜线来禁用它。

### $route 属性编码

无论在哪里启动导航，`params`、`query`和 `hash` 中的解码值现在都是一致的（旧的浏览器仍然会产生未编码的 `path` 和 `fullPath`）。初始导航应产生与应用内部导航相同的结果。

- Path/fullpath 不再做解码
- hash 会被解码
- push、resolve 和 replace，字符串参数，或者对象参数 path 属性必须编码
- params / 会被解码
- query 中 + 不处理，之前会处理为 %2b，如需处理可以使用 stringifyQuery()
