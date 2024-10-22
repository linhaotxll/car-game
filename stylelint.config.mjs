export default {
  /* 继承其他规则, 用来扩展配置 */
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-html/vue',
    'stylelint-config-standard-vue',
    'stylelint-config-standard-scss',
    'stylelint-config-standard-less',
    'stylelint-config-recommended-vue',
  ],

  /* 可以为不同格式的文件分别配置 */
  overrides: [
    {
      files: ['*.(less|vue)'],
      /* 指定在代码上使用的自定义语法 */
      customSyntax: 'postcss-syntax',
    },
    {
      files: ['*.(sass|scss|vue)'],
      /* 指定在代码上使用的自定义语法 */
      customSyntax: 'postcss-scss',
    },
    {
      files: ['*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],

  /* 忽略文件 */
  ignoreFiles: [
    'node_modules',
    'public',
    'dist',
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],

  plugins: ['stylelint-order'],

  rules: {
    // 选择器名称匹配
    'selector-class-pattern': '.*',
    // 函数参数不使用引号
    'function-url-quotes': 'never',
    // 颜色值使用 16 进制完整值
    'color-hex-length': 'long',
    // 使用 @ 规则
    'at-rule-no-unknown': null,
    // 操作符后禁止换行
    'scss/operator-no-newline-after': null,
    // 允许自定义标签名
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page', 'recycle-item', 'view', 'text', 'scroll-view'],
      },
    ],
    // 允许未知的伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
    // 允许未知单位
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    // 属性排序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'font-weight',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition',
    ],
  },

}
