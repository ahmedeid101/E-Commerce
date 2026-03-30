// pages/CheckoutPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    townCity: '',
    phoneNumber: '',
    emailAddress: '',
    saveInfo: false
  });
  
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [errors, setErrors] = useState({});

  // Calculate totals
  const subtotal = cartTotal;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping - discount;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!formData.townCity.trim()) newErrors.townCity = 'Town/City is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.emailAddress.trim()) newErrors.emailAddress = 'Email address is required';
    if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) newErrors.emailAddress = 'Email is invalid';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyCoupon = () => {
    // Mock coupon validation
    if (couponCode.toUpperCase() === 'SAVE10') {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
      setCouponApplied(true);
      alert('Coupon applied successfully! 10% discount added.');
    } else if (couponCode.toUpperCase() === 'SAVE20') {
      const discountAmount = subtotal * 0.2;
      setDiscount(discountAmount);
      setCouponApplied(true);
      alert('Coupon applied successfully! 20% discount added.');
    } else if (couponCode === '') {
      alert('Please enter a coupon code');
    } else {
      alert('Invalid coupon code. Try SAVE10 or SAVE20');
    }
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setCouponApplied(false);
    setCouponCode('');
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checkout.');
      navigate('/products');
      return;
    }

    // Create order object
    const order = {
      id: Date.now(),
      orderNumber: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString(),
      customer: {
        firstName: formData.firstName,
        companyName: formData.companyName,
        streetAddress: formData.streetAddress,
        apartment: formData.apartment,
        townCity: formData.townCity,
        phoneNumber: formData.phoneNumber,
        emailAddress: formData.emailAddress
      },
      items: cartItems,
      paymentMethod: paymentMethod,
      subtotal: subtotal,
      shipping: shipping,
      discount: discount,
      total: total,
      couponApplied: couponApplied ? couponCode : null
    };

    // Save order to localStorage (for order history)
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    // Clear cart
    clearCart();
    
    // Show success message and redirect
    alert(`Order placed successfully!\nOrder Number: ${order.orderNumber}\nTotal: $${total.toFixed(2)}\n\nWe'll send a confirmation email to ${formData.emailAddress}`);
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some items to your cart before checking out.</p>
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
        Account / My Account / Product / View Cart / <span className="text-black">CheckOut</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Billing Details Form */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
          
          <form onSubmit={handlePlaceOrder} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                  placeholder="John"
                />
                {errors.firstName && <p className="error-message text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Company (optional)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${errors.streetAddress ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                placeholder="House number and street name"
              />
              {errors.streetAddress && <p className="error-message text-red-500 text-xs mt-1">{errors.streetAddress}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Apartment, floor, etc. (optional)</label>
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Apartment, suite, unit, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Town/City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="townCity"
                value={formData.townCity}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${errors.townCity ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                placeholder="New York"
              />
              {errors.townCity && <p className="error-message text-red-500 text-xs mt-1">{errors.townCity}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                placeholder="+1 234 567 8900"
              />
              {errors.phoneNumber && <p className="error-message text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${errors.emailAddress ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                placeholder="john@example.com"
              />
              {errors.emailAddress && <p className="error-message text-red-500 text-xs mt-1">{errors.emailAddress}</p>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleInputChange}
                className="w-4 h-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-600">
                Save this information for faster check-out next time
              </label>
            </div>

            {/* Payment Method */}
            <div className="border-t pt-6 mt-6">
              <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
              
              <div className="space-y-3">
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-red-500"
                  />
                  <span className="ml-3 flex-1">Bank Transfer</span>
                  <div className="flex space-x-2">
                    <span className="text-2xl">💳</span>
                    <span className="text-2xl">💵</span>
                  </div>
                </label>
                
                <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-red-500"
                  />
                  <span className="ml-3 flex-1">Cash on delivery</span>
                  <span className="text-2xl">💵</span>
                </label>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="border-t pt-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                />
                {!couponApplied ? (
                  <Button type="button" variant="primary" onClick={handleApplyCoupon}>
                    Apply Coupon
                  </Button>
                ) : (
                  <Button type="button" variant="outline" onClick={handleRemoveCoupon}>
                    Remove
                  </Button>
                )}
              </div>
              {couponApplied && (
                <p className="text-green-600 text-sm mt-2">
                  ✓ Coupon applied! You saved ${discount.toFixed(2)}
                </p>
              )}
              <p className="text-gray-500 text-xs mt-2">
                Available coupons: SAVE10 (10% off), SAVE20 (20% off)
              </p>
            </div>

            {/* Place Order Button */}
            <div className="pt-4">
              <Button type="submit" variant="primary" className="w-full md:w-auto px-8 py-3 text-lg">
                Place Order
              </Button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h3 className="font-bold text-xl mb-4">Your Order</h3>
            
            {/* Order Items */}
            <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={item.image || `https://picsum.photos/id/${item.id + 100}/50/50`} 
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between pt-3 border-t text-lg font-bold">
                <span>Total:</span>
                <span className="text-red-500">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mt-4 pt-4 border-t text-sm text-gray-500">
              <p className="flex items-center gap-2">
                <span>🚚</span> Free shipping on orders over $100
              </p>
              <p className="flex items-center gap-2 mt-2">
                <span>🔄</span> Free 30 Days Delivery Returns
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;