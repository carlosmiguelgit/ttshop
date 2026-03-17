import React from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { X, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CouponsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: (amount: number) => void;
}

const CouponsDrawer: React.FC<CouponsDrawerProps> = ({ isOpen, onClose, onClaim }) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[85vh] p-0 rounded-t-[16px] border-none">
        <div className="mx-auto w-full max-w-[600px] flex flex-col h-full bg-white rounded-t-[16px] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-center relative">
            <h2 className="text-[16px] font-bold text-gray-900">Descontos e ofertas</h2>
            <button onClick={onClose} className="absolute right-4 p-1">
              <X size={24} className="text-gray-900" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-6">
            <p className="text-[13px] text-gray-500 leading-tight">
              Verificamos todas as suas ofertas disponíveis e aplicaremos o maior desconto ao seu carrinho de compras.
            </p>

            {/* Seção Cupons */}
            <div className="space-y-4">
              <h3 className="text-[14px] font-bold text-gray-900">Cupons de desconto</h3>
              
              {/* Cupom 1 */}
              <div className="bg-[#FFF8F9] border border-[#FFD9E0] rounded-xl p-4 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#FF2C55] font-bold border border-[#FF2C55] rounded-sm px-1.5 py-0.5 inline-block bg-white mb-2">
                      Do TikTok Shop
                    </div>
                    <h4 className="text-[16px] font-bold text-gray-900">Desconto de R$ 5</h4>
                    <p className="text-[13px] text-gray-700">nos pedidos acima de R$ 80</p>
                    <p className="text-[11px] text-gray-400 mt-2">Válido por 1 dia após a reivindicação</p>
                  </div>
                  <Button 
                    className="bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-md h-8 px-4 text-[12px]"
                    onClick={() => onClaim(5)}
                  >
                    Resgatar
                  </Button>
                </div>
                <div className="mt-4 pt-3 border-t border-dashed border-[#FFD9E0] flex justify-between items-center">
                  <span className="text-[11px] text-gray-500">Em produtos selecionados. <span className="text-blue-600">Termos aplicáveis</span></span>
                </div>
              </div>

              {/* Cupom 2 */}
              <div className="bg-[#FFF8F9] border border-[#FFD9E0] rounded-xl p-4 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#FF2C55] font-bold border border-[#FF2C55] rounded-sm px-1.5 py-0.5 inline-block bg-white mb-2">
                      Do TikTok Shop
                    </div>
                    <h4 className="text-[16px] font-bold text-gray-900">Desconto de R$ 15</h4>
                    <p className="text-[13px] text-gray-700">nos pedidos acima de R$ 200</p>
                    <p className="text-[11px] text-gray-400 mt-2">Válido por 1 dia após a reivindicação</p>
                  </div>
                  <Button 
                    className="bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-md h-8 px-4 text-[12px]"
                    onClick={() => onClaim(15)}
                  >
                    Resgatar
                  </Button>
                </div>
                <div className="mt-4 pt-3 border-t border-dashed border-[#FFD9E0] flex justify-between items-center">
                  <span className="text-[11px] text-gray-500">Em produtos selecionados. <span className="text-blue-600">Termos aplicáveis</span></span>
                </div>
              </div>
            </div>

            {/* Seção Economia de bônus */}
            <div className="space-y-3">
              <h3 className="text-[14px] font-bold text-gray-900">Economia de bônus</h3>
              <div className="bg-[#F8F8F8] rounded-xl p-4 flex justify-between items-start">
                <div>
                  <h4 className="text-[14px] font-bold text-[#A87100]">Economize 3% com bônus</h4>
                  <p className="text-[12px] text-gray-700">Sem gasto mínimo, bônus máximo de R$ 10</p>
                  <p className="text-[10px] text-gray-400 mt-2">As economias variam de acordo com seus bônus resgatáveis</p>
                </div>
                <Info size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CouponsDrawer;