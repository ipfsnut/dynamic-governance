// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { DynamicWidget } from '@dynamic-labs/sdk-react';
import './Header.css'; // We'll create this CSS file next

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <nav>
          <ul>
            <li><Link to="/global">Global DAO</Link></li>
            <li><Link to="/granular">Granular DAO</Link></li>
            <li><Link to="/dashboard">User Dashboard</Link></li>
          </ul>
        </nav>
        <DynamicWidget />
      </div>
    </header>
  );
};

export default Header;
