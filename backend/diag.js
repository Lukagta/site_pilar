import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("Connecting...");
    const doctors = await prisma.doctor.findMany();
    console.log(doctors.map(d => ({ name: d.name, isActive: d.isActive, imagePath: d.imagePath })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
