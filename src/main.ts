import { createApp } from 'vue'
import App from './App.vue'
import './util/style/init.scss'
import Button from './components/library/Button.vue'

import router from './router'
import store from './store'

import Alert from './components/library/alert/index.ts'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(Alert)
app.component('ZButton', Button)

app.mount('#app')
