import PostModel from "../models/postModel.js";
import DownVoteModel from "../models/downVoteModel.js";

export const downVote = async (req, res) => {
  //user not logged in
  const userId = String(req?.userId);
  if (!userId) return res.json({ message: "Unauthenticated" });

  const { id } = req?.params; //post id

  try {
    const downVoteExist = await DownVoteModel.findOne({
      post: id,
      user: userId,
    });
    if (downVoteExist) {
      return res
        .status(400)
        .json({ message: "You have already downvoted this post" });
    }

    const downVote = new DownVoteModel({
      post: id,
      user: userId,
    });
    await downVote.save();

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { $push: { downVotes: downVote._id } },
      { new: true }
    )
      .populate("downVotes")
      .populate("comments")
      .exec();

    res.status(201).json(updatedPost);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Failed to downvote post",
    });
  }
};

export const removeDownVote = async (req, res) => {
  //user not logged in
  const userId = String(req.userId);
  if (!userId) return res.json({ message: "Unauthenticated" });

  const { id } = req.params; //post id

  try {
    const downVoteExist = await DownVoteModel.findOneAndDelete({
      post: id,
      user: userId,
    });
    if (!downVoteExist) {
      return res
        .status(400)
        .json({ message: "You haven't downvoted this post yet" });
    }

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { $pull: { downVotes: downVoteExist._id } },
      { new: true }
    )
      .populate("comments")
      .exec();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to remove downvote" });
  }
};
