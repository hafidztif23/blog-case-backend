const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const verifyToken = require("../middleware/authJwt");

// Public routes
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);

// Protected routes (login required)
router.post("/", verifyToken, postController.createPost);
router.put("/:id", verifyToken, postController.updatePost);
router.delete("/:id", verifyToken, postController.deletePost);

module.exports = router;