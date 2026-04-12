import React from 'react';

const ProductImage = ({ src, alt, onHover = false }) => {
  return (
    <div className="relative bg-gray-100 h-48 overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
    </div>
  );
};

export default ProductImage;
