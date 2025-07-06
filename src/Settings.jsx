import React from 'react';

function Settings({ config, setConfig }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Serial Configuration</h2>

      <label style={styles.label}>Baud Rate:</label>
      <input
        type="number"
        value={config.baudRate}
        onChange={e => setConfig(p => ({ ...p, baudRate: e.target.value }))}
        style={styles.input}
      />

      <label style={styles.label}>Data Bits:</label>
      <select
        value={config.dataBits}
        onChange={e => setConfig(p => ({ ...p, dataBits: e.target.value }))}
        style={styles.select}
      >
        {[5, 6, 7, 8].map(val => <option key={val}>{val}</option>)}
      </select>

      <label style={styles.label}>Stop Bits:</label>
      <select
        value={config.stopBits}
        onChange={e => setConfig(p => ({ ...p, stopBits: e.target.value }))}
        style={styles.select}
      >
        {[1, 1.5, 2].map(val => <option key={val}>{val}</option>)}
      </select>

      <label style={styles.label}>Parity:</label>
      <select
        value={config.parity}
        onChange={e => setConfig(p => ({ ...p, parity: e.target.value }))}
        style={styles.select}
      >
        {['none', 'even', 'odd', 'mark', 'space'].map(val => <option key={val}>{val}</option>)}
      </select>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, sans-serif',
    maxWidth: 500,
    margin: 'auto',
    padding: '40px 20px',
    fontSize: 16,
    color: '#333',
  },
  heading: {
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    marginTop: 12,
    display: 'block',
  },
  select: {
    width: '100%',
    padding: 8,
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 8,
    fontSize: 15,
    marginBottom: 10,
  },
};

export default Settings;
