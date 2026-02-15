'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function ContactPage() {
  const { user } = useAuth();
  const [method, setMethod] = useState<'EMAIL' | 'WHATSAPP'>('EMAIL');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to send a message');
      return;
    }

    setLoading(true);

    try {
      // 1. Save to Admin Dashboard (via Inquiries API)
      const token = localStorage.getItem('nusava_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: `[Contact via ${method}] ${formData.message}\n\nClient Phone: ${formData.phone}`
        })
      });

      if (!res.ok) throw new Error('Failed to save inquiry');

      // 2. Open External App (Mail or WhatsApp)
      if (method === 'WHATSAPP') {
        const waNumber = "6281234567890"; // Ganti dengan nomor Admin/Agent real
        const text = encodeURIComponent(`Halo Nusava! Nama saya ${formData.name}.\n\n${formData.message}\n\nKontak saya:\nEmail: ${formData.email}\nPhone: ${formData.phone}`);
        window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
      } else {
        const mailTo = "support@nusava.com"; // Ganti dengan email Admin real
        const subject = encodeURIComponent(`Inquiry from ${formData.name}`);
        const body = encodeURIComponent(`${formData.message}\n\n---\nClient Details:\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}`);
        window.location.href = `mailto:${mailTo}?subject=${subject}&body=${body}`;
      }

      toast.success('Message sent successfully!');
      setFormData(prev => ({ ...prev, message: '' }));
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left Side: Contact Info */}
          <motion.div 
            className="lg:col-span-5 space-y-12"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
          >
            <div>
              <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-100">
                Contact Discovery
              </span>
              <h1 className="text-6xl font-black text-slate-900 mt-8 leading-[1.1] tracking-tighter">
                Let's Start a <span className="text-blue-600">Conversation.</span>
              </h1>
              <p className="text-xl text-slate-500 mt-6 leading-relaxed font-medium">
                Whether you're looking to invest, sell, or just want to learn more about the Indonesian market, our team is here to help.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email Us', value: 'hello@nusava.com', sub: 'Receive response in 24h' },
                { icon: Phone, label: 'Call Support', value: '+62 21 555 0123', sub: 'Mon - Fri, 9am - 6pm' },
                { icon: MapPin, label: 'Visit Office', value: 'Sudirman Central Business District', sub: 'Jakarta, Indonesia' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all group">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{item.label}</h4>
                    <p className="text-lg font-black text-slate-900 leading-none">{item.value}</p>
                    <p className="text-xs font-medium text-slate-400 mt-2">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-12 lg:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 pointer-events-none">
                 <Send className="w-64 h-64" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">Send Message</h3>
                  
                  {/* Method Toggle */}
                  <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/50">
                    <button 
                      onClick={() => setMethod('EMAIL')}
                      className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${method === 'EMAIL' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <Mail className="w-3.5 h-3.5" /> EMAIL
                    </button>
                    <button 
                      onClick={() => setMethod('WHATSAPP')}
                      className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${method === 'WHATSAPP' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WHATSAPP
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Alexander Pierce"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="alexander@mail.com"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone / WhatsApp Number</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+62 812 3456 7890"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium resize-none"
                    />
                  </div>

                  <div className="md:col-span-2 pt-4">
                    <button 
                      type="submit"
                      disabled={loading}
                      className={`w-full py-5 rounded-3xl font-black text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
                        method === 'EMAIL' 
                          ? 'bg-slate-900 text-white hover:bg-blue-600 shadow-2xl shadow-slate-900/20' 
                          : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-2xl shadow-emerald-500/20'
                      }`}
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                           {method === 'EMAIL' ? 'Send via Email' : 'Open WhatsApp'}
                           <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    
                    <div className="mt-8 flex items-center justify-center gap-4 py-4 px-6 bg-slate-50 rounded-2xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <p className="text-[11px] font-bold text-slate-500">Your information is encrypted and safe with Nusava privacy policy.</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
