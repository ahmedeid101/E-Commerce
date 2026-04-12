import Button from '../../components/Button';

const CouponSection = ({ couponCode, couponApplied, discount, onCouponChange, onApplyCoupon, onRemoveCoupon }) => (
  <div className="border-t pt-6">
    <div className="flex gap-3 flex-col sm:flex-row">
      <input
        type="text"
        placeholder="Coupon Code"
        value={couponCode}
        onChange={(e) => onCouponChange(e.target.value)}
        disabled={couponApplied}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
      />
      {!couponApplied ? (
        <Button type="button" variant="primary" onClick={onApplyCoupon}>
          Apply Coupon
        </Button>
      ) : (
        <Button type="button" variant="outline" onClick={onRemoveCoupon}>
          Remove
        </Button>
      )}
    </div>

    {couponApplied && (
      <p className="text-green-600 text-sm mt-2">✓ Coupon applied! You saved ${discount.toFixed(2)}</p>
    )}

    <p className="text-gray-500 text-xs mt-2">
      Available coupons: SAVE10 (10% off), SAVE20 (20% off)
    </p>
  </div>
);

export default CouponSection;
