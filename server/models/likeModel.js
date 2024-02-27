import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostModel",
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const LikeModel = mongoose.model("LikeModel", likeSchema);
export default LikeModel;
