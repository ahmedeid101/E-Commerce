import React from 'react';

const DiscountBadge = ({ discount }) => {
  if (discount <= 0) return null;

  return (
    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
      -{discount}%
    </div>
  );
};

export default DiscountBadge;
