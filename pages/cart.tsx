import { Trash2, Home, Plus, Minus } from 'lucide-react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { useAppStore } from '@/lib/store';
import { useState } from 'react';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart } = useAppStore();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const total = getCartTotal();
  const finalTotal = Math.max(0, total - discount);
  const deliveryFee = total > 0 ? 50 : 0;
  const grandTotal = finalTotal + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'FIRST20') {
      setDiscount(Math.floor(total * 0.2));
      setPromoCode('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-light flex flex-col">
        <Header title="Cart" showBack />
        <div className="flex-1 flex flex-col items-center justify-center px-6 space-y-4">
          <div className="text-6xl opacity-50">🛒</div>
          <h2 className="text-2xl font-bold text-dark text-center">Your Cart is Empty</h2>
          <p className="text-gray-600 text-center">Add products from nearby stores to get started</p>
          <Button
            label="Continue Shopping"
            onClick={() => router.push('/')}
            icon={<Home size={18} />}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light pb-20">
      <Header title="Your Cart" showBack />

      {/* Cart Items */}
      <div className="p-4 space-y-3">
        {cart.map((item) => (
          <div key={item.productId} className="bg-white rounded-lg p-4 flex gap-3">
            <div className="text-3xl">{item.image}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-dark">{item.name}</h3>
              <p className="text-xs text-gray-600 mt-1">{item.size}</p>
              <p className="font-bold text-primary mt-2">₹{item.price}</p>
            </div>
            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => removeFromCart(item.productId)}
                className="p-1 hover:bg-red-50 rounded transition"
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
              <div className="flex items-center gap-1 bg-light rounded">
                <button
                  onClick={() =>
                    updateCartQuantity(item.productId, Math.max(1, item.quantity - 1))
                  }
                  className="p-1 hover:bg-white rounded transition"
                >
                  <Minus size={16} />
                </button>
                <span className="px-2 font-semibold text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                  className="p-1 hover:bg-white rounded transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <label className="block text-sm font-semibold text-dark mb-2">Promo Code</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
          />
          <button
            onClick={handleApplyPromo}
            className="px-4 py-2 bg-light text-primary font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            Apply
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Try: FIRST20</p>
      </div>

      {/* Summary */}
      <div className="p-4 bg-white border-t border-gray-200 space-y-3 sticky bottom-0">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-success font-semibold">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-600">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-dark border-t border-gray-200 pt-2">
            <span>Total</span>
            <span className="text-primary">₹{grandTotal}</span>
          </div>
        </div>
        <Button
          label="Proceed to Checkout"
          fullWidth
          onClick={() => router.push('/age-verification')}
        />
      </div>
    </div>
  );
}