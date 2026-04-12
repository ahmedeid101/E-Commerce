import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const OrdersSection = ({ orders, getOrderStatusColor }) => (
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
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-sm text-gray-500">Order #{order.orderNumber}</p>
                <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getOrderStatusColor(order.status)}`}>
                {order.status}
              </span>
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
);

export default OrdersSection;
