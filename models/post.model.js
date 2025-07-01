module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Post;
};