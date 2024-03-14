const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { pingHost, pingEmitter } = require("./ping");
const Store = require("electron-store");
const store = new Store();

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.on("closed", () => {
    win = null;
  });

  win.webContents.on("did-finish-load", () => {
    win.webContents.send("ping-reply", "Test message from main process");
  });

  win.loadFile("index.html");

  pingEmitter.on("ping", (data) => {
    if (win) {
      win.webContents.send("ping-reply", data);
    }
  });

  pingEmitter.on("error", (data) => {
    if (win) {
      win.webContents.send("ping-reply", "Error: " + data);
    }
  });
}

ipcMain.on("ping-host", (event, host) => {
  pingHost(host);
});

ipcMain.on("save-configuration", (event, config) => {
  store.set("pingConfiguration", config);
});

ipcMain.handle("get-configuration", () => {
  return store.get("pingConfiguration");
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
