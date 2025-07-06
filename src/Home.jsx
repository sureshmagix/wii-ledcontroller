import React, { useEffect, useState } from 'react';
import logo from '../src/assets/wiitronics_logo.png';

function Home({ config, setConfig }) {
  const [ports, setPorts] = useState([]);
  const [command, setCommand] = useState('');

  useEffect(() => {
    scanPorts();

    // Listen for confirmation of successful connection
    window.electronAPI.onPortConnected((port) => {
      console.log(`✅ Port connected: ${port}`);
      setConfig(prev => ({ ...prev, isConnected: true, port }));
    });
  }, []);

  const scanPorts = async () => {
    try {
      const list = await window.electronAPI.getComPorts();
      console.log('🔍 Scanned Ports:', list);
      setPorts(list);

      if (!list.includes(config.port)) {
        const fallback = list[0] || '';
        setConfig(prev => ({ ...prev, port: fallback }));
      }
    } catch (err) {
      console.error('❌ Failed to scan ports:', err);
    }
  };

  const handlePortChange = (e) => {
    const port = e.target.value;
    console.log('🎯 Port selected:', port);
    setConfig(prev => ({ ...prev, port }));
  };

  const handleConnect = () => {
    if (!config.port) {
      alert('Please select a port');
      return;
    }

    const connectionConfig = {
      port: config.port,
      baudRate: config.baudRate,
      dataBits: config.dataBits,
      stopBits: config.stopBits,
      parity: config.parity,
    };

    console.log('🔌 Connecting with config:', connectionConfig);
    window.electronAPI.connectPort(connectionConfig);
  };

  const handleSend = () => {
    if (!config.isConnected || !config.port) {
      alert('Connect to serial port before sending commands');
      return;
    }
    if (!command.trim()) {
      alert('Please enter a command');
      return;
    }

    console.log(`📤 Sending command to ${config.port}:`, command.trim());
    window.electronAPI.sendCommand(command.trim());
  };

  const handleExit = () => {
    window.electronAPI.exitApp();
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="Logo" style={styles.logo} />
      <h2 style={styles.heading}>DISPLAY CONTROLLER</h2>

      <div style={styles.row}>
        <select
          value={config.port || ''}
          onChange={handlePortChange}
          style={styles.select}
        >
          <option value="">-- Select Port --</option>
          {ports.map((p, i) => (
            <option key={i} value={p}>{p}</option>
          ))}
        </select>

        <button onClick={scanPorts} style={styles.smallButton}>Scan Ports</button>
        <button onClick={handleConnect} style={styles.smallButton}>
          {config.isConnected ? 'Connected' : 'Connect'}
        </button>
      </div>

      <input
        style={styles.input}
        placeholder="e.g. TEXT 0 0 255 0 0 HELLO"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
      />

      <div style={styles.buttonRow}>
        <button onClick={handleSend} style={styles.sendButton}>Send Command</button>
        <button onClick={handleExit} style={styles.exitButton}>EXIT APP</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    maxWidth: 700,
    margin: 'auto',
    padding: '40px 20px',
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  logo: {
    width: 180,
    marginBottom: 20,
  },
  heading: {
    marginBottom: 20,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  select: {
    padding: 8,
    fontSize: 15,
    minWidth: 150,
  },
  smallButton: {
    padding: '8px 12px',
    fontSize: 15,
    cursor: 'pointer',
  },
  input: {
    padding: 10,
    fontSize: 16,
    width: '100%',
    marginBottom: 20,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
  },
  sendButton: {
    padding: '10px 20px',
    fontSize: 16,
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  exitButton: {
    padding: '10px 20px',
    fontSize: 16,
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
};

export default Home;
