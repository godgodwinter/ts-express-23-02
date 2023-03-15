# Menggunakan image node.js terbaru
FROM node:latest

# Membuat direktori kerja
WORKDIR /app

# Menyalin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstall dependencies
RUN npm install

# Menyalin semua file ke direktori kerja
COPY . .

# Menjalankan perintah untuk membangun aplikasi
RUN yarn build

# Mengatur port yang digunakan
EXPOSE 1001

# Menjalankan aplikasi
CMD ["node", "build/index.js"]