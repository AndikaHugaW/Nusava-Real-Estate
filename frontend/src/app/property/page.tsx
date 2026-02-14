import Link from 'next/link';
import PropertySearchBar from '@/components/PropertySearchBar';
import RevealText from '@/components/RevealText';
import PropertyGrid from '@/components/PropertyGrid';
import { getProperties } from '@/lib/api';

export default async function PropertyPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const type = resolvedSearchParams.type as string;
  const status = resolvedSearchParams.status as string;
  const search = resolvedSearchParams.search as string;
  const city = resolvedSearchParams.city as string;


  const { properties, pagination } = await getProperties({
    type: type === 'All' ? undefined : type?.toUpperCase(),
    status: status === 'All' ? undefined : status?.toUpperCase(),
    search: search,
    city: city
  });

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Luxury properties"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/50" />
        </div>

        <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 py-32 lg:px-16 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-white/70 text-sm tracking-wide mb-8 uppercase">
              Property Catalog
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-8">
              <RevealText className="justify-center text-white">Find Your Perfect</RevealText>
              <RevealText className="justify-center text-white" delay={0.3}>Dream Property</RevealText>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Browse our curated collection of premium properties across Indonesia.
            </p>
          </div>
        </div>
      </section>

      <PropertySearchBar />

      {/* Property Grid Section */}
      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
              Discover Handpicked Homes
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-blue-400">
              That Define Elegance
            </h3>
          </div>

          {/* Categories Filter with Arrows */}
          <div className="flex items-center gap-4 mb-16 overflow-hidden relative">
            <button className="hidden sm:flex w-12 h-12 rounded-full border border-slate-100 items-center justify-center flex-shrink-0 text-slate-300 hover:text-slate-900 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 px-1">
              {[
                { label: 'All', value: 'All' },
                { label: 'Villas', value: 'VILLA' },
                { label: 'Apartments', value: 'APARTMENT' },
                { label: 'Duplex Homes', value: 'DUPLEX' },
                { label: 'Townhouses', value: 'TOWNHOUSE' },
                { label: 'Studio Apartments', value: 'STUDIO' },
                { label: 'Luxury Villas', value: 'VILLA' },
                { label: 'Retail Spaces', value: 'COMMERCIAL' }
              ].map((cat) => (
                <Link
                  key={cat.label}
                  href={`/property?type=${cat.value}&status=${status || 'All'}&search=${search || ''}`}
                  className={`px-8 py-4 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                    (type || 'All') === cat.value
                      ? 'bg-slate-900 text-white shadow-lg shadow-black/10 scale-105'
                      : 'bg-slate-50 text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            <button className="hidden sm:flex w-12 h-12 rounded-full border border-slate-900 items-center justify-center flex-shrink-0 text-slate-900 hover:bg-slate-900 hover:text-white transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {properties.length > 0 ? (
            <PropertyGrid properties={properties} />
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">
                No properties found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
