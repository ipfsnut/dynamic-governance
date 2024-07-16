import React from 'react';
import { Link } from 'react-router-dom';
import { useDynamicContext } from '@dynamic-labs/sdk-react';

function Header() {
  const { user, handleLogOut, showAuthFlow } = useDynamicContext();

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/proposals">Proposals</Link></li>
        </ul>
      </nav>
      {user ? (
        <div>
          <span>{user.wallet.address}</span>
          <button onClick={handleLogOut}>Disconnect</button>
        </div>
      ) : (
        <button onClick={showAuthFlow}>Connect Wallet</button>
      )}
    </header>
  );
}

export default Header;