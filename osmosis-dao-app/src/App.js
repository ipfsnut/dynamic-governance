// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react';
import Header from './components/Header';
import GlobalDAO from './components/GlobalDAO';
import GranularDAO from './components/GranularDAO';
import Dashboard from './pages/Dashboard';
import './App.css'; // We'll update this next

function App() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.REACT_APP_DYNAMIC_ENVIRONMENT_ID,
        // other settings...
      }}
    >
      <Router>
        <div className="app">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/global/*" element={<GlobalDAO />} />
              <Route path="/granular/*" element={<GranularDAO />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DynamicContextProvider>
  );
}

export default App;
