'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';

const categories = [
  { label: 'All', value: 'All' },
  { label: 'Houses', value: 'HOUSE' },
  { label: 'Villas', value: 'VILLA' },
  { label: 'Apartments', value: 'APARTMENT' },
  { label: 'Duplex Homes', value: 'DUPLEX' },
  { label: 'Townhouses', value: 'TOWNHOUSE' },
  { label: 'Studios', value: 'STUDIO' },
  { label: 'Commercial', value: 'COMMERCIAL' },
  { label: 'Land', value: 'LAND' },
];

export default function PropertyCategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const currentType = searchParams.get('type') || 'All';
  const currentStatus = searchParams.get('status') || '';
  const currentSearch = searchParams.get('search') || '';
  const currentCity = searchParams.get('city') || '';

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      el?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = 250;
    el.scrollBy({ 
      left: direction === 'left' ? -scrollAmount : scrollAmount, 
      behavior: 'smooth' 
    });
  };

  const handleCategoryClick = (value: string) => {
    const params = new URLSearchParams();
    if (value !== 'All') params.set('type', value);
    if (currentStatus && currentStatus !== 'All') params.set('status', currentStatus);
    if (currentSearch) params.set('search', currentSearch);
    if (currentCity) params.set('city', currentCity);
    
    const queryString = params.toString();
    router.push(`/property${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <div className="flex items-center gap-4 mb-16 relative">
      {/* Left Arrow */}
      <button 
        onClick={() => scroll('left')}
        className={`hidden sm:flex w-12 h-12 rounded-full border items-center justify-center flex-shrink-0 transition-all duration-300 ${
          canScrollLeft 
            ? 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white cursor-pointer' 
            : 'border-slate-100 text-slate-200 cursor-default'
        }`}
        disabled={!canScrollLeft}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Categories */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-3 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth"
      >
        {categories.map((cat) => {
          const isActive = currentType === cat.value || (cat.value === 'All' && !searchParams.get('type'));
          return (
            <button
              key={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              className={`px-8 py-4 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-lg shadow-black/10 scale-105'
                  : 'bg-slate-50 text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Right Arrow */}
      <button 
        onClick={() => scroll('right')}
        className={`hidden sm:flex w-12 h-12 rounded-full border items-center justify-center flex-shrink-0 transition-all duration-300 ${
          canScrollRight 
            ? 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white cursor-pointer' 
            : 'border-slate-100 text-slate-200 cursor-default'
        }`}
        disabled={!canScrollRight}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
