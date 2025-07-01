require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./models");

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/posts", require("./routes/post.routes"));

if (process.env.NODE_ENV !== "test") {
    // Database sync
    db.sequelize.sync().then(() => {
        // Start server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    });
}

module.exports = app;
