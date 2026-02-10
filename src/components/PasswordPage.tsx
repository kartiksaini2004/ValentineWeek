import { useState } from 'react';
import { Lock, Heart } from 'lucide-react';
import { hashPassword, CORRECT_PASSWORD_HASH } from '../lib/passwordHash';

interface PasswordPageProps {
  onAuthSuccess: () => void;
}

export default function PasswordPage({ onAuthSuccess }: PasswordPageProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const hashedInput = await hashPassword(password);
      
      if (hashedInput === CORRECT_PASSWORD_HASH) {
        onAuthSuccess();
      } else {
        setError('❌ Incorrect password. Try again!');
        setPassword('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Hash error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-pink-200 to-red-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-4 fill-red-500 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              💕 Our Special Moment 💕
            </h1>
            <p className="text-gray-600">
              Enter the password to unlock your Valentine's surprise
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full bg-gradient-to-r from-rose-500 to-red-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : '🔓 Unlock'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            💑 This page is password protected just for you two 💑
          </p>
        </div>
      </div>
    </div>
  );
}
