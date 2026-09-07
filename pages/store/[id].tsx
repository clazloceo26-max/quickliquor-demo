import { useRouter } from 'next/router';
import { Star, MapPin, Clock, PhoneIcon } from 'lucide-react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import FloatingCart from '@/components/FloatingCart';
import Button from '@/components/Button';
import { mockStores, mockProducts } from '@/lib/mockData';
import { useAppStore } from '@/lib/store';
import { CartItem } from '@/lib/types';

export default function StorePage() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart, cart } = useAppStore();

  const store = mockStores.find((s) => s.id === id);
  const products = mockProducts.filter((p) => p.storeId === id);

  if (!store) return <div>Store not found</div>;

  const handleAddToCart = (product: any, quantity: number) => {
    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      size: product.size,
    };
    addToCart(cartItem);
  };

  return (
    <div className="min-h-screen bg-light pb-20">
      <Header title={store.name} showBack />

      {/* Store Info */}
      <div className="bg-white border-b border-gray-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={18} className="fill-warning text-warning" />
            <span className="font-bold text-dark">{store.rating}</span>
          </div>
          <span className="text-xs bg-success text-white px-2 py-1 rounded-full font-semibold">
            {store.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{store.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{store.distance} away</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <PhoneIcon size={14} />
            <span>License: {store.licenseNumber}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-600 font-semibold">📋 Licensed Retailer</p>
          <p className="text-xs text-gray-600 mt-1">Orders fulfilled by this licensed liquor retailer. Age verification required at delivery.</p>
        </div>
      </div>

      {/* Products */}
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-bold text-dark">Available Products</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      <FloatingCart />
    </div>
  );
}