# 一、创建 vue3 项目

```javascript
npm init vue@latest
```

这一指令将会安装并执行 ** create-vue ** ，它是 Vue 官方的项目脚手架工具。你将会看到一些诸如 TypeScript 和测试支持之类的可选功能提示：

```javascript
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add an End-to-End Testing Solution? … No / Cypress / Playwright
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

如果不确定是否要开启某个功能，你可以直接按下回车键选择 No。在项目被创建后，通过以下步骤安装依赖并启动开发服务器：

```javascript
> cd <your-project-name>
> npm install
> npm run dev
```

<a name="OcWbo"></a>

# 二、列表渲染中的 key

<a name="tm50z"></a>

## 1、通过 key 管理状态

Vue 默认按照 **"就地更新"（按照数据依次的去渲染）** 的策略来更新通过 ** v-for ** 渲染的元素列表。当数据项的**顺序改变时**，Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。<br />为了给 Vue 一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素（不重新渲染，而是重新调换顺序/排序），你需要为每个元素对应的块提供一个唯一的 ** key ** attribute

<a name="UQUUM"></a>

## 2、温馨提示：

** key ** 在这里是一个通过 ** v-bind ** 绑定的特殊 attribute 推荐在任何可行的时候为 ** v-for ** 提供一个 ** key ** attribute <br />** key ** 绑定的值期望是一个基础类型的值，例如 ** 字符串 ** 或 ** number ** 类型
<a name="ngu3k"></a>

## 3、key 的来源

请不要使用 ** index ** 作为 ** key ** 的值，我们要确保每条数据的唯一索引不会发生改变。举例：数组 [a,b,c,d] 下标为 0,1,2,3 但如果在数组前面加上一个元素 f 即 [f,a,b,c,d] 的时候，其他的元素的下标就会变化，因此 Vue 会如上述所说进行 **"就地更新"** 影响性能
<a name="I7T0K"></a>

# 三、常用的 Composition API

<a name="afpzr"></a>

## 1、拉开序幕的 setup

1.理解：vue3.0 中一个新的配置项，值为一个函数。<br />2.setup 是所有 **Composition APl(组合 API)**“表演的舞台""。<br />3.组件中所用到的:数据、方法等等，均要配置在 setup 中。<br />4.setup 函数的两种返回值：<br />1.若返回一个对象，则对象中的属性、方法,在模板中均可以直接使用。(重点关注!)<br />2.若返回一个渲染函数:则可以白定义渲染内容。(了解)<br />5.注意点:<br />1.尽量不要与 Wue2.x 配置混用

      - Vue2.x配置(data、methos、computed...）中**可以访问到**setup中的属性、方法。
      - 但在setup中**不能访问到**Vue2.x配置(data、methos、computed...）
      - 如果有重名,setup优先。

2. setup 不能是一个 async 函数，因为返回值不再是 return 的对象,而是 promise,模板看不到 return 对象中的属性（后期也可以返回一个 Promise ）实例，但需要配合 **Suspense** 和 **异步引入** 组件的配合。
   <a name="ttKB0"></a>

## 2、ref

Vue 提供了一个\*\* **[**ref()**](https://cn.vuejs.org/api/reactivity-core.html#ref)** **方法来允许我们创建**引用对象\*\*可以使用任何值类型的响应式 ref

```vue
import { ref } from 'vue' const count = ref(0)
```

** ref() ** 将传入参数的值包装为一个带 .value 属性的 ref 对象：

```vue
const count = ref(0) console.log(count) // { value: 0 } console.log(count.value) // 0 count.value++
console.log(count.value) // 1
```

<a name="o4xdD"></a>

### ① ref 在模板中的“解包”（使用）

当 ref 在模板中作为顶层属性被访问时，它们会被自动“解包”，所以不需要使用 .value。下面是之前的计数器例子，用 ref() 代替：

```vue
<script setup>
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <button @click="increment">
    {{ count }}
    <!-- 无需 .value -->
  </button>
</template>
```

<a name="ZzDHO"></a>

### ② 备注：

- 接收的数据是：基本类型、也可以是对象类型。
- 基本类型的数据：响应式依然是靠 **Object.defineProperty()** 中的**get** 和 **set** 完成的
- 对象类型的数据：内部 “求助”了 Vue3 中的一个新函数 —— **reactive** 函数
  - 从根上来讲，ref 处理对象类型的数据确实是使用了 **Proxy**，在 Vue3 中封装在了**reactive**函数中，在其内部写了具体对 **Proxy** 的实现
    <a name="yr8A4"></a>

## 3、reactive 函数

<a name="XB18o"></a>

### ① 作用：只定义一个 对象类型 的响应式数据（基本类型不要用它，用 ref 函数）

<a name="OTPRJ"></a>

### ② 语法：const 代理对象 = reacitve（源对象）接受一个对象（或数组），返回一个代理对象（proxy 的对象，简称 proxy 对象）

<a name="ynnju"></a>

### ③ reactive 定义的响应式数据是"深层次的"。

<a name="qColx"></a>

### ④ 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

<a name="TerRL"></a>

### ⑤ 备注（重点）：因为使用 reactive 定义的一个对象，所以可以随意的往对象里面增、删、改、查一个属性都是响应式的

<a name="BMbQT"></a>

## 4、Vue3 中的响应式原理

<a name="YoZFq"></a>

### ① Vue2 的响应式

- 实现原理:
  - 对兔类型:通过 **object.defineProperty()** 对属性的读取、修改进行拦截（数据劫持)。
  - 数组类型:通过重写更新数组的一系列方法来实现拦截。(对数组的变更方法进行了包裹)。

```vue
Object.defineProperty(data,'count',{ get(){…………} set(){…………} })
```

- 存在问题:
  - 新增属性、删除属性,界面不会更新。
  - 直接通过下标修改数组,界面不会自动更新。
    <a name="TD8aQ"></a>

### ② Vue3 的响应式 Proxy （[去看视频-共两集 40 分钟](https://www.bilibili.com/video/BV1Zy4y1K7SH?p=146&vd_source=8a1c34bcf0e5ac3787e9934d7917cd0b)）

- 实现原理:
  - 通过 Proxy (代理)∶ 拦截对象中任意属性的变化,包括:属性值的读写、属性的添加、属性的删除等。
  - 通过 Reflect(反射)︰对源对象的属性进行操作。
  - MDN 文档中描述的 Proxy 与 Reflect：
    - proxy：[去官网看看](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
    - Reflect：[去官网看看](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

```vue
let person = { name = '张三', age = 18 } //模拟vue3中实现响应式 const p = new Proxy(person,{ //有人读取p的某个属性时调用
get(target,propName){ console.log(有人读取了p身上的${propName}属性`) return Reflect.get(target,propName) }
//有人修改p的某个属性、或给p追加某个属性时识用 set(target,propName,value){
console.log(有人修改了p身上的${propName}属性，我要去更新界面了!`) Reflect.set(target,propName,value) }
//有人删除p的某个属性时调用 deleteProperty(target,propName){
console.log(有人朋除了p身上的${propName}属性，我要去更新界面了!`) return Reflect.deleteProperty(target,propName) } }),
```

<a name="l6htz"></a>

## 5、reactive 对比 ref

<a name="AiUJI"></a>

### ① 从定义数据角度对比

- ref 用来定义：**基本类型数据**。
- reactive 用来定义：**对象（或数组)类型数据**。
- 备注： ref 也可以用来定义**对象（或数组）类型数据**，它内部会自动通过 reactive 转为 **代理对象**。
  <a name="os3kI"></a>

### ② 从原理角度对比

- ref 通过 **object.defineProperty()**的**get** 与**set**来实现响应式（数据劫持）。
- reactlve 通过使用 **Proxy** 来实现响应式（数据劫持)，并通过**Reflect**操作**源对象**内部的数据。
  <a name="ACXOf"></a>

### ③ 从使用角度对比;

- ref 定义的数据：操作数据**需要.value**，读取数据时模板中直接读取**不需要.value**，
- reactive 定义的数据：操作数据与读取数据：**均不需要.value **
  <a name="m0Mpq"></a>

## 6、setup 的两个注意点

<a name="NweXa"></a>

### ① setup 执行的时机

- 在 beforeCreate 之前执行一次，this 是**undefined.**
  <a name="IydTb"></a>

### ② setup 的参数

- props：值为对象，包含:组件外部传递过来，且组件内部声明接收了的属性。
- context：上下文对象
  - attrs：值为对象，包含:组件外部传递过来，但没有在 props 配置中声明的属性,相当于** this.$attrs**
  - slots：收到的插槽内容,相当于**this.$slots**
  - emits：分发自定义事件的函数,相当于 **this.$emit**
    <a name="Ldegs"></a>

## 7、计算属性与监视

<a name="s9ubO"></a>

### ① computed 函数

- 与 Vue2 中的 computed 配置功能一致
- 写法：

```vue
import {computed} from 'vue' export default{ setup(){ …… // 计算属性——简写（属性为只读） let fullName = computed(()=>{
return person.firstName + '-' + person.lastName }) // 计算属性——完整（属性可修改） let fullName = computed({ get(){
return person.firstName + '-' + person.lastName }, set(value){ const nameArr = value.split('-') person.firstName =
nameArr[0] person.lastName = nameArr[1] } }) } }
```

<a name="BDO4n"></a>

### ② watch 函数

- 与 Vue2 中的 watch 配置功能一致
- 两个小"坑":
  - 监视 reactive 定义的响应式数据时：oldValue 无法正确获取、强制开启了深度监视（deep 配置失效)。
  - 监视 reactive 定义的响应式数据中某个属性时: deep 配置有效。

```vue
<template>
  <h1>name:{{ person.name }}</h1>
  <h1>age:{{ person.age }}</h1>
  <h1>zx:{{ person.job.j1.zx }}K</h1>
  <button @click="person.name += '!'">修改姓名</button>
  <br />
  <br />
  <button @click="person.age++">修改年龄</button>
  <br />
  <br />
  <button @click="person.job.j1.zx += 10">涨薪</button>
</template>

<script>
import { ref, reactive, watch } from 'vue';
export default {
  name: 'XXX',
  setup() {
    // 数据
    let person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          zx: 20,
        },
      },
    });

    // 情况一：监听一个ref数据
    watch(sum, (newVal, oldVal) => {
      console.log(newVal, oldVal);
    });

    // 情况二：监听多个ref数据
    watch([sum, msg], (newVal, oldVal) => {
      console.log(newVal, oldVal);
    });

    /**
     * 情况三：监听reactive数据并且有配置项全部属性
     * 1、有坑！无法正确获得 oldVal
     * 2、注意：强制开启了深度监视（deep配置无效）
     */
    watch(
      person,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
      },
      {
        deep: false, // 此处无效
      }
    );

    /**
     * 情况四：监听 reactive 数据中的某个属性
     * 喜报！可以正确获得 oldVal
     */
    watch(
      () => person.name,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
      }
    );
    /**
     * 情况四：监听 reactive 数据中的某写属性
     * 喜报！可以正确获得 oldVal
     */
    watch([() => person.name, () => person.age], (newVal, oldVal) => {
      console.log(newVal, oldVal);
    });

    // 特殊情况：有坑！无法正确获得 oldVal
    watch(
      () => person.job,
      (newVal, oldVal) => {
        console.log(newVal, oldVal);
      },
      { deep: true } // 此处由于监视的是reactive所定义的对象中的某个属性，所以deep配置有效
    );
    // 返回一个对象
    return {
      person,
    };
  },
};
</script>
```

<a name="CIEMS"></a>

### ③ watchEffect 函数

- watch 的套路是:既要指明监视的属性，也要指明监视的回调。
- watchEffect 的套路是:不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。
- watchEffect 有点像 computed :
  - 但 computed 注重的计算出来的值(回调函数的返回值)，所以必须要写返回值。
  - 而 watchEffect 更注重的是过程（回调函数的函数体)，所以不用写返回值.

```vue
watchEffect(()=>{ const x1 = sum.value const x2 = person.age console.log('watchEffect 配置的回调执行了') })
```

<a name="l3yv0"></a>

## 8、生命周期

<a name="LpERP"></a>

### ① Vue3.0 中可以继续使用 Vue2.x 中的生命周期钩子，但有有两个被更名:

- **beforeDestroy** 改名为 **beforeUnmount**
- **destroyed** 改名为 **unmounted**
  <a name="mXow9"></a>

### ② Vue3.0 也提供了 Gomposition API 形式的生命周期钩子，与 Vue2.x 中钩子对应关系如下:

- **beforeCreate** ===> **setup()**
- **created** =======>**setup()**
- **beforeMount** ===> **onBeforeMount**
- **mounted** =======> **onMounted**
- **beforeUpdate** ===> **onBeforeUpdate**
- **updated** =======> **onUpdated**
- **beforeUnmount** ==> **onBeforeUnmount**
- **unmounted** =====> **onUnmounted**
  <a name="gOuL7"></a>

## 9、自定义 hook 函数

- 什么是 hook?——本质是一个函数，把 setup 函数中使用的 Composition API 进行了封装。
- 类似于 vue2.x 中的 **mixin**。
- 自定义 hook 的优势：复用代码,让 setup 中的逻辑更清楚易懂。
  <a name="kdnPd"></a>

## 10、toRef 与 toRefs

<a name="WID3c"></a>

### ① 作用

创建一个 ref 对象，其 value 值指向另一个对象中的某个属性。
<a name="LF9xH"></a>

### ② 语法：

```vue
const name = toRef(person , 'name' )
```

<a name="LlHNZ"></a>

### ③ 应用

要将响应式对象中的某个属性单独提供给外部使用时。
<a name="RvEOo"></a>

### ④ 扩展

** toRefs ** 与 ** toRef ** 功能一致，但可以批量创建多个 ref 对象，语法：** toRefs (person) **

```vue
export default { ………… name:'XXX', setup(){ let person = reactive({ name: '张三', age: 18, job: { j1: { zx: 20, }, }, });
return { person, ...toRefs(person) } } }
```

<a name="kP0nb"></a>

# 四、其他 Composition API

<a name="z1huo"></a>

## 1、shallowReactive 与 shallowRef

<a name="wFFQw"></a>

### ① shallowReactIve：

只处理对象**最外层**属性的响应式（浅响应式)
<a name="jsfT5"></a>

### ② shallowRef：

只处理基本数据类型的响应式，**不进行对象**的响应式处理
<a name="EWJRH"></a>

### ③ 什么时候使用?

- 如果有一个对象数据，结构比较深，但变化时只是外层属性变化 ===> shallowReactive
- 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来彗换 ===> shallowRef
  <a name="lntiH"></a>

## 2、readonly 与 shallowReadonly

<a name="tAMh9"></a>

### ① readonly：

让一个响应式数据变为只读的（深只读)
<a name="A2IkC"></a>

### ② shallowReadonly：

让一个响应式数据变为只读的（浅只读）
<a name="VsAzy"></a>

### ③ 应用场景：

不希望数据被修改时。
<a name="oyxvR"></a>

## 3、toRaw 与 markRaw

<a name="D5P9W"></a>

### ① toRaw：

- 作用：将一个由 **reactive** 生成的**响应式对象**转为**普通对象**。
- 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
  <a name="eqopv"></a>

### ② markRaw：

- 作用：标记一个对象，使其永远不会再成为响应式对象。
- 应用场景：
  - 有些值不应被设置为响应式的，例如复杂的第三方类库等。
  - 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。
    <a name="Esc8l"></a>

## 4、customRef [（去学习-视频 20 分钟开始）](https://www.bilibili.com/video/BV1Zy4y1K7SH/?p=161&spm_id_from=pageDriver&vd_source=8a1c34bcf0e5ac3787e9934d7917cd0b)

<a name="LzKZS"></a>

### ① 作用

创建一个自定义的 ref ，并对其依赖项跟踪和更新触发进行显式控制
<a name="hNoIe"></a>

### ② 实现防抖效果：

```vue
<template>
  <input type="text" v-model="keyword" />
  <h1>{{ keyword }}</h1>
</template>

<script>
import { customRef } from 'vue';
export default {
  name: 'XXX',
  setup() {
    // 自定义一个 ref 名为：myRef
    function myRef(value, delay = 500) {
      return customRef((track, trigger) => {
        let time;
        return {
          get() {
            console.log(`有人从myRef这个容器中读取数据了，我把${value}给他了`);
            track(); // 通知Vue追踪value的变化（提前和 get 商量一下，让他认为这个 value 是有用的)
            return value;
          },
          set(newValue) {
            console.log(`有人从myRef这个容器中修改数据为${newValue}了`);
            clearTimeout(time);
            time = setTimeout(() => {
              value = newValue;
              trigger(); // 通知Vue重新去解析模板
            }, delay);
          },
        };
      });
    }
    // 数据
    let keyword = myRef('hello', 200);
    // 返回一个对象
    return {
      keyword,
    };
  },
};
</script>
```

<a name="HCZvV"></a>

## 5、provide 与 inject

<a name="zjm2h"></a>

### ① 作用

- 实现**祖与后代组件间**通信
  <a name="R7c3V"></a>

### ② 套路

- 父组件有一个** provide ** 选项来提供数据，子组件有一个 **inject ** 选项来开始使用这些数据。
  <a name="n4B8a"></a>

### ③ 具体写法

1、祖组件中：

```vue
setup(){ …… let car = reactive({ name:'奔驰', price:'40万' }) provide('car',car) …… }
```

2、后代组件中：

```vue
setup(props,context){ …… let car = inject('car') return{ car } …… }
```

<a name="oUQ8y"></a>

## 6、响应式数据的判断

- isRef：检查一个值是否为一个 ** ref ** 对象
- isReactlve：检查一个对象是否是由 **reactive** 创建的响应式代理
- isReadonly：检查一个对象是否是由 ** readonly ** 创建的只读代理
- isProxy：检查一个对象是否是由 ** reactive ** 或者 ** readonly ** 方法创建的代理
  <a name="dnQ6y"></a>

# 五、新的组件

<a name="Rkor7"></a>

## 1、Teleport

<a name="KZH86"></a>

### ① 什么是 Teleport?

- Teleport 是一种能够将我们的组件 html 结构移动到指定位置的技术。

```vue
<template>>
  <teleport to="移动位置（如：HTMl）">
  	<div v-if="isShow" class="mask">
      <div class="dialog">
        <h3>我是一个弹窗</h3>
          <button @click="isShow = false">关闭弹窗</button>
      </div>
    </div>
  </teleport>
</template
```

<a name="wdnME"></a>

## 2、Suspense

<a name="lIcff"></a>

### ① 解释：

- 等待异步组件时渲染一些后备内容，获得更好的用户体验
  <a name="lzK8P"></a>

### ② 使用步骤：

- 异步引入组件

```vue
import {defineAsyncComponent} from 'vue' const Child = defineAsyncComponent(()=>import('./components/Chile.vue'))
```

- 使用 Suspense 包裹组件，并配置好 default 与 fallback

```vue
<template>
  <div class="app">
    <h3>我是App组件</h3>
    <Suspense>
      <template v-slot:default>
        <child />
      </template>
      <template v-slot:fallback>
        <h3>加载中.....</h3>
      </template>
    </Suspense>
  </div>
</template>
```

<a name="utoTf"></a>

# 六、其他

<a name="WZIG7"></a>

## 1、全局 API 的转移

<a name="rsv3Q"></a>

### ① Vue2 有许多全局 API 和 配置

- 例如：注册全局组件、注册全局指令等。

```vue
//注删全局组件 vue.component('MyButton', { data: () => ({ count: 0, }), template: '
<button @click="count++">Clicked {{ count }} times.</button>
', }); )) //注册全局指令 Vue.directive('focus', { inserted: el => el.focus() })
```

<a name="ljRv7"></a>

### ② Vue3 中对这些 API 做出了调整

- 将全局的 API，即 Vue.xxx 调整到应用实例 app 上
  | Vue2 全局 API （Vue） | Vue3 实例 API （app） |
  | --- | --- |
  | Vue.config.xxx | app.config.xxx |
  | Vue.config.productionTip | 移除 |
  | Vue.component | app.component |
  | Vue.directive | app.directive |
  | Vue.mixin | app.mixin |
  | Vue.use | app.use |
  | Vue.prototype | app.config。globalProperties |

<a name="YYK2z"></a>

## 2、其他改变

- data 选项应始终被声明为一个函数。
- 过度类名的更改：
  - Vue2 写法

```vue
.v-enter, .v-leave-to { opacity: 0; } .v-leave, .v-enter-to { opacity: 1; }
```

- Vue3 写法

```vue
.v-enter-from, .v-leave-to { opacity: 0; } .v-leave-from, .v-enter-to { opacity: 1; }
```

- **移除** keyCode 作为 v-on 的修饰符，同时也不再支持 config.keyCodes
- **移除** v-on .native 修饰符
  - 父组件中绑定事件

```vue
<my-component v-on:close="handleComponentEvent" v-on:click="handleNativeClickEvent" />
```

- 子组件中绑定事件

```vue
<script>
export default {
  emits: ['close'],
};
</script>
```

- **移除** 过滤器(filter)
  - 过滤器虽然这看起来很方便，但它需要一个自定义语法，打破大括号内表达式是“只是 JavaScript”的假设，这不仅有学习成本，而且有实现成本!建议用方法调用或计算属性去替换过减器。
    <a name="abbnC"></a>

# 七、Pinia [去官网看看](https://pinia.vuejs.org/zh/)

<a name="GxQkE"></a>

### ① 作用

Pinia 是 Vue 的专属**状态管理库**，它允许你跨组件或页面**共享状态**。实现全局状态管理<br />在 Setup Store 中：

- ref() 就是 state 属性
- computed() 就是 getters
- function() 就是 actions
  <a name="V4931"></a>

### ② 应用

- 安装

```vue
<!-- 使用 npm -->
npm install pinia
```

- 在 mian 中引入

```vue
import { createApp } from 'vue'; import App from './App.vue'; // 引入pinia import { createPinia } from 'pinia'; const
app = createApp(App); // 实例化 const pinia = createPinia(); // 使用pinia app.use(pinia); app.mount('#app');
```

- 创建 pinia.js

```vue
import { defineStore } from 'pinia'; // 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以
`use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`) // 第一个参数是你的应用中 Store
的唯一 ID。 export const useAlertsStore = defineStore('alerts', { // 其他配置... state() { return { msg: 'Hello word',
a: 0, b: 0, }; }, getters: { c: (state) => { return state.a + state.b; }, }, actions: { updateStoreMsg() { this.msg +=
'!'; }, }, });
```

- 在页面/组件中修改 state 中的值

```vue
<template>
  <h1>store.msg：{{ store.msg }}</h1>
  <button @click="updateStoreMsg">修改msg</button>
</template>
<script setup>
import { ref } from 'vue';
import { useAlertsStore } from './store/index';
const store = useAlertsStore();

const updateStoreMsg = () => {
  // 方法一
  store.msg += '!';

  // 方法二：修改多个数据
  store.$patch({
    msg: (store.msg += '!'),
  });

  // 方法三（官方推荐）
  store.$patch((state) => {
    state.msg += '!';
  });

  // 方法四：使用 actions 下的方法修改
  store.updateMsg();
};
</script>
```

- 将结构数据转为响应式

```vue
<template>
  <h1>a：{{ a }}</h1>
  <button @click="upA">点我+1</button>
</template>
<script setup>
import { storeToRefs } from 'pinia'; // 引入响应式 API
import { useAlertsStore } from './store/index'; // 引入 pinia 实例
const store = useAlertsStore(); // 实例化 pinia 仓库

// 结构数据转为响应式
const { a } = storeToRefs(store);
function upA() {
  store.a++;
  console.log('store.a ', store.a);
}
</script>
```
