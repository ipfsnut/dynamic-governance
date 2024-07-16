import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Adjust if your server is on a different port

export const fetchDAOData = async (address) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/dao-data`, { params: { address } });
    return response.data;
  } catch (error) {
    console.error('Error fetching DAO data:', error);
    throw error;
  }
};

export const fetchProposals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/proposals`);
    return response.data;
  } catch (error) {
    console.error('Error fetching proposals:', error);
    throw error;
  }
};

export const fetchVotingPower = async (address, daoId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/voting-power`, { params: { address, daoId } });
    return response.data;
  } catch (error) {
    console.error('Error fetching voting power:', error);
    throw error;
  }
};