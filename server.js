import { app } from "./app.js"
import { databaseConnection } from "./data/database.js"

databaseConnection()

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server wroking on ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})