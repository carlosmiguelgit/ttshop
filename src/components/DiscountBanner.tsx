import React from 'react';

const DiscountBanner: React.FC = () => {
  return (
    <div className="px-4 pt-2 pb-4 bg-white">
      <div className="flex items-center p-2 rounded-lg bg-pink-50/80 text-sm">
        {/* Badge de Desconto (Rosa Vibrante) */}
        <span className="bg-[#F06292] text-white px-2 py-0.5 rounded-full font-semibold mr-2 text-xs whitespace-nowrap">
          Desconto de 90%
        </span>
        {/* Texto da Condição de Desconto */}
        <span className="text-gray-700 text-xs sm:text-sm">
          Compre R$ 100,00, economize R$ 30,00
        </span>
      </div>
    </div>
  );
};

export default DiscountBanner;