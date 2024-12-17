import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/', // Your FastAPI backend URL
});

export const fetchCampaigns = () => API.get('/campaigns/');
export const fetchCampaignById = (id) => API.get(`/campaigns/${id}`);
export const createCampaign = (campaign) => API.post('/campaigns/', campaign);
export const updateCampaign = (id, campaign) => API.put(`/campaigns/${id}`, campaign);
export const deleteCampaign = (id) => API.delete(`/campaigns/${id}`);

