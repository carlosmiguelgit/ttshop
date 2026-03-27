import React from 'react';
import { Star } from 'lucide-react';
import ReviewImageGallery from './ReviewImageGallery';

interface ReviewCardProps {
  username: string;
  avatarSrc: string;
  comment: string;
  reviewImages?: string[];
  variation: string;
}

const maskUsername = (username: string): string => {
  if (username.length <= 2) return username;
  const firstChar = username[0];
  const lastChar = username[username.length - 1];
  return `${firstChar}**${lastChar}`;
};

const ProductReviewCard: React.FC<ReviewCardProps> = ({
  username,
  avatarSrc,
  comment,
  reviewImages,
  variation,
}) => {
  const maskedUsername = maskUsername(username);
  
  const renderStars = () => (
    <div className="flex mb-1">
      {Array(5).fill(0).map((_, i) => (
        <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
      ))}
    </div>
  );

  return (
    <div className="py-4">
      <div className="flex items-center mb-2">
        <img 
          src={avatarSrc} 
          alt={username} 
          className="w-8 h-8 rounded-full object-cover mr-2" 
        />
        <span className="font-semibold text-sm text-gray-900">{maskedUsername}</span>
      </div>

      {renderStars()}

      <p className="text-[12px] text-gray-400 mb-2 font-medium">Item: {variation}</p>

      <div className="mb-3">
        <p className="text-[14px] text-gray-900 leading-relaxed">
          {comment}
        </p>
      </div>

      {reviewImages && reviewImages.length > 0 && (
        <ReviewImageGallery reviewImages={reviewImages} />
      )}
    </div>
  );
};

export default ProductReviewCard;