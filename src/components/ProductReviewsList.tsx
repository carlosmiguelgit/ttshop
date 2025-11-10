import React from 'react';
import ProductReviewCard from './ProductReviewCard';
import { Separator } from "@/components/ui/separator";

const allReviews = [
  {
    username: "ana.ribeiro",
    date: "30 de out",
    avatarSrc: "https://randomuser.me/api/portraits/women/6.jpg",
    verified: true,
    attributes: "Custo-benefício: ótimo | Qualidade: superior",
    comment: "Inacreditável! Um iPhone 13 por esse preço? Pensei que era golpe, mas chegou tudo certo e no dia seguinte. A câmera é espetacular, as fotos ficam profissionais. Melhor compra que já fiz!",
    reviewImages: [
      "https://evento-ttk.shop/assets/review-iphone13-photo-1-real-Cgm1jsLz.jpg",
    ],
  },
  {
    username: "joao.melo",
    date: "29 de out",
    avatarSrc: "https://randomuser.me/api/portraits/men/1.jpg",
    verified: true,
    attributes: "Bateria: dura o dia todo | Desempenho: excelente",
    comment: "A bateria dura o dia todo, mesmo usando bastante. O celular é muito rápido, não trava nada. A tela tem uma qualidade de imagem impressionante. Valeu cada centavo, a promoção é real!",
    reviewImages: [
      "https://evento-ttk.shop/assets/review-iphone13-photo-2-real-YCTmOGhd.jpg",
    ],
  },
  {
    username: "fernanda.paz",
    date: "29 de out",
    avatarSrc: "https://randomuser.me/api/portraits/women/2.jpg",
    verified: true,
    attributes: "Câmera: modo cinema | Design: lindo",
    comment: "Chegou perfeito, na caixa lacrada. O design é lindo e o celular é super potente. O modo cinema da câmera é incrível. Recomendo demais, podem comprar sem medo.",
    reviewImages: [
      "https://evento-ttk.shop/assets/review-iphone13-photo-3-real-CoFlflMf.jpg",
    ],
  },
  {
    username: "rodrigo.alves",
    date: "28 de out",
    avatarSrc: "https://randomuser.me/api/portraits/men/3.jpg",
    verified: false,
    attributes: "Entrega: pontual | Qualidade: Apple",
    comment: "Qualidade Apple por um preço que nunca imaginei. O celular voa, os apps abrem na hora. A entrega foi super rápida. Muito satisfeito com a compra.",
    reviewImages: [
      "https://evento-ttk.shop/assets/review-iphone13-photo-4-real-D-Wyh9vZ.jpg",
    ],
  },
  {
    username: "patricia.lima",
    date: "27 de out",
    avatarSrc: "https://randomuser.me/api/portraits/women/4.jpg",
    verified: true,
    attributes: "Velocidade: rápida | Fácil de usar: sim",
    comment: "Estava com um pé atrás por causa do valor, mas arrisquei e deu tudo certo. O aparelho é original, veio lacrado. A promoção é de verdade, pessoal!",
    reviewImages: [],
  },
  {
    username: "marcos.souza",
    date: "26 de out",
    avatarSrc: "https://randomuser.me/api/portraits/men/5.jpg",
    verified: true,
    attributes: "Custo-benefício: imbatível | Recomendo: 100%",
    comment: "Finalmente troquei meu celular antigo. A diferença de desempenho é absurda. O iPhone 13 é outro nível. E por esse preço, foi um presente.",
    reviewImages: [],
  },
];

interface ProductReviewsListProps {
  showAll: boolean;
}

const ProductReviewsList: React.FC<ProductReviewsListProps> = ({ showAll }) => {
  
  const reviewsToDisplay = showAll ? allReviews : allReviews.slice(0, 1);

  return (
    <>
      {reviewsToDisplay.map((review, index) => (
        <React.Fragment key={index}>
          <ProductReviewCard {...review} />
          {/* Adiciona separador apenas entre os itens, e não após o último */}
          {index < reviewsToDisplay.length - 1 && <Separator className="my-4" />}
        </React.Fragment>
      ))}
    </>
  );
};

export default ProductReviewsList;