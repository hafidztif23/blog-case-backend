const db = require("../models");
const Post = db.Post;

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.userId;

    const post = await Post.create({ content, authorId: userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: ["author"] });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, { include: ["author"] });
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.authorId !== req.userId)
      return res.status(403).json({ message: "Forbidden: not your post" });

    post.content = req.body.content || post.content;
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.authorId !== req.userId)
      return res.status(403).json({ message: "Forbidden: not your post" });

    await post.destroy();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
