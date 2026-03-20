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

const FuradeiraProductPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Dados isolados do produto (Furadeira)
  const product = {
    slug: "furadeira",
    title: "Furadeira de Impacto Profissional Havan Power 600W com Kit de Brocas e Maleta",
    currentPrice: "89,90",
    originalPrice: "349,00",
    rating: 4.8,
    reviewCount: 12450,
    media: [
      { type: 'image', src: "https://m.media-amazon.com/images/I/71-v6v6v6vL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/71-v6v6v6vL._AC_SL1500_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/61-v6v6v6vL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/61-v6v6v6vL._AC_SL1500_.jpg" },
    ],
    specifications: [
      { label: "Potência", value: "600W" },
      { label: "Mandril", value: "1/2\" (13mm)" },
      { label: "Velocidade", value: "0-3000 RPM" },
    ],
    descriptionText: "A Furadeira de Impacto Havan Power é a ferramenta ideal para seus projetos. Com motor potente de 600W, ela perfura madeira, metal e alvenaria com facilidade. Design ergonômico para maior conforto durante o uso prolongado.",
    reviews: [
      {
        username: "Fernanda Lima",
        avatarSrc: "/mulher/mulher (10).jpg",
        comment: "Simplesmente maravilhoso! Quando vi que baixou de 349 pra menos de 100 reais não pensei duas vezes. Chegou em 3 dias aqui em SP.",
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
  const [activeTab, setActiveTab] = useState('Visão geral');

  const sectionRefs = {
    'Visão geral': useRef<HTMLDivElement>(null),
    'Avaliações': useRef<HTMLDivElement>(null),
    'Descrição': useRef<HTMLDivElement>(null),
    'Recomendações': useRef<HTMLDivElement>(null)
  };

  useEffect(() => {
    trackTikTokEvent('ViewContent', {
      content_id: product.slug,
      content_type: 'product',
      content_name: product.title,
      value: 89.90,
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

  const scrollToSection = (tabName: string) => {
    const ref = sectionRefs[tabName as keyof typeof sectionRefs];
    if (ref.current) {
      window.scrollTo({ top: ref.current.offsetTop - 100, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[104px]">
      <Header productTitle={product.title} cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="fixed top-12 left-0 right-0 z-40 bg-white border-b flex justify-center">
        <div className="w-full max-w-[600px] flex px-4">
          {['Visão geral', 'Avaliações', 'Descrição', 'Recomendações'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => scrollToSection(tab)}
              className={`flex-1 py-3 text-[14px] font-bold transition-colors ${
                activeTab === tab ? 'text-black border-b-2 border-black' : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[600px] mx-auto bg-white shadow-sm mt-[48px]">
        <div ref={sectionRefs['Visão geral']}>
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
        </div>

        <div ref={sectionRefs['Avaliações']}>
          <ProductReviewsSection rating={product.rating} reviewCount={product.reviewCount} reviews={product.reviews as any} />
        </div>

        <StoreSection />
        
        <div ref={sectionRefs['Descrição']}>
          <ProductDescription specifications={product.specifications} descriptionText={product.descriptionText} firstImageSrc={product.media[0].src} />
        </div>

        <div ref={sectionRefs['Recomendações']}>
          <MadeWithDyad />
        </div>
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
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckoutClick={() => navigate('/furadeira/checkout')} product={product as any} cartItemCount={cartItemCount} />
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} product={product as any} />
      <VariationSelectorDrawer 
        isOpen={isVariationDrawerOpen} 
        onClose={() => setIsVariationDrawerOpen(false)} 
        product={product as any} 
        onConfirm={(qty) => { 
          if (variationDrawerMode === 'buy') {
            navigate('/furadeira/checkout', { state: { product, initialQuantity: qty } });
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

export default FuradeiraProductPage;