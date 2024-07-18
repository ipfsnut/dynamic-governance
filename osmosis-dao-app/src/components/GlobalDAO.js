import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Proposals from './Proposals';
import GlobalVoting from './GlobalVoting';
import Staking from './Staking';
import Delegation from './Delegation';

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
        <Route path="proposals" element={<Proposals />} />
        <Route path="voting" element={<GlobalVoting />} />
        <Route path="staking" element={<Staking />} />
        <Route path="delegation" element={<Delegation />} />
      </Routes>
    </div>
  );
}

export default GlobalDAO;
