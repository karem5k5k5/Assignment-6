import { Router } from "express";
import { createBulkOfComments, findCommentByWord, findOrCreateComment, get3MostRecentComments, getCommentById, updateComment } from "./comment.service.js";

const commentRouter = Router()

//create bulk of comments
commentRouter.post("/", createBulkOfComments)
//update comment
commentRouter.patch("/:id", updateComment)
//find or create comment
commentRouter.post("/find-or-create", findOrCreateComment)
//find comment with word
commentRouter.get("/serach", findCommentByWord)
//get 3 most recent comments for a post
commentRouter.get("/newest/:postId", get3MostRecentComments)
//get comment by id
commentRouter.get("/:id", getCommentById)

export default commentRouter