import express from "express";

import {
  getAllPosts,
  createPost,
  getPost,
} from "../controllers/postControllers.js";
import { addComment } from "../controllers/commentControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost); //auth middleware checks if user is logged in
router.post("/:id/comment", auth, addComment);

export default router;
