const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load model
db.User = require("./user.model")(sequelize, DataTypes);
db.Post = require("./post.model")(sequelize, DataTypes);

// Relasi
db.User.hasMany(db.Post, { foreignKey: "authorId", as: "posts" });
db.Post.belongsTo(db.User, { foreignKey: "authorId", as: "author" });

module.exports = db;
