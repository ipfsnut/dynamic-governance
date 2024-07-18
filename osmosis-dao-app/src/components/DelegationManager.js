import React, { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react';

function DelegationManager() {
  const { user, handleUserUpdate } = useDynamicContext();
  const [delegatedTo, setDelegatedTo] = useState('');
  const [delegatedFrom, setDelegatedFrom] = useState([]);
  const [newDelegation, setNewDelegation] = useState('');

  useEffect(() => {
    if (user) {
      setDelegatedTo(user.delegationInfo?.delegatedTo || '');
      setDelegatedFrom(user.delegationInfo?.delegatedFrom || []);
    }
  }, [user]);

  const handleDelegate = async () => {
    if (!newDelegation) return;

    try {
      const updatedDelegationInfo = {
        delegatedTo: newDelegation,
        delegatedFrom: user.delegationInfo?.delegatedFrom || []
      };

      await handleUserUpdate({
        delegationInfo: updatedDelegationInfo
      });

      setDelegatedTo(newDelegation);
      setNewDelegation('');
    } catch (error) {
      console.error('Error updating delegation:', error);
    }
  };

  const handleRevokeDelegation = async () => {
    try {
      const updatedDelegationInfo = {
        delegatedTo: '',
        delegatedFrom: user.delegationInfo?.delegatedFrom || []
      };

      await handleUserUpdate({
        delegationInfo: updatedDelegationInfo
      });

      setDelegatedTo('');
    } catch (error) {
      console.error('Error revoking delegation:', error);
    }
  };

  if (!user) {
    return <div>Please connect your wallet to manage delegations.</div>;
  }

  return (
    <div className="delegation-manager">
      <h3>Manage Your Delegation</h3>
      {delegatedTo ? (
        <div>
          <p>You have delegated your voting power to: {delegatedTo}</p>
          <button onClick={handleRevokeDelegation}>Revoke Delegation</button>
        </div>
      ) : (
        <div>
          <p>You have not delegated your voting power.</p>
          <input 
            type="text" 
            value={newDelegation} 
            onChange={(e) => setNewDelegation(e.target.value)} 
            placeholder="Enter address to delegate to"
          />
          <button onClick={handleDelegate}>Delegate</button>
        </div>
      )}
      
      <h4>Delegations Received</h4>
      {delegatedFrom.length > 0 ? (
        <ul>
          {delegatedFrom.map((address, index) => (
            <li key={index}>{address}</li>
          ))}
        </ul>
      ) : (
        <p>No one has delegated their voting power to you.</p>
      )}
    </div>
  );
}

export default DelegationManager;