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
    comment: "Qualidade de cinema em casa! O Google TV é muito rápido e a tela antirreflexo faz toda a diferença. Não acreditei no preço de R$ 75,00, mas é real! Chegou no mesmo dia.",
    reviewImages: [
      "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mdn2edozvd89c3.webp", // Nova Imagem 12 (última imagem fornecida)
    ],
  },
  {
    username: "joao.melo",
    date: "29 de out",
    avatarSrc: "https://randomuser.me/api/portraits/men/1.jpg",
    verified: true,
    attributes: "Custo-benefício: excelente | Imagem: 4K perfeita",
    comment: "Chegou no dia seguinte! A TV é enorme e a qualidade de imagem é surreal. Não tem como bater esse preço. Recomendo a todos que aproveitem a oferta.",
    reviewImages: [
      "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mg334ze0i29wec.webp", // Nova Imagem 5
    ],
  },
  {
    username: "fernanda.paz",
    date: "29 de out",
    avatarSrc: "https://randomuser.me/api/portraits/women/2.jpg",
    verified: true,
    attributes: "Qualidade: QLED | Design: borda fina",
    comment: "A TV é linda, super fina e as bordas são mínimas. O Google TV é muito intuitivo. A entrega foi rápida e o produto veio bem embalado.",
    reviewImages: [
      "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfznw4a84oao4e@resize_w72_nl.webp", // Nova Imagem 6
    ],
  },
  {
    username: "rodrigo.alves",
    date: "28 de out",
    avatarSrc: "https://randomuser.me/api/portraits/men/3.jpg",
    verified: false,
    attributes: "Atendimento: rápido | Entrega: pontual",
    comment: "Comprei para a sala e ficou perfeita! O processador AiPQ realmente faz a diferença. Vendedor atencioso e tirou todas as dúvidas.",
    reviewImages: [
      "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfx0s8jtqu4k12.webp", // Nova Imagem 7
    ],
  },
  {
    username: "patricia.lima",
    date: "27 de out",
    avatarSrc: "https://randomuser.me/api/portraits/women/4.jpg",
    verified: true,
    attributes: "Velocidade: rápida | Fácil de usar: sim",
    comment: "O sistema Google TV é muito fluido. Conectei meu console e a experiência de jogo é ótima, sem lag. A tela antirreflexo ajuda muito durante o dia.",
    reviewImages: [
      "https://down-br.img.susercontent.com/file/br-11134103-81z1k-meglivlzz9xedc.webp", // Nova Imagem 8
      "https://down-br.img.susercontent.com/file/br-11134103-81z1k-meglivlpy9z6e2.webp", // Nova Imagem 9
    ],
  },
  {
    username: "marcos.souza",
    date: "26 de out",
    avatarSrc: "https://randomuser.me/api/portraits/men/5.jpg",
    verified: true,
    attributes: "Custo-benefício: imbatível | Recomendo: 100%",
    comment: "Melhor compra do ano! O preço de R$ 75,00 é inacreditável para uma QLED 55 polegadas. A qualidade do material é de primeira. Chegou no mesmo dia!",
    reviewImages: [
      "https://down-br.img.susercontent.com/file/br-11134103-81z1k-meglivlueept94.webp", // Nova Imagem 10
      "https://down-br.img.susercontent.com/file/br-11134103-81z1k-meglivltfaio9f.webp", // Nova Imagem 11
    ],
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