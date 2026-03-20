import { MediaItem } from "@/types/product";

export interface Variation {
  name: string;
  price: string;
  imageIndex: number;
}

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
  bannerImage?: string;
  variations?: Variation[];
}

export const products: Product[] = [
  {
    slug: "aspirador-de-po",
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
    ],
    specifications: [
      { label: "Nível de ruído", value: "65 dB(A)" },
      { label: "Tipo de filtro", value: "HEPA + Espuma + Tela" },
      { label: "Níveis de filtragem", value: "3" },
      { label: "Aspira água?", value: "Não" },
      { label: "Capacidade para pó", value: "600 ml" },
      { label: "Voltagem", value: "BIVOLT" },
      { label: "Potência elétrica", value: "36W" },
      { label: "Frequência", value: "60Hz" },
      { label: "Capacidade útil", value: "350ml (água) + 260ml (pó)" },
      { label: "Tipo de bateria", value: "Li-Ion" },
      { label: "Capacidade da bateria", value: "2600 (mAh)" },
      { label: "Autonomia", value: "Até 2h40" },
      { label: "Tempo de carga", value: "Até 5 horas" },
      { label: "Base carregadora", value: "Sim" },
      { label: "Controle remoto", value: "Sim" },
      { label: "Conectividade APP", value: "Sim" },
      { label: "Peso líquido", value: "3 kg" },
      { label: "Cor", value: "Branco e Turquesa" },
      { label: "Dimensões", value: "32 x 32 x 8 cm" },
    ],
    descriptionText: `Direção inteligente para uma limpeza eficiente!`,
    safeRedirectUrl: "https://www.havan.com.br/aspirador-de-po-robo-wap-robot-w1000",
    reviews: [
      {
        username: "Marcos Silva",
        avatarSrc: "/homem/homem (1).jpg",
        comment: "Melhor compra que fiz esse ano. O robô aspira muito bem e o mapeamento funciona de verdade. Chegou em 3 dias aqui em casa.",
        variation: "Padrão",
        reviewImages: ["https://m.media-amazon.com/images/I/61n4FmVFrQL._AC_SL1500_.jpg"]
      }
    ]
  },
  {
    slug: "furadeira",
    title: "DEWALT Parafusadeira e Furaderia de Impacto de 1/2 Pol. (13mm) Brushless Motor a Bateria 20V MAX* Ion-Litio com 2 Baterias 2.0Ah Carregador Bivolt e Mala DCD7781D2",
    currentPrice: "97,94",
    originalPrice: "897,00",
    discountPercentage: 89,
    discountAmount: "799,06",
    rating: 4.8,
    reviewCount: 306,
    salesCount: 3504,
    flashSaleTimeSeconds: 10 * 60,
    media: [
      { type: 'image', src: "https://m.media-amazon.com/images/I/51NuTLIhp7L._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51NuTLIhp7L._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/51ZclRWxMFL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51ZclRWxMFL._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/51xJArXXCYL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51xJArXXCYL._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/51C9aON0llL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51C9aON0llL._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/51xqB0lPNWL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51xqB0lPNWL._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/61uR63dk2xL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/61uR63dk2xL._AC_SX679_.jpg" },
    ],
    variations: [
      { name: "Com 1 bateria", price: "97,94", imageIndex: 4 },
      { name: "Com 2 baterias", price: "127,84", imageIndex: 5 }
    ],
    specifications: [
      { label: "Fabricante", value: "Dewalt" },
      { label: "Modelo", value: "DCD7781D2-BR" },
      { label: "Voltagem", value: "Bivolt" },
      { label: "Tipo de bateria", value: "Íon-lítio" },
      { label: "Capacidade da bateria", value: "4 Amperes Horas" },
      { label: "Peso", value: "2,21 kg" },
      { label: "Dimensões", value: "32 x 10 x 44 cm" },
      { label: "Mandril", value: "1/2\" (13mm)" },
      { label: "Motor", value: "Brushless (Sem escovas)" },
    ],
    descriptionText: `Parafusadeira e Furadeira DEWALT de Impacto com a tecnologia sem escovas de carvão (BRUSHLESS) sem fio de 20V MAX** com 2 Baterias e Carregador Bivolt que pode ser usado com 220V e 127V. Conta com muito mais eficiência através de mais tempo de uso e menos manutenções.`,
    bannerImage: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/01bfda1f-fac1-4ad9-a34f-2b30a5248653.__CR0,0,970,300_PT0_SX970_V1___.jpg",
    safeRedirectUrl: "https://www.havan.com.br/furadeira",
    reviews: [
      {
        username: "Ricardo S.",
        avatarSrc: "/homem/homem (1).jpg",
        comment: "Chegou em 3 dias aqui no interior. O preço tá maravilhoso, original mesmo. A maleta é muito resistente.",
        variation: "Com 2 baterias",
        reviewImages: ["https://m.media-amazon.com/images/I/81+2-iPRbAL._SY250_.jpg", "https://m.media-amazon.com/images/I/81ukYAJTLWL._SY250_.jpg"]
      },
      {
        username: "Marcos Oliveira",
        avatarSrc: "/homem/homem (12).jpg",
        comment: "Ferramenta top. Motor brushless é outro nível, não esquenta nada. Vale cada centavo, entrega super ágil.",
        variation: "Com 2 baterias",
        reviewImages: ["https://m.media-amazon.com/images/I/71iemNNiHFL._SY250_.jpg", "https://m.media-amazon.com/images/I/71dp8ROLsML._SY250_.jpg"]
      },
      {
        username: "Ana Paula",
        avatarSrc: "/mulher/mulher (22).jpg",
        comment: "Comprei pro meu marido e ele amou. Chegou em 2 dias úteis aqui em SP. O preço estava imbatível.",
        variation: "Com 1 bateria",
        reviewImages: ["https://m.media-amazon.com/images/I/714eD6JHSSL._SY250_.jpg", "https://m.media-amazon.com/images/I/81-e-nbrONL._SY250_.jpg"]
      },
      {
        username: "Carlos Alberto",
        avatarSrc: "/homem/homem (33).jpg",
        comment: "Melhor preço que já vi nessa DeWalt. Chegou voando. A bateria dura muito tempo de trabalho.",
        variation: "Com 2 baterias",
        reviewImages: ["https://m.media-amazon.com/images/I/71SPi73dLEL._SY250_.jpg", "https://m.media-amazon.com/images/I/71LXOY3pTtL._SY250_.jpg", "https://m.media-amazon.com/images/I/71J5ySnvJwL._SY250_.jpg"]
      },
      {
        username: "Felipe M.",
        avatarSrc: "/homem/homem (45).jpg",
        comment: "Bruta demais! Furou a viga aqui de casa sem nem fazer força. Recomendo pelo valor e pela entrega rápida.",
        variation: "Com 2 baterias",
        reviewImages: ["https://m.media-amazon.com/images/I/71cI8NGF8sL._SY250_.jpg", "https://m.media-amazon.com/images/I/71+TQabIs6L._SY250_.jpg"]
      }
    ]
  }
];