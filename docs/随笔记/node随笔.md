# node随笔

## import.meta 增强

在node v20以上版本的`"type": "module"`中可以使用，`import.meta.dirname` 与 `import.meta.filename`代替 `__dirname` 与 `__filename`

```js
import path from 'path'

console.log(import.meta)
const file = path.join(import.meta.dirname, 'index.js')
```

## `ws`的 `ping pong` 机制

目前 webSocket 协议中并没有提供心跳机制，但是可以通过 `ping pong` 机制来实现心跳机制，一般是服务端来实现，web中并没有提供（好像现代浏览器中自己有了，不大清楚）

mdn 的说明

::: tip
Pings 和 Pongs：WebSockets 的心跳
在经过握手之后的任意时刻里，无论客户端还是服务端都可以选择发送一个 ping 给另一方。当 ping 消息收到的时候，接受的一方必须尽快回复一个 pong 消息。例如，可以使用这种方式来确保客户端还是连接状态。

一个 ping 或者 pong 都只是一个常规的帧，只是这个帧是一个控制帧。Ping 消息的 opcode 字段值为 0x9，pong 消息的 opcode 值为 0xA 。当你获取到一个 ping 消息的时候，回复一个跟 ping 消息有相同载荷数据的 pong 消息 (对于 ping 和 pong，最大载荷长度位 125)。你也有可能在没有发送 ping 消息的情况下，获取一个 pong 消息，当这种情况发生的时候忽略它。
:::

简单说明：ping pong 机制的优势是比正常发送一个消息的数据量小，当多个连接是可以大大减少网络开销，但是缺点是服务端需要处理大量的 ping pong 消息，如果处理不当，可能会造成内存溢出。

### 实现

`server.on('upgrade')` 监听这个事件可以监听到协议变化，当`http协议`升级为`websocket协议`的时候，触发这个事件。

使用 `setInterval` 来定时发送 ping 消息，这样就可以实现 `ping pong` 心跳机制。

```js
import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import { v4 as uuidv4 } from 'uuid'

// 保存所有的 ws 连接
const wsMap = new Map()
let PingIntervalIsrun = true

// 定时器，每隔 20 分钟 发送 ping 消息
function startPingInterval() {
  setInterval(() => {
    // 判断是否可以运行，防止之前的回调没有执行完成
    if (!PingIntervalIsrun) return
    PingIntervalIsrun = false

    for (const [key, wsPingItem] of wsPingMap) {
      wsPingItem.ws.ping()
    }
    PingIntervalIsrun = true
  }, 1000 * 60 * 20)
}

function onSocketError(error) {
    console.error(error)
}
function startHttpWebSocketSApp() {
  const server = createServer()
  server.on('upgrade', function (request, socket, head) {
    try {
      console.log('有连接进来')
      socket.on('error', onSocketError)

      socket.removeListener('error', onSocketError)
      // 当协议升级时，使用 ws 来管理这个通信
      const wss = new WebSocketServer({ clientTracking: false, noServer: true })
      wss.on('connection', function (ws, request) {
        // 使用 uuid 来区分 ws 链接
        const uuid = uuidv4()

        ws.on('error', err => {
          console.error('ws error:', err)
        })
        ws.on('message', function (message) {
            console.log(message)
        })
        ws.on('close', async function () {
          console.log(`有链接关闭`)
          // 关闭链接的时候，删除 wsMap 中的数据
           if (wsMap.has(uuid)) {
            wsMap.delete(uuid)
           }
        })
        // 订阅 pong 事件，客户端回复 pong 的时候触发
        // 然后记录时间
        ws.on('pong', () => {
            console.log('收到 pong 消息, uuid:', uuid)
          if (wsMap.has(uuid)) {
            // 保存的数据类型
            wsMap.set(uuid, {
                ws:ws,
                wss:wss,
                ping: [{
                    date: Date.now(),
                    type: 'ping'
                }]
            })
          }else{
            const wsMapItem = wsMap.get(uuid)
            wsMapItem.ping = {
                date: Date.now(),
                type: 'ping'
            }
          }
        })
        
        // 保存链接  
        // 为什么保存 ws 而不是 wss，因为 wss 是二次封装的对象 ws 才是node的 socket 原生对象，
        // send() 方法在 ws 中，而 wss 并没有这个方法
        // 所有保存 ws ，当然你想全部保存也没问题
        if (wsMap.has(uuid)) {
        // 保存的数据类型
            wsMap.set(uuid, {
                ws:ws,
                wss:wss,
                ping: [{
                    date: Date.now(),
                    type: 'ping'
                }]
            })
        }
      }
      wss.handleUpgrade(request, socket, head, function (ws) {
        wss.emit('connection', ws, request)
      })
    } catch (error) {
      console.error(`事件异常`,error)
    }
  })

  server.listen(4399,()=>{
    console.log('服务启动 http://localhost:4399')
    // 启动定时器
    startPingInterval()
  })
}
startHttpWebSocketSApp()
```