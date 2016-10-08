const {app, BrowserWindow} = require('electron');

let window;

function createWindow() {
  window = new BrowserWindow({width: 1280, height: 720});
  window.loadURL(`file://${__dirname}/game.html`);

  window.webContents.openDevTools();

  window.on('closed', () => {
    window = null;
  });
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (window === null) {
    createWindow();
  }
});
