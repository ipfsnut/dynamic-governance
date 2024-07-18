import React, { useState, useEffect } from 'react';
import { fetchDAOConfig, fetchProposals } from '../services/daoService';

function GlobalDAO() {
  const [daoConfig, setDaoConfig] = useState(null);
  const [proposals, setProposals] = useState([]);
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

  return (
    <div className="global-dao">
      <h2>PageDAO</h2>
      {daoConfig && (
        <div className="dao-config">
          <h3>DAO Configuration</h3>
          <p><strong>Name:</strong> {daoConfig.name}</p>
          <p><strong>Description:</strong> {daoConfig.description}</p>
          <p><strong>Image URL:</strong> {daoConfig.image_url}</p>
          <p><strong>Automatically add CW20s:</strong> {daoConfig.automatically_add_cw20s ? 'Yes' : 'No'}</p>
          <p><strong>Automatically add CW721s:</strong> {daoConfig.automatically_add_cw721s ? 'Yes' : 'No'}</p>
          {/* Add more fields as needed */}
        </div>
      )}
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
    </div>
  );
}

export default GlobalDAO;