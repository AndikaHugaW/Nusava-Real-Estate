"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import RevealText from '@/components/RevealText';

const blogPosts = [
  {
    id: 1,
    title: '10 Tips for First-Time Home Buyers',
    excerpt: 'A complete guide for millennials looking to purchase their first home. From budgeting to the mortgage process.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    category: 'Tips',
    author: 'Sarah Putri',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    date: 'Feb 5, 2026',
    readTime: '8 min',
  },
  {
    id: 2,
    title: 'Property Investment in 2026: Trends and Opportunities',
    excerpt: 'In-depth analysis of the Indonesian property market this year and potential locations for investment.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    category: 'Investment',
    author: 'Budi Santoso',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    date: 'Feb 3, 2026',
    readTime: '12 min',
  },
  {
    id: 3,
    title: 'Budget-Friendly Home Renovation Guide',
    excerpt: 'Tips and tricks for cost-effective home renovation without sacrificing quality and aesthetics.',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    category: 'Home Improvement',
    author: 'Maya Dewi',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    date: 'Feb 1, 2026',
    readTime: '10 min',
  },
  {
    id: 4,
    title: 'Apartment vs House: Which One is Right for You?',
    excerpt: 'A detailed comparison between vertical and horizontal living to help you make the right decision.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    category: 'Lifestyle',
    author: 'Andika Huga',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    date: 'Jan 28, 2026',
    readTime: '7 min',
  },
];

const categories = ['All', 'Tips', 'Investment', 'Home Improvement', 'Lifestyle'];

export default function BlogsPage() {
  const featuredPost = blogPosts[0];

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
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Modern architecture"
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
              Our Blog
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-8">
              <RevealText className="justify-center">Insights &</RevealText>
              <RevealText className="justify-center text-white font-normal" delay={0.3}>Expert Tips</RevealText>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Get the latest information about property, investment, and lifestyle from our experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-white px-6 py-2 rounded-full mb-8 border border-slate-100 shadow-sm"
          >
            <p className="text-slate-700 text-sm font-medium">Featured Article</p>
          </motion.div>
          
          <Link href={`/blogs/${featuredPost.id}`} className="group block">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-8 bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all p-4"
            >
              <div className="relative aspect-video lg:aspect-auto overflow-hidden rounded-[2.5rem]">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                </div>
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={featuredPost.authorImage}
                    alt={featuredPost.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-50"
                  />
                  <div>
                    <p className="text-base font-bold text-slate-900">{featuredPost.author}</p>
                    <p className="text-sm text-slate-500">{featuredPost.date} · {featuredPost.readTime}</p>
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 group-hover:text-black transition-colors leading-[1.2]">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-500 text-lg mb-8 leading-relaxed font-light">
                  {featuredPost.excerpt}
                </p>
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center group-hover:bg-black transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white border-b border-slate-100 sticky top-[72px] z-40">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all whitespace-nowrap ${
                  category === 'All'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.slice(1).map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.id}`}
                className="group block"
              >
                <motion.div 
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all p-4"
                >
                  <div className="relative aspect-video overflow-hidden rounded-[2rem] mb-6">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-white/95 text-slate-900 text-[10px] font-bold rounded-full uppercase tracking-tighter shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{post.author}</p>
                        <p className="text-xs text-slate-400">{post.date}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-black transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 line-clamp-2 font-light leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <span className="text-xs text-slate-400 uppercase tracking-widest">{post.readTime} READ</span>
                      <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Load More */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <button className="inline-flex items-center px-12 py-4 bg-slate-900 text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl">
              Load More Articles
            </button>
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
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" 
            className="w-full h-full object-cover"
            alt="Cityscape"
          />
        </motion.div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Subscribe to Our Newsletter
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg mb-10"
          >
            Get the latest articles and property tips delivered to your inbox.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-slate-400 focus:outline-none focus:border-white transition-all"
            />
            <button className="px-10 py-4 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-all shadow-xl">
              Subscribe
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
