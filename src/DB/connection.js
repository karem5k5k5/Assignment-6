import { Sequelize } from "sequelize"

// database connection
const sequelize = new Sequelize("mysql://u0hbpwaz9bbycanq:9MaJl71YCyUfsOakakmx@bjgpjkkx0rshhocoiuyv-mysql.services.clever-cloud.com:3306/bjgpjkkx0rshhocoiuyv")

//database connection test
const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log("DB is connected");
    } catch (error) {
        console.log("DB connection fail:", error.message);
    }
}

export { connectDB, sequelize }