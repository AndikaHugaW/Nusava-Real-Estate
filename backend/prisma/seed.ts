/// <reference types="node" />
import { PrismaClient, PropertyStatus, PropertyType } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create an agent first
  const agent = await prisma.user.upsert({
    where: { email: 'agent@nusava.com' },
    update: {},
    create: {
      email: 'agent@nusava.com',
      password: 'password123', // In real app, this should be hashed
      name: 'Budi Santoso',
      phone: '08123456789',
      role: 'AGENT',
    },
  });

  const properties = [
    {
      title: 'Modern Villa with Rice Field View',
      description: 'A beautiful modern villa located in the heart of Canggu with stunning sunset views over the rice fields.',
      price: 8500000000,
      type: PropertyType.VILLA,
      status: PropertyStatus.PUBLISHED,
      address: 'Jl. Raya Canggu No. 12',
      city: 'Badung',
      state: 'Bali',
      zipCode: '80361',
      bedrooms: 4,
      bathrooms: 4,
      area: 350.5,
      features: ['Private Pool', 'Rice Field View', 'Fully Furnished', 'Security 24/7'],
      roiEstimation: 12.5,
      rentalYield: 8.2,
      areaGrowth: 15.0,
      nearbyPlaces: { "Beach": "5 min", "Restaurant": "2 min", "Supermarket": "10 min" },
      isFeatured: true,
      slug: 'modern-villa-rice-field-view',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200', isPrimary: true },
          { url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200' }
        ]
      }
    },
    {
      title: 'Luxury Apartment in CBD',
      description: 'Exclusive 3-bedroom apartment with panoramic city views and world-class amenities.',
      price: 4200000000,
      type: PropertyType.APARTMENT,
      status: PropertyStatus.PUBLISHED,
      address: 'Sudirman Central Business District',
      city: 'Jakarta Selatan',
      state: 'DKI Jakarta',
      zipCode: '12190',
      bedrooms: 3,
      bathrooms: 2,
      area: 120.0,
      features: ['Gym', 'Swimming Pool', 'Smart Home System', 'Concierge'],
      roiEstimation: 7.5,
      rentalYield: 6.0,
      areaGrowth: 8.5,
      nearbyPlaces: { "MRT Station": "2 min", "Mall": "5 min", "Office Hub": "1 min" },
      isFeatured: false,
      slug: 'luxury-apartment-cbd',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200', isPrimary: true }
        ]
      }
    },
    {
      title: 'Tropical Garden House',
      description: 'Spacious family home with a large tropical garden and traditional Indonesian architecture elements.',
      price: 2800000000,
      type: PropertyType.HOUSE,
      status: PropertyStatus.PUBLISHED,
      address: 'Jl. Setiabudi Permai No. 45',
      city: 'Bandung',
      state: 'Jawa Barat',
      zipCode: '40154',
      bedrooms: 5,
      bathrooms: 3,
      area: 280.0,
      features: ['Garden', 'Gazebo', 'Carport 2 Cars', 'Storage'],
      roiEstimation: 6.5,
      rentalYield: 5.5,
      areaGrowth: 12.0,
      nearbyPlaces: { "School": "5 min", "Hospital": "10 min", "Cafe": "3 min" },
      isFeatured: false,
      slug: 'tropical-garden-house',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200', isPrimary: true }
        ]
      }
    },
    {
      title: 'Premium Duplex in Seminyak',
      description: 'Sleek duplex home with industrial design, perfect for digital nomads and young professionals.',
      price: 3500000000,
      type: PropertyType.DUPLEX,
      status: PropertyStatus.PUBLISHED,
      address: 'Jl. Petitenget No. 88',
      city: 'Badung',
      state: 'Bali',
      zipCode: '80361',
      bedrooms: 2,
      bathrooms: 2,
      area: 150.0,
      features: ['High Ceiling', 'Home Office', 'Fast Internet', 'Communal Pool'],
      roiEstimation: 10.0,
      rentalYield: 7.5,
      areaGrowth: 14.0,
      nearbyPlaces: { "Beach Club": "2 min", "Gym": "5 min", "Pharmacy": "5 min" },
      isFeatured: true,
      slug: 'premium-duplex-seminyak',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200', isPrimary: true }
        ]
      }
    },
    {
      title: 'Elite Townhouse Kemang',
      description: 'Sophisticated townhouse in a gated community, offering privacy and luxury in South Jakarta.',
      price: 7500000000,
      type: PropertyType.TOWNHOUSE,
      status: PropertyStatus.PUBLISHED,
      address: 'Kemang Villas Residance',
      city: 'Jakarta Selatan',
      state: 'DKI Jakarta',
      zipCode: '12730',
      bedrooms: 4,
      bathrooms: 3,
      area: 210.0,
      features: ['Private Security', 'Rooftop Terrace', 'Built-in Wardrobes', 'European Kitchen'],
      roiEstimation: 8.0,
      rentalYield: 6.5,
      areaGrowth: 10.0,
      nearbyPlaces: { "International School": "10 min", "Expat Grocery": "5 min", "Cafe District": "2 min" },
      isFeatured: false,
      slug: 'elite-townhouse-kemang',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1542314467-122e20fc842a?w=1200', isPrimary: true }
        ]
      }
    },
    {
      title: 'Zen Studio Apartment',
      description: 'Minimalist studio with maximized space utilization, ideal for solo living and high-yield rentals.',
      price: 1200000000,
      type: PropertyType.STUDIO,
      status: PropertyStatus.PUBLISHED,
      address: 'Podomoro City Park',
      city: 'Jakarta Barat',
      state: 'DKI Jakarta',
      zipCode: '11470',
      bedrooms: 1,
      bathrooms: 1,
      area: 35.0,
      features: ['Fully Furnished', 'Infinity Pool Access', 'Near Mall', 'Security System'],
      roiEstimation: 9.0,
      rentalYield: 8.5,
      areaGrowth: 7.0,
      nearbyPlaces: { "Mall Central Park": "1 min", "University": "10 min", "Toll Road": "5 min" },
      isFeatured: false,
      slug: 'zen-studio-apartment',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1536376074432-bf12177d4f4f?w=1200', isPrimary: true }
        ]
      }
    },
    {
      title: 'Modern Retail Space Ubud',
      description: 'High-visibility corner retail space in Ubud prime tourist area, perfect for galleries or boutiques.',
      price: 15000000000,
      type: PropertyType.COMMERCIAL,
      status: PropertyStatus.PUBLISHED,
      address: 'Jl. Monkey Forest No. 101',
      city: 'Gianyar',
      state: 'Bali',
      zipCode: '80571',
      bedrooms: 0,
      bathrooms: 2,
      area: 250.0,
      features: ['Prime Location', 'Glass Frontage', 'High Traffic', 'Private Parking'],
      roiEstimation: 15.0,
      rentalYield: 11.0,
      areaGrowth: 20.0,
      nearbyPlaces: { "Puri Ubud": "5 min", "Art Market": "2 min", "Tourism Hub": "1 min" },
      isFeatured: true,
      slug: 'modern-retail-space-ubud',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200', isPrimary: true }
        ]
      }
    }
  ];

  console.log('Cleaning up old properties...');
  await prisma.propertyImage.deleteMany({});
  await prisma.propertyView.deleteMany({});
  await prisma.property.deleteMany({});

  console.log('Seeding properties...');
  for (const property of properties) {
    await prisma.property.create({
      data: {
        ...property,
        agentId: agent.id
      }
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
