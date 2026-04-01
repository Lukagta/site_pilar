#!/bin/sh
set -e

echo "Rodando migrations do banco..."
npx prisma migrate deploy

echo "Iniciando o servidor..."
exec npm start
