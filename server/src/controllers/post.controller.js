const mongoose = require("mongoose");
const Post = require("../models/post.model");

async function getPost(req, res, next) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid post ID ❌");
    error.status = 400;
    return next(error);
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      const error = new Error("Post not found ❌");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({
      message: "Post retrieved successfully ✅",
      data: post,
    });
  } catch (error) {
    console.error(error);
    return next(new Error());
  }
}

async function getPosts(req, res, next) {
  const limit = req.query.limit || 10;
  try {
    const posts = await Post.find({}).limit(limit);
    return res.status(200).json({
      message: `${posts.length} posts retrieved successfully ✅`,
      data: posts,
    });
  } catch (error) {
    console.error(error);
    return next(new Error());
  }
}

async function createPost(req, res, next) {
  const { title, content } = req.body;

  const missingFields = [];
  if (!title) missingFields.push("title");
  if (!content) missingFields.push("content");
  if (missingFields.length > 0) {
    const error = new Error(`Missing required data: [${missingFields.join(",")}] ❌`);
    error.status = 400;
    return next(error);
  }

  try {
    const post = new Post({ ...req.body });
    await post.save();
    return res.status(201).json({ message: `Post created successfully (ID: ${post.id}) ✅` });
  } catch (error) {
    console.error(error);
    return next(new Error()); // just throw an internal server error
  }
}

module.exports = { getPost, getPosts, createPost };
