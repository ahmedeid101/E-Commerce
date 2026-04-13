import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaSearch, FaFilter, FaDownload, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Button from '../components/Button';

const getRandomStatus = () => {
  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const generateTrackingNumber = () => {
  return 'TRK' + Math.random().toString(36).substr(2, 8).toUpperCase();
};

const getEstimatedDelivery = () => {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date.toLocaleDateString();
};

const getInitialOrders = () => {
  try {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    return savedOrders.map(order => ({
      ...order,
      status: order.status || getRandomStatus(),
      trackingNumber: order.trackingNumber || generateTrackingNumber(),
      estimatedDelivery: order.estimatedDelivery || getEstimatedDelivery()
    })).reverse();
  } catch {
    return [];
  }
};

const MyOrdersPage = () => {
  const [orders, setOrders] = useState(getInitialOrders);
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Order status options
  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items?.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [searchTerm, statusFilter, orders]);

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Shipped': 'bg-purple-100 text-purple-800',
      'Delivered': 'bg-green-100 text-green-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'Pending': '⏳',
      'Processing': '⚙️',
      'Shipped': '🚚',
      'Delivered': '✅',
      'Cancelled': '❌'
    };
    return icons[status] || '📦';
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      );
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }
  };

  const handleReorder = (order) => {
    // Add all items from order to cart
    order.items.forEach(item => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
      } else {
        cart.push({ ...item, quantity: item.quantity || 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    });
    alert('Items added to cart!');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
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
        Account / <span className="text-black">My Orders</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <div className="flex gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          
          {/* Filter Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Count */}
      <div className="mb-4 text-sm text-gray-500">
        {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold mb-2">No orders found</h3>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <Link to="/products">
            <Button variant="primary">Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Order Header */}
              <div className="bg-gray-50 px-4 py-3 flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">Order #{order.orderNumber}</span>
                  <span className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </span>
                  <button
                    onClick={() => handleViewOrder(order)}
                    className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
                  >
                    <FaEye /> View Details
                  </button>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="p-4">
                <div className="space-y-3">
                  {order.items?.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <img 
                        src={item.image || `https://picsum.photos/id/${item.id + 100}/60/60`} 
                        alt={item.name} 
                        className="w-14 h-14 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                  {order.items?.length > 2 && (
                    <p className="text-sm text-gray-500">+{order.items.length - 2} more items</p>
                  )}
                </div>
                
                {/* Order Footer */}
                <div className="mt-4 pt-3 border-t flex flex-wrap justify-between items-center gap-3">
                  <div className="text-sm text-gray-500">
                    Total: <span className="font-bold text-lg text-red-500">${order.total?.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-3">
                    {order.status === 'Delivered' && (
                      <Link to={`/product/${order.items?.[0]?.id}`}>
                        <button className="px-4 py-1.5 border border-gray-300 rounded-md text-sm hover:border-red-500 hover:text-red-500 transition-colors">
                          Write a Review
                        </button>
                      </Link>
                    )}
                    {(order.status === 'Pending' || order.status === 'Processing') && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="px-4 py-1.5 border border-red-500 text-red-500 rounded-md text-sm hover:bg-red-500 hover:text-white transition-colors"
                      >
                        Cancel Order
                      </button>
                    )}
                    <button
                      onClick={() => handleReorder(order)}
                      className="px-4 py-1.5 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-colors"
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowOrderDetails(false)}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button onClick={() => setShowOrderDetails(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            
            <div className="p-6">
              {/* Order Info */}
              <div className="mb-6">
                <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
                <p><strong>Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.status)}`}>{selectedOrder.status}</span></p>
                {selectedOrder.trackingNumber && (
                  <p><strong>Tracking Number:</strong> {selectedOrder.trackingNumber}</p>
                )}
              </div>
              
              {/* Shipping Info */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <p className="text-gray-600">{selectedOrder.customer?.streetAddress}</p>
                <p className="text-gray-600">{selectedOrder.customer?.townCity}</p>
                <p className="text-gray-600">{selectedOrder.customer?.phoneNumber}</p>
              </div>
              
              {/* Order Items */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 py-2 border-b">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal:</span>
                  <span>${selectedOrder.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping:</span>
                  <span>{selectedOrder.shipping === 0 ? 'Free' : `$${selectedOrder.shipping?.toFixed(2)}`}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount:</span>
                    <span>-${selectedOrder.discount?.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t font-bold">
                  <span>Total:</span>
                  <span className="text-red-500">${selectedOrder.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;