import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import DiscountBadge from './DiscountBadge';
import WishlistButton from './WishlistButton';
import ProductImage from './ProductImage';
import { Rating } from '../wishlist';
import { calculateDiscount, getProductImage } from '../../utils/productHelpers';

/**
 * ProductCard - Displays a product with image, details, and action buttons
 * @param {Object} product - Product data
 * @param {boolean} showAddToCart - Whether to show the add to cart button (default: true)
 */
const ProductCard = ({ product, showAddToCart = true }) => {
  const { addToCart } = useCart();

  // Calculate discount percentage
  const discount = product.discount || calculateDiscount(product.originalPrice, product.price);
  const imageUrl = getProductImage(product);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Discount Badge */}
      <DiscountBadge discount={discount} />

      {/* Wishlist Button */}
      <WishlistButton product={product} />

      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <ProductImage src={imageUrl} alt={product.name} />
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
            <span className="text-gray-400 line-through text-sm">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Rating */}
        <Rating rating={product.rating} reviews={product.reviews} className="mb-3" />

        {/* Add to Cart Button */}
        {showAddToCart && (
          <button
            onClick={handleAddToCart}
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
