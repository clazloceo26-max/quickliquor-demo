import { MapPin, Clock, Star } from 'lucide-react';
import { Store } from '@/lib/types';
import { useRouter } from 'next/router';

interface StoreCardProps {
  store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (store.isOpen) {
      router.push(`/store/${store.id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition ${
        !store.isOpen ? 'opacity-60' : 'cursor-pointer'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-dark text-lg">{store.name}</h3>
          <p className="text-xs text-gray-500 mt-1">License: {store.licenseNumber}</p>
        </div>
        {!store.isOpen && (
          <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg">
            Closed
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        <Star size={16} className="fill-warning text-warning" />
        <span className="font-semibold text-sm text-dark">{store.rating}</span>
      </div>

      {/* Details */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} />
          <span>{store.deliveryTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} />
          <span>{store.distance} away</span>
        </div>
      </div>
    </div>
  );
}