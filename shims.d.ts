declare module 'postcss-pxtorem' {
  import type { Plugin } from 'postcss'

  interface pxtoremOptions {
    rootValue?: number
    unitPrecision?: number
    propList?: string[]
    selectorBlackList?: string[]
    replace?: boolean
    mediaQuery?: boolean
    minPixelValue?: number
  }

  function pxtorem (options?: pxtoremOptions): Plugin

  export default pxtorem
}
