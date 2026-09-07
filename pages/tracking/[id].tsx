import { MapPin, Phone, Clock, Package, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { useAppStore } from '@/lib/store';
import { useEffect, useState } from 'react';

const statusSteps = [
  { status: 'confirmed', label: 'Order Confirmed', icon: Package },
  { status: 'delivery', label: 'Out for Delivery', icon: MapPin },
  { status: 'delivered', label: 'Delivered', icon: CheckCircle },
];

export default function OrderTracking() {
  const router = useRouter();
  const { id } = router.query;
  const { orders, updateOrderStatus } = useAppStore();
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  const order = orders.find((o) => o.id === id);

  useEffect(() => {
    if (!order) {
      router.push('/');
    }
  }, [order, router]);

  useEffect(() => {
    // Simulate status updates
    const intervals = [
      setTimeout(() => {
        updateOrderStatus(id as string, 'delivery');
        setCurrentStatusIndex(1);
      }, 3000),
      setTimeout(() => {
        updateOrderStatus(id as string, 'delivered');
        setCurrentStatusIndex(2);
      }, 8000),
    ];

    return () => intervals.forEach(clearTimeout);
  }, [id, updateOrderStatus]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-light pb-20">
      <Header title="Track Order" showBack />

      {/* Map Placeholder */}
      <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-white text-lg font-semibold">
        📍 Live Map View
      </div>

      {/* Status Timeline */}
      <div className="p-4 space-y-6">
        <div className="bg-white rounded-xl p-4 space-y-4">
          <h2 className="text-lg font-bold text-dark">Delivery Status</h2>

          {/* Timeline */}
          <div className="space-y-4">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;

              return (
                <div key={step.status} className="flex gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
                        isCompleted
                          ? 'bg-success text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      <Icon size={24} />
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`w-1 h-8 ${
                          isCompleted ? 'bg-success' : 'bg-gray-200'
                        }`}
                      ></div>
                    )}
                  </div>
                  <div className="flex-1 py-2">
                    <h3
                      className={`font-bold ${
                        isCurrent ? 'text-primary text-lg' : 'text-gray-600'
                      }`}
                    >
                      {step.label}
                    </h3>
                    {isCurrent && (
                      <p className="text-sm text-success font-semibold mt-1">
                        {order.deliveryETA}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact & Support */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Need Help?</h2>
          <Button
            label="Contact Delivery Partner"
            fullWidth
            variant="outline"
            icon={<Phone size={18} />}
          />
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Order Details</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Order ID</span>
              <span className="font-mono font-bold text-dark">{order.id.slice(0, 12)}...</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>From</span>
              <span className="font-semibold text-dark">{order.storeName}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Items</span>
              <span className="font-semibold text-dark">{order.items.length}</span>
            </div>
            <div className="flex justify-between text-gray-600 border-t border-gray-200 pt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold text-primary">₹{order.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}