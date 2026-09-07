import { create } from 'zustand';
import { CartItem, Order, User } from './types';

interface AppState {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  selectedStoreId: string | null;
  isAgeVerified: boolean;

  setUser: (user: User) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setSelectedStore: (storeId: string) => void;
  setAgeVerified: (verified: boolean) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getCartTotal: () => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  cart: [],
  orders: [],
  selectedStoreId: null,
  isAgeVerified: false,

  setUser: (user) => set({ user }),
  
  addToCart: (item) => set((state) => {
    const existing = state.cart.find((i) => i.productId === item.productId);
    if (existing) {
      return {
        cart: state.cart.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      };
    }
    return { cart: [...state.cart, item] };
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((i) => i.productId !== productId),
  })),

  updateCartQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map((i) =>
      i.productId === productId ? { ...i, quantity } : i
    ),
  })),

  clearCart: () => set({ cart: [] }),

  setSelectedStore: (storeId) => set({ selectedStoreId: storeId }),

  setAgeVerified: (verified) => set({ isAgeVerified: verified }),

  addOrder: (order) => set((state) => ({
    orders: [...state.orders, order],
  })),

  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map((o) =>
      o.id === orderId ? { ...o, status } : o
    ),
  })),

  getCartTotal: () => {
    const state = get();
    return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));