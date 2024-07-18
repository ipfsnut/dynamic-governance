import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function GlobalProposals() { return <div>Global Proposals</div>; }
function GlobalVoting() { return <div>Global Voting</div>; }
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