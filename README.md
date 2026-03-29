# Site Pilar Medicina Integrada - v1.0.0

Este projeto consiste no site institucional da Pilar Medicina, incluindo um painel administrativo para gestão do corpo clínico.

## 🏗 Estrutura do Projeto

O repositório está dividido em duas partes principais:

- `/frontend`: Aplicação React (Vite, Tailwind CSS, Framer Motion)
- `/backend`: API Node.js (Express, Prisma, PostgreSQL, Sharp)

## 🚀 Como Executar

### 1. Requisitos
- Node.js instalado
- Banco de dados PostgreSQL (configurado no `.env` do backend)

### 2. Backend
```bash
cd backend
npm install
npm run dev
```
A API rodará na porta **3015**.

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
O site estará acessível em [http://localhost:5185](http://localhost:5185).

## 🔐 Painel Administrativo

Acesse a área administrativa para gerenciar os médicos do corpo clínico:
- **URL**: [http://localhost:5185/admin/login](http://localhost:5185/admin/login)
- **Credenciais de Teste**: `admin` / `admin123`

## 📦 Versionamento
Esta versão foi salva utilizando **Git**. Você pode usar `git log` para ver o histórico ou criar novas branches para futuras funcionalidades.

---
*Desenvolvido por Antigravity AI em colaboração com o usuário.*
