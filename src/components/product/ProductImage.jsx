import React from 'react';

const ProductImage = ({ src, alt }) => {
  return (
    <div className="relative bg-gray-100 h-80 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage;
