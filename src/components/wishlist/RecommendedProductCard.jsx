import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from './Rating';

const RecommendedProductCard = ({ product, isLoading, onAddToCart }) => {
  const { id, name, price, originalPrice, rating, reviews, image } = product;

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <Link to={`/product/${id}`}>
        <div className="relative bg-gray-100 h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-red-500 transition-colors mb-2 line-clamp-2 min-h-12">
            {name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-red-500 font-bold">${price}</span>
          {originalPrice && (
            <span className="text-gray-400 line-through text-sm">${originalPrice}</span>
          )}
        </div>

        {/* Rating */}
        <Rating rating={rating} reviews={reviews} className="mb-3" />

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            'Add To Cart'
          )}
        </button>
      </div>
    </div>
  );
};

export default RecommendedProductCard;
