"use client";

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ChevronRight, Star, Plus, Minus, 
  Zap, Loader2, AlertCircle
} from 'lucide-react';
import { products, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import NoteDrawer from '@/components/NoteDrawer';
import TikTokCouponDrawer from '@/components/TikTokCouponDrawer';
import { showError } from '@/utils/toast';

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVar, setSelectedVar] = useState("Padrão");
  const [selectedPrice, setSelectedPrice] = useState("");
  
  const [isNoteDrawerOpen, setIsNoteDrawerOpen] = useState(false);
  const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const [addressData, setAddressData] = useState<any>(null);
  const [cardData, setCardData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('pix');

  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState(false);

  useEffect(() => {
    if (location.state?.product) {
      const p = location.state.product;
      setProduct(p);
      setQuantity(location.state.initialQuantity || 1);
      setSelectedVar(location.state.selectedVariation || "Padrão");
      setSelectedPrice(location.state.selectedPrice || p.currentPrice);
    } else {
      setProduct(products[0]);
      setSelectedPrice(products[0].currentPrice);
    }

    if (location.state?.addressData) setAddressData(location.state.addressData);
    if (location.state?.cardData) {
      setCardData(location.state.cardData);
      setPaymentMethod('card');
    }
  }, [location.state]);

  const priceValue = parseFloat((selectedPrice || "0,00").replace(',', '.'));
  const subtotal = priceValue * quantity;
  const couponAmount = 5;
  const finalTotal = subtotal - couponAmount;

  const formatPrice = (val: number) => val.toFixed(2).replace('.', ',');

  const handlePlaceOrder = () => {
    if (!addressData) {
      showError("Por favor, adicione um endereço de entrega.");
      navigate(`/${product?.slug}/endereco`, { state: location.state });
      return;
    }

    setIsProcessing(true);
    
    if (paymentMethod === 'card') {
      if (!cardData) {
        setIsProcessing(false);
        navigate(`/${product?.slug}/cartao`, { state: location.state });
        return;
      }
      // Simulação de erro de cartão após 3 segundos
      setTimeout(() => {
        setIsProcessing(false);
        setCardError(true);
      }, 3000);
    } else {
      setTimeout(() => {
        setIsProcessing(false);
        navigate(`/${product?.slug}/pix`, { state: { product } });
      }, 1000);
    }
  };

  if (!product) return null;

  return (
    <div className="min-h-screen bg-white pb-[120px]">
      {/* Overlay de Processamento */}
      {isProcessing && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-8 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 w-full max-w-xs text-center shadow-2xl">
            <Loader2 className="animate-spin text-[#FF2C55]" size={32} />
            <p className="font-bold text-gray-900">Processando pedido...</p>
          </div>
        </div>
      )}

      {/* Modal de Erro de Cartão */}
      {cardError && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 flex flex-col items-center space-y-4 w-full max-w-xs text-center shadow-2xl">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <AlertCircle className="text-red-500" size={28} />
            </div>
            <h3 className="font-bold text-lg">Transação Recusada</h3>
            <p className="text-sm text-gray-500">Não foi possível processar o pagamento com este cartão. Por favor, tente outro método ou entre em contato com seu banco.</p>
            <Button 
              className="w-full bg-[#FF2C55] rounded-full font-bold h-12"
              onClick={() => {
                setCardError(false);
                setPaymentMethod('pix');
              }}
            >
              Tentar com Pix
            </Button>
            <button 
              className="text-sm text-gray-400 font-medium"
              onClick={() => setCardError(false)}
            >
              Tentar outro cartão
            </button>
          </div>
        </div>
      )}

      {/* Header - Clone 1:1 */}
      <div className="bg-white sticky top-0 z-40 border-b h-14 flex items-center px-4">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="flex-grow text-center text-[18px] font-bold text-[#161823] mr-8">Resumo do Pedido</h1>
      </div>

      {/* Seção Endereço - Clone 1:1 */}
      <div 
        className="p-5 flex items-center justify-between cursor-pointer border-b border-gray-100"
        onClick={() => navigate(`/${product.slug}/endereco`, { state: location.state })}
      >
        <div className="flex items-start space-x-4">
          <div className="mt-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#00BFA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="#00BFA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[16px] font-bold text-[#161823]">Endereço de envio</span>
            <span className="text-[14px] text-gray-400 mt-0.5">
              {addressData ? `${addressData.address}, ${addressData.number}` : "Adicionar endereço"}
            </span>
          </div>
        </div>
        <ChevronRight size={20} className="text-gray-200" />
      </div>

      {/* Seção Loja e Nota - Clone 1:1 */}
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-[16px] font-bold text-[#161823]">HAVAN</span>
          <button 
            className="text-[14px] text-gray-400 flex items-center"
            onClick={() => setIsNoteDrawerOpen(true)}
          >
            {orderNote ? "Ver nota" : "Adicionar nota"} <ChevronRight size={16} className="ml-0.5" />
          </button>
        </div>

        {/* Social Proof - Clone 1:1 */}
        <div className="flex items-start space-x-2">
          <Star size={18} className="text-[#D4A017] fill-[#D4A017] mt-0.5" />
          <p className="text-[13px] text-[#8B5E3C] font-medium leading-tight">
            Melhor escolha! 48.8K vendido(s) e com nota 4.8/5,0
          </p>
        </div>

        {/* Card do Produto - Clone 1:1 */}
        <div className="flex space-x-4 pt-2">
          <div className="w-[100px] h-[100px] bg-[#F8F8F8] rounded-xl overflow-hidden shrink-0 border border-gray-100 p-1">
            <img src={product.media[0].src} className="w-full h-full object-contain" alt="Produto" />
          </div>
          <div className="flex-grow space-y-1.5">
            <h3 className="text-[14px] font-bold text-[#161823] line-clamp-2 leading-tight">
              {product.title}
            </h3>
            <p className="text-[13px] text-gray-400">{selectedVar}</p>
            
            <div className="flex flex-wrap gap-2">
              <div className="bg-[#FFF1F3] text-[#FF2C55] text-[11px] font-bold px-2 py-0.5 rounded-sm flex items-center">
                <Zap size={12} className="mr-1 fill-[#FF2C55]" /> Oferta Relâmpago
              </div>
              <div className="bg-[#F8F8F8] text-gray-500 text-[11px] font-medium px-2 py-0.5 rounded-sm flex items-center">
                <div className="w-3 h-3 bg-orange-400 rounded-full flex items-center justify-center mr-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
                Devolução gratuita
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[18px] font-bold text-[#FF2C55]">R$ {selectedPrice}</span>
              
              {/* Seletor de Quantidade - Estilo exato do print */}
              <div className="flex items-center bg-[#F1F1F2] rounded-md h-8 px-1">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 flex items-center justify-center text-gray-600">
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center text-[14px] font-bold text-[#161823]">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="w-8 h-8 flex items-center justify-center text-gray-600">
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total e Botão - Clone 1:1 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t p-5 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-5">
          <span className="text-[18px] font-bold text-[#161823]">Total</span>
          <span className="text-[22px] font-bold text-[#FF2C55]">R$ {formatPrice(finalTotal)}</span>
        </div>
        <Button 
          className="w-full bg-[#FF2C55] hover:bg-[#E0254B] text-white font-bold rounded-full h-[56px] text-[18px] shadow-none border-none"
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? "Processando..." : "Fazer pedido"}
        </Button>
      </div>

      <NoteDrawer 
        isOpen={isNoteDrawerOpen} 
        onClose={() => setIsNoteDrawerOpen(false)} 
        onSave={setOrderNote} 
        initialNote={orderNote} 
      />
      
      <TikTokCouponDrawer 
        isOpen={isCouponDrawerOpen} 
        onClose={() => setIsCouponDrawerOpen(false)} 
        onSelect={() => {}}
        selectedAmount={5}
      />
    </div>
  );
};

export default Checkout;