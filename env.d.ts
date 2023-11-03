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
