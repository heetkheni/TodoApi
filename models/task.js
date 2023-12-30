import mongoose from "mongoose"

export const schema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true,
    },
    description:{
        type:String,
        uniqeu:true,
        required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    cratedAt:{
        type:Date,
        default:Date.now,
    }
})


export const Task = mongoose.model("Task",schema) 