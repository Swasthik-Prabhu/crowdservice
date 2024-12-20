import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CampaignForm from './components/Campaigns/CampaignForm';
import SignIn from './AuthComponents/signin';
import SignUp from './AuthComponents/signup';
import DonorDashboard from './pages/DonorDashboard';
import Profile from './pages/profile';
import AboutPage from './pages/AboutPage';
import ContactUs from './pages/ContactUs';


function App() {
  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        <Routes>
          {/* Routes for Auth */}
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Routes for Campaigns */}
          {/* <Route path="/" element={<SignIn />} /> */}
          <Route path="/create-campaign" element={<CampaignForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* Route for Donor Dashboard */}
          <Route path="/donor-dashboard" element={<DonorDashboard />} />     
        </Routes>
      </div>
    </Router>
  );
}

export default App;
