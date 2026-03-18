import React, { useState } from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { X, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CouponsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: (amount: number) => void;
}

const CouponsDrawer: React.FC<CouponsDrawerProps> = ({ isOpen, onClose, onClaim }) => {
  const [claimed, setClaimed] = useState<Record<number, boolean>>({});
  const [showToast, setShowToast] = useState(false);

  const handleClaimLocal = (id: number, amount: number) => {
    if (claimed[id]) return;
    
    setClaimed(prev => ({ ...prev, [id]: true }));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    onClaim(amount);
  };

  return (
    <>
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
                
                {[
                  { id: 1, amt: 5, min: 80 },
                  { id: 2, amt: 15, min: 200 }
                ].map((c) => (
                  <div key={c.id} className="bg-[#FFF8F9] border border-[#FFD9E0] rounded-xl p-4 relative overflow-hidden">
                    {/* Rasgos laterais (Meia-lua) */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-white rounded-r-full border-y border-r border-[#FFD9E0] -ml-[1px]"></div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-4 bg-white rounded-l-full border-y border-l border-[#FFD9E0] -mr-[1px]"></div>

                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="text-[10px] text-[#FF2C55] font-bold border border-[#FF2C55] rounded-sm px-1.5 py-0.5 inline-block bg-white mb-2">
                          Do TikTok Shop
                        </div>
                        <h4 className="text-[16px] font-bold text-gray-900">Desconto de R$ {c.amt}</h4>
                        <p className="text-[13px] text-gray-700">nos pedidos acima de R$ {c.min}</p>
                        <p className="text-[11px] text-gray-400 mt-2">Válido por 1 dia após a reivindicação</p>
                      </div>
                      <Button 
                        className={`font-bold rounded-md h-8 px-4 text-[12px] transition-colors ${
                          claimed[c.id] 
                            ? 'bg-[#F1F1F1] text-gray-400 border-none' 
                            : 'bg-[#FF2C55] hover:bg-[#E0254B] text-white'
                        }`}
                        onClick={() => handleClaimLocal(c.id, c.amt)}
                      >
                        {claimed[c.id] ? 'Usar' : 'Resgatar'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {showToast && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
          <div className="bg-black/80 text-white px-6 py-3 rounded-lg text-sm font-bold animate-in fade-in zoom-in duration-300">
            Parabéns! você ganhou um cupom
          </div>
        </div>
      )}
    </>
  );
};

export default CouponsDrawer;