'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('nusava_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/inquiries/received`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setInquiries(data);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText || !selectedInquiry) return;

    setSending(true);
    try {
      const token = localStorage.getItem('nusava_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/inquiries/${selectedInquiry.id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ response: replyText }),
      });

      if (res.ok) {
        setReplyText('');
        setSelectedInquiry(null);
        fetchInquiries();
        alert('Reply sent successfully!');
      } else {
        alert('Failed to send reply');
      }
    } catch (err) {
      console.error('Reply failed', err);
      alert('Error connecting to server');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Leads & <span className="text-blue-600">Inquiries</span></h2>
        <p className="text-slate-500 mt-2 font-medium">Respond to potential investors and buyers interested in your properties.</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-white rounded-3xl animate-pulse border border-slate-100" />
          ))}
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white p-20 rounded-[3rem] border border-slate-100 text-center shadow-xl shadow-slate-200/40">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl">📩</div>
          <h3 className="text-2xl font-black text-slate-900">No Inquiries Yet</h3>
          <p className="text-slate-500 mt-2">When users ask about your properties, they will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {inquiries.map((inquiry) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={inquiry.id}
              className={`bg-white p-8 rounded-[2.5rem] border ${inquiry.status === 'PENDING' ? 'border-blue-100 shadow-blue-100/50' : 'border-slate-100'} shadow-xl transition-all hover:translate-x-1`}
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black">
                      {inquiry.user.name[0]}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900">{inquiry.user.name}</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{inquiry.user.email} • {inquiry.user.phone || 'No Phone'}</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-6 rounded-2xl relative">
                    <div className="absolute -top-2 left-6 px-3 py-1 bg-white border border-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase">Message</div>
                    <p className="text-slate-600 font-medium leading-relaxed italic">"{inquiry.message}"</p>
                  </div>

                  {inquiry.agentResponse && (
                    <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 relative ml-8">
                       <div className="absolute -top-2 left-6 px-3 py-1 bg-blue-600 rounded-full text-[10px] font-black text-white uppercase shadow-lg shadow-blue-200">Your Response</div>
                       <p className="text-blue-900 font-semibold">{inquiry.agentResponse}</p>
                       <p className="text-[10px] text-blue-400 font-bold mt-2 uppercase tracking-tighter">Responded on {new Date(inquiry.respondedAt).toLocaleDateString()} at {new Date(inquiry.respondedAt).toLocaleTimeString()}</p>
                    </div>
                  )}
                </div>

                <div className="md:w-64 space-y-4">
                  <div className="bg-slate-900 p-6 rounded-3xl text-white">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Property</p>
                    <p className="font-bold text-sm line-clamp-2">{inquiry.property.title}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className={`px-4 py-2 rounded-full text-center text-[10px] font-black uppercase tracking-widest ${
                      inquiry.status === 'PENDING' ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' : 'bg-emerald-500 text-white shadow-lg shadow-emerald-200'
                    }`}>
                      {inquiry.status}
                    </span>
                    
                    {!inquiry.agentResponse && (
                      <button 
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
                      >
                        REPLY NOW
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Reply Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-10 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Reply to <span className="text-blue-600">{selectedInquiry.user.name}</span></h3>
                    <p className="text-slate-500 mt-1 font-medium">Re: {selectedInquiry.property.title}</p>
                  </div>
                  <button onClick={() => setSelectedInquiry(null)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-500 text-sm">
                  "{selectedInquiry.message}"
                </div>

                <form onSubmit={handleReply} className="space-y-6">
                  <textarea 
                    required
                    rows={6}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your professional response here..."
                    className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium resize-none"
                  />
                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setSelectedInquiry(null)}
                      className="flex-1 py-5 border border-slate-200 rounded-2xl font-black text-slate-400 hover:bg-slate-50 transition-colors"
                    >
                      CANCEL
                    </button>
                    <button 
                      type="submit"
                      disabled={sending}
                      className="flex-[2] py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all disabled:bg-slate-300"
                    >
                      {sending ? 'SENDING...' : 'SEND MESSAGE'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
