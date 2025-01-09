import React, { useEffect, useState } from 'react';
import { fetchRecommendations } from '../../services/recommendationService';

const Recommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [error] = useState(null);

  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const data = await fetchRecommendations(userId);
        setRecommendations(data);
      } catch (err) {
        console.log('Failed to fetch recommendations.');
      }
    };

    getRecommendations();
  }, [userId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="recommendations">
      <h2>Personalized Recommendations</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        <ul>
          {recommendations.map((rec) => (
            <li key={rec.id}>
              <h3>{rec.title}</h3>
              <p>{rec.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recommendations;