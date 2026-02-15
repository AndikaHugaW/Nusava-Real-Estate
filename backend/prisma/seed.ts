/// <reference types="node" />
import { PrismaClient, PropertyStatus, PropertyType } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Try to find the user from the screenshot (Fushiguro)
  let mainUser = await prisma.user.findUnique({
    where: { email: 'andikahuga@gmail.com' }
  });

  // If not found, create/upsert the default agent
  if (!mainUser) {
    mainUser = await prisma.user.upsert({
      where: { email: 'agent@nusava.com' },
      update: {},
      create: {
        email: 'agent@nusava.com',
        password: 'password123',
        name: 'Budi Santoso',
        phone: '08123456789',
        role: 'AGENT',
      },
    });
  }

  const agent = mainUser;

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
          { url: '/uploads/property-1771174747646-330409659.jpeg', isPrimary: true },
          { url: '/uploads/property-1771175040632-398665186.jpg' }
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
          { url: '/uploads/property-1771175040632-398665186.jpg', isPrimary: true }
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
          { url: '/uploads/property-1771174747646-330409659.jpeg', isPrimary: true }
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
          { url: '/uploads/property-1771175040632-398665186.jpg', isPrimary: true }
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
          { url: '/uploads/property-1771174747646-330409659.jpeg', isPrimary: true }
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
          { url: '/uploads/property-1771175040632-398665186.jpg', isPrimary: true }
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
          { url: '/uploads/property-1771174747646-330409659.jpeg', isPrimary: true }
        ]
      }
    }
  ];

  console.log('Cleaning up old data...');
  await prisma.favorite.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.inquiry.deleteMany({});
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

  // Create some sample inquiries and transactions for the dashboard
  console.log('Seeding sample inquiries...');
  const firstProp = await prisma.property.findFirst();
  const sampleUser = await prisma.user.findFirst({ where: { role: 'USER' } }) || await prisma.user.create({
    data: {
      email: 'buyer@example.com',
      password: 'password123',
      name: 'John Doe',
      role: 'USER'
    }
  });

  if (firstProp && sampleUser) {
    console.log('Seeding multiple inquiries...');
    const allProps = await prisma.property.findMany();
    const buyers = [
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Sarah Wilson', email: 'sarah@example.com' },
      { name: 'Michael Chen', email: 'michael@example.com' },
      { name: 'Aaliyah Lovato', email: 'aaliyah@example.com' }
    ];

    for (const p of allProps) {
      const buyer = buyers[Math.floor(Math.random() * buyers.length)];
      let buyerUser = await prisma.user.findUnique({ where: { email: buyer.email } });
      if (!buyerUser) {
        buyerUser = await prisma.user.create({
          data: { ...buyer, password: 'password123', role: 'USER' }
        });
      }

      await prisma.inquiry.create({
        data: {
          message: `Interested in ${p.title}. Can I get more details?`,
          userId: buyerUser.id,
          propertyId: p.id,
          status: 'PENDING'
        }
      });
    }

    console.log('Seeding sample transactions...');
    await prisma.transaction.create({
      data: {
        amount: 8500000000,
        status: 'COMPLETED',
        type: 'PROPERTY_PURCHASE',
        userId: agent.id,
        propertyId: firstProp.id,
        paymentMethod: 'BANK_TRANSFER'
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
