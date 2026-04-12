import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { showToast } from '../utils/toast';
import Button from '../components/Button';
import {
  BillingForm,
  PaymentMethodSection,
  CouponSection,
  OrderSummary,
} from '../components/checkout';
import {
  initialCheckoutForm,
  validateCheckoutForm,
  applyCoupon,
  getShippingCost,
  calculateTotal,
  generateOrderNumber,
} from '../utils/checkoutHelpers';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialCheckoutForm);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [errors, setErrors] = useState({});

  const subtotal = cartTotal;
  const shipping = getShippingCost(subtotal);
  const total = calculateTotal({ subtotal, shipping, discount });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleApplyCoupon = () => {
    const result = applyCoupon(couponCode, subtotal);

    if (!result.applied) {
      showToast(result.message, 'error');
      return;
    }

    setDiscount(result.discount);
    setCouponApplied(true);
    showToast(result.message, 'success');
  };

  const handleRemoveCoupon = () => {
    setDiscount(0);
    setCouponApplied(false);
    setCouponCode('');
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const validationErrors = validateCheckoutForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    if (cartItems.length === 0) {
      showToast('Your cart is empty. Please add items before checkout.', 'error');
      navigate('/products');
      return;
    }

    const order = {
      id: Date.now(),
      orderNumber: generateOrderNumber(),
      date: new Date().toISOString(),
      customer: { ...formData },
      items: cartItems,
      paymentMethod,
      subtotal,
      shipping,
      discount,
      total,
      couponApplied: couponApplied ? couponCode : null,
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    clearCart();
    showToast(`Order placed successfully! Order Number: ${order.orderNumber}`, 'success');
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
      <div className="mb-6 text-sm text-gray-500">
        Account / My Account / Product / View Cart / <span className="text-black">CheckOut</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <form onSubmit={handlePlaceOrder} className="space-y-5">
            <BillingForm formData={formData} errors={errors} onInputChange={handleInputChange} />
            <PaymentMethodSection paymentMethod={paymentMethod} onChange={setPaymentMethod} />
            <CouponSection
              couponCode={couponCode}
              couponApplied={couponApplied}
              discount={discount}
              onCouponChange={setCouponCode}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
            />

            <div className="pt-4">
              <Button type="submit" variant="primary" className="w-full md:w-auto px-8 py-3 text-lg">
                Place Order
              </Button>
            </div>
          </form>
        </div>

        <OrderSummary
          cartItems={cartItems}
          subtotal={subtotal}
          shipping={shipping}
          discount={discount}
          total={total}
          couponApplied={couponApplied}
          onRemoveCoupon={handleRemoveCoupon}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;