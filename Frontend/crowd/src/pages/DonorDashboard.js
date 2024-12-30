import React from 'react';
import { Container } from 'react-bootstrap';
import Navbar from './navbar'; // Import the Navbar component
import CampaignList from '../components/Campaigns/CampaignList'; // Import CampaignList component

function DonorDashboard() {
  

  

  return (
    <div>
      <Navbar /> {/* Use the Navbar component here */}

      <Container className="mt-4">
        
        
        {/* Display the CampaignList component */}
        <CampaignList />
        
        
      </Container>
    </div>
  );
}

export default DonorDashboard;
