const express = require("express")
const cors = require("cors")
const app = require("./app")
const dbConnection = require("./configs/dbConnection")
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/authRouter")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConnection()
app.use(cookieParser())
app.use("/api/auth/", authRouter)

app.listen(process.env.PORT, () => {
    console.log("server is up and running....");
})
