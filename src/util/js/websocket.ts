import store from '../../store'

class WebSocketClient {
  constructor(config = {}) {
    const defaultConfig = {
      url: '127.0.0.1',
      port: '3001',
      protocol: 'ws',
    }
    const finalConfig = { ...defaultConfig, ...config }
    this.ws = {}
    this.port = finalConfig.port
    this.url = finalConfig.url
    this.protocol = finalConfig.protocol
  }

  init() {
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    this.ws.onopen = this.onOpen
    this.ws.onmessage = this.onMessage
    this.ws.onclose = this.onClose
    this.ws.onerror = this.onError
  }

  send(msg) {
    this.ws.send(msg)
  }

  onOpen() {
    const token = localStorage.getItem('circleToken') || store.state.token
    if (!token) {
      return
    }
    this.send(
      JSON.stringify({
        event: 'auth',
        message: token,
      })
    )
  }
  onMessage(event) {
    // 接收服务端发送过来的消息
    let obj = JSON.parse(event.data)
    console.log(obj)
    switch (obj.event) {
      case 'noauth':
        // 鉴权失败
        break
      case 'isAuth':
        // 鉴权成功
        console.log('ws鉴权成功')
        break
      case 'heartbeat':
        this.ws.send(
          JSON.stringify({
            event: 'heartbeat',
            message: 'pong',
          })
        )
        break
      case 'message':
        store.dispatch('message', obj)
        break
      default:
        console.log('1')
    }
  }
  onClose() {
    // 当链接主动断开的时候触发close事件
    console.log('close:' + ws.readyState)
    console.log('已关闭websocket')
    this.ws.close()
  }
  onError() {
    // 当连接失败时，触发error事件
    console.log('error:' + ws.readyState)
    console.log('websocket连接失败')
    // 连接失败之后，1s进行断线重连
    setTimeout(() => {
      this.init()
    }, 1000)
  }
}

export default WebSocketClient
