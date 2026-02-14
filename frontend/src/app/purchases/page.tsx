'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import RevealText from '@/components/RevealText';

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await api.get('/users/purchases');
      setPurchases(response.data);
    } catch (error) {
      console.error('Failed to fetch purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
       {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] flex items-center bg-slate-900 overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1448630360428-65456885c650?w=1920&q=80"
            alt="Investment portfolio"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/90"></div>
        </div>

        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 py-12 md:py-24 pb-32 md:pb-48 lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-blue-400 text-xs md:text-sm tracking-[0.3em] mb-4 md:mb-8 uppercase font-bold">
              Investment Portfolio
            </p>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-light text-white leading-[1.1] md:leading-tight">
               <RevealText className="text-white">Transaction</RevealText>
               <RevealText className="text-white" delay={0.2}>History</RevealText>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTENT SECTION ===== */}
      <section className="pb-24 -mt-16 md:-mt-24 relative z-20 px-6 lg:px-16">
        <div className="max-w-screen-2xl mx-auto">
          
          {purchases.length > 0 ? (
            <div className="space-y-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Recent Transactions</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {purchases.map((purchase: any, idx: number) => (
                  <motion.div 
                    key={purchase.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-[2rem] p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-8 border border-slate-200 transition-all"
                  >
                    <div className="w-full lg:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                      {purchase.property?.images?.[0]?.url ? (
                        <img src={purchase.property.images[0].url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                           <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-green-100">
                          {purchase.status}
                        </span>
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                          ID: {purchase.id.split('-')[0]}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-1">{purchase.property?.title || 'Unknown Property'}</h4>
                      <p className="text-slate-500 text-sm flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {purchase.property?.city}, {purchase.property?.state}
                      </p>
                    </div>

                    <div className="w-full lg:w-48 text-center lg:text-right border-t lg:border-t-0 lg:border-l border-slate-50 pt-6 lg:pt-0 lg:pl-8">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Purchase Amount</p>
                       <p className="text-2xl font-bold text-slate-900 mb-4">${purchase.amount.toLocaleString()}</p>
                       <p className="text-sm text-slate-500 font-medium">{new Date(purchase.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>

                    <div className="shrink-0">
                      <Link 
                        href={`/property/${purchase.property?.slug}`}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                      >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] p-24 text-center border-2 border-dashed border-slate-200">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">No investments yet</h3>
              <p className="text-slate-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">You haven't purchased any properties. Start building your portfolio with Nusava today.</p>
              <Link href="/property" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-bold rounded-full hover:bg-black transition-all">
                Find Your Investment
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
