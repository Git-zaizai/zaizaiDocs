# 第一章：了解TypeScript
## 开发环境搭建
### 1.1 下载 node.js
### 1.2 安装 node.js
### 1.3 使用 npm 全局安装 typescript
:::info
npm i -g typescript
:::
### 1.4 创建 ts 文件
### 1.5 使用 tsc 对 ts 文件进行编译

- 进入命令行
- 进入 ts 文件所在目录
- 执行命令：tsc xxx.ts


## 基本类型
### 2.1 类型说明

- 类型声明是TS非常重要的一个特点
- 通过类型声明可以
- 指定TS中变量（参数、形参)的类型指定类型后，当为变星赋值时，TS编译器会自动检查值是否符合类型声明，符合则赋值，否则报错
- 简而言之，类型声明给变星设置了类型，使得变呈只能存储某种类型的值
- 语法：
```typescript
let 变量:类型;
let 变量:类型 = 值;
function fn(参数:类型,参数:类型):类型{
  ……
}
```
### 2.2 自动类型判断

- TS拥有自动的类型判断机制
- 当对变层的声明和X值是同时进行的，TS编译器会自动判断变量的类型
- 所以如果你的变异的声明和赋值时同时进行的。可以省略掉类型声明
### 2.3 类型：
| 类型 | 例子 | 描述 |
| --- | --- | --- |
| number | 1,3,5 | 任意数字 |
| string | 'hi'，"hi"，hi | 任意字符串 |
| boolean | true、false | 布尔值 |
| 字面量 | 其本身 | 限制变量的值就是该字面量的值 |
| any | * | 任意类型 |
| unknown | * | 类型安全的的any |
| void | 空值（undefined） | 没有值（或undefined） |
| never | 没有值 | 不能使任何值 |
| object | {key:value} | 任意的JS对象 |
| array | [1,2,3] | 任意JS数组 |
| tuple | [4,5] | 元素，TS新增类型，固定长度数组 |
| enum | enum{A,B} | 枚举，TS中新增类型 |


## 编译选项
### 3.1 自动编译文件

- 编译文件时，使用-w指令后，TS编译瞄会自动监视文件的变化，并在文件发生变化时对文件进行重新编译
- 示例:
:::info
tsc xxx.ts -w
:::
### 3.2 自动编译整个项目

- 如果直接使用tsc指令，则可以自动将当前项目下的所有ts文件编译为js文件。
- 但是能直接使用tsc命令的前提时，要先在项目根目录下创建一个ts的配置文件 tsconfig.json
- tsconfig.json是一个JSON文件，添加配置文件后，只需只需tsc 命令即可完成对整个项目的编译
- 配置选项:
#### 3.2.1 include

- 定义希望被编译文件所在的目录
- 默认值：["**/*"]
- 示例：
```json
"include" : ["src/**/* ","tests/**/*"]
```

   - 上述示例中，所有src目录和tests目录下的文件都会被编译
#### 3.2.2 exclude

- 定义需要排除在外的目录
- 默认值:["node_modules", "bower_components"," jspm_packages"]
- 示例：
```json
"exclude":["./src/he1lo/**/*"]
```
#### 3.2.3 flles

- 指定被编译文件的列表，只有需要编译的文件少时才会用到
- 示例：
```json
"files": [
  "core.ts",
	"sys.ts",
  "types.ts",
	"scanner.ts",
	"parser.ts",
  "utilities.ts",
  "binder.ts",
  "checker.ts",
	"tsc.ts"
]
```

   - 列表中的文件都会被TS编译器所编译
#### 3.2.3 compilerOptions

- 编译选项是配置文件中非常重要也比较复杂的配置选项
- 在compilerOptions中包含多个子选项，用来完成对编译的配置
##### 3.2.3.1 target

- 设置ts代码编译的目标版本
- 可选值:
   -  ES3(默认)、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext
- 示例:
```json
"ompileroptions":{
	"target" : "ES6"
}
```

   - 如上设置，我们所编写的tsf尤码将会被编译为ES6版本的js代码
##### 3.2.3.2 lib

- 指定代码运行时所包含的库〔宿主环境)
- 可选值:
   - ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM.webworker、ScriptHost .....
- 示例:
```json
"compileroptions": {
    "target":"ES6"，
    "Tib":["ES6","DOM"],
    "outDir": "dist " ，
    "outFile": "dist/aa.js"
}
```
##### 3.2.3.3 module

- 设置编译后代码使用的模块化系统
- 可选值:
   -  CommonjS、UMD、AMD、System、ES2020、ESNext、None
- 示例:
```json
"compileroptions": {
		"module" : "CommonJs"
}
```
##### 3.2.3.4 outDir

- 编译后文件的所在目录
- 默认情况下，编译后的js文件会和ts文件位于相同的目录，设置outDir后可以改变编泽后文性的位置
- 示例：
```json
"compileroptions": {
		"outDir " : "dist "
}

```

   - 设置后编译后的js文件将会生成到dist目录	
##### 3.2.3.5 outFile

- 将所有的文件编译为一个s文件
- 默认会将所有的编写在全局作用域中的代码合并为一个Js文件，如果module制定了None，System或AMD则会将模块—起合并到文件之中
- 示例:
```json
"compileroptions": {
		"outFile": "dist/app.js"
}
```
##### 3.2.3.6 rootDlr

- 指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过rootDir可以手动指定根目录
- 示例：
```json
"compileroptions": {
		"rootDir" : "./src"
}
```
##### 3.2.3.7 allowJs

- 是否对js文件编译
##### 3.2.3.8 checkJs

- 是杏对js文件进行检查
- 示例:
```json
"compileroptions": {
		"a11owJs": true,
  	"checkJs": true
}
```
##### 3.2.3.9 removeComments

- 是否删除注释
- 默认值: false
##### 3.2.3.10 noEmit

- 不对代码进行编译
- 默认值: false
##### 3.2.3.11 sourceMap

- 是否生成sourceMap
- 默认值: false
##### 3.2.3.12 严格检查

-  "strict": true 启用所有的严格检查，默认值为true，设置后相当于开启了所有的严格检查
- alwaysStrict：编译后的文件是否使用严格模式
- noImplicitAny：不循序隐式的any类型
- noImplicitThis：不允许不明确类型的this
- strictNullChecks：严格的检查空值
- 示例:
```json
"compileroptions": {
		"alwaysStrict": true,
    "noImplicitAny": true,
  	"noImplicitThis": true,
  	"strictNullChecks": true,
}
```
# 第二章：面向对象
## 类（class）
要想面向对象，操作对象，首先便要拥有对象，那么下一个问题就是如何创建对貌。要创建对象，必须要先定义类，所谓的类可以理解为对象的模型，程序中可以根据类创建指定类型的对象，举例来说:可以通过Person类来创建人的对象，通过Dog类创建狗的对象，通过Car类来创建汽车的对象，不同的类可以用来创建不同的对象。
### 1.1 定义类:
```typescript
class 类名{
  属性:类型;

  constructor(参数:类型){
    this.属性名 = 参数;
  }

  方法名(){
    ……
  }
}

```

- 示例：
```typescript
class Person{
  name:string;
  age:number;

  constructor(name:string,age:number){
    this.name = name;
    this.age = age;
  }

  sayHello(){
    console.log(`我叫 ${this.name} 今年 ${this.age} 岁`)
  }
}

const per = new Person('xiaozhupeiqi',18);
console.log(per.name);
console.log(per.age);
per.sayHello();

```
### 1.2 定义继承类：

- 示例：
```typescript
// abstract 抽象类，只能被继承不能被实例化
abstract class Animal{
  name:string;
  age:number;

  constructor(name:string,age:number){
    this.name = name;
    this.age = age;
  }

  sayHello(){
    console.log(`我叫 ${this.name} 今年 ${this.age} 岁`)
  }
  
  // 抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写 
  abstract isRun():void
}

class Dog extends Animal{
  age:number
   constructor(name:string,age:number){
   		super(name)
     	this.age = age
   }

  isRun(){
  	console.log('我能跑')
  }
  	
}
const dog = new Dog('xiaozhupeiqi',18);
console.log(dog.name);
console.log(dog.age);
dog.sayHello();
dog.isRun();

```
### 1.3 属性封装类：

- public：修饰的属性可以在任意位置访问（修改）默认值
- private：私有属性，只能在类内部进行访问（修改）
- protected：受包含的属性，只能在当前类和当前类的子类中访问（修改）
```typescript
class 类名{
  private 属性:类型;

  constructor(参数:类型){
    this.属性名 = 参数;
  }

  // 定义方法获取属性
  方法名(){
    return this.属性
  }

  // 定义方法修改属性
  方法名(形参:类型){
    this.属性:形参
  }
  
}

```

- 示例：
```typescript
class Person{
  private name:string;
  private age:number;

  constructor(name:string,age:number){
    this.name = name;
    this.age = age;
  }

  // 方法获取 name
  // getName(){
  //   return this.name
  // }
  
  // TS写法
  get name(){
    return this.name
  }
  
  // 方法获取 age
  // getAge(){
  //   return this.age
  // }

  // TS写法
  get age(){
    return this.age
  }

  // 方法修改 name
  // setName(name:string){
  //   this.name = name
  // }

  // TS写法
  set name(name:string){
    this.name = name
  }

  // 方法修改 age，是否修改属性值的主动权掌握在手中
   // setAge(age:number){
   //   if(age>=0){
   //     this.age = age
   //   }
   // }

  // TS写法
  set age(age:number){
     if(age>=0){
       this.age = age
     }
  }
}

const per = new Person('xiaozhupeiqi',18);
// 传统写法
// console.log(per.setName('XXX'),per.setAge(111));
// console.log(per.getName(),per.getAge()); 
// TS写法
console.log(per.name = 'XXX',per.age = 111);
console.log(per.name,per.age); 

```
## 2、接口（interface）
接口用来定义一个类结构，接口中的所有属性都不能有实际的值，接口只定义对象的结构，二不考虑实际的值，在接口中所有的方法都是抽象方法
### 2.1 定义简单接口
```typescript
interface 接口名称{
  属性:类型
}
const 名称:接口名称 = {
	属性:数据
}
```

- 示例：
```typescript
interface xiaozhupeiqi{
  name:string
}
const zhu:xiaozhupeiqi = {
	name:'baba'
}
```
### 2.2 定义有方法的接口
```typescript
interface 接口名称{
  属性:类型
  方法名():返回类型
}
class 类名称 implements 接口名称{
  属性:类型
  constructor(参数:类型){
    this.属性 = 参数;
  }
  // 实现接口方法
  方法名(){
    ……
  }
}
```

- 示例：
```typescript
interface A{
  name:string
  b():void
}
class xiaoA implements A{
  name:string
  constructor(name:string){
    this.name = name;
  }
  // 实现接口方法
  b(){
    ……
  }
}
```
## 3、泛型
在定义函数是类时，如果类型不明确就可以使用泛型
### 3.1 定义泛型函数、接口、类

- 示例：
```typescript
// T:泛型函数（可任意指定类型）
// a:泛型形参
// 返回值也是泛型，在调用时接收number类型返回也是number
function fn<T>(a:T):T{
  return a
}
// 不指定类型的函数，TS可以自动进行推断
let result = fn(10)
// 在调用时声明传入指定类型
let result2 = fn<string>('')



interface Inter{
  length:number
}
// T extends Inter 表示泛型T必须是Inter实现类（子类）
function fn3<T extends Inter>(a:T):number{
  return a.length
}
fn3('123')
fn3({length:10})



// 泛型T类
class MyClass<T>{
  name:T
  constructor(name:T){
    this.name = name
  }
}
const mc = new MyClass<strign>('xiaozhupeiqi')
```
