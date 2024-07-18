import React, { useState, useEffect } from 'react';
import { fetchDAOConfig, fetchProposals, fetchTreasury, fetchMembers } from '../services/daoService';
import './GlobalDAO.css';

function GlobalDAO() {
  const [activeSegment, setActiveSegment] = useState('overview');
  const [daoConfig, setDaoConfig] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [treasury, setTreasury] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [configData, proposalsData] = await Promise.all([
          fetchDAOConfig(),
          fetchProposals()
        ]);
        setDaoConfig(configData);
        setProposals(proposalsData);

        // Attempt to fetch treasury and members data, but don't fail if they're not available
        try {
          const treasuryData = await fetchTreasury();
          setTreasury(treasuryData);
        } catch (err) {
          console.warn('Treasury data not available:', err);
        }

        try {
          const membersData = await fetchMembers();
          setMembers(membersData);
        } catch (err) {
          console.warn('Members data not available:', err);
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching DAO data:', err);
        setError('Failed to fetch DAO data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            {/* Add more fields as needed */}
          </div>
        );
      case 'proposals':
        return (
          <div className="proposals">
            <h3>Proposals</h3>
            {proposals.length > 0 ? (
              <ul>
                {proposals.map((proposal, index) => (
                  <li key={proposal.id || index}>
                    <h4>{proposal.title || `Proposal ${index + 1}`}</h4>
                    <p><strong>Status:</strong> {proposal.status}</p>
                    <p><strong>Description:</strong> {proposal.description}</p>
                    {/* Add more proposal details as needed */}
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
            {/* Implement treasury display logic here */}
            <p>Treasury balance: {treasury ? treasury.balance : 'N/A'}</p>
            {/* Add more treasury details as needed */}
          </div>
        );
      case 'members':
        return (
          <div className="members">
            <h3>Members</h3>
            {members.length > 0 ? (
              <ul>
                {members.map((member, index) => (
                  <li key={member.id || index}>
                    <p><strong>Address:</strong> {member.address}</p>
                    <p><strong>Voting Power:</strong> {member.votingPower}</p>
                    {/* Add more member details as needed */}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No members found.</p>
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
        <button onClick={() => setActiveSegment('proposals')} className={activeSegment === 'proposals' ? 'active' : ''}>Proposals</button>
        <button onClick={() => setActiveSegment('treasury')} className={activeSegment === 'treasury' ? 'active' : ''}>Treasury</button>
        <button onClick={() => setActiveSegment('members')} className={activeSegment === 'members' ? 'active' : ''}>Members</button>
      </div>
      {renderSegment()}
    </div>
  );
}

export default GlobalDAO;