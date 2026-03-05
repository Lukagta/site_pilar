import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- DIAGNÓSTICO BACKEND ---');
console.log('__dirname:', __dirname);
console.log('CWD:', process.cwd());

const indexPath = path.join(__dirname, 'src', 'index.ts');
console.log('Procurando index em:', indexPath);
console.log('Existe?', fs.existsSync(indexPath));

if (fs.existsSync(indexPath)) {
    console.log('Conteúdo (primeiras 5 linhas):');
    const content = fs.readFileSync(indexPath, 'utf8');
    console.log(content.split('\n').slice(0, 5).join('\n'));
} else {
    console.log('ARQUIVO NÃO ENCONTRADO!');
    console.log('Arquivos em src:', fs.readdirSync(path.join(__dirname, 'src')));
}
