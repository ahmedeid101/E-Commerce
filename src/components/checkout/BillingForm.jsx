const BillingForm = ({ formData, errors, onInputChange }) => (
  <div className="lg:w-2/3">
    <h2 className="text-2xl font-bold mb-6">Billing Details</h2>

    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField
          label="First Name"
          name="firstName"
          required
          value={formData.firstName}
          onChange={onInputChange}
          error={errors.firstName}
          placeholder="John"
        />

        <FormField
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={onInputChange}
          placeholder="Company (optional)"
        />
      </div>

      <FormField
        label="Street Address"
        name="streetAddress"
        required
        value={formData.streetAddress}
        onChange={onInputChange}
        error={errors.streetAddress}
        placeholder="House number and street name"
      />

      <FormField
        label="Apartment, floor, etc. (optional)"
        name="apartment"
        value={formData.apartment}
        onChange={onInputChange}
        placeholder="Apartment, suite, unit, etc."
      />

      <FormField
        label="Town/City"
        name="townCity"
        required
        value={formData.townCity}
        onChange={onInputChange}
        error={errors.townCity}
        placeholder="New York"
      />

      <FormField
        label="Phone Number"
        name="phoneNumber"
        type="tel"
        required
        value={formData.phoneNumber}
        onChange={onInputChange}
        error={errors.phoneNumber}
        placeholder="+1 234 567 8900"
      />

      <FormField
        label="Email Address"
        name="emailAddress"
        type="email"
        required
        value={formData.emailAddress}
        onChange={onInputChange}
        error={errors.emailAddress}
        placeholder="john@example.com"
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          name="saveInfo"
          checked={formData.saveInfo}
          onChange={onInputChange}
          className="w-4 h-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
          id="saveInfo"
        />
        <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-600">
          Save this information for faster check-out next time
        </label>
      </div>
    </div>
  </div>
);

const FormField = ({ label, name, type = 'text', value, onChange, error, placeholder, required = false }) => (
  <div>
    <label className="block text-sm font-medium mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
    />
    {error && <p className="error-message text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default BillingForm;
