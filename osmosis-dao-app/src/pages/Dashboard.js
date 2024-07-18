import React, { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react';

function Dashboard() {
  const { user } = useDynamicContext();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3001/api/users/${user.walletAddress}`)
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [user]);

  if (!user) {
    return <div>Please connect your wallet to view the dashboard.</div>;
  }

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Address: {userData.address}</p>
      <p>Voting Power: {userData.votingPower}</p>
      <h2>Your Votes</h2>
      <ul>
        {userData.votes.map(vote => (
          <li key={vote._id}>
            Proposal: {vote.proposalId}, Vote: {vote.vote}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
