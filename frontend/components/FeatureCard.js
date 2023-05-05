import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <div className="feature-text">
        <dt className="feature-title">{title}</dt>
        <dd className="feature-description">{description}</dd>
      </div>
    </div>
  );
};

export default FeatureCard;
