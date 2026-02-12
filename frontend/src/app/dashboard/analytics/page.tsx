'use client';

import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Analytics <span className="text-blue-600">Intelligence</span></h2>
        <p className="text-slate-500 mt-2 font-medium">Deep dive into your property performance and visitor demographics.</p>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 min-h-[450px] flex flex-col items-center justify-center text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
        
        <div className="w-24 h-24 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 rotate-12 group-hover:rotate-0 transition-transform shadow-lg shadow-blue-100">
          <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-black text-slate-900">Advanced Analytics Coming Soon</h3>
        <p className="text-slate-500 max-w-sm mt-4 leading-relaxed font-medium">
          We are currently aggregating your property views, lead conversions, and geographic data. Real-time intelligence will be available shortly.
        </p>
        
        <div className="mt-10 flex gap-4">
          <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all hover:shadow-xl shadow-blue-200">
            Get Notification
          </button>
          <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all">
            Beta Access
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40"
        >
          <h4 className="font-bold text-xl text-slate-900 mb-8 border-l-4 border-blue-600 pl-4">Traffic Sources</h4>
          <div className="space-y-6">
            {[
              { source: 'Direct Access', value: 45, color: 'bg-blue-600' },
              { source: 'Social Media', value: 30, color: 'bg-indigo-600' },
              { source: 'Organic Search', value: 25, color: 'bg-purple-600' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2 px-1">
                  <span className="font-bold text-slate-700">{item.source}</span>
                  <span className="text-slate-400 font-black">{item.value}%</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    className={`h-full ${item.color}`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40"
        >
          <h4 className="font-bold text-xl text-slate-900 mb-8 border-l-4 border-emerald-500 pl-4">Device Usage</h4>
          <div className="space-y-6">
             <p className="text-slate-500 font-medium italic bg-slate-50 p-6 rounded-2xl border-l-4 border-slate-200">
               "Most of your users are browsing from <span className="text-slate-900 font-bold">Jakarta</span> and <span className="text-slate-900 font-bold">Bali</span> using Premium Mobile devices."
             </p>
             <div className="flex gap-4 mt-8">
               <div className="flex-1 p-6 bg-slate-50 rounded-[2rem] text-center border border-slate-100">
                 <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-2">Mobile</p>
                 <p className="text-4xl font-black text-slate-900">72%</p>
                 <div className="mt-4 w-full h-1 bg-blue-100 rounded-full overflow-hidden">
                    <div className="w-[72%] h-full bg-blue-600" />
                 </div>
               </div>
               <div className="flex-1 p-6 bg-slate-50 rounded-[2rem] text-center border border-slate-100">
                 <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-2">Desktop</p>
                 <p className="text-4xl font-black text-slate-900">28%</p>
                 <div className="mt-4 w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="w-[28%] h-full bg-slate-400" />
                 </div>
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
