import mongoose from "mongoose";

const upVoteSchema = mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PostModel",
    required: true,
  },
  user: {
    type: String, //user id
    required: true,
  },
});

const UpVoteModel = mongoose.model("UpvoteModel", upVoteSchema);
export default UpVoteModel;
