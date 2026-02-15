import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const properties = await prisma.property.count();
  const inquiries = await prisma.inquiry.count();
  const users = await prisma.user.count();
  const agents = await prisma.user.count({ where: { role: 'AGENT' } });
  
  console.log('--- DATABASE CHECK ---');
  console.log('Total Properties:', properties);
  console.log('Total Inquiries:', inquiries);
  console.log('Total Users:', users);
  console.log('Total Agents:', agents);
  
  if (properties > 0) {
    const latestProps = await prisma.property.findMany({ take: 5, include: { images: true } });
    console.log('Latest Properties Titles:', latestProps.map(p => p.title));
  }
}

check().finally(() => prisma.$disconnect());
