import React from 'react';

const SizeGuideModal = ({ isOpen, onClose, rows }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Size Guide</h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Size</th>
                <th className="text-left py-2">Chest (in)</th>
                <th className="text-left py-2">Waist (in)</th>
                <th className="text-left py-2">Hip (in)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.size} className="border-b">
                  <td className="py-2 font-semibold">{row.size}</td>
                  <td className="py-2">{row.chest}</td>
                  <td className="py-2">{row.waist}</td>
                  <td className="py-2">{row.hip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Tips: Measure your body circumference for best fit.</p>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
