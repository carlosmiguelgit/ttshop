import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X } from 'lucide-react';
import { Product } from '@/data/products'; // Importando o tipo Product

interface CartItemProps {
  product: Product;
}

// Componente simples para o item no carrinho
const CartItem: React.FC<CartItemProps> = ({ product }) => (
  <div className="flex items-center space-x-3 p-3 border rounded-lg bg-gray-50">
    {/* Imagem do Produto (usando a thumbnail principal) */}
    <img 
      src={product.media[0]?.thumbnailSrc || "public/placeholder.svg"} 
      alt={product.title} 
      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
    />
    
    <div className="flex flex-col justify-between flex-grow">
      <p className="text-sm font-medium text-gray-800 line-clamp-2">
        {product.title}
      </p>
      <div className="flex justify-between items-center mt-1">
        <span className="text-lg font-bold text-red-600">R$ {product.currentPrice}</span>
        <span className="text-sm text-gray-500">Qtd: 1</span>
      </div>
    </div>
  </div>
);

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckoutClick: () => void;
  product: Product; // Novo prop: o objeto Product completo
  cartItemCount: number; // Novo prop para a contagem de itens
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckoutClick, product, cartItemCount }) => {
  
  const totalItems = cartItemCount;
  const subtotal = totalItems > 0 ? `R$ ${product.currentPrice}` : 'R$ 0,00';

  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent 
        className="fixed inset-y-0 right-0 h-full w-full max-w-xs sm:max-w-sm mt-0 rounded-none border-l"
      >
        <div className="mx-auto w-full max-w-md p-4 flex flex-col h-full">
          <DrawerHeader className="flex justify-between items-center flex-shrink-0">
            <DrawerTitle className="flex items-center text-xl font-bold">
              <ShoppingCart className="mr-2 h-5 w-5 text-cyan-500" />
              Seu Carrinho
            </DrawerTitle>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <X size={24} />
            </button>
          </DrawerHeader>
          
          <div className="p-4 space-y-4 flex-grow overflow-y-auto">
            <p className="text-sm text-gray-500">{totalItems} item{totalItems !== 1 ? 's' : ''} no carrinho.</p>

            {/* Item do Produto (Exibido apenas se houver itens) */}
            {totalItems > 0 && (
              <CartItem product={product} />
            )}
            
            {/* Espaço para subtotal */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between text-lg font-semibold text-gray-900">
                <span>Subtotal:</span>
                <span>{subtotal}</span>
              </div>
            </div>
          </div>
          
          {/* Botão de Ação Fixo no Rodapé do Drawer */}
          <div className="p-4 flex-shrink-0">
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-full text-lg h-12"
              onClick={onCheckoutClick}
              disabled={totalItems === 0}
            >
              Finalizar Compra
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;