import React from 'react';

interface Specification {
  label: string;
  value: string;
}

interface ProductDescriptionProps {
  specifications: Specification[];
  descriptionText: string;
  firstImageSrc: string; // Novo prop para a primeira imagem
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ specifications, descriptionText, firstImageSrc }) => {
  return (
    <div className="p-4 bg-white space-y-3"> {/* Reduzindo o espaçamento vertical para space-y-3 */}
      {/* Título ajustado para 'Sobre o produto' e fonte menor (text-base) */}
      <h3 className="text-base font-bold text-gray-900">Sobre o produto</h3>
      
      {/* Imagem do Produto - Reduzindo max-h para 200px */}
      <div className="w-full h-auto max-h-[200px] flex justify-center overflow-hidden rounded-lg">
        <img 
          src={firstImageSrc} 
          alt="Imagem do produto" 
          className="w-full h-full object-contain" 
        />
      </div>

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