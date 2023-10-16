# TS 入门完全指南

> 作者：**[xixixiaoyu](https://github.com/xixixiaoyu)**

# TS 类型基本用法

## TS 简介

- TypeScript，简称 TS， 是一种由微软开发的编程语言，它是对 JavaScript 的一个增强
- 让我们更加方便地进行类型检查和代码重构，提高代码的可靠性和可维护性
- 同时，TypeScript 还支持 ECMAScript 的最新特性

## 搭建学习环境

进入 Node 官网安装 ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/69cd963b0d904e89a060130b9ed799c9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 安装完成后使用以下命令查看是否安装完成： 安装完成后使用以下命令查看是否安装完成：

- `node -v`
- `npm -v`

继续安装 nrm 管理包源：

- `npm i nrm -g`
- `nrm ls`
- `nrm use taobao`

全局安装 typescript：

- `npm i typescript -g`

全局安装 ts 的编译工具，使用 ts-node 可以将 ts 文件执行

- `npm i ts-node -g`
  - 使用：`ts-node index.ts`
- 安装 ts-node 依赖包：`npm install tslib @types/node -g`

使用 TS 可以有良好的提示，使代码可读性变强，更提前发现问题

---

## TS 类型

- TS 出现弥补的 JS 的类型缺失
- 众所周知，代码错误越早发现越好，`代码编写 > 代码编译 > 代码运行` `开发 > 测试 > 上线`
- Vue2 使用 `Flow` 进行类型检查，后续 Vue3 也使用 `Typescript` 重写
- TS 代码要运行在浏览器，需要进行类型擦除，转换为 JS 代码
- TS 类型包含所有 JS 类型 null、undefined、string、number、boolean、bigInt、Symbol、object（数组，对象，函数，日期）
- 还包含 void、never、enum、unknown、any 以及 自定义的 type 和 interface

### 变量声明

- `var/let/const 标识符: 数据类型 = 赋值`

手动指定数据的类型（类型注解），不要写成大写的 `String` ，因为这是 JS 的一个内置类 ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9f8a4b3688c4a9699b68e5bf01ab47c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 变量类型定义的时候已经决定 ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95a7c39ab9bc42cc915e02d42b394518~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 类型推导

- 如果没有明确指定类型，TS 会隐式的推导出一个类型
- 这类型根据赋值的类型推断，没有赋值则为 `any` 类型，能自动推导出类型，没必要手动指定

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/128a4daea7a2407b936550a309cec9fe~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50c51e1b7f3f4d3c84631c2f91595fd4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 基础类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b535c2dcabf4e9cbc04bd4ae3388069~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 数组和元组

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a6d57a3e7ca4ecdb60147f366c95576~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

- tuple 可以作为函数返回的值，React 的 useState 就是个元组，类似于

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0461fc55d7d2482f8e4191af5e65975a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 对象类型

- TS 中的 object 类型泛指所有的的非原始类型，如对象、数组、函数
- 下面我们使用 object 声明了这个对象，但是这个对象既不能设置新数据，也不能修改老数据

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83f14883970e44c6957370384e994057~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

- 下面这种对象类型的限制才更为精确
- 可限制对象每个属性的类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a181faeb76b46a8ad12af10e1cf23a8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### any、unknown、never

- 无法确定一个变量的类型，可使用 `any`，此时在其身上做任何操作都是合法的，即使访问了一个不存在的属性
- 如果某些情况处理类型过于繁琐，或者在引入一些第三方库时，缺失了类型注解，这个时候 我们可以使用 any，更多是为了兼容老代码

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7dcac69dbfb94845ac7050076d30e477~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 如果想要 msg 不标注 any，默认也是 any 类型，但如果我们不想这种隐式的 any，可以新建 `tsconfig.json`，书写以下配置： ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33dd921be9f142488cdeef3bffd0dc62~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

- `unknown` 类型表示一个值可以是任何类型，它是所有类型的父类型，任何类型都可以赋值给 unknown 类型，但是 unknown 类型只能赋值给 any 类型和 unknown 类型本身
- 类似 `any`，与 `any` 类型不同的是，`unknown` 类型的变量不能直接赋值给其他类型的变量，也不能调用其上的任何方法或属性，除非先进行类型检查或类型断言，这样确保运行时的类型安全
- 默认在其操作都是不合法的，主要是在编写通用代码时，例如编写库或框架时，需要处理来自不同来源的数据，但又不确定数据的类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd58df10c465450484dd24293bf57dce~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

- 假如一个函数的返回结果是死循环或者异常，我们可以使用 `never` 类型表示这种永不存在值的类型
- 它是一个底层类型，不是任何类型的子类型，也没有任何子类型
- 更多情况是封装工具库时候可以使用，比如下面这段代码，如果单纯在函数参数的类型多加一个参数，而没有对应 `case` 处理，则会报错

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50244db357624ea99d09fb08944aa256~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) `never` 会在联合类型被直接移除 ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e254d6504a8d4908a17ffad6d83ea83d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 函数类型

- 声明函数时，可以在每个参数后添加类型注解，声明其参数类型
- 同样也可以声明返回值的类型，不过也可以不写让 TS 自动推导
- 函数参数的一般顺序 必传参数 - 有默认值的参数 - 可选参数

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab7763527888430ba07accc8d39c860e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 枚举类型

- 枚举类型将一组可能出现的值，一个个列举，定义在一个类型中，这个类型就是枚举

## ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca9cdb08105549069150b4f711ec54ac~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 这种字符串的枚举可能使用 `type Direction = 'LEFT' | 'RIGHT' | 'TOP' | 'RIGHT'`可能会更好点 ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8af4deec087248efa96918ee15eceb05~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## interface 和 type

### 基本使用

- 使用 interface 定义接口，使用 type 定义类型别名
- 都可以约束对象的结构

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a32f5231f9e14aaab198ecfc301aa567~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 区别

1.  interface 只描述对象，type 则可以描述所有数据
2.  interface 使用 extends 来实现继承，type 使用 & 来实现交叉类型
3.  interface 会创建新的类型名，type 只是创建类型别名，并没有创建新类型
4.  interface 可以重复声明扩展，type 则不行（别名是不能重复的）

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a1d5edb8c154c5fab2598085c442640~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/974533c1d7b246eab7b002df6363f3e1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 索引签名（Index Signatures）

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c54a4792272422ebece482998d72dde~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 接口继承

- 接口和类继承相同，都是使用 `extends` 关键字
- 接口是支持多继承的（类不支持多继承）

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7dc95a1059942caa7494e5055b842c6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 接口实现

- 定义的接口可以被类实现
- 之后如果需要传入接口的地方，同样也可以将类实例传入
- 这就是面向接口开发

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7350aa3c165445879a5f3bf63908264b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 函数

### 基本使用

- 我们可以编写**函数类型的表达式（Function Type Expressions）**，来表示函数类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d344d47b2277452cb1bbebe2b71c9136~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

更多细节使用 ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92cc469ed95c42ccabd40ef27ce81975~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 调用签名（Call Signatures）

- 函数除了被调用，也可以有自己的属性值

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2575e7cd4ed48b88e1af9c9b684ccfb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 构造签名 （Construct Signatures）

- 函数也可以使用 new 操作符去当作构造函数
- 使用构造签名，即在调用签名前面加 new 关键词

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f11a6f281fee497c93c271ce261b3cba~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### this

- TS 中默认情况下如果没有指定 this 的类型，this 是 any 类型
- 我们可以在函数第一个参数声明 this 的类型，函数调用传入的参数从第二个开始接收

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c13e288198649c8b7f9df9c82943855~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

- `ThisParameterType` 提取函数类型的 this 参数类型，如果没有 this 参数则返回 unknown
- `OmitThisParameter` 移除函数类型 this 参数类型，返回当前函数类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0d69af818a74c44894d12916841ba2b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

- `ThisType` 指定所在对象的所有方法里面 this 的类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a3e6d8cfe6f4d1e95a0c914cbe48b66~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 联合类型、交叉类型、函数重载

### 联合类型（Union Type）和重载

- TS 允许我们使用多种运算符，从**现有类型中构建新类型**
- 联合类型就是一种组合类型的方式，**多种类型满足一个即可**，使用 | 符号，其中每个联合的类型被称之为**联合成员（union's members）**
- 函数重载则是我们可以去编写不同的\*\*重载签名（overload signatures）\*\*表示函数可以不同的方式调用，一般写两个及以上的重载签名，再编写一个通用函数的实现

假如现在有个函数，可以传入字符串或数组，以获取长度 方式一：联合类型 ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02366985ddac484b944e59020e826d5d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

方式二：函数重载 ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90501c727a8549eaa6303aad0e306cb4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 开发中，尽量使用联合类型，更易阅读

---

- 交叉类型则是**满足多个类型**的条件，使用 & 符号
- 例如 `type MyType = number & string`，满足一个既要是 number 类型，也要是 string 类型的值，显然没有值满足，则会交叉成 never 类型
- 进行交叉时，通常是使用**对象类型交叉**

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82982b6afa1d43aa85ee31abf59c96bf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 类型、非空、常量断言

- 类型断言 `as`，当 TS 无法获取到具体的类型信息，就需要使用**类型断言（Type Assertions）**
- 它可以允许我们断言成更具体或者不太具体的（比如 any）的类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb2284bed3eb429e80567eada54cd675~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

- 非空类型断言 `!`，当我们确定参数有值，需要跳过 TS 对它的检测的时候可以使用

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4f6b28f2c284e2385cb0e3709b0faab~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

- 常量断言 `as const`，将类型尽量收窄到字面量类型，如果用在对象后面，相当于给对象里面每个成员加上 `readonly`并收窄

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06bd75347a77488982cbbbb5a8bb7e9a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 字面量类型

- 其实使用 JS 定义的值不仅可以做值，还可以当做 TS 的类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb4639f6c18945f6978cca71c355d2ad~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 字面量推理

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5374618c7d11465d9f13306832705422~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 类型收窄（Type Narrowing）

- 由一个更宽泛的类型变为更小的类型，缩小声明时的类型路径（Type Narrowing），比如 `number | string -> number`
- 而我们可以通过\*\*类型保护（type guards）\*\*来收窄类型
- 常见的类型保护有
  - `typeof`
  - `Switch` 或者一些相等运算符（`=== 、 !==`）来表达相等性
  - `instanceof`
  - `in`

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae1766533a934049bfe3b47ace864335~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8479822db2f448a9bcf05ddc6ff20d97~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e87ba2ac87be4afa90511cd98e14acbb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

# 类型兼容

- TS 的类型兼容性是指当一个类型的值可以被另一个类型的变量所接受时，这两种类型就是兼容的
- 比如当一个类型 A 可以被赋值给另一个类型 B 时，我们就说类型 A 兼容于类型 B，，那么类型 A 就是类型 B 的子类型，类型 B 就是类型 A 的父类型

## 基本类型和普通对象

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/382c2cedfb504be7989fb7ec07fd8e18~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 接口兼容

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/27ba410d3f9941d8ba16570af19592ae~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 函数兼容

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa98040bf70141aca418fbf046f1a7c4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 类的兼容

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a2bc3b8c4f4477fb3fd6179a0d2dc20~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

# 类

- ES6 之前使用函数实现类，ES6 可以使用 class 关键字声明一个类
- 在默认的 `strictPropertyInitialization` 模式下面我们的属性是必须在`constructor` 初始化的，如果没有初始化，那么编译时就会报错，如希望此模式下不报错，可以使用 `name!: string` 的语法
- 类拥有自己的构造器 `constructor` ，当我们通过 `new` 关键字创建一个实例时会被调用，类中定义的函数叫方法

## 基本使用

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7d39ea560134c8b822d66dffb129a9c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 类的继承

- 使用 `extends` 关键字来实现继承，子类中使用 `super` 来访问父类

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f144e118f124c788ba7032207837fd3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 类的成员修饰符

- 在 TS 中，类的属性和方法支持三种修饰符： `public`、`private`、`protected`
- **public**：类外可见，默认编写的属性就是 public 的
- **protected**：类和子类中可见
- **private**：仅自身类可见
- **#属性**：实现私有属性，并且类型擦除之后还有效

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c0a485975444a5ba055998cf86da8cf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 只读属性

- 如果一个值不希望外界随意修改，可以使用 readonly 变得只读

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3bfcea49735b45d3a14b5c6481d18f7b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 访问器 getters/setters

- 之前有一些私有属性我们不能直接访问，我们就可以使用存取器监听他的获取（getter）和设置（setter）

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45e50996bd7f48109dc18d7ae858ce7b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 静态成员

- 通过 static 可以定义类级别的成员和方法，通过 `类.属性或方法` 就可访问

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4842e34430204ed7b532113f6ebe859d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 抽象类

- 抽象方法，必须存在于抽象类（使用 `abstract` 声明）中
- 抽象类不能被 new 实例化，且内部抽象方法和属性必须被子类实现

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/449b894d470b45c0a7cbe6b3342f456f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 类的类型

- 类本身也可以当做一种类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d227b980af54db5967599719d5bb719~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41d19da6adca4582ad87da40e304b625~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 参数属性（Parameter Properties）

- 参数属性将 `constructor` 参数转换为同名同值的实例属性，相当于帮我们做 `this.name = name` 的操作
- 我们可以在其 `constructor` 参数前面添加可见修饰符（public private protected 或者 readonly）创建参数属性

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70b1d1ad4aeb4ccf8bd45fc6b7b50aa8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

# 泛型编程

函数的本质个人认为是

- 推后部分待定的代码

想象一下 JS 没有函数会怎么样，其实 TS 的泛型就类似于 JS 函数，不过它是**推后执行部分待定的类型**

## 泛型实现类型参数化

- 定义函数的时候不决定参数的类型
- 而是让调用者使用尖括号形式传入对应函数


比如我们实现一个函数，传入一个参数并返回它，保证这个参数和返回值类型一致

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ca33171acf342bea46c9f1a150174a0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

此函数我们使用的话

1.  通过\*\* <类型> \*\*的方式将类型传递给函数；
2.  通过类型推导，自动推导出传入参数的类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1f5a896dbadc4f5da3acce96079fa19c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

当然我们可以传入多个类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95a4da33a8d642288f129db31215280c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

其中，T，E 这些都是我们可以自定义的，它们代表的意义是

- T（Type）：类型
- K（key）、V（value）：，键值对
- E（Element）：元素
- O（Object）：对象

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41834e44692d4dad84ef896213ca4f66~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 泛型接口

泛型接口是一种具有泛型类型参数的接口，它可以在接口的定义中使用这些类型参数，从而使得接口的属性和方法能够适用于多种类型

- 定义接口的时候使用泛型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39162323d7e94f768ff7e7b0b837e2a0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

- 指定类型默认值

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36fdb667cdbe494aa0eff69148f9edb8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 泛型类

- 泛型类是一种具有泛型类型参数的类，它可以在类的定义中使用这些类型参数，从而使得类的属性和方法能够适用于多种类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4ad9c2d80e44e699820bd725917c4f0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c43b9d6e959454b9c913ec985039d22~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 泛型约束（Generic Constraints）

### 泛型中使用 extends

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5037d9d0c65d49fe99ebfb95f95245d1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23701ad356cd46a38a28d997cf9b8afc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eefe6b51f68b40b7b43f20b517e219bc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 泛型中使用 keyof

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0e25a1731e3414f9eea16693a0d0944~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 泛型中使用 extends 和 keyof

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1df3166ec94049f1a12e15f59e6da90f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 映射类型（Mapped Types）

- 映射类型是 TS 中的一种高级类型，它可以用来从一个现有类型中生成一个新的类型
- TS 大部分的内置工具和类型体操都是基于映射类型实现
- 映射类型的语法形式是 `{ [K in keyof T]: U }`
- 其中 `K` 是 `T` 的所有属性名的联合类型，`keyof` 是一个索引类型查询操作符，用来获取一个类型的所有属性名的联合类型。
- `U` 是一个类型变换函数，它用来将 `T` 中的每个属性类型变成另一个类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6213513f02224dfa987435839f0279e3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

在使用映射类型时，有两个额外的修饰符

- `readonly`，用于设置属性只读
- `?` ，用于设置属性可选

`-?` 去掉可选，如果变成 `+?` 则都变可选 `-readonly` 代表去除 `readonly` ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9e783eae35542d9ba8d02c8aaf13382~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

更高级的一些用法 ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de7971a364c14b81bd8fdbb9d7f2e92b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ac1f30c51c945af830445b19eae6790~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71343145882b4b7f91ba563626fe2656~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 内置工具和类型体操

- TS 的类型系统增加了很多功能以适配 JS 的灵活性，导致 TS 是一门**支持类型编程的类型系统**
- 通常我们为代码加上类型约束，不太需要过多类型编程的能力
- 但是在开发一些通用框架，库的时候，考虑各种适配就需要更多考虑类型编程

### 条件类型（Conditional Types）

- 条件类型可以根据某个特定的条件，从两个类型中选择一个作为最终类型
- 写法类似于 JS 三元 ：`SomeType extends OtherType ? TrueType : FalseType`

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bb4d978063840069ae217fa3957c6e7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 条件类型中推断（infer）和 ReturnType

- 条件类型提供了 `infer` 关键词，可以从正在比较的类型中推断类型，然后在 true 分支里引用该推断结果
- 比如目前有一个数组类型，想要获取函数参数和返回值类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b48455176cdc40d1987f156587730e23~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f058707559d9459eb3775253e81116a7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/202fb0da98764888bce68bae815f0259~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 分发条件类型（Distributive Conditional Types）

- 泛型中使用条件类型，如果传入联合类型，就会变成 分发的（`distributive`）

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6ca0f2bbec243cdb6ce6c768be83d4c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 如果我们希望是 `(string | number)[]` 这种类型，给 T 加个方括号就行 ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a879d7ac3bc40b1b5e3fb2aff4f93a9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 注意：若传入 `never` ，则返回的类型始终为 `never`

---

### Partial<Type>

- 所有属性变为可选的类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d2ccd38e5c345ccb74923bcb96ee5ef~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### Required<Type>

- 所有属性变为必填的类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cdaf07008154bf58e237867388740e0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### Readonly<Type>

- 所有属性变为只读的类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e319a698ba14c549ace14b7ab6d0410~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### Record<Keys, Type>

- 构造一个对象类型，所有 key(键)都是 keys 类型， 所有 value(值)都是 Type 类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78e7b838b46448658c27a607d9e5892c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### Pick<Type, Keys>

- 构造一个类型，从 Type 类型里面挑选一些类型 Keys

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c7a61c5f2f04e61bf3850218d822cd7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### Omit<Type, Keys>

- 构造一个类型，从 Type 类型里面过滤掉一些类型 Keys

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b085be988e254e078614221f1274dd85~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### Exclude<UnionType, ExcludeMembers>

- 构造一个类型，它是从 UnionType 联合类型里面排除了所有可以赋给 ExcludedMembers 的类型
- 可以使用它帮助实现 Omit

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cb05630f95547e2b6f8cf9155f2d20a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### Extract<Type, Union>

- 构造一个类型，从 Type 类型里面提取了所有可以赋给 Union 的类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60e6e47563e047bda693edc672e92156~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### NonNullable<Type>

- 构造一个类型，这个类型从 Type 中排除了所有的 null、undefined 的类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a29bb2ff30054485aa7be1429a64e713~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### InstanceType<Type>

- 构造一个由所有 Type 的构造函数的实例类型组成的类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7beb968bfcc844bda84a6326009c6c02~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

下面通过泛型结合工厂函数，更灵活获取实例的类型 ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a36da39121b453db1c092d7e3b3fb06~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

# 扩展知识

## TS 模块化和 .d.ts

- TS 支持两种方式来控制我们的作用域
- 模块化：每个文件可以是一个独立的模块，支持 `ESModule`，也支持 `CommonJS`

如果文件内没有任何 `export` 或 `import` ，而你又希望将它作为模块使用，即使它没有导出任何内容，添加下面这行代码 ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50868a35c3f54238a95bef73d0dc8f89~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

- 内置类型导入（Inline type imports），使用 type 前缀 ，下面两种方式都表示导入一个类型

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82f5b200dd344904800e5db4f1a0ea6b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ccb1be340eaf4f43879f934b0b5f3732~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

- 命名空间：通过 `namespace` 来声明一个命名空间，主要是在早期将模块内部，再进行作用域的划分，防止命名冲突

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a3e9c72d27641d1929cdc16ffe61842~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## 类型声明和查找

- 之前我们写的 `const imageEl = document.getElementById ("image") as HTMLImageElement`，这个 HTMLImageElement 类型来自于哪里呢？
- 这就涉及到对类型的管理和查找规则了，除了我们写的 .ts 的代码文件，其实还有个 .d.ts 文件，它是用来做\*\*类型声明（declare）\*\*或者 \*\*类型定义（Type Definition）\*\*文件
- 当我们写一个类型时候，会在**内置类型声明、外部定义类型声明、自己定义类型声明**里查找

### 内置类型声明

- TS 帮我们内置了一些运行时标准化 API 的声明文件
- 比如 `Function`、`String`、`Math`、`Date`、`RegExp`、`Error` 等内置类型
- 也包含运行环境中的 DOM 、BOM API，比如 `Window`、`Document`、`HTMLElement`、`Event`、`NodeList`等
- 很多常用方法其实 TS 已经帮你声明好了，具体地址：

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05fb83d6f0334e95b986db37b2513245~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

### 内置声明的环境

- 我们可以通过 `target` 和 `lib` 决定哪些内置类型声明可以使用
- 例如，`startsWith` 字符串方法 ECMAScript 6 版本才开始使用，我们就可以修改选项以获取新 API 的类型

### 外部定义类型声明（第三方库）

- 第三方库使用的时候也需要类型声明
- 方式一：库自带 d.ts 的类型声明文件，比如 axios
- 方式二：通过社区公有库 `DefinitelyTyped` 存放类型声明文件，比如我们安装 react 类型声明 `npm i @types/react --save-dev`
  - GitHub 地址：

### 外部定义类型声明（自定义声明）

- 情况一：纯 JS 第三方库，比如 lodash，如果也没有类型声明库安装，我们就需要手动为其添加类型声明
- 情况二：自己项目声明一些公共的类型，方便复用

### 声明文件 d.ts

- .d.ts 文件是声明文件（Declaration File），用于描述 JavaScript 模块、类、函数、变量等的类型信息
- 如果需要为第三方库或者自己库编写全局通用的声明，就可以创建 .d.ts

typescript

复制代码

`declare var 声明全局变量 declare const 声明全局常量 declare function 声明全局方法 declare class 声明全局类 declare enum 声明全局枚举类型 declare namespace 声明（含有子属性的）全局对象 interface 和 type 声明全局类型`

`xxx.d.ts` ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9dcf2222e28c4c3db1cec9f31791a113~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp) 使用的地方就可以放心使用，因为 .d.ts 结尾的文件声明都是全局 ![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/600fe83d87aa41eebcbe3138244a350c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

---

## tsconfig.json

- 通过 `tsc --init` 命令可以生成 `tsconfig.json`
- 它是 TS 的配置文件，用于配置 TS 编译器的行为

```json
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息
  "target": "ES5", // 编译后的 JavaScript 代码的目标版本。例如："es5"、"es6" 等
  "module": "CommonJS", // 编译后的 JavaScript 代码的模块化方案。例如："commonjs"、"es6" 等
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // 编译器需要引入的库文件。例如："es5"、"es6"、"dom" 等
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 编译后的 JavaScript 文件输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 是否生成声明文件
  "declarationDir": "./file", // 声明文件的输出目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 是否生成源代码与编译后代码的映射文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 是否启用严格模式
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许 this 有隐式的 any 类型
  "noImplicitAny": true, //是否禁止隐式的 any 类型。
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许 esmoudle 和 commonjs 相互调用
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}

//  指定需要编译的文件或目录。可以使用通配符 * 匹配多个文件或目录（属于自动指定该路径下的所有ts相关文件）
"include": [
   "src/**/*"
],
//  指定不需要编译的文件或目录。可以使用通配符 * 匹配多个文件或目录（include的反向操作）
 "exclude": [
   "demo.ts"
],
// 指定需要编译的文件列表（属于手动一个个指定文件）
 "files": [
   "demo.ts"
]

```

选项过多，讲几个常用点的：

- target: 编译后的 JavaScript 代码的目标版本。例如："es5"、"es6" 等
- module: 编译后的 JavaScript 代码的模块化方案。例如："commonjs"、"es6" 等
- lib: 编译器需要引入的库文件。例如："es5"、"es6"、"dom" 等
- allowJs: 允许编译器编译 JS，JSX 文件
- strict: 启用所有严格类型检查选项。
- esModuleInterop: 允许 esmoudle 和 commonjs 相互调用
- include: 要编译的文件路径，可以是文件或文件夹的相对路径或绝对路径。
- exclude: 不需要编译的文件路径，可以是文件或文件夹的相对路径或绝对路径
- extends: 继承其他的 tsconfig.json 文件
- skipLibCheck：跳过对引入的库文件的类型检查
- sourceMap：是否生成源代码与编译后代码的映射文件
- "removeComments"：编译文件后删除所有注释

---

# 实战

## 封装 axios

- 支持请求和响应拦截器
- 支持取消请求和取消全部请求的功能
- 提供了 GET、POST、PUT、DELETE 四种请求方法

typescript

复制代码

```ts
import axios from 'axios'
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios'

class Request {
	// Axios 实例
	instance: AxiosInstance
	// 存放取消请求控制器
	abortControllerMap: Map<string, AbortController>

	constructor(config: AxiosRequestConfig) {
		// 创建 Axios 实例
		this.instance = axios.create(config)
		// 存储取消请求的控制器
		this.abortControllerMap = new Map()
		// 添加请求拦截器
		this.instance.interceptors.request.use(
			(res: InternalAxiosRequestConfig) => {
				// 创建取消请求的控制器
				const controller = new AbortController()
				// 获取请求的 url
				const url = res.url || ''
				// 将控制器存储到 Map 中
				res.signal = controller.signal
				this.abortControllerMap.set(url, controller)
				return res
			},
			(err: any) => err
		)

		// 添加响应拦截器
		this.instance.interceptors.response.use(
			(res: AxiosResponse) => {
				// 获取响应的 url
				const url = res.config.url || ''
				// 从 Map 中删除对应的控制器
				this.abortControllerMap.delete(url)
				return res.data
			},
			(err: any) => err // 响应拦截器错误处理函数
		)
	}

	// 发送请求的方法，返回 Promise 对象
	request<T>(config: AxiosRequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			this.instance
				.request(config)
				.then(res => {
					resolve(res as T)
				})
				.catch((err: any) => {
					reject(err)
				})
		})
	}

	// 取消全部请求
	cancelAllRequest() {
		for (const controller of this.abortControllerMap.values()) {
			controller.abort()
		}
		// 清空 Map
		this.abortControllerMap.clear()
	}

	// 取消指定的请求
	cancelRequest(url: string | string[]) {
		// 将参数转换为数组
		const urlList = Array.isArray(url) ? url : [url]
		urlList.forEach(_url => {
			// 根据 url 获取对应的控制器并取消请求
			this.abortControllerMap.get(_url)?.abort()
			// 从 Map 中删除对应的控制器
			this.abortControllerMap.delete(_url)
		})
	}

	// 发送 GET 请求的方法，返回 Promise 对象
	async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'get', url })
	}

	// 发送 POST 请求的方法，返回 Promise 对象
	async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'post', url, data })
	}

	// 发送 PUT 请求的方法，返回 Promise 对象
	async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'put', url, data })
	}
	// 发送 DELETE 请求的方法，返回 Promise 对象
	async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'delete', url })
	}
}

const myRequest = new Request({
	baseURL: 'https://www.fastmock.site/mock/13089f924ad68903046c5a61371475c4',
	timeout: 10000,
})

export default myRequest

```

使用：

vue

复制代码

```vue
<script setup lang="ts">
import Axios from "./axios"
import { onMounted } from "vue"

const myRequest = new Axios({
  baseURL: "https://www.fastmock.site/mock/13089f924ad68903046c5a61371475c4",
  timeout: 10000
})

interface Req {
  name: string
}
interface Res {
  code: string
  data: {
    userName: string
  }
}

const getData = (data: Req) => {
  return myRequest.request<Res>({
    url: "/api/user/login",
    method: "POST",
    data
  })
}

onMounted(async () => {
  const res = await getData({
    name: "云牧"
  })
  console.log(res)
})
</script>

```

---

## 封装 LocalStorage

typescript

复制代码

```ts
interface LocalStorageItem<T> {
  value: T // 存储的值
  expire: number | null // 过期时间，如果为 null 则表示永不过期
}

class LocalStorage {
  private static instance: LocalStorage // 单例模式，保证只有一个实例
  private storage: Storage // localStorage 对象

  private constructor() {
    this.storage = window.localStorage // 获取 localStorage 对象
  }

  public static getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      // 如果实例不存在，则创建一个新实例
      LocalStorage.instance = new LocalStorage()
    }
    return LocalStorage.instance // 返回实例
  }

  public setItem<T>(key: string, value: T, expire?: number): void {
    const item: LocalStorageItem<T> = {
      value: value, // 存储的值
      expire: expire ? new Date().getTime() + expire : null, // 过期时间
    }
    this.storage.setItem(key, JSON.stringify(item)) // 将对象序列化为字符串并存储到 localStorage 中
  }

  public getItem<T>(key: string): T | null {
    const itemStr = this.storage.getItem(key) // 获取存储的字符串
    if (itemStr) {
      // 如果字符串存在
      const item: LocalStorageItem<T> = JSON.parse(itemStr) // 将字符串反序列化为对象
      if (!item.expire || new Date().getTime() < item.expire) {
        // 如果没有过期或者还没有过期
        return item.value // 返回存储的值
      } else {
        this.storage.removeItem(key) // 如果已经过期，则删除该项
      }
    }
    return null // 如果不存在或者已经过期，则返回 null
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key) // 删除指定的项
  }

  public clear(): void {
    this.storage.clear() // 清空 localStorage
  }
}

export default LocalStorage.getInstance() // 导出 LocalStorage 实例
```

使用：

``` ts
interface LocalStorageItem<T> {
  value: T // 存储的值
  expire: number | null // 过期时间，如果为 null 则表示永不过期
}

class LocalStorage {
  private static instance: LocalStorage // 单例模式，保证只有一个实例
  private storage: Storage // localStorage 对象

  private constructor() {
    this.storage = window.localStorage // 获取 localStorage 对象
  }

  public static getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      // 如果实例不存在，则创建一个新实例
      LocalStorage.instance = new LocalStorage()
    }
    return LocalStorage.instance // 返回实例
  }

  public setItem<T>(key: string, value: T, expire?: number): void {
    const item: LocalStorageItem<T> = {
      value: value, // 存储的值
      expire: expire ? new Date().getTime() + expire : null, // 过期时间
    }
    this.storage.setItem(key, JSON.stringify(item)) // 将对象序列化为字符串并存储到 localStorage 中
  }

  public getItem<T>(key: string): T | null {
    const itemStr = this.storage.getItem(key) // 获取存储的字符串
    if (itemStr) {
      // 如果字符串存在
      const item: LocalStorageItem<T> = JSON.parse(itemStr) // 将字符串反序列化为对象
      if (!item.expire || new Date().getTime() < item.expire) {
        // 如果没有过期或者还没有过期
        return item.value // 返回存储的值
      } else {
        this.storage.removeItem(key) // 如果已经过期，则删除该项
      }
    }
    return null // 如果不存在或者已经过期，则返回 null
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key) // 删除指定的项
  }

  public clear(): void {
    this.storage.clear() // 清空 localStorage
  }
}

export default LocalStorage.getInstance() // 导出 LocalStorage 实例

```