'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

export default function AnalyticsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Platform <span className="text-blue-600">Analytics</span></h2>
        <p className="text-slate-500 mt-2 font-medium">Deep insights into {user?.role === 'ADMIN' ? 'platform-wide' : 'your listing'} performance and market trends.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 col-span-full"
        >
          <div className="flex items-center justify-center h-96 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
            <div className="text-center">
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-2xl font-black text-slate-900">Advanced Charts Coming Soon</h3>
              <p className="text-slate-500 mt-2 max-w-sm mx-auto">We are integrating advanced Data Visualization to help you track ROI, market growth, and lead conversion rates in real-time.</p>
            </div>
          </div>
        </motion.div>

        {[
          { title: 'Top Performing Regions', icon: '📍', color: 'bg-blue-50 text-blue-600' },
          { title: 'Market Price Trends', icon: '📈', color: 'bg-indigo-50 text-indigo-600' },
          { title: 'Investor Demographics', icon: '👤', color: 'bg-emerald-50 text-emerald-600' }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (i + 1) }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40"
          >
            <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm`}>
              {item.icon}
            </div>
            <h4 className="text-xl font-black text-slate-900">{item.title}</h4>
            <p className="text-slate-500 mt-2 text-sm font-medium">Detailed breakdown of market movements and buyer behavior in this sector.</p>
            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-xs font-black uppercase text-blue-600 tracking-widest">
              <span>View Details</span>
              <span>↗</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
