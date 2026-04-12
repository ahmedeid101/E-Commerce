import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { showToast } from '../utils/toast';
import { initialProfileData, initialNewAddress, getOrderStatusColor } from '../utils/accountHelpers';
import {
  AccountSidebar,
  StatsGrid,
  ProfileSection,
  AddressBookSection,
  PaymentMethodsSection,
  OrdersSection,
} from '../components/account';

const AccountPage = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    return savedOrders.reverse();
  });
  const [profileData, setProfileData] = useState(initialProfileData);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Work',
      street: '456 Business Ave',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      country: 'USA',
      isDefault: false,
    },
  ]);
  const [newAddress, setNewAddress] = useState(initialNewAddress);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '5555',
      expiry: '08/24',
      isDefault: false,
    },
  ]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddAddress = () => {
    const { street, city, state, zipCode } = newAddress;
    if (!street || !city || !state || !zipCode) {
      showToast('Please fill every required address field.', 'warning');
      return;
    }

    const address = {
      id: Date.now(),
      ...newAddress,
      isDefault: addresses.length === 0,
    };

    setAddresses((prev) => [...prev, address]);
    setNewAddress(initialNewAddress);
    setShowAddressForm(false);
    showToast('Address added successfully!', 'success');
  };

  const handleDeleteAddress = (id) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    );
  };

  const handleAddPaymentMethod = () => {
    showToast('Payment method integration would go here.', 'info');
  };

  const handleDeletePaymentMethod = (id) => {
    setPaymentMethods((prev) => prev.filter((method) => method.id !== id));
  };

  const handleSetDefaultPayment = (id) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
  };

  const statsCards = [
    { title: 'Total Orders', value: orders.length, icon: '📦', color: 'bg-blue-500' },
    { title: 'Wishlist Items', value: wishlistCount, icon: '❤️', color: 'bg-red-500' },
    { title: 'Cart Items', value: cartCount, icon: '🛒', color: 'bg-green-500' },
    { title: 'Total Spent', value: `$${orders.reduce((sum, order) => sum + (order.total || 0), 0).toFixed(2)}`, icon: '💰', color: 'bg-purple-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 text-sm text-gray-500">
        Home / <span className="text-black">My Account</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <AccountSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          profileData={profileData}
          wishlistCount={wishlistCount}
          cartCount={cartCount}
        />

        <div className="lg:w-3/4">
          <StatsGrid stats={statsCards} />

          {activeTab === 'profile' && (
            <ProfileSection
              isEditing={isEditing}
              profileData={profileData}
              onEditToggle={setIsEditing}
              onProfileChange={handleProfileChange}
              onProfileSave={handleProfileUpdate}
            />
          )}

          {activeTab === 'addresses' && (
            <AddressBookSection
              addresses={addresses}
              showForm={showAddressForm}
              onToggleForm={() => setShowAddressForm((prev) => !prev)}
              newAddress={newAddress}
              onAddressChange={(key, value) => setNewAddress((prev) => ({ ...prev, [key]: value }))}
              onSaveAddress={handleAddAddress}
              onDeleteAddress={handleDeleteAddress}
              onSetDefaultAddress={handleSetDefaultAddress}
            />
          )}

          {activeTab === 'payments' && (
            <PaymentMethodsSection
              paymentMethods={paymentMethods}
              onAddPaymentMethod={handleAddPaymentMethod}
              onDeletePaymentMethod={handleDeletePaymentMethod}
              onSetDefaultPayment={handleSetDefaultPayment}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersSection orders={orders} getOrderStatusColor={getOrderStatusColor} />
          )}

          {activeTab === 'returns' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">My Returns</h2>
              <div className="text-center py-8">
                <p className="text-gray-500">No active returns</p>
                <p className="text-sm text-gray-400 mt-2">You have 30 days to return items after delivery</p>
              </div>
            </div>
          )}

          {activeTab === 'cancellations' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">My Cancellations</h2>
              <div className="text-center py-8">
                <p className="text-gray-500">No cancelled orders</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
