'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import RevealText from '@/components/RevealText';
import Link from 'next/link';

export default function MyInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await api.get('/inquiries/my');
      setInquiries(response.data);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors: any = {
    'PENDING': 'bg-amber-50 text-amber-600 border-amber-100',
    'RESPONDED': 'bg-green-50 text-green-600 border-green-100',
    'CLOSED': 'bg-slate-100 text-slate-500 border-slate-200'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[40vh] md:min-h-[60vh] flex items-center bg-slate-900 overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1574006637400-df7170f26a0b?w=1920&q=80" 
            className="w-full h-full object-cover" 
            alt="Support background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 lg:px-16 py-12 md:py-24 pb-32 md:pb-48">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-blue-400 text-xs md:text-sm tracking-[0.3em] mb-4 md:mb-8 uppercase font-bold">
              Communication Center
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight">
              <RevealText className="text-white">My Inquiries</RevealText>
            </h1>
            <p className="text-white/60 text-base md:text-xl mt-4 md:mt-6 max-w-2xl font-light leading-relaxed">
              Track your conversations with agents and manage your property requests.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTENT SECTION ===== */}
      <section className="pb-24 -mt-16 md:-mt-24 relative z-20 px-6 lg:px-16">
        <div className="max-w-screen-2xl mx-auto">
          {inquiries.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              {inquiries.map((inquiry: any, idx: number) => (
                <motion.div
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden transition-all hover:border-blue-600 group"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/50">
                      <div className="flex items-center gap-3 mb-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusColors[inquiry.status] || 'bg-slate-50'}`}>
                          {inquiry.status}
                        </span>
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                          ID: {inquiry.id.split('-')[0]}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">
                        {inquiry.property?.title || 'General Inquiry'}
                      </h3>
                      <p className="text-slate-500 text-sm font-medium mb-6">
                        Sent on {new Date(inquiry.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                      
                      {inquiry.property && (
                        <Link 
                          href={`/property/${inquiry.property.id}`}
                          className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline"
                        >
                          View Property
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      )}
                    </div>
                    
                    <div className="lg:w-2/3 p-8 md:p-10 flex flex-col gap-8">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Your Message</p>
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 text-sm leading-relaxed italic">
                          "{inquiry.message}"
                        </div>
                      </div>
                      
                      {inquiry.agentResponse ? (
                        <div>
                          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4">Agent Response</p>
                          <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 text-slate-900 text-sm leading-relaxed">
                            {inquiry.agentResponse}
                            <div className="mt-4 pt-4 border-t border-blue-100 flex items-center justify-between">
                               <p className="text-[10px] font-bold text-slate-400">Responded on {new Date(inquiry.respondedAt).toLocaleDateString('en-GB')}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400">
                          <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <p className="text-xs font-bold uppercase tracking-widest italic">Waiting for agent response...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-16 md:p-32 text-center border border-slate-200">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
                <svg className="w-12 h-12 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">No inquiries yet</h3>
              <p className="text-slate-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                Start a conversation with our agents by inquiring about a property you're interested in.
              </p>
              <Link href="/property" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white font-bold rounded-full hover:bg-blue-600 transition-all">
                Browse Properties
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
