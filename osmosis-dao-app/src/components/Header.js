import React from 'react';
import { Link } from 'react-router-dom';
import { useDynamicContext } from '@dynamic-labs/sdk-react';

function Header() {
  const dynamicContext = useDynamicContext();
  
  console.log('Dynamic Context:', dynamicContext);

  const { user, handleLogOut, showAuthFlow } = dynamicContext || {};

  const handleConnect = () => {
    console.log('Connect clicked');
    if (typeof showAuthFlow === 'function') {
      showAuthFlow();
    } else if (dynamicContext && typeof dynamicContext.setShowAuthFlow === 'function') {
      dynamicContext.setShowAuthFlow(true);
    } else {
      console.error('No method available to show auth flow');
    }
  };

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
          <span>{user.wallet?.address}</span>
          <button onClick={handleLogOut}>Disconnect</button>
        </div>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </header>
  );
}

export default Header;