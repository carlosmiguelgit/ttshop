"use client";

import React, { useState } from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { X, Info, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface TikTokCouponDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (amount: number) => void;
  selectedAmount: number;
}

const TikTokCouponDrawer: React.FC<TikTokCouponDrawerProps> = ({ isOpen, onClose, onSelect, selectedAmount }) => {
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState("");

  const handleApply = () => {
    if (!promoCode) return;
    const errors = [
      "Cupom inválido",
      "Esse cupom já expirou",
      "Esse cupom já excedeu o limite de usos"
    ];
    setError(errors[Math.floor(Math.random() * errors.length)]);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[95vh] p-0 rounded-t-[20px] border-none bg-white">
        <div className="mx-auto w-full max-w-[600px] flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-center relative">
            <h2 className="text-[16px] font-bold text-gray-900">Desconto do TikTok Shop</h2>
            <button onClick={onClose} className="absolute right-4 p-1">
              <X size={24} className="text-gray-900" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-6">
            {/* Banner info */}
            <div className="bg-[#F8F8F8] rounded-lg p-3 flex items-center space-x-2">
              <div className="w-5 h-5 border border-gray-300 rounded-sm flex items-center justify-center">
                <div className="w-3 h-1 bg-gray-300 rounded-full"></div>
              </div>
              <span className="text-[13px] text-gray-500">Aplicamos o seu melhor desconto disponível</span>
            </div>

            {/* Lista de Cupons */}
            <div className="space-y-4">
              <h3 className="text-[15px] font-bold text-gray-900">Cupons de desconto</h3>
              
              {/* Cupom 1 - Selecionável */}
              <div 
                className={`relative border rounded-xl p-4 cursor-pointer transition-all ${
                  selectedAmount === 5 ? 'bg-[#FFF8F9] border-[#FFD9E0]' : 'bg-white border-gray-100 opacity-60'
                }`}
                onClick={() => onSelect(5)}
              >
                <div className="absolute top-0 right-0 bg-[#FF2C55] text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-lg">
                  Recomendado
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#FF2C55] font-bold">Do TikTok Shop</span>
                  <h4 className="text-[18px] font-bold text-gray-900">Desconto de R$ 5</h4>
                  <p className="text-[13px] text-gray-700">nos pedidos acima de R$ 80</p>
                  <p className="text-[10px] text-[#FF2C55]">Expira em 3 horas</p>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                   {selectedAmount === 5 ? (
                     <CheckCircle2 size={20} className="text-[#FF2C55] fill-[#FF2C55] text-white" />
                   ) : (
                     <div className="w-5 h-5 rounded-full border-2 border-gray-200"></div>
                   )}
                </div>
                <div className="mt-4 pt-4 border-t border-dashed flex justify-between text-[11px] text-gray-400">
                  <span>Em produtos selecionados. <span className="text-blue-600 underline">Termos aplicáveis</span></span>
                </div>
              </div>

              {/* Cupom 2 - Desativado */}
              <div className="relative border border-gray-100 rounded-xl p-4 bg-white opacity-40">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 font-bold">Do TikTok Shop</span>
                  <h4 className="text-[18px] font-bold text-gray-400">Desconto de R$ 15</h4>
                  <p className="text-[13px] text-gray-400">nos pedidos acima de R$ 200</p>
                  <div className="flex items-center space-x-1 text-[11px] text-[#FF2C55]">
                    <Info size={12} />
                    <span>Gaste R$ 20,22 a mais para usar este cupom</span>
                  </div>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-100"></div>
                </div>
              </div>
            </div>

            {/* Opção Não Usar */}
            <div className="flex justify-between items-center py-2" onClick={() => onSelect(0)}>
              <span className="text-[14px] text-gray-900">Não usar cupons</span>
              <div className={`w-5 h-5 rounded-full border-2 ${selectedAmount === 0 ? 'border-[#FF2C55] bg-[#FF2C55]' : 'border-gray-200'}`}>
                {selectedAmount === 0 && <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-1.5"></div>}
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="pt-4 border-t">
              <h3 className="text-[15px] font-bold text-gray-900 mb-4">Adicionar código promocional</h3>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Insira o código" 
                  className="flex-grow bg-transparent border-b h-10 outline-none text-[14px]"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setError("");
                  }}
                />
                <Button 
                  className="bg-[#FF2C55] hover:bg-[#E0254B] text-white rounded-md h-10 px-6 font-bold"
                  onClick={handleApply}
                >
                  Aplicar
                </Button>
              </div>
              {error && <p className="text-[#FF2C55] text-[12px] mt-2">{error}</p>}
            </div>
          </div>

          <div className="p-4">
            <Button 
              className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[48px] text-[16px]"
              onClick={onClose}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TikTokCouponDrawer;