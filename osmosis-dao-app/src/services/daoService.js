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

export const fetchTreasury = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/treasury`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('Treasury endpoint not implemented yet');
      return null;
    }
    console.error('Error fetching treasury data:', error);
    throw error;
  }
};

export const fetchMembers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/members`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn('Members endpoint not implemented yet');
      return [];
    }
    console.error('Error fetching members data:', error);
    throw error;
  }
};
