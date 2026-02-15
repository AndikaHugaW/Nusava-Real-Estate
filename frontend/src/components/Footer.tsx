'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const footerLinks = {
  sell: ['Request an offer', 'Pricing', 'Reviews', 'Store'],
  buy: ['Buy and sell properties', 'Rent home', 'Builder trade-up'],
  about: ['Company', 'How it works', 'Contact', 'Investors'],
};

export default function Footer() {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/admin-login' || pathname === '/admin-register';
  const isDashboardPage = pathname?.toLowerCase().startsWith('/dashboard');

  if (isDashboardPage || isAuthPage) return null;

  return (
    <footer className="bg-white pt-24">
      {/* Top Section */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Brand & Contact - Left Side (1/3 width) */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 flex items-center justify-center">
                <img 
                  src="/logo/logo-dark.svg" 
                  alt="Nusava Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-3xl font-bold text-slate-900 tracking-tight">Nusava</span>
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 mt-1 flex-shrink-0 text-slate-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-slate-500 leading-relaxed max-w-xs">
                  Nusava Real Estate<br />
                  Office 903, The Binary Tower by Omniyat<br />
                  Surakarta, Central Java, Indonesia
                </p>
              </div>

              <div className="flex items-center gap-4 text-slate-500">
                <div className="w-6 h-6 flex-shrink-0 text-slate-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p>Phone: +62 4 123 4567</p>
              </div>

              <div className="flex items-center gap-4 text-slate-500">
                <div className="w-6 h-6 flex-shrink-0 text-slate-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p>Email: nusava@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Links Grid - Right Side (2/3 width) */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row justify-between items-start gap-12 lg:gap-8">
            <div>
              <h4 className="text-2xl font-bold text-slate-900 mb-8 uppercase tracking-wider">Sell A Home</h4>
              <ul className="space-y-4">
                {footerLinks.sell.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-2xl font-bold text-slate-900 mb-8 uppercase tracking-wider">BUY,RENT AND SELL</h4>
              <ul className="space-y-4">
                {footerLinks.buy.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-slate-900 mb-8 uppercase tracking-wider">About</h4>
              <ul className="space-y-4">
                {footerLinks.about.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-500 hover:text-slate-900 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Image Section */}
      <div className="w-full h-[500px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1620332372374-f108c53d2e03?w=1920&q=80" 
          alt="Nusava Architecture" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Copyright Section */}
      <div className="bg-slate-50 py-10">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 flex flex-col md:row justify-between items-center gap-8 md:flex-row">
          <p className="text-slate-500 font-medium">
            ©2025 Nusava. All right reserved
          </p>
          
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 bg-slate-400/20 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
