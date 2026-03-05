import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- INICIANDO SERVIDOR PILAR (RESILIENTE) ---');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3002;

// Middleware de CORS manual para evitar problemas de carregamento de pacotes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.use(express.json());

// Servir arquivos estáticos (fotos de médicos)
const UPLOADS_PATH = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(UPLOADS_PATH)) {
    fs.mkdirSync(UPLOADS_PATH, { recursive: true });
}
app.use('/uploads', express.static(UPLOADS_PATH));

// Rota de configuração para o site
app.get('/api/config', async (req, res) => {
    try {
        const configs = await prisma.siteConfig.findMany();
        const configMap = configs.reduce((acc: Record<string, string>, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});

        const defaultConfigs = {
            whatsapp: '21971571603',
            instagram: 'https://instagram.com',
            facebook: 'https://facebook.com',
            address: 'Rua Dr. Pereira dos Santos, 107, Sala 1113, Centro, Itaboraí - RJ, CEP 24800-041',
        };

        res.json({ ...defaultConfigs, ...configMap });
    } catch (error) {
        console.error('Erro ao buscar configurações:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// --- ROTAS DE MÉDICOS ---

// Listar médicos (Público - apenas ativos)
app.get('/api/doctors', async (req, res) => {
    try {
        const doctors = await prisma.doctor.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' }
        });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar médicos' });
    }
});

// Listar médicos (Admin - todos)
app.get('/api/admin/doctors', async (req, res) => {
    try {
        const doctors = await prisma.doctor.findMany({
            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
        });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar médicos (admin)' });
    }
});

// Buscar um médico (Admin)
app.get('/api/admin/doctors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await prisma.doctor.findUnique({ where: { id: parseInt(id) } });
        if (!doctor) return res.status(404).json({ error: 'Médico não encontrado' });
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar médico' });
    }
});

// Criar médico com upload de foto (USANDO IMPORT DINÂMICO)
app.post('/api/admin/doctors', async (req, res) => {
    try {
        const multer = (await import('multer')).default;
        const sharp = (await import('sharp')).default;

        const upload = multer({ storage: multer.memoryStorage() }).single('image');

        upload(req, res, async (err) => {
            if (err) return res.status(500).json({ error: 'Erro no upload' });

            const { name, crm, specialty, description, fullDescription, order, accessCode } = req.body;
            if (!req.file) return res.status(400).json({ error: 'Imagem é obrigatória' });

            const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
            const filePath = path.join(UPLOADS_PATH, fileName);

            await sharp(req.file.buffer)
                .resize(600, 800, { fit: 'cover' })
                .webp({ quality: 80 })
                .toFile(filePath);

            const doctor = await prisma.doctor.create({
                data: {
                    name, crm, specialty, description, fullDescription,
                    order: parseInt(order) || 0,
                    imagePath: `/uploads/${fileName}`,
                    isActive: true,
                    accessCode: accessCode || null
                }
            });
            res.json(doctor);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar médico' });
    }
});

// Atualizar médico
app.put('/api/admin/doctors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const multer = (await import('multer')).default;
        const sharp = (await import('sharp')).default;

        const upload = multer({ storage: multer.memoryStorage() }).single('image');

        upload(req, res, async (err) => {
            if (err) return res.status(500).json({ error: 'Erro no upload' });

            const { name, crm, specialty, description, fullDescription, order, isActive, accessCode, isProfessional } = req.body;

            const updateData: any = {
                name, crm, specialty, description, fullDescription,
                order: parseInt(order) || 0,
                isActive: isActive === 'true' || isActive === true,
                accessCode: accessCode || undefined
            };

            // Regra: Profissional não pode mudar a foto
            if (req.file && isProfessional !== 'true') {
                const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
                const filePath = path.join(UPLOADS_PATH, fileName);

                await sharp(req.file.buffer)
                    .resize(600, 800, { fit: 'cover' })
                    .webp({ quality: 80 })
                    .toFile(filePath);

                updateData.imagePath = `/uploads/${fileName}`;
            }

            const doctor = await prisma.doctor.update({
                where: { id: parseInt(id) },
                data: updateData
            });
            res.json(doctor);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar médico' });
    }
});

// Atualizar status de ativação
app.patch('/api/admin/doctors/:id/toggle', async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await prisma.doctor.findUnique({ where: { id: parseInt(id) } });
        if (!doctor) return res.status(404).json({ error: 'Médico não encontrado' });

        const updated = await prisma.doctor.update({
            where: { id: parseInt(id) },
            data: { isActive: !doctor.isActive }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao alterar status' });
    }
});

// Deletar médico
app.delete('/api/admin/doctors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await prisma.doctor.findUnique({ where: { id: parseInt(id) } });
        if (doctor && doctor.imagePath) {
            const fullPath = path.join(__dirname, '../public', doctor.imagePath);
            if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        }
        await prisma.doctor.delete({ where: { id: parseInt(id) } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar médico' });
    }
});

// --- ROTA DE LOGIN PROFISSIONAL ---
app.post('/api/doctors/login', async (req, res) => {
    try {
        const { crm, accessCode } = req.body;
        const doctor = await prisma.doctor.findFirst({
            where: { crm, accessCode }
        });

        if (!doctor) return res.status(401).json({ error: 'CRM ou Código de Acesso inválidos' });

        res.json({ success: true, doctorId: doctor.id, name: doctor.name });
    } catch (error) {
        res.status(500).json({ error: 'Erro no login profissional' });
    }
});

// --- ROTAS DE CONFIGURAÇÃO (ADMIN) ---

// Atualizar configurações de texto
app.post('/api/admin/config', async (req, res) => {
    try {
        const { configs } = req.body; // Array de { key, value }

        for (const item of configs) {
            await prisma.siteConfig.upsert({
                where: { key: item.key },
                update: { value: item.value },
                create: { key: item.key, value: item.value }
            });
        }

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar configurações' });
    }
});

// Upload de Logo
app.post('/api/admin/config/logo', async (req, res) => {
    try {
        const multer = (await import('multer')).default;
        const sharp = (await import('sharp')).default;

        const upload = multer({ storage: multer.memoryStorage() }).single('logo');

        upload(req, res, async (err) => {
            if (err) return res.status(500).json({ error: 'Erro no upload da logo' });
            if (!req.file) return res.status(400).json({ error: 'Arquivo de logo é obrigatório' });

            const fileName = `logo-${Date.now()}.webp`;
            const filePath = path.join(UPLOADS_PATH, fileName);

            // Logo geralmente precisa de transparência e tamanho controlado
            await sharp(req.file.buffer)
                .resize(400, 200, { fit: 'inside' })
                .webp({ quality: 90 })
                .toFile(filePath);

            const logoPath = `/uploads/${fileName}`;

            await prisma.siteConfig.upsert({
                where: { key: 'logo' },
                update: { value: logoPath },
                create: { key: 'logo', value: logoPath }
            });

            res.json({ success: true, logoPath });
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar logo' });
    }
});

app.get('/', (req, res) => res.send('API Pilar Ativa'));

app.listen(PORT, () => {
    console.log(`--- SERVIDOR RODANDO NA PORTA ${PORT} ---`);
});
