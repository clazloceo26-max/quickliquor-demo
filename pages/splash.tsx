import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-primary to-red-600 flex flex-col items-center justify-center text-white">
      <div className="text-center space-y-4 animate-fade-in">
        <div className="text-7xl mb-4">🍾</div>
        <h1 className="text-4xl font-black">QuickLiquor</h1>
        <p className="text-lg opacity-90 mt-4">Order in Minutes</p>
        <p className="text-sm opacity-75">From licensed local retailers</p>
      </div>
    </div>
  );
}