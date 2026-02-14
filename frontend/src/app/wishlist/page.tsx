'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import RevealText from '@/components/RevealText';

export default function WishlistPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/users/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (propertyId: string) => {
    try {
      await api.delete(`/users/favorites/${propertyId}`);
      setFavorites(favorites.filter((f: any) => f.propertyId !== propertyId));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
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
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] flex items-center bg-slate-900 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1920&q=80"
            alt="Wishlist properties"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/80"></div>
        </div>

        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 py-12 md:py-24 pb-32 md:pb-48 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-blue-400 text-xs md:text-sm tracking-[0.3em] mb-4 md:mb-8 uppercase font-bold">
              Personal Collection
            </p>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-light text-white leading-[1.1] md:leading-tight">
              <RevealText className="justify-center text-white">Your Dream</RevealText>
              <RevealText className="justify-center text-white" delay={0.2}>Wishlist</RevealText>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTENT SECTION ===== */}
      <section className="pb-24 -mt-16 md:-mt-24 relative z-20 px-6 lg:px-16">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-16 gap-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-slate-200">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              <span className="text-sm font-bold text-slate-800">{favorites.length} Properties Saved</span>
            </div>
            
            {favorites.length > 0 && (
              <p className="text-slate-400 text-sm font-medium">Showing your personal curated selection</p>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                {favorites.map((fav: any) => {
                  const property = fav.property;
                  const getImageUrl = (url: string) => {
                    if (!url) return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800';
                    if (url.startsWith('http')) return url;
                    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${url}`;
                  };
                  const primaryImage = property.images?.[0]?.url;
                  
                  return (
                    <motion.article 
                      key={fav.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group bg-white rounded-[2rem] border border-slate-100 p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-5">
                        <img 
                          src={getImageUrl(primaryImage)} 
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <button 
                          onClick={() => removeFavorite(property.id)}
                          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all border border-slate-100 flex items-center justify-center shadow-lg"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="px-2 pb-2">
                        <p className="text-xl font-bold text-slate-900 mb-1 leading-tight">Rp {property.price.toLocaleString('id-ID')}</p>
                        <h3 className="text-base font-bold text-slate-900 mb-0.5">{property.title}</h3>
                        <p className="text-slate-500 text-sm mb-4 line-clamp-1">{property.city}, {property.state}</p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100/60">
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                            <svg className="w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M3 7h18a2 2 0 012 2v11M3 7v13m0-13a2 2 0 00-2 2v11M3 13h18M21 7v13" />
                            </svg>
                            {property.bedrooms} Beds
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                            <svg className="w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M4 11a1 1 0 011-1h14a1 1 0 011 1v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2zM4 11V7a2 2 0 012-2h1M17 5h1a2 2 0 012 2v4" />
                            </svg>
                            {property.bathrooms} Bath
                          </div>
                          <Link 
                            href={`/property/${property.slug}`}
                            className="text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            Details →
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-50 rounded-[3rem] p-24 text-center border-2 border-dashed border-slate-200"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <svg className="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Your wishlist is empty</h3>
                <p className="text-slate-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">Explore our premium properties and save your favorites to view them later in this personalized list.</p>
                <Link href="/property" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-bold rounded-full shadow-2xl hover:bg-black transition-all">
                  Browse Collection
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
