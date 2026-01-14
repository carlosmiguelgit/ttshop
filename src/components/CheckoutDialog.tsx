import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from '@/data/products';
import { showError } from '@/utils/toast';

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onFinalize: (capacity: string) => void;
}

const CheckoutDialog: React.FC<CheckoutDialogProps> = ({ isOpen, onClose, product, onFinalize }) => {
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
      shippingInfo.cep.trim() !== '' &&
      shippingInfo.address.trim() !== '' &&
      shippingInfo.number.trim() !== '' &&
      shippingInfo.neighborhood.trim() !== '' &&
      shippingInfo.city.trim() !== '' &&
      shippingInfo.state.trim() !== ''
    );
  }, [shippingInfo]);

  const handleFinalizeClick = () => {
    if (!isFormValid) {
      showError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    // Default capacity for finalization
    onFinalize("128GB");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Finalizar Compra</DialogTitle>
          <DialogDescription>
            Preencha suas informações de entrega para continuar.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Shipping Info */}
          <div>
            <Label className="text-base font-semibold">Informações de Entrega</Label>
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