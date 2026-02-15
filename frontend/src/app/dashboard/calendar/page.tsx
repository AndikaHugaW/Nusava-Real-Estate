'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  User, 
  Phone,
  Calendar as CalendarIcon,
  Search,
  Plus,
  Video
} from 'lucide-react';

export default function CalendarPage() {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('nusava_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/bookings/received`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    } finally {
      setLoading(false);
    }
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  // Simple calendar logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDayOfMonth }, (_, i) => null);

  const getBookingsForDay = (day: number) => {
    return bookings.filter(b => {
      const d = new Date(b.bookingDate);
      return d.getDate() === day && 
             d.getMonth() === currentDate.getMonth() && 
             d.getFullYear() === currentDate.getFullYear();
    });
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Property <span className="text-blue-600">Schedule</span>
          </h2>
          <p className="text-slate-500 mt-2 font-medium">Manage viewing appointments and virtual tours.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search appointments..." 
              className="bg-white border border-slate-200 pl-11 pr-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <Plus className="w-5 h-5" />
            Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Calendar Grid */}
        <div className="xl:col-span-8 bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <CalendarIcon className="text-blue-600 w-6 h-6" />
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={prevMonth}
                className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="px-5 py-2.5 bg-slate-100 text-slate-900 rounded-lg text-sm font-black uppercase tracking-widest">Today</button>
              <button 
                onClick={nextMonth}
                className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-slate-100 rounded-2xl overflow-hidden border border-slate-100">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="bg-slate-50 py-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                {d}
              </div>
            ))}
            
            {[...padding, ...days].map((day, i) => {
              const dayBookings = day ? getBookingsForDay(day) : [];
              const isToday = day === new Date().getDate() && 
                              currentDate.getMonth() === new Date().getMonth() && 
                              currentDate.getFullYear() === new Date().getFullYear();

              return (
                <div 
                  key={i} 
                  className={`min-h-[120px] bg-white p-3 transition-colors ${day ? 'hover:bg-blue-50/30 cursor-pointer' : ''}`}
                >
                  {day && (
                    <>
                      <div className="flex justify-between items-center mb-2">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black transition-all ${
                          isToday ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-900'
                        }`}>
                          {day}
                        </span>
                        {dayBookings.length > 0 && (
                          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        {dayBookings.slice(0, 2).map((b: any) => (
                          <div 
                            key={b.id} 
                            onClick={(e) => { e.stopPropagation(); setSelectedBooking(b); }}
                            className="px-2 py-1.5 bg-slate-900 rounded-lg group transition-all hover:bg-blue-600 cursor-pointer"
                          >
                            <p className="text-[9px] font-black text-white line-clamp-1 group-hover:scale-95 transition-transform">
                              {b.user.name}
                            </p>
                          </div>
                        ))}
                        {dayBookings.length > 2 && (
                          <p className="text-[8px] font-black text-slate-400 text-center uppercase tracking-widest mt-1">
                            +{dayBookings.length - 2} More
                          </p>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar - Upcoming/Detail */}
        <div className="xl:col-span-4 space-y-8">
          {/* Detail View */}
          <AnimatePresence mode="wait">
            {selectedBooking ? (
              <motion.div 
                key="detail"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl shadow-blue-900/20 h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                   <CalendarIcon className="w-40 h-40 rotate-12" />
                </div>
                
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20"
                >
                  <Plus className="w-4 h-4 rotate-45" />
                </button>

                <div className="relative z-10">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-500/30">
                    Event Details
                  </span>
                  <h3 className="text-3xl font-black mt-6 leading-tight">Property Viewing</h3>
                  <p className="text-slate-400 font-medium mt-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> 
                    {new Date(selectedBooking.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>

                  <div className="mt-10 space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Prospect</p>
                        <p className="text-lg font-black">{selectedBooking.user.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</p>
                        <p className="text-sm font-black line-clamp-2">{selectedBooking.property.title}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-4 bg-blue-600 rounded-2xl font-black text-xs hover:bg-blue-500 transition-all">
                      <Phone className="w-4 h-4" /> Call Client
                    </button>
                    <button className="flex items-center justify-center gap-2 py-4 bg-white/10 rounded-2xl font-black text-xs hover:bg-white/20 transition-all">
                      <Video className="w-4 h-4" /> Virtual Tour
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white p-8 rounded-[3.5rem] border border-slate-100 shadow-sm h-full"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Today's <span className="text-blue-600">Events</span></h3>
                  <span className="w-6 h-6 bg-slate-900 text-white rounded-lg flex items-center justify-center text-[10px] font-black">2</span>
                </div>

                <div className="space-y-4">
                  {bookings.filter(b => {
                    const d = new Date(b.bookingDate);
                    const today = new Date();
                    return d.getUTCDate() === today.getUTCDate() && d.getUTCMonth() === today.getUTCMonth();
                  }).length === 0 ? (
                    <div className="py-20 text-center space-y-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                        <Clock className="w-8 h-8 text-slate-200" />
                      </div>
                      <p className="text-xs font-black text-slate-300 uppercase tracking-[0.2em]">No events today</p>
                    </div>
                  ) : (
                    bookings.map((b: any) => (
                      <div 
                        key={b.id} 
                        onClick={() => setSelectedBooking(b)}
                        className="group p-5 bg-slate-50 rounded-[2rem] border border-transparent hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer"
                      >
                         <div className="flex justify-between items-start mb-4">
                            <span className="px-3 py-1 bg-white text-slate-900 rounded-lg text-[9px] font-black shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                               {new Date(b.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <div className="flex -space-x-2">
                               <div className="w-7 h-7 rounded-lg bg-orange-100 border-2 border-white"></div>
                            </div>
                         </div>
                         <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{b.user.name}</h4>
                         <p className="text-[10px] font-bold text-slate-400 mt-1 line-clamp-1">{b.property.title}</p>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-10 pt-10 border-t border-slate-50 text-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Integrate with</p>
                  <div className="flex justify-center gap-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" className="w-6 h-6 grayscale hover:grayscale-0 cursor-pointer transition-all" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg" className="w-6 h-6 grayscale hover:grayscale-0 cursor-pointer transition-all" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
