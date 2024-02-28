import express from "express";

import {
  getAllPosts,
  createPost,
  getPost,
} from "../controllers/postControllers.js";
import { addComment } from "../controllers/commentControllers.js";
import { removeUpVote, upVote } from "../controllers/upVoteControllers.js";
import {
  downVote,
  removeDownVote,
} from "../controllers/downVoteControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost); //auth middleware checks if user is logged in
router.post("/:id/upvote", auth, upVote);
router.delete("/:id/removeupvote", auth, removeUpVote);
router.post("/:id/downvote", auth, downVote);
router.delete("/:id/removedownvote", auth, removeDownVote);
router.post("/:id/comment", auth, addComment);

export default router;
