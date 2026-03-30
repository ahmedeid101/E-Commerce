import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Button from '../components/Button';

const AccountPage = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  
  // Profile form data
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    bio: 'Passionate shopper and tech enthusiast.'
  });

  // Address book data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      street: '456 Business Ave',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      country: 'USA',
      isDefault: false
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  });

  const [showAddressForm, setShowAddressForm] = useState(false);

  // Payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      last4: '5555',
      expiry: '08/24',
      isDefault: false
    }
  ]);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders.reverse()); // Show newest first
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // In real app, send to backend
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    toast.textContent = 'Profile updated successfully!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleAddAddress = () => {
    if (newAddress.street && newAddress.city && newAddress.state && newAddress.zipCode) {
      const address = {
        id: Date.now(),
        ...newAddress,
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, address]);
      setNewAddress({
        type: 'Home',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
      });
      setShowAddressForm(false);
      
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      toast.textContent = 'Address added successfully!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleAddPaymentMethod = () => {
    // In real app, open payment modal
    alert('Payment method integration would go here. In production, use Stripe or similar.');
  };

  const handleDeletePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
  };

  const handleSetDefaultPayment = (id) => {
    setPaymentMethods(paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
  };

  const getOrderStatusColor = (status) => {
    const statuses = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Shipped': 'bg-purple-100 text-purple-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return statuses[status] || 'bg-gray-100 text-gray-800';
  };

  const statsCards = [
    { title: 'Total Orders', value: orders.length, icon: '📦', color: 'bg-blue-500' },
    { title: 'Wishlist Items', value: wishlistCount, icon: '❤️', color: 'bg-red-500' },
    { title: 'Cart Items', value: cartCount, icon: '🛒', color: 'bg-green-500' },
    { title: 'Total Spent', value: `$${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}`, icon: '💰', color: 'bg-purple-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        Home / <span className="text-black">My Account</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </div>
                <div>
                  <h3 className="font-semibold">{profileData.firstName} {profileData.lastName}</h3>
                  <p className="text-sm text-gray-500">{profileData.email}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-4">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeTab === 'profile' 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">👤</span> My Profile
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeTab === 'addresses' 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">📮</span> Address Book
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeTab === 'payments' 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">💳</span> My Payment Options
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeTab === 'orders' 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">📋</span> My Orders
              </button>
              <button
                onClick={() => setActiveTab('returns')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeTab === 'returns' 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">🔄</span> My Returns
              </button>
              <button
                onClick={() => setActiveTab('cancellations')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeTab === 'cancellations' 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3">❌</span> My Cancellations
              </button>
              <Link to="/wishlist">
                <button className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                  <span className="mr-3">❤️</span> My WishList
                </button>
              </Link>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:w-3/4">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className={`${stat.color} w-8 h-8 rounded-full opacity-20`}></span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Profile Information</h2>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                )}
              </div>

              {!isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">First Name</label>
                      <p className="font-medium">{profileData.firstName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Last Name</label>
                      <p className="font-medium">{profileData.lastName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email Address</label>
                      <p className="font-medium">{profileData.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone Number</label>
                      <p className="font-medium">{profileData.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Date of Birth</label>
                      <p className="font-medium">{profileData.dateOfBirth}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Gender</label>
                      <p className="font-medium capitalize">{profileData.gender}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Bio</label>
                    <p className="font-medium">{profileData.bio}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name</label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email Address</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Gender</label>
                      <select
                        value={profileData.gender}
                        onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary">Save Changes</Button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Address Book Tab */}
          {activeTab === 'addresses' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Address Book</h2>
                <Button variant="primary" onClick={() => setShowAddressForm(!showAddressForm)}>
                  + Add New Address
                </Button>
              </div>

              {showAddressForm && (
                <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3">New Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Address Type (Home, Work, etc.)"
                      value={newAddress.type}
                      onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                      className="px-3 py-2 border rounded-md"
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                      className="px-3 py-2 border rounded-md"
                      required
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      className="px-3 py-2 border rounded-md"
                      required
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                      className="px-3 py-2 border rounded-md"
                      required
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                      className="px-3 py-2 border rounded-md"
                      required
                    />
                    <select
                      value={newAddress.country}
                      onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                      className="px-3 py-2 border rounded-md"
                    >
                      <option value="USA">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="UK">UK</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <Button variant="outline" onClick={() => setShowAddressForm(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleAddAddress}>Save Address</Button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {addresses.map(address => (
                  <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{address.type}</h3>
                          {address.isDefault && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Default</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{address.street}</p>
                        <p className="text-gray-600 text-sm">{address.city}, {address.state} {address.zipCode}</p>
                        <p className="text-gray-600 text-sm">{address.country}</p>
                      </div>
                      <div className="flex gap-2">
                        {!address.isDefault && (
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="text-blue-500 text-sm hover:underline"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-red-500 text-sm hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Options Tab */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Payment Methods</h2>
                <Button variant="primary" onClick={handleAddPaymentMethod}>
                  + Add Payment Method
                </Button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">
                          {method.type === 'Visa' ? '💳' : '💳'}
                        </span>
                        <div>
                          <p className="font-semibold">{method.type} ending in {method.last4}</p>
                          <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                        </div>
                        {method.isDefault && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-2">Default</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!method.isDefault && (
                          <button
                            onClick={() => handleSetDefaultPayment(method.id)}
                            className="text-blue-500 text-sm hover:underline"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePaymentMethod(method.id)}
                          className="text-red-500 text-sm hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-6">My Orders</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No orders yet</p>
                  <Link to="/products">
                    <Button variant="primary" className="mt-4">Start Shopping</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Order #{order.orderNumber}</p>
                          <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getOrderStatusColor('Delivered')}`}>
                            Delivered
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${order.total?.toFixed(2)}</p>
                          <button className="text-red-500 text-sm hover:underline">View Details</button>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="space-y-2">
                          {order.items?.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                              <div>
                                <p className="font-medium text-sm">{item.name}</p>
                                <p className="text-xs text-gray-500">Qty: {item.quantity} × ${item.price}</p>
                              </div>
                            </div>
                          ))}
                          {order.items?.length > 2 && (
                            <p className="text-sm text-gray-500">+{order.items.length - 2} more items</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Returns Tab */}
          {activeTab === 'returns' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">My Returns</h2>
              <div className="text-center py-8">
                <p className="text-gray-500">No active returns</p>
                <p className="text-sm text-gray-400 mt-2">You have 30 days to return items after delivery</p>
              </div>
            </div>
          )}

          {/* Cancellations Tab */}
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