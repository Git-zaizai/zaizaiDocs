# `Lodash` 
是一个一致性、模块化、高性能的 JavaScript 实用工具库。
一些方便的方法里面都有方法直接提供使用



## `isObject`、`isPlainObject`

`isObject`：只判断`typeof`为`object`的，包括了对象、数组、函数

`isPlainObject`：判断真正的`object`，只有是真正的`object`才能为`true`

源码实现：
`isObject`
```js
function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}
```

`isPlainObject`
```js
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) != '[object Object]') {
    return false
  }
  if (Object.getPrototypeOf(value) === null) {
    return true
  }
  let proto = value
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(value) === proto
}
```