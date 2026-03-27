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
    title: "Robô Aspirador Xiaomi S20 + Plus B108gl 2026 Branco",
    currentPrice: "179,87",
    originalPrice: "1.698,90",
    discountPercentage: 89,
    discountAmount: "1.519,03",
    rating: 4.8,
    reviewCount: 9422,
    salesCount: 62400,
    flashSaleTimeSeconds: 5 * 60,
    media: [
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_687498-MLA99506245010_112025-F.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_687498-MLA99506245010_112025-F.webp" },
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_876376-MLU77998329306_082024-F.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_876376-MLU77998329306_082024-F.webp" },
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_622473-MLU78223369759_082024-F.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_622473-MLU78223369759_082024-F.webp" },
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_602362-MLU77998329318_082024-F.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_602362-MLU77998329318_082024-F.webp" },
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_601217-MLA79440043034_102024-F.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_601217-MLA79440043034_102024-F.webp" },
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_737986-MLA79440274834_102024-F.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_737986-MLA79440274834_102024-F.webp" },
    ],
    specifications: [
      { label: "Marca", value: "Xiaomi" },
      { label: "Modelo", value: "S20+" },
      { label: "Cor", value: "Branco" },
      { label: "Sistema de navegação", value: "Laser LDS" },
      { label: "Nível máximo de sucção", value: "6000 PA" },
      { label: "Capacidade da bateria", value: "5200 mAh" },
      { label: "Recipiente de pó", value: "450 ml" },
      { label: "Tanque de água", value: "290 ml" },
      { label: "Aplicação móvel", value: "Xiaomi Home / Mi Home" },
      { label: "Controle de voz", value: "Amazon Alexa, Google Assistant" },
    ],
    descriptionText: `6000 PA\nDos esfregões rotativos\nNavegação a laser SUD\nEvitar obstáculos\nBateria de 5200 mAh\nAplicativo Mi Home/Xiaomi Home\nControle de volume`,
    safeRedirectUrl: "https://www.havan.com.br/xiaomi-s20-plus",
    reviews: [
      {
        username: "Claudio Mendes",
        avatarSrc: "/homem/homem (10).jpg",
        comment: "O S20+ é sensacional. A sucção de 6000 PA limpa tudo, inclusive tapetes grossos. O mapeamento a laser é muito preciso, não bate em nada.",
        variation: "Branco",
        reviewImages: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_987059-MLA82610920880_032025-O.webp",
          "https://m.media-amazon.com/images/I/71P2dFWdAxL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/61V9RJaK4NL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/61QK0ZPI+VL._SY250_.jpg"
        ]
      },
      {
        username: "Juliana Costa",
        avatarSrc: "/mulher/mulher (15).jpg",
        comment: "Xiaomi sempre entregando o melhor. Os esfregões rotativos deixam o chão brilhando, muito melhor que o pano fixo dos outros modelos.",
        variation: "Branco",
        reviewImages: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_627408-MLA80470166918_112024-O.webp",
          "https://m.media-amazon.com/images/I/710Uy6eZAGL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/61BpT-KFSVL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/615XyEf33SL._SY250_.jpg"
        ]
      },
      {
        username: "Ricardo Oliveira",
        avatarSrc: "/homem/homem (22).jpg",
        comment: "Chegou super rápido. Conectei fácil no app Mi Home. A bateria dura muito, limpa minha casa toda de 90m2 e sobra 60%.",
        variation: "Branco",
        reviewImages: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_702553-MLA84179280934_052025-O.webp",
          "https://m.media-amazon.com/images/I/61ySfBJi1ZL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/61fk1DU02nL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/61IyxL3d-cL._SY250_.jpg"
        ]
      },
      {
        username: "Mariana Santos",
        avatarSrc: "/mulher/mulher (40).jpg",
        comment: "Melhor robô que já tive. Ele evita os sapatos e cabos no chão perfeitamente. A cor branca é linda e o acabamento é premium.",
        variation: "Branco",
        reviewImages: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_758243-MLA85258800813_052025-O.webp",
          "https://m.media-amazon.com/images/I/61H95lp9OhL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/51zTq5kXWML._SY250_.jpg",
          "https://m.media-amazon.com/images/I/81ZL5FQe6eL._SY250_.jpg"
        ]
      },
      {
        username: "Paulo Henrique",
        avatarSrc: "/homem/homem (33).jpg",
        comment: "Havan de parabéns pelo preço e entrega. Robô original, funcionando 100%. Super silencioso e eficiente.",
        variation: "Branco",
        reviewImages: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_767107-MLA84677386352_052025-O.webp",
          "https://m.media-amazon.com/images/I/61x-BfzO-OL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/81sp53dsXlL._SY250_.jpg"
        ]
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
        username: "Ricardo Santos",
        avatarSrc: "/homem/homem (25).jpg",
        comment: "Chegou em 3 dias aqui no interior. O preço tá maravilhoso, original mesmo. A maleta é muito resistente e as baterias duram muito.",
        variation: "Com 2 baterias",
        reviewImages: ["https://m.media-amazon.com/images/I/81+2-iPRbAL._SY250_.jpg", "https://m.media-amazon.com/images/I/81ukYAJTLWL._SY250_.jpg"]
      },
      {
        username: "Marcos Oliveira",
        avatarSrc: "/homem/homem (42).jpg",
        comment: "Ferramenta top. Motor brushless é outro nível, não esquenta nada. Vale cada centavo, entrega super ágil da Havan.",
        variation: "Com 2 baterias",
        reviewImages: ["https://m.media-amazon.com/images/I/71iemNNiHFL._SY250_.jpg", "https://m.media-amazon.com/images/I/71dp8ROLsML._SY250_.jpg"]
      },
      {
        username: "Beatriz Lima",
        avatarSrc: "/mulher/mulher (33).jpg",
        comment: "Comprei pro meu marido e ele amou. Chegou em 2 dias úteis aqui em SP. O preço estava imbatível comparado a outras lojas.",
        variation: "Com 1 bateria",
        reviewImages: ["https://m.media-amazon.com/images/I/714eD6JHSSL._SY250_.jpg", "https://m.media-amazon.com/images/I/81-e-nbrONL._SY250_.jpg"]
      },
      {
        username: "Carlos Alberto",
        avatarSrc: "/homem/homem (55).jpg",
        comment: "Melhor preço que já vi nessa DeWalt. Chegou voando. A bateria de 20V tem muita força pra furar concreto.",
        variation: "Com 2 baterias",
        reviewImages: ["https://m.media-amazon.com/images/I/71SPi73dLEL._SY250_.jpg", "https://m.media-amazon.com/images/I/71LXOY3pTtL._SY250_.jpg", "https://m.media-amazon.com/images/I/71J5ySnvJwL._SY250_.jpg"]
      },
      {
        username: "Fernanda Souza",
        avatarSrc: "/mulher/mulher (64).jpg",
        comment: "Bruta demais! Furou a viga aqui de casa sem nem fazer força. Recomendo pelo valor e pela entrega rápida.",
        variation: "Com 2 baterias",
        reviewImages: ["https://m.media-amazon.com/images/I/71cI8NGF8sL._SY250_.jpg", "https://m.media-amazon.com/images/I/71+TQabIs6L._SY250_.jpg"]
      }
    ]
  }
];