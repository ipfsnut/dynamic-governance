import React, { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react';

function Dashboard() {
  const { user } = useDynamicContext();
  const [proposals, setProposals] = useState([]);
  const [votes, setVotes] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const [proposalsRes, votesRes, userRes] = await Promise.all([
        fetch('https://your-backend-url.com/api/proposals'),
        fetch('https://your-backend-url.com/api/votes'),
        fetch(`https://your-backend-url.com/api/users/${user.walletAddress}`)
      ]);

      const proposalsData = await proposalsRes.json();
      const votesData = await votesRes.json();
      const userDataRes = await userRes.json();

      setProposals(proposalsData);
      setVotes(votesData);
      setUserData(userDataRes);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  if (!user) {
    return <div>Please connect your wallet to view the dashboard.</div>;
  }

  if (!userData) {
    return <div>Loading dashboard data...</div>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <div>
        <h2>User Info</h2>
        <p>Address: {userData.address}</p>
        <p>Voting Power: {userData.votingPower}</p>
      </div>
      <div>
        <h2>Proposals</h2>
        <ul>
          {proposals.map(proposal => (
            <li key={proposal.id}>{proposal.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Your Votes</h2>
        <ul>
          {votes.filter(vote => vote.voter === user.walletAddress).map(vote => (
            <li key={vote.id}>Proposal ID: {vote.proposalId}, Vote: {vote.vote}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
