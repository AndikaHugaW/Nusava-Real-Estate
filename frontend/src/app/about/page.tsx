"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import RevealText from '@/components/RevealText';

const teamMembers = [
  {
    name: 'Andika Huga W',
    role: 'FOUNDER & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Visionary leader with 10+ years of real estate experience.',
  },
  {
    name: 'Sarah Putri',
    role: 'HEAD OF SALES',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    bio: 'Expert in luxury property sales and client relations.',
  },
  {
    name: 'Budi Santoso',
    role: 'CHIEF TECHNOLOGY OFFICER',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'Building innovative solutions for real estate technology.',
  },
  {
    name: 'Maya Dewi',
    role: 'HEAD OF MARKETING',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    bio: 'Creative strategist driving brand growth and visibility.',
  },
];

const values = [
  {
    title: 'Transparency',
    description: 'Clear and honest communication in every transaction.',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
  },
  {
    title: 'Excellence',
    description: 'Delivering premium service and quality properties.',
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    title: 'Innovation',
    description: 'Leveraging technology for better property discovery.',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
];

const stats = [
  { value: 5000, suffix: '+', label: 'Properties Listed' },
  { value: 2500, suffix: '+', label: 'Happy Families' },
  { value: 150, suffix: '+', label: 'Cities Covered' },
  { value: 50, suffix: '+', label: 'Expert Agents' },
];

const processSteps = [
  {
    id: 'discover',
    title: 'Discover',
    heading: 'Smart Search & Discovery',
    description: 'Explore thousands of verified listings with advanced filters and AI-powered recommendations tailored to your search behavior and lifestyle.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
    features: [
      { name: 'Advanced Filtering', desc: 'Precision search by neighborhood, amenities, and price.' },
      { name: 'AI Recommendations', desc: 'Listing suggestions based on your personal preferences.' },
      { name: 'Virtual Tours', desc: 'Walk through properties from the comfort of your home.' }
    ]
  },
  {
    id: 'consult',
    title: 'Consult',
    heading: 'Expert Guidance & Strategy',
    description: 'Connect with certified real estate professionals who provide data-driven insights and personalized strategies for your property investment journey.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80',
    features: [
      { name: 'Expert Matching', desc: 'Get paired with agents specialized in your target market.' },
      { name: 'Market Analysis', desc: 'Detailed ROI and market growth projections for investors.' },
      { name: 'Live Consultations', desc: 'Schedule video calls with experts anytime, anywhere.' }
    ]
  },
  {
    id: 'transact',
    title: 'Transact',
    heading: 'Secure & Seamless Closing',
    description: 'Finalize your purchase with absolute confidence using our encrypted document management and transparent escrow tracking system.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80',
    features: [
      { name: 'Digital Signatures', desc: 'Execute contracts securely from anywhere in the world.' },
      { name: 'Secure Escrow', desc: 'Transparent tracking of funds and transaction stages.' },
      { name: 'Real-time Updates', desc: 'Get instant notifications on your closing progress.' }
    ]
  }
];

const audienceWorkflows = [
  {
    title: 'For Home Buyers',
    desc: 'Plan, schedule, and view properties easily without the stress of traditional searching.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001-1m-6 0h6" />
      </svg>
    )
  },
  {
    title: 'For Marketing Teams',
    desc: 'Collaborate with your team, review listings, and track performance across all platforms.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: 'For Solo Agents',
    desc: 'Create engaging listings faster and grow your client base with AI-powered suggestions.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    )
  },
  {
    title: 'For Real Estate Agencies',
    desc: 'Manage multiple agents, schedule viewings, and deliver clear reports from one dashboard.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    viewport: { once: true }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
            alt="Real estate office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/50" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 py-32 lg:px-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-white/70 text-sm tracking-wide mb-8 uppercase">
              About Nusava
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-8">
              <RevealText className="justify-center">Building Trust in</RevealText>
              <RevealText className="justify-center text-white font-normal" delay={0.3}>Real Estate</RevealText>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Nusava connects people with their dream properties across Indonesia through technology and trusted expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-slate-100 px-6 py-2 rounded-full mb-8"
          >
            <p className="text-slate-700 text-sm font-medium">Our Story</p>
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 max-w-6xl leading-[1.15]">
            <RevealText>From Vision to Reality.</RevealText>
            <RevealText className="text-slate-400" delay={0.5}>Building Indonesia's most trusted property ecosystem.</RevealText>
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-xl text-slate-600 leading-relaxed font-light"
            >
              <p>
                Founded in 2020, Nusava started with a simple mission: to make property buying and selling in Indonesia transparent, efficient, and accessible to everyone.
              </p>
              <p>
                Today, we&apos;ve grown into one of the most trusted real estate platforms in the country, helping thousands of families find their perfect homes.
              </p>
              <p>
                Our team of experts combines deep local knowledge with cutting-edge technology to provide an unmatched property discovery experience.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border border-slate-100"
            >
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Our office"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block bg-white px-6 py-2 rounded-full mb-6 border border-slate-100 shadow-sm"
            >
              <p className="text-slate-700 text-sm font-medium">Our Values</p>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight"
            >
              What Drives Us Forward
            </motion.h2>
          </div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {values.map((value, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="p-12 bg-white rounded-[3rem] shadow-sm border border-slate-100 flex flex-col items-start transition-all hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d={value.icon} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== INTERACTIVE PROCESS SECTION (SaaS Style) ===== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Effortless Property Journey
              </h2>
            </div>
            <div className="max-w-md lg:text-right">
              <p className="text-slate-500 text-lg leading-relaxed">
                Search, consult, and transact all from one powerful and easy-to-use dashboard. Your dream home is just steps away.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="relative mb-20 px-2 lg:px-0">
            <div className="flex justify-between items-center relative z-10 mb-4">
              {processSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => {
                    setActiveTab(index);
                    setActiveFeature(0);
                  }}
                  className={`text-lg md:text-xl font-bold transition-all duration-500 relative ${
                    activeTab === index ? 'text-slate-900' : 'text-slate-300 hover:text-slate-400'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>
            {/* Progress Line Container */}
            <div className="relative h-[1.5px] w-full bg-slate-100/80 rounded-full">
              {/* Active Progress Line */}
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#3d4b3d]"
                initial={false}
                animate={{ 
                  width: `${(activeTab / (processSteps.length - 1)) * 100}%` 
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
              
              {/* Indicator Dot */}
              <motion.div 
                className="absolute top-1/2 w-4 h-4 bg-[#3d4b3d] rounded-full border-[3px] border-white shadow-sm z-20"
                initial={false}
                animate={{ 
                  left: `${(activeTab / (processSteps.length - 1)) * 100}%`,
                  x: activeTab === 0 ? "0%" : activeTab === processSteps.length - 1 ? "-100%" : "-50%",
                  y: "-50%"
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              {/* Left Content */}
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
                  {processSteps[activeTab].heading}
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-10">
                  {processSteps[activeTab].description}
                </p>

                <div className="bg-[#f7f8f7] rounded-[2rem] p-4 border border-slate-100 shadow-inner">
                  {processSteps[activeTab].features.map((feature, i) => {
                    const isActive = activeFeature === i;
                    return (
                      <div key={i}>
                        <motion.div 
                          onMouseEnter={() => setActiveFeature(i)}
                          onClick={() => setActiveFeature(i)}
                          className={`p-6 rounded-2xl transition-all duration-500 flex items-center gap-5 cursor-pointer group relative overflow-hidden ${
                            isActive ? 'bg-[#3d4b3d] text-white shadow-lg' : 'hover:bg-white/50'
                          }`}
                        >
                          {/* Animated background for hover */}
                          {!isActive && (
                            <motion.div 
                              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              layoutId={`hover-bg-${activeTab}`}
                            />
                          )}

                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500 relative z-10 ${
                            isActive ? 'bg-white text-[#3d4b3d]' : 'bg-[#3d4b3d] text-white'
                          }`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                          <div className="relative z-10 flex-1">
                            <h4 className="text-lg font-bold transition-colors duration-300">{feature.name}</h4>
                            <AnimatePresence initial={false}>
                              {isActive && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-sm text-white/80 mt-2 leading-relaxed max-w-sm">
                                    {feature.desc}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                        {/* Divider Line */}
                        {!isActive && i < processSteps[activeTab].features.length - 1 && activeFeature !== i + 1 && (
                          <div className="mx-6 h-[1px] bg-slate-200/60" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="relative aspect-[4/5] lg:aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl"
              >
                <img 
                  src={processSteps[activeTab].image} 
                  alt={processSteps[activeTab].title}
                  className="w-full h-full object-cover transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ===== WORKFLOW ADAPTATION SECTION ===== */}
      <section className="py-24 bg-[#fafafa] overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Built for Every Real Estate Workflow
            </h2>
            <p className="text-slate-500 text-lg">
              Whether you&apos;re managing one property or a massive portfolio, our platform adapts to how you work.
            </p>
          </div>

          {/* Adaptation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left Column - 2 Cards */}
            <div className="space-y-8">
              {audienceWorkflows.slice(0, 2).map((workflow, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                  className="bg-white p-10 rounded-[2rem] border border-slate-100 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#f0f2f0] rounded-xl flex items-center justify-center mb-6 text-[#3d4b3d] group-hover:bg-[#3d4b3d] group-hover:text-white transition-colors duration-500">
                    {workflow.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{workflow.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {workflow.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Middle Column - Large Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80" 
                alt="Real Estate Professional" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </motion.div>

            {/* Right Column - 2 Cards */}
            <div className="space-y-8">
              {audienceWorkflows.slice(2, 4).map((workflow, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="whileInView"
                  whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                  className="bg-white p-10 rounded-[2rem] border border-slate-100 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-[#f0f2f0] rounded-xl flex items-center justify-center mb-6 text-[#3d4b3d] group-hover:bg-[#3d4b3d] group-hover:text-white transition-colors duration-500">
                    {workflow.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{workflow.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {workflow.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>



      <section className="py-24 bg-white overflow-hidden" id="team">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight max-w-4xl mx-auto"
            >
              Start Your Journey With Our Amazing Agents
            </motion.h2>
          </div>
 
          {/* Agents Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
          >
            {teamMembers.map((member, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                className="group cursor-pointer"
              >
                {/* Agent Image */}
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 border border-slate-100 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-slate-200/50">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Agent Info */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-0.5 group-hover:text-blue-600 transition-colors">{member.name}</h3>
                    <p className="text-slate-500 text-sm font-medium">Property Manager</p>
                  </div>
                  
                  {/* Arrow Icon */}
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 rounded-[3rem] mx-6 lg:mx-16 mb-24 overflow-hidden relative">
        <motion.div 
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 opacity-20"
        >
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" 
            className="w-full h-full object-cover"
            alt="Estate"
          />
        </motion.div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Work With Us?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg mb-10"
          >
            Let our team help you find the perfect property or sell your current one.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/property" 
              className="px-8 py-4 bg-slate-900 hover:bg-black text-white font-semibold rounded-xl transition-colors shadow-lg shadow-slate-900/20"
            >
              Explore Properties
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl transition-all hover:scale-105"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
