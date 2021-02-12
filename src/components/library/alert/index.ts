import { createApp, App } from 'vue'
import AlertComponent from './Alert.vue'

interface AlertOpt {
  id: string
}

let $inst
// 创建挂载实例
let createMount = (opts: object) => {
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)

  const app = createApp(AlertComponent, {
    ...opts,
    modelValue: true,
    remove() {
      app.unmount(mountNode)
      document.body.removeChild(mountNode)
    },
  })
  return app.mount(mountNode)
}

interface Options {
  id?: string
}

function Alert(options: Options = {}) {
  options.id = options.id || 'Alert_' + Math.random()
  $inst = createMount(options)

  return $inst
}

export default Alert.install = (app: App) => {
  // app.component('v3-popup', PopupConstructor)
  app.config.globalProperties.$Alert = Alert
  app.provide('Alert', Alert)
}
