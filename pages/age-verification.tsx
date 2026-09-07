import { AlertCircle, Check } from 'lucide-react';
import { useRouter } from 'next/router';
import Button from '@/components/Button';
import { useAppStore } from '@/lib/store';
import { useState } from 'react';

export default function AgeVerification() {
  const router = useRouter();
  const { setAgeVerified } = useAppStore();
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (confirmed) {
      setAgeVerified(true);
      router.push('/payment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-red-600 flex flex-col">
      {/* Top Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-white space-y-6">
        <div className="text-7xl opacity-90">⚠️</div>
        <h1 className="text-3xl font-black text-center">Age Verification</h1>
        <p className="text-lg opacity-90 text-center">
          By law, alcohol can only be sold to those 21 years or older.
        </p>
      </div>

      {/* Compliance Info */}
      <div className="px-6 py-8 bg-white rounded-t-3xl space-y-6">
        <div className="space-y-4">
          <div className="flex gap-3">
            <AlertCircle size={24} className="text-warning flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-dark">Licensed Retailer</h3>
              <p className="text-sm text-gray-600 mt-1">
                This order will be fulfilled by a licensed liquor retailer. ID verification required at delivery.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <AlertCircle size={24} className="text-warning flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-dark">Delivery Confirmation</h3>
              <p className="text-sm text-gray-600 mt-1">
                Our delivery partner will verify your ID at the doorstep. Alcohol will only be delivered to a verified adult.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <AlertCircle size={24} className="text-warning flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-dark">Responsible Consumption</h3>
              <p className="text-sm text-gray-600 mt-1">
                Please drink responsibly. Do not drink and drive.
              </p>
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="bg-light p-4 rounded-lg space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-5 h-5 mt-1 cursor-pointer accent-primary rounded"
            />
            <span className="text-sm text-dark">
              I confirm that I am <span className="font-bold">21 years or older</span> and agree to the terms and conditions.
            </span>
          </label>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-4">
          <Button
            label="Continue"
            fullWidth
            size="lg"
            onClick={handleConfirm}
            disabled={!confirmed}
          />
          <Button
            label="Go Back"
            fullWidth
            variant="outline"
            onClick={() => router.back()}
          />
        </div>
      </div>
    </div>
  );
}