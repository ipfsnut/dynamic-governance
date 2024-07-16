import React, { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react';

function Dashboard() {
  // State variables to store fetched data
  const [daoData, setDaoData] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [votingPower, setVotingPower] = useState(null);
  const [proposalModules, setProposalModules] = useState([]);
  const [votingModule, setVotingModule] = useState(null);
  const [pauseInfo, setPauseInfo] = useState(null);
  const [error, setError] = useState(null);

  // Get the user object from the DynamicContext
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

        // Fetch proposal modules
        console.log("Fetching proposal modules");
        const modulesResponse = await fetch('/api/dao/proposal-modules');
        if (!modulesResponse.ok) throw new Error(`HTTP error! status: ${modulesResponse.status}`);
        const modulesData = await modulesResponse.json();
        console.log("Received proposal modules:", modulesData);
        setProposalModules(modulesData);

        // Fetch voting module
        console.log("Fetching voting module");
        const votingResponse = await fetch('/api/dao/voting-module');
        if (!votingResponse.ok) throw new Error(`HTTP error! status: ${votingResponse.status}`);
        const votingData = await votingResponse.json();
        console.log("Received voting module:", votingData);
        setVotingModule(votingData);

        // Fetch pause info
        console.log("Fetching pause info");
        const pauseResponse = await fetch('/api/dao/pause-info');
        if (!pauseResponse.ok) throw new Error(`HTTP error! status: ${pauseResponse.status}`);
        const pauseData = await pauseResponse.json();
        console.log("Received pause info:", pauseData);
        setPauseInfo(pauseData);

        // Fetch voting power if user is connected
        if (user?.walletAddress) {
          console.log("Fetching voting power");
          const votingPowerResponse = await fetch(`/api/voting-power?address=${user.walletAddress}&daoId=${daoData.addr}`);
          if (!votingPowerResponse.ok) throw new Error(`HTTP error! status: ${votingPowerResponse.status}`);
          const votingPowerData = await votingPowerResponse.json();
          console.log("Received voting power:", votingPowerData);
          setVotingPower(votingPowerData.votingPower);
        }

        // Fetch other available queries (commented out)
        // const listProposalModulesResponse = await fetch('/api/list_proposal_modules');
        // const adminResponse = await fetch('/api/admin');
        // const adminNominationResponse = await fetch('/api/admin_nomination');
        // const configResponse = await fetch('/api/config');
        // const cw20BalancesResponse = await fetch('/api/cw20_balances');
        // const cw20TokenListResponse = await fetch('/api/cw20_token_list');
        // const cw721TokenListResponse = await fetch('/api/cw721_token_list');
        // const dumpStateResponse = await fetch('/api/dump_state');
        // const getItemResponse = await fetch('/api/get_item');
        // const listItemsResponse = await fetch('/api/list_items');
        // const infoResponse = await fetch('/api/info');
        // const activeProposalModulesResponse = await fetch('/api/active_proposal_modules');
        // const proposalModuleCountResponse = await fetch('/api/proposal_module_count');
        // const listSubDaosResponse = await fetch('/api/list_sub_daos');
        // const daoUriResponse = await fetch('/api/dao_u_r_i');
        // const votingPowerAtHeightResponse = await fetch('/api/voting_power_at_height');
        // const totalPowerAtHeightResponse = await fetch('/api/total_power_at_height');
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    }

    // Call the fetchData function when the component mounts or when the user object changes
    fetchData();
  }, [user]);

  // If there's an error, display the error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If the DAO data hasn't been fetched yet, display a loading message
  if (!daoData) {
    return <div>Loading...</div>;
  }

  // Render the Dashboard component
  return (
    <div>
      <h1>PageDAO Dashboard</h1>
      <h2>DAO Information</h2>
      <ul>
        <li>DAO Name: {daoData.name || 'PageDAO'}</li>
        <li>DAO Address: {daoData.addr || 'N/A'}</li>
        <li>Total Proposals: {proposals.length}</li>
        <li>Creation Date: {daoData.creationDate || 'N/A'}</li>
      </ul>

      <h2>Proposal Modules</h2>
      {proposalModules.length > 0 ? (
        <ul>
          {proposalModules.map((module, index) => (
            <li key={index}>{module.address}: {module.prefix}</li>
          ))}
        </ul>
      ) : (
        <p>No proposal modules available</p>
      )}

      <h2>Voting Module</h2>
      <p>Address: {votingModule?.address || 'N/A'}</p>

      <h2>DAO Status</h2>
      <p>Paused: {pauseInfo?.paused ? 'Yes' : 'No'}</p>
      {pauseInfo?.paused && <p>Expiration: {pauseInfo.expiration}</p>}

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
