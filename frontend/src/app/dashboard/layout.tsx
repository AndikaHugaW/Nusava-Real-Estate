'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { updateAvatar } from '@/lib/api';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, setUser, loading, logout } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('File is too large. Max size is 2MB.');
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('avatar', file);
      
      const updatedUser = await updateAvatar(formData);
      
      // Update local context and storage
      if (user) {
        const newUser = { ...user, avatar: updatedUser.avatar };
        setUser(newUser);
      }
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Leads', href: '/dashboard/inquiries' },
    { name: 'Property', href: '/dashboard/properties' },
    { name: 'Transaction', href: '/dashboard/transactions' },
    { name: 'Calendar', href: '/dashboard/calendar' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Management Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'py-4 bg-white/80 backdrop-blur-2xl border-b border-slate-200 shadow-sm' : 'py-6 bg-white border-b border-slate-100'
      }`}>
        <div className="max-w-screen-2xl mx-auto px-8 relative flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/logo/logo-dark.svg" 
                alt="Nusava Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Nusava</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden xl:flex items-center bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Center */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3 pr-6 border-r border-slate-200">
               <button className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg shadow-slate-900/20 hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/></svg>
               </button>
               <button className="w-10 h-10 text-slate-400 hover:text-slate-900 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/></svg>
               </button>
               <button className="relative w-10 h-10 text-slate-400 hover:text-slate-900 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="absolute top-2 right-2 w-4 h-4 bg-orange-500 text-[9px] font-black text-white rounded-full border-2 border-white flex items-center justify-center">7</span>
               </button>
            </div>

            {/* Profile Dropdown Container */}
            <div className="relative" ref={dropdownRef}>
              <div 
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-slate-900 transition-all ${isUploading ? 'opacity-50' : ''}`}>
                    <img 
                      src={user?.avatar ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${user.avatar}` : `https://i.pravatar.cc/150?u=${user?.email || 'user'}`} 
                      className="w-full h-full object-cover"
                      alt="Profile"
                    />
                  </div>
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-black text-slate-900 leading-none">{user?.name || 'Loading...'}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{user?.role || 'User'}</p>
                </div>
                <motion.svg 
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-72 bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-3 overflow-hidden"
                  >
                    <div className="p-4 bg-slate-50 rounded-[1.5rem] mb-2">
                       <div className="flex items-center gap-3 mb-4">
                          <div className="relative group/avatar cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                             <img 
                                src={user?.avatar ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${user.avatar}` : `https://i.pravatar.cc/150?u=${user?.email || 'user'}`} 
                                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm group-hover/avatar:opacity-70 transition-opacity" 
                             />
                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeWidth={2}/><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2}/></svg>
                             </div>
                             {/* Hidden File Input */}
                             <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept="image/*"
                                onChange={handleAvatarChange}
                             />
                          </div>
                          <div className="min-w-0">
                             <p className="font-black text-slate-900 text-sm truncate">{user?.name}</p>
                             <p className="text-[10px] font-bold text-slate-400 truncate">{user?.email}</p>
                          </div>
                       </div>
                       <Link href="/dashboard/settings" className="block w-full py-2.5 bg-white rounded-xl text-center text-xs font-black text-slate-900 shadow-sm hover:bg-slate-900 hover:text-white transition-all">
                          Edit Profile
                       </Link>
                    </div>

                    <div className="space-y-1">
                       <Link href="/dashboard/settings?tab=profile" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all group/item">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth={2}/></svg>
                          </div>
                          <span className="text-xs font-bold">My Account</span>
                       </Link>
                       <Link href="/dashboard/settings?tab=password" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all group/item">
                          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center group-hover/item:bg-purple-500 group-hover/item:text-white transition-colors">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth={2}/></svg>
                          </div>
                          <span className="text-xs font-bold">Security</span>
                       </Link>
                       <div className="h-px bg-slate-100 my-2 mx-4"></div>
                       <button 
                          onClick={() => { logout(); router.push('/login'); }}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-all group/item"
                       >
                          <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center group-hover/item:bg-rose-500 group-hover/item:text-white transition-colors">
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                          <span className="text-xs font-bold">Sign Out</span>
                       </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-screen-2xl mx-auto px-8 pt-32 pb-20">
        {children}
      </main>
    </div>
  );
}
