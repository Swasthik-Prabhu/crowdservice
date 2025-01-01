// // import React, { useEffect, useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import './CampaignDetails.css';
// // import Navbar from '../../pages/navbar';

// // const CampaignDetails = () => {
// //   const { campaignId } = useParams(); // Get campaign ID from URL
// //   const navigate = useNavigate();
// //   const [campaign, setCampaign] = useState(null);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     axios
// //       .get(`http://127.0.0.1:8000/campaigns/${campaignId}`)
// //       .then((response) => setCampaign(response.data))
// //       .catch((error) => {
// //         console.error('Error fetching campaign:', error);
// //         setError('Failed to fetch campaign details.');
// //       });
// //   }, [campaignId]);

// //   const handleDonate = () => {
// //     console.log('Navigating with campaign_id:', campaign?.camp_id); // Debugging log
// //     if (campaign?.camp_id) {
// //       navigate('/donate', { state: { campaign_id: campaign.camp_id } });
// //     } else {
// //       alert('Campaign ID not found.');
// //     }
// //   };

// //   const handleReport = () => {
// //     alert('Report feature coming soon!');
// //   };

// //   if (error) {
// //     return <div className="error">{error}</div>;
// //   }

// //   if (!campaign) {
// //     return <div>Loading campaign details...</div>;
// //   }

// //   return (
// //     <div>
// //       <Navbar />
// //       <div className="campaign-details">
// //         <h2>{campaign.title}</h2>
// //         <p>
// //           <strong>Campaign ID:</strong> {campaignId}
// //         </p>
// //         <p>
// //           <strong>Cause:</strong> {campaign.cause}
// //         </p>
// //         <p>
// //           <strong>Target Amount:</strong> ₹{campaign.target_amount}
// //         </p>
// //         <p>
// //           <strong>Raised Amount:</strong> ₹{campaign.raised_amount}
// //         </p>
// //         <p>
// //           <strong>Start Date:</strong>{' '}
// //           {new Date(campaign.start_date).toLocaleDateString()}
// //         </p>
// //         <p>
// //           <strong>End Date:</strong>{' '}
// //           {new Date(campaign.end_date).toLocaleDateString()}
// //         </p>

// //         <div className="button-group">
// //           <button onClick={handleDonate} className="donate-button">
// //             Donate
// //           </button>
// //           <button onClick={handleReport} className="report-button">
// //             Report
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CampaignDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './CampaignDetails.css';
// import Navbar from '../../pages/navbar';

// const CampaignDetails = () => {
//   const { campaignId } = useParams(); // Get campaign ID from URL
//   const navigate = useNavigate();
//   const [campaign, setCampaign] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/campaigns/${campaignId}`)
//       .then((response) => setCampaign(response.data))
//       .catch((error) => {
//         console.error('Error fetching campaign:', error);
//         setError('Failed to fetch campaign details.');
//       });
//   }, [campaignId]);

//   const handleDonate = () => {
//     console.log('Navigating with campaign_id:', campaignId); // Debugging log
//     navigate('/donate', { state: { campaign_id: campaignId } });
//   };

//   const handleReport = () => {
//     alert('Report feature coming soon!');
//   };

//   if (error) {
//     return <div className="error">{error}</div>;
//   }

//   if (!campaign) {
//     return <div>Loading campaign details...</div>;
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="campaign-details">
//         <h2>{campaign.title}</h2>
//         <p>
//           <strong>Campaign ID:</strong> {campaignId}
//         </p>
//         <p>
//           <strong>Cause:</strong> {campaign.cause}
//         </p>
//         <p>
//           <strong>Target Amount:</strong> ₹{campaign.target_amount}
//         </p>
//         <p>
//           <strong>Raised Amount:</strong> ₹{campaign.raised_amount}
//         </p>
//         <p>
//           <strong>Start Date:</strong>{' '}
//           {new Date(campaign.start_date).toLocaleDateString()}
//         </p>
//         <p>
//           <strong>End Date:</strong>{' '}
//           {new Date(campaign.end_date).toLocaleDateString()}
//         </p>

//         <div className="button-group">
//           <button onClick={handleDonate} className="donate-button">
//             Donate
//           </button>
//           <button onClick={handleReport} className="report-button">
//             Report
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CampaignDetails;




import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CampaignDetails.css';
import Navbar from '../../pages/navbar';

const CampaignDetails = () => {
  const { campaignId } = useParams(); // Get campaign ID from URL
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/campaigns/${campaignId}`)
      .then((response) => setCampaign(response.data))
      .catch((error) => {
        console.error('Error fetching campaign:', error);
        setError('Failed to fetch campaign details.');
      });
  }, [campaignId]);

  const handleDonate = () => {
    navigate('/donate', { state: { campaign_id: campaignId } });
  };

  const handleReport = () => {
    navigate('/contact-us', { state: { campaign_id: campaignId } });
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!campaign) {
    return <div>Loading campaign details...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="campaign-details">
        <h2>{campaign.title}</h2>
        <p>
          <strong>Campaign ID:</strong> {campaignId}
        </p>
        <p>
          <strong>Cause:</strong> {campaign.cause}
        </p>
        <p>
          <strong>Target Amount:</strong> ₹{campaign.target_amount}
        </p>
        <p>
          <strong>Raised Amount:</strong> ₹{campaign.raised_amount}
        </p>
        <p>
          <strong>Start Date:</strong>{' '}
          {new Date(campaign.start_date).toLocaleDateString()}
        </p>
        <p>
          <strong>End Date:</strong>{' '}
          {new Date(campaign.end_date).toLocaleDateString()}
        </p>

        <div className="button-group">
          <button onClick={handleDonate} className="donate-button">
            Donate
          </button>
          <button onClick={handleReport} className="report-button">
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
