import Button from '../../components/Button';

const ProfileSection = ({
  isEditing,
  profileData,
  onEditToggle,
  onProfileChange,
  onProfileSave,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Profile Information</h2>
        <Button variant="outline" onClick={() => onEditToggle(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </Button>
      </div>

      {!isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProfileField label="First Name" value={profileData.firstName} />
            <ProfileField label="Last Name" value={profileData.lastName} />
            <ProfileField label="Email Address" value={profileData.email} />
            <ProfileField label="Phone Number" value={profileData.phone} />
            <ProfileField label="Date of Birth" value={profileData.dateOfBirth} />
            <ProfileField label="Gender" value={profileData.gender} className="capitalize" />
          </div>
          <div>
            <ProfileField label="Bio" value={profileData.bio} />
          </div>
        </div>
      ) : (
        <form onSubmit={onProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              value={profileData.firstName}
              onChange={(value) => onProfileChange('firstName', value)}
            />
            <InputField
              label="Last Name"
              value={profileData.lastName}
              onChange={(value) => onProfileChange('lastName', value)}
            />
            <InputField
              label="Email Address"
              type="email"
              value={profileData.email}
              onChange={(value) => onProfileChange('email', value)}
            />
            <InputField
              label="Phone Number"
              type="tel"
              value={profileData.phone}
              onChange={(value) => onProfileChange('phone', value)}
              required={false}
            />
            <InputField
              label="Date of Birth"
              type="date"
              value={profileData.dateOfBirth}
              onChange={(value) => onProfileChange('dateOfBirth', value)}
            />
            <SelectField
              label="Gender"
              value={profileData.gender}
              onChange={(value) => onProfileChange('gender', value)}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => onProfileChange('bio', e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" variant="primary">Save Changes</Button>
          </div>
        </form>
      )}
    </div>
  );
};

const ProfileField = ({ label, value, className = '' }) => (
  <div>
    <label className="text-sm text-gray-500 block mb-1">{label}</label>
    <p className={`font-medium ${className}`}>{value}</p>
  </div>
);

const InputField = ({ label, type = 'text', value, onChange, required = true }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      required={required}
    />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

export default ProfileSection;
