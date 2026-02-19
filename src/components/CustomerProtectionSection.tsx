import React from 'react';
import { ShieldCheck, ChevronRight, Check } from 'lucide-react';

const CustomerProtectionSection: React.FC = () => {
  const primaryColor = "#A0783A"; 
  const backgroundColor = "bg-[#FDF8F0]"; 

  return (
    <div className={`p-4 ${backgroundColor} cursor-pointer`}>
      {/* Linha 1: Título e Ícone de Escudo Sólido */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
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

      {/* Itens em duas linhas com recuo pl-7 */}
      <div className="pl-7 space-y-1.5">
        {/* Linha 1 */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center flex-shrink-0">
            <Check size={10} className="text-[#A0783A] mr-1" />
            <span className="text-[10px] text-gray-700 font-medium whitespace-nowrap">
              Devolução gratuita
            </span>
          </div>
          <span className="text-[10px] text-gray-700 font-medium whitespace-nowrap">
            Reembolso automático protegido por
          </span>
        </div>

        {/* Linha 2 */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center flex-shrink-0">
            <Check size={10} className="text-[#A0783A] mr-1" />
            <span className="text-[10px] text-gray-700 font-medium whitespace-nowrap">
              Pagamento seguro
            </span>
          </div>
          <span className="text-[10px] text-gray-700 font-medium whitespace-nowrap">
            Reembolso automático protegido por
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerProtectionSection;