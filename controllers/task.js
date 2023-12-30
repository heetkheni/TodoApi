import { response } from "express";
import { Task } from "../models/task.js"
import ErrorHandler from "../middlewares/error.js";


export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        Task.create({
            title,
            description,
            user: req.user
        })

        res.status(201).json({
            sucess: true,
            message: "Task Added Sucessfully"
        })
    } catch (error) {
        next(error)
    }
}

export const getTasks = async (req, res, next) => {

    try {
        const id = req.user._id

        const tasks = await Task.find({ user: id })

        res.status(201).json({
            sucess: true,
            tasks
        })
    } catch (error) {
        next(error)
    }
}


export const updateTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return next(new ErrorHandler())
        }

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(201).json({
            success: true,
            message: "Updated Successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return next(new Error("Nice"))
        }

        await task.deleteOne();

        res.status(201).json({
            success: true,
            message: "Delete Successfully"
        })
    } catch (error) {
        next(error)
    }
}