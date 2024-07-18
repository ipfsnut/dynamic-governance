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
      <h2>Global DAO</h2>
      {daoConfig && (
        <div className="dao-config">
          <h3>DAO Configuration</h3>
          <pre>{JSON.stringify(daoConfig, null, 2)}</pre>
        </div>
      )}
      <div className="proposals">
        <h3>Proposals</h3>
        {proposals.length > 0 ? (
          <ul>
            {proposals.map((proposal, index) => (
              <li key={index}>
                <h4>{proposal.title || `Proposal ${index + 1}`}</h4>
                <p>{proposal.description}</p>
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