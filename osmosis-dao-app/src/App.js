import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react';
import { ErrorBoundary } from 'react-error-boundary';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Proposals from './pages/Proposals';

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <DynamicContextProvider
        settings={{
          environmentId: process.env.REACT_APP_DYNAMIC_ENVIRONMENT_ID,
        }}
      >
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
    </ErrorBoundary>
  );
}

export default App;