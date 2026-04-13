import { useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { showToast } from '../utils/toast';

/**
 * Custom hook to manage product cart and wishlist actions
 * Provides reusable handlers for adding to cart and toggling wishlist
 * @returns {Object} - { handleAddToCart, handleWishlistToggle }
 */
export const useProductActions = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  /**
   * Handle adding product to cart
   * @param {Object} product - Product to add
   * @param {Event} e - Optional event object (for preventing propagation)
   */
  const handleAddToCart = useCallback((product, e) => {
    if (e) {
      e.preventDefault?.();
      e.stopPropagation?.();
    }
    addToCart(product, 1);
    showToast(`${product.name} added to cart!`, 'success');
  }, [addToCart]);

  /**
   * Handle toggling product in wishlist
   * @param {Object} product - Product to toggle
   * @param {Event} e - Optional event object (for preventing propagation)
   */
  const handleWishlistToggle = useCallback((product, e) => {
    if (e) {
      e.preventDefault?.();
      e.stopPropagation?.();
    }
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast(`${product.name} removed from wishlist`, 'success');
    } else {
      addToWishlist(product);
      showToast(`${product.name} added to wishlist!`, 'success');
    }
  }, [addToWishlist, removeFromWishlist, isInWishlist]);

  return {
    handleAddToCart,
    handleWishlistToggle,
  };
};
