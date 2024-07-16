const API_BASE_URL = 'http://localhost:3001/api'; // Adjust if your server is on a different port

export async function getDaoInfo(address) {
  const response = await fetch(`${API_BASE_URL}/dao-data?address=${address}`);
  if (!response.ok) {
    throw new Error('Failed to fetch DAO data');
  }
  return response.json();
}

export async function getProposals() {
  const response = await fetch(`${API_BASE_URL}/proposals`);
  if (!response.ok) {
    throw new Error('Failed to fetch proposals');
  }
  return response.json();
}

export async function getVotingPower(address, daoId) {
  const response = await fetch(`${API_BASE_URL}/voting-power?address=${address}&daoId=${daoId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch voting power');
  }
  return response.json();
}