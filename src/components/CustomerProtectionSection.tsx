import React from 'react';
import { ShieldCheck, ChevronRight, Check } from 'lucide-react';

const CustomerProtectionSection: React.FC = () => {
  const primaryColor = "#A0783A"; 
  const backgroundColor = "bg-[#FDF8F0]"; 

  const row1 = [
    "Devolução gratuita",
    "Reembolso automático",
    "Protegido"
  ];

  const row2 = [
    "Pagamento seguro",
    "Reembolso automático",
    "Protegido por"
  ];

  return (
    <div className={`p-4 ${backgroundColor} cursor-pointer`}>
      {/* Linha 1: Título e Ícones principais */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          {/* Escudo sólido com check branco */}
          <div className="relative flex items-center justify-center">
            <ShieldCheck size={20} className="text-[#A0783A] fill-[#A0783A]" />
            <Check size={10} className="absolute text-white stroke-[3]" />
          </div>
          <h3 className={`text-sm font-bold text-[#A0783A]`}>
            Proteção do cliente
          </h3>
        </div>
        <ChevronRight size={16} className="text-[#A0783A]" />
      </div>

      {/* Itens em duas linhas com recuo */}
      <div className="pl-7 space-y-1.5">
        {/* Linha 1 */}
        <div className="flex items-center overflow-x-auto no-scrollbar space-x-2">
          {row1.map((item, index) => (
            <div key={index} className="flex items-center flex-shrink-0">
              <Check size={10} className="text-[#A0783A] mr-0.5" />
              <span className="text-[10px] text-gray-700 font-medium whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Linha 2 */}
        <div className="flex items-center overflow-x-auto no-scrollbar space-x-2">
          {row2.map((item, index) => (
            <div key={index} className="flex items-center flex-shrink-0">
              <Check size={10} className="text-[#A0783A] mr-0.5" />
              <span className="text-[10px] text-gray-700 font-medium whitespace-nowrap">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerProtectionSection;