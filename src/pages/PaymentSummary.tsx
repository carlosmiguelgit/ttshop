import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '@/data/products';
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Barcode, QrCode } from 'lucide-react';
import { showSuccess } from '@/utils/toast';

interface ShippingInfo {
  cep: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

const PaymentSummary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit_card' | 'boleto'>('pix');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);

  useEffect(() => {
    // Get product data and shipping info from location state
    if (location.state?.product) {
      setProduct(location.state.product);
    }

    if (location.state?.shippingInfo) {
      setShippingInfo(location.state.shippingInfo);
    } else {
      // If no product data, redirect back to product page
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!product || !shippingInfo) {
    return <div className="p-4 text-center">Carregando...</div>;
  }

  // Calculate final price based on payment method
  const getFinalPrice = () => {
    if (paymentMethod === 'pix') {
      return '47,00'; // PIX price
    } else {
      return product.originalPrice; // Credit card/boleto price (249,00)
    }
  };

  const finalPrice = getFinalPrice();

  const handleGeneratePayment = () => {
    if (paymentMethod === 'pix') {
      // Navigate to PIX payment page with product and shipping info
      navigate('/pix-pagamento', { state: { product, shippingInfo } });
    } else {
      showSuccess("Pagamento gerado com sucesso! Redirecionando para checkout...");
      // Redirect to checkout page for other payment methods
      setTimeout(() => {
        window.location.href = '/checkout.html';
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-[600px] mx-auto bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Resumo do Pedido</h1>

          {/* Product Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <img
                src={product.media[0]?.src || 'public/placeholder.svg'}
                alt={product.title}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-sm font-medium text-gray-800 line-clamp-2">
                  {product.title}
                </h2>
                <div className="mt-2">
                  <span className="text-lg font-bold text-red-600">
                    R$ {finalPrice}
                  </span>
                  {paymentMethod !== 'pix' && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      R$ {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Price Details */}
          <div className="bg-white rounded-lg p-4 mb-4 border">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Detalhes do Pedido</h3>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Valor original</span>
                <span className="text-gray-600">R$ {product.originalPrice}</span>
              </div>

              {paymentMethod === 'pix' && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Desconto PIX</span>
                  <span className="text-green-600">-R$ {product.discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between font-bold text-lg mt-3 pt-2 border-t">
                <span className="text-gray-900">Total</span>
                <span className="text-red-600">R$ {finalPrice}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address Container - Now below order details */}
          <div className="bg-white rounded-lg p-4 mb-4 border">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Endereço de Entrega</h3>

            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <span className="font-medium text-gray-800">CEP:</span>
                <span className="ml-2 text-gray-600">{shippingInfo.cep}</span>
              </div>

              <div className="flex items-center">
                <span className="font-medium text-gray-800">Endereço:</span>
                <span className="ml-2 text-gray-600">{shippingInfo.address}, {shippingInfo.number}</span>
              </div>

              {shippingInfo.complement && (
                <div className="flex items-center">
                  <span className="font-medium text-gray-800">Complemento:</span>
                  <span className="ml-2 text-gray-600">{shippingInfo.complement}</span>
                </div>
              )}

              <div className="flex items-center">
                <span className="font-medium text-gray-800">Bairro:</span>
                <span className="ml-2 text-gray-600">{shippingInfo.neighborhood}</span>
              </div>

              <div className="flex items-center">
                <span className="font-medium text-gray-800">Cidade/Estado:</span>
                <span className="ml-2 text-gray-600">{shippingInfo.city}, {shippingInfo.state}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg p-4 mb-4 border">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Método de Pagamento</h3>

            <div className="space-y-3">
              {/* PIX Option */}
              <div
                className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  paymentMethod === 'pix' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setPaymentMethod('pix')}
              >
                <div className="flex items-center">
                  <QrCode className="mr-3 text-red-500" size={20} />
                  <div className="flex flex-col">
                    <span className="font-medium">PIX</span>
                    <span className="text-sm text-gray-500">R$ 47,00</span>
                  </div>
                </div>
                {paymentMethod === 'pix' && <Check className="text-red-500" size={20} />}
              </div>

              {/* Credit Card Option */}
              <div
                className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  paymentMethod === 'credit_card' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setPaymentMethod('credit_card')}
              >
                <div className="flex items-center">
                  <CreditCard className="mr-3 text-gray-500" size={20} />
                  <div className="flex flex-col">
                    <span className="font-medium">Cartão de Crédito</span>
                    <span className="text-sm text-gray-500">R$ 249,00</span>
                  </div>
                </div>
                {paymentMethod === 'credit_card' && <Check className="text-red-500" size={20} />}
              </div>

              {/* Boleto Option */}
              <div
                className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                  paymentMethod === 'boleto' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setPaymentMethod('boleto')}
              >
                <div className="flex items-center">
                  <Barcode className="mr-3 text-gray-500" size={20} />
                  <div className="flex flex-col">
                    <span className="font-medium">Boleto Bancário</span>
                    <span className="text-sm text-gray-500">R$ 249,00</span>
                  </div>
                </div>
                {paymentMethod === 'boleto' && <Check className="text-red-500" size={20} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center">
        <div className="w-full max-w-[600px] bg-white border-t shadow-lg p-4">
          <Button
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-full text-lg h-12"
            onClick={handleGeneratePayment}
          >
            Gerar Pagamento
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;