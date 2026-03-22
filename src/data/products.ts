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
    reviewCount: 7671,
    salesCount: 48800,
    flashSaleTimeSeconds: 5 * 60,
    media: [
      { type: 'image', src: "https://m.media-amazon.com/images/I/61n4FmVFrQL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/61n4FmVFrQL._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/51l8Ni2qSUL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/51l8Ni2qSUL._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/81upSkYSsZL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/81upSkYSsZL._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/81Vvxxi9GGL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/81Vvxxi9GGL._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/8102iMz28hL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/8102iMz28hL._AC_SX679_.jpg" },
      { type: 'image', src: "https://m.media-amazon.com/images/I/61WF03ugCnL._AC_SX679_.jpg", thumbnailSrc: "https://m.media-amazon.com/images/I/61WF03ugCnL._AC_SX679_.jpg" },
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
        username: "Claudio Mendes",
        avatarSrc: "/homem/homem (10).jpg",
        comment: "Surpreso com a qualidade. Ele mapeia a casa direitinho e volta pra base sozinho. Pelo preço da promoção valeu muito a pena. Recomendo demais para quem tem pouco tempo.",
        variation: "Padrão",
        reviewImages: [
          "https://m.media-amazon.com/images/I/71opket9kyL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/61UfMw+Ma8L._SY250_.jpg",
          "https://m.media-amazon.com/images/I/71RygiLG4XL._SY250_.jpg"
        ]
      },
      {
        username: "Juliana Costa",
        avatarSrc: "/mulher/mulher (15).jpg",
        comment: "Melhor investimento pra quem tem pet! Tira todos os pelos do tapete. Chegou super rápido, em 2 dias. O sensor de degrau funciona perfeitamente, não cai da escada.",
        variation: "Padrão",
        reviewImages: [
          "https://m.media-amazon.com/images/I/71vfDsbwopL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/61KouOv4ThL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/71FYRSH0xnL._SY250_.jpg"
        ]
      },
      {
        username: "Ricardo Oliveira",
        avatarSrc: "/homem/homem (22).jpg",
        comment: "Produto excelente, aspira muito bem e o barulho é bem baixo. Consigo deixar ele limpando enquanto assisto TV sem problemas. A bateria dura bastante tempo.",
        variation: "Padrão",
        reviewImages: [
          "https://m.media-amazon.com/images/I/61kP5qidrUL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/51pG+JFsjPL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/61i-NKyok5L._SY250_.jpg"
        ]
      },
      {
        username: "Mariana Santos",
        avatarSrc: "/mulher/mulher (40).jpg",
        comment: "Estou apaixonada! Ele entra embaixo do sofá e da cama, lugares que eu tinha dificuldade de limpar. O aplicativo é bem intuitivo e fácil de usar.",
        variation: "Padrão",
        reviewImages: [
          "https://m.media-amazon.com/images/I/71YkAuDHo4L._SY250_.jpg",
          "https://m.media-amazon.com/images/I/711iKkVIaYL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/61Z8OTkLJfL._SY250_.jpg"
        ]
      },
      {
        username: "Paulo Henrique",
        avatarSrc: "/homem/homem (33).jpg",
        comment: "Chegou muito bem embalado e antes do prazo. A Havan sempre surpreende na entrega. O robô é muito inteligente e eficiente na limpeza diária.",
        variation: "Padrão",
        reviewImages: [
          "https://m.media-amazon.com/images/I/718pxLy67TL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/71A0Km7wfAL._SY250_.jpg",
          "https://m.media-amazon.com/images/I/71ctuiejCeL._SY250_.jpg"
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