import React, { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react';

function Dashboard() {
  const [daoData, setDaoData] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [votingPower, setVotingPower] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useDynamicContext();

  useEffect(() => {
    async function fetchData() {
      console.log("Fetching data...");
      try {
        // Fetch main DAO data
        console.log("Fetching main DAO data");
        const daoResponse = await fetch('/api/dao-data');
        if (!daoResponse.ok) throw new Error(`HTTP error! status: ${daoResponse.status}`);
        const daoData = await daoResponse.json();
        console.log("Received DAO data:", daoData);
        setDaoData(daoData);

        // Fetch proposals
        console.log("Fetching proposals");
        const proposalsResponse = await fetch('/api/proposals');
        if (!proposalsResponse.ok) throw new Error(`HTTP error! status: ${proposalsResponse.status}`);
        const proposalsData = await proposalsResponse.json();
        console.log("Received proposals:", proposalsData);
        setProposals(proposalsData);

        // Fetch voting power if user is connected
        if (user?.walletAddress) {
          console.log("Fetching voting power");
          const votingPowerResponse = await fetch(`/api/voting-power?address=${user.walletAddress}&daoId=${daoData.addr}`);
          if (!votingPowerResponse.ok) throw new Error(`HTTP error! status: ${votingPowerResponse.status}`);
          const votingPowerData = await votingPowerResponse.json();
          console.log("Received voting power:", votingPowerData);
          setVotingPower(votingPowerData.votingPower);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    }

    fetchData();
  }, [user]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!daoData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>PageDAO Dashboard</h1>
      <h2>DAO Information</h2>
      <ul>
        <li>DAO Name: {daoData.name || 'PageDAO'}</li>
        <li>Staking Contract: {daoData.stakingContract}</li>
        <li>Reward Token: {daoData.rewardToken?.denom}</li>
        <li>Reward Duration: {daoData.rewardDuration} seconds</li>
        <li>Total Sub-DAOs: {daoData.subDAOs ? daoData.subDAOs.length : 'N/A'}</li>
        <li>Total Proposals: {proposals.length}</li>
        <li>Creation Date: {daoData.creationDate || 'N/A'}</li>
      </ul>

      <h2>Sub-DAOs</h2>
      {daoData.subDAOs && daoData.subDAOs.length > 0 ? (
        <ul>
          {daoData.subDAOs.map((subDao, index) => (
            <li key={index}>{subDao.addr}</li>
          ))}
        </ul>
      ) : (
        <p>No Sub-DAOs available</p>
      )}

      <h2>Proposals</h2>
      {proposals.length > 0 ? (
        <ul>
          {proposals.map((proposal, index) => (
            <li key={index}>{proposal.title}</li>
          ))}
        </ul>
      ) : (
        <p>No proposals available</p>
      )}

      {user && (
        <div>
          <h2>Your Information</h2>
          <p>Wallet Address: {user.walletAddress}</p>
          <p>Voting Power: {votingPower || 'Loading...'}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;