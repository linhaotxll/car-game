/** 项目内的样式，最好放在重置样式后，uno.css前  */
import './styles/index.scss'

/** 引入uno.css，不引入不生效 */
import 'uno.css'

import { createApp } from 'vue'

import App from '~/App.vue'

async function bootstrap () {
  const app = createApp(App)

  app.mount('#root')
}

bootstrap()
