FROM node:20-alpine

WORKDIR /app

# Instalar as dependências globalmente incluindo nodemon se necessário, typescript e prisma
RUN npm install -g typescript ts-node prisma

COPY package*.json ./

RUN npm install

COPY . .

# Generate prisma client
RUN npx prisma generate

# Compilar Typescript (o tsconfig.json deve estar configurado para emitir em `dist`)
RUN npm run build

# O banco e imgs estarao mapeados no volume
# RUN npx prisma migrate deploy

EXPOSE 3015

CMD ["npm", "start"]
