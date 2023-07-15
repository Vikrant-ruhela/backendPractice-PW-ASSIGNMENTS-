const express = require("express")
const { home, register, login } = require("../controllers/authController")

const authRouter = express.Router()


authRouter.get("/", home) // "/" this is default route
authRouter.post("/register", register) // this route is for registration
authRouter.post("/login", login) // this route is for login

module.exports = authRouter