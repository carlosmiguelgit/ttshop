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
        <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
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

      <p className="text-sm text-gray-500 mb-2">Item: {variation}</p>

      <p className="text-sm text-gray-700 leading-relaxed mb-3">
        {comment}
      </p>

      {reviewImages && reviewImages.length > 0 && (
        <ReviewImageGallery reviewImages={reviewImages} />
      )}
    </div>
  );
};

export default ProductReviewCard;