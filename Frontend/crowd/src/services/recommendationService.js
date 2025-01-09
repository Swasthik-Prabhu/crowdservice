import axios from 'axios';

export const fetchRecommendations = async (userId) => {
  const response = await axios.get(`http://127.0.0.1:8000/recommendations/${userId}`);
  return response.data;
};