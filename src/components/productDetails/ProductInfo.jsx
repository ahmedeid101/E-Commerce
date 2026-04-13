import React from 'react';
import { FaTruck, FaUndo, FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import RatingStars from './RatingStars';

const ProductInfo = ({
  product,
  selectedColor,
  selectedSize,
  quantity,
  colors,
  sizes,
  onColorSelect,
  onSizeSelect,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  onWishlistToggle,
  isWishlisted,
  onOpenSizeGuide,
  addingToCart,
}) => (
  <div className="lg:w-1/2">
    <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

    <div className="flex items-center gap-3 mb-4">
      <RatingStars rating={product.rating} />
      <span className="text-gray-500">({product.reviews} Reviews)</span>
      <span className={`text-sm font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
        {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
      </span>
    </div>

    <div className="mb-4">
      <span className="text-3xl font-bold text-red-500">${product.price}</span>
      {product.originalPrice && (
        <span className="text-gray-400 line-through text-xl ml-3">${product.originalPrice}</span>
      )}
    </div>

    <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

    <ProductOptionGroup title="Colours:" actionLabel="Size Guide" onActionClick={onOpenSizeGuide}>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onColorSelect(color.name)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              selectedColor === color.name ? 'border-black scale-110' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color.code, border: color.code === '#FFFFFF' ? '1px solid #ddd' : 'none' }}
            title={color.name}
          />
        ))}
      </div>
    </ProductOptionGroup>

    <ProductOptionGroup title="Size:">
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onSizeSelect(size)}
            className={`w-12 h-10 rounded-md border transition-all ${
              selectedSize === size
                ? 'bg-red-500 text-white border-red-500'
                : 'border-gray-300 text-gray-700 hover:border-red-500'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </ProductOptionGroup>

    <div className="flex flex-wrap gap-4 mb-6">
      <QuantitySelector quantity={quantity} onChange={onQuantityChange} />

      <button
        onClick={onAddToCart}
        disabled={!product.inStock || addingToCart}
        className="bg-red-500 text-white px-8 py-2 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {addingToCart ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Adding...</span>
          </>
        ) : (
          <>
            <FaShoppingCart />
            <span>Add to Cart</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={onBuyNow}
        disabled={!product.inStock}
        className="bg-black text-white px-8 py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        Buy Now
      </button>

      <button
        type="button"
        onClick={onWishlistToggle}
        className="border border-gray-300 p-2 rounded-md hover:border-red-500 transition-colors"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500 text-xl" />
        ) : (
          <FaRegHeart className="text-gray-600 text-xl hover:text-red-500 transition-colors" />
        )}
      </button>
    </div>

    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <DeliveryItem icon={<FaTruck className="text-gray-600 text-xl mt-1" />} title="Free Delivery" description="Enter your postal code for Delivery Availability" />
      <DeliveryItem icon={<FaUndo className="text-gray-600 text-xl mt-1" />} title="Return Delivery" description="Free 30 Days Delivery Returns. " linkText="Details" />
    </div>
  </div>
);

const ProductOptionGroup = ({ title, actionLabel, onActionClick, children }) => (
  <div className="mb-6">
    <div className="flex items-center justify-between mb-2">
      <span className="font-semibold">{title}</span>
      {actionLabel && (
        <button type="button" onClick={onActionClick} className="text-sm text-red-500 hover:underline">
          {actionLabel}
        </button>
      )}
    </div>
    {children}
  </div>
);

const QuantitySelector = ({ quantity, onChange }) => (
  <div className="flex items-center border border-gray-300 rounded-md">
    <button
      type="button"
      onClick={() => onChange('decrease')}
      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
    >
      -
    </button>
    <span className="w-12 text-center font-medium">{quantity}</span>
    <button
      type="button"
      onClick={() => onChange('increase')}
      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
    >
      +
    </button>
  </div>
);

const DeliveryItem = ({ icon, title, description, linkText }) => (
  <div className="flex items-start gap-3">
    {icon}
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-500">
        {description}
        {linkText && <button type="button" className="text-red-500 hover:underline">{linkText}</button>}
      </p>
    </div>
  </div>
);

export default ProductInfo;
