import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const [movingItems, setMovingItems] = useState({});
  const [addingItems, setAddingItems] = useState({});

  // Just For You recommended products
  const recommendedProducts = [
    { id: 101, name: 'ASUS FHD Gaming Laptop', price: 960, originalPrice: 1160, rating: 4.5, reviews: 85, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/11/300/300' },
    { id: 102, name: 'IPS LCD Gaming Monitor', price: 1160, rating: 4.6, reviews: 99, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/3/300/300' },
    { id: 103, name: 'HAVIT HV-G92 Gamepad', price: 560, rating: 4.5, reviews: 88, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/1/300/300' },
    { id: 104, name: 'AK-900 Wired Keyboard', price: 200, rating: 4.8, reviews: 75, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/2/300/300' },
  ];

  const handleAddToCart = async (product) => {
    setAddingItems(prev => ({ ...prev, [product.id]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addToCart(product);
    setAddingItems(prev => ({ ...prev, [product.id]: false }));
    
    // Show success feedback
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up';
    toast.textContent = `${product.name} added to cart!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleMoveToBag = async (product) => {
    setMovingItems(prev => ({ ...prev, [product.id]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addToCart(product);
    removeFromWishlist(product.id);
    setMovingItems(prev => ({ ...prev, [product.id]: false }));
    
    // Show success feedback
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up';
    toast.textContent = `${product.name} moved to cart!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleRemoveItem = (productId, productName) => {
    removeFromWishlist(productId);
    
    // Show remove feedback
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-gray-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up';
    toast.textContent = `${productName} removed from wishlist`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleMoveAllToBag = () => {
    wishlistItems.forEach(item => {
      addToCart(item);
    });
    
    // Clear wishlist after moving all items
    wishlistItems.forEach(item => {
      removeFromWishlist(item.id);
    });
    
    // Show success feedback
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up';
    toast.textContent = `All ${wishlistCount} items moved to cart!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleAddRecommendedToCart = (product) => {
    addToCart(product);
    
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up';
    toast.textContent = `${product.name} added to cart!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        Account / <span className="text-black">Wishlist</span>
      </div>

      {/* Wishlist Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Wishlist ({wishlistCount})</h1>
        {wishlistCount > 0 && (
          <Button 
            variant="outline" 
            onClick={handleMoveAllToBag}
            className="hover:bg-red-500 hover:text-white transition-colors"
          >
            Move All To Bag
          </Button>
        )}
      </div>

      {/* Wishlist Items */}
      {wishlistCount === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8">Save your favorite items here to buy them later.</p>
          <Link to="/products">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {wishlistItems.map(product => (
              <div key={product.id} className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveItem(product.id, product.name)}
                  className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all hover:scale-110"
                  aria-label="Remove from wishlist"
                >
                  <span className="text-xl">✕</span>
                </button>

                {/* Product Image */}
                <Link to={`/product/${product.id}`}>
                  <div className="relative bg-gray-100 h-48 overflow-hidden">
                    <img
                      src={product.image || `https://picsum.photos/id/${product.id + 100}/300/300`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Stock Badge */}
                    {!product.inStock && (
                      <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 hover:text-red-500 transition-colors mb-2 line-clamp-2 min-h-[48px]">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
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

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMoveToBag(product)}
                      disabled={movingItems[product.id]}
                      className="flex-1 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {movingItems[product.id] ? (
                        <div className="flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        'Add To Cart'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Just For You Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-5 h-10 bg-red-500 rounded"></div>
                <h2 className="text-2xl font-bold">Just For You</h2>
              </div>
              <Link to="/products">
                <Button variant="outline">See All</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map(product => (
                <div key={product.id} className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Product Image */}
                  <Link to={`/product/${product.id}`}>
                    <div className="relative bg-gray-100 h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-gray-800 hover:text-red-500 transition-colors mb-2 line-clamp-2 min-h-[48px]">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-3">
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
                    <button
                      onClick={() => handleAddRecommendedToCart(product)}
                      disabled={addingItems[product.id]}
                      className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addingItems[product.id] ? (
                        <div className="flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        'Add To Cart'
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WishlistPage;