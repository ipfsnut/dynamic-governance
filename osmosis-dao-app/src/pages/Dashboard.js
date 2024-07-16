import React, { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react';
import { getDaoInfo, getStakedBalance, getPendingRewards } from '../services/osmosisService';

function Dashboard() {
  const [daoInfo, setDaoInfo] = useState(null);
  const [stakedBalance, setStakedBalance] = useState(null);
  const [pendingRewards, setPendingRewards] = useState(null);
  const { user } = useDynamicContext();

  useEffect(() => {
    async function fetchDaoInfo() {
      try {
        const info = await getDaoInfo();
        setDaoInfo(info);
      } catch (error) {
        console.error("Error fetching DAO info:", error);
      }
    }

    fetchDaoInfo();
  }, []);

  useEffect(() => {
    async function fetchUserInfo() {
      if (user && user.walletAddress) {
        try {
          const balance = await getStakedBalance(user.walletAddress);
          setStakedBalance(balance);

          const rewards = await getPendingRewards(user.walletAddress);
          setPendingRewards(rewards);
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    }

    fetchUserInfo();
  }, [user]);

  if (!daoInfo) {
    return <div>Loading DAO information...</div>;
  }

  return (
    <div>
      <h1>PageDAO Dashboard</h1>
      <h2>DAO Information</h2>
      <p>Staking Contract: {daoInfo.config.staking_contract}</p>
      <p>Reward Token: {daoInfo.config.reward_token.denom}</p>
      <p>Reward Duration: {daoInfo.config.reward_duration} seconds</p>

      {user ? (
        <div>
          <h2>Your Information</h2>
          <p>Wallet Address: {user.walletAddress}</p>
          <p>Staked Balance: {stakedBalance || 'Loading...'}</p>
          <p>Pending Rewards: {pendingRewards || 'Loading...'}</p>
        </div>
      ) : (
        <p>Connect your wallet to view your staking information.</p>
      )}
    </div>
  );
}

export default Dashboard;