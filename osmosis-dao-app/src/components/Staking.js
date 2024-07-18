import React, { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react';
import './Staking.css';

function Staking() {
  const { user } = useDynamicContext();
  const [stakedBalance, setStakedBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchStakedBalance();
    }
  }, [user]);

  const fetchStakedBalance = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://r4ml53lz-3000.usw3.devtunnels.ms/api/staking/${user.walletAddress}`);
      if (!response.ok) {
        throw new Error('Failed to fetch staked balance');
      }
      const data = await response.json();
      setStakedBalance(data.stakedBalance);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>Please connect your wallet to view staking information.</div>;
  }

  if (isLoading) return <div>Loading staking information...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="staking-container">
      <h2>Staking</h2>
      <p>Your staked balance: {stakedBalance} OSMO</p>
      {/* Add staking/unstaking functionality here */}
    </div>
  );
}

export default Staking;
