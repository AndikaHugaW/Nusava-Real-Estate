import { getProperty, getProperties } from '@/lib/api';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import InquiryForm from '@/components/InquiryForm';

export default async function PropertyDetailsPage({ params }: { params: Promise<{ slug: string }> }) {

  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const getImageUrl = (url: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800';
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000'}${url}`;
  };
  
  let property;
  try {
    property = await getProperty(slug);
  } catch (error) {
    notFound();
  }

  const primaryImage = property.images.find((img: any) => img.isPrimary)?.url || property.images[0]?.url;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <div className="relative h-[60vh] w-full">
        <Image 
          src={getImageUrl(primaryImage)} 
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-10 left-10 text-white">
          <h1 className="text-5xl font-bold mb-2">{property.title}</h1>
          <p className="text-xl opacity-90">{property.address}, {property.city}</p>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center border-b pb-6">
            <div className="flex gap-6 text-lg font-medium text-gray-600">
              <span>{property.bedrooms} Beds</span>
              <span>{property.bathrooms} Baths</span>
              <span>{property.area} m²</span>
              <span className="capitalize">{property.type.toLowerCase()}</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              Rp {property.price.toLocaleString('id-ID')}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Investor Intelligence Section */}
          <div className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Investor Intelligence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Estimated ROI</p>
                <p className="text-3xl font-bold text-blue-600">{property.roiEstimation || 0}%</p>
                <p className="text-xs text-gray-400 mt-2">Annual estimation</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Rental Yield</p>
                <p className="text-3xl font-bold text-green-600">{property.rentalYield || 0}%</p>
                <p className="text-xs text-gray-400 mt-2">Avg. yearly income</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Area Growth</p>
                <p className="text-3xl font-bold text-orange-600">+{property.areaGrowth || 0}%</p>
                <p className="text-xs text-gray-400 mt-2">Past 5 years</p>
              </div>
            </div>
          </div>

          {/* Nearby Places */}
          {property.nearbyPlaces && Object.keys(property.nearbyPlaces).length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Nearby Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(property.nearbyPlaces).map(([place, distance]: [string, any], index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">{place}</span>
                    <span className="text-blue-600 font-bold">{distance}</span>
                  </div>
                ))}
              </div>
            </div>
          )}


          <div>
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 gap-4">
              {property.images.map((img: any, index: number) => (
                <div key={index} className="relative aspect-video rounded-xl overflow-hidden group">
                  <Image 
                    src={getImageUrl(img.url)} 
                    alt={`${property.title} ${index + 1}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <InquiryForm propertyId={property.id} agentName={property.agent.name} />
        </div>

      </div>
    </div>
  );
}
