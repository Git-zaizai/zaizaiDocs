/// <reference types="vitepress/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_APP_NODE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
