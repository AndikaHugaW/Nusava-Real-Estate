'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import RevealText from '@/components/RevealText';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setLoading(true);
      setError('');
      const response = await api.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (setUser && user) {
        setUser({ ...user, avatar: response.data.avatar });
      }
      setSuccess('Profile picture updated successfully');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update avatar');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const response = await api.put('/users/profile', formData);
      
      if (setUser && user) {
        setUser({ ...user, ...response.data });
      }
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] flex items-center bg-slate-900 overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80" 
            className="w-full h-full object-cover" 
            alt="Profile background"
          />
        </div>
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-16 py-12 md:py-24 pb-32 md:pb-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight">
              <RevealText className="text-white">Profile Settings</RevealText>
            </h1>
            <p className="text-white/60 text-base md:text-xl mt-4 md:mt-6 max-w-2xl font-light leading-relaxed">
              Manage your personal information, security preferences, and account activity in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTENT SECTION ===== */}
      <section className="pb-20 -mt-16 md:-mt-32 relative z-20 px-6 lg:px-16">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Summary */}
            <div className="lg:col-span-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 border border-slate-200 sticky top-24"
              >
                <div className="flex flex-col items-center">
                  <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                    <div className="w-40 h-40 rounded-full overflow-hidden border-8 border-slate-50 shadow-inner bg-slate-100 flex items-center justify-center">
                      {user.avatar ? (
                        <img 
                          src={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}${user.avatar}`} 
                          alt={user.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-5xl font-bold text-slate-300">
                          {user.name[0].toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-slate-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0017.07 7H18a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*"
                    />
                  </div>
                  
                  <h3 className="mt-6 text-2xl font-bold text-slate-900">{user.name}</h3>
                  <div className="mt-2 px-4 py-1.5 bg-slate-100 rounded-full">
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">{user.role}</p>
                  </div>
                  
                  <div className="w-full mt-10 space-y-4 pt-10 border-t border-slate-50">
                    <div className="flex justify-between items-center px-2">
                      <span className="text-slate-400 text-sm font-medium">Email Address</span>
                      <span className="text-slate-900 font-semibold text-sm">{user.email}</span>
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <span className="text-slate-400 text-sm font-medium">Phone</span>
                      <span className="text-slate-900 font-semibold text-sm">{user.phone || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <span className="text-slate-400 text-sm font-medium">Member Since</span>
                      <span className="text-slate-900 font-semibold text-sm">{new Date(user.createdAt).toLocaleDateString('en-GB')}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Edit Form */}
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 lg:p-16 border border-slate-200 h-full"
              >
                <div className="mb-10 md:mb-12">
                  <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">Account Information</h2>
                  <p className="text-slate-500 text-sm md:text-base">Keep your profil updated to get the best experience on Nusava.</p>
                </div>

                {success && (
                  <div className="mb-8 p-5 md:p-6 bg-green-50 text-green-700 rounded-2xl md:rounded-3xl text-sm font-bold border border-green-100 flex items-center gap-3">
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {success}
                  </div>
                )}
                
                {error && (
                  <div className="mb-8 p-5 md:p-6 bg-red-50 text-red-700 rounded-2xl md:rounded-3xl text-sm font-bold border border-red-100 flex items-center gap-3">
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                )}

                <form onSubmit={handleUpdateProfile} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 md:px-6 md:py-4.5 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all font-semibold text-slate-900"
                        placeholder="Ex: Budi Santoso"
                        required
                      />
                    </div>

                    <div className="space-y-2 md:space-y-3">
                      <label className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-5 py-4 md:px-6 md:py-4.5 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all font-semibold text-slate-900"
                        placeholder="Ex: +62 812 3456 7890"
                      />
                    </div>
                  </div>

                  <div className="pt-6 md:pt-10">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {loading ? 'Processing...' : 'Save Changes'}
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
