import React from 'react';
import ProductReviewCard from './ProductReviewCard';
import { Separator } from "@/components/ui/separator";

const additionalReviews = [
  {
    username: "joao.melo",
    date: "29 de out",
    avatarSrc: "https://randomuser.me/api/portraits/men/1.jpg",
    verified: true,
    attributes: "Custo-benefício: excelente | Bateria: duradoura",
    comment: "Chegou em 3 dias! A velocidade é ótima para o dia a dia e a bateria realmente aguenta o prometido. Muito satisfeito com a compra.",
  },
  {
    username: "fernanda.paz",
    date: "29 de out",
    avatarSrc: "https://randomuser.me/api/portraits/women/2.jpg",
    verified: true,
    attributes: "Qualidade: muito boa | Design: moderno",
    comment: "O patinete é lindo e muito robusto. O sistema de freios é seguro. Único ponto é que achei um pouco pesado, mas nada que atrapalhe.",
  },
  {
    username: "rodrigo.alves",
    date: "28 de out",
    avatarSrc: "https://randomuser.me/api/portraits/men/3.jpg",
    verified: false,
    attributes: "Atendimento: rápido | Entrega: pontual",
    comment: "Comprei para presentear meu filho e ele amou! O Bluetooth funciona perfeitamente para as músicas. Vendedor atencioso.",
  },
  {
    username: "patricia.lima",
    date: "27 de out",
    avatarSrc: "https://randomuser.me/api/portraits/women/4.jpg",
    verified: true,
    attributes: "Velocidade: conforme o anúncio | Fácil de usar: sim",
    comment: "Perfeito para ir ao trabalho. Economizei muito tempo no trânsito. A dobragem é fácil para guardar no escritório.",
  },
  {
    username: "marcos.souza",
    date: "26 de out",
    avatarSrc: "https://randomuser.me/api/portraits/men/5.jpg",
    verified: true,
    attributes: "Custo-benefício: imbatível | Recomendo: 100%",
    comment: "Melhor compra do ano! O preço estava excelente na oferta relâmpago. A qualidade do material é de primeira. Chegou sem nenhum arranhão.",
  },
];

const ProductReviewsList: React.FC = () => {
  return (
    <>
      {/* Avaliação 2 (que estava oculta) - Data atualizada para 30 de out */}
      <ProductReviewCard
        username="ana.ribeiro"
        date="30 de out"
        avatarSrc="https://randomuser.me/api/portraits/women/6.jpg"
        verified={true}
        attributes="Custo-benefício: ótimo | Qualidade: superior"
        comment="Produto de altíssima qualidade, superou minhas expectativas. A montagem foi simples e o desempenho na rua é excelente. Recomendo a todos!"
      />
      <Separator className="my-4" />

      {/* 5 Avaliações Adicionais */}
      {additionalReviews.map((review, index) => (
        <React.Fragment key={index}>
          <ProductReviewCard {...review} />
          {index < additionalReviews.length - 1 && <Separator className="my-4" />}
        </React.Fragment>
      ))}
    </>
  );
};

export default ProductReviewsList;