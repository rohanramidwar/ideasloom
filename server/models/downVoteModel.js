import mongoose from "mongoose";

const downVoteSchema = mongoose.Schema({
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

const DownVoteModel = mongoose.model("DownVoteModel", downVoteSchema);
export default DownVoteModel;
