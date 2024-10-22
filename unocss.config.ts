import {
  defineConfig,
  toEscapedSelector as e,
  presetAttributify,
  presetIcons,
  presetUno,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],

  theme: {
    colors: {
      primary: {
        block: 'var(--color-block)',
        card: 'var(--color-card)',
      },
    },
    fontSize: {
      s: ['0.5rem', '0.75rem'],
    },
  },

  rules: [
    [
      /^table-has-form/,
      (_, { rawSelector }) => `.${rawSelector} > .el-space__item:nth-of-type(2) { overflow: auto; }`,
    ],
    [
      /^tabs-flex/,
      (_, { rawSelector }) => {
        const selector = e(rawSelector)
        return `
${selector} {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

${selector} .el-tabs__content {
  flex: 1;
  overflow: auto;
}
        `
      },
    ],
    [
      /^card-flex/,
      (_, { rawSelector }) => {
        const selector = e(rawSelector)
        return `
${selector} {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

${selector} .ant-card-body {
  flex: 1;
  overflow: auto;
}
        `
      },
    ],
    [
      /^flex-(\d+\.?\d*)/,
      (match, { rawSelector }) => {
        if (match && match[1]) {
          const selector = e(rawSelector)
          return `
${selector} {
  flex: ${match[1]};
}
          `
        }
        return ''
      },
    ],
    [
      /^spin-chart/,
      (_, { rawSelector }) => {
        const selector = e(rawSelector)
        return `
${selector} .ant-spin-nested-loading, ${selector} .ant-spin-container {
  height: 100%;
}`
      },
    ],
    [
      /^tabs-scroll/,
      (_, { rawSelector }) => {
        const selector = e(rawSelector)
        return `
          ${selector}.ant-tabs-top,
          ${selector} .ant-tabs-content-holder {
            height: 100%;
            overflow: auto;
          }

          ${selector} .ant-tabs-nav {
            margin-bottom: 0 !important;
          }

          ${selector} .ant-tabs-content-holder {
            padding-top: 16px;
          }
        `
      },
    ],
  ],

  shortcuts: [
    [
      'icon-btn',
      'text-16 inline-block cursor-pointer opacity-75 select-none transition duration-200 ease-in-out hover:text-primary',
    ],
    ['center', 'flex justify-center items-center'],
    ['flex-center', 'flex justify-center items-center'],
    [
      'card-shadow',
      [
        {
          'box-shadow':
            '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017',
        },
      ],
    ],
    ['normal-border', [{ border: '1px solid var(--el-border-color)' }]],
    [
      'normal-card',
      [{ background: 'var(--normal-card-bg)', 'border-radius': '4px' }],
    ],
  ],
})
