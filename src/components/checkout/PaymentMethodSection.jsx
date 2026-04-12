import { paymentMethods } from '../../utils/checkoutHelpers';

const PaymentMethodSection = ({ paymentMethod, onChange }) => (
  <div className="border-t pt-6 mt-6">
    <h3 className="font-semibold text-lg mb-4">Payment Method</h3>

    <div className="space-y-3">
      {paymentMethods.map((method) => (
        <label
          key={method.value}
          className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50"
        >
          <input
            type="radio"
            name="paymentMethod"
            value={method.value}
            checked={paymentMethod === method.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-red-500"
          />
          <div className="ml-3 flex-1">
            <div className="flex items-center gap-2 font-medium">
              <span>{method.icon}</span>
              <span>{method.label}</span>
            </div>
            <p className="text-sm text-gray-500">{method.description}</p>
          </div>
        </label>
      ))}
    </div>
  </div>
);

export default PaymentMethodSection;
