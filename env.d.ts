/// <reference types="vitepress/client" />


declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface ImportMetaEnv {
  readonly VITE_APP_NODE_ENV: string
  readonly VITE_BASE: string
  readonly VITE_GITHUB_PAGES_BASE: string
  readonly VITE_REFERE: string
  readonly VITE_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


interface NavLink {
  /** 站点图标 */
  icon?: string | { svg: string }
  badge?:
  | string
  | {
    text?: string
    type?: 'info' | 'tip' | 'warning' | 'danger'
  }
  /** 站点名称 */
  title: string
  /** 站点名称 */
  desc?: string
  /** 站点链接 */
  link: string
}

interface NavData {
  title: string
  items: NavLink[]
}