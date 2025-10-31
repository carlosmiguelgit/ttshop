import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  username: string;
  date: string;
  avatarSrc: string;
  verified: boolean;
  attributes: string; // Mantido, mas não será exibido
  comment: string;
  reviewImages?: string[];
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
  avatarSrc,
  verified,
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
      
      {/* Galeria de Imagens da Avaliação (se houver) */}
      {reviewImages && reviewImages.length > 0 && (
        <div className="flex space-x-2 overflow-x-auto py-2">
          {reviewImages.map((src, index) => (
            <img 
              key={index}
              src={src}
              alt={`Imagem da avaliação ${index + 1}`}
              className="w-16 h-16 object-cover rounded-md border border-gray-200 flex-shrink-0"
            />
          ))}
        </div>
      )}
      
      {/* Compra Verificada (Mantido, mas pode ser movido se o layout final exigir) */}
      {verified && (
        <p className="text-xs text-gray-500 mt-2">Compra Verificada</p>
      )}
    </div>
  );
};

export default ProductReviewCard;