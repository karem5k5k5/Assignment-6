import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";


export const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING, allowNull: false
    },
    email: {
        type: DataTypes.STRING, allowNull: false, unique: true, validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING, allowNull: false, validate: {
            checkPasswordLength(value) {
                if (value.length < 6) {
                    throw new Error("password must have at least 6 characters!")
                }
            }
        }
    },
    role: { type: DataTypes.ENUM, values: ["user", "admin"], defaultValue: "user" }
}, {
    hooks: {
        beforeCreate: (user, options) => {
            const checkNameLength = (name) => {
                if (name.length < 3) {
                    throw new Error("name must have at least 3 characters!")
                }
            }

            checkNameLength(user.name)
        }

    }
})