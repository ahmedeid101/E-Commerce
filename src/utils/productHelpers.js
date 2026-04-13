/**
 * Product utility functions for common calculations and operations
 */

export const mockProducts = [
      { id: 1, name: 'HAVIT HV-G92 Gamepad', price: 120, originalPrice: 160, rating: 4.5, reviews: 88, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/1/300/300' },
      { id: 2, name: 'AK-900 Wired Keyboard', price: 960, originalPrice: 1160, rating: 4.8, reviews: 75, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/2/300/300' },
      { id: 3, name: 'IPS LCD Gaming Monitor', price: 370, originalPrice: 400, rating: 4.6, reviews: 99, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/3/300/300' },
      { id: 4, name: 'S-Series Comfort Chair', price: 375, originalPrice: 400, rating: 4.7, reviews: 99, category: 'Furniture', inStock: true, image: 'https://picsum.photos/id/4/300/300' },
      { id: 5, name: 'The North Coat', price: 260, originalPrice: 360, rating: 4.5, reviews: 85, category: 'Fashion', inStock: true, image: 'https://picsum.photos/id/5/300/300' },
      { id: 6, name: 'Gucci Duffle Bag', price: 960, originalPrice: 1160, rating: 4.6, reviews: 86, category: 'Fashion', inStock: true, image: 'https://picsum.photos/id/6/300/300' },
      { id: 7, name: 'RGB Liquid CPU Cooler', price: 160, originalPrice: 170, rating: 4.5, reviews: 85, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/7/300/300' },
      { id: 8, name: 'Small BookSelf', price: 360, originalPrice: 360, rating: 4.5, reviews: 85, category: 'Furniture', inStock: true, image: 'https://picsum.photos/id/8/300/300' },
      { id: 9, name: 'Breed Dry Dog Food', price: 100, rating: 4.2, reviews: 35, category: 'Pets', inStock: true, image: 'https://picsum.photos/id/9/300/300' },
      { id: 10, name: 'CANON EOS DSLR Camera', price: 380, rating: 4.8, reviews: 85, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/10/300/300' },
      { id: 11, name: 'ASUS FHD Gaming Laptop', price: 700, rating: 4.7, reviews: 85, category: 'Electronics', inStock: true, image: 'https://picsum.photos/id/11/300/300' },
      { id: 12, name: 'Curology Product Set', price: 500, rating: 4.4, reviews: 145, category: 'Beauty', inStock: true, image: 'https://picsum.photos/id/12/300/300' },
];

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
