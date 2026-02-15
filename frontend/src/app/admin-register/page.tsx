'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminRegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'AGENT'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && (user.role === 'AGENT' || user.role === 'ADMIN')) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token, data.user);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Pendaftaran gagal');
      }
    } catch (err) {
      setError('Koneksi gagal. Pastikan server backend berjalan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6 py-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-slate-800/50 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl p-10 border border-slate-700 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-emerald-600 rounded-2xl mb-6 shadow-xl shadow-emerald-500/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Agent <span className="text-emerald-500">Registration</span></h1>
          <p className="text-slate-400 mt-2 font-medium">Buka akses dashboard untuk mengelola listing Anda</p>
        </div>

        {error && (
          <motion.div 
             initial={{ opacity: 0, x: -10 }}
             animate={{ opacity: 1, x: 0 }}
             className="bg-red-500/10 text-red-400 p-4 rounded-xl text-sm font-bold mb-6 border border-red-500/20 italic text-center"
          >
            "{error}"
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
            <input 
              type="text" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full mt-2 px-6 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-white placeholder:text-slate-600"
              placeholder="Your professional name"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full mt-2 px-6 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-white placeholder:text-slate-600"
              placeholder="agent@nusava.com"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">WhatsApp Number</label>
            <input 
              type="tel" 
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full mt-2 px-6 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-white placeholder:text-slate-600"
              placeholder="0812..."
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Secure Password</label>
            <input 
              type="password" 
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full mt-2 px-6 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-medium text-white placeholder:text-slate-600"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-bold shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all active:scale-[0.98] disabled:bg-slate-700 disabled:text-slate-500 mt-4"
          >
            {loading ? 'Creating Account...' : 'Daftar sebagai Agent'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-700/50 text-center space-y-4">
          <p className="text-sm text-slate-500 font-medium">
            Sudah terdaftar? <Link href="/admin-login" className="text-emerald-500 font-bold hover:underline">Sign In Manager</Link>
          </p>
          <Link href="/" className="inline-block text-xs text-slate-600 font-medium hover:text-white transition-colors">
            ← Kembali ke Website Utama
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
