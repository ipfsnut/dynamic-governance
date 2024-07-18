import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [userStake, setUserStake] = useState(null);
  const [userXP, setUserXP] = useState(null);
  const [userRewards, setUserRewards] = useState(null);
  const [userVotingPower, setUserVotingPower] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://r4ml53lz-3000.usw3.devtunnels.ms/api/dashboard');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserStake(data.stake);
        setUserXP(data.xp);
        setUserRewards(data.rewards);
        setUserVotingPower(data.votingPower);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!userStake || !userXP || !userRewards || !userVotingPower) {
    return <div>Loading dashboard data...</div>;
  }

  return (
    <div>
      <h2>User Dashboard</h2>
      <div>
        <h3>Staking Overview</h3>
        <p>Total Stake: {userStake}</p>
      </div>
      <div>
        <h3>XP Level</h3>
        <p>Current XP: {userXP}</p>
      </div>
      <div>
        <h3>Rewards</h3>
        <p>Available Rewards: {userRewards}</p>
      </div>
      <div>
        <h3>Voting Power</h3>
        <p>Current Voting Power: {userVotingPower}</p>
      </div>
    </div>
  );
};


export default Dashboard;
