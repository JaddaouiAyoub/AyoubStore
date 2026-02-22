import type { Product, Pack, Review } from '@/types';

// Reviews exemples
const generateReviews = (count: number): Review[] => {
  const reviewers = ['Ahmed M.', 'Sarah K.', 'Youssef B.', 'Lina D.', 'Karim A.', 'Nadia R.', 'Omar F.', 'Amina L.'];
  const comments = [
    'Produit excellent, livraison rapide !',
    'Très satisfait de mon achat, qualité premium.',
    'Super rapport qualité-prix, je recommande.',
    'Conforme à la description, emballage soigné.',
    'Service client au top, merci AyoubStore !',
    'Produit authentique, garantie rassurante.',
    'Livraison express en 24h, impressionnant !',
    'Le pack est une excellente affaire !'
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `review-${i}`,
    userName: reviewers[Math.floor(Math.random() * reviewers.length)],
    rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
    comment: comments[Math.floor(Math.random() * comments.length)],
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    verified: Math.random() > 0.3
  }));
};

// iPhones
export const iphones: Product[] = [
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'smartphone',
    subcategory: 'iphone',
    description: "L'iPhone 15 Pro Max révolutionnaire avec puce A17 Pro, design en titane et système caméra pro. L'expérience iPhone ultime.",
    shortDescription: 'Puce A17 Pro, titane, caméra pro 48MP',
    specifications: {
      'Écran': '6,7" Super Retina XDR',
      'Processeur': 'A17 Pro',
      'Stockage': '256GB / 512GB / 1TB',
      'Caméra': '48MP + Ultra grand-angle + Téléobjectif',
      'Batterie': 'Jusqu\'à 29h de lecture vidéo',
      'Résistance': 'IP68',
      'Connectique': 'USB-C'
    },
    variants: [
      {
        id: 'natural-256',
        color: 'Titane naturel',
        colorCode: '#B8B5AA',
        capacity: '256GB',
        price: 14790,
        stock: 15,
        images: ['/products/iphone-15-pro-natural-1.jpg', '/products/iphone-15-pro-natural-2.jpg']
      },
      {
        id: 'blue-256',
        color: 'Titane bleu',
        colorCode: '#4A5568',
        capacity: '256GB',
        price: 14790,
        stock: 12,
        images: ['/products/iphone-15-pro-blue-1.jpg', '/products/iphone-15-pro-blue-2.jpg']
      },
      {
        id: 'white-256',
        color: 'Titane blanc',
        colorCode: '#F7FAFC',
        capacity: '256GB',
        price: 14790,
        stock: 8,
        images: ['/products/iphone-15-pro-white-1.jpg', '/products/iphone-15-pro-white-2.jpg']
      },
      {
        id: 'black-256',
        color: 'Titane noir',
        colorCode: '#1A202C',
        capacity: '256GB',
        price: 14790,
        stock: 20,
        images: ['/products/iphone-15-pro-black-1.jpg', '/products/iphone-15-pro-black-2.jpg']
      }
    ],
    basePrice: 14790,
    rating: 4.9,
    reviewCount: 328,
    reviews: generateReviews(12),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 98,
    createdAt: '2024-01-15'
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'smartphone',
    subcategory: 'iphone',
    description: "Puissance pro dans un format compact. Puce A17 Pro, design titane, caméra 48MP et USB-C.",
    shortDescription: 'Puce A17 Pro, titane, 6,1"',
    specifications: {
      'Écran': '6,1" Super Retina XDR',
      'Processeur': 'A17 Pro',
      'Stockage': '128GB / 256GB / 512GB',
      'Caméra': '48MP + Ultra grand-angle + Téléobjectif',
      'Batterie': 'Jusqu\'à 23h de lecture vidéo',
      'Résistance': 'IP68',
      'Connectique': 'USB-C'
    },
    variants: [
      {
        id: 'natural-128',
        color: 'Titane naturel',
        colorCode: '#B8B5AA',
        capacity: '128GB',
        price: 12290,
        stock: 18,
        images: ['/products/iphone-15-pro-natural-1.jpg']
      },
      {
        id: 'blue-128',
        color: 'Titane bleu',
        colorCode: '#4A5568',
        capacity: '128GB',
        price: 12290,
        stock: 14,
        images: ['/products/iphone-15-pro-blue-1.jpg']
      },
      {
        id: 'black-128',
        color: 'Titane noir',
        colorCode: '#1A202C',
        capacity: '128GB',
        price: 12290,
        stock: 22,
        images: ['/products/iphone-15-pro-black-1.jpg']
      }
    ],
    basePrice: 12290,
    rating: 4.8,
    reviewCount: 256,
    reviews: generateReviews(10),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 92,
    createdAt: '2024-01-15'
  },
  {
    id: 'iphone-14-pro-max-used',
    name: 'iPhone 14 Pro Max',
    brand: 'Apple',
    category: 'smartphone',
    subcategory: 'iphone',
    description: "iPhone 14 Pro Max d'occasion certifié. État excellent, batterie testée, garantie incluse. Économisez sur un produit premium.",
    shortDescription: 'Occasion certifiée, batterie 92%',
    specifications: {
      'Écran': '6,7" Super Retina XDR',
      'Processeur': 'A16 Bionic',
      'Stockage': '256GB',
      'Caméra': '48MP + Ultra grand-angle + Téléobjectif',
      'Dynamic Island': 'Oui',
      'Résistance': 'IP68'
    },
    variants: [
      {
        id: 'purple-used-256',
        color: 'Violet intense',
        colorCode: '#6B46C1',
        capacity: '256GB',
        price: 8990,
        stock: 3,
        images: ['/products/iphone-14-pro-max-violet.jpeg']
      }
    ],
    basePrice: 8990,
    rating: 4.7,
    reviewCount: 89,
    reviews: generateReviews(6),
    isNew: false,
    isUsed: true,
    condition: 'excellent',
    batteryInfo: {
      healthPercentage: 92,
      cycleCount: 245,
      faceIdWorking: true,
      touchIdWorking: undefined
    },
    warrantyMonths: 6,
    popularity: 75,
    createdAt: '2023-06-10'
  },
  {
    id: 'iphone-13-used',
    name: 'iPhone 13',
    brand: 'Apple',
    category: 'smartphone',
    subcategory: 'iphone',
    description: "iPhone 13 d'occasion certifié. Excellent rapport qualité-prix avec garantie et batterie testée.",
    shortDescription: 'Occasion certifiée, batterie 88%',
    specifications: {
      'Écran': '6,1" Super Retina XDR',
      'Processeur': 'A15 Bionic',
      'Stockage': '128GB',
      'Caméra': '12MP double',
      '5G': 'Oui',
      'Résistance': 'IP68'
    },
    variants: [
      {
        id: 'midnight-used-128',
        color: 'Minuit',
        colorCode: '#1A202C',
        capacity: '128GB',
        price: 5490,
        stock: 5,
        images: ['/products/iphone-13-minuit.jpeg']
      },
      {
        id: 'starlight-used-128',
        color: 'Lumière stellaire',
        colorCode: '#FAF5EF',
        capacity: '128GB',
        price: 5490,
        stock: 2,
        images: ['/products/iphone-13-stellaire.jpg']
      }
    ],
    basePrice: 5490,
    rating: 4.6,
    reviewCount: 134,
    reviews: generateReviews(8),
    isNew: false,
    isUsed: true,
    condition: 'very-good',
    batteryInfo: {
      healthPercentage: 88,
      cycleCount: 412,
      faceIdWorking: true,
      touchIdWorking: undefined
    },
    warrantyMonths: 6,
    popularity: 68,
    createdAt: '2023-03-20'
  }
];

// Samsung
export const samsungPhones: Product[] = [
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'smartphone',
    subcategory: 'samsung',
    description: "Le Galaxy S24 Ultra avec Galaxy AI, S Pen intégré, caméra 200MP et écran QHD+ 120Hz. L'expérience Android ultime.",
    shortDescription: 'Galaxy AI, S Pen, 200MP',
    specifications: {
      'Écran': '6,8" QHD+ Dynamic AMOLED 2X 120Hz',
      'Processeur': 'Snapdragon 8 Gen 3',
      'Stockage': '256GB / 512GB / 1TB',
      'Caméra': '200MP + 50MP + 12MP + 10MP',
      'Batterie': '5000mAh',
      'S Pen': 'Intégré',
      'Résistance': 'IP68'
    },
    variants: [
      {
        id: 'titanium-gray-256',
        color: 'Titane gris',
        colorCode: '#718096',
        capacity: '256GB',
        price: 13990,
        stock: 10,
        images: ['/products/s24-ultra-gray-1.jpg']
      },
      {
        id: 'titanium-black-256',
        color: 'Titane noir',
        colorCode: '#1A202C',
        capacity: '256GB',
        price: 13990,
        stock: 8,
        images: ['/products/s24-ultra-black-1.jpg']
      },
      {
        id: 'titanium-violet-256',
        color: 'Titane violet',
        colorCode: '#805AD5',
        capacity: '256GB',
        price: 13990,
        stock: 6,
        images: ['/products/s24-ultra-violet-1.jpg']
      }
    ],
    basePrice: 13990,
    rating: 4.8,
    reviewCount: 198,
    reviews: generateReviews(10),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 88,
    createdAt: '2024-02-01'
  },
  {
    id: 'samsung-s24',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    category: 'smartphone',
    subcategory: 'samsung',
    description: "Galaxy S24 avec Galaxy AI, design compact et puissance flagship. Intelligence artificielle au service de votre quotidien.",
    shortDescription: 'Galaxy AI, compact, puissant',
    specifications: {
      'Écran': '6,2" FHD+ Dynamic AMOLED 2X 120Hz',
      'Processeur': 'Snapdragon 8 Gen 3',
      'Stockage': '128GB / 256GB',
      'Caméra': '50MP + 12MP + 10MP',
      'Batterie': '4000mAh',
      'Résistance': 'IP68'
    },
    variants: [
      {
        id: 'cobalt-violet-128',
        color: 'Violet cobalt',
        colorCode: '#6B46C1',
        capacity: '128GB',
        price: 8990,
        stock: 14,
        images: ['/products/s24-Violet cobalt.jpg']
      },
      {
        id: 'amber-yellow-128',
        color: 'Jaune ambre',
        colorCode: '#D69E2E',
        capacity: '128GB',
        price: 899000,
        stock: 9,
        images: ['/products/s24-Jaune ambre.jpg']
      },
      {
        id: 'onyx-black-128',
        color: 'Onyx noir',
        colorCode: '#1A202C',
        capacity: '128GB',
        price: 899000,
        stock: 16,
        images: ['/products/s24-Onyx noir.png']
      }
    ],
    basePrice: 8990,
    rating: 4.7,
    reviewCount: 145,
    reviews: generateReviews(8),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 82,
    createdAt: '2024-02-01'
  },
  {
    id: 'samsung-z-fold-5',
    name: 'Samsung Galaxy Z Fold 5',
    brand: 'Samsung',
    category: 'smartphone',
    subcategory: 'samsung',
    description: "Le smartphone pliable réinventé. Écran immersif 7,6 pouces, multitâche avancé et design ultra-fin.",
    shortDescription: 'Pliable, 7,6", multitâche',
    specifications: {
      'Écran principal': '7,6" QXGA+ Dynamic AMOLED 2X 120Hz',
      'Écran externe': '6,2" HD+ Dynamic AMOLED 2X 120Hz',
      'Processeur': 'Snapdragon 8 Gen 2',
      'Stockage': '256GB / 512GB',
      'Caméra': '50MP + 12MP + 10MP',
      'Résistance': 'IPX8'
    },
    variants: [
      {
        id: 'phantom-black-256',
        color: 'Phantom Black',
        colorCode: '#1A202C',
        capacity: '256GB',
        price: 17990,
        stock: 5,
        images: ['/products/z-fold-5-black-1.jpg']
      },
      {
        id: 'cream-256',
        color: 'Crème',
        colorCode: '#F5F5DC',
        capacity: '256GB',
        price: 17990,
        stock: 4,
        images: ['/products/z-fold-5-cream-1.jpg']
      }
    ],
    basePrice: 17990,
    rating: 4.6,
    reviewCount: 87,
    reviews: generateReviews(6),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 65,
    createdAt: '2023-08-15'
  }
];

// Google Pixel
export const googlePhones: Product[] = [
  {
    id: 'pixel-8-pro',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    category: 'smartphone',
    subcategory: 'pixel',
    description: "Le Pixel 8 Pro avec Google AI, photo astronomique, Magic Editor et 7 ans de mises à jour. L'expérience Google pure.",
    shortDescription: 'Google AI, photo pro, 7 ans MAJ',
    specifications: {
      'Écran': '6,7" LTPO OLED 120Hz',
      'Processeur': 'Google Tensor G3',
      'Stockage': '128GB / 256GB',
      'Caméra': '50MP + 48MP + 48MP',
      'Batterie': '5050mAh',
      'Résistance': 'IP68'
    },
    variants: [
      {
        id: 'obsidian-128',
        color: 'Obsidian',
        colorCode: '#1A202C',
        capacity: '128GB',
        price: 9990,
        stock: 8,
        images: ['/products/pixel-8-pro-obsidian-1.jpg']
      },
      {
        id: 'porcelain-128',
        color: 'Porcelain',
        colorCode: '#FAF5EF',
        capacity: '128GB',
        price: 9990,
        stock: 6,
        images: ['/products/pixel-8-pro-porcelain-1.jpg']
      },
      {
        id: 'bay-128',
        color: 'Bay Blue',
        colorCode: '#4299E1',
        capacity: '128GB',
        price: 9990,
        stock: 5,
        images: ['/products/pixel-8-pro-bay-1.jpg']
      }
    ],
    basePrice: 9990,
    rating: 4.7,
    reviewCount: 112,
    reviews: generateReviews(7),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 70,
    createdAt: '2023-10-15'
  },
  {
    id: 'pixel-8',
    name: 'Google Pixel 8',
    brand: 'Google',
    category: 'smartphone',
    subcategory: 'pixel',
    description: "Pixel 8 compact avec Google AI, photo avancée et 7 ans de mises à jour. Intelligence pure.",
    shortDescription: 'Google AI, compact, 7 ans MAJ',
    specifications: {
      'Écran': '6,2" OLED 120Hz',
      'Processeur': 'Google Tensor G3',
      'Stockage': '128GB / 256GB',
      'Caméra': '50MP + 12MP',
      'Batterie': '4575mAh',
      'Résistance': 'IP68'
    },
    variants: [
      {
        id: 'obsidian-128',
        color: 'Obsidian',
        colorCode: '#1A202C',
        capacity: '128GB',
        price: 7990,
        stock: 12,
        images: ['/products/pixel-8-obsidian-1.jpg']
      },
      {
        id: 'hazel-128',
        color: 'Hazel',
        colorCode: '#9CAF88',
        capacity: '128GB',
        price: 7990,
        stock: 8,
        images: ['/products/pixel-8-hazel-1.jpg']
      }
    ],
    basePrice: 7990,
    rating: 4.6,
    reviewCount: 89,
    reviews: generateReviews(6),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 62,
    createdAt: '2023-10-15'
  }
];

// Laptops
export const laptops: Product[] = [
  {
    id: 'macbook-pro-14-m3',
    name: 'MacBook Pro 14" M3',
    brand: 'Apple',
    category: 'laptop',
    description: "MacBook Pro 14 pouces avec puce M3, écran Liquid Retina XDR et autonomie record. Puissance pro portable.",
    shortDescription: 'Puce M3, 18h autonomie',
    specifications: {
      'Écran': '14,2" Liquid Retina XDR',
      'Processeur': 'Apple M3',
      'RAM': '8GB / 16GB',
      'Stockage': '512GB / 1TB',
      'Autonomie': 'Jusqu\'à 18h',
      'Ports': '3x Thunderbolt 4, HDMI, SDXC',
      'Poids': '1,55 kg'
    },
    variants: [
      {
        id: 'space-gray-512',
        color: 'Gris sidéral',
        colorCode: '#4A5568',
        capacity: '512GB',
        price: 19990,
        stock: 7,
        images: ['/products/macbook-pro-14-space-gray-1.jpg']
      },
      {
        id: 'silver-512',
        color: 'Argent',
        colorCode: '#E2E8F0',
        capacity: '512GB',
        price: 19990,
        stock: 5,
        images: ['/products/macbook-pro-14-silver-1.jpg']
      }
    ],
    basePrice: 19990,
    rating: 4.9,
    reviewCount: 156,
    reviews: generateReviews(9),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 85,
    createdAt: '2023-11-01'
  },
  {
    id: 'macbook-air-15-m3',
    name: 'MacBook Air 15" M3',
    brand: 'Apple',
    category: 'laptop',
    description: "MacBook Air 15 pouces ultrafin avec puce M3. Écran grand format, silence et autonomie exceptionnelle.",
    shortDescription: 'M3, 15", ultrafin',
    specifications: {
      'Écran': '15,3" Liquid Retina',
      'Processeur': 'Apple M3',
      'RAM': '8GB / 16GB',
      'Stockage': '256GB / 512GB',
      'Autonomie': 'Jusqu\'à 18h',
      'Ports': '2x Thunderbolt 3',
      'Poids': '1,51 kg'
    },
    variants: [
      {
        id: 'midnight-256',
        color: 'Minuit',
        colorCode: '#1A202C',
        capacity: '256GB',
        price: 14990,
        stock: 10,
        images: ['/products/macbook-air-minuit.jpg']
      },
      {
        id: 'starlight-256',
        color: 'Lumière stellaire',
        colorCode: '#FAF5EF',
        capacity: '256GB',
        price: 14990,
        stock: 8,
        images: ['/products/macbook-air-stellaire.jpg']
      }
    ],
    basePrice: 14990,
    rating: 4.8,
    reviewCount: 124,
    reviews: generateReviews(8),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 78,
    createdAt: '2024-03-01'
  },
  {
    id: 'dell-xps-15',
    name: 'Dell XPS 15',
    brand: 'Dell',
    category: 'laptop',
    description: "Dell XPS 15 avec écran InfinityEdge, puissance créative et design premium. Windows pro ultime.",
    shortDescription: 'InfinityEdge, création, premium',
    specifications: {
      'Écran': '15,6" FHD+ / 3,5K OLED',
      'Processeur': 'Intel Core i7-13700H',
      'RAM': '16GB / 32GB',
      'Stockage': '512GB / 1TB SSD',
      'Graphique': 'NVIDIA RTX 4050',
      'Autonomie': 'Jusqu\'à 13h',
      'Poids': '1,86 kg'
    },
    variants: [
      {
        id: 'silver-512',
        color: 'Platinum Silver',
        colorCode: '#C0C0C0',
        capacity: '512GB',
        price: 17990,
        stock: 6,
        images: ['/products/dell-xps-15-silver-1.jpg']
      }
    ],
    basePrice: 17990,
    rating: 4.6,
    reviewCount: 78,
    reviews: generateReviews(5),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 58,
    createdAt: '2023-09-15'
  }
];

// Accessoires
export const accessories: Product[] = [
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro 2',
    brand: 'Apple',
    category: 'accessory',
    subcategory: 'audio',
    description: "AirPods Pro 2 avec réduction active du bruit adaptative, audio spatial personnalisé et étui MagSafe.",
    shortDescription: 'ANC adaptative, audio spatial',
    specifications: {
      'Réduction bruit': 'Active adaptative',
      'Audio': 'Spatial personnalisé',
      'Autonomie': 'Jusqu\'à 6h (30h avec étui)',
      'Résistance': 'IPX4',
      'Connectique': 'USB-C / MagSafe'
    },
    variants: [
      {
        id: 'white',
        color: 'Blanc',
        colorCode: '#FFFFFF',
        price: 2790,
        stock: 25,
        images: ['/products/airpods-pro-2-white-1.jpg']
      }
    ],
    basePrice: 2790,
    rating: 4.8,
    reviewCount: 412,
    reviews: generateReviews(15),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 95,
    createdAt: '2023-09-15'
  },
  {
    id: 'airpods-max',
    name: 'AirPods Max',
    brand: 'Apple',
    category: 'accessory',
    subcategory: 'audio',
    description: "Casque haut-fidelity AirPods Max avec réduction active du bruit, audio spatial et design premium.",
    shortDescription: 'Hi-Fi, ANC, design premium',
    specifications: {
      'Type': 'Circum-aural',
      'Réduction bruit': 'Active',
      'Audio': 'Spatial avec suivi dynamique',
      'Autonomie': 'Jusqu\'à 20h',
      'Matériaux': 'Maille, aluminium, cuir'
    },
    variants: [
      {
        id: 'space-gray',
        color: 'Gris sidéral',
        colorCode: '#4A5568',
        price: 6790,
        stock: 8,
        images: ['/products/airpods-max-space-gray-1.jpg']
      },
      {
        id: 'silver',
        color: 'Argent',
        colorCode: '#E2E8F0',
        price: 6790,
        stock: 6,
        images: ['/products/airpods-max-silver-1.jpg']
      },
      {
        id: 'sky-blue',
        color: 'Bleu ciel',
        colorCode: '#63B3ED',
        price: 6790,
        stock: 5,
        images: ['/products/airpods-max-sky-blue-1.jpg']
      }
    ],
    basePrice: 6790,
    rating: 4.7,
    reviewCount: 234,
    reviews: generateReviews(10),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 72,
    createdAt: '2023-01-01'
  },
  {
    id: 'samsung-buds-2-pro',
    name: 'Samsung Galaxy Buds2 Pro',
    brand: 'Samsung',
    category: 'accessory',
    subcategory: 'audio',
    description: "Écouteurs Galaxy Buds2 Pro avec ANC 360, audio 24bit et confort ultra-léger.",
    shortDescription: 'ANC 360, audio 24bit',
    specifications: {
      'Réduction bruit': 'Intelligente 360°',
      'Audio': '24bit Hi-Fi',
      'Autonomie': 'Jusqu\'à 5h (18h avec étui)',
      'Résistance': 'IPX7'
    },
    variants: [
      {
        id: 'graphite',
        color: 'Graphite',
        colorCode: '#2D3748',
        price: 2290,
        stock: 15,
        images: ['/products/buds-2-pro-graphite-1.jpg']
      },
      {
        id: 'white',
        color: 'Blanc',
        colorCode: '#FFFFFF',
        price: 2290,
        stock: 12,
        images: ['/products/buds-2-pro-white-1.jpg']
      }
    ],
    basePrice: 2290,
    rating: 4.5,
    reviewCount: 167,
    reviews: generateReviews(7),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 65,
    createdAt: '2023-08-15'
  },
  {
    id: 'magic-mouse',
    name: 'Magic Mouse',
    brand: 'Apple',
    category: 'accessory',
    subcategory: 'peripherals',
    description: "Souris multi-touch Magic Mouse avec surface tactile et design ergonomique.",
    shortDescription: 'Multi-touch, design Apple',
    specifications: {
      'Connectivité': 'Bluetooth / Lightning',
      'Autonomie': 'Jusqu\'à 1 mois',
      'Surface': 'Multi-touch',
      'Compatibilité': 'macOS, iPadOS'
    },
    variants: [
      {
        id: 'white',
        color: 'Blanc',
        colorCode: '#FFFFFF',
        price: 850,
        stock: 20,
        images: ['/products/magic-mouse-white-1.jpg']
      },
      {
        id: 'black',
        color: 'Noir',
        colorCode: '#1A202C',
        price: 950,
        stock: 15,
        images: ['/products/magic-mouse-black-1.jpg']
      }
    ],
    basePrice: 850,
    rating: 4.4,
    reviewCount: 198,
    reviews: generateReviews(8),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 55,
    createdAt: '2023-01-01'
  },
  {
    id: 'apple-charger-20w',
    name: 'Chargeur Apple 20W USB-C',
    brand: 'Apple',
    category: 'accessory',
    subcategory: 'charger',
    description: "Chargeur rapide Apple 20W USB-C pour iPhone et iPad. Charge rapide et sécurisée.",
    shortDescription: 'Charge rapide 20W',
    specifications: {
      'Puissance': '20W',
      'Connectique': 'USB-C',
      'Compatibilité': 'iPhone, iPad',
      'Technologie': 'Power Delivery'
    },
    variants: [
      {
        id: 'white',
        color: 'Blanc',
        colorCode: '#FFFFFF',
        price: 250,
        stock: 50,
        images: ['/products/chargeur20w.jpg']
      }
    ],
    basePrice: 250,
    rating: 4.7,
    reviewCount: 523,
    reviews: generateReviews(12),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 88,
    createdAt: '2023-01-01'
  },
  {
    id: 'magsafe-charger',
    name: 'Chargeur MagSafe',
    brand: 'Apple',
    category: 'accessory',
    subcategory: 'charger',
    description: "Chargeur sans fil MagSafe avec alignement magnétique et charge jusqu'à 15W.",
    shortDescription: 'Sans fil 15W, magnétique',
    specifications: {
      'Puissance': 'Jusqu\'à 15W',
      'Technologie': 'MagSafe',
      'Connectique': 'USB-C',
      'Compatibilité': 'iPhone 12 et ultérieur'
    },
    variants: [
      {
        id: 'white',
        color: 'Blanc',
        colorCode: '#FFFFFF',
        price: 450,
        stock: 30,
        images: ['/products/magsafe-charger-white-1.jpg']
      }
    ],
    basePrice: 450,
    rating: 4.5,
    reviewCount: 312,
    reviews: generateReviews(9),
    isNew: true,
    isUsed: false,
    warrantyMonths: 12,
    popularity: 70,
    createdAt: '2023-01-01'
  }
];

// Tous les produits
export const allProducts: Product[] = [
  ...iphones,
  ...samsungPhones,
  ...googlePhones,
  ...laptops,
  ...accessories
];

// Packs
export const packs: Pack[] = [
  {
    id: 'pack-iphone-starter',
    name: 'Pack iPhone Starter',
    description: 'iPhone 15 Pro + AirPods Pro 2 + Chargeur 20W. Tout ce dont vous avez besoin pour démarrer.',
    items: [
      { productId: 'iphone-15-pro', variantId: 'natural-128', quantity: 1 },
      { productId: 'airpods-pro-2', variantId: 'white', quantity: 1 },
      { productId: 'apple-charger-20w', variantId: 'white', quantity: 1 }
    ],
    discountPercentage: 8,
    badge: 'Pack Économie',
    image: '/packs/pack-iphone-starter.jpg',
    popularity: 90
  },
  {
    id: 'pack-iphone-premium',
    name: 'Pack iPhone Premium',
    description: 'iPhone 15 Pro Max + AirPods Max + MagSafe Charger. L\'expérience Apple ultime.',
    items: [
      { productId: 'iphone-15-pro-max', variantId: 'natural-256', quantity: 1 },
      { productId: 'airpods-max', variantId: 'space-gray', quantity: 1 },
      { productId: 'magsafe-charger', variantId: 'white', quantity: 1 }
    ],
    discountPercentage: 10,
    badge: 'Pack Premium',
    image: '/packs/pack-iphone-premium.jpg',
    popularity: 85
  },
  {
    id: 'pack-samsung-galaxy',
    name: 'Pack Samsung Galaxy',
    description: 'Galaxy S24 Ultra + Galaxy Buds2 Pro. L\'écosystème Samsung complet.',
    items: [
      { productId: 'samsung-s24-ultra', variantId: 'titanium-gray-256', quantity: 1 },
      { productId: 'samsung-buds-2-pro', variantId: 'graphite', quantity: 1 }
    ],
    discountPercentage: 7,
    badge: 'Pack Économie',
    image: '/packs/pack-samsung-galaxy.jpg',
    popularity: 72
  },
  {
    id: 'pack-macbook-pro',
    name: 'Pack MacBook Pro Créatif',
    description: 'MacBook Pro 14" M3 + Magic Mouse. La station de travail mobile parfaite.',
    items: [
      { productId: 'macbook-pro-14-m3', variantId: 'space-gray-512', quantity: 1 },
      { productId: 'magic-mouse', variantId: 'white', quantity: 1 }
    ],
    discountPercentage: 5,
    badge: 'Pack Pro',
    image: '/packs/pack-macbook-pro.jpg',
    popularity: 65
  }
];

// Catégories
export const categories = [
  { id: 'smartphone', name: 'Smartphones', icon: 'Smartphone', count: allProducts.filter(p => p.category === 'smartphone').length },
  { id: 'laptop', name: 'PC & Laptops', icon: 'Laptop', count: allProducts.filter(p => p.category === 'laptop').length },
  { id: 'accessory', name: 'Accessoires', icon: 'Headphones', count: allProducts.filter(p => p.category === 'accessory').length },
  { id: 'pack', name: 'Packs', icon: 'Package', count: packs.length }
];

// Marques
export const brands = ['Apple', 'Samsung', 'Google', 'Dell'];

// Couleurs
export const colors = [
  { name: 'Noir', code: '#1A202C' },
  { name: 'Blanc', code: '#FFFFFF' },
  { name: 'Gris', code: '#718096' },
  { name: 'Bleu', code: '#4299E1' },
  { name: 'Violet', code: '#805AD5' },
  { name: 'Argent', code: '#E2E8F0' }
];

// Capacités
export const capacities = ['128GB', '256GB', '512GB', '1TB'];
