import React, { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react';
import './Delegation.css';

function Delegation() {
  const { user } = useDynamicContext();
  const [delegations, setDelegations] = useState([]);
  const [newDelegation, setNewDelegation] = useState({ to: '', amount: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchDelegations();
    }
  }, [user]);

  const fetchDelegations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://r4ml53lz-3000.usw3.devtunnels.ms/api/delegations/${user.walletAddress}`);
      if (!response.ok) {
        throw new Error('Failed to fetch delegations');
      }
      const data = await response.json();
      setDelegations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelegate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://r4ml53lz-3000.usw3.devtunnels.ms/api/delegations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: user.walletAddress,
          ...newDelegation
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create delegation');
      }
      const data = await response.json();
      console.log('New delegation created:', data);
      setNewDelegation({ to: '', amount: '' });
      fetchDelegations();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) {
    return <div>Please connect your wallet to view delegation information.</div>;
  }

  if (isLoading) return <div>Loading delegation information...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="delegation-container">
      <h2>Delegation</h2>
      <form onSubmit={handleDelegate} className="delegation-form">
        <input
          type="text"
          value={newDelegation.to}
          onChange={(e) => setNewDelegation({ ...newDelegation, to: e.target.value })}
          placeholder="Delegate to (address)"
          required
        />
        <input
          type="number"
          value={newDelegation.amount}
          onChange={(e) => setNewDelegation({ ...newDelegation, amount: e.target.value })}
          placeholder="Amount"
          required
        />
        <button type="submit">Delegate</button>
      </form>
      <h3>Your Delegations</h3>
      <ul className="delegations-list">
        {delegations.map(delegation => (
          <li key={delegation._id}>
            To: {delegation.to}, Amount: {delegation.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Delegation;
