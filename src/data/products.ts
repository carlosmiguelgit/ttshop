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
    title: "Robô Aspirador De Pó Inteligente S40c Xiaomi, Branco",
    currentPrice: "179,78",
    originalPrice: "997,00",
    discountPercentage: 82,
    discountAmount: "817,22",
    rating: 4.9,
    reviewCount: 12450,
    salesCount: 68400,
    flashSaleTimeSeconds: 5 * 60,
    media: [
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_964770-MLA102445494165_122025-F.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_964770-MLA102445494165_122025-F.webp" },
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_834326-MLA95687146856_102025-F.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_834326-MLA95687146856_102025-F.webp" },
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_752185-MLA101939000736_122025-F.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_752185-MLA101939000736_122025-F.webp" },
      { type: 'image', src: "https://http2.mlstatic.com/D_NQ_NP_2X_632505-MLA101939435402_122025-F.webp", thumbnailSrc: "https://http2.mlstatic.com/D_NQ_NP_2X_632505-MLA101939435402_122025-F.webp" },
    ],
    specifications: [
      { label: "Marca", value: "Xiaomi" },
      { label: "Linha", value: "Robot Vacuum" },
      { label: "Modelo", value: "S40C (E101)" },
      { label: "Potência", value: "55 W" },
      { label: "Pressão de sucção", value: "5 Pa" },
      { label: "Wi-Fi", value: "Sim" },
      { label: "Mapeamento", value: "Sim" },
      { label: "Modos de limpeza", value: "Aspirar, passar pano" },
      { label: "Filtro", value: "HEPA" },
      { label: "Sensores", value: "Obstáculos e Antiquedas" },
      { label: "Voltagem", value: "127/220V (Bivolt)" },
      { label: "Anatel", value: "34632309185" },
    ],
    descriptionText: `Com o Robô Aspirador De Pó Inteligente S40c da Xiaomi, você terá a solução definitiva para manter sua casa impecável. Com potência de 55W e sistema de mapeamento inteligente, ele navega com precisão por todos os cômodos, evitando obstáculos e quedas. Sua função 2 em 1 permite aspirar e passar pano simultaneamente, sendo ideal para quem tem pets ou tapetes. O filtro HEPA garante a retenção das menores partículas, proporcionando um ar mais puro. Controle tudo pelo seu smartphone e agende limpezas mesmo quando não estiver em casa.`,
    safeRedirectUrl: "https://www.havan.com.br/xiaomi-s40c",
    reviews: [
      {
        username: "Carlos Alberto",
        avatarSrc: "/homem/homem (12).jpg",
        comment: "Simplesmente incrível! O mapeamento da Xiaomi é superior a qualquer outro. Ele limpa cada cantinho e volta pra base certinho. As fotos falam por si só.",
        variation: "Branco",
        reviewImages: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_822517-MLA93872828302_102025-O.webp",
          "https://http2.mlstatic.com/D_NQ_NP_2X_765900-MLA99272004610_112025-O.webp"
        ]
      },
      {
        username: "Ana Paula",
        avatarSrc: "/mulher/mulher (26).jpg",
        comment: "Melhor compra que já fiz. Tenho dois gatos e ele tira todos os pelos do tapete com o modo Turbo. Chegou em 24h!",
        variation: "Branco",
        reviewImages: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_913335-MLA94890864678_102025-O.webp",
          "https://http2.mlstatic.com/D_NQ_NP_2X_922641-MLA93832401103_092025-O.webp"
        ]
      },
      {
        username: "Marcos Vinicius",
        avatarSrc: "/homem/homem (45).jpg",
        comment: "O custo-benefício é imbatível. Original Xiaomi, conecta no app sem problemas. Ele passa pano muito bem, recomendo.",
        variation: "Branco",
        reviewImages: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_823291-MLA100577799790_122025-O.webp",
          "https://http2.mlstatic.com/D_NQ_NP_2X_986303-MLA107749764671_022026-O.webp"
        ]
      },
      {
        username: "Fernanda Lima",
        avatarSrc: "/mulher/mulher (51).jpg",
        comment: "Adorei! Ele é bem baixinho e entra debaixo do meu sofá. A entrega da Havan pelo TikTok foi super segura.",
        variation: "Branco",
        reviewImages: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_641141-MLA106848981914_022026-O.webp",
          "https://http2.mlstatic.com/D_NQ_NP_2X_787388-MLA105181574824_012026-O.webp"
        ]
      },
      {
        username: "Roberto Souza",
        avatarSrc: "/homem/homem (60).jpg",
        comment: "Produto top de linha. O sensor de obstáculos funciona muito bem, não fica batendo nos móveis. Nota 10.",
        variation: "Branco",
        reviewImages: [
          "https://http2.mlstatic.com/D_NQ_NP_2X_856028-MLA104618930816_012026-O.webp",
          "https://http2.mlstatic.com/D_NQ_NP_2X_610262-MLA106533172798_022026-O.webp"
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