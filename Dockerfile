# Menggunakan image node.js versi 20.9.0
FROM node:20.9.0
# Menggunakan image node.js terbaru
# FROM node:latest

RUN npm install -g pm2

# Membuat direktori kerja
WORKDIR /app

# Menyalin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstall dependencies
RUN npm install
# RUN npm install --production

# Menyalin semua file ke direktori kerja
COPY . .

# Menjalankan perintah untuk membangun aplikasi
RUN yarn build

# Mengatur port yang digunakan
EXPOSE 1001

# Menjalankan aplikasi
# CMD ["node", "build/index.js"]

CMD ["pm2-runtime", "start", "pm2.config.js"]