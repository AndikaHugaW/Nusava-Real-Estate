import Link from 'next/link';
import AnimatedCounter from '@/components/AnimatedCounter';
import RevealText from '@/components/RevealText';
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


  const { properties, pagination } = await getProperties({
    type: type === 'All' ? undefined : type?.toUpperCase(),
    status: status === 'All' ? undefined : status?.toUpperCase(),
    search: search
  });

  console.log('DEBUG: Properties received:', properties?.length);
  console.log('DEBUG: Pagination:', pagination);

  const propertyTypes = ['All', 'Villa', 'Apartment', 'House', 'Land', 'Commercial'];

  const propertyStatuses = ['All', 'Published', 'Sold', 'Rented'];

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

      {/* Filters (Using simple links for server-side navigation) */}
      <section className="py-8 bg-white border-b border-slate-100 sticky top-[72px] z-40">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <form action="/property" method="GET">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  name="search"
                  placeholder="Search properties..."
                  defaultValue={search || ''}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </form>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex gap-2">
                {propertyTypes.map((t) => (
                  <Link
                    key={t}
                    href={`/property?type=${t}&status=${status || 'All'}&search=${search || ''}`}
                    className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all ${
                      (type || 'All') === t
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </Link>
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
              <div className="text-slate-700 text-sm font-medium flex items-center gap-1">
                Showing <AnimatedCounter value={properties.length} /> premium properties
              </div>
            </div>
          </div>

          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property: any) => (
                <article 
                  key={property.id} 
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group p-4"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] mb-6">
                    <img 
                      src={property.images.find((img: any) => img.isPrimary)?.url || property.images[0]?.url} 
                      alt={property.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full bg-slate-900 text-white`}>
                        {property.status}
                      </span>
                      {property.isFeatured && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500 text-white">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1 text-slate-500 text-sm mb-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {property.city}, {property.state}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-black transition-colors">
                      {property.title}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        {property.bedrooms} Beds
                      </span>
                      <span className="flex items-center gap-1">
                        {property.bathrooms} Baths
                      </span>
                      <span>{property.area} m²</span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xl font-bold text-slate-900">
                        ${property.price.toLocaleString()}
                      </span>
                      <Link 
                        href={`/property/${property.slug}`} 
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
