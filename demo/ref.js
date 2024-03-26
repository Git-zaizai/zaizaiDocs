import path from 'path'
import fs from 'fs'

export function _join(...props) {
  return path.join(...props)
}

function isType(value) {
  return Object.prototype.toString.call(value)
}

export function debounce(fun, wait = 1500) {
  let timeout = null
  return function () {
    if (timeout) {
      //如果存在定时器就清空
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fun.apply(this, arguments)
    }, wait)
  }
}

export const saveLocalJson = (ph, data) => {
  try {
    fs.writeFileSync(ph, JSON.stringify(data))
    return true
  } catch (e) {
    console.log(import.meta.dirname, e)
    throw e
  }
}

// 验证文件存在
export function directoryExistsSync(dirPath) {
  try {
    const stats = fs.statSync(dirPath)
    return stats.isFile()
  } catch (err) {
    console.log('directoryExistsSync ~ err:', err)
    if (err.code === 'ENOENT') {
      return false
    }
    return false
  }
}

export const getLocalJson = ph => {
  if (directoryExistsSync(ph)) {
    return JSON.parse(fs.readFileSync(ph).toString())
  }
  return null
}

/**
 * @function ref
 * @param {[{},string[]]} props
 * @returns
 */
export default function ref(...props) {
  if (props.length === 0) {
    throw Error(`error: 请传入完整参数`)
  }

  let DATA_REF = props.shift()
  let filePh = props.join('/')
  // 初始化读取数据
  DATA_REF = getLocalJson(filePh) || Deb
  const debounceFn = debounce(saveLocalJson, 20)
  const handler = {
    get(target, key) {
      const v = Reflect.get(target, key)
      return isType(v) === '[object Object]' ? new Proxy(v, handler) : v
    },
    set(target, key, value) {
      let res = Reflect.set(target, key, value)
      // 添加防抖，减少io操作
      debounceFn(filePh, DATA_REF)
      return res
    }
  }
  DATA_REF = new Proxy(DATA_REF, handler)

  return DATA_REF
}

console.time()
const globalStatePath = _join(import.meta.dirname, './novel.json')
const globalState = ref({}, globalStatePath)
console.timeEnd()
