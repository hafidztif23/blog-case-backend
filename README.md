# Blog API with JWT Authentication

RESTful API sederhana untuk mengelola blog post dan user authentication menggunakan **Node.js**, **Express**, **Sequelize**, dan **MySQL**.

📄 [Dokumentasi API](https://gist.github.com/hafidztif23/1f286e9cd8b1e7ab77cda830fccad2af)

---

## Fitur

- Register dan Login user
- Enkripsi password dengan bcrypt
- Autentikasi JWT
- CRUD post oleh user yang sudah login
- Proteksi post hanya bisa diubah atau dihapus oleh author
- Unit test dengan Jest & Supertest

---

## Teknologi

- Node.js
- Express
- Sequelize ORM
- MySQL (XAMPP / MariaDB)
- BcryptJS
- JSON Web Token (JWT)
- Jest + Supertest

---

## Cara Menjalankan Project

### 1. **Clone repository**
```bash
git clone https://github.com/hafidztif23/blog-case-backend
cd blog-case-backend
```

### 2. **Install dependencies**
```bash
npm install
```

### 3. **Buat file .env**
File .env disimpan di root
```env
JWT_SECRET=supersecretkey123
```

Bisa juga ditambahkan config database, contoh:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=blog_db
```

### 4. Konfigurasi database
Sesuaikan `config/db.config.js`
```js
module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql"
};
```
Lalu buat database di MySQL
```sql
CREATE DATABASE blog_db;
```

### 5. Run server
```bash
npm run start:dev
```
