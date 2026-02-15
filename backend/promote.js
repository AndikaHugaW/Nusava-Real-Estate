const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.update({
        where: { email: 'andikahuga@gmail.com' },
        data: { role: 'ADMIN' }
    });
    console.log('Updated user:', user.name, 'to', user.role);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
