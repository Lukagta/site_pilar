import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- INICIANDO SERVIDOR PILAR (RESILIENTE) ---');

const app = express();

// Middleware de CORS manual para evitar problemas de carregamento de pacotes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.use(express.json());

const prisma = new PrismaClient();
// --- ROTAS DE ESPECIALIDADES ---

// Listar todas
app.get('/api/specialties', async (req, res) => {
    try {
        const specialties = await prisma.specialty.findMany({
            orderBy: { name: 'asc' }
        });
        res.json(specialties);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar especialidades' });
    }
});

// Criar nova
app.post('/api/specialties', async (req, res) => {
    try {
        const { name, description, icon } = req.body;
        const specialty = await prisma.specialty.create({
            data: {
                name,
                description: description || null,
                icon: icon || 'stethoscope'
            }
        });
        res.json(specialty);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Esta especialidade já está cadastrada.' });
        }
        res.status(500).json({ error: 'Erro ao criar especialidade' });
    }
});

// Atualizar
app.put('/api/specialties/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, icon } = req.body;
        const specialty = await prisma.specialty.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description: description || null,
                icon: icon || 'stethoscope'
            }
        });
        res.json(specialty);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar especialidade' });
    }
});

// Deletar
app.delete('/api/specialties/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar se há médicos vinculados
        const doctorsCount = await prisma.doctor.count({
            where: { specialtyId: parseInt(id) }
        });

        if (doctorsCount > 0) {
            return res.status(400).json({ error: 'Não é possível excluir uma especialidade com médicos vinculados.' });
        }

        await prisma.specialty.delete({
            where: { id: parseInt(id) }
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir especialidade' });
    }
});

const PORT = process.env.PORT || 3015;

// Servir arquivos estáticos (fotos)
const IMAGES_PATH = path.join(__dirname, '../public/images');
if (!fs.existsSync(IMAGES_PATH)) {
    fs.mkdirSync(IMAGES_PATH, { recursive: true });
}
app.use('/images', express.static(IMAGES_PATH));

// Rota de configuração para o site
app.get('/api/config', async (req, res) => {
    try {
        const configs = await prisma.siteConfig.findMany();
        const configMap = configs.reduce((acc: Record<string, any>, curr: any) => {
            acc[curr.key] = curr.value;
            if (curr.key === 'proximaVagaVisible') {
                acc[curr.key] = curr.value === 'true';
            }
            return acc;
        }, {});

        const defaultConfigs = {
            whatsapp: '21971571603',
            instagram: 'https://instagram.com',
            facebook: 'https://facebook.com',
            address: 'Rua Dr. Pereira dos Santos, 107, Sala 1113, Centro, Itaboraí - RJ, CEP 24800-041',
            nextAvailableDate: 'Hoje',
            nextAvailableTime: '14:30h',
            proximaVagaVisible: true
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
            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
            include: { specialtyRel: true }
        });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar médicos (admin)' });
    }
});

// Buscar um único médico (Público)
app.get('/api/doctors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await prisma.doctor.findUnique({
            where: { id: parseInt(id), isActive: true },
            include: { specialtyRel: true }
        });
        if (!doctor) return res.status(404).json({ error: 'Médico não encontrado' });
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar médico' });
    }
});

// Buscar um médico (Admin)
app.get('/api/admin/doctors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await prisma.doctor.findUnique({
            where: { id: parseInt(id) },
            include: { specialtyRel: true }
        });
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

            const { name, crm, specialty, specialtyId, description, fullDescription, order, accessCode } = req.body;
            if (!req.file) return res.status(400).json({ error: 'Imagem é obrigatória' });

            const doctor = await prisma.doctor.create({
                data: {
                    name, crm, specialty,
                    specialtyId: specialtyId ? parseInt(specialtyId) : null,
                    description, fullDescription,
                    order: parseInt(order) || 0,
                    imagePath: '',
                    isActive: true,
                    accessCode: accessCode || null
                }
            });

            const fileName = `doctor-${doctor.id}.webp`;
            const filePath = path.join(IMAGES_PATH, fileName);

            await sharp(req.file.buffer)
                .resize(600, 800, { fit: 'cover' })
                .webp({ quality: 80 })
                .toFile(filePath);

            const updatedDoctor = await prisma.doctor.update({
                where: { id: doctor.id },
                data: { imagePath: `/images/${fileName}` }
            });

            res.json(updatedDoctor);
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

            const { name, crm, specialty, specialtyId, description, fullDescription, order, isActive, accessCode, isProfessional } = req.body;

            const updateData: any = {
                name, crm, specialty,
                specialtyId: specialtyId ? parseInt(specialtyId) : undefined,
                description, fullDescription,
                order: parseInt(order) || 0,
                isActive: isActive === 'true' || isActive === true,
                accessCode: accessCode || undefined
            };

            // Regra: Profissional não pode mudar a foto
            if (req.file && isProfessional !== 'true') {
                const fileName = `doctor-${id}.webp`;
                const filePath = path.join(IMAGES_PATH, fileName);

                await sharp(req.file.buffer)
                    .resize(600, 800, { fit: 'cover' })
                    .webp({ quality: 80 })
                    .toFile(filePath);

                updateData.imagePath = `/images/${fileName}`;
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

// --- ROTAS DO BLOG (POSTS) ---

// Listar todos os posts (Público, ordenado por data)
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { updatedAt: 'desc' },
            include: {
                author: {
                    select: { name: true, specialty: true, imagePath: true }
                }
            }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar postagens' });
    }
});

// Buscar um único post
app.get('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: {
                author: {
                    select: { name: true, specialty: true, imagePath: true }
                }
            }
        });
        if (!post) return res.status(404).json({ error: 'Postagem não encontrada' });
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar postagem' });
    }
});

// Listar posts por autor (Admin/Profissional)
app.get('/api/posts/author/:authorId', async (req, res) => {
    try {
        const { authorId } = req.params;
        const posts = await prisma.post.findMany({
            where: { authorId: parseInt(authorId) },
            orderBy: { updatedAt: 'desc' },
            include: {
                author: {
                    select: { name: true, specialty: true, imagePath: true }
                }
            }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar postagens do autor' });
    }
});

// Criar Postagem (Admin/Profissional)
app.post('/api/posts', async (req, res) => {
    try {
        const multer = (await import('multer')).default;
        const sharp = (await import('sharp')).default;

        const upload = multer({ storage: multer.memoryStorage() }).single('image');

        upload(req, res, async (err) => {
            if (err) return res.status(500).json({ error: 'Erro no upload da imagem do post' });

            const { title, content, authorId } = req.body;
            const post = await prisma.post.create({
                data: {
                    title,
                    content,
                    authorId: parseInt(authorId)
                }
            });

            if (req.file) {
                const fileName = `post-${post.id}.webp`;
                const filePath = path.join(IMAGES_PATH, fileName);

                await sharp(req.file.buffer)
                    .resize(800, 600, { fit: 'cover' })
                    .webp({ quality: 80 })
                    .toFile(filePath);

                const updatedPost = await prisma.post.update({
                    where: { id: post.id },
                    data: { imagePath: `/images/${fileName}` }
                });
                return res.json(updatedPost);
            }

            res.json(post);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar postagem' });
    }
});

// Atualizar Postagem
app.put('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const multer = (await import('multer')).default;
        const sharp = (await import('sharp')).default;

        const upload = multer({ storage: multer.memoryStorage() }).single('image');

        upload(req, res, async (err) => {
            if (err) return res.status(500).json({ error: 'Erro no upload da imagem do post' });

            const { title, content } = req.body;
            const updateData: any = { title, content };

            if (req.file) {
                const fileName = `post-${id}.webp`;
                const filePath = path.join(IMAGES_PATH, fileName);

                await sharp(req.file.buffer)
                    .resize(800, 600, { fit: 'cover' })
                    .webp({ quality: 80 })
                    .toFile(filePath);

                updateData.imagePath = `/images/${fileName}`;
            }

            const post = await prisma.post.update({
                where: { id: parseInt(id) },
                data: updateData
            });
            res.json(post);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar postagem' });
    }
});

// Deletar Postagem
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
        if (post && post.imagePath) {
            const fullPath = path.join(__dirname, '../public', post.imagePath);
            if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        }
        await prisma.post.delete({ where: { id: parseInt(id) } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar postagem' });
    }
});

// Download de Postagem (TXT)
app.get('/api/posts/:id/download', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: { author: true }
        });

        if (!post) return res.status(404).json({ error: 'Post não encontrado' });

        const dateStr = new Date(post.updatedAt).toLocaleDateString('pt-BR');
        const content = `Título: ${post.title}\nAutor: ${post.author.name} (${post.author.specialty})\nData: ${dateStr}\n\n${post.content}`;

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Content-Disposition', `attachment; filename="post-${post.id}.txt"`);
        res.send(content);

    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar download' });
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

            const fileName = `logo.webp`;
            const filePath = path.join(IMAGES_PATH, fileName);

            // Logo geralmente precisa de transparência e tamanho controlado
            await sharp(req.file.buffer)
                .resize(400, 200, { fit: 'inside' })
                .webp({ quality: 90 })
                .toFile(filePath);

            const logoPath = `/images/${fileName}`;

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
