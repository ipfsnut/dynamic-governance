import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

export const fetchDAOConfig = async () => {
  try {
    console.log('Fetching DAO config from:', `${API_BASE_URL}/dao/config`);
    const response = await axios.get(`${API_BASE_URL}/dao/config`);
    console.log('DAO config response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching DAO config:', error.response || error);
    throw error;
  }
};

export const fetchProposals = async () => {
  try {
    console.log('Fetching proposals from:', `${API_BASE_URL}/proposals`);
    const response = await axios.get(`${API_BASE_URL}/proposals`);
    console.log('Proposals response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching proposals:', error.response || error);
    throw error;
  }
};
