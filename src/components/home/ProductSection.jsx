import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import ProductCard from '../product/ProductCard';

const ProductSection = ({ 
  title, 
  subtitle, 
  products, 
  showViewAll = false,
  onAddToCart,
  onWishlistToggle,
  isInWishlist
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-4 h-10 bg-red-500 rounded"></div>
            <span className="text-red-500 font-semibold">{subtitle}</span>
          </div>
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
        {showViewAll && (
          <Link to="/products">
            <Button variant="primary">View All</Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            onAddToCart={onAddToCart}
            onWishlistToggle={onWishlistToggle}
            isInWishlist={isInWishlist}
          />
        ))}
      </div>

      {!showViewAll && (
        <div className="text-center mt-8">
          <Link to='/products'>
            <Button variant="primary">View All Products</Button>
          </Link>
        </div>
      )}
      
      <hr className="mt-12 border-gray-200" />
    </div>
  );
};

export default ProductSection;