# 一、安装
```powershell
npm install vue-router@4
```
# 二、创建 router 实例
```vue
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
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  export default router;

```
# 三、引入并注册 router
```vue
import { createApp } from 'vue';
import App from './App.vue';
// 引入router
import router from './router/index';

const app = createApp(App);

// 使用router
app.use(router);
app.mount('#app');

```
# 四、使用路由
## 1、 非编程式导航且不带参数跳转
### ①  router-link 跳转 使用 path 跳转
```vue
<template>
  <router-link to="/">去登录</router-link>
  <hr />
  <router-link to="/reg">去注册</router-link>
  <hr />
  <router-view></router-view>
</template>
```
### ②  router-link 跳转 使用 name 跳转
```vue
<template>
  <router-link to="/">去登录</router-link>
  <hr />
  <router-link to="/reg">去注册</router-link>
  <hr />
  <router-view></router-view>
</template>
```
## 2、 编程式导航且不带参数跳转
### ①  使用 path 跳转
```vue
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function toPage(url) {
  // 方式一：字符串形式 path
    router.push(url);
  // 方式二：对象形式 path
    router.push({
      path: url,
    });
}
</script>
```
### ①  使用 name 跳转

- 传参时必须传入 name 值
```vue
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
function toPage(url) {
  /**
 	 * 方式三：对象形式 name 
   * name 为 'Login' ||  'Reg'
   */
  router.push({
    name: url,
  });
}
</script>
```
## 3、push() 与 replace() 区别

- 它在导航时不会向 history 栈添加新记录，而是替换（覆盖）掉当前路由。 比如：A=> B=> C，在B=> C时用了 replace ，则B被C替换，历史记录的栈就成了这样：A=> C。因此无法返回上一级 B
## 4、 编程式导航且带参数跳转
:::success
Tips：useRouter（跳转）, useRoute（获取路由参数）
:::
### ① path + query 模式

- 传递参数
```vue
<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const data = reactive({
  name: '张三',
  age: 18,
});

const goReg = () => {
  router.push({
    path: '/reg',
    query: data,
  });
};
</script>
```

- 接收参数
```vue
<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
console.log('route ', route.query);
</script>
```
### ② name + params 模式
:::danger
新版 router 中的 params 传参接收不到参数，需要修改路由
:::

- 修改路由
```vue
{
    path: '/reg/:name/:age',
    name: 'Reg',
    component: () => import('../components/reg.vue'),
  },
```

- 传递参数
```vue
<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const data = reactive({
  name: '张三',
  age: 18,
});

const goReg = () => {
  router.push({
    name: 'Reg',
    params: data,
  });
};
</script>
```

- 接收参数
```vue
<script setup>
import {  useRoute } from 'vue-router';
const route = useRoute();
console.log('route ', route.params);
</script>
```
