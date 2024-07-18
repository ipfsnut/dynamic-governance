import { useDynamicContext } from '@dynamic-labs/sdk-react';

export const useDynamicService = () => {
  const { user, handleUserUpdate, setShowAuthFlow, setShowDelegationFlow } = useDynamicContext();

  const recordVote = async (proposalId, vote) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const updatedVotes = {
      ...(user.votes || {}),
      [proposalId]: vote
    };

    await handleUserUpdate({
      votes: updatedVotes
    });

    return updatedVotes;
  };

  const getDelegationInfo = () => {
    return user?.delegationInfo || { delegatedTo: '', delegatedFrom: [] };
  };

  const updateDelegation = async (newDelegatedTo) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const updatedDelegationInfo = {
      ...user.delegationInfo,
      delegatedTo: newDelegatedTo
    };

    await handleUserUpdate({
      delegationInfo: updatedDelegationInfo
    });

    return updatedDelegationInfo;
  };

  const revokeDelegation = async () => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const updatedDelegationInfo = {
      ...user.delegationInfo,
      delegatedTo: ''
    };

    await handleUserUpdate({
      delegationInfo: updatedDelegationInfo
    });

    return updatedDelegationInfo;
  };

  const showAuthFlow = () => {
    setShowAuthFlow(true);
  };

  const showDelegationFlow = () => {
    setShowDelegationFlow(true);
  };

  return {
    user,
    recordVote,
    getDelegationInfo,
    updateDelegation,
    revokeDelegation,
    showAuthFlow,
    showDelegationFlow,
  };
};