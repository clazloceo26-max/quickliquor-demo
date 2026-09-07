import { ArrowLeft, MapPin, Bell } from 'lucide-react';
import { useRouter } from 'next/router';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showLocation?: boolean;
  showNotifications?: boolean;
  onLocationClick?: () => void;
}

export default function Header({
  title,
  showBack = false,
  showLocation = false,
  showNotifications = false,
  onLocationClick,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft size={24} className="text-dark" />
            </button>
          )}
          {title && <h1 className="text-xl font-bold text-dark">{title}</h1>}
        </div>

        <div className="flex items-center gap-2">
          {showLocation && (
            <button
              onClick={onLocationClick}
              className="flex items-center gap-1 px-3 py-2 bg-light rounded-lg hover:bg-gray-200 transition"
            >
              <MapPin size={18} className="text-primary" />
              <span className="text-sm font-medium text-dark">Deliver</span>
            </button>
          )}
          {showNotifications && (
            <button className="relative p-2 hover:bg-light rounded-lg transition">
              <Bell size={24} className="text-dark" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}