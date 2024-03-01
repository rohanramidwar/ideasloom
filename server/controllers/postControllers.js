import PostModel from "../models/postModel.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({})
      .populate("upVotes")
      .populate("downVotes")
      .exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  //user not logged in
  const userId = String(req.userId);
  if (!userId) return res.json({ message: "Unauthenticated" });

  const post = req.body;
  const newPost = new PostModel({
    ...post,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params; //post id

  try {
    const posts = await PostModel.findById(id).populate("comments").exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
