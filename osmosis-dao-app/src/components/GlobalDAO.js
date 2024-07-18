import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

function GlobalProposals() {
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = () => {
    fetch('http://localhost:3001/api/proposals')
      .then(response => response.json())
      .then(data => setProposals(data))
      .catch(error => console.error('Error fetching proposals:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/proposals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProposal),
    })
      .then(response => response.json())
      .then(data => {
        console.log('New proposal created:', data);
        setNewProposal({ title: '', description: '' });
        fetchProposals();
      })
      .catch(error => console.error('Error creating proposal:', error));
  };

  return (
    <div>
      <h2>Global Proposals</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newProposal.title}
          onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
          placeholder="Proposal Title"
          required
        />
        <textarea
          value={newProposal.description}
          onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
          placeholder="Proposal Description"
          required
        />
        <button type="submit">Create Proposal</button>
      </form>
      <ul>
        {proposals.map(proposal => (
          <li key={proposal._id}>
            <h3>{proposal.title}</h3>
            <p>{proposal.description}</p>
            <p>Status: {proposal.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}



function GlobalVoting() {
  const { user } = useDynamicContext();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/proposals')
      .then(response => response.json())
      .then(data => setProposals(data))
      .catch(error => console.error('Error fetching proposals:', error));
  }, []);

  const handleVote = (proposalId, vote) => {
    if (!user) {
      alert('Please connect your wallet to vote.');
      return;
    }

    fetch('http://localhost:3001/api/votes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        voter: user.walletAddress,
        proposalId,
        vote,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Vote submitted:', data);
        // You might want to update the UI or refetch proposals here
      })
      .catch(error => console.error('Error submitting vote:', error));
  };

  return (
    <div>
      <h2>Global Voting</h2>
      {proposals.map(proposal => (
        <div key={proposal._id}>
          <h3>{proposal.title}</h3>
          <p>{proposal.description}</p>
          <button onClick={() => handleVote(proposal._id, 'yes')}>Vote Yes</button>
          <button onClick={() => handleVote(proposal._id, 'no')}>Vote No</button>
        </div>
      ))}
    </div>
  );
}
function GlobalStaking() { return <div>Global Staking</div>; }
function GlobalDelegation() { return <div>Global Delegation</div>; }

function GlobalDAO() {
  return (
    <div>
      <h2>Global DAO Management</h2>
      <nav>
        <ul>
          <li><Link to="proposals">Proposals</Link></li>
          <li><Link to="voting">Voting</Link></li>
          <li><Link to="staking">Staking</Link></li>
          <li><Link to="delegation">Delegation</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="proposals" element={<GlobalProposals />} />
        <Route path="voting" element={<GlobalVoting />} />
        <Route path="staking" element={<GlobalStaking />} />
        <Route path="delegation" element={<GlobalDelegation />} />
      </Routes>
    </div>
  );
}

export default GlobalDAO;