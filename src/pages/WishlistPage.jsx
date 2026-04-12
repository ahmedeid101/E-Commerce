import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { showToast } from '../utils/toast';
import Button from '../components/Button';
import {
  WishlistProductCard,
  RecommendedProductCard,
  EmptyWishlist,
} from '../components/wishlist';
import { RECOMMENDED_PRODUCTS } from '../utils/mockData';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const [loadingItems, setLoadingItems] = useState({});
  // Handle async operation with loading state
  const executeAsyncAction = async (itemId, callback) => {
    setLoadingItems(prev => ({ ...prev, [itemId]: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      callback();
    } finally {
      setLoadingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  // Add single item from wishlist to cart
  const handleAddToCart = async (product) => {
    await executeAsyncAction(product.id, () => {
      addToCart(product);
      showToast(`${product.name} added to cart!`, 'success');
    });
  };

  // Move item from wishlist to cart
  const handleMoveToCart = async (product) => {
    await executeAsyncAction(product.id, () => {
      addToCart(product);
      removeFromWishlist(product.id);
      showToast(`${product.name} moved to cart!`, 'success');
    });
  };

  // Remove item from wishlist
  const handleRemoveFromWishlist = (productId, productName) => {
    removeFromWishlist(productId);
    showToast(`${productName} removed from wishlist`, 'info');
  };

  // Move all wishlist items to cart
  const handleMoveAllToCart = () => {
    wishlistItems.forEach(item => {
      addToCart(item);
      removeFromWishlist(item.id);
    });
    showToast(`All ${wishlistCount} items moved to cart!`, 'success');
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
            onClick={handleMoveAllToCart}
            className="hover:bg-red-500 hover:text-white transition-colors"
          >
            Move All To Bag
          </Button>
        )}
      </div>

      {/* Main Content */}
      {wishlistCount === 0 ? (
        <EmptyWishlist />
      ) : (
        <>
          {/* Wishlist Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {wishlistItems.map(product => (
              <WishlistProductCard
                key={product.id}
                product={product}
                isLoading={loadingItems[product.id]}
                onRemove={handleRemoveFromWishlist}
                onAddToCart={handleMoveToCart}
              />
            ))}
          </div>

          {/* Just For You Section */}
          <RecommendedSection
            products={RECOMMENDED_PRODUCTS}
            loadingItems={loadingItems}
            onAddToCart={handleAddToCart}
          />
        </>
      )}
    </div>
  );
};

/**
 * Recommended products section component
 */
const RecommendedSection = ({ products, loadingItems, onAddToCart }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-5 h-10 bg-red-500 rounded" />
          <h2 className="text-2xl font-bold">Just For You</h2>
        </div>
        <Link to="/products">
          <Button variant="outline">See All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <RecommendedProductCard
            key={product.id}
            product={product}
            isLoading={loadingItems[product.id]}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};


export default WishlistPage;