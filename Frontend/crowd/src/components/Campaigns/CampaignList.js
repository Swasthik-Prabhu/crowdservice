// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './CampaignList.css';

// const CampaignList = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/campaigns/')
//       .then((response) => setCampaigns(response.data))
//       .catch((error) => {
//         console.error('Error fetching campaigns:', error);
//         setError('Failed to fetch campaigns.');
//       });
//   }, []);

//   const handleDonateClick = (campaign) => {
//     navigate('/donate', { state: { campaign_id: campaign.camp_id } }); // Pass campaign_id via state
//   };

//   return (
//     <div>
//       <h1>Campaigns</h1>
//       {error && <div className="error">{error}</div>}
//       <div className="campaigns-list">
//         {campaigns.map((campaign) => (
//           <div key={campaign.camp_id} className="campaign-card">
//             <h3>{campaign.title}</h3>
//             <p>{campaign.cause}</p>
//             {/* <p>ID : {campaign.camp_id}</p> */}
//             <p>Raised: ₹{campaign.raised_amount} / Target: ₹{campaign.target_amount}</p>
//             <button onClick={() => handleDonateClick(campaign)}>Donate</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CampaignList;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CampaignList.css';

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/campaigns/')
      .then((response) => setCampaigns(response.data))
      .catch((error) => {
        console.error('Error fetching campaigns:', error);
        setError('Failed to fetch campaigns.');
      });

    // Add mouse effect
    const mouseEffect = document.createElement('div');
    mouseEffect.className = 'mouse-effect';
    document.body.appendChild(mouseEffect);

    const handleMouseMove = (e) => {
      mouseEffect.style.left = e.clientX + 'px';
      mouseEffect.style.top = e.clientY + 'px';
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate floating particles
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.top = Math.random() * 100 + 'vh';
      particle.style.animationDuration = Math.random() * 20 + 10 + 's';
      particle.style.animationDelay = -Math.random() * 20 + 's';
      particlesContainer.appendChild(particle);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeChild(mouseEffect);
      document.body.removeChild(particlesContainer);
    };
  }, []);

  const handleDonateClick = (campaign) => {
    navigate('/donate', { state: { campaign_id: campaign.camp_id } });
  };

  return (
    <>
      <div className="background-animation">
        <div className="moving-circles">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
      
      <div>
        <h1>Campaigns</h1>
        {error && <div className="error">{error}</div>}
        <div className="campaigns-list">
          {campaigns.map((campaign) => (
            <div key={campaign.camp_id} className="campaign-card">
              <h3>{campaign.title}</h3>
              <p>{campaign.cause}</p>
              <p>Raised: ₹{campaign.raised_amount} / Target: ₹{campaign.target_amount}</p>
              <button onClick={() => handleDonateClick(campaign)}>Donate</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CampaignList;