import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostModel",
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
});

const CommentModel = mongoose.model("CommentModel", commentSchema);
export default CommentModel;
