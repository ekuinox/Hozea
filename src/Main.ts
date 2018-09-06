import { app, BrowserWindow, ipcMain } from 'electron'

let win: BrowserWindow
let proxy = {
	username: "",
	password: ""
}


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
		webContents.send('need-proxy')
		event.preventDefault()
		callback(proxy.username, proxy.password)
	}
})

ipcMain.on('proxy-auth', (event: any, arg: any) => {
	proxy = arg.proxy
})