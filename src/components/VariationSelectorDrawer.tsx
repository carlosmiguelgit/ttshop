import React, { useState } from 'react';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, Zap, Truck, Maximize2 } from 'lucide-react';
import { Product } from '@/data/products';
import { useNavigate } from 'react-router-dom';

interface VariationSelectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onConfirm: (quantity: number, action: 'cart' | 'buy', variation: string, price: string) => void;
  mode: 'cart' | 'buy';
}

const VariationSelectorDrawer: React.FC<VariationSelectorDrawerProps> = ({ isOpen, onClose, product, onConfirm, mode }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState(0);
  const navigate = useNavigate();

  const variations = product.variations || [{ name: "Padrão", price: product.currentPrice, imageIndex: 0 }];
  const currentVar = variations[selectedVariation];
  const displayImage = product.media[currentVar.imageIndex]?.src || product.media[0].src;

  const handleConfirmAction = () => {
    onConfirm(quantity, mode, currentVar.name, currentVar.price);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[92vh] p-0 rounded-t-[20px] border-none">
        <div className="mx-auto w-full max-w-[600px] flex flex-col h-full bg-white rounded-t-[20px] overflow-hidden">
          <div className="p-4 flex space-x-4 relative">
            <div className="w-[100px] h-[100px] bg-[#F8F8F8] rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 p-1">
              <img src={displayImage} alt="Produto" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col justify-start pt-1 space-y-1">
              <div className="flex items-center space-x-2">
                <div className="bg-[#FF2C55] text-white text-[12px] font-bold px-1.5 py-0.5 rounded-sm">-89%</div>
                <div className="text-[#FF2C55] font-bold flex items-baseline">
                  <span className="text-[14px] mr-1">R$</span>
                  <span className="text-[26px] leading-none">{currentVar.price}</span>
                </div>
              </div>
              <div className="text-[12px] text-gray-400 line-through">R$ {product.originalPrice}</div>
              <div className="bg-[#E6F9F6] text-[#00BFA5] text-[10px] font-bold px-2 py-1 rounded-sm flex items-center w-fit mt-1">
                <Truck size={12} className="mr-1 fill-[#00BFA5]/10" />Frete grátis
              </div>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 p-1"><X size={24} className="text-gray-900" /></button>
          </div>

          <div className="bg-[#FF8A00] px-4 py-2.5 flex items-center justify-between text-white mx-4 rounded-lg mb-4">
            <div className="flex items-center space-x-1 font-bold text-[14px]"><Zap size={16} className="fill-white" /><span>Oferta Relâmpago</span></div>
            <div className="text-[12px]">Termina em <span className="font-bold">1 dia</span></div>
          </div>

          <div className="flex-grow overflow-y-auto px-4 space-y-4">
            <h3 className="text-[13px] font-bold text-gray-900 uppercase">ESCOLHA UMA OPÇÃO ({variations.length})</h3>
            <div className="flex space-x-3 pb-4 overflow-x-auto no-scrollbar">
              {variations.map((v, idx) => (
                <div key={idx} className="flex flex-col w-[140px] shrink-0 cursor-pointer" onClick={() => setSelectedVariation(idx)}>
                  <div className={`relative aspect-square rounded-lg overflow-hidden border-2 mb-2 ${selectedVariation === idx ? 'border-[#FF2C55]' : 'border-gray-100'}`}>
                    <img src={product.media[v.imageIndex]?.src} className="w-full h-full object-cover" alt={v.name} />
                    <div className="absolute top-1.5 left-1.5 bg-black/20 rounded-full p-1"><Maximize2 size={12} className="text-white" /></div>
                  </div>
                  <div className={`text-[12px] font-medium text-center py-1 px-1 rounded-md ${selectedVariation === idx ? 'text-[#FF2C55] bg-[#FFF1F3]' : 'text-gray-900 bg-gray-50'}`}>{v.name}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center py-6">
              <h3 className="text-[14px] font-bold text-gray-900">Quantidade</h3>
              <div className="flex items-center bg-[#F1F1F1] rounded-lg h-10 px-1">
                <button className="w-10 h-10 flex items-center justify-center" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}><Minus size={18} /></button>
                <span className="w-12 text-center text-[16px] font-bold border-x border-gray-200">{quantity}</span>
                <button className="w-10 h-10 flex items-center justify-center" onClick={() => setQuantity(q => q + 1)}><Plus size={18} /></button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white">
            <Button className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[52px]" onClick={handleConfirmAction}>
              {mode === 'cart' ? "Adicionar ao carrinho" : "Comprar agora"}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default VariationSelectorDrawer;