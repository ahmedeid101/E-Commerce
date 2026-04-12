const OrderSummary = ({ cartItems, subtotal, shipping, discount, total, couponApplied, onRemoveCoupon }) => (
  <div className="lg:w-1/3">
    <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
      <h3 className="font-bold text-xl mb-4">Your Order</h3>

      <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center space-x-3">
              <img
                src={item.image || `https://picsum.photos/id/${item.id + 100}/50/50`}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4 border-t">
        <SummaryRow label="Subtotal:" value={`$${subtotal.toFixed(2)}`} />
        <SummaryRow label="Shipping:" value={shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`} />

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount:</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between pt-3 border-t text-lg font-bold">
          <span>Total:</span>
          <span className="text-red-500">${total.toFixed(2)}</span>
        </div>

        {couponApplied && (
          <button
            type="button"
            onClick={onRemoveCoupon}
            className="text-sm text-blue-500 hover:underline"
          >
            Remove coupon
          </button>
        )}
      </div>

      <div className="mt-4 pt-4 border-t text-sm text-gray-500">
        <p className="flex items-center gap-2">
          <span>🚚</span> Free shipping on orders over $100
        </p>
        <p className="flex items-center gap-2 mt-2">
          <span>🔄</span> Free 30 Days Delivery Returns
        </p>
      </div>
    </div>
  </div>
);

const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between text-gray-600">
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default OrderSummary;
