// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./CampaignPage.css";
// // import Navbar from "../../pages/navbar";

// // const CampaignPage = () => {
// //   const [campaigns, setCampaigns] = useState([]);
// //   const [filteredCampaigns, setFilteredCampaigns] = useState([]);
// //   const [searchId, setSearchId] = useState("");
// //   const [searchName, setSearchName] = useState("");
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Fetch all campaigns on component mount
// //     axios
// //       .get("http://127.0.0.1:8000/campaigns/")
// //       .then((response) => {
// //         setCampaigns(response.data);
// //         setFilteredCampaigns(response.data); // Initialize filtered campaigns
// //       })
// //       .catch((error) => console.error("Error fetching campaigns:", error));
// //   }, []);

// //   const handleSearch = () => {
// //     // Filter campaigns based on search inputs
// //     const filtered = campaigns.filter((campaign) => {
// //       const matchesId =
// //         searchId === "" || campaign.camp_id.toString().includes(searchId);
// //       const matchesName =
// //         searchName === "" ||
// //         campaign.title.toLowerCase().includes(searchName.toLowerCase());
// //       const matchesStartDate =
// //         startDate === "" || new Date(campaign.start_date) >= new Date(startDate);
// //       const matchesEndDate =
// //         endDate === "" || new Date(campaign.end_date) <= new Date(endDate);

// //       return matchesId && matchesName && matchesStartDate && matchesEndDate;
// //     });

// //     setFilteredCampaigns(filtered);
// //   };

// //   const handleCreateCampaign = () => {
// //     // Navigate to create campaign page
// //     navigate("/create-campaign");
// //   };

// //   const handleYourCampaigns = () => {
// //     const storedUser = JSON.parse(localStorage.getItem("userDetails"));
// //     if (storedUser && storedUser.user_id) {
// //       const userId = storedUser.user_id;
// //       navigate(`/your-campaigns/${userId}`); // Route to user's campaigns page with user_id
// //     } else {
// //       alert("User not found in localStorage. Please log in again.");
// //     }
// //   };

// //   return (
// //     <div>
// //       <Navbar />
// //       <div className="campaign-page">
// //         <h1>Campaigns</h1>

// //         {/* Create Campaign Button */}
// //         <div className="button-container">
// //           <button
// //             className="create-campaign-button"
// //             onClick={handleCreateCampaign}
// //           >
// //             Create Campaign
// //           </button>
          
// //         </div>

// //         {/* Search Bar */}
// //         <div className="search-bar">
// //           <div className="search-field-group">
// //             <label htmlFor="search-id">Search by ID: </label>
// //             <input
// //               type="text"
// //               id="search-id"
// //               placeholder="Enter Campaign ID"
// //               value={searchId}
// //               onChange={(e) => setSearchId(e.target.value)}
// //             />
// //           </div>
// //           <div className="search-field-group">
// //             <label htmlFor="search-name">Search by Name:</label>
// //             <input
// //               type="text"
// //               id="search-name"
// //               placeholder="Enter Campaign Name"
// //               value={searchName}
// //               onChange={(e) => setSearchName(e.target.value)}
// //             />
// //           </div>
// //           <div className="search-field-group">
// //             <label htmlFor="start-date">Start Date:</label>
// //             <input
// //               type="date"
// //               id="start-date"
// //               value={startDate}
// //               onChange={(e) => setStartDate(e.target.value)}
// //             />
// //           </div>
// //           <div className="search-field-group">
// //             <label htmlFor="end-date">End Date:</label>
// //             <input
// //               type="date"
// //               id="end-date"
// //               value={endDate}
// //               onChange={(e) => setEndDate(e.target.value)}
// //             />
// //           </div>
// //           <button className="search-button" onClick={handleSearch}>
// //             Search
// //           </button>
// //         </div>

// //         {/* Campaign List */}
// //         <div className="campaigns-list">
// //           {filteredCampaigns.length === 0 ? (
// //             <p>No campaigns found matching your criteria.</p>
// //           ) : (
// //             filteredCampaigns.map((campaign) => (
// //               <div
// //                 key={campaign.camp_id}
// //                 className="campaign-card"
// //                 onClick={() => navigate(`/campaign/${campaign.camp_id}`)} // Navigate to details page
// //               >
// //                 <h3>{campaign.title}</h3>
// //                 <p>Cause: {campaign.cause}</p>
// //                 <p>
// //                   Raised: ₹{campaign.raised_amount} / Target: ₹
// //                   {campaign.target_amount}
// //                 </p>
// //                 <p>
// //                   Start Date:{" "}
// //                   {new Date(campaign.start_date).toLocaleDateString()}
// //                 </p>
// //                 <p>
// //                   End Date: {new Date(campaign.end_date).toLocaleDateString()}
// //                 </p>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //         <button
// //             className="your-campaigns-button"
// //             onClick={handleYourCampaigns}
// //           >
// //             My Campaigns
// //           </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CampaignPage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./CampaignPage.css";
// import Navbar from "../../pages/navbar";

// const CampaignPage = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [filteredCampaigns, setFilteredCampaigns] = useState([]);
//   const [searchId, setSearchId] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch all campaigns on component mount
//     axios
//       .get("http://127.0.0.1:8000/campaigns/")
//       .then((response) => {
//         setCampaigns(response.data);
//         setFilteredCampaigns(response.data); // Initialize filtered campaigns
//       })
//       .catch((error) => console.error("Error fetching campaigns:", error));
//   }, []);

//   const handleSearch = () => {
//     // Filter campaigns based on search inputs
//     const filtered = campaigns.filter((campaign) => {
//       const matchesId =
//         searchId === "" || campaign.camp_id.toString().includes(searchId);
//       const matchesName =
//         searchName === "" ||
//         campaign.title.toLowerCase().includes(searchName.toLowerCase());
//       const matchesStartDate =
//         startDate === "" || new Date(campaign.start_date) >= new Date(startDate);
//       const matchesEndDate =
//         endDate === "" || new Date(campaign.end_date) <= new Date(endDate);

//       return matchesId && matchesName && matchesStartDate && matchesEndDate;
//     });

//     setFilteredCampaigns(filtered);
//   };

//   const handleCreateCampaign = () => {
//     // Navigate to create campaign page
//     navigate("/create-campaign");
//   };

//   const handleYourCampaigns = () => {
//     const storedUser = JSON.parse(localStorage.getItem("userDetails"));
//     if (storedUser && storedUser.user_id) {
//       const userId = storedUser.user_id;
//       navigate(`/your-campaigns/${userId}`); // Route to user's campaigns page with user_id
//     } else {
//       alert("User not found in localStorage. Please log in again.");
//     }
//   };

//   const isCampaignActive = (endDate) => {
//     return new Date() <= new Date(endDate);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="campaign-page">
//         <h1>Campaigns</h1>

//         {/* Create Campaign and My Campaigns Buttons */}
//         <div className="button-container">
//           <button
//             className="create-campaign-button"
//             onClick={handleCreateCampaign}
//           >
//             Create Campaign
//           </button>
//         </div>

//         {/* Search Bar */}
//         <div className="search-bar">
//           <div className="search-field-group">
//             <label htmlFor="search-id">Search by ID: </label>
//             <input
//               type="text"
//               id="search-id"
//               placeholder="Enter Campaign ID"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//             />
//           </div>
//           <div className="search-field-group">
//             <label htmlFor="search-name">Search by Name:</label>
//             <input
//               type="text"
//               id="search-name"
//               placeholder="Enter Campaign Name"
//               value={searchName}
//               onChange={(e) => setSearchName(e.target.value)}
//             />
//           </div>
//           <div className="search-field-group">
//             <label htmlFor="start-date">Start Date:</label>
//             <input
//               type="date"
//               id="start-date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//           </div>
//           <div className="search-field-group">
//             <label htmlFor="end-date">End Date:</label>
//             <input
//               type="date"
//               id="end-date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </div>
//           <button className="search-button" onClick={handleSearch}>
//             Search
//           </button>
//         </div>

//         {/* Campaign List */}
//         <div className="campaigns-list">
//           {filteredCampaigns.length === 0 ? (
//             <p>No campaigns found matching your criteria.</p>
//           ) : (
//             // Sort campaigns: active campaigns first
//             filteredCampaigns
//               .sort((a, b) => {
//                 const isActiveA = isCampaignActive(a.end_date);
//                 const isActiveB = isCampaignActive(b.end_date);
//                 return isActiveB - isActiveA; // Active campaigns first
//               })
//               .map((campaign) => {
//                 const active = isCampaignActive(campaign.end_date);
//                 return (
//                   <div
//                     key={campaign.camp_id}
//                     className={`campaign-card ${active ? "" : "inactive-campaign"}`}
//                     onClick={() =>
//                       active
//                         ? navigate(`/campaign/${campaign.camp_id}`)
//                         : alert("This campaign has ended.")
//                     } // Navigate to details page only if active
//                   >
//                     <h3>{campaign.title}</h3>
//                     <p>Cause: {campaign.cause}</p>
//                     <p>
//                       Raised: ₹{campaign.raised_amount} / Target: ₹
//                       {campaign.target_amount}
//                     </p>
//                     <p>
//                       Start Date:{" "}
//                       {new Date(campaign.start_date).toLocaleDateString()}
//                     </p>
//                     <p>
//                       End Date: {new Date(campaign.end_date).toLocaleDateString()}
//                     </p>
//                     {!active && <p className="ended-message">Campaign Ended</p>}
//                   </div>
//                 );
//               })
//           )}
//         </div>

//         <button
//           className="your-campaigns-button"
//           onClick={handleYourCampaigns}
//         >
//           My Campaigns
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CampaignPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CampaignPage.css";
import Navbar from "../../pages/navbar";

const CampaignPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all campaigns on component mount
    axios
      .get("http://127.0.0.1:8000/campaigns/")
      .then((response) => {
        setCampaigns(response.data);
        setFilteredCampaigns(response.data); // Initialize filtered campaigns
      })
      .catch((error) => console.error("Error fetching campaigns:", error));
  }, []);

  const handleSearch = () => {
    // Filter campaigns based on search inputs
    const filtered = campaigns.filter((campaign) => {
      const matchesId =
        searchId === "" || campaign.camp_id.toString().includes(searchId);
      const matchesName =
        searchName === "" ||
        campaign.title.toLowerCase().includes(searchName.toLowerCase());
      const matchesStartDate =
        startDate === "" || new Date(campaign.start_date) >= new Date(startDate);
      const matchesEndDate =
        endDate === "" || new Date(campaign.end_date) <= new Date(endDate);

      return matchesId && matchesName && matchesStartDate && matchesEndDate;
    });

    setFilteredCampaigns(filtered);
  };

  const handleCreateCampaign = () => {
    // Navigate to create campaign page
    navigate("/create-campaign");
  };

  const handleYourCampaigns = () => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser && storedUser.user_id) {
      const userId = storedUser.user_id;
      navigate(`/your-campaigns/${userId}`); // Route to user's campaigns page with user_id
    } else {
      alert("User not found in localStorage. Please log in again.");
    }
  };

  const handleYourDonations = () => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser && storedUser.user_id) {
      const userId = storedUser.user_id;
      navigate(`/your-donations/${userId}`); // Route to user's donations page with user_id
    } else {
      alert("User not found in localStorage. Please log in again.");
    }
  };

  const isCampaignActive = (endDate) => {
    return new Date() <= new Date(endDate);
  };

  return (
    <div>
      <Navbar />
      <div className="campaign-page">
        <h1>Campaigns</h1>

        {/* Create Campaign and My Campaigns Buttons */}
        <div className="button-container">
          <button
            className="create-campaign-button"
            onClick={handleCreateCampaign}
          >
            Create Campaign
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-field-group">
            <label htmlFor="search-id">Search by ID: </label>
            <input
              type="text"
              id="search-id"
              placeholder="Enter Campaign ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
          <div className="search-field-group">
            <label htmlFor="search-name">Search by Name:</label>
            <input
              type="text"
              id="search-name"
              placeholder="Enter Campaign Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="search-field-group">
            <label htmlFor="start-date">Start Date:</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="search-field-group">
            <label htmlFor="end-date">End Date:</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Campaign List */}
        <div className="campaigns-list">
          {filteredCampaigns.length === 0 ? (
            <p>No campaigns found matching your criteria.</p>
          ) : (
            // Sort campaigns: active campaigns first
            filteredCampaigns
              .sort((a, b) => {
                const isActiveA = isCampaignActive(a.end_date);
                const isActiveB = isCampaignActive(b.end_date);
                return isActiveB - isActiveA; // Active campaigns first
              })
              .map((campaign) => {
                const active = isCampaignActive(campaign.end_date);
                return (
                  <div
                    key={campaign.camp_id}
                    className={`campaign-card ${active ? "" : "inactive-campaign"}`}
                    onClick={() =>
                      active
                        ? navigate(`/campaign/${campaign.camp_id}`)
                        : alert("This campaign has ended.")
                    } // Navigate to details page only if active
                  >
                    <h3>{campaign.title}</h3>
                    <p>Cause: {campaign.cause}</p>
                    <p>
                      Raised: ₹{campaign.raised_amount} / Target: ₹
                      {campaign.target_amount}
                    </p>
                    <p>
                      Start Date:{" "}
                      {new Date(campaign.start_date).toLocaleDateString()}
                    </p>
                    <p>
                      End Date: {new Date(campaign.end_date).toLocaleDateString()}
                    </p>
                    {!active && <p className="ended-message">Campaign Ended</p>}
                  </div>
                );
              })
          )}
        </div>

        <div className="button-container">
          <button
            className="your-campaigns-button"
            onClick={handleYourCampaigns}
          >
            My Campaigns
          </button>
          
          <button
            className="your-donations-button"
            onClick={handleYourDonations}
          >
            My Donations
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
