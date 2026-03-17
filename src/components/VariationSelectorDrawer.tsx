import React, { useState } from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, Zap } from 'lucide-react';
import { Product } from '@/data/products';

interface VariationSelectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onConfirm: (quantity: number, action: 'cart' | 'buy', variation: string) => void;
}

const VariationSelectorDrawer: React.FC<VariationSelectorDrawerProps> = ({ isOpen, onClose, product, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(0);
  const variations = ["1 Bateria", "2 Baterias"];

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[85vh] p-0 rounded-t-[16px] border-none">
        <div className="mx-auto w-full max-w-[600px] flex flex-col h-full bg-white rounded-t-[16px] overflow-hidden">
          <div className="p-4 flex space-x-3 relative">
            <div className="w-28 h-28 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
              <img 
                src={product.media[selectedVariation]?.src || product.media[0].src} 
                alt="Produto" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-end pb-1 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[#FF2C55] font-bold text-2xl">R$ {product.currentPrice}</span>
                <div className="bg-[#FF5C00] text-white text-[10px] font-bold px-1 py-0.5 rounded-sm flex items-center">
                  <Zap size={10} className="fill-white mr-0.5" />
                  Oferta Relâmpago
                </div>
              </div>
              <div className="text-[11px] text-gray-400">Estoque: 512</div>
              <div className="text-[12px] text-gray-900 font-medium">Selecionado: {variations[selectedVariation]}</div>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 p-1 bg-gray-100 rounded-full">
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto px-4 py-2 space-y-6">
            <div>
              <h3 className="text-[13px] font-bold text-gray-900 mb-3">Modelo</h3>
              <div className="flex flex-wrap gap-2">
                {variations.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariation(idx)}
                    className={`flex items-center space-x-2 border rounded-md px-3 py-2 transition-all ${
                      selectedVariation === idx 
                        ? 'border-[#FF2C55] bg-[#FFF1F3] text-[#FF2C55]' 
                        : 'border-gray-100 bg-white text-gray-800'
                    }`}
                  >
                    <img src={product.media[idx]?.src} className="w-6 h-6 rounded-sm object-cover" />
                    <span className="text-[12px] font-medium">{v}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pb-8">
              <h3 className="text-[13px] font-bold text-gray-900">Quantidade</h3>
              <div className="flex items-center border border-gray-200 rounded-full h-9 px-1">
                <button 
                  className="w-9 h-9 flex items-center justify-center text-gray-400 disabled:opacity-30"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="w-10 text-center text-[14px] font-bold">{quantity}</span>
                <button 
                  className="w-9 h-9 flex items-center justify-center text-gray-900"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t flex space-x-2">
            <Button
              className="flex-1 bg-[#F1F1F1] hover:bg-gray-200 text-gray-900 font-bold rounded-full h-11 text-sm border-none shadow-none"
              onClick={() => onConfirm(quantity, 'cart', variations[selectedVariation])}
            >
              Adicionar ao carrinho
            </Button>
            <Button
              className="flex-1 bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-11 text-sm flex flex-col items-center justify-center border-none shadow-none"
              onClick={() => onConfirm(quantity, 'buy', variations[selectedVariation])}
            >
              <span>Comprar agora</span>
              <span className="text-[10px] font-normal opacity-90 leading-none">Frete grátis</span>
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default VariationSelectorDrawer;