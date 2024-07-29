# uniapp 随笔

## 关于uts插件开发

::: tip
HBuilderX 中在编写代码时，有可能会提示你方式不能使用或者没有这个方法，请查看java或kotlin中有没有对应的方法，可以强行
使用，可以编译过去就行。

然后在对于数据类型的问题，根据提示进行编写，对于这个HBuilderX 编译很严格，必须进行强制转换。还有uts目前的文档不是很清楚，
只能自行探索
:::

## 示例：woL唤醒插件 uts开发 - UDP通讯

```ts
import DatagramSocket from 'java.net.DatagramSocket'
import InetAddress from 'java.net.InetAddress'
import DatagramPacket from 'java.net.DatagramPacket'
import ByteArray from 'kotlin.ByteArray'
import String from 'kotlin.String'
import Byte from 'kotlin.Byte'
import SocketTimeoutException from 'java.net.SocketTimeoutException'
import InetSocketAddress from 'java.net.InetSocketAddress';
import Kotlin from 'kotlin.jvm.internal.Intrinsics.Kotlin';

export type SendOption = {
	/** ip 或域名 */
	host : string;
	/** 目标端口 */
	port : number;
	/** mac地址 */
	mac : number[];
	macNumbers ?: string[],
	/** 成功回调 */
	onceReceive ?: () => void;
	/** 出错的回调函数 */
	onError ?: (message : string) => void;
	/** 结束的回调函数（调用成功、失败都会执行） */
	onCompleted ?: () => void;
};


export class ZUDPClient {
	static send(option : SendOption) {
		var macByte = new ByteArray(6)
		option.mac.forEach((item, index) => {
            // 下标必需转换 int 类型
			macByte[index.toInt()] = item.toByte()
		})

		let msg = new ByteArray(6)
		msg.fill(0xFF.toByte(), 0, 6)
        
		let content = new ByteArray((6 + 16 * 6).toInt())
		msg.copyInto(content)
		for (let i = 0; i < 16; i++) {
			for (let j = 0; j < 6; j++) {
				content[(6 + i * 6 + j).toInt()] = macByte[j.toInt()];
			}
		}

		const socket = new DatagramSocket()
		try {
			socket.send(new DatagramPacket(content, content.size.toInt(), InetAddress.getByName(option.host), option.port.toInt()))
			option.onceReceive?.()
		} catch (e) {
			if (e instanceof SocketTimeoutException) {
				option.onError?.(e.bytesTransferred.toString())
			} else {
				option.onError?.(e.message.toString())
			}
		} finally {
			socket.close()
			option.onCompleted?.()
		}

	}
}
```

## uniapp 保活

推荐使用原生插件进行保话处理

最简单的方式：后台播放无声音乐  `uni.getBackgroundAudioManager`
BackgroundAudioManager实例全局只能有一个

```js

	// 开启后台播放
	function startbgAudioManager() {
		const app = getApp()
		if (checked.value) {
			if (app.globalData.bgAudioManager === null) {
				app.globalData.bgAudioManager = uni.getBackgroundAudioManager();
			}
			app.globalData.bgAudioManager.title = '后台播放保活'
			app.globalData.bgAudioManager.singer = '暂无';
			app.globalData.bgAudioManager.coverImgUrl = '../../static/logo.png';
			app.globalData.bgAudioManager.src = '../../static/wusheng30h.MP3'
			app.globalData.bgAudioManager.onPlay(() => {
				showToast({
					message: '播放成功',
					type: 'success',
				})
			})
			app.globalData.bgAudioManager.onError((res) => {
				errorMsg.value = res.errMsg + '\n' + res.errCode
			})
			app.globalData.bgAudioManager.play()
		} else {
			if (app.globalData.bgAudioManager !== null && app.globalData.bgAudioManager.paused === false) {
				app.globalData.bgAudioManager.stop()
			}
		}
	}
```

