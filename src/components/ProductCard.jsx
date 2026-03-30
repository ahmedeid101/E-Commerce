import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, showAddToCart = true }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const discountedPrice = product.originalPrice 
    ? product.originalPrice 
    : product.price;

  const discount = product.discount 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          -{discount}%
        </div>
      )}
      
      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
      >
        <span className="text-xl">
          {isInWishlist(product.id) ? '❤️' : '🤍'}
        </span>
      </button>

      {/* Product Image */}
      <Link to={`/product-details`}>
        <div className="relative bg-gray-100 h-48 overflow-hidden">
          <img
            src={product.image || `https://picsum.photos/id/${product.id + 100}/300/300`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-red-500 transition-colors mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-red-500 font-bold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex text-yellow-400">
            {'★'.repeat(Math.floor(product.rating || 4))}
            {'☆'.repeat(5 - Math.floor(product.rating || 4))}
          </div>
          <span className="text-gray-500 text-sm">({product.reviews || 0})</span>
        </div>

        {/* Add to Cart Button */}
        {showAddToCart && (
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;