/**
 * Product utility functions for common calculations and operations
 */

export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const getProductImage = (product) => {
  return product.image || `https://picsum.photos/id/${product.id + 100}/300/300`;
};

export const getProductPrice = (product) => {
  return {
    current: product.price,
    original: product.originalPrice,
    discount: product.discount || calculateDiscount(product.originalPrice, product.price),
  };
};
