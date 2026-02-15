import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const props = await prisma.property.findMany({ select: { title: true, agentId: true } });
  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true } });
  
  console.log('--- PROPERTIES ---');
  console.log(JSON.stringify(props, null, 2));
  console.log('--- USERS ---');
  console.log(JSON.stringify(users, null, 2));
}

check().finally(() => prisma.$disconnect());
