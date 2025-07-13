import { Router } from "express";
import { createOrUpdate, getUserByEmail, getUserById, signup } from "./user.service.js";

const userRouter = Router()

//signup
userRouter.post("/signup", signup)
//create or update
userRouter.put("/:id", createOrUpdate)
//get user by email
userRouter.get("/by-email",getUserByEmail)
//get user by id
userRouter.get("/:id",getUserById)

export default userRouter