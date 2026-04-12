export const getOrderStatusColor = (status) => {
  const statuses = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Processing: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-purple-100 text-purple-800',
    Delivered: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
  };

  return statuses[status] || 'bg-gray-100 text-gray-800';
};

export const initialProfileData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 234 567 8900',
  dateOfBirth: '1990-01-01',
  gender: 'male',
  bio: 'Passionate shopper and tech enthusiast.',
};

export const initialNewAddress = {
  type: 'Home',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'USA',
};
