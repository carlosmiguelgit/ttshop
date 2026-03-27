import React, { useState } from 'react';
import ProductReviewsHeader from './ProductReviewsHeader';
import ProductReviewsList from './ProductReviewsList';
import { Review } from '@/data/products';

interface ProductReviewsSectionProps {
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({ rating, reviewCount, reviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleViewMore = () => {
    setShowAllReviews(true);
  };

  return (
    <div className="bg-white p-4">
      <ProductReviewsHeader 
        rating={rating} 
        reviewCount={reviewCount} 
        onViewMoreClick={handleViewMore}
        showViewMore={!showAllReviews && reviews.length > 1}
      />
      <ProductReviewsList 
        showAll={showAllReviews} 
        reviews={reviews}
      />
      {/* Linha separadora horizontal abaixo dos depoimentos */}
      <div className="h-[1px] bg-gray-50 w-full mt-4"></div>
    </div>
  );
};

export default ProductReviewsSection;