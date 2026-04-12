import Button from '../../components/Button';

const AddressBookSection = ({
  addresses,
  showForm,
  onToggleForm,
  newAddress,
  onAddressChange,
  onSaveAddress,
  onDeleteAddress,
  onSetDefaultAddress,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-xl font-bold">Address Book</h2>
        <Button variant="primary" onClick={onToggleForm}>
          {showForm ? 'Close Form' : '+ Add New Address'}
        </Button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="font-semibold mb-3">New Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <TextInput value={newAddress.type} label="Address Type" placeholder="Home, Work, etc." onChange={(value) => onAddressChange('type', value)} />
            <TextInput value={newAddress.street} label="Street Address" placeholder="Street address" onChange={(value) => onAddressChange('street', value)} />
            <TextInput value={newAddress.city} label="City" placeholder="City" onChange={(value) => onAddressChange('city', value)} />
            <TextInput value={newAddress.state} label="State" placeholder="State" onChange={(value) => onAddressChange('state', value)} />
            <TextInput value={newAddress.zipCode} label="ZIP Code" placeholder="ZIP code" onChange={(value) => onAddressChange('zipCode', value)} />
            <SelectField
              label="Country"
              value={newAddress.country}
              onChange={(value) => onAddressChange('country', value)}
              options={[
                { value: 'USA', label: 'USA' },
                { value: 'Canada', label: 'Canada' },
                { value: 'UK', label: 'UK' },
              ]}
            />
          </div>
          <div className="flex justify-end gap-2 mt-3">
            <Button variant="outline" onClick={onToggleForm}>Cancel</Button>
            <Button variant="primary" onClick={onSaveAddress}>Save Address</Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold">{address.type}</h3>
                  {address.isDefault && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Default</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{address.street}</p>
                <p className="text-gray-600 text-sm">{address.city}, {address.state} {address.zipCode}</p>
                <p className="text-gray-600 text-sm">{address.country}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {!address.isDefault && (
                  <button
                    type="button"
                    onClick={() => onSetDefaultAddress(address.id)}
                    className="text-blue-500 text-sm hover:underline"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onDeleteAddress(address.id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TextInput = ({ label, value, placeholder, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      required
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default AddressBookSection;
