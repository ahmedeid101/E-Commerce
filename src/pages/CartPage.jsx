import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from "../components/Button";

const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link to="/products">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 text-sm text-gray-500">
        Home / <span className="text-black">Cart</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full hidden md:table">
          <thead className="border-b">
            <tr>
              <th className="text-left py-4">Product</th>
              <th className="text-left py-4">Price</th>
              <th className="text-left py-4">Quantity</th>
              <th className="text-left py-4">Subtotal</th>
              <th className="text-left py-4"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </td>
                <td className="py-4">${item.price}</td>
                <td className="py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border rounded-md hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border rounded-md hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-4">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="py-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Cart Items */}
        <div className="md:hidden space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 border rounded-md hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 border rounded-md hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-sm text-gray-500">Subtotal</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
        <Link to="/products" className="w-full sm:w-auto">
          <Button
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-gray-300 
                bg-red-50 text-red-600 font-medium
                hover:bg-red-100 hover:shadow-sm
                transition-all duration-200"
          >
            ← Continue Shopping
          </Button>
        </Link>

        <Button
          onClick={clearCart}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-red-200
               bg-red-50 text-red-600 font-medium
               hover:bg-red-100 hover:shadow-sm
               transition-all duration-200"
        >
          🗑 Clear Cart
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-8 mt-12 items-start">
        {/* Coupon Section */}
        <div className="flex gap-4 w-full md:max-w-md">
          <input
            type="text"
            placeholder="Coupon Code"
            className="px-3 py-2 border rounded-md flex-1"
          />
          <Button variant="primary" className="whitespace-nowrap">
            Apply Coupon
          </Button>
        </div>

        {/* Cart Total */}
        <div className="w-full md:w-96 border rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">Cart Total</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between py-2 font-bold">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/checkout">
            <Button variant="primary" className="w-full mt-6">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
