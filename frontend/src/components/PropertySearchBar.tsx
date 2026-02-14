'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

const locations = ['All Locations', 'Bali', 'Jakarta Selatan', 'Jakarta Barat', 'Bandung', 'Badung', 'Gianyar'];
const statuses = ['All', 'Buy', 'Rent'];
const propertyTypes = ['All', 'House', 'Apartment', 'Villa', 'Duplex', 'Townhouse', 'Studio', 'Commercial'];

export default function PropertySearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('city') || 'All Locations');
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'All');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'All');
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedLocation !== 'All Locations') params.set('city', selectedLocation);
    else params.delete('city');
    
    if (selectedStatus !== 'All') params.set('status', selectedStatus);
    else params.delete('status');
    
    if (selectedType !== 'All') params.set('type', selectedType);
    else params.delete('type');

    router.push(`/property?${params.toString()}`);
  };

  return (
    <div className="relative z-30 -mt-10 sm:-mt-14 max-w-screen-2xl mx-auto px-6 lg:px-16" ref={dropdownRef}>
      <div className="bg-white rounded-[4rem] p-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row items-center gap-2 border border-slate-100">
        
        {/* Location Dropdown */}
        <div 
          className="flex-[1.5] w-full relative group"
          onClick={() => setActiveDropdown(activeDropdown === 'location' ? null : 'location')}
        >
          <div className={`flex items-center gap-4 px-8 py-5 border-b lg:border-b-0 lg:border-r border-slate-100 group hover:bg-slate-50 transition-all duration-500 rounded-[3.5rem] cursor-pointer ${activeDropdown === 'location' ? 'bg-slate-50' : ''}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${activeDropdown === 'location' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 group-hover:bg-slate-900 group-hover:text-white'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-0.5">Location</p>
              <p className="text-slate-900 font-bold text-lg">{selectedLocation}</p>
            </div>
            <motion.svg 
              animate={{ rotate: activeDropdown === 'location' ? 180 : 0 }}
              className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>

          <AnimatePresence>
            {activeDropdown === 'location' && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-4 z-50 overflow-hidden"
              >
                {locations.map((loc) => (
                  <div 
                    key={loc}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLocation(loc);
                      setActiveDropdown(null);
                    }}
                    className={`px-6 py-4 rounded-[1.5rem] cursor-pointer transition-all duration-300 ${selectedLocation === loc ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-600'}`}
                  >
                    <p className="font-bold">{loc}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status Dropdown */}
        <div 
          className="flex-1 w-full relative group"
          onClick={() => setActiveDropdown(activeDropdown === 'status' ? null : 'status')}
        >
          <div className={`flex items-center gap-4 px-8 py-5 border-b lg:border-b-0 lg:border-r border-slate-100 group hover:bg-slate-50 transition-all duration-500 rounded-[3.5rem] cursor-pointer ${activeDropdown === 'status' ? 'bg-slate-50' : ''}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${activeDropdown === 'status' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 group-hover:bg-slate-900 group-hover:text-white'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-0.5">Status</p>
              <p className="text-slate-900 font-bold text-lg">{selectedStatus}</p>
            </div>
            <motion.svg 
              animate={{ rotate: activeDropdown === 'status' ? 180 : 0 }}
              className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>

          <AnimatePresence>
            {activeDropdown === 'status' && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-4 z-50 overflow-hidden"
              >
                {statuses.map((stat) => (
                  <div 
                    key={stat}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStatus(stat);
                      setActiveDropdown(null);
                    }}
                    className={`px-6 py-4 rounded-[1.5rem] cursor-pointer transition-all duration-300 ${selectedStatus === stat ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-600'}`}
                  >
                    <p className="font-bold">{stat}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Property Type Dropdown */}
        <div 
          className="flex-1 w-full relative group"
          onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
        >
          <div className={`flex items-center gap-4 px-8 py-5 border-b lg:border-b-0 lg:border-r border-slate-100 last:border-0 group hover:bg-slate-50 transition-all duration-500 rounded-[3.5rem] cursor-pointer ${activeDropdown === 'type' ? 'bg-slate-50' : ''}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${activeDropdown === 'type' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 group-hover:bg-slate-900 group-hover:text-white'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001-1m-6 0h6" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-0.5">Type</p>
              <p className="text-slate-900 font-bold text-lg">{selectedType}</p>
            </div>
            <motion.svg 
              animate={{ rotate: activeDropdown === 'type' ? 180 : 0 }}
              className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>

          <AnimatePresence>
            {activeDropdown === 'type' && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-4 z-50 overflow-hidden"
              >
                {propertyTypes.map((t) => (
                  <div 
                    key={t}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedType(t);
                      setActiveDropdown(null);
                    }}
                    className={`px-6 py-4 rounded-[1.5rem] cursor-pointer transition-all duration-300 ${selectedType === t ? 'bg-slate-900 text-white' : 'hover:bg-slate-50 text-slate-600'}`}
                  >
                    <p className="font-bold">{t}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search Button */}
        <div className="p-2 w-full lg:w-auto">
          <button 
            onClick={handleSearch}
            className="w-full lg:w-auto bg-black text-white px-12 py-6 rounded-[3rem] font-bold hover:bg-slate-800 transition-all shadow-xl shadow-black/10 text-xl whitespace-nowrap active:scale-95"
          >
            Find Property
          </button>
        </div>
      </div>
    </div>
  );
}
