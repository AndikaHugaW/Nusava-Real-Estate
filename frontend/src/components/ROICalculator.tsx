'use client';

import { useState, useEffect } from 'react';

export default function ROICalculator({ price }: { price: number }) {
  const [monthlyRent, setMonthlyRent] = useState(Math.round(price * 0.006)); // Default 0.6% monthly yield
  const [expenses, setExpenses] = useState(10); // Default 10% operating expenses
  const [roi, setRoi] = useState(0);

  useEffect(() => {
    const annualRent = monthlyRent * 12;
    const netAnnualIncome = annualRent * (1 - expenses / 100);
    const calculatedRoi = (netAnnualIncome / price) * 100;
    setRoi(parseFloat(calculatedRoi.toFixed(2)));
  }, [monthlyRent, expenses, price]);

  return (
    <div className="bg-slate-900 text-white rounded-[3rem] p-8 md:p-10 shadow-2xl mt-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          ROI Calculator
        </h3>

        <div className="space-y-8">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expected Monthly Rent</label>
              <span className="text-sm font-bold text-orange-400">Rp {monthlyRent.toLocaleString('id-ID')}</span>
            </div>
            <input 
              type="range" 
              min={price * 0.001} 
              max={price * 0.02} 
              step={100000}
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Operating Expenses (%)</label>
              <span className="text-sm font-bold text-orange-400">{expenses}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="50" 
              step="1"
              value={expenses}
              onChange={(e) => setExpenses(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Annual ROI</p>
              <p className="text-5xl font-bold text-white tracking-tighter">{roi}%</p>
            </div>
            <div className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest ${roi > 8 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              {roi > 8 ? 'High Yield' : 'Moderate Yield'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
