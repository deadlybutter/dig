const {app, BrowserWindow, ipcMain} = require('electron');

let window;

function createWindow() {
  window = new BrowserWindow({width: 1280, height: 720});
  window.loadURL(`file://${__dirname}/main.html`);

  window.webContents.openDevTools();

  window.on('closed', () => {
    window = null;
  });
}

ipcMain.on('load-page', (event, arg) => {
  window.loadURL(arg);
});

app.on('ready', createWindow);

app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});
