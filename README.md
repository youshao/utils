广播类 - 用于不同webview之间的通讯
---

## 基础介绍

JS广播类是为了解决不同webview之间的通讯，从而减少不必要的接口请求。不同webview之间的信息传递是通过`localStorage`来传递的，所以仅支持同域名下的webview通讯。

## 常用方法
- send
- watch

## watch

### 参数
- eventId：事件ID
- msgObj：接收到的参数（类型：object）

### 示例

```js
const broadcast = new Broadcast();

// 发送广播
broadcast.send(eventId, msgObj);
```

## watch

监听由`broadcast.send(eventId, msgObj)`方法发出的广播事件，需要将此方法放到webview或组件的生命周期中，例如放到栈顶事件中。

### 参数
- eventId：事件ID
- callback：成功接收到事件后的回调函数
  - msgObj：接收到的参数（类型：object）

### 示例

```js
// 回到栈顶事件
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // 接收广播
        const broadcast = new Broadcast();
        broadcast.watch(eventId, (msgObj) => {
            console.log(eventId+'广播事件携带的参数：', msgObj);
        });
    }
})
```