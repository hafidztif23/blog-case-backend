require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models");

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/posts", require("./routes/post.routes"));

app.get("/", (req, res) => {
  res.send(`
    <h2>Blog Case API</h2>
    <p>Berikut daftar endpoint yang tersedia:</p>
    <ul>
      <li><b>POST</b> /api/auth/register – Register user</li>
      <li><b>POST</b> /api/auth/login – Login user</li>
      <li><b>GET</b> /api/posts – Lihat semua post</li>
      <li><b>GET</b> /api/posts/:id – Lihat post berdasarkan ID</li>
      <li><b>POST</b> /api/posts – Buat post (login required)</li>
      <li><b>PUT</b> /api/posts/:id – Update post (login & author only)</li>
      <li><b>DELETE</b> /api/posts/:id – Hapus post (login & author only)</li>
    </ul>
    <p>Gunakan Insomnia/Postman untuk mengakses endpoint ini.</p>
  `);
});

if (process.env.NODE_ENV !== "test") {
    // Database sync
    db.sequelize.sync().then(() => {
        // Start server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    });
}

module.exports = app;
