'use client';

import { motion } from 'framer-motion';

export default function DashboardPage() {
  const stats = [
    { label: 'Total Properties', value: '12', trend: '+2', trendUp: true, icon: '🏠', color: 'bg-blue-600' },
    { label: 'Total Views', value: '1,284', trend: '+12%', trendUp: true, icon: '👁️', color: 'bg-indigo-600' },
    { label: 'Active Inquiries', value: '48', trend: '+5', trendUp: true, icon: '📩', color: 'bg-emerald-600' },
    { label: 'Avg. ROI', value: '8.4%', trend: '-0.2%', trendUp: false, icon: '📈', color: 'bg-orange-600' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <section className="flex flex-col md:row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Dashboard <span className="text-blue-600">Overview</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Monitoring your premium listings and investor leads.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Download Report
          </button>
          <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg">
            Manage Leads
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            variants={item}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-[0.03] rounded-bl-full transition-all group-hover:scale-110`} />
            <div className={`w-12 h-12 ${stat.color} text-white rounded-2xl flex items-center justify-center text-xl mb-6 shadow-lg shadow-blue-200/50`}>
              {stat.icon}
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-end gap-3 mt-1">
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              <span className={`text-xs font-bold mb-1.5 ${stat.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Analytics Main Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Performance Chart Placeholder */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40"
        >
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold text-slate-900">Performance Trends</h3>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button className="px-4 py-1.5 bg-white shadow-sm rounded-lg text-xs font-bold text-blue-600">Views</button>
              <button className="px-4 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900">Leads</button>
            </div>
          </div>
          
          <div className="h-64 flex items-end gap-2 px-4">
            {[40, 70, 45, 90, 65, 80, 55, 75, 60, 85, 45, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                  className={`w-full max-w-[12px] rounded-full transition-all group-hover:bg-blue-600 ${i === 11 ? 'bg-blue-600' : 'bg-slate-200'}`}
                />
                <span className="text-[10px] text-slate-300 font-bold">{i+1}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Center */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 blur-3xl rounded-full" />
          <h3 className="text-xl font-bold relative mb-2">Lead Snapshot</h3>
          <p className="text-slate-400 text-sm mb-8 relative">Recent inquiries needing response.</p>
          
          <div className="space-y-4 relative">
            {[
              { name: 'John Wick', type: 'Villa', time: '12m ago' },
              { name: 'Bruce Wayne', type: 'Apartment', time: '2h ago' },
              { name: 'Tony Stark', type: 'Villa', time: '5h ago' }
            ].map((lead, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-xs font-black">
                    {lead.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{lead.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{lead.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 font-bold">{lead.time}</p>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full ml-auto mt-1" />
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-8 py-4 bg-blue-600 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/30">
            View All Inquiries
          </button>
        </motion.div>
      </div>

      {/* Property Table Placeholder */}
      <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-slate-900">Listings Performance</h3>
          <button className="text-sm font-bold text-blue-600 hover:underline">Full Inventory</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-50">
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Property</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Type</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">Views</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">ROI</th>
                <th className="pb-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: 'Nusava Luxury Villa', type: 'Villa', views: '428', roi: '12%', status: 'Active' },
                { name: 'CBD Sky Apartment', type: 'Apartment', views: '291', roi: '7.5%', status: 'Active' },
                { name: 'Green Garden House', type: 'House', views: '115', roi: '6.4%', status: 'Sold' }
              ].map((prop, i) => (
                <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg" />
                      <p className="text-sm font-bold text-slate-700">{prop.name}</p>
                    </div>
                  </td>
                  <td className="py-5 text-sm text-slate-500 font-medium">{prop.type}</td>
                  <td className="py-5 text-sm text-slate-900 font-black text-center">{prop.views}</td>
                  <td className="py-5 text-sm text-blue-600 font-bold text-center">{prop.roi}</td>
                  <td className="py-5 text-right">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      prop.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {prop.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
