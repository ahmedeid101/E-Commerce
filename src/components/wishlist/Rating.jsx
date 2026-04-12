import React from 'react';

export const Rating = ({ rating = 4, reviews = 0, className = '' }) => {
  const stars = Math.floor(rating || 4);
  const emptyStars = 5 - stars;

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex text-yellow-400">
        {'★'.repeat(stars)}
        {'☆'.repeat(emptyStars)}
      </div>
      <span className="text-gray-500 text-sm">({reviews})</span>
    </div>
  );
};
