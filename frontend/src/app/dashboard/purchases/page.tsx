'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';

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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Purchase History</h2>
          <p className="text-slate-500">Track your property investments</p>
        </div>
      </div>

      {purchases.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Property</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Purchase Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Action</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase: any) => (
                <tr key={purchase.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-6 border-b border-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-xl border border-slate-100 overflow-hidden bg-slate-100 shrink-0">
                        {purchase.property?.images?.[0]?.url ? (
                          <img src={purchase.property.images[0].url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate">{purchase.property?.title || 'Unknown Property'}</p>
                        <p className="text-xs text-slate-500 font-medium">{purchase.property?.city}, {purchase.property?.state}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 border-b border-slate-50">
                    <p className="text-sm font-semibold text-slate-700">{new Date(purchase.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </td>
                  <td className="px-6 py-6 border-b border-slate-50">
                    <p className="text-sm font-bold text-slate-900">${purchase.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-6 border-b border-slate-50">
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-full tracking-wider">
                      {purchase.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 border-b border-slate-50">
                    <Link 
                      href={`/property/${purchase.property?.slug}`}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 underline"
                    >
                      View Property
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-100">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No purchases yet</h3>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto">You haven't purchased any properties yet. Once you complete a transaction, it will appear here.</p>
          <Link href="/property" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
            Explore Properties
          </Link>
        </div>
      )}
    </div>
  );
}
