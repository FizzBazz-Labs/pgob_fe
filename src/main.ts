import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, defaultConfig(config))

import Vue3Toasity, { type ToastOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

app.use(Vue3Toasity, {
  autoClose: 3000,
  position: 'bottom-right',
} as ToastOptions)

app.mount('#app')
