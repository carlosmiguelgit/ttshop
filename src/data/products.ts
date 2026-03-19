import { MediaItem } from "@/types/product";

export interface Review {
  username: string;
  avatarSrc: string;
  comment: string;
  variation: string;
  reviewImages: string[];
}

export interface Product {
  slug: string;
  title: string;
  currentPrice: string;
  originalPrice: string;
  discountPercentage: number;
  discountAmount: string;
  rating: number;
  reviewCount: number;
  salesCount: number;
  flashSaleTimeSeconds: number;
  media: MediaItem[];
  specifications: { label: string; value: string }[];
  descriptionText: string;
  safeRedirectUrl: string;
  reviews: Review[];
}

export const products: Product[] = [
  {
    slug: "robo-aspirador-wap-w1000",
    title: "WAP Robô Aspirador de Pó ROBOT W1000 Mapeamento de Tempo Real GYRO, Base de Carregamento, Compatível com Alexa e Google",
    currentPrice: "97,28",
    originalPrice: "899,00",
    discountPercentage: 89,
    discountAmount: "801,72",
    rating: 4.8,
    reviewCount: 12450,
    salesCount: 15800,
    flashSaleTimeSeconds: 5 * 60,
    media: [
      { type: 'image', src: "https://m.media-amazon.com/images/I/61n4FmVFrQL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/61n4FmVFrQL._AC_SL1500_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/51l8Ni2qSUL._AC_SL1000_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51l8Ni2qSUL._AC_SL1000_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/81upSkYSsZL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/81upSkYSsZL._AC_SL1500_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/81Vvxxi9GGL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/81Vvxxi9GGL._AC_SL1500_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/8102iMz28hL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/8102iMz28hL._AC_SL1500_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/61PFw76v+FL._AC_SL1500_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/61PFw76v+FL._AC_SL1500_.jpg" },
    ],
    specifications: [
      { label: "Bateria (mAh)", value: "2600" },
      { label: "Cor", value: "Branco e Turquesa" },
      { label: "Voltagem", value: "Bivolt" },
      { label: "Autonomia", value: "Até 2h40min" },
      { label: "Potência (W)", value: "32" },
      { label: "Tipo de filtro", value: "HEPA" },
      { label: "Comando de voz", value: "Alexa e Google" },
    ],
    descriptionText: "Imagine ter um ajudante versátil, que varre, aspira e passa pano como você deseja, quando precisar, mesmo estando longe? Com o Robô Aspirador WAP ROBOT W1000, você economiza tempo e pode acompanhar a limpeza dos ambientes diretamente na tela do seu celular.\n\nPronto para oferecer uma nova experiência de limpeza, o robô aspirador com mapeamento é equipado com a exclusiva navegação Gyro. Ela calcula de forma precisa sua posição e orientação em tempo real para uma movimentação segura, que evita obstáculos, para uma ação otimizada na rotina do lar.\n\nO Robô Aspirador WAP ROBOT W1000 torna a limpeza do dia a dia contínua e sem esforço, retornando sozinho até à base. Acompanhado de um controle remoto com funções pré-programadas, é possível escolher os modos de operação que direcionam a aspiração para áreas específicas.\n\nCom o aplicativo WAP CONNECT, o controle do aspirador está nas suas mãos. Atualize o software, agende limpezas e monitore tudo pelo celular, ou ainda solicite à Alexa ou Google Assistant com um simples comando de voz.",
    safeRedirectUrl: "https://www.havan.com.br/aspirador-de-po-robo-wap-robot-w1000",
    reviews: [
      {
        username: "Fernanda Lima",
        avatarSrc: "/mulher/mulher (10).jpg",
        comment: "Simplesmente maravilhoso! Quando vi que baixou de 900 pra menos de 100 reais não pensei duas vezes, não dava pra perder essa oferta. Chegou em 3 dias aqui em SP.",
        variation: "Padrão",
        reviewImages: ["https://m.media-amazon.com/images/I/71ctuiejCeL.jpg", "https://m.media-amazon.com/images/I/61kP5qidrUL.jpg"]
      },
      {
        username: "João Pedro",
        avatarSrc: "/homem/homem (12).jpg",
        comment: "O sistema gyro faz muita diferença. Entrega super rápida, chegou em 4 dias. Pelo preço que paguei valeu demais, promoção imbatível.",
        variation: "Padrão",
        reviewImages: ["https://m.media-amazon.com/images/I/712ddY7esJL.jpg"]
      },
      {
        username: "Patrícia M.",
        avatarSrc: "/mulher/mulher (15).jpg",
        comment: "Melhor investimento para quem tem pet em casa. Aspira todos os pelos sem esforço. Fiquei chocada com o desconto, de 900 por esse valor é presente.",
        variation: "Padrão",
        reviewImages: ["https://m.media-amazon.com/images/I/61KouOv4ThL.jpg", "https://m.media-amazon.com/images/I/711iKkVIaYL.jpg"]
      },
      {
        username: "Carlos Eduardo",
        avatarSrc: "/homem/homem (20).jpg",
        comment: "Conectei na Alexa super fácil. Chegou em 3 dias bem embalado. Aproveitei a promoção de menos de 100 reais e não me arrependo.",
        variation: "Padrão",
        reviewImages: ["https://m.media-amazon.com/images/I/718pxLy67TL.jpg", "https://m.media-amazon.com/images/I/71YkAuDHo4L.jpg"]
      },
      {
        username: "Juliana Silva",
        avatarSrc: "/mulher/mulher (25).jpg",
        comment: "A bateria dura muito. Chegou em 4 dias certinho. O preço original era quase 900, pagar menos de 100 foi a melhor compra do ano.",
        variation: "Padrão",
        reviewImages: ["https://m.media-amazon.com/images/I/71FYRSH0xnL.jpg", "https://m.media-amazon.com/images/I/61Z8OTkLJfL.jpg"]
      }
    ]
  }
];