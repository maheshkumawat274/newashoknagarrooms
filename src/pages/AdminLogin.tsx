import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, AlertCircle } from 'lucide-react';
import { API_URLS } from '../apiConfig';

interface AdminLoginProps {
  onLogin: (status: boolean) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URLS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (res.ok) {
        onLogin(true);
        localStorage.setItem('admin_auth', 'true');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Connection failed. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
            <Lock size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Admin Portal</h2>
          <p className="text-gray-500 font-medium text-sm">Secure access for New Ashok Nagar Rooms</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                required
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                required
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-primary transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-red-600 text-sm font-bold bg-red-50 p-4 rounded-xl border border-red-100"
            >
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl shadow-primary/20 active:scale-95"
          >
            Access Dashboard
          </button>
        </form>

        <p className="mt-10 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
          Strictly for authorized personnel only
        </p>
      </motion.div>
    </div>
  );
}
