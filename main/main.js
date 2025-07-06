const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { SerialPort } = require('serialport');

let currentPort = null;

// ✅ List available COM ports
ipcMain.handle('get-com-ports', async () => {
  try {
    const ports = await SerialPort.list();
    console.log("Available ports:", ports.map(p => p.path));
    return ports.map(p => p.path);
  } catch (err) {
    console.error('Error listing COM ports:', err);
    return [];
  }
});

// ✅ Connect to selected port
ipcMain.on('connect-port', (event, config) => {
  if (currentPort && currentPort.isOpen) {
    currentPort.close((err) => {
      if (err) console.error('Error closing previous port:', err.message);
    });
  }

  currentPort = new SerialPort({
    path: config.port,
    baudRate: parseInt(config.baudRate),
    dataBits: parseInt(config.dataBits),
    stopBits: parseFloat(config.stopBits),
    parity: config.parity,
    autoOpen: false,
  });

  currentPort.open((err) => {
    if (err) {
      console.error(`Error opening serial port (${config.port}):`, err.message);
      event.sender.send('port-connect-failed', config.port);
    } else {
      console.log(`✅ Connected to ${config.port}`);
      event.sender.send('port-connected', config.port); // 🔁 Notify renderer
    }
  });
});

// ✅ Send command to serial port
ipcMain.on('send-command', (event, commandText) => {
  if (!currentPort || !currentPort.isOpen) {
    console.warn('⚠️ Serial port not connected');
    return;
  }

  currentPort.write(commandText + '\n', (err) => {
    if (err) {
      console.error('❌ Failed to write to serial port:', err.message);
    } else {
      console.log('📤 Command sent:', commandText);
    }
  });
});

// ✅ Handle EXIT APP request
ipcMain.on('exit-app', () => {
  console.log('🛑 Exit command received from UI');
  if (currentPort && currentPort.isOpen) {
    currentPort.close((err) => {
      if (err) {
        console.error('Error closing port during exit:', err.message);
      }
      app.quit();
    });
  } else {
    app.quit();
  }
});

// ✅ Create browser window
// function createWindow() {
//   win.webContents.openDevTools();

//   const win = new BrowserWindow({
//     width: 800,
//     height: 700,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js'),
//     },
//   });

//   if (!app.isPackaged) {
//     win.loadURL('http://localhost:5173');
//   } else {
//     win.loadFile(path.join(__dirname, '../dist/index.html'));
//   }
// }

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (!app.isPackaged) {
    win.loadURL('http://127.0.0.1:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Optional: Catch load failure
  win.webContents.on('did-fail-load', (_e, _c, msg) => {
    console.error('❌ Load failed:', msg);
  });
}


app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (currentPort && currentPort.isOpen) {
      currentPort.close(() => app.quit());
    } else {
      app.quit();
    }
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
