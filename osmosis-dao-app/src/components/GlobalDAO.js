import React, { useState, useEffect } from 'react';
import { fetchDAOConfig, fetchProposals, fetchTreasury, fetchMembers } from '../services/daoService';
import { useDynamicService } from './dynamicService';
import DelegationManager from './DelegationManager';
import './GlobalDAO.css';

function GlobalDAO() {
  const [activeSegment, setActiveSegment] = useState('overview');
  const [daoConfig, setDaoConfig] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [treasury, setTreasury] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, recordVote, showAuthFlow } = useDynamicService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [configData, proposalsData, treasuryData, membersData] = await Promise.all([
          fetchDAOConfig(),
          fetchProposals(),
          fetchTreasury(),
          fetchMembers()
        ]);

        setDaoConfig(configData);
        setProposals(proposalsData);
        setTreasury(treasuryData);
        setMembers(membersData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching DAO data:', err);
        setError('Failed to fetch DAO data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleVote = async (proposalId, vote) => {
    try {
      if (!user) {
        showAuthFlow();
        return;
      }

      await recordVote(proposalId, vote);
      console.log(`Vote ${vote} on proposal ${proposalId} recorded`);

      const updatedProposals = await fetchProposals();
      setProposals(updatedProposals);
    } catch (error) {
      console.error('Error recording vote:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderSegment = () => {
    switch (activeSegment) {
      case 'overview':
        return (
          <div className="dao-config">
            <h3>DAO Configuration</h3>
            <p><strong>Name:</strong> {daoConfig.name}</p>
            <p><strong>Description:</strong> {daoConfig.description}</p>
            <p><strong>Image URL:</strong> {daoConfig.image_url}</p>
          </div>
        );
      case 'proposals':
        return (
          <div className="proposals">
            <h3>Proposals and Voting</h3>
            {proposals.length > 0 ? (
              <ul>
                {proposals.map((proposal) => (
                  <li key={proposal.id}>
                    <h4>{proposal.title}</h4>
                    <p><strong>Status:</strong> {proposal.status}</p>
                    <p><strong>Description:</strong> {proposal.description}</p>
                    {proposal.status === 'active' && (
                      <div className="voting-buttons">
                        <button onClick={() => handleVote(proposal.id, 'yes')}>Vote Yes</button>
                        <button onClick={() => handleVote(proposal.id, 'no')}>Vote No</button>
                        <button onClick={() => handleVote(proposal.id, 'abstain')}>Abstain</button>
                      </div>
                    )}
                    {proposal.results && (
                      <div className="voting-results">
                        <p>Yes: {proposal.results.yes}</p>
                        <p>No: {proposal.results.no}</p>
                        <p>Abstain: {proposal.results.abstain}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No proposals found.</p>
            )}
          </div>
        );
      case 'treasury':
        return (
          <div className="treasury">
            <h3>Treasury</h3>
            <p>Treasury balance: {treasury ? treasury.balance : 'N/A'}</p>
          </div>
        );
      case 'members':
        return (
          <div className="members">
            <h3>Members</h3>
            {members.length > 0 ? (
              <ul>
                {members.map((member) => (
                  <li key={member.id}>
                    <p><strong>Address:</strong> {member.address}</p>
                    <p><strong>Voting Power:</strong> {member.votingPower}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No members found.</p>
            )}
          </div>
        );
      case 'delegation':
        return (
          <div className="delegation">
            <h3>Delegation</h3>
            {user ? (
              <DelegationManager />
            ) : (
              <button onClick={showAuthFlow}>Connect Wallet to Manage Delegations</button>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="global-dao">
      <h2>PageDAO Home</h2>
      <div className="segment-selector">
        <button onClick={() => setActiveSegment('overview')} className={activeSegment === 'overview' ? 'active' : ''}>Overview</button>
        <button onClick={() => setActiveSegment('proposals')} className={activeSegment === 'proposals' ? 'active' : ''}>Proposals & Voting</button>
        <button onClick={() => setActiveSegment('treasury')} className={activeSegment === 'treasury' ? 'active' : ''}>Treasury</button>
        <button onClick={() => setActiveSegment('members')} className={activeSegment === 'members' ? 'active' : ''}>Members</button>
        <button onClick={() => setActiveSegment('delegation')} className={activeSegment === 'delegation' ? 'active' : ''}>Delegation</button>
      </div>
      {renderSegment()}
    </div>
  );
}

export default GlobalDAO;