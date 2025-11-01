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
    reviewImages: [
      "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfgt1hd8fxmt12", // Imagem 1 (Removido @resize_w72_nl.webp)
    ],
  },
  {
    username: "fernanda.paz",
    date: "29 de out",
    avatarSrc: "https://randomuser.me/api/portraits/women/2.jpg",
    verified: true,
    attributes: "Qualidade: muito boa | Design: moderno",
    comment: "O patinete é lindo e muito robusto. O sistema de freios é seguro. Único ponto é que achei um pouco pesado, mas nada que atrapalhe.",
    reviewImages: [
      "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbpgcdc8okt50c", // Imagem 2 (Removido @resize_w72_nl.webp)
    ],
  },
  {
    username: "rodrigo.alves",
    date: "28 de out",
    avatarSrc: "https://randomuser.me/api/portraits/men/3.jpg",
    verified: false,
    attributes: "Atendimento: rápido | Entrega: pontual",
    comment: "Comprei para presentear meu filho e ele amou! O Bluetooth funciona perfeitamente para as músicas. Vendedor atencioso.",
    reviewImages: [
      "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbpgcdc8rdy1b7", // Imagem 3 (Removido @resize_w72_nl.webp)
    ],
  },
  {
    username: "patricia.lima",
    date: "27 de out",
    avatarSrc: "https://randomuser.me/api/portraits/women/4.jpg",
    verified: true,
    attributes: "Velocidade: conforme o anúncio | Fácil de usar: sim",
    comment: "Perfeito para ir ao trabalho. Economizei muito tempo no trânsito. A dobragem é fácil para guardar no escritório.",
    reviewImages: [
      "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mchw4fwmt5hda2", // Imagem 4 (Removido @resize_w72_nl.webp)
    ],
  },
  {
    username: "marcos.souza",
    date: "26 de out",
    avatarSrc: "https://randomuser.me/api/portraits/men/5.jpg",
    verified: true,
    attributes: "Custo-benefício: imbatível | Recomendo: 100%",
    comment: "Melhor compra do ano! O preço estava excelente na oferta relâmpago. A qualidade do material é de primeira. Chegou sem nenhum arranhão.",
    reviewImages: [
      "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfgt1hd8ej2d65", // Imagem 5 (Removido @resize_w72_nl.webp)
    ],
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
        reviewImages={[
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfgt1hd8prls27", // Imagem 6 (Removido @resize_w72_nl.webp)
        ]}
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