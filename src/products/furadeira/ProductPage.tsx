"use client";

import React, { useState, useEffect, useMemo } from 'react';
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
import { Truck } from 'lucide-react';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const FuradeiraProductPage: React.FC = () => {
  const navigate = useNavigate();
  
  const product = {
    slug: "furadeira",
    title: "Furadeira de Impacto Bosch GSB 450 RE 450W 127V com Chave de Mandril",
    currentPrice: "89,90",
    originalPrice: "349,00",
    rating: 4.9,
    reviewCount: 8500,
    media: [
      { type: 'image', src: "https://m.media-amazon.com/images/I/51-v6v6v6vL._AC_SL1000_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51-v6v6v6vL._AC_SL1000_.jpg" },
    ],
    specifications: [
      { label: "Potência", value: "450W" },
      { label: "Mandril", value: "3/8\"" },
    ],
    descriptionText: "A Furadeira de Impacto Bosch GSB 450 RE é a mais compacta da categoria...",
    reviews: []
  };

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isVariationDrawerOpen, setIsVariationDrawerOpen] = useState(false);

  const deliveryDateRange = useMemo(() => {
    const today = new Date();
    const start = addDays(today, 3);
    const end = addDays(today, 8);
    return `${format(start, 'dd')} – ${format(end, 'dd')} de ${format(end, 'MMM', { locale: ptBR })}`;
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F8F8] pb-[104px]">
      <Header productTitle={product.title} cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="max-w-[600px] mx-auto bg-white shadow-sm mt-[48px]">
        <ProductImageGallery media={product.media as any} onCartClick={() => setIsCartOpen(true)} cartItemCount={cartItemCount} />
        <ProductPriceSection product={product as any} onCouponsClick={() => {}} onShippingClick={() => {}} />
        <CustomerProtectionSection onClick={() => {}} />
        <ProductReviewsSection rating={product.rating} reviewCount={product.reviewCount} reviews={[]} />
        <ProductDescription specifications={product.specifications} descriptionText={product.descriptionText} firstImageSrc={product.media[0].src} />
        <MadeWithDyad />
      </div>

      <ProductActionsBar 
        onAddToCartClick={() => setIsVariationDrawerOpen(true)}
        onBuyWithCouponClick={() => setIsVariationDrawerOpen(true)}
        onChatClick={() => {}}
      />
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} onCheckoutClick={() => navigate('/furadeira/checkout')} product={product as any} cartItemCount={cartItemCount} />
      <VariationSelectorDrawer 
        isOpen={isVariationDrawerOpen} 
        onClose={() => setIsVariationDrawerOpen(false)} 
        product={product as any} 
        onConfirm={(qty) => { navigate('/furadeira/checkout', { state: { product, initialQuantity: qty } }); }} 
        mode="buy" 
      />
    </div>
  );
};

export default FuradeiraProductPage;