'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Property', href: '/property' },
  { name: 'Blog', href: '/blogs' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkPage = pathname?.startsWith('/property/') || pathname === '/wishlist' || pathname === '/profile';
  const shouldUseDarkTheme = scrolled || isDarkPage;

  if (pathname?.startsWith('/dashboard')) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-lg shadow-slate-900/5' 
          : isDarkPage 
            ? 'py-6 bg-white border-b border-slate-100'
            : 'py-6 bg-transparent'
      }`}
    >
      <nav className="max-w-screen-2xl mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src={shouldUseDarkTheme ? "/logo/logo-dark.svg" : "/logo/logo-white.svg"} 
                alt="Nusava Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className={`text-xl font-bold transition-colors ${shouldUseDarkTheme ? 'text-slate-900' : 'text-white'}`}>
              Nusava
            </span>
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm transition-all hover:-translate-y-0.5 active:translate-y-0 hover:font-bold ${
                  pathname === link.href
                    ? shouldUseDarkTheme ? 'text-blue-600 font-bold' : 'text-white font-bold'
                    : shouldUseDarkTheme ? 'text-slate-600 hover:text-blue-600 font-normal' : 'text-white/70 hover:text-white font-normal'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  href="/login"
                  className={`text-sm px-6 py-2.5 rounded-xl transition-all hover:font-bold ${
                    shouldUseDarkTheme ? 'text-slate-600 hover:text-slate-900 font-normal' : 'text-white/80 hover:text-white font-normal'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className={`px-8 py-3 rounded-full text-sm font-bold shadow-lg transition-all border ${
                    shouldUseDarkTheme 
                      ? 'bg-slate-900 text-white border-slate-900 hover:bg-black' 
                      : 'bg-white text-slate-900 border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  Join Us
                </Link>

              </>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center gap-3 p-1 pr-4 rounded-full transition-all ${
                    shouldUseDarkTheme ? 'bg-slate-100 hover:bg-slate-200' : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold overflow-hidden shrink-0">
                    {user.avatar ? (
                      <img src={`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}${user.avatar}`} alt="" className="w-full h-full object-cover" />
                    ) : (
                      user.name[0].toUpperCase()
                    )}
                  </div>
                  <span className={`text-sm transition-all ${shouldUseDarkTheme ? 'text-slate-900 font-normal' : 'text-white font-normal'}`}>
                    {user.name.split(' ')[0]}
                  </span>
                  <svg className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''} ${shouldUseDarkTheme ? 'text-slate-400' : 'text-white/50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl shadow-slate-900/10 border border-slate-100 p-2 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-slate-50 mb-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Signed in as</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                      </div>
                      
                      {user.role !== 'USER' && (
                        <Link 
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                          My Dashboard
                        </Link>
                      )}

                      <Link 
                        href="/inquiries"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        My Inquiries
                      </Link>

                      <Link 
                        href="/wishlist"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Wishlist
                      </Link>

                      <Link 
                        href="/purchases"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        My Purchases
                      </Link>

                      <Link 
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile Settings
                      </Link>

                      <button 
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className={`mt-6 pb-6 border-t pt-6 flex flex-col gap-4 ${scrolled ? 'border-slate-200' : 'border-white/10'}`}>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-bold transition-all ${
                      pathname === link.href
                        ? scrolled ? 'text-blue-600' : 'text-white'
                        : scrolled ? 'text-slate-600' : 'text-white/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {!user ? (
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 py-4 bg-blue-600 text-white text-center font-bold rounded-2xl shadow-lg"
                  >
                    Get Started
                  </Link>
                ) : (
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="mt-4 py-4 bg-red-50 text-red-600 text-center font-bold rounded-2xl"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
