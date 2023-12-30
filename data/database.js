import mongoose from "mongoose"

export const databaseConnection  =() => {
    mongoose.connect(process.env.MONGO_URI, {
    dbName: "BackendApi",
}).then(() => console.log("Database Connectetd")).catch((e) => console.log(e));
} 