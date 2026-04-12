export const colors = [
  { name: 'Black', code: '#000000' },
  { name: 'White', code: '#FFFFFF' },
  { name: 'Red', code: '#FF0000' },
  { name: 'Blue', code: '#0000FF' },
  { name: 'Green', code: '#00FF00' },
];

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const productNames = {
  1: 'HAVIT HV-G92 Gamepad',
  2: 'AK-900 Wired Keyboard',
  3: 'IPS LCD Gaming Monitor',
  4: 'S-Series Comfort Chair',
  5: 'The North Coat',
  6: 'Gucci Duffle Bag',
  7: 'RGB Liquid CPU Cooler',
};

const productModels = {
  1: 'HV-G92',
  2: 'AK-900',
  3: 'IPS-24',
  4: 'SC-01',
  5: 'NC-01',
  6: 'GD-01',
  7: 'RL-07',
};

const productCategories = {
  1: 'Electronics',
  2: 'Accessories',
  3: 'Displays',
  4: 'Furniture',
  5: 'Apparel',
  6: 'Bags',
  7: 'Components',
};

const productBrands = {
  1: 'HAVIT',
  2: 'AK',
  3: 'Vision',
  4: 'S-Series',
  5: 'North',
  6: 'Gucci',
  7: 'AquaCool',
};

export const getMockProductById = (idValue) => {
  const id = Number(idValue) || 1;
  const name = productNames[id] || productNames[1];

  return {
    id,
    name,
    price: 192,
    originalPrice: 250,
    rating: 4.5,
    reviews: 150,
    inStock: id !== 5,
    sku: `SKU-${id}${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    category: productCategories[id] || 'Electronics',
    brand: productBrands[id] || 'HAVIT',
    description: `PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal. Pressure sensitive. The controller skin is made of high quality vinyl material that provides excellent protection against scratches, dust, and fingerprints. The air channel adhesive ensures bubble-free installation and mess-free removal.`,
    features: [
      'High quality vinyl material',
      'Air channel adhesive for bubble-free installation',
      'Pressure sensitive for precise control',
      'Easy to apply and remove',
      'Protects against scratches and dust',
      'Compatible with PlayStation 5 controller',
    ],
    specifications: {
      Brand: productBrands[id] || 'HAVIT',
      Model: productModels[id] || `HV-G${92 + id}`,
      Compatibility: 'PlayStation 5',
      Material: 'Premium Vinyl',
      Weight: '50g',
      Dimensions: '15 x 10 x 2 cm',
      Warranty: '1 Year',
    },
    images: [
      `images/Read_HAVIT_HV-G92_Gamepad.png`,
      `images/Red_HAVIT_HV-G92_Gamepad-1.png`,
      `images/Red_HAVIT_HV-G92_Gamepad-2.png`,
      `images/Red_HAVIT_HV-G92_Gamepad-3.png`,
    ],
    reviews_list: [
      { id: 1, user: 'John D.', rating: 5, date: '2024-01-15', comment: 'Excellent product! Very satisfied with the quality.', helpful: 24 },
      { id: 2, user: 'Sarah M.', rating: 4, date: '2024-01-10', comment: 'Good quality, but a bit pricey.', helpful: 12 },
      { id: 3, user: 'Mike R.', rating: 5, date: '2024-01-05', comment: 'Fast shipping and great product!', helpful: 18 },
    ],
  };
};

export const getRelatedProducts = () => [
  { id: 101, name: 'HAVIT HV-G92 Gamepad', price: 120, originalPrice: 160, rating: 4.5, reviews: 88, image: 'https://picsum.photos/id/101/300/300' },
  { id: 102, name: 'AK-900 Wired Keyboard', price: 960, originalPrice: 1160, rating: 4.8, reviews: 75, image: 'https://picsum.photos/id/102/300/300' },
  { id: 103, name: 'IPS LCD Gaming Monitor', price: 370, originalPrice: 400, rating: 4.6, reviews: 99, image: 'https://picsum.photos/id/103/300/300' },
  { id: 104, name: 'RGB Liquid CPU Cooler', price: 160, originalPrice: 170, rating: 4.5, reviews: 65, image: 'https://picsum.photos/id/104/300/300' },
];

export const getSizeGuideRows = (sizesList) => sizesList.map((size) => {
  const chest = size === 'XS' ? '32-34' : size === 'S' ? '35-37' : size === 'M' ? '38-40' : size === 'L' ? '41-43' : size === 'XL' ? '44-46' : '47-49';
  const waist = size === 'XS' ? '26-28' : size === 'S' ? '29-31' : size === 'M' ? '32-34' : size === 'L' ? '35-37' : size === 'XL' ? '38-40' : '41-43';
  const hip = size === 'XS' ? '34-36' : size === 'S' ? '37-39' : size === 'M' ? '40-42' : size === 'L' ? '43-45' : size === 'XL' ? '46-48' : '49-51';

  return { size, chest, waist, hip };
});
