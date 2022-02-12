const { app, BrowserWindow, globalShortcut } = require('electron')
const path = require('path')
const config = require('./config')
let win;

function createWindow () {
    win = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true,
    icon: __dirname + "/assets/webview.png",
    webPreferences: {
      nodeIntegration:true
    }
  })
  

  win.loadURL(config.url)
}

function toggleDevTools(){
  win.webContents.toggleDevTools()
}

function createShortcuts(){
  globalShortcut.register('CmdOrCtrl + k', toggleDevTools)
}

//app.whenReady().then(createWindow)


app.whenReady().then(() => {
  createWindow(), createShortcuts()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {''
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

