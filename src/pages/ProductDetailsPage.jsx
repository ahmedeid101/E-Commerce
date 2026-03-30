import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaRegHeart, FaShoppingCart, FaTruck, FaUndo, FaCheck } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Button from '../components/Button';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Colors available
  const colors = [
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Red', code: '#FF0000' },
    { name: 'Blue', code: '#0000FF' },
    { name: 'Green', code: '#00FF00' },
  ];

  // Sizes available
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Fetch product details
  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock product data based on ID
    const mockProduct = {
      id: parseInt(id),
      name: id === '1' ? 'HAVIT HV-G92 Gamepad' : 
            id === '2' ? 'AK-900 Wired Keyboard' :
            id === '3' ? 'IPS LCD Gaming Monitor' :
            id === '4' ? 'S-Series Comfort Chair' :
            id === '5' ? 'The North Coat' :
            id === '6' ? 'Gucci Duffle Bag' :
            id === '7' ? 'RGB Liquid CPU Cooler' :
            'HAVIT HV-G92 Gamepad',
      price: 192,
      originalPrice: 250,
      rating: 4.5,
      reviews: 150,
      inStock: true,
      sku: `SKU-${id}${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      category: 'Electronics',
      brand: 'HAVIT',
      description: `PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal. Pressure sensitive. The controller skin is made of high quality vinyl material that provides excellent protection against scratches, dust, and fingerprints. The air channel adhesive ensures bubble-free installation and mess-free removal.`,
      features: [
        'High quality vinyl material',
        'Air channel adhesive for bubble-free installation',
        'Pressure sensitive for precise control',
        'Easy to apply and remove',
        'Protects against scratches and dust',
        'Compatible with PlayStation 5 controller'
      ],
      specifications: {
        'Brand': 'HAVIT',
        'Model': `HV-G${92 + parseInt(id)}`,
        'Compatibility': 'PlayStation 5',
        'Material': 'Premium Vinyl',
        'Weight': '50g',
        'Dimensions': '15 x 10 x 2 cm',
        'Warranty': '1 Year',
      },
      images: [
        `images/Read_HAVIT_HV-G92_Gamepad.png`,
        `images/Red_HAVIT_HV-G92_Gamepad-1.png`,
        `images/Red_HAVIT_HV-G92_Gamepad-2.png`,
        `images/Red_HAVIT_HV-G92_Gamepad-3.png`,
      ],
      reviews_list: [
        { id: 1, user: 'John D.', rating: 5, date: '2024-01-15', comment: 'Excellent product! Very satisfied with the quality.', helpful: 24 },
        { id: 2, user: 'Sarah M.', rating: 4, date: '2024-01-10', comment: 'Good quality, but a bit pricey.', helpful: 12 },
        { id: 3, user: 'Mike R.', rating: 5, date: '2024-01-05', comment: 'Fast shipping and great product!', helpful: 18 },
      ]
    };
    
    setProduct(mockProduct);
    setSelectedColor(colors[0].name);
    setSelectedSize(sizes[2]);
    
    // Fetch related products
    const related = [
      { id: 101, name: 'HAVIT HV-G92 Gamepad', price: 120, originalPrice: 160, rating: 4.5, reviews: 88, image: 'https://picsum.photos/id/101/300/300' },
      { id: 102, name: 'AK-900 Wired Keyboard', price: 960, originalPrice: 1160, rating: 4.8, reviews: 75, image: 'https://picsum.photos/id/102/300/300' },
      { id: 103, name: 'IPS LCD Gaming Monitor', price: 370, originalPrice: 400, rating: 4.6, reviews: 99, image: 'https://picsum.photos/id/103/300/300' },
      { id: 104, name: 'RGB Liquid CPU Cooler', price: 160, originalPrice: 170, rating: 4.5, reviews: 65, image: 'https://picsum.photos/id/104/300/300' },
    ];
    setRelatedProducts(related);
    setLoading(false);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addToCart({ ...product, quantity });
    setAddingToCart(false);
    
    // Show success toast
    showToast(`${product.name} added to cart!`, 'success');
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity });
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast(`${product.name} removed from wishlist`, 'info');
    } else {
      addToWishlist(product);
      showToast(`${product.name} added to wishlist`, 'success');
    }
  };

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white ${
      type === 'success' ? 'bg-green-500' : 'bg-blue-500'
    } animate-slide-in`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} className="text-yellow-400" />);
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="bg-gray-200 rounded-lg h-96"></div>
            </div>
            <div className="md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-8">The product you're looking for doesn't exist.</p>
        <Link to="/products">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-red-500">Home</Link> / 
        <Link to="/products" className="hover:text-red-500 mx-1">Products</Link> / 
        <span className="text-black"> {product.name}</span>
      </div>

      {/* Product Main Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-row lg:flex-col gap-3 order-2 lg:order-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-red-500' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 order-1 lg:order-2">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {renderRatingStars(product.rating)}
            </div>
            <span className="text-gray-500">({product.reviews} Reviews)</span>
            <span className={`text-sm font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
            </span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <span className="text-3xl font-bold text-red-500">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-xl ml-3">${product.originalPrice}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Colors */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Colours:</span>
              <button 
                onClick={() => setShowSizeGuide(true)}
                className="text-sm text-red-500 hover:underline"
              >
                Size Guide
              </button>
            </div>
            <div className="flex gap-3">
              {colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color.name ? 'border-black scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.code, border: color.code === '#FFFFFF' ? '1px solid #ddd' : 'none' }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <span className="font-semibold block mb-2">Size:</span>
            <div className="flex flex-wrap gap-3">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
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
          </div>

          {/* Quantity and Actions */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange('decrease')}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('increase')}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || addingToCart}
              className="bg-red-500 text-white px-8 py-2 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {addingToCart ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              disabled={!product.inStock}
              className="bg-black text-white px-8 py-2 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              Buy Now
            </button>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="border border-gray-300 p-2 rounded-md hover:border-red-500 transition-colors"
            >
              {isInWishlist(product.id) ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-gray-600 text-xl hover:text-red-500 transition-colors" />
              )}
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <FaTruck className="text-gray-600 text-xl mt-1" />
              <div>
                <p className="font-semibold">Free Delivery</p>
                <p className="text-sm text-gray-500">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FaUndo className="text-gray-600 text-xl mt-1" />
              <div>
                <p className="font-semibold">Return Delivery</p>
                <p className="text-sm text-gray-500">Free 30 Days Delivery Returns. <button className="text-red-500 hover:underline">Details</button></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200 flex gap-8">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 font-semibold transition-colors ${
              activeTab === 'description'
                ? 'border-b-2 border-red-500 text-red-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3 font-semibold transition-colors ${
              activeTab === 'features'
                ? 'border-b-2 border-red-500 text-red-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab('specifications')}
            className={`pb-3 font-semibold transition-colors ${
              activeTab === 'specifications'
                ? 'border-b-2 border-red-500 text-red-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 font-semibold transition-colors ${
              activeTab === 'reviews'
                ? 'border-b-2 border-red-500 text-red-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Reviews ({product.reviews})
          </button>
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              <p className="text-gray-600 leading-relaxed mt-4">
                This product is designed with the highest quality materials to ensure durability and long-lasting performance. 
                Whether you're a professional or a casual user, this product will meet your needs and exceed your expectations.
              </p>
            </div>
          )}

          {activeTab === 'features' && (
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <FaCheck className="text-green-500 mt-1" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex py-2 border-b border-gray-100">
                  <span className="w-1/3 font-semibold text-gray-700">{key}</span>
                  <span className="w-2/3 text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="text-4xl font-bold">{product.rating}</div>
                  <div>
                    <div className="flex">{renderRatingStars(product.rating)}</div>
                    <div className="text-sm text-gray-500">Based on {product.reviews} reviews</div>
                  </div>
                </div>
                <Button variant="primary">Write a Review</Button>
              </div>
              
              <div className="space-y-4">
                {product.reviews_list.map(review => (
                  <div key={review.id} className="border-b border-gray-100 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{review.user}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">{renderRatingStars(review.rating)}</div>
                          <span className="text-sm text-gray-400">{review.date}</span>
                        </div>
                      </div>
                      <button className="text-sm text-gray-400 hover:text-red-500">Helpful ({review.helpful})</button>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Items Section */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-10 bg-red-500 rounded"></div>
          <h2 className="text-2xl font-bold">Related Item</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map(related => (
            <Link to={`/product/${related.id}`} key={related.id} className="group">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative bg-gray-100 h-48 overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 hover:text-red-500 transition-colors mb-2 line-clamp-2">
                    {related.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-red-500 font-bold">${related.price}</span>
                    <span className="text-gray-400 line-through text-sm">${related.originalPrice}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(related.rating))}
                      {'☆'.repeat(5 - Math.floor(related.rating))}
                    </div>
                    <span className="text-gray-500 text-sm">({related.reviews})</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowSizeGuide(false)}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Size Guide</h3>
              <button onClick={() => setShowSizeGuide(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Size</th>
                    <th className="text-left py-2">Chest (in)</th>
                    <th className="text-left py-2">Waist (in)</th>
                    <th className="text-left py-2">Hip (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map(size => (
                    <tr key={size} className="border-b">
                      <td className="py-2 font-semibold">{size}</td>
                      <td className="py-2">{size === 'XS' ? '32-34' : size === 'S' ? '35-37' : size === 'M' ? '38-40' : size === 'L' ? '41-43' : size === 'XL' ? '44-46' : '47-49'}</td>
                      <td className="py-2">{size === 'XS' ? '26-28' : size === 'S' ? '29-31' : size === 'M' ? '32-34' : size === 'L' ? '35-37' : size === 'XL' ? '38-40' : '41-43'}</td>
                      <td className="py-2">{size === 'XS' ? '34-36' : size === 'S' ? '37-39' : size === 'M' ? '40-42' : size === 'L' ? '43-45' : size === 'XL' ? '46-48' : '49-51'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Tips: Measure your body circumference for best fit.</p>
            </div>
          </div>
        </div>
      )}

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsPage;