import { CreditCard, Smartphone, Wallet, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { useAppStore } from '@/lib/store';
import { useState } from 'react';
import { v4 as uuidv4 } from 'crypto';

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard' },
  { id: 'wallet', name: 'Wallet', icon: Wallet, description: 'QuickLiquor Wallet' },
  { id: 'cod', name: 'Cash on Delivery', icon: TrendingUp, description: 'Pay at doorstep' },
];

export default function PaymentPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart, addOrder } = useAppStore();
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);

  const total = getCartTotal();
  const deliveryFee = 50;
  const grandTotal = total + deliveryFee;

  const handlePayment = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = {
        id: uuidv4(),
        storeId: '1',
        storeName: 'Premium Liquor House',
        items: cart,
        status: 'confirmed' as const,
        total: grandTotal,
        deliveryETA: '25-35 min',
        createdAt: new Date(),
        deliveryAddress: 'Current Location',
      };
      addOrder(order);
      clearCart();
      setIsProcessing(false);
      router.push(`/order/${order.id}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-light pb-20">
      <Header title="Payment" showBack />

      {/* Order Summary */}
      <div className="p-4 bg-white border-b border-gray-200 space-y-3">
        <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>{cart.length} items</span>
            <span>₹{total}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-primary border-t border-gray-200 pt-2">
            <span>Total</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Select Payment Method</h3>
        <div className="space-y-2">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-full p-4 rounded-lg border-2 transition flex items-center gap-3 ${
                  selectedPayment === method.id
                    ? 'border-primary bg-red-50'
                    : 'border-gray-200 bg-white hover:border-primary'
                }`}
              >
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <Icon size={20} className="text-primary" />
                    <h4 className="font-semibold text-dark">{method.name}</h4>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{method.description}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPayment === method.id
                    ? 'bg-primary border-primary'
                    : 'border-gray-300'
                }`}>
                  {selectedPayment === method.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="p-4 bg-light rounded-lg mx-4 my-4">
        <p className="text-xs text-gray-600">
          📄 <span className="font-semibold">Compliance:</span> Your payment is secure and encrypted. Age verification required at delivery.
        </p>
      </div>

      {/* Payment Button */}
      <div className="fixed bottom-4 left-4 right-4">
        <Button
          label={isProcessing ? 'Processing...' : `Pay ₹${grandTotal}`}
          fullWidth
          size="lg"
          onClick={handlePayment}
          disabled={isProcessing}
        />
      </div>
    </div>
  );
}