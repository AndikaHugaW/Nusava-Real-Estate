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
