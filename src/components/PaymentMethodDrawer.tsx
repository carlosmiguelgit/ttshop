"use client";

import React from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { X, ShieldCheck, ChevronRight, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PaymentMethodDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMethod: (method: 'card' | 'pix') => void;
  onAddCard: () => void;
  total: string;
}

const PaymentMethodDrawer: React.FC<PaymentMethodDrawerProps> = ({ isOpen, onClose, onSelectMethod, onAddCard, total }) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[95vh] p-0 rounded-t-[20px] border-none bg-white">
        <div className="mx-auto w-full max-w-[600px] flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-4 flex flex-col items-center justify-center relative border-b border-gray-50">
            <h2 className="text-[16px] font-bold text-gray-900">Forma de pagamento</h2>
            <div className="flex items-center text-[#00BFA5] text-[11px] mt-1 cursor-pointer">
              <ShieldCheck size={14} className="mr-1 fill-[#00BFA5]/10" />
              <span>Seus dados estão seguros e criptografados</span>
              <ChevronRight size={12} className="ml-0.5" />
            </div>
            <button onClick={onClose} className="absolute right-4 top-4 p-1">
              <X size={24} className="text-gray-900" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-8">
            {/* Opção Cartão */}
            <div className="flex items-start justify-between cursor-pointer" onClick={onAddCard}>
              <div className="flex items-start space-x-3">
                <div className="bg-gray-50 p-1.5 rounded-sm border border-gray-100 flex items-center justify-center">
                  <Plus size={16} className="text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-900 font-medium">Cartão de crédito</span>
                  <div className="flex gap-1.5 mt-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" alt="Mastercard" />
                    <img src="https://images.seeklogo.com/logo-png/14/1/visa-logo-png_seeklogo-149698.png" className="h-5" alt="Visa" />
                    <img src="https://images.seeklogo.com/logo-png/20/1/elo-logo-png_seeklogo-205447.png" className="h-5" alt="Elo" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" className="h-5" alt="Amex" />
                  </div>
                  <div className="bg-[#FFF1F3] text-[#FF2C55] text-[11px] font-bold px-2 py-0.5 rounded-sm border border-[#FFD9E0] flex items-center w-fit mt-2">
                    Sem juros em até 3 parcelas <ChevronRight size={12} className="ml-1" />
                  </div>
                  <span className="text-[13px] text-gray-400 mt-1">Pague em até 12 parcelas</span>
                </div>
              </div>
            </div>

            {/* Opção Pix */}
            <div className="flex items-center justify-between cursor-pointer" onClick={() => { onSelectMethod('pix'); onClose(); }}>
              <div className="flex items-center space-x-3">
                <div className="bg-[#EFFFFD] p-1.5 rounded-sm flex items-center justify-center">
                  <img src="https://logospng.org/download/pix/logo-pix-icone-512.png" className="h-5 w-5" alt="Pix" />
                </div>
                <span className="text-[15px] text-gray-900 font-medium">Pix</span>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-gray-200"></div>
            </div>
          </div>

          {/* Footer Clone da Foto */}
          <div className="p-4 bg-white border-t space-y-4">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center space-x-1">
                <span className="text-[16px] font-bold text-gray-900">Total</span>
                <ChevronRight size={16} className="text-gray-400 rotate-[-90deg]" />
              </div>
              <span className="text-[18px] font-bold text-gray-900">R$ {total}</span>
            </div>
            <Button 
              className="w-full bg-[#FFB6C1] hover:bg-[#FFB6C1] text-white font-bold rounded-full h-[52px] text-[16px] border-none shadow-none"
              onClick={() => { onSelectMethod('pix'); onClose(); }}
            >
              Pagar agora
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default PaymentMethodDrawer;