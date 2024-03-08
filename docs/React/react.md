# React 入门之

## 开始前的准备

概览一下 React 特点：【虚拟 DOM、状态、单向数据流、组件】

- 声明式的视图层 —— JSX，HTML 和 JS 的结合
- 简单的更新流程 —— 开发者只负责定义 UI 状态，React 负责渲染
- 灵活的渲染实现 —— 虚拟 DOM 可以结合其他库将其渲染到不同终端
- 高效的 DOM 操作 —— 虚拟 DOM

先启动一个 React 项目试试：

```shell
npm install -g create-react-app

create-react-app my-app // 创建项目
cd my-app/
npm start
```

启动有问题：check： [create-react-app.dev/docs/gettin…](https://link.juejin.cn?target=https%3A%2F%2Fcreate-react-app.dev%2Fdocs%2Fgetting-started%2F "https://create-react-app.dev/docs/getting-started/")

兼容问题 node 版本切换：

### 一、一些基础概念

#### 1、JSX

- WHAT？

JSX 是 Javascript 的语法扩展，`JSX = Javascript + XML`，即在 Javascript 里面写 XML，因为 JSX 的这个特性，所以它既具备了 Javascript 的灵活性，同时又兼具 html 的语义化和直观性。

比如：

```js
function Title() {
  return <h1>Im title~~~</h1>;
}
```

在 React 中，JSX 可以生成 `React “元素”`。【后面会解释什么是 React 元素】

- WHY？

React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，比如，在 UI 中需要绑定处理事件、在某些时刻状态发生变化时需要通知到 UI，以及需要在 UI 中展示准备好的数据。React 通过将二者共同存放在称之为“组件”的松散耦合单元之中，来实现关注点分离。

【不同于 VUE 将 JS 和 HTML 分离开来的方式】

- HOW？

```js
const name = "Josh Perez";
const element = <h1>Hello, {name}</h1>; // {}里面可以写 JS 表达式
ReactDOM.render(element, document.getElementById("root")); // 表示将 element 这个 JSX 渲染到 id 为 root 的元素上
```

建议：如果 JSX 有多行的话，用括号括起来。

```jsx
const element = (
  <div>
    {" "}
    <h1>Hello!</h1> <h2>Good to see you here.</h2>{" "}
  </div>
);
```

Babel 会把 JSX 转译成一个名为  `React.createElement()`  函数调用，创建对应的 DOM 对象：

```js
// 这是简化过的结构
const element = {
  type: "h1",
  props: {
    className: "greeting",
    children: "Hello, world!",
  },
};
```

这些对象被称为 `“React 元素”`。——【JS 对象】

注意：JSX 中写原生 DOM 属性的时候，`class` 要写成 `className`，事件名要写成驼峰形式（`onclick` \-> `onClick`）。

#### 2、元素渲染

要将一个 React 元素渲染到 DOM 节点中，只需把它们一起传入 `ReactDOM.render()`。如果 UI 要更新，那就需要重新调用 `ReactDOM.render()`。重新渲染时，React 只会更新变化的部分 —— 虚拟 DOM & diff。

#### 3、组件 & props

React 中编写组件有 2 种方式：函数 和 class（类组件）。组件首字母必须大写。

`函数组件：`【如果组件只有一个 render 方法，没有 state 这些，写成函数组件比较简洁】

```jsx
function MyComp(props) {
  return <h1>hello {props.name}</h1>;
}
```

`class组件`(等价写法)：

```jsx
// 继承于
React.Component class MyComp extends React.Component {
   constructor(props) {
  // props 是组件接收的参数，super表示执行父类的构造函数，完成初始化
   super(props); 
  // render 方法返回需要展示的视图结构——React元素
   render() {     
         return <h1>hello {this.props.name}</h1>
      }
   }
}
```

在所有含有构造函数的的 React 组件中，构造函数必须以  `super(props)`  开头，否则，`this.props`  在构造函数中可能会出现未定义的 bug。

类组件需满足两个条件：

- `class` 继承自 `React.Component`；
- `class` 内部必须定义 `render` 方法；

```jsx
function App() {
  return (
    <div>
      <MyComp name="A" /> {/* 子组件会通过 this.props.name 接收到 */}
      <MyComp name="B" /> <MyComp name="C" />
    </div>
  );
}
```

传递给子组件之后，子组件得到了一个 `props` 对象。

`props` 是父组件向子组件传递值的形式！它具有`只读性`：所有 React 组件都必须像纯函数一样保护它们的 `props` 不被更改。【也就是说我们不能在子组件中直接更改 props 哦！】

React 提供了 `PropTypes` 对象用于校验 `props` 的类型。

```jsx
import PropTypes from "prop-types";
PropTypes.propTypes = {
  a: PropTypes.object, // a 属性是一个对象类型
  b: PropTypes.number, // b 属性是一个数字类型
  c: PropTypes.func.isRequired, // 函数类型，必需
}; // defaultProps为属性指定默认值
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
Welcome.defaultProps = { name: "World" };
```
组件样式： 外部 CSS 和 内联样式

- `<link> `标签引入：作用于所有组件
- import 引入：scoped 局部样式
- 内联样式：
```jsx
<div style={{color: 'red'}}></div>
```
-  第一个 `{}` 表示是 JS 表达式，第二个 `{}` 表示内部是一个对象，属性名必须使用驼峰式。

#### 4、生命周期

⚠️ 只有类组件才具有生命周期方法，函数组件是没有的哦～

生命周期具体包括：

- 挂载阶段，依次调用：

```jsx
constructor(); // class 的构造方法，在其中
super(props); //接收参数
componentWillMount(); // 组件挂载前调用，实际比较少用到
render(); // 组件中定义的方法，返回一个 React 元素，并不负责实际的渲染工作
componentDidMount(); // 组件被挂载到 DOM 后调用，比如向后端请求一些数据，此时调用 setState 会引起组件的重新渲染
```

- 更新阶段，组件 props 或者 state 变化，依次调用：

```jsx
componentWillReceiveProps(nextProps); // props 变化时调用，nextProps 是新参数
// 是否继续执行更新过程，返回一个布尔值,通过比较新旧值，如果新旧值相同，该方法会返回 false，后续的更新过程将不再继续，从而优化性能
shouldComponentUpdate(nextProps, nextState);
componentWillUpdate(nextProps, nextState); // 更新之前，比较少用到
render();
componentDidUpdate(prevProps, prevState); // 组件更新之后调用，可以操作更新之后的 DOM 了
```

- 卸载阶段：

```js
componentWillUnmount() { } // 组件被删除前调用，执行一些清理工作
```


#### 5、state

在组件中可以设置 state 存放组件自己的数据：【是组件私有的数据！】

```jsx
class MyComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
  }
  render() {
    return <h1>Its {this.state.time}</h1>;
  }
}
```

不要直接修改 state，而是使用 `setState()`，React 会【合并】我们设置的 state。每次在组件中调用  `setState`  时，React 都会自动更新其子组件。

`数据流是单向的～`只能由父组件流向子组件。

【`不可变性`】：一般来说，有两种改变数据的方式。第一种方式是直接修改变量的值，第二种方式是使用新的一份数据替换旧数据。React 推荐使用第二种方式，为什么呢？

- 简化复杂的功能

不可变性使得复杂的特性更容易实现。比如 —— 撤销和恢复功能 在开发中是一个很常见的需求，不直接在数据上修改可以让我们追溯并复用历史记录。

- 跟踪数据的改变

如果直接修改数据，那么就很难跟踪到数据的改变。跟踪数据的改变需要可变对象可以与改变之前的版本进行对比，这样整个对象树都需要被遍历一次。

跟踪不可变数据的变化相对来说就容易多了。如果发现对象变成了一个新对象，那么我们就可以说对象发生改变了。

- 确定在 React 中何时重新渲染

不可变性最主要的优势在于它可以帮助我们在 React 中创建  pure components。我们可以很轻松的确定不可变数据是否发生了改变，从而确定何时对组件进行重新渲染。


#### 6、事件处理

React 的事件命名是采用驼峰式，写法是这样的：

```jsx
<button onClick={activateLasers}> Activate Lasers </button>
```

处理事件的响应函数要以对象的形式赋值给事件属性，而不是字符串形式。因为 React 中的事件是合成事件，不是原生 DOM 事件。

在 React 中，有一个命名规范，通常会将代表事件的监听 prop 命名为  on\[Event\]，将处理事件的监听方法命名为  handle\[Event\]  这样的格式。

值得注意的是 React 事件处理中的 `this 指向`问题：

（1）箭头函数

js

复制代码

```jsx
class MyComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
  }
  handleClick() {
    console.log(this.state.time);
  }
  render() {
    return (
      <button
        onClick={() => {
          this.handleClick();
        }}
      >
        {" "}
        按钮{" "}
      </button>
    );
  }
} // this 指向当前组件的实例对象
```

这种写法，每次 render 调用时都会重新创建一个新的事件处理函数。

（2）组件方法

```jsx
class MyComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
    this.handleClick = this.handleClick.bind(this); // 通过 bind 将这个方法绑定到当前组件实例
  }
  handleClick() {
    console.log(this.state.time);
  }
  render() {
    return <button onClick={this.handleClick}>按钮</button>;
  }
}
```

这种写法， render 调用时不会重新创建一个新的事件处理函数，但需要在构造函数中手动绑定 this

还有一种选择是，我们可以在为元素事件属性赋值的同时绑定 this

```jsx
return <button onClick={this.handleClick.bind(this)}>按钮</button>;
```

（3）属性初始化语法（ES7）

```jsx
class MyComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
  }
  handleClick = () => {
    console.log(this.state.time);
  }; // 也是箭头函数
  render() {
    return <button onClick={this.handleClick}>按钮</button>;
  }
}
```

使用官方脚手架 Create React App 创建的项目默认是支持这个特性的，可以在项目中引入 babel 的 transform-class-properties 插件获取这个特性支持。

#### 7、条件渲染 & 列表 & 表单

条件渲染：

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}
```

列表：

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li>{number}</li>);
```

建议给每个动态列表元素加一个 key ：【和 Vue 类似】，不然控制台会报错

```jsx
const listItems = numbers.map((number) => (
  <li key={number.toString()}>{number}</li>
));
```

表单：如果一个表单元素的值是由 React 管理的，那称它为一个受控组件。

1）文本框 —— 类型为 text 的 input 元素和 textarea 元素，它们受控的主要原理是，通过表单元素的 value 属性设置表单元素的值，通过表单元素的 onChange 事件监听值的变化，并将变化同步到 React 组件的 state 中。

```jsx
render(){
   return (
   <form onSubmit={this.handleSubmit}>
      <label>名字:
         <input type="text" value={this.state.value} onChange={this.handleChange} />
      </label>
      <input type="submit" value="提交" />
      </form>
   );
}
```

2）select 元素 —— 通过在 select 上定义 value 属性来决定哪一个 option 元素处于选中状态。

```jsx
render() {
   return (
   <select value='2'>
      <option value='1'>1</option>
      <option value='2'>2</option>
      <option value='3'>3</option>
   </select>
   )
} // value 为 2 的元素被选中
```

3）复选框和单选框 —— type 为 checkbox 和 radio 的 input 元素，React 控制的是 checked 属性。

```jsx
handleSelectChange(event){
   this.setState({
      [event.target.name]: event.target.checked
   })
   render() {
      return (
         <label>
            <input type="checkbox" value="yes" name="yes" checked={this.state.yes} onChange={this.handleSelectChange}/>
            是的
         </label>
         <label>
            <input type="checkbox" value="no" name="no" checked={this.state.no} onChange={this.handleSelectChange}/>
            不是
         </label>
      )
   }
}
```

使用受控组件处理表单状态是比较繁琐的，一种可替代方案时使用非受控组件 —— 表单自己管理状态，React 通过 ref 获取表单的值。这样简化了操作，但是破坏了 React 对组件状态管理的一致性，所以还是少用为好，这里就略过了。

8、状态提升

所谓状态提升，就是将多个子组件需要共同维护的数据提升到父组件中去。

```jsx
handleChange(e) {
   this.props.onTemperatureChange(e.target.value); // 触发父组件的事件   // 和 vue 的 this.$emit 类似
}
```

当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，需要把子组件的 state 数据提升至其共同的父组件当中保存。之后父组件可以通过 props 将状态数据传递到子组件当中。这样应用当中所有组件的状态数据就能够更方便地同步共享了。

#### 9、组合 & 继承

React 推荐使用【组合】方式实现代码复用。Props 和组合为你提供了清晰而安全地定制组件外观和行为的灵活方式。

注意：组件可以接受任意 props，包括基本数据类型，React 元素以及函数。

### 二、React 哲学

React 最棒的部分之一是引导我们思考如何构建一个应用。

举个例子，假设我们已经拿到了一个设计稿和返回数据的 API：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/608f93fc80f3425caa1948c8034c8056~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

`第一步`：将设计好的 UI 划分为组件层级

在设计稿上用方框圈出每一个组件，包括它们的子组件，并以合适的名字命名。组件划分原则——`单一功能原则`：一个组件只负责一个功能。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92da1595c9164544b1ee57f470877a24~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

`第二步`：用 React 创建一个静态版本

确定了组件层级，可以编写对应的应用了。最好将渲染 UI 和 添加交互这两个过程分开。

先用已有的数据模型渲染一个不包含交互的静态 UI。

`第三步`：确定 UI state 的【最小且完整】表示

找出应用所需的 state 的最小集合，不要重复或者冗余。【就是说在实现功能的前提下，设置的变量个数尽可能最小】

比如刚刚的示例应用拥有如下数据：

- 包含所有产品的原始列表
- 用户输入的搜索词
- 复选框是否选中的值
- 经过搜索筛选的产品列表

怎么去 check state 的最小表示呢？问自己三个问题：

- 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。
- 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。
- 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。

经过检查，刚刚例子中属于 state 的有：

- 用户输入的搜索词
- 复选框是否选中的值

`第四步`：确定 state 放置的位置 —— 哪个组件应该拥有某个 state

React 中的数据流是单向的，并顺着组件层级从上往下传递。

对于应用中的每一个 state：

- 找到根据这个 state 进行渲染的所有组件。
- 找到他们的共同所有者（common owner）组件（在组件层级上高于所有需要该 state 的组件）。
- 该共同所有者组件或者比它层级更高的组件应该拥有该 state。
- 如果你找不到一个合适的位置来存放该 state，就可以直接创建一个新的组件来存放该 state，并将这一新组件置于高于共同所有者组件层级的位置。

`第五步`：添加反向数据流

子组件向父组件传值。

【官网这个小例子蛮好的，不管是用什么框架，在开发之前先想清楚要怎么划分组件、怎么设置变量，想好再开始写代码或许事半功倍。】

### 三、React 16 新特性

🤡 React 16 之前， render 方法必须返回单个元素，现在支持返回 `数组【由 React 元素组成】和 字符串`。

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return "ssss";
  }
}
```

🤡 React 16 之前，组件如果在运行时出错，会阻塞整个应用的渲染，现在有了`新的错误处理机制`：默认情况下，当组件中抛出错误时，这个组件会从组件树中卸载，从而避免整个应用的崩溃。React 16 还提供了一种更加友好的错误处理方式——`错误边界（Error Boundaries）`，是能够捕获子组件的错误并对其做优雅处理的组件。优雅的处理可以是输出错误日志、显示出错提示等，显然这比直接卸载组件要更加友好。

定义了 componentDidCatch(error, info) 这个方法的组件将成为一个错误边界：

```jsx
import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <h1>OOPS, 出错了！</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
```

使用 ErrorBoundary ：

```html
<ErrorBoundary>
  <Example></Example>
</ErrorBoundary>
```

内部组件有异常时，错误会被 ErrorBoundary 捕获，并在界面上显示提示。

🤡 `Portals 特性`：可以让我们把组件渲染到当前组件树以外的 DOM 节点上。【和 Vue 的 teleport 作用类似】

```jsx
// child 是可以被渲染的 React 元素/元素数组/字符串等 // container 是 child 被挂载的 DOM 节点
ReactDOM.createPortal(child, container);
```

比如创建一个 Modal 组件：

```jsx
import React from "react";
import ReactDOM from "react-dom";
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
  }
  conponentWillUnmount() {
    document.body.removeChild(this.container);
  }
  render() {
    return ReactDOM.createPortal(<div>我是 Modal</div>, this.container);
  }
}
export default Modal;
```

这样不论在哪里调用该组件，它都是 body 的最后一个子元素。

🤡 `React Hooks`：使用类组件时，有大量的业务逻辑如各类的接口请求需要放在 componentDidMount 和 componentDidUpdate 等生命周期函数中，会使组件变得特别复杂并且难以维护，并且 Class 中的 this 问题也需要特别注意；函数组件虽然能避免 this 问题，但没有生命周期等。

Hooks 出现之后，可以在函数式组件中去使用 React 的各种特性。

Hooks 本质是一些特殊的函数，常见的有：

🎣 `useState`：使用 state

```jsx
import React, { useState } from "react";
// const [state, setState] = useState(initState); // 举个例子
function App() {
  const [state, setState] = useState("Hah"); // 当然这里可以用结构赋值重新命名，whatever u need
  return (
    <div>
      {" "}
      <h1>{state}</h1>{" "}
    </div>
  );
}
export default App;
```

这里 useState 方法同类组件的方法一样，是异步的。但它没有合并多个 state 的作用。

🎣 `useRef`：使用 ref

```jsx
// 通过 el.current 可以获得 DOM 节点
import React, { useRef } from "react";
function App() {
  let el = useRef();
  return (
    <div>
      <h1 ref={el}>{state}</h1>
    </div>
  );
}
export default App;
```

🎣 `useEffect`：处理副作用，诸如网络请求、DOM 操作之类的；相当于 `componentDidMount` 和 `componentDidUpdate` 等的集合体。

举个例子：

```jsx
import React, { useState, useEffect } from "react";
function Course() {
  const [name, setName] = useState("React");
  useEffect(() => {
    console.log("组件挂载或更新");
    return () => {
      console.log("清理更新前的一些内容");
    };
  }, [name]);
  return (
    <div>
      {" "}
      <select
        value={name}
        onChange={({ target }) => {
          setName(target.value);
        }}
      >
        {" "}
        <option value="React">React</option> <option value="Vue">Vue</option> <option value="JQuery">
          JQuery
        </option>{" "}
      </select>{" "}
    </div>
  );
}
export default Course;
```

可以看到，`useEffect` 接收两个参数，第一个是个函数，第二个是个数组，其中第一个函数返回一个函数，第二个数组表示依赖参数。当依赖参数发生变化时，就会执行回调函数。整个组件的生命周期过程：组件挂载 → 执行副作用（回调函数）→ 组件更新 → 执行清理函数（返还函数）→ 执行副作用（回调函数）→ 组件准备卸载 → 执行清理函数（返还函数）→ 组件卸载。

如果单纯想在某一个特定的生命周期执行某些操作，可以通过传递的参数不同来实现：

- 只在 `componentDidMount` 执行，可以把依赖参数置为空数组，这样在更新时就不会执行该副作用了。
- 只在 `componentWillUnmount` 执行，同样把依赖参数置为空数组，该副作用的返还函数就会在卸载前执行。
- 只在 `componentDidUpdate` 执行，需要区分更新还是挂载，需要检测依赖数据和初始值是否一致，如果当前的数据和初始数据保持一致就说明是挂载阶段，当然安全起见应和上一次的值进行对比，若当前的依赖数据和上一次的依赖数据完全一样，则说明组件没有更新。这种情况需要借助 `useRef`，原因在于 ref 如果和数据绑定的话，数据更新时 ref 并不会自动更新，这样就可以获取到更新前数据的值。

⚠️ 只能在函数式组件和自定义 Hooks 之中调用 Hooks，普通函数或者类组件中不能使用 Hooks。

⚠️ 只能在函数的第一层调用 Hooks。

自定义 Hooks：可以把一些需要重复使用的逻辑自定义成 Hooks，命名必须要以 use 开头。这里暂时不放例子了。

### 四、深入理解组件

#### 1、state

我们在组件中用到的与渲染无关的变量，应该定义为组件的普通属性，而不应该放在 state 中。也就是说，render 中没有用到的，都不应该出现在 state 中。

注意：

- 不能直接修改 state，这样不会触发 render。
- state 的更新是异步的，而且 React 可能会将多次状态修改合并为一次更新。【Vue 中有相同的机制，很好理解。】props 的更新也是异步的。
- state 的更新是一个合并的过程。

React 建议将 state 当作`不可变对象`，比如当 state 中有数组时，使用 concat、slice、filter 等返回一个新数组的方法，而不是用 push、pop、shift、splice 等直接修改数组的方法。如果有对象时，使用 ES6 的 Object.assign 方法 或者对象扩展语法等。

```js
this.setState((preState) => ({ arr: preState.arr.slice(1, 3) })); // preState 是旧状态
```

#### 2、组件与服务器通信

- 组件挂载阶段通信：`componentDidMount` 钩子，官方推荐 ✔️

```jsx
componentDidMount(){
   let that = this
   fetch('/getXXX').then(funtion(response){
      that.setState({data: response.data})
   })
}
```

`componentWillMount` 钩子会在组件被挂载前调用，也可以从服务端获取数据。如果在服务端渲染，`componentWillMount` 钩子会被调用两次，而 `componentDidMount` 钩子 只会被调用一次。所以推荐 `componentDidMount` 钩子。

- 组件更新阶段通信：`componentWillReceiveProps(nextProps)` 钩子

#### 3、组件之间通信

- 父子组件通信：props

父传子：props 属性，子传父：回调

```js
// 子传父，通过 props 调用父组件的方法
this.props.handleClick(xxx)
// 父组件中
<Child handleClick={this.handleClick}></Child>
```

- 兄弟组件通信：`状态提升`——把共享的状态保存在离它们最近的公共父组件中，核心还是 props
- Context：组件层级太深时，以 props 为桥梁会很繁琐，React 提供了一个 context 上下文，让任意层级的子组件都可以获得父组件中的状态和方法。创建 context：在提供 context 的组件内新增一个 `getChildContext` 方法，返回 context 对象，然后在组件的 `childContextTypes` 属性上定义 context 对象的属性的类型信息。

```jsx
// 父组件 Father
getChildContext(){
    return { handleClick: this.handleClick }
}
// ...
Father.childContextTypes = {
    handleClick: PropTypes.func
}

// 子组件通过 context 访问
this.context.handleClick()
// ...
Child.contextTypes = {
    handleClick: PropTypes.func
}

```

- 项目复杂时，可以引入 Redux 等状态管理库。

#### 4、特殊的 ref —— 获取 DOM 元素或组件

在 DOM 上使用 ref：

```jsx
this.textInput.focus()

// render 中
<input type="text" ref={ (input) => { this.textInput = input }}/>
// input 表示 input 元素
```

在组件上使用 ref：【只能是类组件】

```jsx
this.inputInstance.handleChange() // 调用通过 ref 获取的 inputInstance 组件实例的 handleChange 方法

// render 中
<Child ref={ (input) => { this.inputInstance = input }}/>
// 这里 input 表示组件实例
```

### 五、虚拟 DOM 和性能优化

#### 1、虚拟 DOM —— JS 对象

前端性能优化中有一个原则：尽量减少 DOM 操作，而虚拟 DOM 正是这一原则的体现。

DIFF 算法：对比新旧虚拟 DOM，时间复杂度 O(n)。

前提假设：

（1）如果两个元素的类型不同，那么它们将生成两棵不同的树。

（2）为列表中的元素设置 key 属性，用 key 标识对应的元素在多次 render 过程中是否发生变化。

具体来说：

- 当根节点是不同类型，不会继续比较子节点，直接按照新的虚拟 DOM 生成真实 DOM；
- 根节点是相同的 DOM 类型，保留根节点，更新变化了的根节点属性；
- 根节点是相同的组件类型，对应的组件实例不会被销毁，只会执行更新操作；
- 比较完根节点， React 会以相同的原则递归对比子节点；
- React 给列表提供了一个 key 属性，用来复用列表。

#### 2、性能优化

- 避免不必要的组件渲染，善用 `shouldComponentUpdate` 钩子，根据具体业务逻辑决定返回 true 或 false；
- 使用 key；
- React Developer Tools for Chrome 插件
- why-did-you-update 插件

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ac136ef2d8348bc829489aefd1b66fa~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 六、高阶组件（HOC） —— 组件逻辑的抽象和复用

\-- HighOrderComponent

#### 1、基本概念

高阶函数：以函数为参数，返回值也是函数的函数。类似地，高阶组件就是以 React 组件为参数，返回一个新的 React 组件的组件。

和父组件有啥区别呢？高阶组件强调的是`逻辑的抽象`。高阶组件是一个函数，函数关注的是逻辑；父组件是一个组件，组件主要关注的是 UI/DOM。如果逻辑是与 DOM 直接相关的，那么这部分逻辑适合放到父组件中实现；如果逻辑是与 DOM 不直接相关的，那么这部分逻辑适合使用高阶组件抽象，如数据校验、请求发送等。

比如我们写一个 MyComp 组件，来获取 localStorage 中的数据并显示：

```jsx
class MyComp extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    let data = localStorage.getItem("data");
    this.setState({ data });
  }
  render() {
    return <div>{this.state.data}</div>;
  }
}
```

如果其他组件也有这样的逻辑时，试试复用：

```jsx
// 高阶组件
function HocComp(OtherComp) {
  return class extends React.Component {
    componentWillMount() {
      let data = localStorage.getItem("data");
      this.setState({ data });
    }
    render() {
      return <OtherComp data={this.state.data} {...this.props} />;
    }
  };
}
class MyComp extends React.Component {
  render() {
    return <div>{this.props.data}</div>;
  }
}

const MycompWithOther = HocComp(MyComp);
```

可以看出高阶组件的主要功能：`封装并分离组件的通用逻辑，让通用逻辑在组件中更好地被复用` —— 装饰者设计模式【🚩：后面看一下设计模式】。

#### 2、使用场景

##### 1）操纵 props

前面的例子

##### 2）通过 ref 访问组件实例

```jsx
function withRef(WrappedComp) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.someMethod = this.someMethod.bind(this);
    }
    // 这里保存了 WrappedComp 实例的引用
    someMethod() {
      this.instance.methodOfWrappedComp();
    }
    render() {
      return (
        <WrappedComp
          ref={(instance) => {
            this.instance = instance;
          }}
          {...this.props}
        />
      );
    }
  };
}

```

##### 3）组件状态提升

比如利用高阶组件将原本受控组件需要自己维护的状态统一提升到高阶组件中。

##### 4）用其他元素包装组件

比如增加布局或者修改样式：

```jsx
function withRedBg(WrappedComp) {
  return class extends React.Component {
    render() {
      return (
        <div style={{ backgroundColor: "red" }}>
          <WrappedComp {...this.props} />
        </div>
      );
    }
  };
}
```

#### 3、参数传递

高阶组件除了接收组件作为参数外，还可以接收其他参数。比如：

```jsx
// 高阶组件
function HocComp(OtherComp, key) {
  return class extends React.Component {
    componentWillMount() {
      let data = localStorage.getItem(key);
      this.setState({ data });
    }
    render() {
      return <OtherComp data={this.state.data} {...this.props} />;
    }
  };
}
class MyComp extends React.Component {
  render() {
    return <div>{this.props.data}</div>;
  }
}

const MycompWithOther = HocComp(MyComp, "data");
// 或者
const MycompWithOther = HocComp(MyComp, "username");

```

#### 4、继承方式实现高阶组件

继承方式实现的高阶组件常用于渲染劫持。例如，当用户处于登录状态时，允许组件渲染；否则渲染一个空组件：

```jsx
function withAuth(WrappedComp) {
  return class extends WrappedComp {
    render() {
      if (this.props.isLogin) {
        return super.render();
      } else {
        return null;
      }
    }
  };
}
```