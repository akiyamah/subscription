// components/PricingCard.js

import React from 'react';
import Link from 'next/link';

const PricingCard = ({ title, price, features, checkoutLink }) => {
  return (
    <div className="w-full px-4 md:w-1/3">
      <div className="plan-card">
        <h3 className="plan-title">{title}</h3>
        <p className="plan-price">{price}</p>
        <ul className="plan-feature">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <Link href={checkoutLink}>
          <button className="plan-button">選択する</button>
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
