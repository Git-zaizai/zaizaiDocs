# 记录ES11之后（包括之前没记录的）的常用特性

## `at` 函数

+ `String.at()`
+ `Array.at()`

在以前你想获取字符或数组中从`后面`开始的某一个数据时：
```js
let a = '65135asd351a3sd168'
let arr = [1,2,3,4,5,6,7,8,9]
console.log(a[a.length - 1])
console.log(arr[a.length - 2])
```
有了`at`函数你就可以不需要写 `[xx.lenght - 1]`了
```js
let a = '65135asd351a3sd168'
let arr = [1,2,3,4,5,6,7,8,9]
console.log(a.at(-1))
console.log(arr.at(-2))
```

## `Promise.allSettled`

解决Promise.all的痛点，Promise.all本身的强硬逻辑，
当处理多个Promise并行时，一旦有一个promise出现了异常，被reject了，
尽管能用catch捕获其中的异常，但你会发现其他执行的Promise的消息都丢失了，
而Promise.allSettled可以获取到所有的Proimse的执行结果，不管是 reslove还是reject了。

```js
const promises = [
  delay(100).then(() => 1),
  delay(200).then(() => 2),
  Promise.reject(3)
  ]

Promise.allSettled(promises).then(values=>console.log(values))
// 最终输出： 
//    [
//      {status: "fulfilled", value: 1},
//      {status: "fulfilled", value: 2},
//      {status: "rejected", value: 3},
//    ]
```

可以看到所有promise的数据都被包含在then语句中，
且每个promise的返回值多了一个status字段，表示当前promise的状态，
没有任何一个promise的信息被丢失。
因此，当用Promise.allSettled时，只需专注在then语句里，
当有promise被异常打断时，我们依然能妥善处理那些已经成功了的promise，不必全部重来。

## 下划线 `_` 分隔符

当你要写一个很长的数字的时候，使用了数字分隔符 _ （下划线），就可以让数字读的更清晰：

```js
let x = 2_3333_3333
// x 的值等同于 233333333，只是这样可读性更强，不用一位一位数了
// 100万的表示
let b = 1_000_000
// 1000万的表示
let q = 10_000_000
```

## 逻辑赋值操作符 `??=` 、`&&=` 、 `||=`

如下：
```js
let a = 1
a += 1
```
这个简写特性后很熟悉，有了新的标准  `??` 、`&&` 、 `||` 也可以进行简写了

```js
// 等同于 a = a || b
a ||= b;
// 等同于 c = c && d
c &&= d;
// 等同于 e = e ?? f
e ??= f;
```

## 正则表达式匹配字符串的时候返回`开始`和`结束`索引

简单来说这个新属性就是允许我们告诉RegExp在返回match对象的时候，
给我们返回匹配到的子字符串的开始和结束索引。


给正则表达式添加一个

`d`

的标记来让它在匹配的时候给我们既返回匹配到的子字符串的起始位置还返回其结束位置:

```js
const str = 'sun and moon';
const regex = /and/d;
const matchObj = regex.exec(str);
console.log(matchObj);

/**
[
  'and',
  index: 4,
  input: 'sun and moon',
  groups: undefined,
  indices: [ [ 4, 7 ], groups: undefined ]
]
 */
```