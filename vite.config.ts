import path from 'node:path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { transformLazyShow } from 'v-lazy-show'
import { defineConfig, loadEnv } from 'vite'
import dynamicImport from 'vite-plugin-dynamic-import'
import { viteMockServe } from 'vite-plugin-mock'
import VueDevTools from 'vite-plugin-vue-devtools'


import type { ProxyOptions } from 'vite'

const root = __dirname
const resolve = (...p: string[]) => path.resolve(root, ...p)

export function kebabCase (key: string) {
  const result = key.replace(/([A-Z])/g, ' $1')
    .trim()
  return result.split(' ')
    .join('-')
    .toLowerCase()
}



// 自定义原生 tag 列表
const customElement: string[] = ['page-loading']

const assetsDir = 'assets'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())

  const proxyPrefix: Record<string, number | undefined> = {
    [`${env.VITE_SYSTEM_VIDEO_PREFIX}`]: 6070,
    [`${env.VITE_SYSTEM_SERVER_PREFIX}`]: undefined,
  }


  return {
    resolve: {
      alias: {
        '~/': `${resolve('src')}/`,
      },
      extensions: [
        '.ts',
        '.vue',
        '.js',
        '.mjs',
        '.mts',
        '.jsx',
        '.tsx',
        '.d.ts',
        '.json',
      ],
    },

    css: {},

    plugins: [
      VueDevTools(),

      visualizer({
        emitFile: false,
        open: true, // 如果存在本地服务端口，将在打包后自动展示
      }),

      vue({
        script: {
          defineModel: true,
        },
        template: {
          compilerOptions: {
            isCustomElement: tag => customElement.includes(tag),
            nodeTransforms: [transformLazyShow],
          },
        },
      }),

      vueJsx(),

      unocss(),

      AutoImport({
        include: [/\.vue$/, /\.[tj]sx?$/],

        resolvers: [
          AntDesignVueResolver({ importStyle: false }),
        ],

        imports: [
          'vue',
          'vue-router',
          '@vueuse/core',
        ],

        dirs: [
          './src/components/**',
          './src/directives/**',
          './src/layouts/**',
          './src/pages/**',
        ],

        dts: './src/typings/auto-imports.d.ts',

        vueTemplate: true,

        eslintrc: {
          enabled: true,
          filepath: '.eslintrc-auto-import.json',
        },
      }),

      Components({
        dirs: ['./src'],
        include: [
          /\.vue$/,
          /\.vue\?vue/,
          /\.md$/,
        ],

        extensions: ['vue', 'tsx'],
        dts: './src/typings/components.d.ts',
        importPathTransform: path => path.endsWith('.tsx') ? path.slice(0, -4) : path,
      }),

    ],

    server: {

    },

    build: {
      assetsInlineLimit: 4096,
      assetsDir,

      minify: 'esbuild',

      rollupOptions: {
        output: {
          assetFileNames (assetInfo) {
            const assetName = assetInfo.name
            if (assetName) {
              const info = assetName.split('.') ?? []
              let extType = info[info.length - 1]
              if (
                /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetName)
              ) {
                extType = 'media'
              } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetName)) {
                extType = 'img'
              } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetName)) {
                extType = 'fonts'
              }
              return `${assetsDir}/${extType}/[name]-[hash][extname]`
            }

            return `${assetsDir}/[name]-[hash][extname]`
          },

          chunkFileNames: `${assetsDir}/js/[name]-[hash].js`,
          entryFileNames: `${assetsDir}/js/[name]-[hash].js`,

          manualChunks (id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
    },

    optimizeDeps: {
      include: [],
    },
  }
})
