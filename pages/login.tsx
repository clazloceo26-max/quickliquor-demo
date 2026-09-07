import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/router';
import { useAppStore } from '@/lib/store';
import Button from '@/components/Button';

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const { setUser } = useAppStore();

  const handlePhoneSubmit = () => {
    if (phone.length === 10) {
      setStep('otp');
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 4) {
      setUser({
        id: '1',
        phone,
        name: 'User',
        isAgeVerified: false,
        location: { lat: 0, lng: 0, address: '' },
        favorites: [],
      });
      router.push('/location');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-red-600 text-white p-6 pt-12 pb-8">
        <h1 className="text-3xl font-black">QuickLiquor</h1>
        <p className="text-sm opacity-90 mt-2">Fast, Premium, Licensed</p>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-8 flex flex-col justify-center">
        {step === 'phone' ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-2">Enter Your Phone</h2>
              <p className="text-gray-600 text-sm">We'll send you a verification code</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-dark">Phone Number</label>
              <div className="flex items-center gap-2 border-2 border-gray-300 rounded-lg px-4 py-3 focus-within:border-primary transition">
                <span className="text-gray-600 font-semibold">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="Enter 10-digit number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="flex-1 outline-none text-dark text-lg font-semibold"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                By proceeding, you agree to our Terms & Conditions and that you are 21+ years old.
              </p>
            </div>

            <Button
              label="Send OTP"
              fullWidth
              onClick={handlePhoneSubmit}
              disabled={phone.length !== 10}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-dark mb-2">Enter OTP</h2>
              <p className="text-gray-600 text-sm">Sent to +91{phone}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-dark">4-Digit Code</label>
              <div className="flex gap-2 justify-center">
                {[0, 1, 2, 3].map((idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={otp[idx] || ''}
                    onChange={(e) => {
                      const newOtp = otp.split('');
                      newOtp[idx] = e.target.value.replace(/\D/g, '');
                      setOtp(newOtp.join(''));
                    }}
                    className="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition"
                  />
                ))}
              </div>
            </div>

            <Button
              label="Verify"
              fullWidth
              onClick={handleOtpSubmit}
              disabled={otp.length !== 4}
            />

            <button
              onClick={() => {
                setStep('phone');
                setOtp('');
              }}
              className="w-full py-3 text-primary font-semibold hover:bg-red-50 rounded-lg transition"
            >
              Change Phone Number
            </button>
          </div>
        )}
      </div>
    </div>
  );
}