import { createApp } from 'vue'
import App from './App.vue'
import './util/style/init.scss'
import Button from './components/library/Button.vue'

import router from './router'
import store from './store'

import Alert from './components/library/alert/index.ts'

import axios from 'axios'
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('circleToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Alert)
app.component('ZButton', Button)

app.mount('#app')
