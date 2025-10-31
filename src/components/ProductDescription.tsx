import React from 'react';

const specifications = [
  { label: "Faixa etária", value: "Adulto" },
  { label: "Modelo", value: "XM-BLK-SRK15" },
  { label: "Número do modelo", value: "XM-BLK-SRK15" },
  { label: "Tipo de freios", value: "Freio regenerativo" },
  { label: "Cor", value: "Vermelho e Preto" },
  { label: "Material da armação ou moldura", value: "Alumínio" },
  { label: "Peso", value: "14,7 Kilograms" },
  { label: "Recursos especiais", value: "Dobrável" },
  { label: "Tamanho da roda", value: "8,5 Polegadas" },
  { label: "Funciona com baterias", value: "Não" },
  { label: "Marca", value: "Foston" },
  { label: "Número do modelo", value: "XM-BLK-SRK15" },
  { label: "Dimensões do produto", value: "109 x 15 x 51 cm; 13 quilogramas" },
  { label: "ASIN", value: "B099JG7TLB" },
];

const ProductDescription: React.FC = () => {
  return (
    <div className="p-4 bg-white space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Especificações do produto</h3>
      
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-gray-800">Detalhes técnicos</h4>
        
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