import React, { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react';
import './GlobalVoting.css';

function GlobalVoting() {
  const { user } = useDynamicContext();
  const [activeProposals, setActiveProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActiveProposals();
  }, []);

  const fetchActiveProposals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://r4ml53lz-3000.usw3.devtunnels.ms/api/proposals/active');
      if (!response.ok) {
        throw new Error('Failed to fetch active proposals');
      }
      const data = await response.json();
      setActiveProposals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (proposalId, vote) => {
    if (!user) {
      alert('Please connect your wallet to vote.');
      return;
    }

    try {
      const response = await fetch('https://r4ml53lz-3000.usw3.devtunnels.ms/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voter: user.walletAddress,
          proposalId,
          vote,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      const data = await response.json();
      console.log('Vote submitted:', data);
      // Optionally, update the UI or refetch proposals here
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Failed to submit vote. Please try again.');
    }
  };

  if (isLoading) return <div>Loading active proposals...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="global-voting-container">
      <h2>Active Proposals for Voting</h2>
      {activeProposals.length === 0 ? (
        <p>No active proposals available for voting.</p>
      ) : (
        <ul className="active-proposals-list">
          {activeProposals.map((proposal) => (
            <li key={proposal._id} className="active-proposal-item">
              <h3>{proposal.title}</h3>
              <p>{proposal.description}</p>
              <div className="proposal-voting">
                <button onClick={() => handleVote(proposal._id, 'yes')}>Vote Yes</button>
                <button onClick={() => handleVote(proposal._id, 'no')}>Vote No</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GlobalVoting;
