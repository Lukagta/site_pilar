# Guia de Deploy - Pilar Medicina Integrada

Este documento contém as instruções atualizadas para manter e atualizar o projeto `site_pilar` na VPS usando **Docker**.

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
Conecte-se à VPS via SSH, puxe as alterações e mande o Docker reconstruir os containers:
```bash
ssh -i C:\Users\drlui\.ssh\pilar_windows root@72.61.38.9
cd /root/site_pilar
git pull origin main

# Para reconstruir todo o projeto (Frontend e Backend):
docker compose up -d --build
```

---

## 🛠️ Comandos Úteis do Docker

O Docker orquestra os processos do site e também garante que ele recarregue se o servidor for reiniciado.
- **Ver status dos containers:** `docker ps`
- **Ver logs do backend:** `docker logs site_pilar_backend -f`
- **Ver logs do frontend:** `docker logs site_pilar_frontend -f`
- **Reiniciar os serviços:** `docker compose restart`
- **Pausar o site:** `docker compose down`

---

## ⚠️ Observações Importantes
- **Banco de Dados**: O banco SQLite (`dev.db`) e a pasta de `images` ficam mapeados como volumes para o backend. Eles **NÃO SÃO PERDIDOS** quando você atualiza ou reconstrói o container.
- **Gerenciador Hostinger**: Agora o projeto aparecerá no seu **Gerenciador Docker** no painel de controle da Hostinger, igual os outros sistemas (`pilar-system`, `plantao-save`, etc.).
