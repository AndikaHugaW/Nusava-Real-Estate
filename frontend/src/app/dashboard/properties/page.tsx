'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      // Get properties where agentId is current user
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/properties?status=All&limit=100`);
      const data = await res.json();
      
      // The API returns an object { properties: [], pagination: {} }
      const propertiesArray = Array.isArray(data) ? data : (data.properties || []);
      
      setProperties(propertiesArray);
    } catch (err) {
      console.error('Failed to fetch properties', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    try {
      const token = localStorage.getItem('nusava_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        setProperties(properties.filter((p: any) => p.id !== id));
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            {user?.role === 'ADMIN' ? 'All' : 'My'} <span className="text-blue-600">Properties</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium">
            {user?.role === 'ADMIN' ? 'Manage and monitor all platform listings.' : 'Manage and monitor your listing performance.'}
          </p>
        </div>
        <Link 
          href="/dashboard/properties/create"
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
          Add New Property
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-[2.5rem] h-[450px] animate-pulse border border-slate-100" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Add Property Card CTA */}
          <Link href="/dashboard/properties/create" className="group h-full min-h-[450px]">
            <div className="h-full border-4 border-dashed border-slate-100 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center transition-all hover:border-blue-200 hover:bg-blue-50/10 group-hover:scale-[0.98]">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">Add New <br /> <span className="text-blue-600">Property</span></h3>
              <p className="text-slate-400 mt-4 text-sm font-medium px-4">Ready to reach more investors? List your property now.</p>
            </div>
          </Link>

          <AnimatePresence>
            {properties.map((prop: any) => {
              const primaryImage = prop.images?.find((img: any) => img.isPrimary)?.url || prop.images?.[0]?.url;
              const getImageUrl = (url: string) => {
                if (!url) return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800';
                if (url.startsWith('http')) return url;
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
                return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
              };

              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={prop.id}
                  className="group bg-white rounded-[3rem] border border-slate-100 p-5 transition-all hover:shadow-2xl hover:shadow-slate-200/50 flex flex-col"
                >
                  <div className="relative aspect-[4/3] rounded-[2.2rem] overflow-hidden mb-8">
                    <img 
                      src={getImageUrl(primaryImage)} 
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute top-5 left-5 flex flex-col gap-2">
                      <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-xl shadow-lg border border-white/20 ${
                        prop.status === 'PUBLISHED' ? 'bg-emerald-500/80 text-white' : 'bg-orange-500/80 text-white'
                      }`}>
                        {prop.status}
                      </span>
                      {prop.isFeatured && (
                        <span className="px-4 py-2 bg-blue-600/80 backdrop-blur-xl text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg border border-white/20">
                          Featured Listing
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="px-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <h3 className="text-xl font-black text-slate-900 line-clamp-1 flex-1 leading-tight tracking-tight">{prop.title}</h3>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-lg">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2.5}/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth={2.5}/></svg>
                        <span className="text-[12px] font-black text-slate-900">{prop._count?.views || 0}</span>
                      </div>
                    </div>
                    
                    <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.1em] mt-1">{prop.city}, {prop.state}</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tighter mt-6">Rp {prop.price.toLocaleString('id-ID')}</p>

                    <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-slate-50">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[13px] font-black text-slate-900">{prop.bedrooms}</span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Beds</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 border-x border-slate-100">
                        <span className="text-[13px] font-black text-slate-900">{prop.bathrooms}</span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Baths</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[13px] font-black text-slate-900">{prop.area}</span>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">m²</span>
                      </div>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-4 pb-2">
                      <Link 
                        href={`/dashboard/properties/edit/${prop.id}`}
                        className="flex items-center justify-center gap-2 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(prop.id)}
                        className="flex items-center justify-center gap-2 py-4 bg-rose-50 text-rose-500 rounded-2xl font-bold text-sm hover:bg-rose-500 hover:text-white transition-all active:scale-95"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
