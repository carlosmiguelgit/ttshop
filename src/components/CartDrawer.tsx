import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const handleOfferClick = () => {
    // Redireciona para google.com conforme solicitado
    window.location.href = 'https://www.google.com';
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[90vh] mt-24 fixed bottom-0 left-0 right-0 md:max-w-sm md:right-0 md:left-auto md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none">
        <div className="mx-auto w-full max-w-md p-4">
          <DrawerHeader className="flex justify-between items-center">
            <DrawerTitle className="flex items-center text-xl font-bold">
              <ShoppingCart className="mr-2 h-5 w-5 text-cyan-500" />
              Seu Carrinho
            </DrawerTitle>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <X size={24} />
            </button>
          </DrawerHeader>
          
          <div className="p-4 space-y-4">
            <p className="text-sm text-gray-500">1 item adicionado ao carrinho.</p>

            {/* Simulação da Oferta */}
            <div 
              className="border border-pink-300 bg-pink-50 p-4 rounded-lg cursor-pointer hover:bg-pink-100 transition-colors"
              onClick={handleOfferClick}
            >
              <h4 className="font-bold text-pink-700 mb-1">Oferta Exclusiva!</h4>
              <p className="text-sm text-pink-600">Adicione mais R$ 50,00 e ganhe frete grátis!</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-pink-500 underline">Clique para aproveitar</span>
                <ChevronRight size={16} className="text-pink-500" />
              </div>
            </div>

            {/* Botão de Finalizar Compra (Exemplo) */}
            <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-full">
              Finalizar Compra (R$ 67,90)
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;