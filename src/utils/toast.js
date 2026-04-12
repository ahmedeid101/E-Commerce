export const showToast = (message, type = 'success') => {
  const toast = document.createElement('div');
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-gray-500',
    warning: 'bg-yellow-500',
  }[type] || 'bg-green-500';

  toast.className = `fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white ${bgColor} animate-slide-in`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

// Add this to your global CSS or component
export const toastStyles = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .animate-slide-in {
    animation: slideIn 0.3s ease-out;
  }
`;