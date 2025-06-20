/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<any, any, any>
  export default component
}

declare module '*.glsl' {
  const content: string
  export default content
}

/**
 * 扩展自定义 env
 */
interface ImportMetaEnv {
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
