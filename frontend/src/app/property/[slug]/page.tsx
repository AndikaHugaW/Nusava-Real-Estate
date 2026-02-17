import { getProperty, getProperties, getAgents } from '@/lib/api';
export const revalidate = 0;
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import InquiryForm from '@/components/InquiryForm';
import WishlistButton from '@/components/WishlistButton';
import PropertyGrid from '@/components/PropertyGrid';
import ROICalculator from '@/components/ROICalculator';

export default async function PropertyDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const getImageUrl = (url: string) => {
    if (!url) return '/placeholder-property.jpg';
    if (url.startsWith('http')) return url;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
  };
  
  let property;
  let recommendations = { properties: [] };
  let topAgents = [];

  try {
    property = await getProperty(slug);
    const recData = await getProperties({ limit: 4 });
    recommendations = recData;
    topAgents = await getAgents();
  } catch (error) {
    console.error(error);
    notFound();
  }

  const primaryImage = property.images.find((img: any) => img.isPrimary)?.url || property.images[0]?.url;

  return (
    <div className="min-h-screen bg-white pt-32 pb-32">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 mb-16 font-display tracking-tight">
          {property.title}
        </h1>

        {/* Hero Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          {/* Left: Main Image */}
          <div className="lg:col-span-8 relative rounded-[4rem] overflow-hidden min-h-[500px] lg:min-h-none h-full shadow-2xl border border-slate-100 bg-slate-50">
            <img 
              src={getImageUrl(primaryImage)} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Info Card */}
          <div className="lg:col-span-4 bg-white rounded-[3.5rem] p-10 lg:p-11 shadow-2xl flex flex-col border border-slate-50">
            {/* Address & Save */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900 mb-1 leading-tight pr-4">{property.address},</h2>
                <p className="text-slate-400 font-medium text-base">{property.city}, {property.state}</p>
              </div>
              <WishlistButton propertyId={property.id} />
            </div>

            {/* Property Stats */}
            <div className="flex items-center gap-10 mb-10">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 leading-none mb-1.5">{property.bedrooms}</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">beds</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 leading-none mb-1.5">{property.bathrooms}</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">baths</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 leading-none mb-1.5">{property.area}</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">sqft</span>
              </div>
            </div>

            {/* Price section */}
            <div className="flex items-center justify-between mb-10 py-6 border-y border-slate-50">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">Price</span>
                <span className="text-2xl font-bold text-slate-900 tracking-tight">
                  Rp {property.price.toLocaleString('id-ID')}
                </span>
              </div>
              <button className="px-5 py-2.5 rounded-full border border-slate-100 text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-sm">
                <span className="whitespace-nowrap">Split options</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Agent Info Area */}
            <div className="bg-slate-50/50 border border-slate-100 rounded-[2.5rem] p-5 mb-8 mt-auto">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                    <img 
                      src={property.agent.avatar ? getImageUrl(property.agent.avatar) : `https://ui-avatars.com/api/?name=${property.agent.name}`} 
                      alt={property.agent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 leading-tight truncate">{property.agent.name}</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Property Expert</p>
                  </div>
                </div>
                <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm whitespace-nowrap">
                  Contact
                </button>
              </div>
            </div>

            {/* Request a tour button */}
            <button className="w-full bg-[#0f172a] hover:bg-black text-white font-bold py-6 rounded-[2rem] transition-all shadow-xl shadow-slate-200/20 flex flex-col items-center group active:scale-[0.98]">
              <span className="text-lg tracking-tight font-display">Request a tour</span>
              <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-1.5 group-hover:text-white/60 transition-colors">Earliest at 11:00 tomorrow</span>
            </button>
          </div>
        </div>

        {/* Integrated Search Bar (Under Hero) */}
        <div className="bg-white rounded-3xl lg:rounded-full p-3 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.08)] mb-32 border border-slate-100 flex flex-col lg:flex-row items-center w-full">
          {/* Location */}
          <div className="flex-[1.2] w-full flex items-center gap-5 px-8 py-4 border-b lg:border-b-0 lg:border-r border-slate-50 hover:bg-slate-50/50 transition-all cursor-pointer group lg:rounded-l-full">
            <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 flex-shrink-0">
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
              <p className="text-slate-900 font-bold text-base truncate">{property.city}, {property.state}</p>
            </div>
          </div>

          {/* Type */}
          <div className="flex-1 w-full flex items-center gap-5 px-8 py-4 border-b lg:border-b-0 lg:border-r border-slate-50 hover:bg-slate-50/50 transition-all cursor-pointer group">
            <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 flex-shrink-0">
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
               </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Property type</p>
              <p className="text-slate-900 font-bold text-base">{property.type}</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex-[1.2] w-full flex items-center gap-5 px-8 py-4 border-b lg:border-b-0 lg:border-r border-slate-50 hover:bg-slate-50/50 transition-all cursor-pointer group">
            <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 flex-shrink-0">
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Price</p>
              <p className="text-slate-900 font-bold text-base">Rp {property.price.toLocaleString('id-ID')}</p>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="flex-1 w-full flex items-center gap-5 px-8 py-4 border-b lg:border-b-0 lg:border-r border-slate-50 hover:bg-slate-50/50 transition-all cursor-pointer group">
            <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 flex-shrink-0">
               <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001-1m-6 0h6" />
               </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Bedrooms</p>
              <p className="text-slate-900 font-bold text-base">{property.bedrooms}</p>
            </div>
          </div>

          {/* More and Search */}
          <div className="w-full lg:w-auto flex items-center justify-between lg:justify-start gap-6 pl-8 pr-3 py-2">
            <div className="flex items-center gap-3 cursor-pointer text-slate-400 hover:text-slate-900 transition-all group">
              <svg className="w-7 h-7 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m12 4a2 2 0 100-4m0 4a2 2 0 110-4m-6 8v-2m-6 0v-2m12 0v-2" />
              </svg>
              <span className="font-bold text-base text-slate-400 group-hover:text-slate-900 transition-colors">More</span>
            </div>
            <button className="bg-[#0f172a] text-white px-10 py-5 rounded-full font-bold hover:bg-black transition-all shadow-lg text-lg whitespace-nowrap active:scale-95">
              Search
            </button>
          </div>
        </div>


        {/* Property Description */}
        <div className="mb-32">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-[0.3em] mb-10 border-b border-slate-100 pb-6 w-full opacity-60">
            About This Property
          </h2>
          <div className="max-w-4xl mb-24">
            <p className="text-slate-600 text-2xl font-light leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            {/* Features */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.3em] mb-10 opacity-60">Premium Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {property.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-5 p-7 bg-slate-50 rounded-[2.5rem] border border-slate-100 group hover:border-slate-200 transition-all hover:bg-slate-100">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                    <span className="text-slate-900 font-semibold text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              {/* ROI Calculator - directly below features */}
              <ROICalculator price={property.price} />
            </div>

            {/* Investor Intelligence */}
            <div className="bg-white rounded-[4rem] p-12 text-slate-900 shadow-2xl relative overflow-hidden">
               {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              
              <h3 className="text-2xl font-bold mb-10 flex items-center gap-3 text-slate-900 relative z-10">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                Investor Intel
              </h3>
              
              <div className="space-y-10 relative z-10">
                <div className="flex justify-between items-end border-b border-slate-100 pb-6 group cursor-default">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">ROI Estimation</p>
                    <p className="text-4xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">{property.roiEstimation || 0}%</p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Annual Return</p>
                </div>
                <div className="flex justify-between items-end border-b border-slate-100 pb-6 group cursor-default">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Rental Yield</p>
                    <p className="text-4xl font-bold text-blue-600 tracking-tight">{property.rentalYield || 0}%</p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Avg. Yearly</p>
                </div>
                <div className="flex justify-between items-end group cursor-default">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Area Growth</p>
                    <p className="text-4xl font-bold text-green-600 tracking-tight">+{property.areaGrowth || 0}%</p>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">5 Year Trend</p>
                </div>

                {/* Nearby Places Section */}
                {property.nearbyPlaces && Object.keys(property.nearbyPlaces as object).length > 0 && (
                  <div className="pt-10 mt-10 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Nearby Locations</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(property.nearbyPlaces as object).map(([place, distance]) => (
                        <div key={place} className="flex justify-between items-center p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
                          <span className="text-[11px] font-bold text-slate-900 capitalize">{place}</span>
                          <span className="text-[11px] font-bold text-blue-600">{distance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* New CTA Section: Inquiry & Agent */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start mt-16">
            <div className="lg:col-span-7">
              <h2 className="text-5xl font-bold text-slate-900 mb-8 font-display tracking-tight leading-tight">
                Secure your investment <br /> 
                <span className="text-slate-300">Talk to our expert today.</span>
              </h2>
              <p className="text-slate-500 text-xl font-light leading-relaxed mb-12 max-w-xl">
                Our property specialists are ready to provide you with detailed ROI breakdowns, 
                area analysis, and private tour arrangements for this property.
              </p>
              
              <div className="flex flex-wrap gap-8 items-center p-8 bg-slate-50 rounded-[3rem] border border-slate-100 shadow-sm inline-flex">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-xl">
                    <img 
                      src={property.agent.avatar ? getImageUrl(property.agent.avatar) : `https://ui-avatars.com/api/?name=${property.agent.name}`} 
                      alt={property.agent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{property.agent.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Listing Agent</p>
                  </div>
                </div>
                <div className="h-12 w-px bg-slate-200 hidden sm:block"></div>
                <div className="space-y-1">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Direct Contact</p>
                   <p className="text-lg font-bold text-slate-900">{property.agent.phone || '+62 812-3456-7890'}</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <InquiryForm propertyId={property.id} agentName={property.agent.name} />
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.3em] mb-12 opacity-60">Property Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {property.images.map((img: any, index: number) => (
                <div key={index} className="relative aspect-[16/11] rounded-[3.5rem] overflow-hidden border border-slate-100 group shadow-2xl transition-all bg-slate-50">
                  <img 
                    src={getImageUrl(img.url)} 
                    alt={`${property.title} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Properties */}
        <div className="mb-40">
          <h2 className="text-5xl font-bold text-slate-900 mb-16 font-display tracking-tight">
            Recommended properties for you
          </h2>
          <PropertyGrid 
            properties={recommendations.properties?.filter((p: any) => p.id !== property.id).slice(0, 3)} 
          />
        </div>

        {/* Top Agents Section (Image 2) */}
        <div className="mb-24">
           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-20">
              <div className="max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 font-display tracking-tight leading-tight">
                  Sell with top agents
                </h2>
                <p className="text-slate-600 text-2xl font-medium leading-relaxed opacity-80">
                  Skip the hustle and let our pros handle everything effortlessly.
                </p>
              </div>
              <Link href="/agents" className="inline-flex items-center gap-5 px-12 py-6 bg-white border border-slate-200 rounded-full font-bold text-slate-900 hover:bg-black hover:border-black hover:text-white transition-all shadow-2xl text-xl">
                Top Agents 
                <svg className="w-6 h-6 transition-transform hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
             {topAgents.map((agent: any) => (
               <div key={agent.id} className="bg-white rounded-[4rem] p-10 border border-slate-100 shadow-2xl hover:-translate-y-3 transition-all duration-500 text-center group">
                 <div className="relative w-32 h-32 mx-auto mb-8">
                   <img 
                     src={agent.avatar ? getImageUrl(agent.avatar) : `https://ui-avatars.com/api/?name=${agent.name}`} 
                     alt={agent.name}
                     className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-105"
                   />
                   <div className="absolute -top-2 -right-2 bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-slate-50">
                     <span className="text-sm font-bold">5.0</span>
                     <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                   </div>
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{agent.name}</h3>
                 <p className="text-slate-400 text-base font-bold uppercase tracking-widest mb-10">
                   {agent._count?.properties || 453} Properties Sold
                 </p>
                 <button className="w-full py-5 bg-white border border-slate-100 rounded-full font-bold text-slate-700 hover:bg-slate-900 hover:text-white transition-all shadow-sm active:scale-95">
                   Contact
                 </button>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}

