import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { 
  AccountSidebar, 
  StatsGrid, 
  ProfileSection, 
  AddressBookSection, 
  PaymentMethodsSection, 
  OrdersSection 
} from '../components/account';
import DeleteAccountModal from '../components/account/DeleteAccountModal';

const generateAddressId = () => `addr_${Math.random().toString(36).slice(2, 10)}`;

const AccountPage = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  // Profile form data - Load from localStorage
  const [profileData, setProfileData] = useState(() => {
    if (!storedCurrentUser) return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      bio: ''
    };

    const savedProfile = JSON.parse(localStorage.getItem(`userProfile_${storedCurrentUser.id}`));
    return savedProfile || {
      firstName: storedCurrentUser.firstName || '',
      lastName: storedCurrentUser.lastName || '',
      email: storedCurrentUser.email || '',
      phone: storedCurrentUser.phone || '',
      dateOfBirth: storedCurrentUser.dateOfBirth || '',
      gender: storedCurrentUser.gender || '',
      bio: storedCurrentUser.bio || ''
    };
  });

  // Address book data - Load from localStorage
  const [addresses, setAddresses] = useState(() => {
    if (!storedCurrentUser) return [];
    const savedAddresses = JSON.parse(localStorage.getItem(`userAddresses_${storedCurrentUser.id}`) || '[]');
    return Array.isArray(savedAddresses) ? savedAddresses : [];
  });
  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  });
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Payment methods - Load from localStorage
  const [paymentMethods, setPaymentMethods] = useState(() => {
    if (!storedCurrentUser) return [];
    const savedPayments = JSON.parse(localStorage.getItem(`userPayments_${storedCurrentUser.id}`) || '[]');
    return Array.isArray(savedPayments) ? savedPayments : [];
  });

  const [orders] = useState(() => {
    if (!storedCurrentUser) return [];
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (!Array.isArray(savedOrders)) return [];
    return savedOrders.filter(order => order.customer?.email === storedCurrentUser.email).reverse();
  });

  const [currentUser, setCurrentUser] = useState(storedCurrentUser);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      // Save profile to localStorage
      localStorage.setItem(`userProfile_${currentUser.id}`, JSON.stringify(profileData));
      
      // Update current user name if changed
      const updatedUser = {
        ...currentUser,
        name: `${profileData.firstName} ${profileData.lastName}`.trim(),
        phone: profileData.phone,
        dateOfBirth: profileData.dateOfBirth,
        gender: profileData.gender,
        bio: profileData.bio
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
    
    setIsEditing(false);
    showToast('Profile updated successfully!', 'success');
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddAddress = () => {
    if (newAddress.street && newAddress.city && newAddress.state && newAddress.zipCode) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (!currentUser) return;
      const address = {
        id: generateAddressId(),
        ...newAddress,
        isDefault: addresses.length === 0
      };
      
      const updatedAddresses = [...addresses, address];
      setAddresses(updatedAddresses);
      
      // Save to localStorage
      localStorage.setItem(`userAddresses_${currentUser.id}`, JSON.stringify(updatedAddresses));
      
      setNewAddress({
        type: 'Home',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
      });
      setShowAddressForm(false);
      showToast('Address added successfully!', 'success');
    }
  };

  const handleDeleteAddress = (id) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    setAddresses(updatedAddresses);
    localStorage.setItem(`userAddresses_${currentUser.id}`, JSON.stringify(updatedAddresses));
    showToast('Address deleted successfully!', 'info');
  };

  const handleSetDefaultAddress = (id) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    setAddresses(updatedAddresses);
    localStorage.setItem(`userAddresses_${currentUser.id}`, JSON.stringify(updatedAddresses));
    showToast('Default address updated!', 'success');
  };

  const handleAddPaymentMethod = () => {
    alert('Payment method integration would go here. In production, use Stripe or similar.');
  };

  const handleDeletePaymentMethod = (id) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    const updatedPayments = paymentMethods.filter(pm => pm.id !== id);
    setPaymentMethods(updatedPayments);
    localStorage.setItem(`userPayments_${currentUser.id}`, JSON.stringify(updatedPayments));
    showToast('Payment method removed!', 'info');
  };

  const handleSetDefaultPayment = (id) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    const updatedPayments = paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    }));
    setPaymentMethods(updatedPayments);
    localStorage.setItem(`userPayments_${currentUser.id}`, JSON.stringify(updatedPayments));
    showToast('Default payment method updated!', 'success');
  };

  const handleAccountDeleted = () => {
    // Additional cleanup if needed
    setShowDeleteModal(false);
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

  const getOrderStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Shipped': 'bg-purple-100 text-purple-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const stats = [
    { title: 'Total Orders', value: orders.length, icon: '📦', color: 'bg-blue-500' },
    { title: 'Wishlist Items', value: wishlistCount, icon: '❤️', color: 'bg-red-500' },
    { title: 'Cart Items', value: cartCount, icon: '🛒', color: 'bg-green-500' },
    { title: 'Total Spent', value: `$${orders.reduce((sum, order) => sum + (order.total || 0), 0).toFixed(2)}`, icon: '💰', color: 'bg-purple-500' }
  ];

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-6xl mb-4">👤</div>
        <h2 className="text-2xl font-bold mb-4">Please Login</h2>
        <p className="text-gray-500 mb-8">You need to be logged in to view your account.</p>
        <Link to="/login">
          <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">Go to Login</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        Home / <span className="text-black">My Account</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <AccountSidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          profileData={profileData}
          wishlistCount={wishlistCount}
          cartCount={cartCount}
        />

        {/* Main Content */}
        <div className="lg:w-3/4">
          <StatsGrid stats={stats} />

          {activeTab === 'profile' && (
            <>
              <ProfileSection
                isEditing={isEditing}
                profileData={profileData}
                onEditToggle={setIsEditing}
                onProfileChange={handleProfileChange}
                onProfileSave={handleProfileUpdate}
              />
              
              {/* Delete Account Button */}
              <div className="mt-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="font-semibold text-red-600 mb-1">Delete Account</h3>
                    <p className="text-sm text-gray-500">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="px-6 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'addresses' && (
            <AddressBookSection
              addresses={addresses}
              showForm={showAddressForm}
              onToggleForm={() => setShowAddressForm(!showAddressForm)}
              newAddress={newAddress}
              onAddressChange={(field, value) => setNewAddress(prev => ({ ...prev, [field]: value }))}
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

          {(activeTab === 'returns' || activeTab === 'cancellations') && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold mb-4">
                {activeTab === 'returns' ? 'My Returns' : 'My Cancellations'}
              </h2>
              <div className="text-center py-8">
                <p className="text-gray-500">No {activeTab} found</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onAccountDeleted={handleAccountDeleted}
      />
    </div>
  );
};

export default AccountPage;

// import React, { useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { useWishlist } from '../context/WishlistContext';
// import { 
//   AccountSidebar, 
//   StatsGrid, 
//   ProfileSection, 
//   AddressBookSection, 
//   PaymentMethodsSection, 
//   OrdersSection 
// } from '../components/account';

// const AccountPage = () => {
//   const { cartCount } = useCart();
//   const { wishlistCount } = useWishlist();
//   const [activeTab, setActiveTab] = useState('profile');
//   const [isEditing, setIsEditing] = useState(false);
  
//   // Address form state
//   const [newAddress, setNewAddress] = useState({
//     type: 'Home',
//     street: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     country: 'USA'
//   });
//   const [showAddressForm, setShowAddressForm] = useState(false);

//   // Payment methods - Load from localStorage
//   const idCounter = useRef(0);

//   const getInitialCurrentUser = () => {
//     try {
//       return JSON.parse(localStorage.getItem('currentUser'));
//     } catch {
//       return null;
//     }
//   };

//   const getInitialProfileData = (user) => {
//     if (!user) {
//       return {
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         dateOfBirth: '',
//         gender: '',
//         bio: ''
//       };
//     }

//     try {
//       const savedProfile = JSON.parse(localStorage.getItem(`userProfile_${user.id}`));
//       if (savedProfile) {
//         return savedProfile;
//       }
//     } catch {
//       // ignore parse errors and fallback to defaults
//     }

//     const nameParts = user.name ? user.name.split(' ') : ['', ''];
//     return {
//       firstName: nameParts[0] || '',
//       lastName: nameParts.slice(1).join(' ') || '',
//       email: user.email || '',
//       phone: user.phone || '',
//       dateOfBirth: user.dateOfBirth || '',
//       gender: user.gender || '',
//       bio: user.bio || ''
//     };
//   };

//   const getInitialAddresses = (user) => {
//     if (!user) {
//       return [];
//     }

//     try {
//       const savedAddresses = JSON.parse(localStorage.getItem(`userAddresses_${user.id}`));
//       if (savedAddresses && savedAddresses.length > 0) {
//         return savedAddresses;
//       }
//     } catch {
//       // ignore parse errors and fallback to defaults
//     }

//     const defaultAddresses = [
//       {
//         id: `addr_${Math.random().toString(36).substr(2, 9)}`,
//         type: 'Home',
//         street: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         country: 'USA',
//         isDefault: true
//       }
//     ];
//     localStorage.setItem(`userAddresses_${user.id}`, JSON.stringify(defaultAddresses));
//     return defaultAddresses;
//   };

//   const getInitialPaymentMethods = (user) => {
//     if (!user) {
//       return [];
//     }

//     try {
//       const savedPayments = JSON.parse(localStorage.getItem(`userPayments_${user.id}`));
//       if (savedPayments && savedPayments.length > 0) {
//         return savedPayments;
//       }
//     } catch {
//       // ignore parse errors and fallback to defaults
//     }

//     const defaultPayments = [
//       {
//         id: `pm_${Math.random().toString(36).substr(2, 9)}`,
//         type: 'Visa',
//         last4: '4242',
//         expiry: '12/25',
//         isDefault: true
//       }
//     ];
//     localStorage.setItem(`userPayments_${user.id}`, JSON.stringify(defaultPayments));
//     return defaultPayments;
//   };

//   const getInitialOrders = (user) => {
//     if (!user) {
//       return [];
//     }

//     try {
//       const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
//       return savedOrders.filter(order => order.customer?.email === user.email).reverse();
//     } catch {
//       return [];
//     }
//   };

//   const initialUser = getInitialCurrentUser();
//   const [currentUser] = useState(initialUser);
//   const [profileData, setProfileData] = useState(() => getInitialProfileData(initialUser));
//   const [addresses, setAddresses] = useState(() => getInitialAddresses(initialUser));
//   const [paymentMethods, setPaymentMethods] = useState(() => getInitialPaymentMethods(initialUser));
//   const [orders] = useState(() => getInitialOrders(initialUser));

//   const handleProfileUpdate = (e) => {
//     e.preventDefault();
    
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser) {
//       // Save profile to localStorage
//       localStorage.setItem(`userProfile_${currentUser.id}`, JSON.stringify(profileData));
      
//       // Update current user name if changed
//       const updatedUser = {
//         ...currentUser,
//         name: `${profileData.firstName} ${profileData.lastName}`.trim(),
//         phone: profileData.phone,
//         dateOfBirth: profileData.dateOfBirth,
//         gender: profileData.gender,
//         bio: profileData.bio
//       };
//       localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
//       // Update in users array
//       const users = JSON.parse(localStorage.getItem('users') || '[]');
//       const userIndex = users.findIndex(u => u.id === currentUser.id);
//       if (userIndex !== -1) {
//         users[userIndex] = updatedUser;
//         localStorage.setItem('users', JSON.stringify(users));
//       }
//     }
    
//     setIsEditing(false);
//     showToast('Profile updated successfully!', 'success');
//   };

//   const handleProfileChange = (field, value) => {
//     setProfileData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleAddAddress = () => {
//     if (newAddress.street && newAddress.city && newAddress.state && newAddress.zipCode) {
//       const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//       idCounter.current += 1;
//       const address = {
//         id: `addr_${idCounter.current}`,
//         ...newAddress,
//         isDefault: addresses.length === 0
//       };
      
//       const updatedAddresses = [...addresses, address];
//       setAddresses(updatedAddresses);
      
//       // Save to localStorage
//       localStorage.setItem(`userAddresses_${currentUser.id}`, JSON.stringify(updatedAddresses));
      
//       setNewAddress({
//         type: 'Home',
//         street: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         country: 'Egypt'
//       });
//       setShowAddressForm(false);
//       showToast('Address added successfully!', 'success');
//     }
//   };

//   const handleDeleteAddress = (id) => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     const updatedAddresses = addresses.filter(addr => addr.id !== id);
//     setAddresses(updatedAddresses);
//     localStorage.setItem(`userAddresses_${currentUser.id}`, JSON.stringify(updatedAddresses));
//     showToast('Address deleted successfully!', 'info');
//   };

//   const handleSetDefaultAddress = (id) => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     const updatedAddresses = addresses.map(addr => ({
//       ...addr,
//       isDefault: addr.id === id
//     }));
//     setAddresses(updatedAddresses);
//     localStorage.setItem(`userAddresses_${currentUser.id}`, JSON.stringify(updatedAddresses));
//     showToast('Default address updated!', 'success');
//   };

//   const handleAddPaymentMethod = () => {
//     alert('Payment method integration would go here. In production, use Stripe or similar.');
//   };

//   const handleDeletePaymentMethod = (id) => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     const updatedPayments = paymentMethods.filter(pm => pm.id !== id);
//     setPaymentMethods(updatedPayments);
//     localStorage.setItem(`userPayments_${currentUser.id}`, JSON.stringify(updatedPayments));
//     showToast('Payment method removed!', 'info');
//   };

//   const handleSetDefaultPayment = (id) => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     const updatedPayments = paymentMethods.map(pm => ({
//       ...pm,
//       isDefault: pm.id === id
//     }));
//     setPaymentMethods(updatedPayments);
//     localStorage.setItem(`userPayments_${currentUser.id}`, JSON.stringify(updatedPayments));
//     showToast('Default payment method updated!', 'success');
//   };

//   const showToast = (message, type = 'success') => {
//     const toast = document.createElement('div');
//     toast.className = `fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white ${
//       type === 'success' ? 'bg-green-500' : 'bg-blue-500'
//     } animate-slide-in`;
//     toast.textContent = message;
//     document.body.appendChild(toast);
//     setTimeout(() => toast.remove(), 3000);
//   };

//   const getOrderStatusColor = (status) => {
//     const colors = {
//       'Pending': 'bg-yellow-100 text-yellow-800',
//       'Processing': 'bg-blue-100 text-blue-800',
//       'Shipped': 'bg-purple-100 text-purple-800',
//       'Delivered': 'bg-green-100 text-green-800',
//       'Cancelled': 'bg-red-100 text-red-800'
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   const stats = [
//     { title: 'Total Orders', value: orders.length, icon: '📦', color: 'bg-blue-500' },
//     { title: 'Wishlist Items', value: wishlistCount, icon: '❤️', color: 'bg-red-500' },
//     { title: 'Cart Items', value: cartCount, icon: '🛒', color: 'bg-green-500' },
//     { title: 'Total Spent', value: `$${orders.reduce((sum, order) => sum + (order.total || 0), 0).toFixed(2)}`, icon: '💰', color: 'bg-purple-500' }
//   ];

//   if (!currentUser) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
//         <div className="text-6xl mb-4">👤</div>
//         <h2 className="text-2xl font-bold mb-4">Please Login</h2>
//         <p className="text-gray-500 mb-8">You need to be logged in to view your account.</p>
//         <Link to="/login">
//           <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">Go to Login</button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Breadcrumb */}
//       <div className="mb-6 text-sm text-gray-500">
//         Home / <span className="text-black">My Account</span>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Sidebar */}
//         <AccountSidebar 
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//           profileData={profileData}
//           wishlistCount={wishlistCount}
//           cartCount={cartCount}
//         />

//         {/* Main Content */}
//         <div className="lg:w-3/4">
//           <StatsGrid stats={stats} />

//           {activeTab === 'profile' && (
//             <ProfileSection
//               isEditing={isEditing}
//               profileData={profileData}
//               onEditToggle={setIsEditing}
//               onProfileChange={handleProfileChange}
//               onProfileSave={handleProfileUpdate}
//             />
//           )}

//           {activeTab === 'addresses' && (
//             <AddressBookSection
//               addresses={addresses}
//               showForm={showAddressForm}
//               onToggleForm={() => setShowAddressForm(!showAddressForm)}
//               newAddress={newAddress}
//               onAddressChange={(field, value) => setNewAddress(prev => ({ ...prev, [field]: value }))}
//               onSaveAddress={handleAddAddress}
//               onDeleteAddress={handleDeleteAddress}
//               onSetDefaultAddress={handleSetDefaultAddress}
//             />
//           )}

//           {activeTab === 'payments' && (
//             <PaymentMethodsSection
//               paymentMethods={paymentMethods}
//               onAddPaymentMethod={handleAddPaymentMethod}
//               onDeletePaymentMethod={handleDeletePaymentMethod}
//               onSetDefaultPayment={handleSetDefaultPayment}
//             />
//           )}

//           {activeTab === 'orders' && (
//             <OrdersSection orders={orders} getOrderStatusColor={getOrderStatusColor} />
//           )}

//           {(activeTab === 'returns' || activeTab === 'cancellations') && (
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               <h2 className="text-xl font-bold mb-4">
//                 {activeTab === 'returns' ? 'My Returns' : 'My Cancellations'}
//               </h2>
//               <div className="text-center py-8">
//                 <p className="text-gray-500">No {activeTab} found</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateX(100%);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
//         .animate-slide-in {
//           animation: slideIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AccountPage;