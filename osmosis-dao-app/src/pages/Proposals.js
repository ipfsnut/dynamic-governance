import React, { useState, useEffect } from 'react';
import { fetchProposals } from '../services/api';

function Proposals() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProposals = async () => {
      try {
        setLoading(true);
        const data = await fetchProposals();
        setProposals(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching proposals:', err);
        setError('Failed to fetch proposals. Please try again later.');
        setLoading(false);
      }
    };

    loadProposals();
  }, []);

  if (loading) {
    return <div>Loading proposals...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>DAO Proposals</h1>
      {proposals.length === 0 ? (
        <p>No proposals found.</p>
      ) : (
        <ul>
          {proposals.map((proposal) => (
            <li key={proposal.id}>
              <h2>{proposal.title}</h2>
              <p>Description: {proposal.description}</p>
              <p>Status: {proposal.status}</p>
              {/* Add more proposal details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Proposals;