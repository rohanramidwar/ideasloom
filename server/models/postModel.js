import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LikeModel",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentModel",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostModel = mongoose.model("PostModel", postSchema);
export default PostModel;
