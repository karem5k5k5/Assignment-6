
import { User } from './../../DB/models/user.model.js';

//1- signup new user
export const signup = async (req, res, next) => {
    try {
        //get data from req
        const { name, email, password, dob } = req.body

        //check user existence
        const existedUser = await User.findOne({ where: { email } })

        //fail case
        if (existedUser) {
            throw new Error("User already exists", { cause: 409 })
        }

        //success case
        const newUser = User.build({ name, email, password, dob },)
        await newUser.save()

        return res.status(201).json({ success: true, message: "user created successfully" })
    } catch (error) {
        console.log(error);
        return res.status(error.cause || 500).json({ success: false, message: error.message })
    }
}

//2- create new user or update if exists
export const createOrUpdate = async (req, res, next) => {
    try {
        //get user id from params
        const { id } = req.params

        //get data from req body
        const { name, email, password, dob } = req.body

        //check user exisitence
        const existedUser = await User.findByPk(id)

        //create case
        if (!existedUser) {
            //check email existence
            const existedEmail = await User.findOne({ where: { email } })

            if (existedEmail) {
                throw new Error("Email already exists", { cause: 409 })
            }

            await User.create({ id, name, email, password, dob })
            return res.status(201).json({ success: true, message: "user created successfully" })
        } else { //update case
            await User.update({ name, email, password, dob }, { where: { id } })
            return res.status(201).json({ success: true, message: "user updated successfully" })
        }
    } catch (error) {
        console.log(error);
        return res.status(error.cause || 500).json({ success: false, message: error.message })
    }
}

//3- get user by email
export const getUserByEmail = async (req, res, next) => {
    try {
        //get email from req query
        const { email } = req.query

        //check user existence
        const user = await User.findOne({ where: { email }, attributes: { exclude: ["password"] } })

        //fail case
        if (!user) {
            throw new Error("User not found", { cause: 404 })
        }

        //success case
        return res.status(201).json({ success: true, user })
    } catch (error) {
        console.log(error);
        return res.status(error.cause || 500).json({ success: false, message: error.message })
    }
}

//4- get user by id
export const getUserById = async (req, res, next) => {
    try {
        //get if from req params
        const { id } = req.params

        //check user existence
        const user = await User.findByPk(id, { attributes: { exclude: ["password", "role"] } })

        //fail case
        if (!user) {
            throw new Error("User not found", { cause: 404 })
        }

        //success case
        return res.status(201).json({ success: true, user })
    } catch (error) {
        console.log(error);
        return res.status(error.cause || 500).json({ success: false, message: error.message })
    }
}