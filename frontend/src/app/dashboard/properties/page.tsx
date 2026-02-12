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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/properties`);
      const data = await res.json();
      const propertiesArray = Array.isArray(data) ? data : [];
      
      if (user) {
        setProperties(propertiesArray.filter((p: any) => p.agentId === user.id));
      } else {
        setProperties(propertiesArray);
      }
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
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">My <span className="text-blue-600">Properties</span></h2>
          <p className="text-slate-500 mt-2 font-medium">Manage and monitor your listing performance.</p>
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
            <div key={i} className="bg-white rounded-[2.5rem] h-[400px] animate-pulse border border-slate-100" />
          ))}
        </div>
      ) : properties.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl">
            🏠
          </div>
          <h3 className="text-2xl font-black text-slate-900">No Properties Found</h3>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">You haven't added any properties yet. Start listing your first property to reach thousands of investors.</p>
          <Link 
            href="/dashboard/properties/create"
            className="mt-10 inline-block px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
          >
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {properties.map((prop: any) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={prop.id}
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={prop.images[0]?.url ? (prop.images[0].url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${prop.images[0].url}` : prop.images[0].url) : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'} 
                    alt={prop.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm ${
                      prop.status === 'PUBLISHED' ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'
                    }`}>
                      {prop.status}
                    </span>
                    {prop.isFeatured && (
                      <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-black text-slate-900 line-clamp-1">{prop.title}</h3>
                  <p className="text-sm text-slate-400 font-bold mt-1 uppercase tracking-wider">{prop.city}, {prop.state}</p>
                  
                  <div className="mt-6 pt-6 border-t border-slate-50 flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-black text-blue-600">Rp {prop.price.toLocaleString('id-ID')}</p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <Link 
                      href={`/dashboard/properties/edit/${prop.id}`}
                      className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(prop.id)}
                      className="flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                  
                  <Link 
                    href={`/property/${prop.slug}`}
                    target="_blank"
                    className="mt-4 block text-center text-[10px] font-black uppercase text-slate-300 hover:text-blue-500 tracking-[0.2em] transition-colors"
                  >
                    View Live Preview ↗
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
