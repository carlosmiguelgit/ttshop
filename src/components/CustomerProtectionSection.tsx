import React from 'react';
import { ShieldCheck, ChevronRight, Check } from 'lucide-react';

const CustomerProtectionSection: React.FC = () => {
  const primaryColor = "text-[#A0783A]"; 
  const backgroundColor = "bg-[#FDF8F0]"; 

  const protectionItems = [
    "Devolução gratuita",
    "Reembolso danos",
    "Pagamento seguro",
  ];

  return (
    <div className={`p-4 ${backgroundColor} cursor-pointer`}>
      {/* Linha 1: Título e Ícones principais */}
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center space-x-2">
          <ShieldCheck size={18} className={`${primaryColor}`} />
          <h3 className={`text-sm font-bold ${primaryColor}`}>
            Proteção do cliente
          </h3>
        </div>
        <ChevronRight size={16} className={primaryColor} />
      </div>

      {/* Linha 2: Itens com recuo à direita (pl-7) e bem próximos (space-x-2) */}
      <div className="flex items-center overflow-x-auto no-scrollbar pl-7 space-x-2">
        {protectionItems.map((item, index) => (
          <div key={index} className="flex items-center flex-shrink-0">
            <Check size={10} className={`${primaryColor} mr-0.5`} />
            <span className="text-[11px] text-gray-700 font-medium whitespace-nowrap">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerProtectionSection;