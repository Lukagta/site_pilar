import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backupDir = path.join(__dirname, 'backups');
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFile = path.join(backupDir, `backup-${timestamp}.sql`);

const connectionString = process.env.DATABASE_URL || "postgresql://usuario:senha@localhost:5432/pilar_landing_db?schema=public";

const command = `pg_dump "${connectionString}" -F p -f "${backupFile}"`;

console.log('Iniciando backup do banco de dados Pilar Medicina...');

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Erro ao realizar backup: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`Aviso do pg_dump: ${stderr}`);
    }
    console.log(`✅ Backup realizado com sucesso em: ${backupFile}`);
});
