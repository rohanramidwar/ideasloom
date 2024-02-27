import PostModel from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostModel({
    ...post,
    createdAt: new Date().toISOString(),
  });

  //user not logged in
  const userId = String(req.userId);
  if (!userId) return res.json({ message: "Unauthenticated" });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
