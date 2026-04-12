export const initialCheckoutForm = {
  firstName: '',
  companyName: '',
  streetAddress: '',
  apartment: '',
  townCity: '',
  phoneNumber: '',
  emailAddress: '',
  saveInfo: false,
};

export const paymentMethods = [
  { value: 'bank', label: 'Bank Transfer', description: 'Pay via bank transfer', icon: '💳' },
  { value: 'cash', label: 'Cash on Delivery', description: 'Pay with cash when your order arrives', icon: '💵' },
];

export const getShippingCost = (subtotal) => (subtotal > 100 ? 0 : 15);

export const calculateTotal = ({ subtotal, shipping, discount }) => subtotal + shipping - discount;

export const formatCurrency = (amount) => amount.toFixed(2);

export const generateOrderNumber = () => `ORD-${Math.random().toString(36).slice(2, 11).toUpperCase()}`;

export const validateCheckoutForm = (formData) => {
  const errors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!formData.streetAddress.trim()) {
    errors.streetAddress = 'Street address is required';
  }

  if (!formData.townCity.trim()) {
    errors.townCity = 'Town/City is required';
  }

  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = 'Phone number is required';
  }

  if (!formData.emailAddress.trim()) {
    errors.emailAddress = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
    errors.emailAddress = 'Email is invalid';
  }

  return errors;
};

const couponRules = {
  SAVE10: 0.1,
  SAVE20: 0.2,
};

export const applyCoupon = (couponCode, subtotal) => {
  const code = couponCode.trim().toUpperCase();

  if (!code) {
    return { discount: 0, applied: false, message: 'Please enter a coupon code.' };
  }

  const discountRate = couponRules[code];

  if (!discountRate) {
    return { discount: 0, applied: false, message: 'Invalid coupon code. Try SAVE10 or SAVE20.' };
  }

  return {
    discount: subtotal * discountRate,
    applied: true,
    message: `Coupon applied successfully! ${discountRate * 100}% discount added.`,
  };
};
