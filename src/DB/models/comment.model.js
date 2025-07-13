import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { User } from "./user.model.js";
import { Post } from "./post.model.js";


export const Comment = sequelize.define("Comment", {
    content: { type: DataTypes.TEXT, allowNull: false }
})

const fkUserOptions = {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: {
        name: "userId",
        allowNull: false
    }
}

User.hasMany(Comment, fkUserOptions)
Comment.belongsTo(User, fkUserOptions)

const fkPostOptions = {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: {
        name: "postId",
        allowNull: false
    }
}

Post.hasMany(Comment, fkPostOptions)
Comment.belongsTo(Post, fkPostOptions)