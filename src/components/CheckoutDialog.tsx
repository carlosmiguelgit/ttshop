import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import { showError } from '@/utils/toast';

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onFinalize: (capacity: string) => void;
}

const colorNames = ["Preto", "Azul", "Rosa", "Verde"];
const storageOptions = ["128GB", "256GB", "512GB", "1TB"];

const CheckoutDialog: React.FC<CheckoutDialogProps> = ({ isOpen, onClose, product, onFinalize }) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [shippingInfo, setShippingInfo] = useState({
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = useMemo(() => {
    return (
      selectedColorIndex !== null &&
      selectedStorage !== null &&
      shippingInfo.cep.trim() !== '' &&
      shippingInfo.address.trim() !== '' &&
      shippingInfo.number.trim() !== '' &&
      shippingInfo.neighborhood.trim() !== '' &&
      shippingInfo.city.trim() !== '' &&
      shippingInfo.state.trim() !== ''
    );
  }, [selectedColorIndex, selectedStorage, shippingInfo]);

  const handleFinalizeClick = () => {
    if (!isFormValid) {
      showError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    if (selectedStorage) {
      onFinalize(selectedStorage);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Finalizar Compra</DialogTitle>
          <DialogDescription>
            Selecione as opções e preencha suas informações de entrega para continuar.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* 1. Color Selection */}
          <div>
            <Label className="text-base font-semibold">1. Selecione a cor</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {product.media.map((item, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setSelectedColorIndex(index)}
                >
                  <div className={cn(
                    "p-1 border-2 rounded-md transition-colors",
                    selectedColorIndex === index ? 'border-cyan-500' : 'border-transparent'
                  )}>
                    <img 
                      src={item.thumbnailSrc} 
                      alt={colorNames[index]} 
                      className="w-16 h-16 object-cover rounded-sm"
                    />
                  </div>
                  <span className={cn(
                    "text-xs mt-1",
                    selectedColorIndex === index ? 'font-bold text-cyan-600' : 'text-gray-600'
                  )}>
                    {colorNames[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Storage Selection */}
          <div>
            <Label className="text-base font-semibold">2. Selecione a capacidade</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {storageOptions.map((storage) => (
                <Button
                  key={storage}
                  variant="outline"
                  className={cn(
                    "h-auto py-2",
                    selectedStorage === storage ? 'border-cyan-500 text-cyan-600 bg-cyan-50' : ''
                  )}
                  onClick={() => setSelectedStorage(storage)}
                >
                  {storage}
                </Button>
              ))}
            </div>
          </div>

          {/* 3. Shipping Info */}
          <div>
            <Label className="text-base font-semibold">3. Informações de Entrega</Label>
            <div className="space-y-3 mt-2">
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" name="cep" value={shippingInfo.cep} onChange={handleInputChange} placeholder="00000-000" />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" name="address" value={shippingInfo.address} onChange={handleInputChange} placeholder="Rua, Avenida, etc." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="number">Número</Label>
                  <Input id="number" name="number" value={shippingInfo.number} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="complement">Complemento</Label>
                  <Input id="complement" name="complement" value={shippingInfo.complement} onChange={handleInputChange} placeholder="Opcional" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" name="neighborhood" value={shippingInfo.neighborhood} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" name="city" value={shippingInfo.city} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input id="state" name="state" value={shippingInfo.state} onChange={handleInputChange} placeholder="UF" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            type="button" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
            onClick={handleFinalizeClick}
            disabled={!isFormValid}
          >
            Prosseguir para pagamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;