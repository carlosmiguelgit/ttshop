import React, { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product } from '@/data/products';
import { showError } from '@/utils/toast';
import { useNavigate } from 'react-router-dom';

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

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // CEP validation - only allow numbers and limit to 8 characters
    if (name === 'cep') {
      const cleanedValue = value.replace(/\D/g, '').slice(0, 8);
      setShippingInfo(prev => ({ ...prev, [name]: cleanedValue }));

      // Auto-fetch address when CEP has 8 digits
      if (cleanedValue.length === 8) {
        fetchCEPData(cleanedValue);
      }
      return;
    }

    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const fetchCEPData = async (cep: string) => {
    if (cep.length !== 8) return;

    setIsLoading(true);

    try {
      // Using ViaCEP - free Brazilian CEP API
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        showError("CEP não encontrado. Por favor, verifique o número.");
        return;
      }

      // Auto-fill address fields
      setShippingInfo(prev => ({
        ...prev,
        address: data.logradouro || '',
        neighborhood: data.bairro || '',
        city: data.localidade || '',
        state: data.uf || '',
        complement: data.complemento || ''
      }));

    } catch (error) {
      showError("Erro ao buscar CEP. Por favor, tente novamente.");
      console.error("CEP API error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = useMemo(() => {
    return (
      shippingInfo.cep.length === 8 &&
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
    // Navigate to payment summary page with product data and shipping info
    navigate('/resumo-pagamento', { state: { product, shippingInfo } });
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
                <Input
                  id="cep"
                  name="cep"
                  value={shippingInfo.cep}
                  onChange={handleInputChange}
                  placeholder="00000000"
                  maxLength={8}
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500">Digite apenas números (8 dígitos)</p>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  placeholder="Rua, Avenida, etc."
                  disabled={isLoading}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="number">Número</Label>
                  <Input
                    id="number"
                    name="number"
                    value={shippingInfo.number}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    name="complement"
                    value={shippingInfo.complement}
                    onChange={handleInputChange}
                    placeholder="Opcional"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input
                  id="neighborhood"
                  name="neighborhood"
                  value={shippingInfo.neighborhood}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    placeholder="UF"
                    maxLength={2}
                    disabled={isLoading}
                  />
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
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? 'Processando...' : 'Prosseguir para pagamento'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;