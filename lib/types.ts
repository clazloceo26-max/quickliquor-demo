export interface Store {
  id: string;
  name: string;
  logo?: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  isOpen: boolean;
  licenseNumber: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Beer' | 'Wine' | 'Spirits' | 'RTDs' | 'Snacks';
  price: number;
  image: string;
  proof?: number;
  size: string;
  brand: string;
  inStock: boolean;
  storeId: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

export interface Order {
  id: string;
  storeId: string;
  storeName: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'delivery' | 'delivered';
  total: number;
  deliveryETA: string;
  createdAt: Date;
  deliveryAddress: string;
}

export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  isAgeVerified: boolean;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  favorites: string[];
}