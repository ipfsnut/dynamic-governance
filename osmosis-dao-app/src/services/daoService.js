import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Adjust this if your backend is on a different port

export const fetchDAOConfig = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dao/config`);
    return response.data;
  } catch (error) {
    console.error('Error fetching DAO config:', error);
    throw error;
  }
};

export const fetchProposals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/proposals`);
    return response.data;
  } catch (error) {
    console.error('Error fetching proposals:', error);
    throw error;
  }
};