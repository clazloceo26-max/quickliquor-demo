import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import StoreCard from '@/components/StoreCard';
import CategoryChip from '@/components/CategoryChip';
import OfferBanner from '@/components/OfferBanner';
import FloatingCart from '@/components/FloatingCart';
import { mockStores } from '@/lib/mockData';
import { useRouter } from 'next/router';
import { useAppStore } from '@/lib/store';

const categories = [
  { label: 'Beer', icon: '🍺' },
  { label: 'Wine', icon: '🍷' },
  { label: 'Spirits', icon: '🥃' },
  { label: 'RTDs', icon: '🧃' },
  { label: 'Snacks', icon: '🥜' },
  { label: 'Offers', icon: '🎉' },
];

export default function Home() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAppStore();

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    router.push(`/store/1`);
  };

  return (
    <div className="min-h-screen bg-light pb-20">
      <Header showLocation showNotifications />

      {/* Search Bar */}
      <div className="sticky top-16 z-20 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-2 bg-light rounded-lg px-4 py-3">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search beer, wine, spirits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-dark placeholder-gray-500"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        {!user && (
          <div className="bg-gradient-to-r from-primary to-red-600 rounded-xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Order in Minutes</h2>
            <p className="text-sm opacity-90">From licensed local retailers. Fast delivery where available.</p>
          </div>
        )}

        {/* Categories */}
        <div>
          <h3 className="text-lg font-bold text-dark mb-3">Shop by Category</h3>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category) => (
              <CategoryChip
                key={category.label}
                label={category.label}
                icon={category.icon}
                isActive={activeCategory === category.label}
                onClick={() => handleCategoryClick(category.label)}
              />
            ))}
          </div>
        </div>

        {/* Offer Banner */}
        <OfferBanner
          title="First Order Special"
          subtitle="Get 20% off on your first order"
          badgeText="FIRST20"
          onClick={() => router.push('/store/1')}
        />

        {/* Nearby Stores */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-dark">Nearby Licensed Stores</h3>
            <button className="text-primary text-sm font-semibold hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {mockStores.slice(0, 2).map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>

        {/* Popular Picks */}
        <div>
          <h3 className="text-lg font-bold text-dark mb-3">Popular Picks</h3>
          <div className="space-y-3">
            {['Kingfisher Premium - Best Beer', 'Johnnie Walker - Top Spirit'].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📦</span>
                  <span className="font-semibold text-dark">{item}</span>
                </div>
                <span className="text-primary font-bold">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FloatingCart />
    </div>
  );
}