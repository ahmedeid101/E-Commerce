import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useReadOnly = () => {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();

  const checkAction = (actionName) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      // Store the intended action
      localStorage.setItem('intendedAction', actionName);
      return false;
    }
    return true;
  };

  const closePrompt = () => {
    setShowLoginPrompt(false);
  };

  const redirectToLogin = () => {
    setShowLoginPrompt(false);
    navigate('/login');
  };

  const LoginPromptModal = () => {
    if (!showLoginPrompt) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h3 className="text-xl font-bold mb-2">Login Required</h3>
          <p className="text-gray-500 mb-6">
            Please login or create an account to perform this action.
          </p>
          <div className="flex gap-3">
            <button
              onClick={redirectToLogin}
              className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Login
            </button>
            <button
              onClick={closePrompt}
              className="flex-1 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Don't have an account? <button onClick={redirectToLogin} className="text-red-500">Register</button>
          </p>
        </div>
      </div>
    );
  };

  return { checkAction, LoginPromptModal, isLoggedIn };
};

export default useReadOnly;