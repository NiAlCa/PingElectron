const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  receivePing: (callback) => ipcRenderer.on("ping-reply", callback),
  pingHost: (host) => ipcRenderer.send("ping-host", host),
  saveConfiguration: (config) => ipcRenderer.send("save-configuration", config),
  getConfiguration: () => ipcRenderer.invoke("get-configuration"),
});
