import { app, BrowserWindow, ipcMain } from 'electron'
import { ON_NEED_PROXY, ON_PROXY_AUTH, AuthenticationCredentials } from './components/ProxySettingForm'

let win: BrowserWindow
let proxy: AuthenticationCredentials

const createWindow = () => {
	win = new BrowserWindow({width: 800, height: 600})
	win.loadFile('dist/index.html')
	win.on('closed', () => {
		win = null
	})
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
		webContents.send(ON_NEED_PROXY)
		event.preventDefault()
		callback(proxy.username, proxy.password)
	}
})

ipcMain.on(ON_PROXY_AUTH, (event: any, arg: AuthenticationCredentials) => {
	proxy = arg
})
