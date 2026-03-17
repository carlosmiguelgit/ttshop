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
      <DrawerContent className="max-h-[85vh] p-0 rounded-t-[16px] border-none">
        <div className="mx-auto w-full max-w-[600px] flex flex-col h-full bg-white rounded-t-[16px] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-center relative">
            <h2 className="text-[16px] font-bold text-gray-900">Envio</h2>
            <button onClick={onClose} className="absolute right-4 p-1">
              <X size={24} className="text-gray-900" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-6">
            {/* Rota de Entrega */}
            <div className="relative pl-8 space-y-6">
              {/* Linha vertical pontilhada */}
              <div className="absolute left-[11px] top-3 bottom-3 border-l-2 border-dotted border-gray-200"></div>
              
              <div className="relative flex items-center space-x-3">
                <Store size={22} className="absolute -left-8 text-gray-900" />
                <span className="text-[14px] text-gray-900 font-medium">De Barueri</span>
              </div>

              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MapPin size={22} className="absolute -left-8 text-gray-900" />
                  <span className="text-[14px] text-gray-900 font-medium">São Paulo, São Paulo, Brasil</span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
            </div>

            {/* Cupom de Envio IDENTICO À FOTO 4 */}
            <div className="bg-[#EFFFFD] border border-[#CCF7F2] rounded-xl p-4 flex items-start space-x-3 relative overflow-hidden">
              {/* Detalhe estético do cupom no canto */}
              <div className="absolute right-0 top-0 bottom-0 w-8 opacity-10 flex items-center justify-center">
                 <Ticket size={40} className="rotate-90" />
              </div>
              
              <Ticket size={20} className="text-gray-900 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-gray-900">Cupom de envio do TikTok Shop</h4>
                <p className="text-[12px] text-gray-500">Desconto de R$ 10 no frete em pedidos acima de R$ 15</p>
              </div>
            </div>

            {/* Opção de Envio */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="text-[14px] font-bold text-gray-900">Envio padrão</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-[12px] text-gray-400 line-through">R$ 9,18</span>
                  <span className="text-[12px] text-[#00BFA5] font-bold">Grátis</span>
                </div>
              </div>
              <p className="text-[12px] text-gray-500">Receba até {deliveryDate}</p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ShippingDrawer;