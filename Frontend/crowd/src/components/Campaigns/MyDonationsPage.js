// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../../pages/navbar";
// import "./MyDonationsPage.css";

// const MyDonationsPage = () => {
//   const { userId } = useParams(); // Fetch user ID from route params
//   const [userDonations, setUserDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch donations made by the user
//     axios
//       .get(`http://127.0.0.1:8000/donations/creator/${userId}`)
//       .then((response) => {
//         setUserDonations(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching user donations:", error);
//         setLoading(false);
//       });
//   }, [userId]);

//   const handleDonationClick = (campaignId) => {
//     // Navigate to the campaign details page
//     navigate(`/campaign/${campaignId}`);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="my-donations-page">
//         <h1>Your Donations</h1>

//         {loading ? (
//           <p>Loading your donations...</p>
//         ) : userDonations.length === 0 ? (
//           <p>You have not made any donations yet.</p>
//         ) : (
//           <div className="donations-list">
//             {userDonations.map((donation) => (
//               <div
//                 key={donation.donation_id}
//                 className="donation-card"
//                 onClick={() => handleDonationClick(donation.campaign_id)}
//               >
//                 <h3>Campaign Name : {donation.title}</h3>
//                 <p>Amount Donated: ₹{donation.amount}</p>
//                 <p>
//                   Donation Date: {new Date(donation.donation_date).toLocaleDateString()}
//                 </p>
//                 <p>Transaction ID: {donation.transaction_id}</p>
//                 <p>Campaign ID: {donation.campaign_id}</p>
//                 <p>User ID: {donation.user_id}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyDonationsPage;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../pages/navbar";
import "./MyDonationsPage.css";

const MyDonationsPage = () => {
  const { userId } = useParams(); // Fetch user ID from route params
  const [userDonations, setUserDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch donations made by the user
    axios
      .get(`http://127.0.0.1:8000/donations/creator/${userId}`)
      .then((response) => {
        setUserDonations(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user donations:", error);
        setLoading(false);
      });
  }, [userId]);

  const handleDonationClick = (campaignId) => {
    // Navigate to the campaign details page
    navigate(`/campaign/${campaignId}`);
  };

  return (
    <div>
      <Navbar />
      <div className="my-donations-page">
        <h1>Your Donations</h1>

        {loading ? (
          <p>Loading your donations...</p>
        ) : userDonations.length === 0 ? (
          <p>You have not made any donations yet.</p>
        ) : (
          <div className="donations-list">
            {userDonations.map((donation) => (
              <div
                key={donation.donation_id}
                className="donation-card"
                onClick={() => handleDonationClick(donation.campaign.camp_id)}
              >
                <h3>Campaign Name: {donation.campaign.title}</h3>
                <p>Amount Donated: ₹{donation.amount}</p>
                <p>
                  Donation Date: {new Date(donation.donation_date).toLocaleDateString()}
                </p>
                {/* <p>Transaction ID: {donation.transaction_id}</p> */}
                <p>Campaign ID: {donation.campaign.camp_id}</p>
                {/* <p>User ID: {donation.user_id}</p> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDonationsPage;
