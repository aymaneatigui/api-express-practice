import { Router } from "express";
import { inputErrors } from "../Modules/middleware";
import { body } from "express-validator";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../Handlers/post";

const router = Router();

/**
 *   Posts
 */

router.get("/post", inputErrors, getPosts);
router.post("/post", 
        body("title").isString(),
        body("content").optional().isString(), 
        inputErrors, 
        createPost);
router.get("/post/:id", inputErrors, getPost);
router.put("/post/:id",
        inputErrors, 
        updatePost);
router.delete("/post/:id",inputErrors,deletePost);

export default router;
