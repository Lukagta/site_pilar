import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Testando conexão com o banco...');
        const doctors = await prisma.doctor.findMany();
        console.log('Conexão OK! Médicos encontrados:', doctors.length);
    } catch (err) {
        console.error('ERRO NA CONEXÃO:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
