import { ShoppingCart } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/router';

export default function FloatingCart() {
  const router = useRouter();
  const { cart } = useAppStore();

  if (cart.length === 0) return null;

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={() => router.push('/cart')}
      className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-red-600 active:scale-95 transition-all"
    >
      <ShoppingCart size={20} />
      <span className="font-bold text-base">{itemCount}</span>
    </button>
  );
}