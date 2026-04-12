import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { showToast } from '../utils/toast';
import {
  getMockProductById,
  getRelatedProducts,
  colors,
  sizes,
  getSizeGuideRows,
} from '../utils/productDetailsHelpers';
import {
  ProductGallery,
  ProductInfo,
  ProductTabs,
  RelatedProducts,
  SizeGuideModal,
  LoadingState,
  NotFoundState,
} from '../components/productDetails';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(colors[0].name);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockProduct = getMockProductById(id);
    setProduct(mockProduct);
    setSelectedColor(colors[0].name);
    setSelectedSize(sizes[2]);
    setSelectedImage(0);
    setRelatedProducts(getRelatedProducts());
    setLoading(false);
  };

  const handleQuantityChange = (type) => {
    setQuantity((current) => Math.max(1, type === 'increase' ? current + 1 : current - 1));
  };

  const handleAddToCart = async () => {
    if (!product?.inStock) return;

    setAddingToCart(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    addToCart({ ...product, quantity });
    setAddingToCart(false);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const handleBuyNow = () => {
    if (!product) return;

    addToCart({ ...product, quantity });
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    if (!product) return;

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast(`${product.name} removed from wishlist`, 'info');
    } else {
      addToWishlist(product);
      showToast(`${product.name} added to wishlist`, 'success');
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!product) {
    return <NotFoundState />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-red-500">
          Home
        </Link>{' '}
        /{' '}
        <Link to="/products" className="hover:text-red-500 mx-1">
          Products
        </Link>{' '}
        / <span className="text-black">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <ProductGallery
          images={product.images}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
          productName={product.name}
        />

        <ProductInfo
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          quantity={quantity}
          colors={colors}
          sizes={sizes}
          onColorSelect={setSelectedColor}
          onSizeSelect={setSelectedSize}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onWishlistToggle={handleWishlistToggle}
          isWishlisted={isInWishlist(product.id)}
          onOpenSizeGuide={() => setShowSizeGuide(true)}
          addingToCart={addingToCart}
        />
      </div>

      <ProductTabs activeTab={activeTab} onTabChange={setActiveTab} product={product} />

      <RelatedProducts products={relatedProducts} />

      <SizeGuideModal
        isOpen={showSizeGuide}
        sizes={sizes}
        onClose={() => setShowSizeGuide(false)}
        rows={getSizeGuideRows(sizes)}
      />
    </div>
  );
};

export default ProductDetailsPage;