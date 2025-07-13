
import { User } from './../../DB/models/user.model.js';
import { Post } from './../../DB/models/post.model.js';
import { Comment } from './../../DB/models/comment.model.js';
import { Op } from 'sequelize';

//1- create bulk of comments
export const createBulkOfComments = async (req, res, next) => {
    try {
        //get comments bulk from req body
        const { comments } = req.body

        //fail case
        for (let i = 0; i < comments.length; i++) {
            //get data from each comment
            const { userId, postId } = comments[i]

            //check user & post existence 
            const user = await User.findByPk(userId)
            const post = await Post.findByPk(postId)

            if (!user || !post) {
                throw new Error("Invalid user or post id", { cause: 404 })
            }
        }

        //success case
        await Comment.bulkCreate(comments)
        return res.status(201).json({ success: true, message: "comments created successfully" })
    } catch (error) {
        console.log(error);
        return res.status(error.cause || 500).json({ success: false, message: error.message })
    }
}

//2- update comment
export const updateComment = async (req, res, next) => {
    try {
        //get data from req body
        const { id } = req.params
        const { content, userId, postId } = req.body

        //check comment and post existence
        const comment = await Comment.findByPk(id)
        const post = await Post.findByPk(postId)

        //fail case 1
        if (!comment || !post) {
            throw new Error("Comment or post not found", { cause: 404 })
        }

        //check user authorization - fail case 2
        if (comment.userId != userId) {
            throw new Error("you are not authorized to update this comment", { cause: 401 })
        }

        //success case
        await Comment.update({ content, userId, postId }, { where: { id } })
        return res.status(201).json({ success: true, message: "comment updated successfully" })
    } catch (error) {
        console.log(error);
        return res.status(error.cause || 500).json({ success: false, message: error.message })
    }
}

//3- find or create comment
export const findOrCreateComment = async (req, res, next) => {
    try {
        //get data from req
        const { content, userId, postId } = req.body

        //check for user and post existence
        const user = await User.findByPk(userId)
        const post = await Post.findByPk(postId)

        //fail case
        if (!user || !post) {
            throw new Error("Invalid user or post id", { cause: 404 })
        }

        //success case
        const comment = await Comment.findOrCreate({ where: { content, userId, postId } })
        return res.status(201).json({ success: true, comment })

    } catch (error) {
        console.log(error);
        return res.status(error.cause || 500).json({ success: false, message: error.message })
    }
}

//4- find comment by word
export const findCommentByWord = async (req, res, next) => {
    try {
        //get word from query
        const { word } = req.query

        //find comments with word
        const { count, rows: comments } = await Comment.findAndCountAll({
            where: {
                content: {
                    [Op.like]: `%${word}%`
                }
            }
        })

        //fail case
        if (count == 0) {
            throw new Error("no comments found", { cause: 404 })
        }

        //success
        return res.status(201).json({ success: true, count, comments })
    } catch (error) {
        console.log(error);
        return res.status(error.cause || 500).json({ success: false, message: error.message })
    }
}

//5- get most 3 recent comment for a post
export const get3MostRecentComments = async (req, res, next) => {
    try {
        //get postId from params
        const { postId } = req.params

        //check post existence
        const post = await Post.findByPk(postId)

        //fail case
        if (!post) {
            throw new Error("Invalid post id", { cause: 404 })
        }

        //success case
        const comments = await Comment.findAll({ where: { postId }, order: [["createdAt", "DESC"]], limit: 3 })

        return res.status(201).json({ success: true, comments })

    } catch (error) {
        console.log(error);
        return res.status(error.cause || 500).json({ success: false, message: error.message })
    }
}

//6- get comment by id
export const getCommentById = async (req, res, next) => {
    try {
        //get comment id from params
        const { id } = req.params

        //check comment existence
        const comment = await Comment.findByPk(id, {
            attributes: ["id", "content"], include: [{
                model: User,
                attributes: ["id", "name", "email"]
            }, {
                model: Post,
                attributes: ["id", "title", "content"]
            }]
        })

        //fail case
        if (!comment) {
            throw new Error("comment not found", { cause: 404 })
        }

        //success case
        return res.status(201).json({ success: true, comment })
    } catch (error) {
        console.log(error);
        return res.status(error.cause || 500).json({ success: false, message: error.message })
    }
}