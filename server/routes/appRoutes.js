import express from "express";

import { getPosts, createPost } from "../controllers/postControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", auth, createPost); //auth middleware checks if user is logged in

export default router;
