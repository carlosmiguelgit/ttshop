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
    title: "Aspirador de Pó Robô Philco 3 em 1 Antiqueda Pas26p - Bivolt",
    currentPrice: "97,28",
    originalPrice: "899,00",
    discountPercentage: 89,
    discountAmount: "801,72",
    rating: 4.8,
    reviewCount: 7671,
    salesCount: 48800,
    flashSaleTimeSeconds: 5 * 60,
    media: [
      { type: 'image', src: "https://www.havan.com.br/media/catalog/product/cache/820af7facfa7aca6eb3c138e3457dc8d/a/s/aspirador-de-po-robo-philco-limpeza-inteligente-pas26p_1243701.webp", thumbnailSrc: "https://www.havan.com.br/media/catalog/product/cache/820af7facfa7aca6eb3c138e3457dc8d/a/s/aspirador-de-po-robo-philco-limpeza-inteligente-pas26p_1243701.webp" },
      { type: 'image', src: "https://www.havan.com.br/media/catalog/product/cache/820af7facfa7aca6eb3c138e3457dc8d/a/s/aspirador-de-po-robo-philco-limpeza-inteligente-pas26p_1243700.webp", thumbnailSrc: "https://www.havan.com.br/media/catalog/product/cache/820af7facfa7aca6eb3c138e3457dc8d/a/s/aspirador-de-po-robo-philco-limpeza-inteligente-pas26p_1243700.webp" },
      { type: 'image', src: "https://www.havan.com.br/media/catalog/product/cache/820af7facfa7aca6eb3c138e3457dc8d/a/s/aspirador-de-po-robo-philco-limpeza-inteligente-pas26p_1243702.webp", thumbnailSrc: "https://www.havan.com.br/media/catalog/product/cache/820af7facfa7aca6eb3c138e3457dc8d/a/s/aspirador-de-po-robo-philco-limpeza-inteligente-pas26p_1243702.webp" },
      { type: 'image', src: "https://www.havan.com.br/media/catalog/product/cache/820af7facfa7aca6eb3c138e3457dc8d/a/s/aspirador-de-po-robo-philco-limpeza-inteligente-pas26p_1243703.webp", thumbnailSrc: "https://www.havan.com.br/media/catalog/product/cache/820af7facfa7aca6eb3c138e3457dc8d/a/s/aspirador-de-po-robo-philco-limpeza-inteligente-pas26p_1243703.webp" },
      { type: 'image', src: "https://www.havan.com.br/media/catalog/product/cache/820af7facfa7aca6eb3c138e3457dc8d/a/s/aspirador-de-po-robo-philco-limpeza-inteligente-pas26p_1243704.webp", thumbnailSrc: "https://www.havan.com.br/media/catalog/product/cache/820af7facfa7aca6eb3c138e3457dc8d/a/s/aspirador-de-po-robo-philco-limpeza-inteligente-pas26p_1243704.webp" },
      { type: 'image', src: "https://www.havan.com.br/media/catalog/product/cache/820af7facfa7aca6eb3c138e3457dc8d/a/s/aspirador-de-po-robo-philco-limpeza-inteligente-pas26p_1243705.webp", thumbnailSrc: "https://www.havan.com.br/media/catalog/product/cache/820af7facfa7aca6eb3c138e3457dc8d/a/s/aspirador-de-po-robo-philco-limpeza-inteligente-pas26p_1243705.webp" },
    ],
    specifications: [
      { label: "Marca", value: "Philco" },
      { label: "Modelo", value: "ROBÔ PAS26P" },
      { label: "Potência", value: "35W" },
      { label: "Função MOP", value: "Aspira e passa pano (seco ou úmido)" },
      { label: "Filtro", value: "HEPA (Retém 99,5% de ácaros e poeira)" },
      { label: "Reservatório de Pó", value: "610ml" },
      { label: "Reservatório de Água", value: "200ml" },
      { label: "Autonomia", value: "70-90 minutos" },
      { label: "Tempo de Carga", value: "4-5 horas" },
      { label: "Sensores", value: "Antiqueda e Obstáculos" },
      { label: "Voltagem", value: "Bivolt" },
      { label: "Dimensões", value: "31,6cm x 8cm x 34,9cm" },
      { label: "Peso", value: "2,7Kg" },
    ],
    descriptionText: `Com design moderno e tecnologia inovadora, tenha mais praticidade e conforto ao ter seus cômodos 100% limpos sem nenhum esforço com o Aspirador de Pó Robô Philco PAS26P. O Aspirador Robô Philco possui reservatório de água de 200ml e reservatório de pó de 610ml, é ideal para passar pano em todo o ambiente e sem a constante necessidade de precisar esvaziar o reservatório. Com sensor antiqueda e obstáculos o Aspirador de Pó Robô Philco é redirecionado ao ter contato com obstáculos. Além disso, quando a bateria estiver acabando ele retorna sozinho para a base de carregamento. Equipado com filtro HEPA, ele retém até 99,5% de ácaros, poeiras e até as partículas mais finais da sujeira. Outro diferencial é a função MOP que permite aspirar e passar pano seco ou úmido. Seus ambientes limpos e renovados em instantes com o Aspirador de Pó Robô Philco PAS26P MOP Bivolt.`,
    safeRedirectUrl: "https://www.havan.com.br/aspirador-de-po-robo-philco-limpeza-inteligente-pas26p",
    reviews: [
      {
        username: "Claudio Mendes",
        avatarSrc: "/homem/homem (10).jpg",
        comment: "Surpreso com a qualidade desse Philco. Ele mapeia a casa direitinho e a função de passar pano é excelente. Pelo preço da promoção valeu muito a pena.",
        variation: "Padrão",
        reviewImages: [
          "https://stgavaliaprodutoextprd01.blob.core.windows.net/midiasproduto-public/h1Ie7sm1ifJ4tEcSSp0V28Za8Acmf4rHN_JfotJOj4npVOzASNGk-PY9h1jBMzAz.webp",
          "https://stgavaliaprodutoextprd01.blob.core.windows.net/midiasproduto-public/C188efv7p2qe-24Ko78deglqhw5H5LCSFqZmdH_BMtfA-i5dII4YKEIKm9HM9kXM.webp"
        ]
      },
      {
        username: "Juliana Costa",
        avatarSrc: "/mulher/mulher (15).jpg",
        comment: "Melhor investimento pra quem tem pet! O reservatório de 610ml cabe muita sujeira. Chegou super rápido, em 2 dias. O sensor de degrau funciona perfeitamente.",
        variation: "Padrão",
        reviewImages: [
          "https://stgavaliaprodutoextprd01.blob.core.windows.net/midiasproduto-public/mIl72h6iRGHRG9bDC17jrSJEnY-o6FNivUBvxTKLsnc5G4uIsUP9aRz3hOqYPaiX.webp",
          "https://stgavaliaprodutoextprd01.blob.core.windows.net/midiasproduto-public/K6sbZwg8Je3R8meMWJJr6FJS2-ZrO17aXhdunUhSQD14xNNGrqXBZi0UWmiIWORx.webp"
        ]
      },
      {
        username: "Ricardo Oliveira",
        avatarSrc: "/homem/homem (22).jpg",
        comment: "Produto excelente, aspira muito bem e o barulho é bem baixo. O filtro HEPA faz muita diferença pra quem tem alergia. A bateria dura o suficiente para meu apto.",
        variation: "Padrão",
        reviewImages: [
          "https://stgavaliaprodutoextprd01.blob.core.windows.net/midiasproduto-public/kJ9NmK62ITG9tAUye52jvSdtGpD6UbUfIHUyZ5nIYNNHC9vdviEBkkyAZ-Bmln0y.webp",
          "https://stgavaliaprodutoextprd01.blob.core.windows.net/midiasproduto-public/qfbZzLllAOIMSO5ZdZwC4-1BLDACkFDoEX81a5LqW8q14H8QMVyC4lspdNp111cd.webp"
        ]
      },
      {
        username: "Mariana Santos",
        avatarSrc: "/mulher/mulher (40).jpg",
        comment: "Estou apaixonada! Ele entra embaixo do sofá e da cama, lugares que eu tinha dificuldade de limpar. A função MOP deixa o chão brilhando.",
        variation: "Padrão",
        reviewImages: [
          "https://stgavaliaprodutoextprd01.blob.core.windows.net/midiasproduto-public/Mlz3tRPB_SiXZ16fSApt6jHOFR3lROglN6vBc6dVA6vt1rNhd6ONbgSu1KuE0cPe.webp"
        ]
      },
      {
        username: "Paulo Henrique",
        avatarSrc: "/homem/homem (33).jpg",
        comment: "Chegou muito bem embalado. O robô é muito inteligente e volta sozinho para a base quando a bateria acaba. Recomendo!",
        variation: "Padrão",
        reviewImages: [
          "https://stgavaliaprodutoextprd01.blob.core.windows.net/midiasproduto-public/M6Kzg6EbzhS_kUpfoF1B4UaVE8GhAD1fzadXCyDEHZXAvxgCC7JlCQmh9fqS0KjJ.webp"
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