import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { showToast } from '../../utils/toast';

const WishlistButton = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast('Removed from wishlist', 'info');
    } else {
      addToWishlist(product);
      showToast('Added to wishlist', 'success');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <span className="text-xl">{inWishlist ? '❤️' : '🤍'}</span>
    </button>
  );
};

export default WishlistButton;
