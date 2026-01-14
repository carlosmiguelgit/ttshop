import React from 'react';
import { Star } from 'lucide-react';
import ReviewImageGallery from './ReviewImageGallery'; // Importando o novo componente

interface ReviewCardProps {
  username: string;
  date: string;
  avatarSrc?: string; // Made optional
  verified: boolean;
  attributes: string; // Mantido, mas não será exibido
  comment: string;
  reviewImages?: string[]; // Made optional
}

// Função para mascarar o nome de usuário (ex: carlos.santos -> c**s)
const maskUsername = (username: string): string => {
  if (username.length <= 2) return username;
  const firstChar = username[0];
  const lastChar = username[username.length - 1];
  return `${firstChar}**${lastChar}`;
};

const ProductReviewCard: React.FC<ReviewCardProps> = ({
  username,
  date,
  avatarSrc = "https://evento-ttk.shop/assets/review-profile-default.jpg", // Default avatar
  comment,
  reviewImages,
}) => {
  const maskedUsername = maskUsername(username);

  // Renderiza 5 estrelas amarelas fixas
  const renderStars = () => (
    <div className="flex mb-1">
      {Array(5).fill(0).map((_, i) => (
        <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
      ))}
    </div>
  );

  return (
    <div className="py-4">
      {/* Header da Avaliação (Usuário e Data) */}
      <div className="flex items-center mb-2">
        <img 
          src={avatarSrc} 
          alt={username} 
          className="w-8 h-8 rounded-full object-cover mr-2" 
        />
        <span className="font-semibold text-sm text-gray-900">{maskedUsername}</span>
        {/* A data foi removida daqui para seguir o padrão da imagem, mas pode ser reintroduzida se necessário */}
      </div>

      {/* Estrelas */}
      {renderStars()}

      {/* Item: Padrão */}
      <p className="text-sm text-gray-500 mb-2">Item: Padrão</p>

      {/* Comentário */}
      <p className="text-sm text-gray-700 leading-relaxed mb-3">
        {comment}
      </p>

      {/* Galeria de Imagens da Avaliação (agora usando o novo componente) */}
      {reviewImages && reviewImages.length > 0 && (
        <ReviewImageGallery reviewImages={reviewImages} />
      )}

      {/* Compra Verificada removida */}
    </div>
  );
};

export default ProductReviewCard;