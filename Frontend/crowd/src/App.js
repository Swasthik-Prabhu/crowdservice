import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CampaignList from './components/Campaigns/CampaignList';
import CampaignForm from './components/Campaigns/CampaignForm';
import SignIn from './AuthComponents/signin';// Import SignUp and SignIn components
import SignUp from './AuthComponents/signup';
import DonorDashboard from './pages/DonorDashboard'; // Import DonorDashboard component

function App() {
  return (
    <Router>
      <div>
        
        <Routes>
          {/* Routes for Auth */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Routes for Campaigns */}
          <Route path="/" element={<CampaignList />} />
          <Route path="/create" element={<CampaignForm />} />

          {/* Route for Donor Dashboard */}
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
