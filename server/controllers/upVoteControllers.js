import PostModel from "../models/postModel.js";
import UpVoteModel from "../models/upVoteModel.js";

export const upVote = async (req, res) => {
  //user not logged in
  const userId = String(req?.userId);
  if (!userId) return res.json({ message: "Unauthenticated" });

  const { id } = req?.params; //post id

  try {
    const upVoteExist = await UpVoteModel.findOne({ post: id, user: userId });
    if (upVoteExist) {
      return res
        .status(400)
        .json({ message: "You have already upvoted this post" });
    }

    const upVote = new UpVoteModel({
      post: id,
      user: userId,
    });
    await upVote.save();

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { $push: { upVotes: upVote._id } },
      { new: true }
    )
      .populate("upVotes")
      .exec();

    res.status(201).json(updatedPost);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Failed to upvote post",
    });
  }
};

export const removeUpVote = async (req, res) => {
  //user not logged in
  const userId = String(req.userId);
  if (!userId) return res.json({ message: "Unauthenticated" });

  const { id } = req.params; //post id

  try {
    const upVoteExist = await UpVoteModel.findOneAndDelete({
      post: id,
      user: userId,
    });
    if (!upVoteExist) {
      return res
        .status(400)
        .json({ message: "You haven't upvoted this post yet" });
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { $pull: { upVotes: upVoteExist._id } },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to remove upvote" });
  }
};
