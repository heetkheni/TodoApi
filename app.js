import express from "express"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.js"
import cors from "cors"

export const app = express()

config({
    path:"./data/config.env"
})

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin:[process.env.FRONTEND_URL],
        methods:["GET","POST","PUT","DELETE"],
        credentials:true
    }
))
app.use("/users",userRouter)
app.use("/tasks/",taskRouter)
app.use(errorMiddleware)

// app.get('/', (req, res) => {
//     res.send("Nice")
// })

// app.get('/userid' , async (req,res) => {
//     const {id} = req.query;
//     //const user = await User.findById(id);
//     console.log(req.params)
//     res.json({
//         success:true,
//         user : {},
//     })
// })




