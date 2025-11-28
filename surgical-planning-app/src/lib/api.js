import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchRecentCases = async () => {
  try {
    const response = await api.get('/cases/recent');
    return response.data;
  } catch (error) {
    console.error('Error fetching cases:', error);
    throw error;
  }
};

export const fetchAllPatients = async () => {
  try {
    const response = await api.get('/patients');
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

export const createCase = async (caseData) => {
  try {
    const response = await api.post('/cases', caseData);
    return response.data;
  } catch (error) {
    console.error('Error creating case:', error);
    throw error;
  }
};

export default api;