const { app, BrowserWindow } = require('electron')
let win

function createWindow () {
	win = new BrowserWindow({width: 800, height: 600})
	// ルートから見たファイルパスを指定
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