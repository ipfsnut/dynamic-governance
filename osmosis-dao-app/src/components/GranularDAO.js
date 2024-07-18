import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function GDAOList() { return <div>gDAO / Book Club List</div>; }
function GDAODetails() { return <div>gDAO Details</div>; }
function GDAOProposals() { return <div>gDAO Proposals</div>; }
function GDAOVoting() { return <div>gDAO Voting</div>; }
function GDAOStaking() { return <div>gDAO Staking</div>; }

function GranularDAO() {
  return (
    <div>
      <h2>Granular DAO Management</h2>
      <nav>
        <ul>
          <li><Link to="list">gDAO List</Link></li>
          <li><Link to="details">gDAO Details</Link></li>
          <li><Link to="proposals">Proposals</Link></li>
          <li><Link to="voting">Voting</Link></li>
          <li><Link to="staking">Staking</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="list" element={<GDAOList />} />
        <Route path="details" element={<GDAODetails />} />
        <Route path="proposals" element={<GDAOProposals />} />
        <Route path="voting" element={<GDAOVoting />} />
        <Route path="staking" element={<GDAOStaking />} />
      </Routes>
    </div>
  );
}

export default GranularDAO;