import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating, className = '' }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let index = 0; index < fullStars; index += 1) {
    stars.push(<FaStar key={`star-${index}`} className="text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="star-half" className="text-yellow-400" />);
  }

  while (stars.length < 5) {
    stars.push(<FaRegStar key={`star-empty-${stars.length}`} className="text-yellow-400" />);
  }

  return <div className={`flex items-center gap-1 ${className}`}>{stars}</div>;
};

export default RatingStars;
