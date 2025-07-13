import { Router } from "express";
import { createPost, deletePost, getPostsDetails, getPostsWithCommentsCount } from "./post.service.js";

const postRouter = Router()

//create new post
postRouter.post("/", createPost)
//delete post
postRouter.delete("/:id", deletePost)
//get posts details
postRouter.get("/details", getPostsDetails)
//get posts with comments count
postRouter.get("/comment-count", getPostsWithCommentsCount)

export default postRouter