import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GlobalDAO from './components/GlobalDAO';
import GranularDAO from './components/GranularDAO';
import Dashboard from './pages/Dashboard';
import WebSocketClient from './utils/WebSocketClient';

function App() {
  useEffect(() => {
    const wsClient = new WebSocketClient('wss://r4ml53lz-3000.usw3.devtunnels.ms');
    wsClient.connect();

    return () => {
      // Cleanup WebSocket connection on component unmount
      wsClient.disconnect();
    };
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/global">Global DAO</Link></li>
            <li><Link to="/granular">Granular DAO</Link></li>
            <li><Link to="/dashboard">User Dashboard</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/global/*" element={<GlobalDAO />} />
          <Route path="/granular/*" element={<GranularDAO />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
