import React from 'react';
import { Container } from 'react-bootstrap';
import AdminNavbar  from './Adminnavbar'; // Import the Navbar component
import AdminCampaignList from '../components/Admincampaign/CampaignList'; // Import CampaignList component

function AdminDashboard() {
  

  

  return (
    <div>
      <AdminNavbar /> {/* Use the Navbar component here */}

      <Container className="mt-4">
        
        
        {/* Display the CampaignList component */}
        <AdminCampaignList />
        
        
      </Container>
    </div>
  );
}

export default AdminDashboard;
