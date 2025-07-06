const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getComPorts: () => ipcRenderer.invoke('get-com-ports'),
  connectPort: (config) => ipcRenderer.send('connect-port', config),
  sendCommand: (text) => ipcRenderer.send('send-command', text),
  exitApp: () => ipcRenderer.send('exit-app'),
  onPortConnected: (callback) => ipcRenderer.on('port-connected', (_event, port) => callback(port)),
});
