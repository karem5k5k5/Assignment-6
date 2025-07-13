import { User } from "../../DB/models/user.model.js";
import { Post } from './../../DB/models/post.model.js';
import { Comment } from './../../DB/models/comment.model.js';
import { Sequelize } from "sequelize";

//1- create new post
export const createPost = async (req, res, next) => {
    try {
        //get data from req body
        const { title, content, userId } = req.body

        //check user existence
        const user = await User.findByPk(userId)

        //fail case
        if (!user) {
            throw new Error("User not found", { cause: 404 })
        }

        //success case
        const newPost = Post.build({ title, content, userId })
        await newPost.save()

        return res.status(201).json({ success: true, message: "post created successfully" })
    } catch (error) {
        console.log(error);
        return res.status(error.cause || 500).json({ success: false, message: error.message })
    }
}

//2- delete post
export const deletePost = async (req, res, next) => {
    try {
        //get post id from params
        const { id } = req.params
        //get user id from headers
        const userId = req.headers["userid"]

        //check post existence
        const post = await Post.findByPk(id)

        //fail case 1
        if (!post) {
            throw new Error("Post not found", { cause: 404 })
        }

        //fail case 2
        if (post.userId != userId) {
            throw new Error("You're not authorized to delete this post", { cause: 401 })
        }

        //success case
        await Post.destroy({ where: { id } })
        return res.status(201).json({ success: true, message: "post deleted successfully" })
    } catch (error) {
        console.log(error);
        return res.status(error.cause || 500).json({ success: false, message: error.message })
    }
}

//3- get posts details
export const getPostsDetails = async (req, res, next) => {
    try {
        //get all posts with given attributes
        const posts = await Post.findAll({
            attributes: ["id", "title"], include: [{
                model: User,
                attributes: ["id", "name"]
            }, {
                model: Comment,
                attributes: ["id", "content"]
            }]
        })

        //success case
        return res.status(201).json({ success: true, posts })

    } catch (error) {
        console.log(error);
        return res.status(error.cause || 500).json({ success: false, message: error.message })
    }
}

//4- get posts with comments count number
export const getPostsWithCommentsCount = async (req, res, next) => {
    try {
        //get all posts
        const posts = await Post.findAll({
            attributes: ["id", "title", [Sequelize.fn("COUNT", Sequelize.col("Comments.id")), "commentCount"]], include: [{
                model: Comment,
                attributes: [],
                required: false
            }], group: ["Post.id"]
        })

        //success case       
        return res.status(201).json({ success: true, posts })

    } catch (error) {
        console.log(error);
        return res.status(error.cause || 500).json({ success: false, message: error.message })
    }
}