import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
} from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
  ],

  theme: {
    colors: {},
    fontSize: {},
  },

  rules: [],

  shortcuts: [
    ['center', 'flex justify-center items-center'],
  ],
})
