import React, { useState, useEffect } from 'react';
import Home from './Home';
import Settings from './Settings';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showDrawer, setShowDrawer] = useState(false);
  const [serialConfig, setSerialConfig] = useState({
    port: '',
    baudRate: 115200,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    isConnected: false,
  });

  useEffect(() => {
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
  }, []);

  return (
    <div style={styles.appContainer}>
      <button style={styles.drawerToggle} onClick={() => setShowDrawer(!showDrawer)}>
        ☰
      </button>

      {showDrawer && (
        <aside style={styles.drawer}>
          <h2 style={styles.drawerTitle}>Serial Menu</h2>
          <nav style={styles.navMenu}>
            <button
              style={currentPage === 'home' ? styles.activeMenuItem : styles.menuItem}
              onClick={() => {
                setCurrentPage('home');
                setShowDrawer(false);
              }}
            >
              Home
            </button>
            <button
              style={currentPage === 'settings' ? styles.activeMenuItem : styles.menuItem}
              onClick={() => {
                setCurrentPage('settings');
                setShowDrawer(false);
              }}
            >
              Settings
            </button>
          </nav>
        </aside>
      )}

      <main style={styles.pageContent}>
        {currentPage === 'home' ? (
          <Home config={serialConfig} setConfig={setSerialConfig} />
        ) : (
          <Settings config={serialConfig} setConfig={setSerialConfig} />
        )}
      </main>
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    fontFamily: 'Segoe UI, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  drawerToggle: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1000,
    background: 'transparent',
    border: 'none',
    fontSize: 24,
    cursor: 'pointer',
    color: '#111',
  },
  drawer: {
    width: '200px',
    backgroundColor: '#1f2937',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    borderRight: '1px solid #ccc',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    zIndex: 999,
  },
  drawerTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  navMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  menuItem: {
    backgroundColor: 'transparent',
    color: '#cbd5e0',
    border: 'none',
    textAlign: 'left',
    padding: '10px 12px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'background 0.2s ease',
  },
  activeMenuItem: {
    backgroundColor: '#374151',
    color: '#fff',
    border: 'none',
    textAlign: 'left',
    padding: '10px 12px',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '6px',
  },
  pageContent: {
    flex: 1,
    padding: '40px',
    backgroundColor: '#f9fafb',
    overflowY: 'auto',
    width: '100%',
  },
};

export default App;
