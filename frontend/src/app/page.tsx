'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import RevealText from '@/components/RevealText';
import { useEffect } from 'react';



export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    viewport: { once: true }
  };

  const properties = [
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      title: 'Rosewood Manor',
      location: 'Miami, Florida, celinam delware 2098',
      price: '$2,500',
      beds: 3,
      baths: 2,
      slug: 'rosewood-manor'
    },
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      title: 'Rosewood Manor',
      location: 'Miami, Florida, celinam delware 2098',
      price: '$2,500',
      beds: 3,
      baths: 2,
      area: '6x8 m',
      slug: 'rosewood-manor-2'
    },
    {
      image: 'https://images.unsplash.com/photo-1600047533589-322197623910?w=800&q=80',
      title: 'Rosewood Manor',
      location: 'Miami, Florida, celinam delware 2098',
      price: '$2,500',
      beds: 3,
      baths: 2,
      area: '6x8 m',
      slug: 'rosewood-manor-3'
    },
    {
      image: 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=800&q=80',
      title: 'Rosewood Manor',
      location: 'Miami, Florida, celinam delware 2098',
      price: '$2,500',
      beds: 3,
      baths: 2,
      area: '6×8 m',
      slug: 'rosewood-manor-4'
    },
    {
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
      title: 'Rosewood Manor',
      location: 'Miami, Florida, celinam delware 2098',
      price: '$2,500',
      beds: 3,
      baths: 2,
      area: '6×8 m',
      slug: 'rosewood-manor-5'
    },
    {
      image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80',
      title: 'Rosewood Manor',
      location: 'Miami, Florida, celinam delware 2098',
      price: '$2,500',
      beds: 3,
      baths: 2,
      area: '6×8 m',
      slug: 'rosewood-manor-6'
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
  const [dbProperties, setDbProperties] = useState<any[]>([]);

  useEffect(() => {
    const fetchProps = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/properties`);
        const data = await res.json();
        
        // Handle paginated response structure { properties: [...], pagination: {...} }
        const propertiesArray = Array.isArray(data) ? data : data.properties;
        
        if (Array.isArray(propertiesArray)) {
          setDbProperties(propertiesArray.slice(0, 6));
        }
      } catch (err) {
        console.error('Failed to fetch real properties', err);
      }
    };
    fetchProps();
  }, []);

  const displayProperties = dbProperties.length > 0 ? dbProperties.map(p => ({
    image: p.images?.[0]?.url ? (p.images[0].url.startsWith('/') ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${p.images[0].url}` : p.images[0].url) : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    title: p.title,
    location: `${p.city}, ${p.state}`,
    price: `Rp ${p.price.toLocaleString('id-ID')}`,
    beds: p.bedrooms,
    baths: p.bathrooms,
    area: `${p.area} m²`,
    slug: p.slug
  })) : properties;


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
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80"
            alt="Luxury modern house"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/40" />
        </motion.div>

        {/* Stats Cards - Positioned at top-right, aligned with navbar */}
        <div className="hidden lg:block absolute top-40 left-0 right-0 z-20 pointer-events-none">
          <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
            <div className="flex justify-end">
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                animate="whileInView"
                className="flex flex-col gap-2 pointer-events-auto"
              >
                {/* Card 1 - Projects Complete */}
                <motion.div 
                  variants={fadeInUp}
                  className="relative w-44 h-44"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-full border border-white/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-light text-white mb-2">50+</div>
                    <div className="text-sm text-white/70">Project complete</div>
                  </div>
                </motion.div>

                {/* Card 2 - Project Value */}
                <motion.div 
                  variants={fadeInUp}
                  className="relative w-44 h-44"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-full border border-white/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-light text-white mb-2">$3.5M</div>
                    <div className="text-sm text-white/70">Project value</div>
                  </div>
                </motion.div>

                {/* Card 3 - Expert Teams */}
                <motion.div 
                  variants={fadeInUp}
                  className="relative w-44 h-44"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-full border border-white/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-light text-white mb-2">100+</div>
                    <div className="text-sm text-white/70">Expert teams</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 py-32 lg:px-16">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="whileInView"
            className="max-w-3xl"
          >
            {/* Badge */}
            <motion.p 
              variants={fadeInUp}
              className="text-white/70 text-sm tracking-wide mb-8"
            >
              Built to Inspire
            </motion.p>

            {/* Heading - Light font weight like the design */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-8">
              <RevealText>Your real estate Journey starts here</RevealText>
            </h1>

            {/* Description */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/80 mb-12 max-w-xl leading-relaxed font-light"
            >
              Discover properties that match your lifestyle from city condos to suburban homes, we&apos;ve got you covered.
            </motion.p>

            {/* CTA Button - Pill-shaped with integrated circle */}
            <motion.div variants={fadeInUp}>
              <Link 
                href="/property" 
                className="inline-flex items-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 group"
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Badge */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-slate-100 px-6 py-2 rounded-full mb-8"
          >
            <p className="text-slate-700 text-sm font-medium">Who We Are</p>
          </motion.div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 max-w-6xl leading-[1.15]">
            <RevealText>We're trusted real estate agency helping people find their dream homes and investments.</RevealText>
            <RevealText className="text-slate-400" delay={0.5}>Helping you find home, effortlessly.</RevealText>
          </h2>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            {/* Left Side - Image with Vision & Mission */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {/* Hero Image */}
              <motion.div 
                variants={fadeInUp}
                className="col-span-2 relative rounded-3xl overflow-hidden border border-slate-200 aspect-[2/1]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" 
                  alt="Team meeting" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>

              {/* Our Vision */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 aspect-square flex flex-col justify-end relative transition-shadow hover:shadow-xl hover:shadow-slate-100"
              >
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
              </motion.div>

              {/* Mission */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 aspect-square flex flex-col justify-end relative transition-shadow hover:shadow-xl hover:shadow-slate-100"
              >
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
              </motion.div>
            </motion.div>

            {/* Right Side - Statistics Grid */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {/* Stat 1 - Projects Complete */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-end aspect-square relative"
              >
                <div className="absolute top-4 right-4">
                  <div className="w-[80px] h-[80px] bg-white border border-slate-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-slate-900 mb-2">
                    <AnimatedCounter value={1200} suffix="+" />
                  </div>
                  <p className="text-slate-500">Project complete</p>
                </div>
              </motion.div>

              {/* Stat 2 - Happy Clients */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-end aspect-square relative"
              >
                <div className="absolute top-4 right-4">
                  <div className="w-[80px] h-[80px] bg-white border border-slate-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-slate-900 mb-2">
                    <AnimatedCounter value={250} suffix="+" />
                  </div>
                  <p className="text-slate-500">Happy Clients</p>
                </div>
              </motion.div>

              {/* Stat 3 - Project Value */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-end aspect-square relative"
              >
                <div className="absolute top-4 right-4">
                  <div className="w-[80px] h-[80px] bg-white border border-slate-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-slate-900 mb-2">
                    <AnimatedCounter value={10} prefix="$" suffix="M+" />
                  </div>
                  <p className="text-slate-500">Project Value</p>
                </div>
              </motion.div>

              {/* Stat 4 - Client Retention Rate */}
              <motion.div 
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-end aspect-square relative"
              >
                <div className="absolute top-4 right-4">
                  <div className="w-[80px] h-[80px] bg-white border border-slate-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-bold text-slate-900 mb-2">
                    <AnimatedCounter value={90} suffix="%" />
                  </div>
                  <p className="text-slate-500">Client Retention Rate</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== EXPLORE PROPERTIES ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-slate-100 px-6 py-2 rounded-full mb-6">
              <p className="text-slate-700 text-sm font-medium">Property List</p>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              <RevealText className="justify-center">Explore all Property</RevealText>
            </h2>
          </motion.div>

          {/* Properties Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayProperties.map((item, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[2rem] border border-slate-100 p-4 transition-all hover:shadow-xl hover:shadow-slate-200/50"
              >
                {/* Property Image */}
                <Link href={item.slug ? `/property/${item.slug}` : "/property"} className="block">
                  <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Link>
                
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
                      <span className="text-slate-500 text-sm">{item.baths} Bath</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span className="text-slate-500 text-sm">{item.area}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>


          {/* Large CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link 
              href="/property" 
              className="inline-flex items-center px-12 py-4 bg-slate-900 hover:bg-black text-white font-bold rounded-full transition-all hover:scale-105"
            >
              Explore all Property
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== BUY, RENT & SELL SECTION ===== */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Buy, Rent &amp; Sell
            </h2>
            <p className="text-slate-500 text-lg">
              Over 745k listing of apartments, lots, plots - available today
            </p>
          </motion.div>

          {/* Vision Cards Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[1, 2, 3].map((_, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 flex flex-col items-start text-left transition-shadow hover:shadow-xl hover:shadow-slate-200/50"
              >
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
                  className="px-8 py-3 rounded-full border border-slate-200 text-slate-900 font-medium hover:bg-slate-900 hover:text-white transition-all"
                >
                  Explore
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ===== FLASH SALE SECTION ===== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden aspect-[21/9] group"
          >
            {/* Background Image */}
            <motion.img 
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80" 
              alt="Luxury Flash Sale Property" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-slate-900/20" />

            {/* Top Left - Flash Sale Text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-12 left-12 z-10"
            >
              <h2 className="text-white text-5xl md:text-6xl font-bold mb-2">Flash Sale</h2>
              <div className="text-white text-5xl md:text-6xl font-bold">
                <AnimatedCounter value={25} suffix="% Off" />
              </div>
            </motion.div>

            {/* Center - Play Button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-24 h-24 bg-white/30 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center transition-all"
              >
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2" />
              </motion.button>
            </div>

            {/* Bottom Left - Floating Property Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-12 z-10 max-w-sm w-full"
            >
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block bg-slate-100 px-6 py-2 rounded-full mb-6">
              <p className="text-slate-700 text-sm font-medium">Testimonials</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-display">
              <RevealText className="justify-center">Hear From Our Clients</RevealText>
            </h2>
            <p className="text-slate-500 text-lg">
              Real Stories Real Clients, Backed by Real Results.
            </p>
          </motion.div>

          {/* Testimonial Carousel Area */}
          <div className="relative flex justify-center items-center">
            {/* Main Content Wrapper with Relative Positioning for Buttons */}
            <div className="relative w-full max-w-6xl flex items-center justify-center">
              
              {/* Navigation Arrows - Positioned Significantly Closer to the Center */}
              <div className="absolute top-1/2 left-4 md:left-12 lg:left-20 -translate-y-1/2 z-30 hidden md:block">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSlide}
                  className="w-14 h-14 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 transition-all"
                >
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
              </div>
              
              <div className="absolute top-1/2 right-4 md:right-12 lg:right-20 -translate-y-1/2 z-30 hidden md:block">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSlide}
                  className="w-14 h-14 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 transition-all"
                >
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              <div className="flex items-center gap-8 w-full justify-center">
                {/* Left Side Card (Partial) */}
                <div className="hidden xl:block w-32 h-80 bg-slate-50 rounded-[2.5rem] opacity-30 flex-shrink-0" />

                {/* Main Center Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative z-10 w-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row min-h-[400px]"
                >
                  {/* Left Column - Image */}
                  <div className="w-full md:w-[40%] h-72 md:h-auto overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        src={testimonials[currentSlide].image} 
                        alt={testimonials[currentSlide].name} 
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>

                  {/* Right Column - Quote Content */}
                  <div className="flex-1 p-10 lg:p-14 flex flex-col justify-center bg-white">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentSlide}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                      >
                        <p className="text-slate-700 text-lg lg:text-xl leading-relaxed mb-8 font-medium italic">
                          {testimonials[currentSlide].quote}
                        </p>
                        
                        <div>
                          <h4 className="text-slate-900 text-xl font-bold mb-1">{testimonials[currentSlide].name}</h4>
                          <p className="text-slate-500 text-sm font-medium">{testimonials[currentSlide].role}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Right Side Card (Partial) */}
                <div className="hidden xl:block w-32 h-80 bg-slate-50 rounded-[2.5rem] opacity-30 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AGENTS SECTION ===== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 max-w-3xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              Start Your Journey With Our Amazing Agents
            </h2>
          </motion.div>

          {/* Agents Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
          >
            {agents.map((agent, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group"
              >
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
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md group/btn"
                  >
                    <svg className="w-5 h-5 text-slate-400 group-hover/btn:text-slate-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== BLOG SECTION ===== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-slate-100 px-6 py-2 rounded-full mb-6">
              <p className="text-slate-700 text-sm font-medium">Blog/News</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Latest News &amp; Updates
            </h2>
          </motion.div>

          {/* Featured Blog - Top */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24"
          >
            <div className="rounded-[2.5rem] overflow-hidden aspect-[16/9] lg:aspect-auto h-full min-h-[400px]">
              <img 
                src={blogs[0].image} 
                alt={blogs[0].title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
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
                {blogs[0].title}
              </h3>
              <p className="text-slate-500 text-lg mb-8 max-w-[550px] leading-relaxed line-clamp-2">
                {blogs[0].desc}
              </p>
              <div>
                <motion.button 
                  whileHover={{ x: 10 }}
                  className="px-8 py-3 border border-slate-200 rounded-full text-slate-700 font-medium hover:bg-slate-900 hover:text-white transition-all flex items-center gap-2 group"
                >
                  Read more
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Recent Blogs Grid - Bottom */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {blogs.slice(1).map((blog, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group"
              >
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
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="px-6 py-2 border border-slate-200 rounded-full text-slate-700 text-sm font-medium hover:bg-slate-900 hover:text-white transition-all"
                >
                  Read more
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block bg-slate-50 px-6 py-2 rounded-full mb-6 border border-slate-100 shadow-sm">
              <p className="text-slate-700 text-sm font-medium">FAQ</p>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-display">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 items-start">
            {/* Left Column */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {faqs.slice(0, 3).map((faq, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
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
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 px-8 pt-2 border-t border-slate-50 mt-2">
                          <p className="text-slate-500 text-lg leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>

            {/* Right Column */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {faqs.slice(3).map((faq, i) => {
                const actualIndex = i + 3;
                return (
                  <motion.div 
                    key={actualIndex} 
                    variants={fadeInUp}
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
                    <AnimatePresence>
                      {openFaq === actualIndex && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 px-8 pt-2 border-t border-slate-50 mt-2">
                            <p className="text-slate-500 text-lg leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER SECTION (Stay Updated) ===== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden aspect-[21/9] md:aspect-[3/1] flex flex-col items-center justify-center text-center px-6"
          >
            {/* Background Image */}
            <motion.div 
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 z-0"
            >
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80" 
                alt="Luxury Resort Pool" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" /> 
            </motion.div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl">
              <motion.h2 
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-semibold text-white mb-4 drop-shadow-lg"
              >
                Stay Updated on Latest Property
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/90 text-lg md:text-xl mb-10 font-medium"
              >
                Never miss a beat and stay update
              </motion.p>

              {/* Subscription Form */}
              <motion.div 
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="max-w-xl mx-auto bg-white rounded-full p-2 flex items-center shadow-xl"
              >
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-6 py-3 bg-transparent border-none text-slate-900 focus:outline-none placeholder:text-slate-400"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-all"
                >
                  Subscribe
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
