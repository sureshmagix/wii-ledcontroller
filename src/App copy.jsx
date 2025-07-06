import React, { useState } from 'react';
import Home from './Home';
import Settings from './Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [serialConfig, setSerialConfig] = useState({
    port: '',
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    isConnected: false,
  });

  return (
    <div style={styles.appContainer}>
      <div style={styles.menuBar}>
        <button style={styles.menuItem} onClick={() => setCurrentPage('home')}>Home</button>
        <button style={styles.menuItem} onClick={() => setCurrentPage('settings')}>Settings</button>
      </div>

      <div style={styles.pageContent}>
        {currentPage === 'home' ? (
         <Home config={serialConfig} setConfig={setSerialConfig} />
        ) : (
          <Settings config={serialConfig} setConfig={setSerialConfig} />
        )}
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  menuBar: {
    backgroundColor: '#222',
    color: '#fff',
    display: 'flex',
    padding: '10px',
    gap: '10px',
  },
  menuItem: {
    background: '#444',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  pageContent: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f5f7fa',
  },
};

export default App;
