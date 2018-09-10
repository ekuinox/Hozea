// Electronのmain-process
// webpackでbundleしたものを,Electronから呼び出す

import { app, BrowserWindow, ipcMain, session } from 'electron'
import { ON_NEED_PROXY, ON_PROXY_AUTH, ON_PROXY_SUCCESS, ON_PROXY_FAILED } from '../common/EventNameConstans'
import { AuthenticationCredentials } from '../common/Interfaces'

let win: BrowserWindow
let proxy: {
	credentials?: AuthenticationCredentials
	ok: boolean
} = {
	credentials: {
		username: "",
		password: ""
	},
	ok: false
}

const createWindow = () => {
	win = new BrowserWindow({width: 800, height: 600})
	win.loadFile('dist/index.html')
	win.on('closed', () => {
		win = null
	})
	/* Proxy接続先を見つけてくる */
	/* いらない
	session.defaultSession.resolveProxy("http://yahoo.co.jp", (proxy) => {
		console.log(proxy)
	})
	*/
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
})

app.on('login', (event, webContents, request, authInfo, callback) => {
	if (authInfo.isProxy) {
		// 認証失敗している/まだ認証情報がセットしていない場合に呼び出す
		if (!proxy.ok) webContents.send(ON_NEED_PROXY)
		event.preventDefault()
		callback(proxy.credentials.username, proxy.credentials.password)
	}
})

ipcMain.on(ON_PROXY_AUTH, (event: any, arg: AuthenticationCredentials) => {
	proxy.credentials = arg
})

ipcMain.on(ON_PROXY_SUCCESS, () => {
	proxy.ok = true
})

ipcMain.on(ON_PROXY_FAILED, () => {
	proxy.ok = false
})