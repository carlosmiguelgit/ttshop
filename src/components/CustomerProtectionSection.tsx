import React from 'react';
import { ShieldCheck, ChevronRight, Check } from 'lucide-react';

const CustomerProtectionSection: React.FC = () => {
  // Cor marrom/dourada para ícones e texto principal
  const primaryColor = "text-[#A0783A]"; 
  // Cor de fundo bege claro
  const backgroundColor = "bg-[#FDF8F0]"; 
  // Cor do texto das vantagens
  const detailColor = "text-gray-700";

  const protectionItems = [
    "Devolução gratuita",
    "Reembolso automático por danos",
    "Pagamento seguro",
    "Cupom por atraso na coleta",
  ];

  return (
    <div className={`p-4 ${backgroundColor} cursor-pointer hover:bg-[#FDF5E8] transition-colors`}>
      
      {/* Header: Título e Ícone de Navegação */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center space-x-2">
          <ShieldCheck size={20} className={`${primaryColor} fill-transparent`} />
          <h3 className={`text-base font-semibold ${primaryColor}`}>
            Proteção do cliente
          </h3>
        </div>
        <ChevronRight size={20} className={primaryColor} />
      </div>

      {/* Detalhes da Proteção (Grid de 2 colunas) */}
      <div className="grid grid-cols-2 gap-y-2 text-sm">
        {protectionItems.map((item, index) => (
          <div key={index} className="flex items-start">
            <Check size={16} className={`mt-0.5 mr-2 ${primaryColor}`} />
            <span className={detailColor}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerProtectionSection;