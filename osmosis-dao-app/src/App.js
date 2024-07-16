import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Proposals from './pages/Proposals';

function App() {
  return (
    <DynamicContextProvider settings={{
      environmentId: "YOUR_DYNAMIC_ENVIRONMENT_ID",
    }}>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/proposals" element={<Proposals />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </DynamicContextProvider>
  );
}

export default App;