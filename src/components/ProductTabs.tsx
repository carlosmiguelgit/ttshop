import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductDescription from './ProductDescription';
import ProductReviewsHeader from './ProductReviewsHeader';
import ProductReviewsList from './ProductReviewsList';
import { Product } from '@/data/products';

interface ProductTabsProps {
  product: Product;
}

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  return (
    <Tabs defaultValue="description" className="w-full mt-4 bg-white">
      <TabsList className="grid w-full grid-cols-2 h-12 rounded-none border-b border-gray-100 bg-white p-0">
        <TabsTrigger 
          value="description" 
          className="text-base font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-500 rounded-none"
        >
          Descrição
        </TabsTrigger>
        <TabsTrigger 
          value="reviews" 
          className="text-base font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 data-[state=active]:text-cyan-500 rounded-none"
        >
          Avaliações
        </TabsTrigger>
      </TabsList>
      
      {/* Conteúdo da Descrição */}
      <TabsContent value="description" className="mt-0">
        <ProductDescription 
          specifications={product.specifications} 
          descriptionText={product.descriptionText}
        />
      </TabsContent>
      
      {/* Conteúdo das Avaliações */}
      <TabsContent value="reviews" className="mt-0 p-4">
        <ProductReviewsHeader 
          rating={product.rating} 
          reviewCount={product.reviewCount} 
        />
        <ProductReviewsList />
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;