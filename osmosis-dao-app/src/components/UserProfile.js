import React from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react';

function UserProfile() {
  const { user } = useDynamicContext();

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Address: {user.walletAddress}</p>
      {/* Add more user details as needed */}
    </div>
  );
}

export default UserProfile;