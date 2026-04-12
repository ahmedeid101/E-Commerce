import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const tabs = [
  { key: 'profile', icon: '👤', label: 'My Profile' },
  { key: 'addresses', icon: '📮', label: 'Address Book' },
  { key: 'payments', icon: '💳', label: 'My Payment Options' },
  { key: 'orders', icon: '📋', label: 'My Orders' },
  { key: 'returns', icon: '🔄', label: 'My Returns' },
  { key: 'cancellations', icon: '❌', label: 'My Cancellations' },
];

const AccountSidebar = ({ activeTab, onTabChange, profileData, wishlistCount, cartCount }) => {
  return (
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

          <Link to="/wishlist">
            <Button variant="outline" className="w-full justify-start text-left">
              ❤️ My Wishlist ({wishlistCount})
            </Button>
          </Link>

          <Link to="/cart">
            <Button variant="outline" className="w-full justify-start text-left">
              🛒 My Cart ({cartCount})
            </Button>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default AccountSidebar;
