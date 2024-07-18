import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { DynamicWidget, DynamicContextProvider } from '@dynamic-labs/sdk-react';
import GlobalDAO from './components/GlobalDAO';
import GranularDAO from './components/GranularDAO';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <DynamicContextProvider settings={{ environmentId: 'REACT_APP_DYNAMIC_ENVIRONMENT_ID' }}>
      <Router>
        <div>
          <header>
            <nav>
              <ul>
                <li><Link to="/global">Global DAO</Link></li>
                <li><Link to="/granular">Granular DAO</Link></li>
                <li><Link to="/dashboard">User Dashboard</Link></li>
              </ul>
            </nav>
            <DynamicWidget />
          </header>

          <Routes>
            <Route path="/global/*" element={<GlobalDAO />} />
            <Route path="/granular/*" element={<GranularDAO />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </DynamicContextProvider>
  );
}

export default App;