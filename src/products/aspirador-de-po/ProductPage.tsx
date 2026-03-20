"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ProductImageGallery from '@/components/ProductImageGallery';
import ProductPriceSection from '@/components/ProductPriceSection';
import ProductActionsBar from '@/components/ProductActionsBar';
import CartDrawer from '@/components/CartDrawer';
import { MadeWithDyad } from '@/components/made-with-dyad';
import CustomerProtectionSection from '@/components/CustomerProtectionSection';
import ProductReviewsSection from '@/components/ProductReviewsSection';
import ProductDescription from '@/components/ProductDescription';
import VariationSelectorDrawer from '@/components/VariationSelectorDrawer';
import CouponsDrawer from '@/components/CouponsDrawer';
import ShippingDrawer from '@/components/ShippingDrawer';
import CreatorVideosSection from '@/components/CreatorVideosSection';
import CustomerProtectionDrawer from '@/components/CustomerProtectionDrawer';
import ChatDrawer from '@/components/ChatDrawer';
import StoreSection from '@/components/StoreSection';
import { Truck, X, LayoutGrid, ChevronRight } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { trackTikTokEvent } from '@/utils/tiktok-pixel';

const AspiradorProductPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Dados isolados do produto
  const product = {
    slug: "aspirador-de-po",
    title: "WAP Robô Aspirador de Pó ROBOT W1000 Mapeamento de Tempo Real GYRO, Base de Carregamento, Compatível com Alexa e Google",
    currentPrice: "97,28",
    originalPrice: "899,00",
    rating: 4.8,
    reviewCount: 12450,
    media: [
      { type: 'image', src: "https://m.media-amazon.com/images/I/61n4FmVFrQL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/61n4FmVFrQL._AC_SL1500_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/51l8Ni2qSUL._AC_SL1000_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51l8Ni2qSUL._AC_SL1000_.jpg" },
    ],
    specifications: [
      { label: "Bateria (mAh)", value: "2600" },
      { label: "Cor", value: "Branco e Turquesa" },
      { label: "Autonomia", value: "Até 2h40min" },
    ],
    descriptionText: "O Robô Aspirador WAP ROBOT W1000 torna a limpeza do dia a dia contínua e sem esforço...",
    reviews: [
      {
        username: "Fernanda Lima",
        avatarSrc: "/mulher/mulher (10).jpg",
        comment: "Simplesmente maravilhoso! Chegou em 3 dias.",
        variation: "Padrão",
        reviewImages: []
      }
    ]
  };

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isVariationDrawerOpen, setIsVariationDrawerOpen] = useState(false);
  const [variationDrawerMode, setVariationDrawerMode] = useState<'cart' | 'buy'>('cart');
  const [isCouponsDrawerOpen, setIsCouponsDrawerOpen] = useState(false);
  const [isShippingDrawerOpen, setIsShippingDrawerOpen] = useState(false);
  const [isProtectionDrawerOpen, setIsProtectionDrawerOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    trackTikTokEvent('ViewContent', {
      content_id: product.slug,
      content_type: 'product',
      content_name: product.title,
      value: 97.28,
      currency: 'BRL'
    });
  }, []);

  const deliveryDateRange = useMemo(() => {
    const today = new Date();
    const start = addDays(today, 2);
    const end = addDays(today, 7);
    return `${format(start, 'dd')} – ${format(end, 'dd')} de ${format(end, 'MMM', { locale: ptBR })}`;
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:00`;
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[104px]">
      <Header productTitle={product.title} cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="max-w-[600px] mx-auto bg-white shadow-sm mt-[48px]">
        <ProductImageGallery media={product.media as any} onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
        
        <ProductPriceSection 
          product={product as any} 
          onCouponsClick={() => setIsCouponsDrawerOpen(true)}
          onShippingClick={() => setIsShippingDrawerOpen(true)}
        />

        <div className="bg-white p-4 border-t border-gray-50 flex items-center justify-between cursor-pointer" onClick={() => setIsVariationDrawerOpen(true)}>
          <div className="flex items-center space-x-3">
            <LayoutGrid size={20} className="text-gray-900" />
            <img src={product.media[0].src} className="w-10 h-10 rounded-md border object-cover" alt="Opção" />
            <span className="text-[13px] text-gray-400">1 opção disponível</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>
        
        <CustomerProtectionSection onClick={() => setIsProtectionDrawerOpen(true)} />
        <CreatorVideosSection />
        <ProductReviewsSection rating={product.rating} reviewCount={product.reviewCount} reviews={product.reviews as any} />
        <StoreSection />
        <ProductDescription specifications={product.specifications} descriptionText={product.descriptionText} firstImageSrc={product.media[0].src} />
        <MadeWithDyad />
      </div>

      <div className="fixed bottom-[60px] left-0 right-0 z-20 flex justify-center">
        <div className="w-full max-w-[600px] bg-white border-t h-10 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#00BFA5]">
            <Truck size={16} />
            <span className="text-[12px] font-medium">O <span className="font-bold">frete grátis</span> expira em breve</span>
          </div>
          <span className="text-[#00BFA5] text-[13px] font-bold font-mono">{formatTimer(timeLeft)}</span>
        </div>
      </div>
      
      <ProductActionsBar 
        onAddToCartClick={() => { setVariationDrawerMode('cart'); setIsVariationDrawerOpen(true); }}
        onBuyWithCouponClick={() => { setVariationDrawerMode('buy'); setIsVariationDrawerOpen(true); }}
        onChatClick={() => setIsChatOpen(true)}
      />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckoutClick={() => navigate('/aspirador-de-po/checkout')} product={product as any} cartItemCount={cartItemCount} />
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} product={product as any} />
      <VariationSelectorDrawer 
        isOpen={isVariationDrawerOpen} 
        onClose={() => setIsVariationDrawerOpen(false)} 
        product={product as any} 
        onConfirm={(qty) => { 
          if (variationDrawerMode === 'buy') {
            navigate('/aspirador-de-po/checkout', { state: { product, initialQuantity: qty } });
          } else {
            setCartItemCount(prev => prev + qty);
            setIsVariationDrawerOpen(false);
          }
        }} 
        mode={variationDrawerMode} 
      />
      <CouponsDrawer isOpen={isCouponsDrawerOpen} onClose={() => setIsCouponsDrawerOpen(false)} onClaim={() => {}} />
      <ShippingDrawer isOpen={isShippingDrawerOpen} onClose={() => setIsShippingDrawerOpen(false)} deliveryDate={deliveryDateRange} />
      <CustomerProtectionDrawer isOpen={isProtectionDrawerOpen} onClose={() => setIsProtectionDrawerOpen(false)} />
    </div>
  );
};

export default AspiradorProductPage;