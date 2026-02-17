import PropertySearchBar from '@/components/PropertySearchBar';
import PropertyCategoryFilter from '@/components/PropertyCategoryFilter';
import RevealText from '@/components/RevealText';
import PropertyGrid from '@/components/PropertyGrid';
import { getProperties } from '@/lib/api';
import { Suspense } from 'react';
export const revalidate = 0;

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

  let properties: any[] = [];
  let fetchError = '';

  try {
    const data = await getProperties({
      type: (!type || type === 'All') ? undefined : type.toUpperCase(),
      status: (!status || status === 'All') ? undefined : status.toUpperCase(),
      search: search || undefined,
      city: city || undefined,
    });
    properties = data.properties || [];
  } catch (error: any) {
    console.error('Failed to fetch properties:', error?.message || error);
    fetchError = 'Unable to load properties. Please make sure the backend is running.';
  }

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

      <div className="relative z-30 pb-6">
        <Suspense fallback={<div className="h-24" />}>
          <PropertySearchBar />
        </Suspense>
      </div>

      {/* Property Grid Section */}
      <section className="py-20">
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
          <Suspense fallback={<div className="h-16" />}>
            <PropertyCategoryFilter />
          </Suspense>

          {fetchError ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-6 bg-rose-50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              </div>
              <p className="text-slate-500 text-lg">{fetchError}</p>
            </div>
          ) : properties.length > 0 ? (
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
