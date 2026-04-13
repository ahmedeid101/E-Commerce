// components/productDetails/ProductGallery.jsx
import React from 'react';

const ProductGallery = ({ images, selectedImage, onSelectImage, productName }) => (
  <div className="lg:w-1/2">
    <div className="flex gap-4">
      <div className="flex flex-row lg:flex-col gap-3 order-2 lg:order-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectImage(idx)}
            className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === idx ? 'border-red-500' : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <img 
              src={img} 
              alt={`${productName} view ${idx + 1}`} 
              className="w-full h-full object-cover" 
              onError={(e) => {
                e.target.src = `https://picsum.photos/id/${idx + 100}/100/100`;
              }}
            />
          </button>
        ))}
      </div>

      <div className="flex-1 order-1 lg:order-2">
        <div className="bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={images[selectedImage]} 
            alt={productName} 
            className="w-full h-auto object-cover"
            onError={(e) => {
              e.target.src = `https://picsum.photos/id/${selectedImage + 100}/500/500`;
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default ProductGallery;

// import React from 'react';

// const ProductGallery = ({ images, selectedImage, onSelectImage, productName }) => (
//   <div className="lg:w-1/2">
//     <div className="flex gap-4">
//       <div className="flex flex-row lg:flex-col gap-3 order-2 lg:order-1">
//         {images.map((img, idx) => (
//           <button
//             key={img}
//             type="button"
//             onClick={() => onSelectImage(idx)}
//             className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
//               selectedImage === idx ? 'border-red-500' : 'border-gray-200 hover:border-gray-400'
//             }`}
//           >
//             <img src={img} alt={`${productName} view ${idx + 1}`} className="w-full h-full object-cover" />
//           </button>
//         ))}
//       </div>

//       <div className="flex-1 order-1 lg:order-2">
//         <div className="bg-gray-100 rounded-lg overflow-hidden">
//           <img src={images[selectedImage]} alt={productName} className="w-full h-auto object-cover" />
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default ProductGallery;
