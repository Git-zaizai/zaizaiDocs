import { Plugin } from 'vitepress'

export type Env = Record<string, string>
export type Option = {
  switch?: boolean // 开启插件
  env?: Env
  pathNameArray?: string[]
}


/***
 * @function createEnvCode 生成赋值代码
 */
export function createEnvCode(env: Env): string {
  const list: string[] = []
  for (const key in env) {
    list.push(`import.meta.env.${key} = '${env[key]}'`)
  }
  return '\n' + list.join('\n') + '\n'
}

/**
 * @function findScriptCode 查找 <script> 标签位置
 */
export function findScriptCode(code: string) {
  const regex = /<script\b[^>]*>/g;
  const match = regex.exec(code)

  let lastindex = 0,
    isAdd = false
  if (match) {
    lastindex = match.index + match[0].length
    isAdd = true
  }
  return {
    isAdd,
    lastindex
  }
}

/**
 * @function docScriptLoader 处理 `SFC类` 文件
 */
export function scriptLoader(code: string, env: Env): string {
  const findcode = findScriptCode(code)
  const str = code.slice(0, findcode.lastindex)
  const envCode = createEnvCode(env)
  const strLast = code.slice(findcode.lastindex, code.length)

  return str + envCode + strLast
}


/**
 * 
 * @function jsCodeLoader 处理 `js类` 文件
 */
export function jsCodeLoader(code: string, env: Env): string {
  const envCode = createEnvCode(env)
  return envCode + code
}

/**
 * @function 主函数
 */
export default function viteManualInjectEnv(option: Option): Plugin | undefined {
  const opt = Object.assign({ switch: false, pathNameList: [] }, option)
  if (!opt.switch && !opt?.env && !Object.values(opt.env as Env).length) return

  const pathNameList = [...new Set(['node_modules', '.vite'].concat(opt.pathNameList))]
  const fileRegex = /\.(md|vue|ts|js|tsx|jsx)$/ //匹配文件
  const codeReg = /import\.meta\.env/ // 匹配 代码
  const scrptRegex = /<script\b[^>]*>/g; // 匹配 <script>
  /**
   * 匹配 <script> 在 
   * ``` js
   * <script>
   * ``` 
   * 里面
   */
  const scriptCodeReg = /```[\s\S]*?<script\b[^>]*>[\s\S]*?<\/script>[\s\S]*?```/g
  const vueJsReg = /[?&]/ // 匹配 ****.vue?vue&type=script&setup=true&lang.ts的文件
  return {
    // 插件名称
    name: 'vite-plugin-vitepress-inject-env',
    // 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
    enforce: 'pre',
    // 代码转译，这个函数的功能类似于 `webpack` 的 `loader`
    // code 文件内容
    // id 文件绝对路径
    transform(code, id) {
      // 过滤 不要处理的 文件夹 里面的文件
      const isPath = pathNameList.some(item => id.includes(item))
      if (!isPath && fileRegex.test(id) && codeReg.test(code)) {
        let str: string | null = null
        if (id.endsWith('.md') || id.endsWith('.vue')) {
          if (scrptRegex.test(code) && !scriptCodeReg.test(code)) {
            str = scriptLoader(code, opt.env as Env)
          }
        } else
          /**
           * vite解析过程中 vue文件会被解析成为 ****.vue?vue&type=script&setup=true&lang.ts的文件
           * 额 插件会被调用多次，结尾又是 .ts 所以要加个判断 
           * 
           */
          if (!vueJsReg.test(id)) {
            str = jsCodeLoader(code, opt.env as Env)
          }
        return str ?? code

      }
    }
  }
}