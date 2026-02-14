'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface PropertyGridProps {
  properties: any[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const getImageUrl = (url: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800';
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${url}`;
  };

  return (
    <motion.div 
      variants={staggerContainer}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {properties.map((property: any) => {
        const primaryImage = property.images.find((img: any) => img.isPrimary)?.url || property.images[0]?.url;

        return (
          <motion.div 
            key={property.id} 
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="group bg-white rounded-[2rem] border border-slate-100 p-4 transition-all hover:shadow-xl hover:shadow-slate-200/50"
          >
            <Link href={`/property/${property.slug}`} className="block h-full">
              <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-6">
                <img 
                  src={getImageUrl(primaryImage)} 
                  alt={property.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-slate-900/80 backdrop-blur-md text-white uppercase tracking-wider">
                    {property.status}
                  </span>
                </div>
              </div>

              <div className="px-2 pb-2">
                <p className="text-xl font-bold text-slate-900 mb-1 leading-tight">Rp {property.price.toLocaleString('id-ID')}</p>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{property.title}</h3>
                <p className="text-slate-500 text-sm mb-6">{property.city}, {property.state}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001-1m-6 0h6" />
                    </svg>
                    <span className="text-slate-500 text-sm font-medium">{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1zM21 16V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v10a1 1 0 001 1h2a1 1 0 011-1z" />
                    </svg>
                    <span className="text-slate-500 text-sm font-medium">{property.bathrooms} Bath</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span className="text-slate-500 text-sm font-medium">{property.area} m²</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
