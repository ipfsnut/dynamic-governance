import React, { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react';
import './Proposals.css';


function Proposals() {
  const { user } = useDynamicContext();
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://r4ml53lz-3000.usw3.devtunnels.ms/api/proposals');
      if (!response.ok) {
        throw new Error('Failed to fetch proposals');
      }
      const data = await response.json();
      // Sort proposals by date, newest first
      const sortedProposals = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProposals(sortedProposals);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) return <div>Loading proposals...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="proposals-container">
      <h2>All Proposals</h2>
      {proposals.length === 0 ? (
        <p>No proposals found.</p>
      ) : (
        <ul className="proposals-list">
          {proposals.map((proposal) => (
            <li key={proposal._id} className="proposal-item">
              <h3>{proposal.title}</h3>
              <p>{proposal.description}</p>
              <div className="proposal-details">
                <span>Status: {proposal.status}</span>
                <span>Created: {formatDate(proposal.createdAt)}</span>
                {proposal.endDate && <span>Ends: {formatDate(proposal.endDate)}</span>}
              </div>
              {user && (
                <div className="proposal-actions">
                  <button onClick={() => console.log('Vote Yes')}>Vote Yes</button>
                  <button onClick={() => console.log('Vote No')}>Vote No</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Proposals;
