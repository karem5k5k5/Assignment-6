import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";
import { User } from "./user.model.js";


export const Post = sequelize.define("Post", {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
}, { paranoid: true })

const fkOptions = {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    foreignKey: {
        name: "userId",
        allowNull: false
    }
}

User.hasMany(Post, fkOptions)
Post.belongsTo(User, fkOptions)