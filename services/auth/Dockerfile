FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# --- THÊM DÒNG NÀY ---
# Cài đặt OpenSSL và thư viện tương thích cho Alpine
RUN apk add --no-cache openssl libc6-compat

RUN npm install --legacy-peer-deps --silent

COPY . .

# Generate Prisma Client (Lệnh này sẽ tự nhận diện OpenSSL vừa cài)
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:dev"]