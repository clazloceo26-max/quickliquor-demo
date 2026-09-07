import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/lib/types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
  onFavorite?: (productId: string) => void;
  isFavorited?: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  onFavorite,
  isFavorited = false,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
      setShowQuantity(false);
      setQuantity(1);
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-light rounded-lg flex items-center justify-center mb-3">
        <span className="text-5xl">{product.image}</span>
        <button
          onClick={() => onFavorite?.(product.id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition"
        >
          <Heart
            size={18}
            className={isFavorited ? 'fill-primary text-primary' : 'text-gray-400'}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-dark text-sm truncate">{product.name}</h3>
        <p className="text-xs text-gray-500">{product.brand}</p>

        {/* Proof & Size */}
        <div className="flex items-center gap-2 text-xs text-gray-600">
          {product.proof > 0 && <span>{product.proof}% ABV</span>}
          <span className="text-gray-300">•</span>
          <span>{product.size}</span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <p className="text-lg font-bold text-primary">₹{product.price}</p>
          {!showQuantity ? (
            <button
              onClick={() => setShowQuantity(true)}
              className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-red-600 transition text-sm font-semibold"
            >
              <ShoppingCart size={16} />
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition text-sm"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 py-1 bg-primary text-white rounded hover:bg-red-600 transition text-sm"
              >
                +
              </button>
              <button
                onClick={handleAddToCart}
                className="px-2 py-1 bg-success text-white rounded text-xs font-semibold hover:bg-green-600 transition"
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}