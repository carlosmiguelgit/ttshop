"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
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
import ProductRecommendations from '@/components/ProductRecommendations';
import { Truck, LayoutGrid, ChevronRight, ArrowUp } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const FuradeiraProductPage: React.FC = () => {
  const navigate = useNavigate();
  const product = products.find(p => p.slug === "furadeira")!;

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isVariationDrawerOpen, setIsVariationDrawerOpen] = useState(false);
  const [variationDrawerMode, setVariationDrawerMode] = useState<'cart' | 'buy'>('cart');
  const [isCouponsDrawerOpen, setIsCouponsDrawerOpen] = useState(false);
  const [isShippingDrawerOpen, setIsShippingDrawerOpen] = useState(false);
  const [isProtectionDrawerOpen, setIsProtectionDrawerOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Lógica de Aleatoriedade Sincronizada (Gera uma vez para toda a página)
  const stats = useMemo(() => {
    const sales = Math.floor(Math.random() * (62000 - 28000 + 1)) + 28000;
    const rating = parseFloat((Math.random() * (4.9 - 4.8) + 4.8).toFixed(1));
    const reviews = Math.floor(sales * 0.2);
    return { sales, rating, reviews };
  }, []);

  // Vídeos específicos da Furadeira
  const furadeiraVideos = [
    { id: "A858_4_9vLg", author: "Oficina de Casa", avatar: "https://randomuser.me/api/portraits/men/10.jpg" },
    { id: "uC7cxPROwuQ", author: "Dicas de Ferramentas", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
    { id: "Wz7Lf9JZckA", author: "Review Tech", avatar: "https://randomuser.me/api/portraits/men/12.jpg" },
    { id: "Tc4CRERkBFM", author: "Mestre da Obra", avatar: "https://randomuser.me/api/portraits/men/13.jpg" },
    { id: "QilgRsHYaC4", author: "Faça Você Mesmo", avatar: "https://randomuser.me/api/portraits/men/14.jpg" },
  ];

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 1000);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const deliveryDateRange = useMemo(() => {
    const today = new Date();
    const start = addDays(today, 2);
    const end = addDays(today, 7);
    return `${format(start, 'dd')} – ${format(end, 'dd')} de ${format(end, 'MMM', { locale: ptBR })}`;
  }, []);

  const handleConfirmVariation = (qty: number, mode: 'cart' | 'buy', variation: string, price: string) => {
    if (mode === 'buy') {
      navigate('/furadeira/checkout', { state: { product, initialQuantity: qty, selectedVariation: variation, selectedPrice: price } });
    } else {
      setCartItemCount(prev => prev + qty);
      setIsVariationDrawerOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[104px]">
      <Header productTitle={product.title} cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="max-w-[600px] mx-auto bg-white shadow-sm mt-[48px]">
        <ProductImageGallery media={product.media as any} onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
        
        {/* Passando stats sincronizados para o topo */}
        <ProductPriceSection 
          product={product as any} 
          rating={stats.rating}
          salesCount={stats.sales}
          reviewCount={stats.reviews}
          onCouponsClick={() => setIsCouponsDrawerOpen(true)} 
          onShippingClick={() => setIsShippingDrawerOpen(true)} 
        />
        
        <div className="bg-white p-4 border-t border-gray-50 flex items-center justify-between cursor-pointer" onClick={() => setIsVariationDrawerOpen(true)}>
          <div className="flex items-center space-x-3">
            <LayoutGrid size={20} className="text-gray-900" />
            <img src={product.media[0].src} className="w-10 h-10 rounded-md border object-cover" alt="Opção" />
            <span className="text-[13px] text-gray-400">{product.variations?.length || 1} opções disponíveis</span>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </div>
        
        <CustomerProtectionSection onClick={() => setIsProtectionDrawerOpen(true)} />
        
        {/* Passando os novos vídeos */}
        <CreatorVideosSection videos={furadeiraVideos} />
        
        {/* Passando os MESMOS stats para a seção de avaliações */}
        <ProductReviewsSection 
          rating={stats.rating} 
          reviewCount={stats.reviews} 
          reviews={product.reviews} 
        />
        
        <StoreSection />
        <ProductDescription specifications={product.specifications} descriptionText={product.descriptionText} firstImageSrc={product.media[0].src} bannerImage={product.bannerImage} />
        <ProductRecommendations currentSlug={product.slug} />
        <MadeWithDyad />
      </div>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-[120px] right-4 z-40 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center border border-gray-100"><ArrowUp size={20} className="text-gray-900" /></button>
      )}

      <div className="fixed bottom-[60px] left-0 right-0 z-20 flex justify-center">
        <div className="w-full max-w-[600px] bg-white border-t h-10 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#00BFA5]"><Truck size={16} /><span className="text-[12px] font-medium">O <span className="font-bold">frete grátis</span> expira em breve</span></div>
          <span className="text-[#00BFA5] text-[13px] font-bold font-mono">05:00:00</span>
        </div>
      </div>
      
      <ProductActionsBar onAddToCartClick={() => { setVariationDrawerMode('cart'); setIsVariationDrawerOpen(true); }} onBuyWithCouponClick={() => { setVariationDrawerMode('buy'); setIsVariationDrawerOpen(true); }} onChatClick={() => setIsChatOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckoutClick={() => navigate('/furadeira/checkout')} product={product as any} cartItemCount={cartItemCount} />
      <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} product={product as any} />
      <VariationSelectorDrawer isOpen={isVariationDrawerOpen} onClose={() => setIsVariationDrawerOpen(false)} product={product as any} onConfirm={handleConfirmVariation} mode={variationDrawerMode} />
      <CouponsDrawer isOpen={isCouponsDrawerOpen} onClose={() => setIsCouponsDrawerOpen(false)} onClaim={() => {}} />
      <ShippingDrawer isOpen={isShippingDrawerOpen} onClose={() => setIsShippingDrawerOpen(false)} deliveryDate={deliveryDateRange} />
      <CustomerProtectionDrawer isOpen={isProtectionDrawerOpen} onClose={() => setIsProtectionDrawerOpen(false)} />
    </div>
  );
};

export default FuradeiraProductPage;