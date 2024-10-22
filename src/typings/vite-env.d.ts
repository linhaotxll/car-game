/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<any, any, any>
  export default component
}

/**
 * 扩展自定义 env
 */
interface ImportMetaEnv {
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
