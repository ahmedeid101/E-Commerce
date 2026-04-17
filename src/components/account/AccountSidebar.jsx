import { Link } from 'react-router-dom';

const tabs = [
  { key: 'profile', icon: '👤', label: 'My Profile' },
  { key: 'addresses', icon: '📮', label: 'Address Book' },
  { key: 'payments', icon: '💳', label: 'My Payment Options' },
  { key: 'orders', icon: '📋', label: 'My Orders' },
  { key: 'returns', icon: '🔄', label: 'My Returns' },
  { key: 'cancellations', icon: '❌', label: 'My Cancellations' },
];

const AccountSidebar = ({ activeTab, onTabChange, profileData = {}, wishlistCount = 0, cartCount = 0 }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const profilePicture = currentUser?.picture || null;
  const fullName = [profileData.firstName, profileData.lastName].filter(Boolean).join(' ') || 'User';
  const email = profileData.email || 'No email';

  // Get user initials for avatar
  const getInitials = () => {
    const firstInitial = profileData.firstName ? profileData.firstName[0] : '';
    const lastInitial = profileData.lastName ? profileData.lastName[0] : '';
    return (firstInitial + lastInitial).toUpperCase() || 'U';
  };

  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {/* Profile Picture or Initials */}
            {profilePicture ? (
              <img 
                src={profilePicture} 
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {getInitials()}
              </div>
            )}
            <div>
              <h3 className="font-semibold">
                {fullName}
              </h3>
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.key
                  ? 'bg-red-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.label}
            </button>
          ))}

          <Link
            to="/wishlist"
            className="block w-full text-left px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
          >
            ❤️ My Wishlist ({wishlistCount})
          </Link>

          <Link
            to="/cart"
            className="block w-full text-left px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
          >
            🛒 My Cart ({cartCount})
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default AccountSidebar;

// // components/account/AccountSidebar.jsx
// import { Link } from 'react-router-dom';
// import Button from '../../components/Button';

// const tabs = [
//   { key: 'profile', icon: '👤', label: 'My Profile' },
//   { key: 'addresses', icon: '📮', label: 'Address Book' },
//   { key: 'payments', icon: '💳', label: 'My Payment Options' },
//   { key: 'orders', icon: '📋', label: 'My Orders' },
//   { key: 'returns', icon: '🔄', label: 'My Returns' },
//   { key: 'cancellations', icon: '❌', label: 'My Cancellations' },
// ];

// const AccountSidebar = ({ activeTab, onTabChange, profileData, wishlistCount, cartCount }) => {
//   // Get user initials for avatar
//   const getInitials = () => {
//     const firstInitial = profileData.firstName ? profileData.firstName[0] : '';
//     const lastInitial = profileData.lastName ? profileData.lastName[0] : '';
//     return (firstInitial + lastInitial).toUpperCase() || 'U';
//   };

//   return (
//     <div className="lg:w-1/4">
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
//               {getInitials()}
//             </div>
//             <div>
//               <h3 className="font-semibold">
//                 {profileData.firstName} {profileData.lastName}
//               </h3>
//               <p className="text-sm text-gray-500">{profileData.email}</p>
//             </div>
//           </div>
//         </div>

//         <nav className="p-4 space-y-2">
//           {tabs.map((tab) => (
//             <button
//               key={tab.key}
//               type="button"
//               onClick={() => onTabChange(tab.key)}
//               className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
//                 activeTab === tab.key
//                   ? 'bg-red-500 text-white'
//                   : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <span className="mr-3">{tab.icon}</span>
//               {tab.label}
//             </button>
//           ))}

//           <Link to="/wishlist">
//             <button className="w-full text-left px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
//               ❤️ My Wishlist ({wishlistCount})
//             </button>
//           </Link>

//           <Link to="/cart">
//             <button className="w-full text-left px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-gray-100">
//               🛒 My Cart ({cartCount})
//             </button>
//           </Link>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default AccountSidebar;

