import Button from '../../components/Button';

const PaymentMethodsSection = ({ paymentMethods, onAddPaymentMethod, onDeletePaymentMethod, onSetDefaultPayment }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold">Payment Methods</h2>
      <Button variant="primary" onClick={onAddPaymentMethod}>
        + Add Payment Method
      </Button>
    </div>

    <div className="space-y-4">
      {paymentMethods.map((method) => (
        <div key={method.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💳</span>
              <div>
                <p className="font-semibold">{method.type} ending in {method.last4}</p>
                <p className="text-sm text-gray-500">Expires {method.expiry}</p>
              </div>
              {method.isDefault && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Default</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {!method.isDefault && (
                <button
                  type="button"
                  onClick={() => onSetDefaultPayment(method.id)}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Set as Default
                </button>
              )}
              <button
                type="button"
                onClick={() => onDeletePaymentMethod(method.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PaymentMethodsSection;
