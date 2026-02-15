const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const count = await prisma.property.count();
    console.log('--- PROPERTY COUNT ---');
    console.log(count);

    if (count > 0) {
        const props = await prisma.property.findMany({
            include: { agent: true }
        });
        console.log('--- PROPERTIES ---');
        console.log(JSON.stringify(props, null, 2));
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
