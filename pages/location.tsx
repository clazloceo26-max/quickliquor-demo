import { MapPin, Navigation } from 'lucide-react';
import { useRouter } from 'next/router';
import { useAppStore } from '@/lib/store';
import Button from '@/components/Button';
import { useState } from 'react';

export default function LocationPermission() {
  const router = useRouter();
  const [address, setAddress] = useState('');
  const { setUser, user } = useAppStore();

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (user) {
          setUser({
            ...user,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              address: 'Current Location',
            },
          });
        }
        router.push('/');
      });
    }
  };

  const handleManualAddress = () => {
    if (address.trim() && user) {
      setUser({
        ...user,
        location: {
          ...user.location,
          address,
        },
      });
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-red-600 text-white p-6 pt-12 pb-8">
        <h1 className="text-2xl font-bold">Select Delivery Location</h1>
        <p className="text-sm opacity-90 mt-2">We deliver where legally permitted</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 flex flex-col justify-center space-y-6">
        {/* Current Location */}
        <div className="space-y-4">
          <Button
            label="Use Current Location"
            fullWidth
            size="lg"
            icon={<Navigation size={20} />}
            onClick={handleUseCurrentLocation}
          />
          <p className="text-center text-xs text-gray-500">
            We'll use GPS to find nearby licensed stores
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm font-semibold">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Manual Address */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-dark">Enter Your Address</label>
          <div className="flex items-center gap-3 border-2 border-gray-300 rounded-lg px-4 py-3 focus-within:border-primary transition">
            <MapPin size={20} className="text-primary" />
            <input
              type="text"
              placeholder="Street address, area, PIN code"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1 outline-none text-dark"
            />
          </div>
          <Button
            label="Confirm Address"
            fullWidth
            variant="outline"
            size="lg"
            onClick={handleManualAddress}
            disabled={!address.trim()}
          />
        </div>
      </div>
    </div>
  );
}