'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /*
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (user.role === 'USER') {
        router.push('/');
      }
    }
  }, [user, loading, router]);
  */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // if (!user || user.role === 'USER') return null;

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
               <button className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20 hover:scale-110 transition-transform">
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

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <img 
                  src={user?.avatar ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}${user.avatar}` : "https://i.pravatar.cc/150?u=anne"} 
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-orange-500 transition-all" 
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-black text-slate-900 leading-none">{user?.name || 'Anne H.'}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{user?.role || 'Agent Sales'}</p>
              </div>
              <svg className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
