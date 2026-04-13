// pages/MyCancellationsPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUndo, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import Button from '../components/Button';

const getRandomRefundStatus = () => {
  const statuses = ['Processing', 'Approved', 'Completed'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getInitialCancellations = () => {
  try {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    return savedOrders
      .filter(order => order.status === 'Cancelled')
      .map(order => ({
        ...order,
        cancellationDate: order.cancellationDate || new Date().toISOString(),
        refundStatus: order.refundStatus || getRandomRefundStatus(),
        refundAmount: order.total,
        cancellationReason: order.cancellationReason || 'Customer requested cancellation'
      }))
      .reverse();
  } catch {
    return [];
  }
};

const MyCancellationsPage = () => {
  const [cancellations] = useState(getInitialCancellations);
  const [loading] = useState(false);
  const [selectedCancellation, setSelectedCancellation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const getRefundStatusColor = (status) => {
    const colors = {
      'Processing': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getRefundStatusIcon = (status) => {
    const icons = {
      'Processing': '⏳',
      'Approved': '✓',
      'Completed': '✅'
    };
    return icons[status] || '🔄';
  };

  const handleViewDetails = (cancellation) => {
    setSelectedCancellation(cancellation);
    setShowDetails(true);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        Account / <span className="text-black">My Cancellations</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Cancellations</h1>
        <p className="text-gray-500 mt-1">View and track your cancelled orders and refunds</p>
      </div>

      {/* Cancellations List */}
      {cancellations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-semibold mb-2">No cancelled orders</h3>
          <p className="text-gray-500 mb-6">You haven't cancelled any orders yet.</p>
          <Link to="/products">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cancellations.map(cancellation => (
            <div key={cancellation.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex flex-wrap justify-between items-start gap-3">
                  {/* Left Section */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-semibold text-gray-700">Order #{cancellation.orderNumber}</span>
                      <span className="text-xs text-gray-400">{new Date(cancellation.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="text-gray-600">
                        {cancellation.items?.length} item{cancellation.items?.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">Total: ${cancellation.total?.toFixed(2)}</span>
                    </div>
                    {cancellation.items && cancellation.items[0] && (
                      <div className="mt-2 flex items-center gap-2">
                        <img 
                          src={cancellation.items[0].image} 
                          alt={cancellation.items[0].name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span className="text-sm text-gray-500">
                          {cancellation.items[0].name}
                          {cancellation.items.length > 1 && ` +${cancellation.items.length - 1} more`}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Right Section */}
                  <div className="text-right">
                    <div className="mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getRefundStatusColor(cancellation.refundStatus)}`}>
                        {getRefundStatusIcon(cancellation.refundStatus)} Refund {cancellation.refundStatus}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Cancelled: {new Date(cancellation.cancellationDate).toLocaleDateString()}
                    </p>
                    <button
                      onClick={() => handleViewDetails(cancellation)}
                      className="mt-2 text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
                    >
                      <FaInfoCircle /> View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancellation Details Modal */}
      {showDetails && selectedCancellation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetails(false)}>
          <div className="bg-white rounded-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Cancellation Details</h2>
              <button onClick={() => setShowDetails(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">❌</div>
                <h3 className="font-semibold text-lg">Order Cancelled</h3>
                <p className="text-sm text-gray-500">Order #{selectedCancellation.orderNumber}</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Cancellation Date:</span>
                  <span className="font-medium">{new Date(selectedCancellation.cancellationDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Refund Status:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getRefundStatusColor(selectedCancellation.refundStatus)}`}>
                    {selectedCancellation.refundStatus}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Refund Amount:</span>
                  <span className="font-bold text-green-600">${selectedCancellation.refundAmount?.toFixed(2)}</span>
                </div>
                <div className="py-2 border-b">
                  <span className="text-gray-600">Cancellation Reason:</span>
                  <p className="mt-1 text-gray-800">{selectedCancellation.cancellationReason}</p>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <FaCheckCircle className="inline mr-1" /> Refund will be processed within 5-7 business days to your original payment method.
                </p>
              </div>
              
              <button
                onClick={() => setShowDetails(false)}
                className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCancellationsPage;