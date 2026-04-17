// components/account/DeleteAccountModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaTrash, FaTimes } from 'react-icons/fa';

const DeleteAccountModal = ({ isOpen, onClose, onAccountDeleted }) => {
  const [step, setStep] = useState(1); // 1: confirmation, 2: password verification
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClose = () => {
    setStep(1);
    setPassword('');
    setError('');
    setConfirmText('');
    onClose();
  };

  const handleConfirmDelete = () => {
    if (confirmText !== 'DELETE') {
      setError('Please type DELETE to confirm');
      return;
    }
    setStep(2);
    setError('');
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
      setError('User not found');
      setIsLoading(false);
      return;
    }

    // For email users, verify password
    if (currentUser.authProvider === 'email') {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.id === currentUser.id);
      
      if (!user || user.password !== password) {
        setError('Incorrect password. Please try again.');
        setIsLoading(false);
        return;
      }
    }

    // Delete user data
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.filter(u => u.id !== currentUser.id);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Delete user-specific data
    localStorage.removeItem(`userProfile_${currentUser.id}`);
    localStorage.removeItem(`userAddresses_${currentUser.id}`);
    localStorage.removeItem(`userPayments_${currentUser.id}`);
    
    // Clear cart and wishlist for this user
    localStorage.setItem('cart', JSON.stringify([]));
    localStorage.setItem('wishlist', JSON.stringify([]));
    
    // Clear session
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');

    setIsLoading(false);
    
    // Show success message
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white bg-green-500 animate-slide-in';
    toast.textContent = 'Account deleted successfully. We are sad to see you go!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);

    if (onAccountDeleted) {
      onAccountDeleted();
    }
    
    // Redirect to home page after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="text-red-500 text-xl" />
            </div>
            <h2 className="text-xl font-bold">Delete Account</h2>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 1 && (
            <>
              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  <strong>Warning:</strong> This action cannot be undone.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-3">
                  <li>Your profile information will be permanently deleted</li>
                  <li>All your addresses will be removed</li>
                  <li>Your order history will be erased</li>
                  <li>Your wishlist and cart will be cleared</li>
                  <li>You will lose access to your account</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700 text-sm">
                  To confirm, please type <strong className="uppercase">DELETE</strong> in the field below.
                </p>
                <input
                  type="text"
                  placeholder="Type DELETE to confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Please enter your password to confirm account deletion.
                </p>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  autoFocus
                />
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={step === 1 ? handleConfirmDelete : handleDeleteAccount}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <FaTrash />
                <span>{step === 1 ? 'Confirm Delete' : 'Delete Permanently'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;