'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const properties = [
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      title: 'Rosewood Manor',
      location: 'Miami, Florida, celinam delware 2098',
      price: '$2,500',
      beds: 3,
      baths: 2,
      area: '6x8 m',
    },
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      title: 'Rosewood Manor',
      location: 'Miami, Florida, celinam delware 2098',
      price: '$2,500',
      beds: 3,
      baths: 2,
      area: '6x8 m',
    },
    {
      image: 'https://images.unsplash.com/photo-1600047533589-322197623910?w=800&q=80',
      title: 'Rosewood Manor',
      location: 'Miami, Florida, celinam delware 2098',
      price: '$2,500',
      beds: 3,
      baths: 2,
      area: '6x8 m',
    },
    {
      image: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=800&q=80',
      title: 'Rosewood Manor',
      location: 'Miami, Florida, celinam delware 2098',
      price: '$2,500',
      beds: 3,
      baths: 2,
      area: '6×8 m',
    },
    {
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
      title: 'Rosewood Manor',
      location: 'Miami, Florida, celinam delware 2098',
      price: '$2,500',
      beds: 3,
      baths: 2,
      area: '6×8 m',
    },
    {
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80',
      title: 'Rosewood Manor',
      location: 'Miami, Florida, celinam delware 2098',
      price: '$2,500',
      beds: 3,
      baths: 2,
      area: '6×8 m',
    },
  ];
  const testimonials = [
    {
      name: 'Mst. Jeery',
      role: 'Product Designer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
      quote: '"I appreciated how responsive and detail oriented the agents were. They made what could have been a stressful process feel completely - manageable & even exciting, guilding me with clear communication, timely updates, and genuine care from start to finish."',
    },
    {
      name: 'Sarah Anderson',
      role: 'Business Owner',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
      quote: '"Finding my dream office space was so easy with Nusava. Their team really listened to my needs and found a location that perfectly fits my brand. The process was transparent and much faster than I expected!"',
    },
    {
      name: 'David Chen',
      role: 'Investor',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      quote: '"As an investor, I look for professionalism and data-backed advice. The Nusava team provided exactly that. They helped me secure three high-yield properties in record time. Highly recommended for serious buyers."',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const agents = [
    {
      name: 'Wade Warren',
      role: 'Property Manager',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    },
    {
      name: 'Robert Fox',
      role: 'Property Manager',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
    },
    {
      name: 'Leslie Alexander',
      role: 'Property Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
    },
    {
      name: 'Jane Cooper',
      role: 'Property Manager',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    },
  ];

  const blogs = [
    {
      title: 'How to Stage Your Home to Sell Faster in Any Market',
      category: 'Property',
      date: '10 Jun 2025',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      desc: 'Break down the location advantages, expected value appreciation, rental potential, and neighborhood development.',
    },
    {
      title: 'How to Stage Your Home to Sell Faster in Any Market',
      category: 'Property',
      date: '10 Jun 2025',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    },
    {
      title: 'How to Stage Your Home to Sell Faster in Any Market',
      category: 'Property',
      date: '10 Jun 2025',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=800&q=80',
    },
    {
      title: 'How to Stage Your Home to Sell Faster in Any Market',
      category: 'Property',
      date: '10 Jun 2025',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c6a188?w=800&q=80',
    },
  ];
  const faqs = [
    {
      q: 'What services does Real Nest provide for buyers and sellers?',
      a: 'Your leading real estate advocate, transforming houses into dreams. Trust us to expertly guide your home. 745.000 apartments & home for sell, rent & mortgage.',
    },
    {
      q: 'How can I search for properties on Real Nest?',
      a: 'Your leading real estate advocate, transforming houses into dreams. Trust us to expertly guide your home. 745.000 apartments & home for sell, rent & mortgage.',
    },
    {
      q: 'Does Real Nest charge any fees for its services?',
      a: 'Your leading real estate advocate, transforming houses into dreams. Trust us to expertly guide your home. 745.000 apartments & home for sell, rent & mortgage.',
    },
    {
      q: 'What services does Real Nest provide for buyers and sellers?',
      a: 'Your leading real estate advocate, transforming houses into dreams. Trust us to expertly guide your home. 745.000 apartments & home for sell, rent & mortgage.',
    },
    {
      q: 'Do you help with legal papers?',
      a: 'Your leading real estate advocate, transforming houses into dreams. Trust us to expertly guide your home. 745.000 apartments & home for sell, rent & mortgage.',
    },
    {
      q: 'How can i schedule a property visit trough Real Nest?',
      a: 'Your leading real estate advocate, transforming houses into dreams. Trust us to expertly guide your home. 745.000 apartments & home for sell, rent & mortgage.',
    },
    {
      q: 'How do i find a property?',
      a: 'Your leading real estate advocate, transforming houses into dreams. Trust us to expertly guide your home. 745.000 apartments & home for sell, rent & mortgage.',
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(1); // 1 is open by default in image

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };


  const features = [
    { title: 'Wide Selection', desc: 'Access to 5,000+ curated properties across Indonesia.', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { title: 'Trusted Experts', desc: 'Work with certified agents and legal professionals.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { title: 'Market Insights', desc: 'Get real-time data and property value analysis.', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80"
            alt="Luxury modern house"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40" />
        </div>

        {/* Stats Cards - Positioned at top-right, aligned with navbar */}
        <div className="hidden lg:block absolute top-40 left-0 right-0 z-20 pointer-events-none">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="flex justify-end">
              <div className="flex flex-col gap-2 pointer-events-auto">
                {/* Card 1 - Projects Complete */}
                <div className="relative w-44 h-44">
                  <div className="absolute inset-0 bg-white/10 rounded-full border border-white/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-light text-white mb-2">50+</div>
                    <div className="text-sm text-white/70">Project complete</div>
                  </div>
                </div>

                {/* Card 2 - Project Value */}
                <div className="relative w-44 h-44">
                  <div className="absolute inset-0 bg-white/10 rounded-full border border-white/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-light text-white mb-2">$3.5M</div>
                    <div className="text-sm text-white/70">Project value</div>
                  </div>
                </div>

                {/* Card 3 - Expert Teams */}
                <div className="relative w-44 h-44">
                  <div className="absolute inset-0 bg-white/10 rounded-full border border-white/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-light text-white mb-2">100+</div>
                    <div className="text-sm text-white/70">Expert teams</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 py-32 lg:px-16">
          <div className="max-w-3xl">
            {/* Badge */}
            <p className="text-white/70 text-sm tracking-wide mb-8">
              Built to Inspire
            </p>

            {/* Heading - Light font weight like the design */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-8">
              Your real estate
              <br />
              <span className="text-white">Journey starts here</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 mb-12 max-w-xl leading-relaxed font-light">
              Discover properties that match your lifestyle from city condos to suburban homes, we&apos;ve got you covered.
            </p>

            {/* CTA Button - Pill-shaped with integrated circle */}
            <Link 
              href="/property" 
              className="inline-flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow group"
            >
              <span className="pl-8 pr-6 py-4 text-slate-900 font-medium">
                Get Started
              </span>
              <span className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mr-1 group-hover:bg-slate-800 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Badge */}
          <div className="inline-block bg-slate-100 px-6 py-2 rounded-full mb-8">
            <p className="text-slate-700 text-sm font-medium">Who We Are</p>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 max-w-6xl leading-[1.15]">
            We're trusted real estate agency helping people find their dream homes and investments.{' '}
            <span className="text-slate-400">Helping you find home, effortlessly.</span>
          </h2>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            {/* Left Side - Image with Vision & Mission */}
            <div className="grid grid-cols-2 gap-6">
              {/* Hero Image */}
              <div className="col-span-2 relative rounded-3xl overflow-hidden border border-slate-200 aspect-[2/1]">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" 
                  alt="Team meeting" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Our Vision */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 aspect-square flex flex-col justify-end relative">
                <div className="absolute top-8 left-8">
                  <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
                  <p className="text-slate-600 leading-relaxed">
                    To redefine real estate by making property buying and selling smooth, secure, and transparent.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 aspect-square flex flex-col justify-end relative">
                <div className="absolute top-8 left-8">
                  <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">Mission</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Deliver personalized real estate solutions with trust, clarity, and expert market knowledge.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Statistics Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Stat 1 - Projects Complete */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-end aspect-square relative">
                <div className="absolute top-4 right-4">
                  <div className="w-[80px] h-[80px] bg-white border border-slate-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-slate-900 mb-2">1,200+</div>
                  <p className="text-slate-500">Project complete</p>
                </div>
              </div>

              {/* Stat 2 - Happy Clients */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-end aspect-square relative">
                <div className="absolute top-4 right-4">
                  <div className="w-[80px] h-[80px] bg-white border border-slate-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-slate-900 mb-2">250+</div>
                  <p className="text-slate-500">Happy Clients</p>
                </div>
              </div>

              {/* Stat 3 - Project Value */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-end aspect-square relative">
                <div className="absolute top-4 right-4">
                  <div className="w-[80px] h-[80px] bg-white border border-slate-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-slate-900 mb-2">$10M+</div>
                  <p className="text-slate-500">Project Value</p>
                </div>
              </div>

              {/* Stat 4 - Client Retention Rate */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-end aspect-square relative">
                <div className="absolute top-4 right-4">
                  <div className="w-[80px] h-[80px] bg-white border border-slate-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-slate-900 mb-2">90%</div>
                  <p className="text-slate-500">Client Retention Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXPLORE PROPERTIES ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-slate-100 px-6 py-2 rounded-full mb-6">
              <p className="text-slate-700 text-sm font-medium">Property List</p>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Explore all Property
            </h2>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((item, i) => (
              <div key={i} className="group bg-white rounded-[2rem] border border-slate-100 p-4 transition-all hover:shadow-xl hover:shadow-slate-200/50">
                {/* Property Image */}
                <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Property Info */}
                <div className="px-2 pb-2">
                  <div className="text-xl font-bold text-slate-900 mb-1">{item.price}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm mb-6">{item.location}</p>
                  
                  {/* Features Row */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001-1m-6 0h6" />
                      </svg>
                      <span className="text-slate-500 text-sm">{item.beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1zM21 16V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 001-1z" />
                      </svg>
                      <span className="text-slate-500 text-sm">{item.baths} Bathroom</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span className="text-slate-500 text-sm">{item.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Large CTA Button */}
          <div className="mt-16 text-center">
            <Link 
              href="/property" 
              className="inline-flex items-center px-12 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-full transition-all hover:scale-105"
            >
              Explore all Property
            </Link>
          </div>
        </div>
      </section>

      {/* ===== BUY, RENT & SELL SECTION ===== */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Buy, Rent &amp; Sell
            </h2>
            <p className="text-slate-500 text-lg">
              Over 745k listing of apartments, lots, plots - available today
            </p>
          </div>

          {/* Vision Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 flex flex-col items-start text-left">
                {/* Abstract Icon */}
                <div className="mb-8 p-1">
                  <svg className="w-10 h-10 text-black transform rotate-[-15deg]" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="4" y="4" width="3" height="16" rx="1.5" />
                    <rect x="10" y="4" width="3" height="16" rx="1.5" />
                    <rect x="16" y="4" width="3" height="16" rx="1.5" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-4">Our Vision</h3>
                <p className="text-slate-500 leading-relaxed mb-10">
                  To redefine real estate by making property buying and selling smooth, secure, and transparent.
                </p>
                
                <Link 
                  href="/property" 
                  className="px-8 py-3 rounded-full border border-slate-200 text-slate-900 font-medium hover:bg-slate-50 transition-colors"
                >
                  Explore
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ===== FLASH SALE SECTION ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="relative rounded-[3rem] overflow-hidden aspect-[21/9] group">
            {/* Background Image */}
            <img 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80" 
              alt="Luxury Flash Sale Property" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-slate-900/20" />

            {/* Top Left - Flash Sale Text */}
            <div className="absolute top-12 left-12 z-10">
              <h2 className="text-white text-5xl md:text-6xl font-bold mb-2">Flash Sale</h2>
              <p className="text-white text-5xl md:text-6xl font-bold">25% Off</p>
            </div>

            {/* Center - Play Button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button className="w-24 h-24 bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2" />
              </button>
            </div>

            {/* Bottom Left - Floating Property Card */}
            <div className="absolute bottom-12 left-12 z-10 max-w-sm w-full">
              <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-[2rem] p-8 text-white">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2 text-white">Rosewood Manor</h3>
                  <div className="flex items-center gap-4 text-sm text-white/90">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001-1m-6 0h6" /></svg>
                      3 Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1z" /></svg>
                      2 Bathroom
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 8V4m0 0h4" /></svg>
                      6x8 m
                    </span>
                  </div>
                </div>
                <p className="text-sm text-white/80 mb-6 leading-relaxed">
                  Minimalist house on the beach equipped with luxury facilities in it&apos;s class.
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                  <div className="text-xl font-bold text-white">$450.000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block bg-slate-100 px-6 py-2 rounded-full mb-6">
              <p className="text-slate-700 text-sm font-medium">Testimonials</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Hear From Our Clients
            </h2>
            <p className="text-slate-500 text-lg">
              Real Stories Real Clients, Backed by Real Results.
            </p>
          </div>

          {/* Testimonial Carousel Area */}
          <div className="relative flex justify-center items-center">
            {/* Main Content Wrapper with Relative Positioning for Buttons */}
            <div className="relative w-full max-w-6xl flex items-center justify-center">
              
              {/* Navigation Arrows - Positioned Significantly Closer to the Center */}
              <div className="absolute top-1/2 left-4 md:left-12 lg:left-20 -translate-y-1/2 z-30 hidden md:block">
                <button 
                  onClick={prevSlide}
                  className="w-14 h-14 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 hover:scale-110 active:scale-95 transition-all"
                >
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
              
              <div className="absolute top-1/2 right-4 md:right-12 lg:right-20 -translate-y-1/2 z-30 hidden md:block">
                <button 
                  onClick={nextSlide}
                  className="w-14 h-14 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 hover:scale-110 active:scale-95 transition-all"
                >
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-8 w-full justify-center">
                {/* Left Side Card (Partial) */}
                <div className="hidden xl:block w-32 h-80 bg-slate-50 rounded-[2.5rem] opacity-30 flex-shrink-0" />

                {/* Main Center Card */}
                <div className="relative z-10 w-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row min-h-[400px]">
                  {/* Left Column - Image */}
                  <div className="w-full md:w-[40%] h-72 md:h-auto overflow-hidden">
                    <img 
                      src={testimonials[currentSlide].image} 
                      alt={testimonials[currentSlide].name} 
                      className="w-full h-full object-cover transition-opacity duration-500"
                      key={`img-${currentSlide}`}
                    />
                  </div>

                  {/* Right Column - Quote Content */}
                  <div className="flex-1 p-10 lg:p-14 flex flex-col justify-center bg-white transition-all duration-500" key={`content-${currentSlide}`}>
                    <div className="relative">
                      <p className="text-slate-700 text-lg lg:text-xl leading-relaxed mb-8 font-medium italic animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {testimonials[currentSlide].quote}
                      </p>
                      
                      <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                        <h4 className="text-slate-900 text-xl font-bold mb-1">{testimonials[currentSlide].name}</h4>
                        <p className="text-slate-500 text-sm font-medium">{testimonials[currentSlide].role}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side Card (Partial) */}
                <div className="hidden xl:block w-32 h-80 bg-slate-50 rounded-[2.5rem] opacity-30 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AGENTS SECTION ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              Start Your Journey With Our Amazing Agents
            </h2>
          </div>

          {/* Agents Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {agents.map((agent, i) => (
              <div key={i} className="group">
                {/* Agent Image */}
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6">
                  <img 
                    src={agent.image} 
                    alt={agent.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Agent Info */}
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{agent.name}</h3>
                    <p className="text-slate-500 font-medium">{agent.role}</p>
                  </div>
                  <button className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md hover:scale-110 group/btn">
                    <svg className="w-5 h-5 text-slate-400 group-hover/btn:text-slate-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOG SECTION ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block bg-slate-100 px-6 py-2 rounded-full mb-6">
              <p className="text-slate-700 text-sm font-medium">Blog/News</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Latest News &amp; Updates
            </h2>
          </div>

          {/* Featured Blog - Top */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="rounded-[2.5rem] overflow-hidden aspect-[16/9] lg:aspect-auto h-full min-h-[400px]">
              <img 
                src={blogs[0].image} 
                alt={blogs[0].title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-slate-100 px-4 py-1.5 rounded-full text-sm font-medium text-slate-700">
                  {blogs[0].category}
                </span>
                <span className="text-slate-400 text-sm">{blogs[0].date}</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight max-w-2xl">
                {blogs[0].title} {blogs[0].title}
              </h3>
              <p className="text-slate-500 text-lg mb-8 max-w-[550px] leading-relaxed line-clamp-2">
                {blogs[0].desc}
              </p>
              <div>
                <button className="px-8 py-3 border border-slate-200 rounded-full text-slate-700 font-medium hover:bg-slate-900 hover:text-white transition-all">
                  Read more
                </button>
              </div>
            </div>
          </div>

          {/* Recent Blogs Grid - Bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {blogs.slice(1).map((blog, i) => (
              <div key={i} className="group">
                <div className="rounded-[2rem] overflow-hidden aspect-[16/10] mb-6">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-slate-100 px-4 py-1.5 rounded-full text-sm font-medium text-slate-700">
                    {blog.category}
                  </span>
                  <span className="text-slate-400 text-sm">{blog.date}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-black transition-colors line-clamp-2">
                  {blog.title}
                </h4>
                <button className="px-6 py-2 border border-slate-200 rounded-full text-slate-700 text-sm font-medium hover:bg-slate-900 hover:text-white transition-all">
                  Read more
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block bg-slate-50 px-6 py-2 rounded-full mb-6 border border-slate-100 shadow-sm">
              <p className="text-slate-700 text-sm font-medium">FAQ</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-display">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 items-start">
            {/* Left Column */}
            <div className="space-y-6">
              {faqs.slice(0, 3).map((faq, i) => (
                <div 
                  key={i} 
                  className={`bg-white rounded-[2rem] border transition-all duration-500 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 ${openFaq === i ? 'border-slate-300 shadow-xl shadow-slate-200/50' : 'border-slate-100'}`}
                >
                  <button 
                    onClick={() => toggleFaq(i)}
                    className="w-full px-8 py-8 flex items-center justify-between text-left group"
                  >
                    <span className={`text-lg lg:text-xl font-bold transition-colors duration-300 ${openFaq === i ? 'text-slate-900' : 'text-slate-800 group-hover:text-slate-900'}`}>{faq.q}</span>
                    <div className={`w-8 h-8 flex items-center justify-center transition-all duration-500 ${openFaq === i ? 'text-slate-900 rotate-180' : 'text-slate-400 group-hover:text-slate-900'}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100 translate-y-0 pb-8 px-8' : 'max-h-0 opacity-0 -translate-y-4'}`}
                  >
                    <div className="pt-2 border-t border-slate-50 mt-2">
                      <p className="text-slate-500 text-lg leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {faqs.slice(3).map((faq, i) => {
                const actualIndex = i + 3;
                return (
                  <div 
                    key={actualIndex} 
                    className={`bg-white rounded-[2rem] border transition-all duration-500 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 ${openFaq === actualIndex ? 'border-slate-300 shadow-xl shadow-slate-200/50' : 'border-slate-100'}`}
                  >
                    <button 
                      onClick={() => toggleFaq(actualIndex)}
                      className="w-full px-8 py-8 flex items-center justify-between text-left group"
                    >
                      <span className={`text-lg lg:text-xl font-bold transition-colors duration-300 ${openFaq === actualIndex ? 'text-slate-900' : 'text-slate-800 group-hover:text-slate-900'}`}>{faq.q}</span>
                      <div className={`w-8 h-8 flex items-center justify-center transition-all duration-500 ${openFaq === actualIndex ? 'text-slate-900 rotate-180' : 'text-slate-400 group-hover:text-slate-900'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === actualIndex ? 'max-h-96 opacity-100 translate-y-0 pb-8 px-8' : 'max-h-0 opacity-0 -translate-y-4'}`}
                    >
                      <div className="pt-2 border-t border-slate-50 mt-2">
                        <p className="text-slate-500 text-lg leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER SECTION (Stay Updated) ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="relative rounded-[3rem] overflow-hidden aspect-[21/9] md:aspect-[3/1] flex flex-col items-center justify-center text-center px-6">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80" 
                alt="Luxury Resort Pool" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" /> 
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-semibold text-white mb-4 drop-shadow-lg">
                Stay Updated on Latest Property
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-10 font-medium">
                Never miss a beat and stay update
              </p>

              {/* Subscription Form */}
              <div className="max-w-xl mx-auto bg-white rounded-full p-2 flex items-center shadow-xl">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-6 py-3 bg-transparent border-none text-slate-900 focus:outline-none placeholder:text-slate-400"
                />
                <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all active:scale-95">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
