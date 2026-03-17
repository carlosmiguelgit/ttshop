import React, { useState } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus } from 'lucide-react';
import { Product } from '@/data/products';

interface VariationSelectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onConfirm: (quantity: number) => void;
}

const VariationSelectorDrawer: React.FC<VariationSelectorDrawerProps> = ({ isOpen, onClose, product, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(0);

  const handleConfirm = () => {
    onConfirm(quantity);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[85vh] p-0 rounded-t-[20px]">
        <div className="mx-auto w-full max-w-[600px] flex flex-col h-full bg-white rounded-t-[20px] overflow-hidden">
          {/* Header com Imagem e Preço */}
          <div className="p-4 flex space-x-3">
            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={product.media[selectedVariation]?.src || product.media[0].src} 
                alt="Produto" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-end pb-1">
              <div className="text-[#FF2C55] font-bold text-xl">R$ {product.currentPrice}</div>
              <div className="text-xs text-gray-500">Estoque: 512</div>
              <div className="text-xs text-gray-800 mt-1">Selecionado: Padrão {selectedVariation + 1}</div>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 p-1">
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto px-4 py-2 space-y-6">
            {/* Opções de Variação */}
            <div>
              <h3 className="text-sm font-bold mb-3">Modelo</h3>
              <div className="flex flex-wrap gap-2">
                {product.media.slice(0, 2).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVariation(idx)}
                    className={`flex items-center space-x-2 border rounded-md px-3 py-1.5 transition-all ${
                      selectedVariation === idx 
                        ? 'border-[#FF2C55] bg-[#FFF1F3] text-[#FF2C55]' 
                        : 'border-gray-200 bg-white text-gray-800'
                    }`}
                  >
                    <img src={item.src} className="w-6 h-6 rounded object-cover" />
                    <span className="text-xs font-medium">Padrão {idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Seletor de Quantidade */}
            <div className="flex justify-between items-center pb-6">
              <h3 className="text-sm font-bold">Quantidade</h3>
              <div className="flex items-center border border-gray-200 rounded-full h-8 px-1">
                <button 
                  className="w-8 h-8 flex items-center justify-center text-gray-400 disabled:opacity-30"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center text-sm font-bold">{quantity}</span>
                <button 
                  className="w-8 h-8 flex items-center justify-center text-gray-900"
                  onClick={() => setQuantity(q => q + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Botão de Confirmação Fixo */}
          <div className="p-4 border-t">
            <Button 
              className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-11"
              onClick={handleConfirm}
            >
              Confirmar
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default VariationSelectorDrawer;