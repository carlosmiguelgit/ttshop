import React from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { X, MapPin, Store, ChevronRight, Ticket } from 'lucide-react';

interface ShippingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryDate: string;
}

const ShippingDrawer: React.FC<ShippingDrawerProps> = ({ isOpen, onClose, deliveryDate }) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      {/* Ajustado para subir mais para o meio da tela com margem inferior */}
      <DrawerContent className="max-h-[70vh] p-0 rounded-t-[16px] border-none bg-transparent">
        <div className="mx-auto w-full max-w-[600px] flex flex-col bg-white rounded-t-[16px] overflow-hidden mb-12 shadow-2xl">
          {/* Header */}
          <div className="p-3 border-b border-gray-100 flex items-center justify-center relative">
            <h2 className="text-[15px] font-bold text-gray-900">Envio</h2>
            <button onClick={onClose} className="absolute right-4 p-1">
              <X size={20} className="text-gray-900" />
            </button>
          </div>

          <div className="p-4 space-y-5">
            {/* Rota de Entrega */}
            <div className="relative pl-8 space-y-4">
              <div className="absolute left-[11px] top-3 bottom-3 border-l-2 border-dotted border-gray-200"></div>
              
              <div className="relative flex items-center space-x-3">
                <Store size={20} className="absolute -left-8 text-gray-900" />
                <span className="text-[13px] text-gray-900 font-medium">De Barueri</span>
              </div>

              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin size={20} className="absolute -left-8 text-gray-900" />
                  <span className="text-[13px] text-gray-900 font-medium">São Paulo, São Paulo, Brasil</span>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>

            {/* Cupom de Envio - REDUZIDO e AJUSTADO */}
            <div className="bg-[#EFFFFD] border border-[#CCF7F2] rounded-lg p-2.5 flex items-center space-x-3 relative overflow-hidden">
              <div className="absolute right-[-10px] top-0 bottom-0 w-8 opacity-5 flex items-center justify-center">
                 <Ticket size={30} className="rotate-90" />
              </div>
              
              <Ticket size={18} className="text-gray-900 flex-shrink-0" />
              <div className="flex-grow">
                <h4 className="text-[12px] font-bold text-gray-900 leading-tight">Cupom de envio do TikTok Shop</h4>
                <p className="text-[10px] text-gray-500 leading-tight">Desconto de R$ 10 no frete em pedidos acima de R$ 15</p>
              </div>
            </div>

            {/* Opção de Envio */}
            <div className="space-y-0.5 pb-2">
              <div className="flex justify-between items-center">
                <h3 className="text-[13px] font-bold text-gray-900">Envio padrão</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-gray-400 line-through">R$ 9,18</span>
                  <span className="text-[11px] text-[#00BFA5] font-bold">Grátis</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-500">Receba até {deliveryDate}</p>
            </div>
          </div>
        </div>
        {/* Espaço branco abaixo do container para efeito de centralização */}
        <div className="h-24 bg-transparent"></div>
      </DrawerContent>
    </Drawer>
  );
};

export default ShippingDrawer;