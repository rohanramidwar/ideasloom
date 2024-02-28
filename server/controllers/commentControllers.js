import CommentModel from "../models/commentModel.js";
import PostModel from "../models/postModel.js";

export const addComment = async (req, res) => {
  //user not logged in
  const userId = String(req.userId);
  if (!userId) return res.json({ message: "Unauthenticated" });

  const data = req.body;

  try {
    const newComment = new CommentModel({
      ...data,
      post: data.id,
      createdAt: new Date().toISOString(),
    });
    await newComment.save();

    const updatedPost = await PostModel.findByIdAndUpdate(
      data.id, //post id
      { $push: { comments: newComment._id } },
      { new: true }
    )
      .populate("comments")
      .exec();

    res.status(201).json(updatedPost);
  } catch (error) {
    console.log(error.message);
    res.status(409).json({ message: "Failed to comment on post" });
  }
};
