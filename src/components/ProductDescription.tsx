import React from 'react';

interface Specification {
  label: string;
  value: string;
}

interface ProductDescriptionProps {
  specifications: Specification[];
  descriptionText: string; // Novo prop
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ specifications, descriptionText }) => {
  return (
    <div className="p-4 bg-white space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Descrição e ficha técnica</h3>
      
      {/* Texto da Descrição */}
      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
        {descriptionText}
      </p>

      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-gray-800">Ficha Técnica</h4>
        
        <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
          {specifications.map((spec, index) => (
            <div key={index} className="flex justify-between py-3 text-sm">
              <span className="text-gray-600 font-medium">{spec.label}</span>
              <span className="text-gray-800 text-right">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;