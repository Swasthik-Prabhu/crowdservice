import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CampaignForm from './components/Campaigns/CampaignForm';
import SignIn from './AuthComponents/signin';
import SignUp from './AuthComponents/signup';
import DonorDashboard from './pages/DonorDashboard';
import Profile from './pages/profile';
import AboutPage from './pages/AboutPage';
import ContactUs from './pages/ContactUs';
import BeneficiaryPage from './components/beneficiaries/BeneficiaryPage'; // Import BeneficiaryPage
import DonationPage from './components/donations/DonationPage'; // Import DonationPage
import AdminDashboard from './pages/AdminDashboard';
import AdminCampaignForm from './components/Admincampaign/CampaignForm';
import AdminReportList from './components/Adminreports/Report';
import Homepage from './pages/HomePage';
import Footer from './pages/Footer';
import CampaignPage from './components/Campaigns/CampaignPage';
import CampaignDetails from './components/Campaigns/CampaignDetails';

import YourCampaignsPage from './components/Campaigns/YourCampaignsPage'; // Import YourCampaignsPage
import AdminAnalytics from './pages/AdminAnalytics'; // Import AdminAnalytics
import MyDonationsPage from './components/Campaigns/MyDonationsPage';
import AdminCampaignDetails from './components/Admincampaign/AdminCampaignDetails';

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
          <Route path="/create-campaign" element={<CampaignForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path = "/campaignpage" element={<CampaignPage />} />
          <Route path="/campaign/:campaignId" element={<CampaignDetails />} />
          <Route path="/your-campaigns/:userId" element={<YourCampaignsPage />} />

          {/* Route for Donor Dashboard */}
          <Route path="/donor-dashboard" element={<DonorDashboard />} />  
          <Route path = "/Homepage" element={<Homepage />} />
          <Route path = "/footer" element={<Footer />} />
          

          {/* Route for Beneficiary Page */}
          <Route path="/beneficiaries/:campaignId" element={<BeneficiaryPage />} /> 
          <Route path="/donate" element={<DonationPage />} />
          <Route path="/your-donations/:userId" element={<MyDonationsPage />} />

          {/* Route for Admin Dashboard */}
          <Route path = "/admin-panel" element={<AdminDashboard/>} />
          <Route path = "/update-campaign" element={<AdminCampaignForm/>} />
          <Route path = "/report" element={<AdminReportList/>} />
          <Route path = "/admin-analytics" element={<AdminAnalytics/>} />
          <Route path = "/campaign-details" element={<AdminCampaignDetails/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import CampaignForm from './components/Campaigns/CampaignForm';
// import SignIn from './AuthComponents/signin';
// import SignUp from './AuthComponents/signup';
// import DonorDashboard from './pages/DonorDashboard';
// import Profile from './pages/profile';
// import AboutPage from './pages/AboutPage';
// import ContactUs from './pages/ContactUs';
// import BeneficiaryPage from './components/beneficiaries/BeneficiaryPage';
// import DonationPage from './components/donations/DonationPage';
// import ProtectedRoute from './AuthComponents/ProtectedRoute'; // Import ProtectedRoute
// import { UserProvider } from './AuthComponents/UserContext'; // Import UserProvider for context

// function App() {
//   return (
//     <UserProvider>
//       <Router>
//         <div>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/" element={<SignUp />} />
//             <Route path="/signin" element={<SignIn />} />
//             <Route path="/about" element={<AboutPage />} />
//             <Route path="/contact-us" element={<ContactUs />} />

//             {/* Protected Routes */}
//             <Route
//               path="/create-campaign"
//               element={
//                 <ProtectedRoute>
//                   <CampaignForm />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/profile"
//               element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/donor-dashboard"
//               element={
//                 <ProtectedRoute>
//                   <DonorDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/beneficiaries"
//               element={
//                 <ProtectedRoute>
//                   <BeneficiaryPage />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/donate"
//               element={
//                 <ProtectedRoute>
//                   <DonationPage />
//                 </ProtectedRoute>
//               }
//             />

//             {/* Catch-all for undefined routes */}
//             <Route path="*" element={<div>404 - Page Not Found</div>} />
//           </Routes>
//         </div>
//       </Router>
//     </UserProvider>
//   );
// }

// export default App;

