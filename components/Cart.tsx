import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CartDrawer() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, getCartTotal, updateCartQuantity } = useAppStore();

  if (cart.length === 0 && !isOpen) return null;

  const total = getCartTotal();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-red-600 transition"
      >
        <ShoppingCart size={20} />
        <span className="font-semibold">{itemCount}</span>
      </button>

      {/* Cart Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 animate-fade-in">
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-bold text-dark">Your Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-light rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-280px)]">
              {cart.map((item) => (
                <div key={item.productId} className="flex gap-3 bg-light p-3 rounded-lg">
                  <div className="text-3xl">{item.image}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-dark">{item.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{item.size}</p>
                    <p className="font-bold text-primary mt-2">₹{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-1 hover:bg-white rounded transition"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                    <div className="flex items-center gap-1 bg-white rounded border border-gray-300">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.productId, Math.max(1, item.quantity - 1))
                        }
                        className="px-2 py-1 hover:bg-light transition"
                      >
                        −
                      </button>
                      <span className="px-2 text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.productId, item.quantity + 1)
                        }
                        className="px-2 py-1 hover:bg-light transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border-t border-gray-200 p-4 space-y-3 sticky bottom-0 bg-white">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">₹{total}</span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push('/checkout');
                }}
                className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-red-600 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}