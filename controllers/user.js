import { User } from "../models/user.js"
import bcrypt from "bcrypt"
import { sendCookies } from "../utils/feature.js"
import ErrorHandler from "../middlewares/error.js"


export const allusers = async (req, res, next) => {
    const users = await User.find({})
    res.json(
        {
            success: true,
            users,
        }
    )
}

export const loginUser = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password", 400))
        } else {

            const match = bcrypt.compare(password, user.password)

            if (!match) {
                return next(new ErrorHandler("Wrong Credentials", 400))
            }

            else {
                sendCookies(user, res, `Welcome back , ${user.name}`, 200)
            }
        }
    } catch (error) {
        next(error)
    }

}

export const createUser = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return next(new ErrorHandler("User Exist", 400))
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10)
            user = await User.create({ name, email, password: hashedPassword })
            sendCookies(user, res, "Registered Sucessfuly", 201)
        }
    } catch (error) {
        next(error)
    }


    // const { name, email, password } = req.body;
    // const users = await User.create({
    //     name,
    //     email,
    //     password
    // });

    // res.status(201).cookie('tempi', 'cookie').json({
    //     success: true,
    //     message: "Data Added Succesfully"
    // })
}

export const userByID = async (req, res) => {

    // const { id } = req.params;
    // const user = await User.findById(id);

    // console.log(req.params)

    // res.json({
    //     success: true,
    //     user,
    // })
}

export const myDetail = async (req, res, next) => {
    try {
        res.status(200).json({
            sucess: true,
            user: req.user
        })
    } catch (error) {
        next(error)
    }
}

export const logoutuser = async (req, res, next) => {

    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now()), 
            samesite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        }).json({
            sucess: true,
            user: req.user
        })
    } catch (error) {
        next(error)
    }
}

// export const specialId = (req, res) => {
//     res.json({
//         success: true,
//         message: "Completed"
//     })
// }

// export const updateUser = async (req, res) => {

//     const { id } = req.params;
//     const user = await User.findById(id);

//     console.log(req.params)

//     res.json({
//         success: true,
//         message:"Updated",
//     })
// }

// export const deleteUser = async (req, res) => {

//     const { id } = req.params;
//     const user = await User.findById(id);

//     console.log(req.params)

//     res.json({
//         success: true,
//         message:"Deleted",
//     })
// }

