'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search, 
  Filter, 
  Download,
  CreditCard,
  Building2,
  TrendingUp,
  Receipt
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function TransactionsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for now as backend endpoint might not be ready
  const [transactions] = useState([
    { id: 'TRX-9821', property: 'Puri Gading Villa', client: 'John Doe', amount: 450000000, date: '2024-02-15', status: 'COMPLETED', type: 'COMMISSION' },
    { id: 'TRX-9820', property: 'Luxe Serpong Apartment', client: 'Ahmad Faisal', amount: 1500000, date: '2024-02-14', status: 'COMPLETED', type: 'FEATURED_LISTING' },
    { id: 'TRX-9819', property: 'Emerald Residence', client: 'Sari Wijaya', amount: 85000000, date: '2024-02-12', status: 'PENDING', type: 'COMMISSION' },
    { id: 'TRX-9818', property: 'Standard Subscription', client: 'Self', amount: 2500000, date: '2024-02-10', status: 'COMPLETED', type: 'SUBSCRIPTION' },
    { id: 'TRX-9817', property: 'The Elements Jakarta', client: 'Kevin Sanjaya', amount: 125000000, date: '2024-02-08', status: 'FAILED', type: 'COMMISSION' },
    { id: 'TRX-9816', property: 'Bali Beachfront Villa', client: 'Maria Ozawa', amount: 500000000, date: '2024-02-05', status: 'COMPLETED', type: 'PROPERTY_PURCHASE' },
  ]);

  useEffect(() => {
    // Simulate API Load
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Financial <span className="text-blue-600">Ledger</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Track your earnings, commissions, and platform expenses.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-5 h-5" />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <Receipt className="w-5 h-5" />
            Invoicing
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        variants={stagger}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {[
          { label: 'Total Revenue', value: 'Rp 1.2B', icon: TrendingUp, color: 'blue', growth: '+12.5%' },
          { label: 'Commissions', value: 'Rp 850M', icon: ArrowUpRight, color: 'emerald', growth: '+8.2%' },
          { label: 'Ad Spend', value: 'Rp 12.5M', icon: ArrowDownLeft, color: 'rose', growth: '-2.4%' },
          { label: 'Wallet Balance', value: 'Rp 45.8M', icon: CreditCard, color: 'amber', growth: 'Safe' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            variants={fadeInUp}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 bg-${stat.color}-50 rounded-2xl flex items-center justify-center text-${stat.color}-600 group-hover:bg-${stat.color}-600 group-hover:text-white transition-all duration-500 shadow-sm`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg ${
                stat.growth.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 
                stat.growth.startsWith('-') ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-500'
              }`}>
                {stat.growth}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h4 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h4>
          </motion.div>
        ))}
      </motion.div>

      {/* Transactions Table Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden"
      >
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by property, client or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 pl-14 pr-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">
              <Filter className="w-5 h-5" />
            </button>
            <select className="bg-slate-50 border-none px-6 py-4 rounded-2xl font-bold text-slate-600 outline-none">
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Transaction Info</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.filter(t => 
                t.property.toLowerCase().includes(searchTerm.toLowerCase()) || 
                t.client.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((trx, i) => (
                <tr key={trx.id} className="group hover:bg-slate-50/50 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm group-hover:scale-110 transition-transform">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 leading-tight">{trx.property}</p>
                        <p className="text-[11px] font-bold text-slate-400 mt-1 flex items-center gap-1.5 uppercase">
                          <span className="text-blue-500">ID: {trx.id}</span>
                          <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                          <span>{trx.client}</span>
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[11px] font-black text-slate-600 px-3 py-1.5 bg-slate-100 rounded-full uppercase tracking-tighter">
                      {trx.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-500">
                    {new Date(trx.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm font-black text-slate-900">Rp {trx.amount.toLocaleString('id-ID')}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      trx.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      trx.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                      'bg-rose-50 text-rose-600 border border-rose-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        trx.status === 'COMPLETED' ? 'bg-emerald-600' :
                        trx.status === 'PENDING' ? 'bg-amber-600' : 'bg-rose-600'
                      }`}></span>
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {loading && (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-bold text-slate-400 animate-pulse uppercase tracking-[0.2em]">Synchronizing Records...</p>
            </div>
          )}
        </div>
        
        <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing {transactions.length} entries</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 shadow-sm disabled:opacity-50">Prev</button>
            <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black shadow-lg">1</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 shadow-sm">Next</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
