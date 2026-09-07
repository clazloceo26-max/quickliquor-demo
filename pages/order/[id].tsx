import { CheckCircle, Clock, MapPin, Phone, Copy } from 'lucide-react';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import { useAppStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export default function OrderConfirmation() {
  const router = useRouter();
  const { id } = router.query;
  const { orders } = useAppStore();
  const [copied, setCopied] = useState(false);

  const order = orders.find((o) => o.id === id);

  useEffect(() => {
    if (!order) {
      router.push('/');
    }
  }, [order, router]);

  if (!order) return <div>Loading...</div>;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-success to-green-600 flex flex-col pb-6">
      {/* Success Animation */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-white space-y-6 pt-12">
        <div className="animate-bounce">
          <CheckCircle size={80} />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black">Order Confirmed!</h1>
          <p className="text-lg opacity-90">Your order has been placed successfully</p>
        </div>
      </div>

      {/* Order Details Card */}
      <div className="px-4 space-y-4">
        {/* Order ID */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Order ID</h2>
          <div className="flex items-center gap-2 bg-light p-3 rounded-lg">
            <code className="flex-1 font-mono text-sm font-bold text-dark">{order.id.slice(0, 12)}...</code>
            <button
              onClick={handleCopyOrderId}
              className="p-2 hover:bg-white rounded transition"
            >
              <Copy size={18} className={copied ? 'text-success' : 'text-gray-400'} />
            </button>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Delivery Details</h2>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-gray-600 font-semibold">Estimated Delivery</p>
                <p className="font-bold text-dark text-lg">{order.deliveryETA}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-t border-gray-200 pt-3">
              <MapPin size={20} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-gray-600 font-semibold">Delivery Address</p>
                <p className="font-medium text-dark mt-1">{order.deliveryAddress}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-t border-gray-200 pt-3">
              <Phone size={20} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-xs text-gray-600 font-semibold">Store</p>
                <p className="font-medium text-dark mt-1">{order.storeName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Order Summary</h2>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center text-sm">
                <span className="text-dark">{item.quantity}x {item.name}</span>
                <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">₹{order.total}</span>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-900">
            📄 <span className="font-semibold">Age Verification:</span> Our delivery partner will verify your ID at the doorstep. Please have a valid government ID ready.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mt-6 space-y-2">
        <Button
          label="Track Order"
          fullWidth
          onClick={() => router.push(`/tracking/${order.id}`)}
        />
        <Button
          label="Back to Home"
          fullWidth
          variant="outline"
          onClick={() => router.push('/')}
        />
      </div>
    </div>
  );
}