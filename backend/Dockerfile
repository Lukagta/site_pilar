FROM node:20-alpine

# Instalar openssl para o Prisma funcionar corretamente
RUN apk add --no-cache openssl

WORKDIR /app

RUN npm install -g typescript ts-node prisma

COPY package*.json ./

RUN npm install

COPY . .

# Generate prisma client
RUN npx prisma generate

# Compilar Typescript
RUN npm run build

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3015

ENTRYPOINT ["./entrypoint.sh"]
