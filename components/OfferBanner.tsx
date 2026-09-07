import { ChevronRight } from 'lucide-react';

interface OfferBannerProps {
  title: string;
  subtitle: string;
  badgeText?: string;
  onClick?: () => void;
}

export default function OfferBanner({
  title,
  subtitle,
  badgeText,
  onClick,
}: OfferBannerProps) {
  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-r from-primary to-red-600 rounded-xl p-4 text-white cursor-pointer hover:shadow-lg transition"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm opacity-90 mt-1">{subtitle}</p>
          {badgeText && (
            <span className="inline-block mt-2 px-2 py-1 bg-white text-primary text-xs font-bold rounded">
              {badgeText}
            </span>
          )}
        </div>
        <ChevronRight size={28} />
      </div>
    </div>
  );
}