import { connectDB, sequelize } from "./DB/connection.js";
import { Comment } from "./DB/models/comment.model.js";
import { Post } from "./DB/models/post.model.js";
import { User } from "./DB/models/user.model.js";
import commentRouter from "./modules/comment/comment.controller.js";
import postRouter from "./modules/post/post.controller.js";
import userRouter from "./modules/user/user.controller.js";

async function bootstrap(app, express) {
    //middleware : parse req body data
    app.use(express.json())

    //connect to database
    connectDB()

    //models sync
    await sequelize.sync()

    //routes
    app.use("/user", userRouter)
    app.use("/post", postRouter)
    app.use("/comment",commentRouter)
}

export default bootstrap;