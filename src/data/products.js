// ── Imagens ────────────────────────────────────────────────────────────────
import avCoat    from '../assets/Anti_venom/Anti-Venom_coat.png';
import avShoe    from '../assets/Anti_venom/Anti-venom_Shoe.png';
import avJacket  from '../assets/Anti_venom/Anti_venom_jacket.png';
import avShoe2   from '../assets/Anti_venom/anti_venom_show.png';

import spJacket  from '../assets/spidey/spidey_jacket.png';
import spPants   from '../assets/spidey/spidey_pants.png';
import spShirt   from '../assets/spidey/spidey_shirt.png';
import spShoe    from '../assets/spidey/spidey_shoe.png';

import klBarrel  from '../assets/Klyntar/barrel_pant_Klyntar.png';
import klJacket  from '../assets/Klyntar/Klyntar_Jacket.png';
import klPants   from '../assets/Klyntar/Klyntar_pants.png';
import klShoe    from '../assets/Klyntar/Klyntar_shoe.png';

import kibJacket from '../assets/king_in_black/King_in_black_jacket.png';
import kibPants  from '../assets/king_in_black/King_in_black_pants.png';
import kibShirt  from '../assets/king_in_black/king_in_black_shirt.png';
import kibShoe   from '../assets/king_in_black/King_in_Black_Shoe.png';

// ── Tamanhos por tipo ──────────────────────────────────────────────────────
const CLOTH_SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];
const SHOE_SIZES  = ['38', '39', '40', '41', '42', '43', '44'];

// ── Catálogo ───────────────────────────────────────────────────────────────
export const PRODUCTS = [
  // Anti-Venom
  {
    id: 1,
    name: 'Casaco Branco-Simbionte',
    price: 'R$ 389,00',
    priceNum: 389,
    image: avCoat,
    collection: 'Anti-Venom',
    collectionId: 'anti-venom',
    isShoe: false,
    sizes: CLOTH_SIZES,
    description: 'Casaco oversized com textura simbiótica em branco glacial. Acabamento em chrome que reflete a luz como uma segunda pele.',
  },
  {
    id: 2,
    name: 'Tênis Venomizado',
    price: 'R$ 459,00',
    priceNum: 459,
    image: avShoe,
    collection: 'Anti-Venom',
    collectionId: 'anti-venom',
    isShoe: true,
    sizes: SHOE_SIZES,
    description: 'Tênis de solado chunky com detalhes em cromo e filamentos simbióticos. Edição limitada Anti-Venom.',
  },
  {
    id: 3,
    name: 'Jaqueta Anti-Toxina',
    price: 'R$ 419,00',
    priceNum: 419,
    image: avJacket,
    collection: 'Anti-Venom',
    collectionId: 'anti-venom',
    isShoe: false,
    sizes: CLOTH_SIZES,
    description: 'Jaqueta bomber com revestimento metálico prata. Inspirada na armadura purificadora do simbionte Anti-Venom.',
  },
  {
    id: 4,
    name: 'Coturno Chrome Puro',
    price: 'R$ 349,00',
    priceNum: 349,
    image: avShoe2,
    collection: 'Anti-Venom',
    collectionId: 'anti-venom',
    isShoe: true,
    sizes: SHOE_SIZES,
    description: 'Coturno de cano médio em couro sintético cromado com sola de borracha vulcanizada.',
  },

  // Spidey
  {
    id: 5,
    name: 'Jaqueta Web-Slinger',
    price: 'R$ 429,00',
    priceNum: 429,
    image: spJacket,
    collection: 'Spidey',
    collectionId: 'spidey',
    isShoe: false,
    sizes: CLOTH_SIZES,
    description: 'Jaqueta moto em couro sintético vermelho e azul com grafismo de teia bordado. Estilo amigável do bairro.',
  },
  {
    id: 6,
    name: 'Calça Teia Urbana',
    price: 'R$ 299,00',
    priceNum: 299,
    image: spPants,
    collection: 'Spidey',
    collectionId: 'spidey',
    isShoe: false,
    sizes: CLOTH_SIZES,
    description: 'Calça cargo com padrão de teia em relevo. Bolsos laterais com zíper e elástico na cintura.',
  },
  {
    id: 7,
    name: 'Camiseta Parker Edition',
    price: 'R$ 199,00',
    priceNum: 199,
    image: spShirt,
    collection: 'Spidey',
    collectionId: 'spidey',
    isShoe: false,
    sizes: CLOTH_SIZES,
    description: 'Camiseta oversized com estampa Symbionte em silk screen. Homenagem à Peter Parker.',
  },
  {
    id: 8,
    name: 'Tênis Friendly Neighbor',
    price: 'R$ 379,00',
    priceNum: 379,
    image: spShoe,
    collection: 'Spidey',
    collectionId: 'spidey',
    isShoe: true,
    sizes: SHOE_SIZES,
    description: 'Tênis runner em vermelho e azul com logo Symbionte em relevo na lateral.',
  },

  // Klyntar
  {
    id: 9,
    name: 'Baggy Klyntar Void',
    price: 'R$ 319,00',
    priceNum: 319,
    image: klBarrel,
    collection: 'Klyntar',
    collectionId: 'klyntar',
    isShoe: false,
    sizes: CLOTH_SIZES,
    description: 'Calça barrel leg em denim preto lavado com bordados alienígenas. Corte relaxado para o vazio interstelar.',
  },
  {
    id: 10,
    name: 'Jaqueta Simbiótica',
    price: 'R$ 499,00',
    priceNum: 499,
    image: klJacket,
    collection: 'Klyntar',
    collectionId: 'klyntar',
    isShoe: false,
    sizes: CLOTH_SIZES,
    description: 'Jaqueta técnica em material sintético com textura de simbionte Klyntar. Acabamento brilhante e corte estruturado.',
  },
  {
    id: 11,
    name: 'Calça Alien Chrome',
    price: 'R$ 279,00',
    priceNum: 279,
    image: klPants,
    collection: 'Klyntar',
    collectionId: 'klyntar',
    isShoe: false,
    sizes: CLOTH_SIZES,
    description: 'Calça slim em couro sintético com reflexo metálico. Silhueta futurista inspirada na raça Klyntar.',
  },
  {
    id: 12,
    name: 'Solado do Parasita',
    price: 'R$ 399,00',
    priceNum: 399,
    image: klShoe,
    collection: 'Klyntar',
    collectionId: 'klyntar',
    isShoe: true,
    sizes: SHOE_SIZES,
    description: 'Tênis de plataforma com detalhes em prata e textura orgânica. A fusão perfeita entre hospedeiro e simbionte.',
  },

  // King in Black — VIP
  {
    id: 13,
    name: 'Jaqueta Knull Supreme',
    price: 'R$ 1.290,00',
    priceNum: 1290,
    image: kibJacket,
    collection: 'King in Black',
    collectionId: 'king-in-black',
    isShoe: false,
    sizes: CLOTH_SIZES,
    description: 'Jaqueta exclusiva VIP em couro legítimo preto com fivelas douradas e bordado Knull nas costas. Peça de colecionador.',
  },
  {
    id: 14,
    name: 'Calça Void Eternal',
    price: 'R$ 890,00',
    priceNum: 890,
    image: kibPants,
    collection: 'King in Black',
    collectionId: 'king-in-black',
    isShoe: false,
    sizes: CLOTH_SIZES,
    description: 'Calça wide leg em tecido premium com detalhes dourados nas costuras. Conforto eterno no abismo.',
  },
  {
    id: 15,
    name: 'Camisa Deus das Sombras',
    price: 'R$ 790,00',
    priceNum: 790,
    image: kibShirt,
    collection: 'King in Black',
    collectionId: 'king-in-black',
    isShoe: false,
    sizes: CLOTH_SIZES,
    description: 'Camisa oversized em cetim preto com filamentos dourados tecidos à mão. Edição numerada — apenas 100 unidades.',
  },
  {
    id: 16,
    name: 'Bota Abismo Negro',
    price: 'R$ 1.090,00',
    priceNum: 1090,
    image: kibShoe,
    collection: 'King in Black',
    collectionId: 'king-in-black',
    isShoe: true,
    sizes: SHOE_SIZES,
    description: 'Bota de cano alto em couro legítimo preto com detalhes dourados e sola plataforma. O calçado do deus das sombras.',
  },
];

export const SECTIONS = [
  { id: 'anti-venom',    label: 'Anti-Venom',   ids: [1, 2, 3, 4]      },
  { id: 'spidey',        label: 'Spidey',        ids: [5, 6, 7, 8]      },
  { id: 'klyntar',       label: 'Klyntar',       ids: [9, 10, 11, 12]   },
  { id: 'king-in-black', label: 'King in Black', ids: [13, 14, 15, 16]  },
];
