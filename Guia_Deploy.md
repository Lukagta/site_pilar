# Guia de Deploy - Pilar Medicina Integrada

Este documento contém as instruções para manter e atualizar o projeto `site_pilar` na VPS.

## 🚀 Informações de Acesso
- **IP do Servidor:** `72.61.38.9`
- **Diretório do Projeto:** `/root/site_pilar`
- **Porta Backend:** `3015`
- **Porta Frontend:** `5185`

---

## 🔄 Fluxo de Atualização (Deploy)

Sempre que você fizer alterações no código local e enviar para o GitHub, siga estes passos para atualizar a VPS:

### 1. Enviar alterações para o GitHub (Local)
```bash
git add .
git commit -m "Descrição das alterações"
git push origin main
```

### 2. Atualizar a VPS (Remoto)
Conecte-se à VPS e puxe as alterações:
```bash
ssh -i C:\Users\drlui\.ssh\pilar_windows root@72.61.38.9
cd /root/site_pilar
git pull origin main
```

### 3. Reiniciar os serviços
Se houver alterações no **Backend**:
```bash
cd /root/site_pilar/backend
npm install
npx prisma generate
pm2 restart pilar-backend
```

Se houver alterações no **Frontend**:
```bash
cd /root/site_pilar/frontend
npm install
npm run build
pm2 restart pilar-frontend
```

---

## 🛠️ Comandos Úteis do PM2

O PM2 gerencia os processos para que o site não caia.
- **Ver status:** `pm2 status`
- **Ver logs em tempo real:** `pm2 logs`
- **Reiniciar tudo:** `pm2 restart all`
- **Parar um serviço:** `pm2 stop pilar-backend`

---

## ⚠️ Observações Importantes
- **Não altere outros projetos**: Os projetos como `plantao-save` rodam em Docker. Este projeto (`site_pilar`) roda nativamente com Node.js para garantir total independência.
- **Variáveis de Ambiente**: Se precisar alterar a URL da API ou a conexão com o banco, os arquivos `.env` estão nas pastas `backend/` e `frontend/`.
