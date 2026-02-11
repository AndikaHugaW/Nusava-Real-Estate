'use client';

import { useState } from 'react';
import Link from 'next/link';

const allProperties = [
  {
    id: 1,
    title: 'Modern Villa with Pool',
    location: 'Bali, Indonesia',
    price: 8500000000,
    priceFormatted: 'Rp 8.5 Miliar',
    beds: 5,
    baths: 4,
    area: 450,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    type: 'Villa',
    status: 'For Sale',
  },
  {
    id: 2,
    title: 'Premium CBD Apartment',
    location: 'Jakarta Selatan',
    price: 3200000000,
    priceFormatted: 'Rp 3.2 Miliar',
    beds: 3,
    baths: 2,
    area: 180,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    type: 'Apartment',
    status: 'For Sale',
  },
  {
    id: 3,
    title: 'Beachfront Villa',
    location: 'Lombok, NTB',
    price: 12000000000,
    priceFormatted: 'Rp 12 Miliar',
    beds: 6,
    baths: 5,
    area: 650,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    type: 'Villa',
    status: 'For Sale',
  },
  {
    id: 4,
    title: 'Minimalist House',
    location: 'Bandung, Jawa Barat',
    price: 2100000000,
    priceFormatted: 'Rp 2.1 Miliar',
    beds: 4,
    baths: 3,
    area: 250,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    type: 'House',
    status: 'For Sale',
  },
  {
    id: 5,
    title: 'Studio Apartment',
    location: 'Surabaya, Jawa Timur',
    price: 850000000,
    priceFormatted: 'Rp 850 Juta',
    beds: 1,
    baths: 1,
    area: 45,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    type: 'Apartment',
    status: 'For Rent',
  },
  {
    id: 6,
    title: 'Family Townhouse',
    location: 'Tangerang, Banten',
    price: 1800000000,
    priceFormatted: 'Rp 1.8 Miliar',
    beds: 3,
    baths: 2,
    area: 180,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    type: 'House',
    status: 'For Sale',
  },
];

const propertyTypes = ['All', 'Villa', 'Apartment', 'House'];
const statuses = ['All', 'For Sale', 'For Rent'];

export default function PropertyPage() {
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = allProperties.filter((property) => {
    const matchesType = selectedType === 'All' || property.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || property.status === selectedStatus;
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          property.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[60vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Luxury properties"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 py-32 lg:px-16 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-white/70 text-sm tracking-wide mb-8 uppercase">
              Property Catalog
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-8">
              Find Your Perfect
              <br />
              <span className="text-white">Dream Property</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Browse our curated collection of premium properties across Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-slate-100 sticky top-[72px] z-40">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4">
              {/* Type Filter */}
              <div className="flex gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${
                      selectedType === type
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Status Filter */}
              <div className="flex gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${
                      selectedStatus === status
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Grid */}
      <section className="py-16">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between mb-12">
            <div className="inline-block bg-slate-100 px-6 py-2 rounded-full">
              <p className="text-slate-700 text-sm font-medium">
                Showing {filteredProperties.length} premium properties
              </p>
            </div>
          </div>

          {/* Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <article 
                  key={property.id} 
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group p-4"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] mb-6">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        property.status === 'For Sale' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-orange-500 text-white'
                      }`}>
                        {property.status}
                      </span>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 text-slate-700">
                        {property.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Location */}
                    <div className="flex items-center gap-1 text-slate-500 text-sm mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {property.location}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-black transition-colors">
                      {property.title}
                    </h3>

                    {/* Specs */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {property.beds} Beds
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                        {property.baths} Baths
                      </span>
                      <span>{property.area} m²</span>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xl font-bold text-slate-900">{property.priceFormatted}</span>
                      <Link 
                        href={`/property/${property.id}`} 
                        className="text-sm font-bold text-slate-900 hover:text-black transition-colors"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                No properties found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-slate-900 rounded-[3rem] mx-6 lg:mx-16 mb-24 overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80" 
            className="w-full h-full object-cover"
            alt="Beachfront"
          />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-white/80 text-lg mb-10">
            Our agents can help you find the perfect property tailored to your needs.
          </p>
          <Link 
            href="/contact" 
            className="inline-block px-10 py-4 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-all shadow-xl"
          >
            Contact Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}
