'use client';

import { useState } from 'react';

export default function InquiryForm({ propertyId, agentName }: { propertyId: string; agentName: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // In a real app, you'd send the auth token here.
          // For now, since auth is tricky in this demo, let's assume the user is logged in or we handle it in the backend.
        },
        body: JSON.stringify({
          propertyId,
          message: `Inquiry from ${formData.name} (${formData.email}): ${formData.message}`
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-slate-200 sticky top-24">
      <div className="mb-10">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Interested?</h3>
        <p className="text-slate-500 text-sm">Send an inquiry to our expert agent.</p>
      </div>
      
      <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 mb-10">
        <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-xl">
          {agentName[0]}
        </div>
        <div>
          <p className="text-slate-900 font-bold">{agentName}</p>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Property Specialist</p>
        </div>
      </div>

      {status === 'success' ? (
        <div className="bg-green-50 text-green-700 p-6 rounded-2xl border border-green-100 mb-4 text-sm font-medium leading-relaxed">
          <div className="flex items-center gap-2 mb-2 font-bold text-green-800">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Inquiry Sent
          </div>
          Your request has been received. Our agent will contact you shortly.
          <button 
            onClick={() => setStatus('idle')}
            className="block mt-4 text-blue-600 font-bold hover:underline"
          >
            Send another inquiry
          </button>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
            <input 
              type="text" 
              required
              placeholder="Your Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:bg-white bg-slate-50 outline-none transition-all text-sm font-semibold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="name@example.com" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:bg-white bg-slate-50 outline-none transition-all text-sm font-semibold"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
            <textarea 
              placeholder="I'm interested in this property..." 
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:bg-white bg-slate-50 outline-none transition-all text-sm font-semibold resize-none"
            ></textarea>
          </div>
          
          {status === 'error' && (
            <p className="text-red-500 text-xs font-bold">Failed to send inquiry. Please try again.</p>
          )}

          <button 
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-5 rounded-full transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {status === 'sending' ? 'Processing...' : 'Send Inquiry'}
          </button>
        </form>
      )}
    </div>
  );
}
