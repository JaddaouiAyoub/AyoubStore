// Types pour AyoubStore E-commerce

export interface ProductVariant {
  id: string;
  color: string;
  colorCode: string;
  capacity?: string;
  price: number;
  stock: number;
  images: string[];
}

export interface BatteryInfo {
  healthPercentage: number;
  cycleCount: number;
  faceIdWorking: boolean;
  touchIdWorking?: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'smartphone' | 'laptop' | 'accessory' | 'pack';
  subcategory?: string;
  description: string;
  shortDescription: string;
  specifications: Record<string, string>;
  variants: ProductVariant[];
  basePrice: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  isNew: boolean;
  isUsed: boolean;
  condition?: 'excellent' | 'very-good' | 'good';
  batteryInfo?: BatteryInfo;
  warrantyMonths: number;
  popularity: number;
  createdAt: string;
}

export interface PackItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  items: PackItem[];
  discountPercentage: number;
  badge: string;
  image: string;
  popularity: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  isPack?: boolean;
  packId?: string;
}

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: (products: Product[], packs: Pack[]) => number;
}

export interface AdminState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export interface FilterState {
  brands: string[];
  categories: string[];
  priceRange: [number, number];
  condition: ('new' | 'used')[];
  colors: string[];
  capacities: string[];
  inStockOnly: boolean;
  searchQuery: string;
  sortBy: 'price-asc' | 'price-desc' | 'popularity' | 'newest';
}

export interface Order {
  id: string;
  items: CartItem[];
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}
